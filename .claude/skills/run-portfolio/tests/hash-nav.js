// Regression test for commit 16fa7be.
//
// Bug: "Get in touch" on /experience landed on the hero, not #contact.
// Cause: the app is client-rendered, so the browser resolved the hash while
// #root was still an empty shell. React mounted afterwards and nothing
// re-applied it. Fixed by useHashScroll() in src/App.jsx.
//
// The offset assertions guard the companion fix: scroll-margin-top in
// src/index.css, which keeps headings clear of the 56px sticky header.

const { BASE, launch, openPage, requireServer, tracker } = require('./helpers');

const HEADER_OFFSET = 72;   // must match scroll-margin-top in src/index.css
const TOLERANCE = 90;       // smooth scrolling may still be settling

(async () => {
  await requireServer();
  const t = tracker();
  const browser = await launch();
  const page = await openPage(browser);

  const landedOn = async (id) => page.evaluate((sid) => {
    const el = document.getElementById(sid);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { y: Math.round(scrollY), top: Math.round(r.top + scrollY), vis: Math.round(r.top) };
  }, id);

  // The reported bug, end to end: click the CTA on /experience.
  await page.goto(BASE + '/experience', { waitUntil: 'load' });
  await page.locator('.xp-cta').scrollIntoViewIfNeeded();
  await page.locator('.xp-cta').click();
  await page.waitForLoadState('load');
  await page.waitForTimeout(3500);

  let r = await landedOn('contact');
  t.check('CTA lands on #contact', r && Math.abs(r.y - (r.top - HEADER_OFFSET)) < TOLERANCE,
    `scrollY=${r && r.y} target=${r && r.top}`);
  t.check('heading clears header', r && r.vis >= 50 && r.vis < 130,
    `#contact at ${r && r.vis}px from top`);

  // Direct deep links -- someone pasting a URL hits the same code path.
  //
  // Each one needs a FRESH page. Navigating an already-loaded page from #a to
  // #b is a same-document navigation the browser resolves natively, which
  // passes whether or not useHashScroll exists. Only a cold load reproduces
  // the original bug, where the hash resolves against an empty #root.
  for (const id of ['about', 'experience', 'tools', 'contact', 'achievements']) {
    const fresh = await openPage(browser);
    await fresh.goto(`${BASE}/#${id}`, { waitUntil: 'load' });
    await fresh.waitForTimeout(3200);
    const d = await fresh.evaluate((sid) => {
      const el = document.getElementById(sid);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { y: Math.round(scrollY), top: Math.round(r.top + scrollY) };
    }, id);
    t.check(`deep link #${id}`, d && Math.abs(d.y - (d.top - HEADER_OFFSET)) < TOLERANCE,
      `scrollY=${d && d.y} target=${d && d.top}`);
    await fresh.close();
  }

  // In-page nav must still work -- the fix must not regress normal clicks.
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  await page.locator('header a[href="#tools"]').click();
  await page.waitForTimeout(2000);
  const nav = await landedOn('tools');
  t.check('header nav #tools', nav && Math.abs(nav.y - (nav.top - HEADER_OFFSET)) < TOLERANCE,
    `scrollY=${nav && nav.y}`);

  // A plain load must NOT scroll: useHashScroll has to no-op without a hash.
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(2500);
  const plain = await page.evaluate(() => Math.round(scrollY));
  t.check('no-hash stays at top', plain === 0, `scrollY=${plain}`);

  // Footer year is generated, not hardcoded (the second half of 16fa7be).
  const year = String(new Date().getFullYear());
  const main = (await page.locator('.footer-copy').innerText()).trim();
  t.check('main footer year', main.includes(year), `"${main}"`);

  await page.goto(BASE + '/experience', { waitUntil: 'load' });
  await page.locator('.xp-footer p').scrollIntoViewIfNeeded();
  const xp = (await page.locator('.xp-footer p').innerText()).trim();
  t.check('experience footer year', xp.includes(year), `"${xp}"`);

  // Mobile: the sticky header and smooth scrolling behave differently here.
  const mob = await openPage(browser, { width: 390, height: 844 });
  await mob.goto(BASE + '/experience', { waitUntil: 'load' });
  await mob.locator('.xp-cta').scrollIntoViewIfNeeded();
  await mob.locator('.xp-cta').tap();
  await mob.waitForLoadState('load');
  await mob.waitForTimeout(3500);
  const m = await mob.evaluate(() => {
    const el = document.querySelector('#contact');
    return { y: Math.round(scrollY), vis: Math.round(el.getBoundingClientRect().top) };
  });
  t.check('mobile CTA -> #contact', m.y > 100 && m.vis >= 40 && m.vis < 140,
    `scrollY=${m.y} vis=${m.vis}px`);

  await browser.close();
  process.exit(t.done(page));
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
