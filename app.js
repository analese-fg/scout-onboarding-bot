const { App } = require("@slack/bolt");
const { Client } = require("pg");
const http = require("http");
const { roles } = require("./checklists");
require("dotenv").config();
const Anthropic = require("@anthropic-ai/sdk").default;
const { companyKnowledge } = require("./knowledge");
const { getResourceResponse } = require("./resources");
const HR_AUTHORIZED_USERS = [
  "U03TWUE0Q57", // Britt
  // "U0ABATGQMQ9", // Mallu
  "U09LQ09632A", // Mel
  // "U0AARJ58XB5", // Neima
  "U06C0VATZC5", // Steph
  "U0AC9NW0EBF", // Analese


  // Add more user IDs here as needed
]
/**
 * Convert markdown formatting to Slack mrkdwn formatting.
 * Runs after Claude responds to catch any markdown that slipped through.
 */
function toSlackFormat(text) {
  return text
    // Convert markdown links [text](url) to Slack <url|text>
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<$2|$1>")
    // Convert **bold** to *bold* (must come before single asterisk handling)
    .replace(/\*\*(.+?)\*\*/g, "*$1*")
    // Convert __underline__ to _underline_ (Slack uses single underscores for italic)
    .replace(/__(.+?)__/g, "_$1_")
    // Convert ### headers to bold text
    .replace(/^#{1,3}\s+(.+)$/gm, "*$1*");
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function getDbClient() {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

app.command("/new-hire", async ({ ack, body, client }) => {
  await ack();

  if (!HR_AUTHORIZED_USERS.includes(body.user_id)) {
    await client.chat.postEphemeral({
      channel: body.channel_id,
      user: body.user_id,
      text: "⛔ Sorry, `/new-hire` is restricted to HR team members. If you think you should have access, reach out to <@U03TWUE0Q57>.",
    });
    return;
  }
  await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      type: "modal",
      callback_id: "new_hire_submission",
      private_metadata: body.channel_id,
      title: {
        type: "plain_text",
        text: "Register New Hire",
      },
      submit: {
        type: "plain_text",
        text: "Submit",
      },
      blocks: [
        {
          type: "input",
          block_id: "name_block",
          element: {
            type: "plain_text_input",
            action_id: "name_input",
            placeholder: {
              type: "plain_text",
              text: "Jane Smith",
            },
          },
          label: {
            type: "plain_text",
            text: "Employee Name",
          },
        },
        {
          type: "input",
          block_id: "email_block",
          element: {
            type: "plain_text_input",
            action_id: "email_input",
            placeholder: {
              type: "plain_text",
              text: "jane@foxglove.com",
            },
          },
          label: {
            type: "plain_text",
            text: "Email Address",
          },
        },
        {
          type: "input",
          block_id: "role_block",
          element: {
            type: "static_select",
            action_id: "role_input",
            placeholder: {
              type: "plain_text",
              text: "Select a role",
            },
            options: roles.map((role) => ({
              text: {
                type: "plain_text",
                text: role,
              },
              value: role,
            })),
          },
          label: {
            type: "plain_text",
            text: "Role",
          },
        },
        {
          type: "input",
          block_id: "start_date_block",
          element: {
            type: "datepicker",
            action_id: "start_date_input",
            placeholder: {
              type: "plain_text",
              text: "Select a date",
            },
          },
          label: {
            type: "plain_text",
            text: "Start Date",
          },
        },
        {
          type: "input",
          block_id: "timezone_block",
          element: {
            type: "static_select",
            action_id: "timezone_input",
            placeholder: {
              type: "plain_text",
              text: "Select timezone",
            },
            options: [
              {
                text: { type: "plain_text", text: "US Pacific (Los Angeles)" },
                value: "America/Los_Angeles",
              },
              {
                text: { type: "plain_text", text: "US Mountain (Denver)" },
                value: "America/Denver",
              },
              {
                text: { type: "plain_text", text: "US Central (Chicago)" },
                value: "America/Chicago",
              },
              {
                text: { type: "plain_text", text: "US Eastern (New York)" },
                value: "America/New_York",
              },
              {
                text: { type: "plain_text", text: "Australia Eastern (Sydney)" },
                value: "Australia/Sydney",
              },
              {
                text: { type: "plain_text", text: "Australia Western (Perth)" },
                value: "Australia/Perth",
              },
            ],
          },
          label: {
            type: "plain_text",
            text: "Timezone",
          },
        },
      ],
    },
  });
});

