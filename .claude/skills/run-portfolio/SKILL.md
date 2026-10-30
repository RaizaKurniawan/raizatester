---
name: run-portfolio
description: Launch this Vite + React portfolio locally and drive it in a real browser - dev server, both entry points (/ and /experience), and the Playwright suites under tests/ that cover the Tools filters and #hash navigation. Use when asked to run the app, screenshot it, verify a UI change in the real app, or re-run the browser tests.
---

# Running and testing the portfolio

Two entry points, both client-rendered React:

| URL | Entry | Source |
|---|---|---|
| `/` | `src/main.jsx` | `index.html` |
| `/experience` | `src/experience-main.jsx` | `experience.html` |

Both are declared in `vite.config.js` under `build.rollupOptions.input`. Adding
a page means adding an `.html` at the root **and** an entry there, or it will
404 in production while still working in dev.

## Start the dev server

```bash
npm install          # first time on a machine
npm run dev          # http://localhost:5173
```

**Use `localhost`, not `127.0.0.1`.** Vite binds IPv6 loopback here, so
`http://127.0.0.1:5173` is refused while `http://localhost:5173` works. This
costs ten confused minutes every time it is forgotten.

To reach it from a phone or another machine: `npm run dev -- --host`.

Stop it (Windows, Git Bash) - killing the npm wrapper does not free the port:

```bash
netstat -ano | grep ':5173' | grep LISTENING | awk '{print $5}' | sort -u \
  | while read pid; do taskkill //PID "$pid" //F; done
```

On macOS or Linux: `lsof -ti:5173 -sTCP:LISTEN | xargs -r kill`.

## Run the browser tests

Playwright is **not** a dependency of this project - it is a testing tool, kept
out of `package.json` so the portfolio's install stays lean. Install it when
you need it:

```bash
npm i -D playwright
npx playwright install chromium     # do not skip, see below
```

Then, with the dev server running:

```bash
node .claude/skills/run-portfolio/tests/run-all.js    # all suites
node .claude/skills/run-portfolio/tests/smoke.js      # one suite
BASE_URL=https://your-deploy.vercel.app node .claude/skills/run-portfolio/tests/smoke.js
```

Every suite prints `PASS`/`FAIL` lines and exits non-zero on failure, so it
drops straight into CI if wanted.

When you are done, `git checkout package.json package-lock.json && npm install`
removes Playwright again.

### Suites

- **`smoke.js`** - both entry points render, the five section anchors exist,
  `/experience` resolves to its own entry (not an index fallback), the CV PDF
  serves as a real PDF.
- **`tools-filters.js`** - all category filters in the Tools section, plus
  rapid switching, keyboard activation, and duplicate-card checks.
- **`hash-nav.js`** - regression test for commit `16fa7be` (see below).

`helpers.js` holds the shared launch/assert plumbing. Tests read expected
values off the UI (for example, each filter chip's own count badge) rather
than hardcoding tables, so adding a tool to `src/components/Tools.jsx` does
not break them.

### Checking that a test can still fail

A regression test that cannot fail is worse than none. To confirm `hash-nav.js`
still guards its fix, comment out `useHashScroll();` in `src/App.jsx`, re-run
it, and expect the CTA and all five deep-link assertions to fail - then restore
the line. `header nav` and `no-hash stays at top` should keep passing, since
neither depends on the hook.

## Gotchas that cost time here

**Playwright's browser version must match its module version.** Installing
`playwright` can leave you with a module expecting Chromium build 1248 while
the machine has 1223, and `chromium.launch()` dies with
`Executable doesn't exist`. `npx playwright install chromium` fixes it
properly; `helpers.js` also falls back to the system Chrome
(`channel: 'chrome'`) so the suites still run if you skip that step.

**Vite returns the SPA HTML shell, status 200, for missing files.** A deleted
asset looks alive if you only check the status code. Check the content type -
`smoke.js` does this for the CV PDF.

**Sections are invisible until scrolled into view.** Cards use framer-motion
`whileInView` with `initial: { opacity: 0 }`. A full-page screenshot shows
everything below the fold dimmed or blank - that is the animation not having
fired, not a rendering bug. Scroll with `scrollIntoViewIfNeeded()` and wait
before asserting or screenshotting.

**Hash links need time to settle.** `useHashScroll` in `src/App.jsx` re-scrolls
until the target stops moving, because entrance animations above it shift the
layout. Allow ~3.5s after a hash navigation before asserting scroll position.

**Test hash navigation on a fresh page, every time.** Going from `/#about` to
`/#tools` on an already-loaded page is a *same-document* navigation that the
browser resolves natively - it passes with or without `useHashScroll`, so a
loop that reuses one page proves nothing. This was caught by disabling the fix
and watching the deep-link assertions pass anyway. Only a cold load reproduces
the original bug. `hash-nav.js` opens a new page per link for this reason.

**The Tools section is intentionally light.** `background: #f8faff` in
`src/index.css` on an otherwise dark site is a deliberate design choice, not a
theming bug. Do not "fix" it.

**Line endings.** Git reports `LF will be replaced by CRLF` on commit here.
Expected on Windows; not an error.

## Regression context: commit 16fa7be

"Get in touch" on `/experience` used to land on the hero instead of the contact
section. The link was correct - the page is client-rendered, so the browser
resolved the `#contact` hash while `<div id="root">` was still empty and had
nothing to scroll to. React mounted afterwards and nothing re-applied the hash.

The fix has two halves, both covered by `hash-nav.js`:

- `useHashScroll()` in `src/App.jsx` re-applies the hash after mount, correcting
  until the target's position stabilises. It no-ops when there is no hash, so a
  plain load still opens at the top - the test asserts this, because an
  over-eager version would scroll every visit.
- `scroll-margin-top: 72px` in `src/index.css` keeps headings clear of the 56px
  sticky header. **If the header height changes, update both that rule and
  `HEADER_OFFSET` in `hash-nav.js`.**

## Verifying a change by eye

For a screenshot without writing a script, headless Chrome is enough:

```bash
chrome --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=9000 --window-size=1440,1000 \
  --screenshot=out.png "http://localhost:5173/experience"
```

`--virtual-time-budget` matters: without it you capture a blank page mid-load.
Remember the `whileInView` caveat above - a tall `--window-size` still shows
below-fold content unanimated, so prefer driving the page with a real scroll
when the result matters.

## Before pushing

```bash
npm run build        # must compile; also catches multi-entry config mistakes
rm -rf dist          # dist/ is gitignored, do not commit it
```

The build warns that `/assets/qaback.jpg` does not resolve at build time and
stays a runtime reference. Pre-existing and unrelated to recent work.

Pushing to `main` triggers a Vercel deploy. These tests run against the dev
server; after a deploy, re-run them with `BASE_URL` pointed at the live site to
confirm the production build behaves the same - `vercel.json`'s `cleanUrls`
handles `/experience` there, whereas dev relies on Vite's multi-entry setup.
