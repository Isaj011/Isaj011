# ISAJ011 — GitHub Profile Setup Guide
## Batman: Arkham Knight × Dark Knight Hybrid

---

## What you have

| File | Put it at | Purpose |
|------|-----------|---------|
| `README.md` | `Isaj011/Isaj011/README.md` | Your profile page |
| `snake.yml` | `.github/workflows/snake.yml` | Generates animated snake from contribution grid |
| `update-readme.yml` | `.github/workflows/update-readme.yml` | Rewrites live stats nightly |
| `update-stats.js` | `.github/scripts/update-stats.js` | The script that hits the GitHub API |

---

## Step 1 — Create the profile repo (if not done)

1. Go to **github.com/new**
2. Set repository name to exactly `Isaj011` (your username)
3. Set to **Public**
4. Tick **Add a README file**
5. Click **Create repository**

GitHub will show a special banner — this is your profile repo.

---

## Step 2 — Add the README

1. Open `Isaj011/Isaj011` on GitHub
2. Click the pencil icon on `README.md`
3. Select all → delete → paste the full contents of `README.md`
4. Scroll down → click **Commit changes**

Your profile updates instantly. The stat cards are already live.

---

## Step 3 — Enable write permissions for Actions

The update-readme workflow needs to commit back to your repo.

1. Go to your repo → **Settings**
2. Left sidebar → **Actions** → **General**
3. Scroll to **Workflow permissions**
4. Select **Read and write permissions**
5. Click **Save**

---

## Step 4 — Set up the snake animation

**Create the file:**

In your `Isaj011/Isaj011` repo, create a new file at:
```
.github/workflows/snake.yml
```
Paste the full contents of `snake.yml` into it. Commit.

**Run it for the first time:**

1. Go to the **Actions** tab in your repo
2. Click **Generate Snake** in the left sidebar
3. Click **Run workflow** → **Run workflow**
4. Wait ~30 seconds
5. Refresh your profile — the snake appears

After this it runs automatically every 12 hours.

---

## Step 5 — Set up the live stats updater

**Create two files:**

File 1 — at `.github/workflows/update-readme.yml`
→ paste the full contents of `update-readme.yml`

File 2 — at `.github/scripts/update-stats.js`
→ paste the full contents of `update-stats.js`

Commit both files.

**Run it for the first time:**

1. Go to the **Actions** tab
2. Click **Update README Stats** in the left sidebar
3. Click **Run workflow** → **Run workflow**
4. Wait ~20 seconds
5. Go back to your profile — the STATS block now shows real numbers

After this it runs automatically every night at midnight UTC.

---

## Step 6 — Update your 3 remaining details

Open `README.md` and update these 3 lines manually:

```markdown
# 1. LinkedIn — confirm your handle is correct
https://linkedin.com/in/isaj011
# Change isaj011 to your actual LinkedIn URL slug if different

# 2. Repo links in Case Files — replace github.com/Isaj011 with direct repo URLs
# e.g. https://github.com/Isaj011/vehicle-route-management

# 3. Add your email badge in the Open Channel section:
[![Email](https://img.shields.io/badge/Email-04060d?style=for-the-badge&logo=gmail&logoColor=c0392b)](mailto:your@email.com)
```

---

## Step 7 — Pin your best repos

1. Go to your GitHub profile
2. Click **Customize your pins**
3. Select these 6 repos (or your top 6):
   - vehicle-route-management
   - django-reporting-engine
   - your 3D portfolio repo
   - your classic portfolio repo
   - any 2 others you're proud of
4. Make sure every pinned repo has:
   - A **description** set
   - **Topics** added (e.g. `react`, `django`, `nodejs`)

---

## What updates automatically (nothing to do)

| What | How often | Driven by |
|------|-----------|-----------|
| Stats card (commits, stars, PRs) | Every page load | github-readme-stats |
| Streak card | Every page load | streak-stats.demolab |
| Top languages | Every page load | github-readme-stats |
| Visitor counter | Every page load | profile-counter.glitch.me |
| Snake animation | Every 12 hours | snake.yml workflow |
| STATS block (repos, followers, stars) | Every night | update-readme.yml + update-stats.js |

## What to update manually (only when your career changes)

| What | When to update |
|------|----------------|
| Skill percentages | When you level up a skill |
| Job title / company | When you change roles |
| Case Files / projects | When you ship something new |
| Terminal commands | When repo names change |
| LinkedIn / email | If your contact details change |

---

## Troubleshooting

**Snake not showing?**
- Check the Actions tab — did the workflow run successfully?
- Make sure the `output` branch was created in your repo
- The image URL must match exactly: `Isaj011/Isaj011/blob/output/github-contribution-grid-snake-dark.svg`

**Stats not updating?**
- Check Settings → Actions → General → Workflow permissions is set to Read and write
- Check the Actions tab for any failed runs — click the run to see the error log

**Stat cards showing as broken images?**
- The vercel and demolab services are free and occasionally have downtime
- Wait a few minutes and hard-refresh — they recover quickly

**STATS block not rewriting?**
- Make sure your README.md contains both `<!-- STATS:START -->` and `<!-- STATS:END -->` on their own lines
- Check the update-readme.yml run log in the Actions tab
