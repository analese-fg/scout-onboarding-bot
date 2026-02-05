const NOTION_ONBOARDING_LINK = "https://www.notion.so/foxglovehq/First-Day-Checklist-d44e5eb1389f4218b566ffb3631c0584";
const NOTION_PRODUCT_ONBOARDING_LINK = "https://www.notion.so/foxglovehq/Product-Onboarding-2c9cbc8e56a380c89a2af8b8d066dd5a";

const toolInfo = {
  "Gmail": { link: "https://mail.google.com", access: "sso" },
  "Slack": { link: "https://foxglove.slack.com", access: "sso" },
  "Notion": { link: "https://www.notion.so/foxglovehq", access: "sso" },
  "Linear": { link: "https://linear.app", access: "sso" },
  "Fireflies": { link: "https://app.fireflies.ai", access: "sso" },
  "ChatGPT": { link: "https://chat.openai.com", access: "request" },
  "VS Code": { link: "https://code.visualstudio.com", access: "download" },
  "Foxglove HQ": { link: "https://app.foxglove.dev", access: "request" },
  "Vanta": { link: "https://app.vanta.com/onboarding", access: "sso" },
  "Discord": { link: "https://foxglove.dev/chat", access: "sso" },
  "Rippling": { link: "https://app.rippling.com", access: "sso" },
  "Omni": { link: "https://omni.co", access: "sso" },
  "1Password": { link: "https://1password.com", access: "request" },
  "GitHub": { link: "https://github.com/foxglove", access: "request" },
  "Hubspot": { link: "https://app.hubspot.com", access: "request" },
  "PostHog": { link: "https://app.posthog.com", access: "request" },
  "AWS": { link: null, access: "request" },
  "Pylon": { link: null, access: "request" },
  "Super Admin": { link: null, access: "request" },
  "Ashby": { link: "https://app.ashbyhq.com", access: "request" },
  "CoderPad": { link: "https://coderpad.io", access: "request" },
  "Apollo": { link: "https://app.apollo.io", access: "request" },
  "Figma": { link: "https://www.figma.com", access: "request", note: "Sign up via SSO, then request a license. If ticket doesn't work, ask Ellis Neder for a team invite" },
  "Claude": { link: "https://app.rippling.com/app-shop/app/claude_custom_1_6399599d33dbbc8536982ef5", access: "rippling" },
  "Cursor": { link: "https://cursor.com/team/accept-invite?code=7421262f2546c5ce25c7d08b48e795213acfa05cd46df0d2", access: "request" },
  "Brex": { link: null, access: "email", note: "Check your email for an invite from Brex" },
};

