const { Client } = require("pg");
const { WebClient } = require("@slack/web-api");
const { getChecklist, formatToolWithLink, NOTION_ONBOARDING_LINK } = require("./checklists");
require("dotenv").config();

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

function getDbClient() {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

function isLocalTime10am(timezone) {
  const now = new Date();
  const localTime = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
  const hour = localTime.getHours();
  return hour === 10;
}

async function sendWelcomeMessages() {
  const dbClient = getDbClient();
  await dbClient.connect();

  const today = new Date().toISOString().split("T")[0];

  const result = await dbClient.query(
    "SELECT * FROM new_hires WHERE start_date = $1 AND welcome_sent = FALSE",
    [today]
  );

  console.log(`Found ${result.rows.length} new hires starting today`);

  for (const hire of result.rows) {
    const timezone = hire.timezone || "America/Los_Angeles";
    
    if (!isLocalTime10am(timezone)) {
      console.log(`Skipping ${hire.name} - not 10am in ${timezone} yet`);
      continue;
    }

    try {
      const user = await slack.users.lookupByEmail({ email: hire.email });
      const userId = user.user.id;

      const checklist = getChecklist(hire.role);
      const taskList = checklist.tasks.map((task) => `☐ ${task}`).join("\n");
      const toolList = checklist.tools.map(formatToolWithLink).join(", ");

      await slack.chat.postMessage({
        channel: userId,
        text: `👋 Welcome to Foxglove, ${hire.name}!`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `👋 *Welcome to Foxglove, ${hire.name}!*\n\nWe're so excited to have you join us as a *${hire.role}*. Here's what you need to do to get started:\n\n📚 <${NOTION_ONBOARDING_LINK}|View the full onboarding guide in Notion>`,
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Your first-day checklist:*\n\n${taskList}`,
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Tools to set up:*\n\n${toolList}`,
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Need access to any tools? Click the button below to request access:",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "🔑 Request Tool Access",
                },
                action_id: "request_tool_access",
                style: "primary",
              },
            ],
          },
        ],
      });

      await dbClient.query(
        "UPDATE new_hires SET slack_user_id = $1, welcome_sent = TRUE WHERE id = $2",
        [userId, hire.id]
      );

      console.log(`✅ Welcome message sent to ${hire.name} (${timezone})`);
    } catch (error) {
      console.error(`❌ Failed to send welcome to ${hire.name}:`, error.message);
    }
  }

  await dbClient.end();
  console.log("Done!");
}

if (require.main === module) {
  sendWelcomeMessages();
}

module.exports = { sendWelcomeMessages };