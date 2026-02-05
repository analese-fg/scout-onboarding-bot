# 🐾 Scout — Foxglove Onboarding Bot

Scout is a Slack bot that helps new Foxglove employees onboard smoothly. It delivers personalized welcome messages, role-specific checklists, tool access requests, and answers onboarding questions using Claude AI.

## Features

### For New Hires

- **Automated welcome messages** — On their start date at 10am local time, new hires receive a personalized DM with their role-specific onboarding checklist, tool links, pro tips, and key resources
- **`/request-tools`** — Request access to Foxglove tools from any channel; pre-selects tools based on role
- **🔑 Request Tool Access button** — Included in the welcome message for quick access
- **Claude-powered Q&A** — DM Scout questions about Foxglove tools, processes, and policies and get conversational answers drawn from the company knowledge base
- **Quick resource links** — Short keyword queries (e.g., `engineering`, `policies`, `help`) return instant categorized link lists without hitting the AI
- **`/scout-help`** — See all available commands and what Scout can do

### For HR

- **`/new-hire`** _(restricted to authorized users)_ — Register an incoming employee with name, email, role, start date, and timezone via a modal form
- **`/retry-welcome`** _(restricted to authorized users)_ — Resend a welcome message to any new hire who hasn't received one yet (e.g., if their Slack account wasn't created in time)
- **Failure notifications** — If a welcome message fails to send (e.g., Slack account not found), Scout automatically DMs the HR contact with details and instructions to retry

### Role-Specific Content

Tailored checklists, tools, tips, and resources for:

- Customer Success
- HR/Talent
- Product
- Sales
- Software Engineering

Each role gets a customized Day 1 checklist, week 1 tasks, tool access grouped by type (SSO, request-based, Rippling, email), pro tips from recent hires, and relevant Notion resource links.

## Tech Stack

| Component | Tool                                        |
| --------- | ------------------------------------------- |
| Runtime   | Node.js                                     |
| Slack SDK | Bolt for JavaScript                         |
| AI        | Anthropic Claude (claude-sonnet-4-20250514) |
| Database  | PostgreSQL (Render)                         |
| Hosting   | Render                                      |

## Project Structure

```
scout-onboarding-bot/
├── app.js              # Main app — Slack commands, event handlers, Claude Q&A
├── checklists.js       # Role-specific onboarding checklists and tool definitions
├── knowledge.js        # Company knowledge base (fed to Claude as system prompt)
├── resources.js        # Keyword-matched quick link responses
├── welcome.js          # Welcome message builder and scheduled sender
├── setup-db.js         # Database table creation/migration
├── test-welcome.js     # Test script — sends welcome messages without timezone check
├── package.json
└── .env                # Environment variables (not committed)
```

## Environment Variables

```
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...
SLACK_APP_TOKEN=xapp-...
ANTHROPIC_API_KEY=...
DATABASE_URL=...
HELP_DESK_CHANNEL_ID=...
PORT=3000
```

## Setup

```bash
# Install dependencies
npm install

# Create database tables
npm run setup-db

# Start the bot
npm start
```

## Slack App Configuration

Scout requires these Slack app settings:

- **Socket Mode** enabled with `connections:write` scope
- **Slash commands:** `/new-hire`, `/request-tools`, `/retry-welcome`, `/scout-help`
- **Bot events:** `message.im`
- **OAuth scopes:** `chat:write`, `commands`, `im:history`, `users:read`, `users:read.email`

## How It Works

1. HR uses `/new-hire` to register an incoming employee (name, email, role, start date, timezone)
2. On the employee's start date at 10am in their timezone, Scout sends them a personalized welcome DM with their role-specific checklist, tools, tips, and resources
3. If the welcome fails (e.g., Slack account not yet created), Scout DMs HR with an explanation and suggests using `/retry-welcome`
4. New hires can DM Scout anytime with questions — Scout answers using Claude AI with Foxglove's knowledge base
5. Anyone can use `/request-tools` to request tool access; requests are posted to #help-desk
6. `/scout-help` shows all available commands

## Up Next

- 📋 Interactive checklist tracking — employees check off tasks with progress saved to the database
- 📊 `/my-checklist` command — view onboarding progress anytime
- 💡 Microlearnings — drip-feed tips and reminders throughout the first week
- 👀 Manager visibility — summary of new hire onboarding progress
