const { Client } = require("pg");
const { WebClient } = require("@slack/web-api");
const { getChecklist } = require("./checklists");
const { buildWelcomeBlocks } = require("./welcome");
require("dotenv").config();

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
const HR_NOTIFY_USER = "U0AC9NW0EBF" //"U03TWUE0Q57"; // Britt

function getDbClient() {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

async function testWelcome() {
  const dbClient = getDbClient();
  await dbClient.connect();

  const today = new Date().toLocaleDateString("en-CA"); // gives YYYY-MM-DD in local timezone
  const result = await dbClient.query(
    "SELECT * FROM new_hires WHERE start_date = $1 AND welcome_sent = FALSE",
    [today]
  );

  console.log(`Found ${result.rows.length} new hires starting today`);

  for (const hire of result.rows) {
    try {
      const user = await slack.users.lookupByEmail({ email: hire.email });
      const userId = user.user.id;
      const checklist = getChecklist(hire.role);
      const blocks = buildWelcomeBlocks(hire, checklist);

      await slack.chat.postMessage({
        channel: userId,
        text: `👋 Welcome to Foxglove, ${hire.name}!`,
        blocks: blocks,
      });

      await dbClient.query(
        "UPDATE new_hires SET slack_user_id = $1, welcome_sent = TRUE WHERE id = $2",
        [userId, hire.id]
      );

      console.log(`✅ Welcome message sent to ${hire.name}`);
    } catch (error) {
      console.error(`❌ Failed to send welcome to ${hire.name}:`, error.message);

      try {
        let failureMsg = `⚠️ Failed to send welcome message to *${hire.name}* (${hire.email}, ${hire.role}).`;
        if (error.data?.error === "users_not_found") {
          failureMsg += `\n\nTheir Slack account doesn't exist yet. Use \`/retry-welcome\` to try again once their account is created.`;
        } else {
          failureMsg += `\n\nError: ${error.message}\nUse \`/retry-welcome\` to try again.`;
        }

        console.log(`📩 Notifying HR about failure for ${hire.name}...`);
        await slack.chat.postMessage({
          channel: HR_NOTIFY_USER,
          text: failureMsg,
        });
        console.log(`📩 HR notified!`);
      } catch (notifyError) {
        console.error("Failed to notify HR:", notifyError.message);
      }
    }
  }

  await dbClient.end();
  console.log("Done!");
}

// Run immediately without timezone check
testWelcome();