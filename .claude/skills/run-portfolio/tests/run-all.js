// Runs every suite in order and exits non-zero if any fails.
//   node .claude/skills/run-portfolio/tests/run-all.js

const { spawnSync } = require('child_process');
const path = require('path');

const suites = ['smoke.js', 'tools-filters.js', 'hash-nav.js', 'scroll-top.js', 'recognition.js'];
const failed = [];

for (const s of suites) {
  console.log(`\n${'='.repeat(58)}\n  ${s}\n${'='.repeat(58)}`);
  const r = spawnSync(process.execPath, [path.join(__dirname, s)], {
    stdio: 'inherit',
    env: process.env,
  });
  if (r.status !== 0) failed.push(s);
}

console.log(`\n${'='.repeat(58)}`);
if (failed.length) {
  console.log(`FAILED: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`All ${suites.length} suites passed.`);
