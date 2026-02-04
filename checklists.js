const NOTION_ONBOARDING_LINK = "https://www.notion.so/foxglovehq/";

const toolLinks = {
  "Gmail": "https://mail.google.com",
  "Slack": "https://foxglove.slack.com",
  "Notion": "https://www.notion.so/foxglovehq",
  "1Password": "https://foxglove.1password.com",
  "GitHub": "https://github.com/foxglove",
  "Linear": "https://linear.app",
  "Figma": "https://www.figma.com",
  "Hubspot": "https://app.hubspot.com",
  "PostHog": "https://app.posthog.com",
  "Fireflies": "https://app.fireflies.ai",
  "Ashby": "https://app.ashbyhq.com",
  "Apollo": "https://app.apollo.io",
  "ChatGPT": "https://chat.openai.com",
  "Claude": "https://app.rippling.com/app-shop/app/claude_custom_1_6399599d33dbbc8536982ef5",
  "Cursor": "https://cursor.sh",
  "VS Code": "https://code.visualstudio.com/",
  "CoderPad": "https://coderpad.io",
  "Foxglove HQ": "https://app.foxglove.dev",
  "Pylon": null,
  "Super Admin": null,
};

const checklists = {
  default: {
    tasks: [
      "Set up your email signature",
      "Complete your Slack profile",
      "Review the employee handbook in Notion",
      "Set up 1Password",
    ],
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
    ],
  },
  "Customer Success": {
    tasks: [
      "Set up your email signature",
      "Complete your Slack profile",
      "Review the employee handbook in Notion",
      "Set up 1Password",
      "Review CSE onboarding documentation",
      "Get access to Super Admin (ask your manager)",
      "Learn Pylon and customer response etiquette",
    ],
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "Pylon",
      "Super Admin",
      "Hubspot",
    ],
  },
  "HR/Talent": {
    tasks: [
      "Set up your email signature",
      "Complete your Slack profile",
      "Review the employee handbook in Notion",
      "Set up 1Password",
      "Get Ashby access and review how-to guide",
      "Set up ChatGPT/Claude",
      "Review 30/60/90 day expectations",
    ],
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "Ashby",
      "ChatGPT",
      "Claude",
      "CoderPad",
    ],
  },
  "Product": {
    tasks: [
      "Set up your email signature",
      "Complete your Slack profile",
      "Review the employee handbook in Notion",
      "Set up 1Password",
      "Review Product onboarding Notion page",
      "Set up Cursor and learn useful codebase questions",
      "Get access to PostHog",
      "Schedule 1:1s with key team members",
    ],
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "PostHog",
      "Foxglove HQ",
      "Cursor",
      "Claude",
      "ChatGPT",
      "Linear",
      "Hubspot",
      "Fireflies",
    ],
  },
  "Software Engineering": {
    tasks: [
      "Set up your email signature",
      "Complete your Slack profile",
      "Review the employee handbook in Notion",
      "Set up 1Password",
      "Set up your development environment",
      "Clone main repositories",
      "Set up command line tools (typechecking, linting, testing)",
      "Review PR process and lifecycle documentation",
      "Learn how to use the IT help channel",
    ],
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "GitHub",
      "VS Code",
      "Cursor",
      "Linear",
      "Claude",
      "Figma",
    ],
  },
  "Sales": {
    tasks: [
      "Set up your email signature",
      "Complete your Slack profile",
      "Review the employee handbook in Notion",
      "Set up 1Password",
      "Review 'Getting started on my first day' Notion link",
      "Set up Hubspot",
      "Set up Apollo",
      "Create onboarding plan with your manager",
    ],
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "Hubspot",
      "Fireflies",
      "Apollo",
      "ChatGPT",
      "Claude",
    ],
  },
};

function getChecklist(role) {
  return checklists[role] || checklists.default;
}

function formatToolWithLink(tool) {
  const link = toolLinks[tool];
  if (link) {
    return `<${link}|${tool}>`;
  }
  return tool;
}

const roles = Object.keys(checklists).filter((role) => role !== "default");

module.exports = { getChecklist, roles, formatToolWithLink, NOTION_ONBOARDING_LINK };