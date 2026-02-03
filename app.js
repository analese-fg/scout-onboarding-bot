const { App } = require("@slack/bolt");
require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.message(async ({ message, say }) => {
  await say(
    `👋 Hi there! I'm Scout, your onboarding buddy. You said: "${message.text}"`
  );
});

(async () => {
  await app.start();
  console.log("⚡️ Scout is running!");
})();