app.command("/retry-welcome", async ({ ack, body, client }) => {
  await ack();

  if (!HR_AUTHORIZED_USERS.includes(body.user_id)) {
    await client.chat.postEphemeral({
      channel: body.channel_id,
      user: body.user_id,
      text: "⛔ Sorry, `/retry-welcome` is restricted to HR team members.",
    });
    return;
  }

  const dbClient = getDbClient();
  await dbClient.connect();
  const result = await dbClient.query(
    "SELECT id, name, email, role, start_date FROM new_hires WHERE welcome_sent = FALSE ORDER BY start_date ASC"
  );
  await dbClient.end();

  if (result.rows.length === 0) {
    await client.chat.postEphemeral({
      channel: body.channel_id,
      user: body.user_id,
      text: "✅ No pending welcome messages — all new hires have been welcomed!",
    });
    return;
  }

  const options = result.rows.map((hire) => ({
    text: {
      type: "plain_text",
      text: `${hire.name} (${hire.role}) — ${hire.start_date.toISOString().split("T")[0]}`,
    },
    value: String(hire.id),
  }));

  await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      type: "modal",
      callback_id: "retry_welcome_submission",
      title: {
        type: "plain_text",
        text: "Retry Welcome Message",
      },
      submit: {
        type: "plain_text",
        text: "Send Welcome",
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${result.rows.length} new hire(s) haven't received their welcome yet:*`,
          },
        },
        {
          type: "input",
          block_id: "hire_block",
          element: {
            type: "static_select",
            action_id: "hire_input",
            placeholder: {
              type: "plain_text",
              text: "Select a new hire",
            },
            options: options,
          },
          label: {
            type: "plain_text",
            text: "New Hire",
          },
        },
      ],
    },
  });
});

app.view("retry_welcome_submission", async ({ ack, body, view, client }) => {
  await ack();

  const userId = body.user.id;
  const hireId = view.state.values.hire_block.hire_input.selected_option.value;

  try {
    const { sendWelcomeToHire } = require("./welcome");
    const result = await sendWelcomeToHire(hireId);

    await client.chat.postMessage({
      channel: userId,
      text: `✅ Welcome message sent to *${result.name}* (${result.email})!`,
    });
  } catch (error) {
    await client.chat.postMessage({
      channel: userId,
      text: `❌ ${error.message}`,
    });
  }
});

app.view("new_hire_submission", async ({ ack, body, view, client }) => {
  await ack();

  const userId = body.user.id;
  const channelId = view.private_metadata;
  console.log("Channel ID:", channelId);
  const values = view.state.values;
  const name = values.name_block.name_input.value;
  const email = values.email_block.email_input.value;
  const role = values.role_block.role_input.selected_option.value;
  const startDate = values.start_date_block.start_date_input.selected_date;
  const timezone = values.timezone_block.timezone_input.selected_option.value;

  console.log("Channel ID:", channelId);

  async function sendResponse(text) {
    if (channelId) {
      await client.chat.postEphemeral({
        channel: channelId,
        user: userId,
        text: text,
      });
    } else {
      await client.chat.postMessage({
        channel: userId,
        text: text,
      });
    }
  }

  try {
    const dbClient = getDbClient();
    await dbClient.connect();

    await dbClient.query(
      "INSERT INTO new_hires (name, email, role, start_date, timezone) VALUES ($1, $2, $3, $4, $5)",
      [name, email, role, startDate, timezone]
    );

    await dbClient.end();

    console.log(`✅ New hire registered: ${name} (${email}) starting ${startDate}`);

    await sendResponse(`✅ New hire registered!\n\n*Name:* ${name}\n*Email:* ${email}\n*Role:* ${role}\n*Start Date:* ${startDate}\n*Timezone:* ${timezone}`);
  } catch (error) {
    console.error("Error registering new hire:", error);

    await sendResponse(`❌ Something went wrong registering ${name}. Please try again or contact support.`);
  }
});
// =====================================================
// TOOL ACCESS REQUEST — shared logic + two entry points
// =====================================================

