const { App } = require("@slack/bolt");
const { Client } = require("pg");
const http = require("http");
const { roles } = require("./checklists");
require("dotenv").config();
const OpenAI = require("openai");
const { companyKnowledge } = require("./knowledge");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
      ],
    },
  });
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
      "INSERT INTO new_hires (name, email, role, start_date) VALUES ($1, $2, $3, $4)",
      [name, email, role, startDate]
    );

    await dbClient.end();

    console.log(`✅ New hire registered: ${name} (${email}) starting ${startDate}`);

    await sendResponse(`✅ New hire registered!\n\n*Name:* ${name}\n*Email:* ${email}\n*Role:* ${role}\n*Start Date:* ${startDate}`);
  } catch (error) {
    console.error("Error registering new hire:", error);

    await sendResponse(`❌ Something went wrong registering ${name}. Please try again or contact support.`);
  }
});
app.action("request_tool_access", async ({ ack, body, client }) => {
  await ack();

  const userId = body.user.id;

  await client.views.open({
    trigger_id: body.trigger_id,
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
            options: [
              {
                text: { type: "plain_text", text: "GitHub" },
                value: "github",
              },
              {
                text: { type: "plain_text", text: "Figma" },
                value: "figma",
              },
              {
                text: { type: "plain_text", text: "Linear" },
                value: "linear",
              },
              {
                text: { type: "plain_text", text: "Notion" },
                value: "notion",
              },
              {
                text: { type: "plain_text", text: "AWS" },
                value: "aws",
              },
              {
                text: { type: "plain_text", text: "Other" },
                value: "other",
              },
            ],
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

app.message(async ({ message, say }) => {
  console.log("Received message:", message.text);
  const userMessage = message.text;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Scout, a friendly onboarding assistant for Foxglove. Help new employees with their questions about onboarding, tools, and company information.

Use the following knowledge base to answer questions. If you don't know the answer, say so and suggest they ask in #help-desk or reach out to their manager.

Be concise, friendly, and helpful. Use bullet points for lists. Include relevant links when available.

${companyKnowledge}`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 1000,
    });

    const answer = response.choices[0].message.content;
    await say(answer);
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    await say(
      "Sorry, I'm having trouble thinking right now. Please try again or ask in #help-desk for help!"
    );
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Scout is running!");

  const port = process.env.PORT || 3000;
  http.createServer(async (req, res) => {
    if (req.url === "/run-welcome" && req.method === "GET") {
      console.log("🕐 Running scheduled welcome check...");
      try {
        const { sendWelcomeMessages } = require("./welcome");
        await sendWelcomeMessages();
        res.writeHead(200);
        res.end("Welcome messages sent!");
      } catch (error) {
        console.error("Error running welcome:", error);
        res.writeHead(500);
        res.end("Error running welcome messages");
      }
    } else {
      res.writeHead(200);
      res.end("Scout is healthy!");
    }
  }).listen(port, () => {
    console.log(`🩺 Health check server running on port ${port}`);
  });
})();