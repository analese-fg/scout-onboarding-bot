// resources.js — Keyword-matched resource links for Scout onboarding bot

const resources = {
  // === General Help & Getting Started ===
  general: {
    keywords: [
      "help", "resources", "links", "getting started", "where do i start",
      "onboarding", "quick links", "documentation", "docs", "guides"
    ],
    title: "📚 Foxglove Resources & Quick Links",
    sections: [
      {
        heading: "🏠 Start Here",
        links: [
          { label: "Notion Knowledge Base", url: "https://www.notion.so/foxglove" },
          { label: "Communication & Collaboration", url: "https://www.notion.so/foxglovehq/2d553e4175fa47319db7da770edf6dfb" },
          { label: "People & Operations", url: "https://www.notion.so/foxglovehq/a512652403df420f82368fb7937d8cd7" },
          { label: "Policies", url: "https://www.notion.so/foxglovehq/5447ab8fb96746c1be6124a273fc9de0" },
        ],
      },
      {
        heading: "💬 Key Tools",
        links: [
          { label: "Slack (Foxglove HQ)", url: "https://foxgloveden.slack.com" },
          { label: "Linear (Issue Tracking)", url: "https://linear.app" },
          { label: "GitHub (Source Control)", url: "https://github.com/foxglove" },
          { label: "Google Shared Drive", url: "https://drive.google.com/drive/folders/0AKDmKJYH6QLYUk9PVA" },
        ],
      },
      {
        heading: "🙋 Need a Human?",
        links: [
          { label: "Post in #help-desk (mention @Linear Asks)", url: "https://foxgloveden.slack.com" },
          { label: "Book time with HR (Britt)", url: "https://calendar.app.google/wxpd1jmVn8Bxks1M6" },
        ],
      },
    ],
  },

  // === Communication & Collaboration ===
  communication: {
    keywords: [
      "communication", "collaboration", "open meetings",
      "google docs", "google drive", "shared drive"
    ],
    title: "👐 Communication & Collaboration",
    sections: [
      {
        heading: "",
        links: [
          { label: "Communication & Collaboration Guide", url: "https://www.notion.so/foxglovehq/2d553e4175fa47319db7da770edf6dfb" },
          { label: "Slack (Foxglove HQ)", url: "https://foxgloveden.slack.com" },
          { label: "Open Meetings Calendar", url: "https://calendar.google.com/calendar/u/0/embed?src=c_4d76e7ce4e1149be2eeab8efd646759f925b7d939a48bbe867a00ced85e09d83@group.calendar.google.com" },
          { label: "Google Shared Drive", url: "https://drive.google.com/drive/folders/0AKDmKJYH6QLYUk9PVA" },
          { label: "GitHub Notifications", url: "https://github.com/notifications" },
        ],
      },
    ],
  },

  // === Engineering ===
  engineering: {
    keywords: [
      "engineering", "dev workflow", "developer workflow",
      "quickstart", "dev environment", "engineering onboarding",
      "api design", "regression testing", "incident response",
      "on-call", "language strategy"
    ],
    title: "🔧 Engineering",
    sections: [
      {
        heading: "🚀 Getting Started",
        links: [
          { label: "Engineering Home", url: "https://www.notion.so/foxglovehq/8bd04ec75a104037911a1fd24b4213fd" },
          { label: "Engineering Onboarding", url: "https://www.notion.so/foxglovehq/263cbc8e56a380bab5a3f56ffdaa65e0" },
          { label: "Quickstart (Dev Environment)", url: "https://www.notion.so/foxglovehq/cce65bea75c34d218c055c1e8c2b837d" },
        ],
      },
      {
        heading: "📋 Workflows & Standards",
        links: [
          { label: "Developer Workflow", url: "https://www.notion.so/foxglovehq/6cc0ec37751844fc878e1cce99cfb6c5" },
          { label: "Linear Project Workflow", url: "https://www.notion.so/foxglovehq/8e4ed6ef90264510a0a1a5e0e790fec0" },
          { label: "A Bug's Life", url: "https://www.notion.so/foxglovehq/87792eb8c275407288334bdf48bf2720" },
          { label: "Language Strategy", url: "https://www.notion.so/foxglovehq/0a93dac94bda44209dded6635827b203" },
          { label: "API Design Principles", url: "https://www.notion.so/foxglovehq/7e419b0dc51646a7981cd9d13bc52b97" },
          { label: "Visual Regression Testing", url: "https://www.notion.so/foxglovehq/2b9cbc8e56a38051a551cc0bfd8483a8" },
          { label: "Project Template (TypeScript)", url: "https://github.com/foxglove/template-typescript" },
        ],
      },
      {
        heading: "🚨 Operations",
        links: [
          { label: "Incident Response", url: "https://www.notion.so/foxglovehq/d9b17e7eb2dd496f8e30c30bff4d5c6a" },
          { label: "Product Engineering at Foxglove", url: "https://www.notion.so/foxglovehq/1eccbc8e56a380d9939acaf09be3d1d7" },
          { label: "Engineering Holiday On-Call Policy", url: "https://www.notion.so/foxglovehq/2e0cbc8e56a380e4a3a2ee37a945782e" },
        ],
      },
    ],
  },

  // === Linear / Issue Tracking ===
  linear: {
    keywords: [
      "linear", "issue tracking", "project tracking", "cycles",
      "my issues"
    ],
    title: "📋 Linear (Issue Tracking)",
    sections: [
      {
        heading: "",
        links: [
          { label: "Linear", url: "https://linear.app" },
          { label: "Favorites", url: "https://linear.app/docs/favorites" },
          { label: "My Issues", url: "https://linear.app/docs/my-issues" },
          { label: "Inbox", url: "https://linear.app/docs/inbox" },
          { label: "Snooze", url: "https://linear.app/docs/inbox#snooze" },
          { label: "Using Cycles", url: "https://linear.app/docs/use-cycles" },
          { label: "Linear Project Workflow (Foxglove)", url: "https://www.notion.so/foxglovehq/8e4ed6ef90264510a0a1a5e0e790fec0" },
        ],
      },
    ],
  },

  // === Decision-Making ===
  decisions: {
    keywords: [
      "decision-making", "decision template", "decision document",
      "tradeoff", "tradeoffs", "trade-off"
    ],
    title: "💡 Decision-Making at Foxglove",
    sections: [
      {
        heading: "",
        links: [
          { label: "Decision-Making Guide", url: "https://www.notion.so/foxglovehq/2e0cbc8e56a3806d9527f97bdafdd891" },
          { label: "Decision-Making Template", url: "https://docs.google.com/document/d/1FACt-f7DcRZ93rnhdpk7joIP_6Pk43qv9spurCZynGY/edit" },
          { label: "Example: Org-switching vs Workspaces", url: "https://docs.google.com/document/d/1r7EOng9RRLUZ34FE3GZeQSR7Nt8Q_CNdelG2uUqm8NI/edit" },
          { label: "Example: SDK & Agent Architecture", url: "https://docs.google.com/document/d/1jR14QeKBmGf1KpuCLM_Y6eVrfExkD-NlzbVBG5ibSrY/edit" },
        ],
      },
    ],
  },

  // === People & Operations / HR ===
  people: {
    keywords: [
      "people ops", "people operations", "hr", "human resources",
      "time off", "pto", "vacation", "leave", "expenses",
      "rippling", "equity", "performance review", "compensation",
      "contractors", "401k", "benefits"
    ],
    title: "👩‍💻 People & Operations",
    sections: [
      {
        heading: "",
        links: [
          { label: "People & Operations Home", url: "https://www.notion.so/foxglovehq/a512652403df420f82368fb7937d8cd7" },
          { label: "Time Off & Leave", url: "https://www.notion.so/foxglovehq/6321e81fa1fe4d04969e5762ee64522b" },
          { label: "Expenses at Foxglove", url: "https://www.notion.so/foxglovehq/ed16407d3e844910959c359bf5480bc8" },
          { label: "Performance Reviews", url: "https://www.notion.so/foxglovehq/3e74a47d95884865925c4358fb74cddf" },
          { label: "Performance & Compensation", url: "https://www.notion.so/foxglovehq/2a7cbc8e56a3800c91f1c0242ddb805d" },
          { label: "Equity", url: "https://www.notion.so/foxglovehq/548f9a9ea8b94461b4a9e6bba5a82259" },
          { label: "Rippling", url: "https://www.notion.so/foxglovehq/093f6bdf159848dfb69423c9f6037768" },
          { label: "Training", url: "https://www.notion.so/foxglovehq/ce4004c29be349c08c3af7c1c5560036" },
          { label: "Contractors", url: "https://www.notion.so/foxglovehq/a36ee48bf88747fb8b497b0c71f3c1fa" },
          { label: "Contact Details & Directory", url: "https://www.notion.so/foxglovehq/2f3a1ff94a4d41a7bc5a51a8a1b2571a" },
          { label: "Book time with HR (Britt)", url: "https://calendar.app.google/wxpd1jmVn8Bxks1M6" },
        ],
      },
    ],
  },

  // === Policies ===
  policies: {
    keywords: [
      "policies", "policy list", "security policy", "compliance",
      "gdpr", "code of conduct", "anti-harassment", "whistleblower",
      "data management policy", "access control policy"
    ],
    title: "📗 Policies",
    sections: [
      {
        heading: "",
        links: [
          { label: "All Policies", url: "https://www.notion.so/foxglovehq/5447ab8fb96746c1be6124a273fc9de0" },
        ],
        text: "Foxglove maintains 24 policies including: Access Control, Anti-Harassment, Code of Conduct, GDPR Compliance, Incident Response Plan, Information Security, and more. Visit the link above to browse the full list.",
      },
    ],
  },

  // === Tool Access ===
  toolAccess: {
    keywords: [
      "tool access", "request access", "sso tools", "1password",
      "github access", "hubspot", "posthog", "aws access",
      "super admin", "figma", "fireflies"
    ],
    title: "🔑 Tool Access",
    sections: [
      {
        heading: "SSO Tools (use your Foxglove Google account)",
        links: [
          { label: "Gmail", url: "https://mail.google.com" },
          { label: "Slack", url: "https://foxglove.slack.com" },
          { label: "Notion", url: "https://www.notion.so/foxglove" },
          { label: "Linear", url: "https://linear.app" },
          { label: "Figma", url: "https://www.figma.com" },
          { label: "Fireflies", url: "https://app.fireflies.ai" },
        ],
      },
      {
        heading: "Need to Request Access?",
        links: [
          { label: "Post in #help-desk (mention @Linear Asks)", url: "https://foxgloveden.slack.com" },
        ],
        text: "Request access for: 1Password, GitHub (specify repos), HubSpot, PostHog, AWS, Super Admin",
      },
      {
        heading: "Other Tools",
        links: [
          { label: "Claude (via Rippling)", url: "https://app.rippling.com/app-shop/app/claude_custom_1_6399599d33dbbc8536982ef5" },
        ],
        text: "Brex: Check your email for an invite. Human Interest (401k): Will be sent to your personal email.",
      },
    ],
  },
};