// Shared function: opens the tool request modal immediately, then
// updates it with role-specific pre-selections if we find the user in the DB.
async function openToolRequestModal({ client, triggerId, userId }) {
  const { getRequestableTools, getRequestableToolsForRole } = require("./checklists");
  const allRequestableTools = getRequestableTools();

  const toolOptions = allRequestableTools.map((tool) => ({
    text: { type: "plain_text", text: tool },
    value: tool.toLowerCase().replace(/\s+/g, "_"),
  }));

  // Open modal immediately to avoid trigger_id expiration
  const modalResponse = await client.views.open({
    trigger_id: triggerId,
    view: {
      type: "modal",
      callback_id: "tool_access_submission",
      title: {
        type: "plain_text",
        text: "Request Tool Access",
      },
      submit: {
        type: "plain_text",
        text: "Submit Request",
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Select the tools you need access to:",
          },
        },
        {
          type: "input",
          block_id: "tools_block",
          element: {
            type: "multi_static_select",
            action_id: "tools_input",
            placeholder: {
              type: "plain_text",
              text: "Select tools",
            },
            options: toolOptions,
          },
          label: {
            type: "plain_text",
            text: "Tools",
          },
        },
        {
          type: "input",
          block_id: "notes_block",
          optional: true,
          element: {
            type: "plain_text_input",
            action_id: "notes_input",
            multiline: true,
            placeholder: {
              type: "plain_text",
              text: "Any additional details (e.g., specific repos, team access, etc.)",
            },
          },
          label: {
            type: "plain_text",
            text: "Additional Notes",
          },
        },
      ],
    },
  });

  // Now try to update the modal with role-specific pre-selections
  try {
    const userInfo = await client.users.info({ user: userId });
    const userEmail = userInfo.user.profile.email;

    const dbClient = getDbClient();
    await dbClient.connect();
    const result = await dbClient.query(
      "SELECT role FROM new_hires WHERE email = $1",
      [userEmail]
    );
    await dbClient.end();

    if (result.rows.length > 0) {
      const userRole = result.rows[0].role;
      const roleTools = getRequestableToolsForRole(userRole);

      if (roleTools.length > 0) {
        const initialOptions = roleTools.map((tool) => ({
          text: { type: "plain_text", text: tool },
          value: tool.toLowerCase().replace(/\s+/g, "_"),
        }));

        await client.views.update({
          view_id: modalResponse.view.id,
          view: {
            type: "modal",
            callback_id: "tool_access_submission",
            title: {
              type: "plain_text",
              text: "Request Tool Access",
            },
            submit: {
              type: "plain_text",
              text: "Submit Request",
            },
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `Based on your role (*${userRole}*), we've pre-selected some tools you might need. Feel free to adjust:`,
                },
              },
              {
                type: "input",
                block_id: "tools_block",
                element: {
                  type: "multi_static_select",
                  action_id: "tools_input",
                  placeholder: {
                    type: "plain_text",
                    text: "Select tools",
                  },
                  options: toolOptions,
                  initial_options: initialOptions,
                },
                label: {
                  type: "plain_text",
                  text: "Tools",
                },
              },
              {
                type: "input",
                block_id: "notes_block",
                optional: true,
                element: {
                  type: "plain_text_input",
                  action_id: "notes_input",
                  multiline: true,
                  placeholder: {
                    type: "plain_text",
                    text: "Any additional details (e.g., specific repos, team access, etc.)",
                  },
                },
                label: {
                  type: "plain_text",
                  text: "Additional Notes",
                },
              },
            ],
          },
        });
      }
    }
  } catch (error) {
    // Modal is already open — role pre-selection is just a nice-to-have
    console.log("Could not pre-select role tools:", error.message);
  }
}

// Entry point 1: Button click from welcome message
app.action("request_tool_access", async ({ ack, body, client }) => {
  await ack();
  await openToolRequestModal({
    client,
    triggerId: body.trigger_id,
    userId: body.user.id,
  });
});

// Entry point 2: Slash command from any channel
app.command("/request-tools", async ({ ack, body, client }) => {
  await ack();
  await openToolRequestModal({
    client,
    triggerId: body.trigger_id,
    userId: body.user_id,
  });
});

app.command("/scout-help", async ({ ack, body, client }) => {
  await ack();

  await client.chat.postEphemeral({
    channel: body.channel_id,
    user: body.user_id,
    text: "🐾 *Here's what I can do!*",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "🐾 *Hi, I'm Scout — your onboarding buddy!*\n\nHere's everything I can help with:",
        },
      },
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*💬 DM me anytime*\nAsk me questions about Foxglove tools, processes, policies, or anything else — I'll do my best to help or point you in the right direction.",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*🔑 `/request-tools`*\nRequest access to Foxglove tools like GitHub, PostHog, HubSpot, and more. I'll pre-select tools based on your role and send the request to the IT team.",
        },
      },
      {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*📋 `/new-hire`* _(HR only)_\nRegister a new employee with their name, email, role, start date, and timezone. They'll get a personalized welcome message on their first day.\n\n*🔄 `/retry-welcome`* _(HR only)_\nResend a welcome message to any new hire who hasn't received one yet.",
          },
        },
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Quick keyword shortcuts*\nDM me any of these for instant links:\n`resources` · `engineering` · `policies` · `linear` · `help` · `people ops` · `tool access` · `communication` · `decisions`",
        },
      },
      { type: "divider" },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "🙋 Still stuck? Post in <slack://channel?team=T&id=C09V0PX6UTU|#help-desk> or <https://calendar.app.google/wxpd1jmVn8Bxks1M6|book time with Britt>",
          },
        ],
      },
    ],
  });
});

