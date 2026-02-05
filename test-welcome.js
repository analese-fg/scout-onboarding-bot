const { Client } = require("pg");
const { WebClient } = require("@slack/web-api");
const { getChecklist } = require("./checklists");
const { buildWelcomeBlocks } = require("./welcome");
require("dotenv").config();

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

async function testWelcome() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  const today = new Date().toISOString().split("T")[0];
  const result = await client.query(
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

      await client.query(
        "UPDATE new_hires SET slack_user_id = $1, welcome_sent = TRUE WHERE id = $2",
        [userId, hire.id]
      );

      console.log(`✅ Welcome message sent to ${hire.name}`);
    } catch (error) {
      console.error(`❌ Failed to send welcome to ${hire.name}:`, error.message);
    }
  }

  await client.end();
  console.log("Done!");
}

// Run immediately without timezone check
testWelcome();