/**
 * Check if a message is a navigational/link request (not a full question for Claude).
 * We only want to intercept when someone clearly just wants links, not an explanation.
 *
 * SENDS TO RESOURCE LINKS:
 *   "resources"  "help"  "links"  "engineering"  "policies"
 *   "show me the engineering links"  "give me hr resources"
 *
 * SENDS TO CLAUDE (even though they contain keywords):
 *   "how do I use Slack threads?"  "can you help me with my PR?"
 *   "what's the time off policy?"  "where do I find my Linear issues?"
 */
function isKeywordQuery(text) {
  const msg = text.trim();
  const msgLower = msg.toLowerCase();
  const wordCount = msg.split(/\s+/).length;

  // If it looks like a question, ALWAYS send to Claude
  const isQuestion =
    msg.endsWith("?") ||
    /^(how|what|why|when|where|who|can|could|should|does|do|is|are|will|would)\b/i.test(msg);
  if (isQuestion) return false;

  // Very short messages (1-2 words) — likely a keyword lookup
  if (wordCount <= 2) return true;

  // 3-word messages, but only if they DON'T start with conversational verbs
  if (wordCount === 3) {
    const conversationalStarts = /^(i want|i need|tell me|explain|help me|how do|can you|please)\b/i;
    if (!conversationalStarts.test(msg)) return true;
  }

  // Explicit "give me links" patterns at any length
  const linkPatterns = /^(show me|give me|link to|links for|links about)\b.*(links|resources|pages|docs)\b/i;
  if (linkPatterns.test(msg)) return true;

  // Exact match on navigational phrases
  const exactPhrases = [
    "i need help", "i need resources", "i need links",
    "show me resources", "show me links",
    "give me resources", "give me links",
  ];
  if (exactPhrases.includes(msgLower)) return true;

  return false;
}

