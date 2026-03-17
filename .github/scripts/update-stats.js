const fs = require('fs');
const path = require('path');

const USERNAME = 'Isaj011';
const README_PATH = path.join(process.cwd(), 'README.md');

async function run() {
  const headers = {
    Authorization: `Bearer ${process.env.GH_TOKEN}`,
    Accept: 'application/vnd.github+json',
  };

  const user = await fetch(`https://api.github.com/users/${USERNAME}`, { headers }).then(r => r.json());

  let repos = [], page = 1;
  while (true) {
    const batch = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}`, { headers }).then(r => r.json());
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos = repos.concat(batch);
    if (batch.length < 100) break;
    page++;
  }

  const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const date  = new Date().toISOString().split('T')[0];

  const block = `<!-- STATS:START -->
\`\`\`
REPOS     : ${user.public_repos}    FOLLOWERS : ${user.followers}    STARS : ${stars}    UPDATED : ${date}
\`\`\`
<!-- STATS:END -->`;

  let readme = fs.readFileSync(README_PATH, 'utf8');
  readme = readme.replace(/<!-- STATS:START -->[\s\S]*?<!-- STATS:END -->/, block);
  fs.writeFileSync(README_PATH, readme);

  console.log(`Done — repos:${user.public_repos} followers:${user.followers} stars:${stars}`);
}

run().catch(e => { console.error(e); process.exit(1); });