app.view("tool_access_submission", async ({ ack, body, view, client }) => {
  await ack();

  const userId = body.user.id;
  const values = view.state.values;
  const selectedTools = values.tools_block.tools_input.selected_options.map(
    (opt) => opt.text.text
  );
  const notes = values.notes_block.notes_input.value || "No additional notes";

  const toolList = selectedTools.join(", ");

  await client.chat.postMessage({
    channel: process.env.HELP_DESK_CHANNEL_ID,
    text: `🔑 Tool Access Request from <@${userId}>`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<@U063B8CP2KY> 🔑 *Tool Access Request*\n\n*From:* <@${userId}>\n*Tools requested:* ${toolList}\n*Notes:* ${notes}`,
        },
      },
    ],
  });

  await client.chat.postMessage({
    channel: userId,
    text: `✅ Your request for access to ${toolList} has been submitted! The IT team will get back to you soon.`,
  });

  console.log(`✅ Tool access request submitted by ${userId}: ${toolList}`);
});

app.message(async ({ message, say, client }) => {
  if (!message.text || message.bot_id || message.subtype) {
    return;
  }
  console.log("Received message:", message.text);
  const userMessage = message.text;

  // ── Fast-path: keyword resource lookup (no API call needed) ──
  const resourceResponse = getResourceResponse(userMessage);
  if (resourceResponse) {
    await say(resourceResponse);
    return;
  }

  // ── Full path: send to Claude for conversational answers ──
  let thinkingMessage = null;
  let thinkingTimeout = null;

  try {
    thinkingTimeout = setTimeout(async () => {
      const result = await client.chat.postMessage({
        channel: message.channel,
        text: "🤔 Let me look that up for you... I'll have an answer shortly!",
      });
      thinkingMessage = result.ts;
    }, 2000);

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are Scout, a friendly onboarding assistant for Foxglove. You help new employees get settled in by answering their questions in a warm, conversational way.

Guidelines:
- Answer questions naturally, like a helpful coworker would—don't just repeat documentation
- Keep responses concise (2-4 short paragraphs max unless they ask for more detail)
- Only include the most relevant information for their specific question
- Include 1-2 helpful links when relevant, but don't overwhelm with links
- Use a friendly, casual tone—you're a buddy, not a manual
- If someone asks a broad question like "where can I find resources" or "I need help getting started", point them to key pages: Notion knowledge base, Communication & Collaboration guide, People & Operations, and Policies

What you can help with:
- Questions about Foxglove tools, processes, and policies—use the knowledge base below
- General questions not related to Foxglove—use your general knowledge to help
- If you don't know something about Foxglove specifically, suggest they ask in #help-desk or reach out to their manager

IMPORTANT - Slack formatting rules (you MUST follow these):
- For bold: use SINGLE asterisks like *bold* (NEVER use **double asterisks**)
- For italics: use underscores like _italics_
- For links: use <https://example.com|Link text> format
- For bullet points: use • or - at the start of a line
- NEVER use markdown formatting like **bold** or [link](url) - these do not work in Slack

Here is your knowledge base about Foxglove:

${companyKnowledge}`,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    clearTimeout(thinkingTimeout);

    const answer = toSlackFormat(response.content[0].text);

    if (thinkingMessage) {
      await client.chat.update({
        channel: message.channel,
        ts: thinkingMessage,
        text: answer,
      });
    } else {
      await say(answer);
    }
  } catch (error) {
    clearTimeout(thinkingTimeout);
    console.error("Error calling Anthropic:");
    console.error("Full error:", error);

    const errorMessage = "Sorry, I'm having trouble thinking right now. Please try again or ask in #help-desk for help!";

    if (thinkingMessage) {
      await client.chat.update({
        channel: message.channel,
        ts: thinkingMessage,
        text: errorMessage,
      });
    } else {
      await say(errorMessage);
    }
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Scout is running!");

  // Run welcome check every hour (built-in, no external cron needed)
  const ONE_HOUR = 60 * 60 * 1000;

  async function runWelcomeCheck() {
    console.log("🕐 Running scheduled welcome check...");
    try {
      const { sendWelcomeMessages } = require("./welcome");
      await sendWelcomeMessages();
    } catch (error) {
      console.error("Error running welcome check:", error);
    }
  }

  // Run once on startup, then every hour
  await runWelcomeCheck();
  setInterval(runWelcomeCheck, ONE_HOUR);
  console.log("⏰ Welcome check scheduled to run every hour");

  // HTTP server to keep Render web service alive
  const port = process.env.PORT || 3000;
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Scout is healthy!");
  }).listen(port, () => {
    console.log(`🩺 Health check server running on port ${port}`);
  });
})();