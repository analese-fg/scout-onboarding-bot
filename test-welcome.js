const { Client } = require("pg");
const { WebClient } = require("@slack/web-api");
const { getChecklist, formatToolWithLink, getToolsByAccess, NOTION_ONBOARDING_LINK, NOTION_PRODUCT_ONBOARDING_LINK } = require("./checklists");
require("dotenv").config();

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

function formatTasksWithLinks(tasks) {
  return tasks.map((task) => {
    if (task.includes("I-9 verification")) {
      return `✅ <https://app.rippling.com|Complete I-9 verification in Rippling>`;
    } else if (task.includes("Gmail access")) {
      return `✅ <https://mail.google.com|Set up Gmail access>`;
    } else if (task.includes("employee handbook")) {
      return `☐ Review the <https://www.notion.so/foxglovehq|employee handbook in Notion>`;
    } else if (task.includes("Company Directory")) {
      return `☐ <https://www.notion.so/foxglovehq/dc0b046b5cad439bb3da128869dc3083|Add yourself to the Company Directory>`;
    } else if (task.includes("Vanta security training")) {
      return `☐ <https://app.vanta.com/onboarding|Complete Vanta security training>`;
    } else if (task.includes("1Password")) {
      return `☐ <https://1password.com|Set up 1Password> (download desktop app - browser extensions aren't sufficient)`;
    } else if (task.includes("2FA in Gmail")) {
      return `☐ <https://mail.google.com|Enable 2FA in Gmail>`;
    } else if (task.includes("Slack profile")) {
      return `☐ <https://foxglove.slack.com|Complete your Slack profile>`;
    } else if (task.includes("working hours in Google Calendar")) {
      return `☐ <https://calendar.google.com|Set your working hours in Google Calendar>`;
    } else if (task.includes("Product Onboarding Notion")) {
      return `☐ <${NOTION_PRODUCT_ONBOARDING_LINK}|Review Product Onboarding Notion page> thoroughly`;
    } else if (task.includes("Discord community")) {
      return `☐ <https://foxglove.dev/chat|Join Discord community>`;
    } else if (task.includes("Clone main repositories")) {
      return `☐ <https://github.com/foxglove|Clone main repositories>`;
    } else if (task.includes("GitHub access")) {
      return `☐ <https://github.com/foxglove|Get GitHub access>`;
    }
    return `☐ ${task}`;
  }).join("\n");
}

function formatPreDay1Tasks(tasks) {
  return tasks.map((task) => {
    if (task.includes("I-9 verification")) {
      return `✅ <https://app.rippling.com|Complete I-9 verification in Rippling>`;
    } else if (task.includes("Gmail access")) {
      return `✅ <https://mail.google.com|Set up Gmail access>`;
    }
    return `✅ ${task}`;
  }).join("\n");
}

function buildWelcomeBlocks(hire, checklist) {
  const blocks = [];
  
  let onboardingLinks = `📚 <${NOTION_ONBOARDING_LINK}|First Day Checklist>`;
  if (hire.role === "Product") {
    onboardingLinks += ` · <${NOTION_PRODUCT_ONBOARDING_LINK}|Product Onboarding>`;
  }

  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `👋 *Welcome to Foxglove, ${hire.name}!*\n\nWe're so excited to welcome you on the *${hire.role}* team. Here's everything you need to get started:\n\n${onboardingLinks}`,
    },
  });
  blocks.push({ type: "divider" });

  // Pre-Day 1 verification (should already be done)
  if (checklist.preDay1?.tasks) {
    const preDay1Tasks = formatPreDay1Tasks(checklist.preDay1.tasks);
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*⚠️ Quick Check — You should have completed these before today:*\n\n${preDay1Tasks}\n\n_If any of these aren't done, please complete them ASAP or reach out to <slack://channel?team=T&id=C09V0PX6UTU|#help-desk> for assistance._`,
      },
    });
    blocks.push({ type: "divider" });
  }

  // Day 1 Tasks
  if (checklist.day1?.tasks) {
    const day1Tasks = formatTasksWithLinks(checklist.day1.tasks);
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*📋 Day 1 Checklist:*\n\n${day1Tasks}`,
      },
    });
    blocks.push({ type: "divider" });
  }

  // Day 2 Tasks (if applicable)
  if (checklist.day2?.tasks) {
    const day2Tasks = formatTasksWithLinks(checklist.day2.tasks);
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*📋 Day 2 Checklist:*\n\n${day2Tasks}`,
      },
    });
    blocks.push({ type: "divider" });
  }

  // Week 1 Tasks
  if (checklist.week1?.tasks) {
    const week1Tasks = formatTasksWithLinks(checklist.week1.tasks);
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*📋 First Week Checklist:*\n\n${week1Tasks}`,
      },
    });
    blocks.push({ type: "divider" });
  }

  // Tools section grouped by access type
  const toolsByAccess = getToolsByAccess(hire.role);
  let toolsText = "*🔧 Tools to set up:*\n\n";
  
  if (toolsByAccess.sso.length > 0) {
    toolsText += `*SSO (sign in with your Foxglove Google account):*\n${toolsByAccess.sso.join(" · ")}\n\n`;
  }
  if (toolsByAccess.request.length > 0) {
    toolsText += `*Request access via <slack://channel?team=T&id=C09V0PX6UTU|#help-desk>:*\n${toolsByAccess.request.join(" · ")}\n\n`;
  }
  if (toolsByAccess.rippling.length > 0) {
    toolsText += `*Set up through <https://app.rippling.com|Rippling>:*\n${toolsByAccess.rippling.join(" · ")}\n\n`;
  }
  if (toolsByAccess.download.length > 0) {
    toolsText += `*Download:*\n${toolsByAccess.download.join(" · ")}\n\n`;
  }
  if (toolsByAccess.email.length > 0) {
    toolsText += `*Check your email:*\n${toolsByAccess.email.map(t => `${t.name} - ${t.note}`).join("\n")}\n\n`;
  }

  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: toolsText,
    },
  });
  blocks.push({ type: "divider" });

  // Tips section
  if (checklist.tips && checklist.tips.length > 0) {
    const tips = checklist.tips.map(tip => `💡 ${tip}`).join("\n");
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Pro Tips:*\n\n${tips}`,
      },
    });
    blocks.push({ type: "divider" });
  }

  // Resources section
  if (checklist.resources && checklist.resources.length > 0) {
    const resources = checklist.resources
      .map(page => `<${page.url}|${page.name}>`)
      .join(" · ");
    blocks.push({
      type: "context",
      elements: [{
        type: "mrkdwn",
        text: `*📖 Key Resources:* ${resources}`,
      }],
    });
  }

  // Request tool access button
  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Need access to any tools? Use <slack://channel?team=T&id=C09V0PX6UTU|#help-desk> with <@U063B8CP2KY> or click below:",
    },
  });
  blocks.push({
    type: "actions",
    elements: [{
      type: "button",
      text: { type: "plain_text", text: "🔑 Request Tool Access" },
      action_id: "request_tool_access",
      style: "primary",
    }],
  });

  return blocks;
}

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