const { App } = require("@slack/bolt");
const { Client } = require("pg");
require("dotenv").config();
const http = require("http");
const { roles } = require("./checklists");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
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
  const channelId = body.channel?.id;
  const values = view.state.values;
  const name = values.name_block.name_input.value;
  const email = values.email_block.email_input.value;
  const role = values.role_block.role_input.selected_option.value;
  const startDate = values.start_date_block.start_date_input.selected_date;

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

app.message(async ({ message, say }) => {
  await say(
    `👋 Hi there! I'm Scout, your onboarding buddy. You said: "${message.text}"`
  );
});

(async () => {
  await app.start();
  console.log("⚡️ Scout is running!");

  const port = process.env.PORT || 3000;
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Scout is healthy!");
  }).listen(port, () => {
    console.log(`🩺 Health check server running on port ${port}`);
  });
})();