/**
 * Match a user message against resource keywords.
 * Returns an array of matched resource categories, sorted by relevance (most keyword hits first).
 */
function matchResources(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  const matches = [];

  for (const [key, resource] of Object.entries(resources)) {
    const hitCount = resource.keywords.filter((kw) => msg.includes(kw)).length;
    if (hitCount > 0) {
      matches.push({ key, resource, hitCount });
    }
  }

  // Sort by number of keyword hits (most relevant first)
  matches.sort((a, b) => b.hitCount - a.hitCount);
  return matches.map((m) => m.resource);
}

/**
 * Format a matched resource into a Slack mrkdwn string.
 */
function formatResourceForSlack(resource) {
  let msg = `*${resource.title}*\n`;

  for (const section of resource.sections) {
    if (section.heading) {
      msg += `\n${section.heading}\n`;
    }
    for (const link of section.links) {
      msg += `• <${link.url}|${link.label}>\n`;
    }
    if (section.text) {
      msg += `_${section.text}_\n`;
    }
  }

  return msg;
}

/**
 * Build a Slack response for a keyword-style query.
 * Returns null if no resources matched or if the message looks like a full question
 * (so it should go to Claude instead).
 */
function getResourceResponse(userMessage) {
  // Only intercept short keyword queries, not full questions
  if (!isKeywordQuery(userMessage)) return null;

  const matched = matchResources(userMessage);
  if (matched.length === 0) return null;

  // If the top match is "general" (help, resources, etc.), return the overview
  if (matched[0] === resources.general) {
    return formatResourceForSlack(resources.general);
  }

  // Otherwise return the top 1-2 most relevant categories
  const topMatches = matched.slice(0, 2);
  let response = topMatches.map(formatResourceForSlack).join("\n---\n\n");
  response += "\n_💡 Type *resources* or *help* to see all quick links._";
  return response;
}

module.exports = { resources, matchResources, formatResourceForSlack, getResourceResponse };