const checklists = {
  default: {
    preDay1: {
      description: "You should have completed these before today:",
      tasks: [
        "Complete I-9 verification in Rippling",
        "Set up Gmail access",
      ],
    },
    day1: {
      tasks: [
        "Enable 2FA in Gmail",
        "Set up 1Password (download desktop app - browser extensions aren't sufficient)",
        "Complete your Slack profile",
        "Review the employee handbook in Notion",
        "Add yourself to the Company Directory",
        "Set your working hours in Google Calendar",
        "Connect your calendar to Slack for auto-status updates",
        "Complete Vanta security training",
      ],
    },
    week1: {
      tasks: [
        "Review Company Overview, Values, and Norms pages",
        "Add relevant holiday calendar to Google Calendar",
        "Join Discord community",
        "Review Time Off & Leave policy",
        "Review Remote Work Policy and WFH Budget",
        "Set up email signature with logo and links",
        "Review benefits enrollment (if US FTE)",
      ],
    },
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "Brex",
      "Vanta",
      "Discord",
    ],
    resources: [
      { name: "First Day Checklist", url: NOTION_ONBOARDING_LINK },
      { name: "Company Overview", url: "https://www.notion.so/foxglovehq/2e3cbc8e56a380cc98d0f3ee82f16599" },
      { name: "Company Values", url: "https://www.notion.so/foxglovehq/Foxglove-Values-e2adb0c2891a4152b787702d6d5ea460" },
      { name: "Foxglove Norms", url: "https://www.notion.so/foxglovehq/Foxglove-Norms-07ca177fb6654bc1a65bfed0542f8be8" },
    ],
    tips: [
      "Use #help-desk channel with <@U063B8CP2KY> for tool access requests",
      "Be cautious of impersonation scams (especially using Adrian's name) - ping @Britt if unsure",
      "Team members respond quickly when you reach out - don't hesitate to ask questions",
    ],
  },

  "Customer Success": {
    preDay1: {
      description: "You should have completed these before today:",
      tasks: [
        "Complete I-9 verification in Rippling",
        "Set up Gmail access",
      ],
    },
    day1: {
      tasks: [
        "Enable 2FA in Gmail",
        "Set up 1Password (download desktop app)",
        "Complete your Slack profile",
        "Review the employee handbook in Notion",
        "Review CSE onboarding documentation",
        "Get Pylon access",
        "Complete Vanta security training",
      ],
    },
    day2: {
      tasks: [
        "Get Super Admin setup (requires team bandwidth for training)",
        "Learn Pylon internal chatter protocols",
        "Review CSE etiquette and customer response guidelines",
      ],
    },
    week1: {
      tasks: [
        "Set up personal Foxglove project (separate from work trial project)",
        "Check Hubspot access",
        "Review Pulley for equity grants portal",
        "Set up email signature",
      ],
    },
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "Brex",
      "Pylon",
      "Super Admin",
      "Hubspot",
      "Vanta",
    ],
    resources: [
      { name: "First Day Checklist", url: NOTION_ONBOARDING_LINK },
    ],
    tips: [
      "CSE team is very transparent - reach out for swift answers when stuck",
      "Pylon internal chatter is tribal knowledge - use best judgment",
      "Super Admin training requires team bandwidth - be patient",
    ],
  },

  "HR/Talent": {
    preDay1: {
      description: "You should have completed these before today:",
      tasks: [
        "Complete I-9 verification in Rippling",
        "Set up Gmail access",
      ],
    },
    day1: {
      tasks: [
        "Enable 2FA in Gmail",
        "Set up 1Password (download desktop app)",
        "Complete your Slack profile",
        "Review the employee handbook in Notion",
        "Get Ashby access",
        "Set up ChatGPT and Claude",
        "Complete Vanta security training",
      ],
    },
    week1: {
      tasks: [
        "Review Ashby how-to guide and nuances",
        "Get CoderPad access",
        "Review 30/60/90 day expectations document",
        "Learn stack-ranked priorities and goals",
        "Learn scheduling for work trials across states/countries",
        "Set up email signature",
      ],
    },
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "Brex",
      "Ashby",
      "ChatGPT",
      "Claude",
      "CoderPad",
      "Vanta",
    ],
    resources: [
      { name: "First Day Checklist", url: NOTION_ONBOARDING_LINK },
    ],
    tips: [
      "Onboarding is not as difficult as the work trial!",
      "Ashby may take time to set up if onboarding many people",
      "Google Calendar - learn to navigate other people's schedules",
      "Ask for stack-ranked priorities early",
    ],
  },

  "Product": {
    preDay1: {
      description: "You should have completed these before today:",
      tasks: [
        "Complete I-9 verification in Rippling",
        "Set up Gmail access",
      ],
    },
    day1: {
      tasks: [
        "Enable 2FA in Gmail",
        "Set up 1Password (download desktop app)",
        "Complete your Slack profile",
        "Review the employee handbook in Notion",
        "Get PostHog access",
        "Get Foxglove HQ access",
        "Set up Cursor (use team invite link)",
        "Set up ChatGPT and Claude",
        "Complete Vanta security training",
      ],
    },
    week1: {
      tasks: [
        "Review Product Onboarding Notion page thoroughly",
        "Get Linear access",
        "Get Hubspot access",
        "Get Fireflies access",
        "Get Omni access",
        "Schedule 1:1s with key team members",
        "Join recommended Slack channels",
        "Learn difference between PostHog and Omni data",
        "Set up email signature",
      ],
    },
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "Brex",
      "PostHog",
      "Foxglove HQ",
      "Cursor",
      "ChatGPT",
      "Claude",
      "Linear",
      "Hubspot",
      "Fireflies",
      "Omni",
      "Figma",
      "Vanta",
    ],
    resources: [
      { name: "First Day Checklist", url: NOTION_ONBOARDING_LINK },
      { name: "Product Onboarding", url: NOTION_PRODUCT_ONBOARDING_LINK },
      { name: "Foxglove Values", url: "https://www.notion.so/foxglovehq/Foxglove-Values-e2adb0c2891a4152b787702d6d5ea460" },
      { name: "Roadmapping at Foxglove", url: "https://www.notion.so/foxglovehq/ef621bea2df0412e9a0d8d2e49dc7f60" },
      { name: "How to Write a Product Spec", url: "https://www.notion.so/foxglovehq/d4db21793e264141951e524855ea4b44" },
      { name: "Foxglove Docs", url: "https://docs.foxglove.dev/docs" },
      { name: "Changelog", url: "https://docs.foxglove.dev/changelog" },
    ],
    slackChannels: {
      core: ["announcements", "random", "product", "growth", "engineering", "marketing", "sales", "design", "customer-success", "developer-relations"],
      useful: ["survey-responses", "robotics-news", "app-crashes", "team-earth", "team-fleet", "team-data-curation", "team-fire"],
      culture: ["quotes", "ihazahappi", "ihaveasad", "memes"],
    },
    tips: [
      "Daily 1:1s with your manager during the first few days helps when feeling stuck",
      "Learn Cursor and what questions to ask about the codebase to ramp up quickly",
      "Ask about which Slack channels to join and how to organize them",
      "Customer Slack channels start with 'customer-', 'team-', or 'trial-'",
    ],
  },

  "Software Engineering": {
    preDay1: {
      description: "You should have completed these before today:",
      tasks: [
        "Complete I-9 verification in Rippling",
        "Set up Gmail access",
      ],
    },
    day1: {
      tasks: [
        "Enable 2FA in Gmail",
        "Set up 1Password (download desktop app)",
        "Complete your Slack profile",
        "Review the employee handbook in Notion",
        "Get GitHub access",
        "Set up your text editor/IDE (VS Code or Cursor)",
        "Set up command line tools (typechecking, linting, testing)",
        "Get Linear access",
        "Complete Vanta security training",
      ],
    },
    week1: {
      tasks: [
        "Clone main repositories",
        "Review PR process and lifecycle documentation",
        "Learn PR review distribution process",
        "Get Figma access",
        "Set up testing environment",
        "Learn codebase navigation",
        "Learn how to generate and share development data",
        "Explore Foxglove Playground",
        "Review Storybook tests / automated testing process",
        "Set up Claude for coding assistance",
        "Set up email signature",
      ],
    },
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "Brex",
      "GitHub",
      "VS Code",
      "Cursor",
      "Linear",
      "Claude",
      "Figma",
      "Vanta",
    ],
    resources: [
      { name: "First Day Checklist", url: NOTION_ONBOARDING_LINK },
      { name: "Mac OS Engineering Set Up", url: "https://www.notion.so/foxglovehq/2f6cbc8e56a380d18e8bd96d605e93ea" },
    ],
    tips: [
      "Having an onboarding buddy makes things less intimidating",
      "Use #help-desk channel for IT/tool requests - learn how it works early",
      "PR lifecycle documentation would have been helpful - ask for it if not provided",
      "Figma access may need manual setup",
      "A checklist helps - refer to this often!",
    ],
  },

  "Sales": {
    preDay1: {
      description: "You should have completed these before today:",
      tasks: [
        "Complete I-9 verification in Rippling",
        "Set up Gmail access",
      ],
    },
    day1: {
      tasks: [
        "Enable 2FA in Gmail",
        "Set up 1Password (download desktop app)",
        "Complete your Slack profile",
        "Review the employee handbook in Notion",
        "Get Hubspot access",
        "Get Fireflies access",
        "Get Apollo access",
        "Create onboarding plan with your manager",
        "Complete Vanta security training",
      ],
    },
    week1: {
      tasks: [
        "Review 'Getting Started on My First Day' Notion link",
        "Set up ChatGPT and Claude",
        "Set up email signature",
        "Watch for Human Interest 401(k) email (sent to personal email)",
      ],
    },
    tools: [
      "Gmail",
      "Slack",
      "Notion",
      "1Password",
      "Brex",
      "Hubspot",
      "Fireflies",
      "Apollo",
      "ChatGPT",
      "Claude",
      "Vanta",
    ],
    resources: [
      { name: "First Day Checklist", url: NOTION_ONBOARDING_LINK },
    ],
    tips: [
      "The 'Getting Started on My First Day' Notion link exists - make sure someone shows you",
      "Human Interest will send 401(k) info to your personal email",
      "Create an onboarding plan with your manager on Day 1",
      "If someone doesn't have the answer, they'll point you to someone who does",
    ],
  },
};

