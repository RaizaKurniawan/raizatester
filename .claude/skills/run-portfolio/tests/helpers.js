// Shared setup for the browser tests in this folder.
//
// Portability is the whole point of this file: it resolves Playwright and a
// usable browser at runtime instead of hardcoding either, so the tests run on
// a different machine without edits.

const path = require('path');

const BASE = process.env.BASE_URL || 'http://localhost:5173';

// Playwright is not a dependency of this project -- it is installed on demand
// (see SKILL.md). Resolve it from the project's node_modules explicitly,
// because these tests are run from the .claude/skills tree, not the root.
function loadPlaywright() {
  const projectRoot = path.resolve(__dirname, '../../../..');
  try {
    return require(require.resolve('playwright', { paths: [projectRoot] }));
  } catch {
    console.error(
      'Playwright not found. Install it first:\n' +
      '  npm i -D playwright && npx playwright install chromium\n' +
      'See .claude/skills/run-portfolio/SKILL.md for details.'
    );
    process.exit(2);
  }
}

// Launch bundled Chromium if its matching build is present; fall back to the
// system Chrome. A machine can have the Playwright module at one version and
// browser builds from another, which makes the default launch fail with
// "Executable doesn't exist" -- the fallback covers exactly that case.
async function launch() {
  const { chromium } = loadPlaywright();
  const args = ['--no-sandbox'];
  try {
    return await chromium.launch({ args });
  } catch (err) {
    if (!/Executable doesn't exist|install/i.test(err.message)) throw err;
    console.warn('! bundled Chromium unavailable, using system Chrome');
    return await chromium.launch({ channel: 'chrome', args });
  }
}

async function openPage(browser, viewport = { width: 1440, height: 1000 }) {
  const context = await browser.newContext(
    viewport.width < 600
      ? { viewport, isMobile: true, hasTouch: true }
      : { viewport }
  );
  const page = await context.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.errors = errors;
  return page;
}

// Fail loudly if the dev server is not up, rather than timing out in Playwright
// with a confusing message.
async function requireServer() {
  try {
    const res = await fetch(BASE + '/');
    if (!res.ok) throw new Error('HTTP ' + res.status);
  } catch {
    console.error(
      `No dev server at ${BASE}\n` +
      '  Start it with: npm run dev\n' +
      '  Note: Vite may bind IPv6-only -- use localhost, not 127.0.0.1.'
    );
    process.exit(2);
  }
}

// Minimal result tracker so each test file prints a consistent summary.
function tracker() {
  let pass = 0, fail = 0;
  return {
    check(name, ok, detail = '') {
      ok ? pass++ : fail++;
      console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(26)} ${detail}`);
    },
    done(page) {
      if (page && page.errors.length) {
        fail++;
        console.log('FAIL  console errors            ' + JSON.stringify(page.errors));
      } else if (page) {
        console.log('PASS  no console errors');
        pass++;
      }
      console.log(`\n${pass} pass, ${fail} fail`);
      return fail === 0 ? 0 : 1;
    },
  };
}

module.exports = { BASE, launch, openPage, requireServer, tracker };
