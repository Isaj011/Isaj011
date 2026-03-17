// ============================================================
//  FILE LOCATION: .github/scripts/update-stats.js
//
//  WHAT IT DOES:
//    Called by update-readme.yml every night.
//    1. Hits the GitHub REST API with your token
//    2. Fetches: public repo count, followers, total stars
//    3. Finds the <!-- STATS:START --> block in README.md
//    4. Rewrites it with your real live numbers
//    5. Saves README.md — the workflow then commits it
//
//  REQUIRES:
//    - Node.js 18+ (fetch is built-in, no npm install needed)
//    - GH_TOKEN env variable (injected by the workflow)
//    - README.md must contain <!-- STATS:START --> and
//      <!-- STATS:END --> comment markers
//
//  TO TEST LOCALLY:
//    export GH_TOKEN=your_personal_access_token
//    node .github/scripts/update-stats.js
// ============================================================

const fs = require('fs');
const path = require('path');

const USERNAME = 'Isaj011';
const README_PATH = path.join(process.cwd(), 'README.md');

async function fetchGitHubStats() {
  const headers = {
    Authorization: `Bearer ${process.env.GH_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // ── Fetch user profile ──────────────────────────────────────
  const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
  if (!userRes.ok) throw new Error(`GitHub API error: ${userRes.status} ${userRes.statusText}`);
  const user = await userRes.json();

  // ── Fetch all public repos (paginated, up to 300) ───────────
  let allRepos = [];
  let page = 1;
  while (true) {
    const repoRes = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}`,
      { headers }
    );
    const repos = await repoRes.json();
    if (!Array.isArray(repos) || repos.length === 0) break;
    allRepos = allRepos.concat(repos);
    if (repos.length < 100) break;
    page++;
  }

  // ── Calculate totals ────────────────────────────────────────
  const totalStars = allRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = allRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  // ── Find most recently updated repo ─────────────────────────
  const sorted = allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const latestRepo = sorted[0]?.name || 'N/A';

  return {
    repos: user.public_repos,
    followers: user.followers,
    following: user.following,
    totalStars,
    totalForks,
    latestRepo,
    updatedAt: new Date().toISOString().split('T')[0],
  };
}

function buildStatsBlock(stats) {
  // ── This is what gets written into README.md ─────────────────
  // Adjust the format here if you want a different layout.
  return `<!-- STATS:START -->
\`\`\`
REPOS     : ${String(stats.repos).padEnd(6)}   public repositories
FOLLOWERS : ${String(stats.followers).padEnd(6)}   github followers
STARS     : ${String(stats.totalStars).padEnd(6)}   total stars earned
FORKS     : ${String(stats.totalForks).padEnd(6)}   total forks
LATEST    : ${stats.latestRepo}
UPDATED   : ${stats.updatedAt}   (auto-updated nightly)
\`\`\`
<!-- STATS:END -->`;
}

async function run() {
  console.log(`Fetching GitHub stats for ${USERNAME}...`);

  const stats = await fetchGitHubStats();
  console.log('Stats fetched:', stats);

  const readmeContent = fs.readFileSync(README_PATH, 'utf8');

  // ── Check markers exist ──────────────────────────────────────
  if (!readmeContent.includes('<!-- STATS:START -->')) {
    throw new Error('README.md is missing <!-- STATS:START --> marker. Add it first.');
  }
  if (!readmeContent.includes('<!-- STATS:END -->')) {
    throw new Error('README.md is missing <!-- STATS:END --> marker. Add it first.');
  }

  // ── Replace block between markers ───────────────────────────
  const updated = readmeContent.replace(
    /<!-- STATS:START -->[\s\S]*?<!-- STATS:END -->/,
    buildStatsBlock(stats)
  );

  fs.writeFileSync(README_PATH, updated, 'utf8');
  console.log('README.md updated successfully.');
  console.log(`  Repos     : ${stats.repos}`);
  console.log(`  Followers : ${stats.followers}`);
  console.log(`  Stars     : ${stats.totalStars}`);
  console.log(`  Forks     : ${stats.totalForks}`);
  console.log(`  Updated   : ${stats.updatedAt}`);
}

run().catch(err => {
  console.error('Script failed:', err.message);
  process.exit(1);
});
