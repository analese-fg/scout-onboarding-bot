const checklists = {
  default: {
    tasks: [
      "Set up your email signature",
      "Complete your Slack profile",
      "Review the employee handbook",
    ],
    tools: [
      "Slack",
      "Gmail",
      "Google Calendar",
    ],
  },
  "Product Designer": {
    tasks: [
      "Set up your email signature",
      "Complete your Slack profile",
      "Review the employee handbook",
      "Review the design system documentation",
      "Set up your design environment",
    ],
    tools: [
      "Slack",
      "Gmail",
      "Google Calendar",
      "Figma",
      "Notion",
    ],
  },
  "Software Engineer": {
    tasks: [
      "Set up your email signature",
      "Complete your Slack profile",
      "Review the employee handbook",
      "Clone the main repositories",
      "Set up your local development environment",
      "Review the engineering wiki",
    ],
    tools: [
      "Slack",
      "Gmail",
      "Google Calendar",
      "GitHub",
      "VS Code",
      "Linear",
    ],
  },
};

function getChecklist(role) {
  return checklists[role] || checklists.default;
}

const roles = Object.keys(checklists).filter((role) => role !== "default");

module.exports = { getChecklist, roles };