function getChecklist(role) {
  return checklists[role] || checklists.default;
}

function getToolInfo(tool) {
  return toolInfo[tool] || { link: null, access: "unknown" };
}

function formatToolWithLink(tool) {
  const info = getToolInfo(tool);
  if (info.link) {
    return `<${info.link}|${tool}>`;
  }
  return tool;
}

function getToolsByAccess(role) {
  const checklist = getChecklist(role);
  const sso = [];
  const request = [];
  const rippling = [];
  const email = [];
  const download = [];

  for (const tool of checklist.tools) {
    const info = getToolInfo(tool);
    const formatted = formatToolWithLink(tool);

    switch (info.access) {
      case "sso":
        sso.push(formatted);
        break;
      case "request":
        if (info.note) {
          request.push(`${formatted} (${info.note})`);
        } else {
          request.push(formatted);
        }
        break;
      case "rippling":
        rippling.push(formatted);
        break;
      case "email":
        email.push({ name: tool, note: info.note });
        break;
      case "download":
        download.push(formatted);
        break;
    }
  }

  return { sso, request, rippling, email, download };
}

function getRequestableTools() {
  return Object.entries(toolInfo)
    .filter(([_, info]) => info.access === "request")
    .map(([name, _]) => name);
}

function getRequestableToolsForRole(role) {
  const checklist = getChecklist(role);
  return checklist.tools.filter((tool) => {
    const info = getToolInfo(tool);
    return info.access === "request";
  });
}

const roles = Object.keys(checklists).filter((role) => role !== "default");

module.exports = {
  getChecklist,
  getToolInfo,
  formatToolWithLink,
  getToolsByAccess,
  getRequestableTools,
  getRequestableToolsForRole,
  roles,
  NOTION_ONBOARDING_LINK,
  NOTION_PRODUCT_ONBOARDING_LINK,
};