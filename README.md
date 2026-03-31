# AI Sprint Planner

AI Sprint Planner is a React-based browser tool that turns a plain-English epic or feature request into a fully structured, sprint-ready backlog in seconds. Paste in your epic, choose your team size and sprint length, and the app uses Claude AI (via OpenRouter) to generate user stories with acceptance criteria, Fibonacci story point estimates, sprint assignments, and dependency flags — all formatted and ready to import directly into Jira. Built for project managers, founders, and technical leads who want to move from idea to backlog without spending hours in planning meetings.

---

## How to Use

1. Open the app and enter your OpenRouter API key when prompted. Your key is stored in the browser session only — it is never logged or sent anywhere except OpenRouter's API.
2. Fill in the Epic Brief: give your epic a title, describe the feature or goal in plain English, select your team size and sprint length, and optionally add your tech stack to get more tailored acceptance criteria.
3. Click **Generate Sprint Plan**. The app calls Claude AI and returns a full backlog broken down by sprint, with story cards showing user stories, acceptance criteria, story points, and priority.
4. Use the **Export CSV** button to download a Jira-ready CSV file, or **Copy All as Text** to grab a clean plain-text version of all stories.

---

## Jira Import

The CSV export is formatted for direct import into Jira:

1. In your Jira project, go to **Project Settings → Import issues**.
2. Choose **CSV** as the import format.
3. Upload the downloaded `.csv` file.
4. Map the columns: Story ID → Issue Key (or custom field), Title → Summary, User Story → Description, Story Points → Story Points, Sprint → Sprint, Priority → Priority.
5. Run the import. Your backlog will be populated and sprint-assigned.

---

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173/ai-sprint-planner/` in your browser.

No backend required — the app calls the OpenRouter API directly from the browser.

---

## Deploy to GitHub Pages

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the Vite app and deploys automatically on every push to `main`.

To enable it:
1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set source to **GitHub Actions**.
4. Push to `main` — the workflow handles the rest.

---

## Tech

- React 18 + Vite
- Plain CSS — no UI framework
- [OpenRouter API](https://openrouter.ai/) — model: `nousresearch/hermes-3-llama-3.1-405b:free`

---

Built by **Rumman Riyaz** — Technical Project Manager & Founder of Forma AI
