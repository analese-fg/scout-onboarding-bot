const companyKnowledge = `
# Foxglove Onboarding Information

## General Information
- Use #help-desk in Slack and mention @Linear Asks to request tool access or IT help
- Most tools use SSO (Single Sign-On) through Google
- Check Notion for documentation and onboarding guides
- Need to meet with HR? Book time with Britt: https://calendar.app.google/wxpd1jmVn8Bxks1M6

## Communication & Collaboration

Foxglove is a geographically distributed remote-first team. Your colleagues may not keep your same work schedule or be online during your entire work day.

### Slack (https://foxgloveden.slack.com)
Slack is the primary communication tool for synchronous and asynchronous communication.
- Prefer to post in open channels over private channels for knowledge osmosis
- Use threads - signal a thread with the 🧵 emoji
- There are no stupid questions - NEVER ridicule a question or the asker
- Be mindful of conversation context - avoid derailing discussions
- Note: Slack messages are deleted after 90 days. Move decisions and action items to Github tickets or Notion pages.

### Linear (https://linear.app)
Linear is the primary issue tracking, project planning, and project tracking tool. All closed source repos use Linear for issue tracking.
- Use Favorites to quickly find relevant views: https://linear.app/docs/favorites
- My Issues provides a list of your assignments: https://linear.app/docs/my-issues
- Use the Inbox to manage updates: https://linear.app/docs/inbox
- Use Snooze to come back to notifications: https://linear.app/docs/inbox#snooze
- If engineering work is happening, there should be a Linear issue tracking it
- Use cycles to break larger projects into focused time-boxed workloads: https://linear.app/docs/use-cycles
- Use the branch name from Linear when starting a branch - Linear will automatically update the issue status
- If you forget to use the branch name, write "Fixes: FG-###" or "Resolves: FG-###" in the PR description

### Github (https://github.com/foxglove)
Github is for source control, change review, and CI/CD.
- Configure your Github notifications - being messaged via Github is equivalent to Slack
- Turn off email notifications and use the Notifications dashboard: https://github.com/notifications
- Do not expect a separate Slack message when someone comments on your PR
- If conversation devolves into back-and-forth, schedule a synchronous conversation

### Notion
Notion is the knowledge base. When you want to learn about why/what/how to do something, start with Notion. All processes and collaboration documents should be discoverable via Notion.

### Google Docs & Drive
Use Google docs for collaborative documents since it has better commenting and editing features.
- Use the Foxglove Default shared drive: https://drive.google.com/drive/folders/0AKDmKJYH6QLYUk9PVA
- Prefer this drive unless the document is sensitive

### Open Meetings
We prefer to post meetings on an open calendar for visibility.
- Add the Open Meetings calendar: https://calendar.google.com/calendar/u/0/embed?src=c_4d76e7ce4e1149be2eeab8efd646759f925b7d939a48bbe867a00ced85e09d83@group.calendar.google.com
- Click the (+) icon in the bottom right to add it to your Google Calendar
- When joining as an observer, use meeting chat for questions so participants can address when able

## Decision-Making at Foxglove
Use the Decision-Making Template for decisions impacting Foxglove: https://docs.google.com/document/d/1FACt-f7DcRZ93rnhdpk7joIP_6Pk43qv9spurCZynGY/edit

Use this template when:
- Deciding between features or technical trade-offs
- Allocating limited resources across competing initiatives
- Evaluating different tools or software

Tips for effective decision documents:
- Be concise and structured
- Make tradeoffs explicit
- Write for the decision-maker, not the author

Example decision documents:
- Org-switching vs Workspaces: https://docs.google.com/document/d/1r7EOng9RRLUZ34FE3GZeQSR7Nt8Q_CNdelG2uUqm8NI/edit
- SDK & Agent Architecture Decision: https://docs.google.com/document/d/1jR14QeKBmGf1KpuCLM_Y6eVrfExkD-NlzbVBG5ibSrY/edit

## People and Operations
- Performance Reviews: https://www.notion.so/foxglovehq/3e74a47d95884865925c4358fb74cddf
- Contact Details & Company Directory: https://www.notion.so/foxglovehq/2f3a1ff94a4d41a7bc5a51a8a1b2571a
- Expenses at Foxglove: https://www.notion.so/foxglovehq/ed16407d3e844910959c359bf5480bc8
- Time Off & Leave: https://www.notion.so/foxglovehq/6321e81fa1fe4d04969e5762ee64522b
- Rippling: https://www.notion.so/foxglovehq/093f6bdf159848dfb69423c9f6037768
- Equity: https://www.notion.so/foxglovehq/548f9a9ea8b94461b4a9e6bba5a82259
- Training: https://www.notion.so/foxglovehq/ce4004c29be349c08c3af7c1c5560036
- Performance & Compensation: https://www.notion.so/foxglovehq/2a7cbc8e56a3800c91f1c0242ddb805d
- Contractors: https://www.notion.so/foxglovehq/a36ee48bf88747fb8b497b0c71f3c1fa
- Policies: https://www.notion.so/foxglovehq/5447ab8fb96746c1be6124a273fc9de0

## Engineering

### Key Engineering Pages
- Developer Workflow: https://www.notion.so/foxglovehq/6cc0ec37751844fc878e1cce99cfb6c5
- Engineering Onboarding: https://www.notion.so/foxglovehq/263cbc8e56a380bab5a3f56ffdaa65e0
- Quickstart: https://www.notion.so/foxglovehq/cce65bea75c34d218c055c1e8c2b837d
- A Bug's Life: https://www.notion.so/foxglovehq/87792eb8c275407288334bdf48bf2720
- Linear Project Workflow: https://www.notion.so/foxglovehq/8e4ed6ef90264510a0a1a5e0e790fec0
- Incident Response: https://www.notion.so/foxglovehq/d9b17e7eb2dd496f8e30c30bff4d5c6a
- Product Engineering at Foxglove: https://www.notion.so/foxglovehq/1eccbc8e56a380d9939acaf09be3d1d7
- API Design Principles: https://www.notion.so/foxglovehq/7e419b0dc51646a7981cd9d13bc52b97
- Visual Regression Testing: https://www.notion.so/foxglovehq/2b9cbc8e56a38051a551cc0bfd8483a8

### Developer Workflow
This builds on the Communication & Collaboration page with engineering-specific workflows.

#### Linear for Engineering
- Use cycles to break larger projects into focused time-boxed workloads
- During team planning, teams bring issues into the cycle and assign to engineers
- Use the branch name from Linear (icon in upper right) when starting a branch
- Linear will automatically update the issue to in-progress, in-review, and done
- If you forget, write "Fixes: FG-###" or "Resolves: FG-###" in the PR description

#### PR Workflow
- Request review explicitly from 1 or more team members - opening a PR is not enough
- Check https://github.com/notifications for PRs awaiting your review
- Double check your changes before merging - easy to overlook auto-generated files
- Leave code in a better state than you found it - documentation, cleanup, tweaks
- Give actionable advice on pull requests - indicate why you don't like something
- Avoid unnecessary back-and-forth - be clear about what change to implement
- If synchronous communication is needed, schedule a pair-programming session

#### Repository Standards
- Use "main" as the primary working branch
- Changes to main should happen via pull-request - avoid pushing directly
- Main should always be green - if tests are failing, time is wasted debugging
- Use the project template for new repos: https://github.com/foxglove/template-typescript

#### Consistency Guidelines
- Avoid introducing new tools unless justified - discuss with team first
- Avoid introducing new languages - TypeScript is primary, Go for performance-sensitive backend
- Avoid introducing new frameworks - use what's already in use elsewhere

## Tools and How to Access Them

### SSO Tools (sign in with your Foxglove Google account)
- Gmail: https://mail.google.com
- Slack: https://foxglove.slack.com
- Notion: https://www.notion.so/foxglove
- Linear: https://linear.app
- Figma: https://www.figma.com
- Fireflies: https://app.fireflies.ai

### Tools That Require Requests (use #help-desk and mention @Linear Asks)
- 1Password
- GitHub (specify which repos you need)
- Hubspot
- PostHog
- AWS
- Super Admin (for Customer Success)

### Tools Through Rippling
- Claude: https://app.rippling.com/app-shop/app/claude_custom_1_6399599d33dbbc8536982ef5

### Other Tools
- Brex: Check your email for an invite from Brex
- Human Interest (401k): Will send email to your personal email

## Policies
Foxglove has policies covering:
- Access Control Policy
- Code of Conduct
- Information Security Policy
- Human Resource Security Policy
- Anti-Harassment Policy
- Anti-Fraud, Anti-Bribery & Anti-Corruption Policy
- Whistleblower Policy
- GDPR Compliance Policy
- Incident Response Plan
- Data Management Policy
- Cryptography Policy
- Physical Security Policy
- Third-Party Management Policy
- Business Continuity and Disaster Recovery
- And more at: https://www.notion.so/foxglovehq/5447ab8fb96746c1be6124a273fc9de0

## Common Questions

### How do I get help?
Post in #help-desk and mention @Linear Asks to create a ticket.

### Where do I find documentation?
Check Notion. Start at the relevant team page or use search.

### How do I request time off?
See the Time Off & Leave page: https://www.notion.so/foxglovehq/6321e81fa1fe4d04969e5762ee64522b

### How do I submit expenses?
See the Expenses at Foxglove page: https://www.notion.so/foxglovehq/ed16407d3e844910959c359bf5480bc8

### How do I get access to GitHub?
Post in #help-desk and mention @Linear Asks. Specify which repositories you need access to.

### How do I set up my development environment?
See the Engineering Quickstart: https://www.notion.so/foxglovehq/cce65bea75c34d218c055c1e8c2b837d

### What's the PR process?
See Developer Workflow: https://www.notion.so/foxglovehq/6cc0ec37751844fc878e1cce99cfb6c5
Key points: Request review explicitly, check GitHub notifications, avoid back-and-forth, keep main green.

### Who do I contact for HR questions?
Book time with Britt: https://calendar.app.google/wxpd1jmVn8Bxks1M6
`;

module.exports = { companyKnowledge };