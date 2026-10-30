// Recognition section (src/components/Recognition.jsx): the merged
// achievements + certifications tabs, and the performance-review modal.
//
// The modal assertions are the valuable ones here -- Escape, focus handling
// and scroll locking are easy to break and invisible until someone is stuck
// inside the dialog with a keyboard.

const { BASE, launch, openPage, requireServer, tracker } = require('./helpers');

(async () => {
  await requireServer();
  const t = tracker();
  const browser = await launch();
  const page = await openPage(browser);

  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.locator('#achievements').scrollIntoViewIfNeeded();
  await page.waitForSelector('.recognition-card', { state: 'visible' });
  await page.waitForTimeout(1200);

  // Both old section ids still resolve, so existing links and the header nav
  // keep working after the merge.
  t.check('#achievements anchor', await page.locator('#achievements').count() === 1);
  t.check('#certifications anchor', await page.locator('#certifications').count() === 1);

  // Each tab's badge must match what it renders, same contract as Tools.
  const tabs = await page.locator('.recognition-tab').count();
  t.check('two tabs', tabs === 2, `${tabs} tabs`);

  for (let i = 0; i < tabs; i++) {
    const tab = page.locator('.recognition-tab').nth(i);
    const raw = (await tab.innerText()).replace(/\s+/g, ' ').trim();
    const m = raw.match(/^(.*?)\s*(\d+)$/);
    const name = m ? m[1] : raw;
    const want = m ? parseInt(m[2], 10) : -1;

    await tab.click();
    await page.waitForTimeout(600);
    const rendered = await page.locator('.recognition-card').count();
    t.check(`tab ${name}`, rendered === want && await tab.getAttribute('aria-pressed') === 'true',
      `badge=${want} rendered=${rendered}`);
  }

  t.check('one active tab',
    await page.locator('.recognition-tab[aria-pressed="true"]').count() === 1);

  // Achievements are newest first -- the ordering choice is deliberate, so
  // guard it rather than let a reorder slip through unnoticed.
  await page.locator('.recognition-tab').first().click();
  await page.waitForTimeout(600);
  const years = (await page.locator('.recognition-year').allInnerTexts())
    .map(s => parseInt(s.trim(), 10));
  const descending = years.every((y, i) => i === 0 || years[i - 1] >= y);
  t.check('newest first', descending, years.join(' > '));

  // Every card should name its organisation.
  const orgs = await page.locator('.recognition-org').count();
  t.check('cards name org', orgs === await page.locator('.recognition-card').count(),
    `${orgs} orgs`);

  // --- Performance review modal ---
  await page.locator('.recognition-card.is-interactive').click();
  await page.waitForTimeout(900);

  t.check('modal opens', await page.locator('.modal-content').count() === 1);
  t.check('is a dialog',
    await page.locator('.modal-content').getAttribute('aria-modal') === 'true');
  t.check('focus moves inside',
    await page.evaluate(() => !!document.activeElement.closest('.modal-content')));
  t.check('background scroll locked',
    await page.evaluate(() => getComputedStyle(document.body).overflow) === 'hidden');

  const slides = await page.locator('.modal-slide').count();
  t.check('slides present', slides === 16, `${slides} slides`);

  // The download link used to point at a path that did not exist, so it served
  // the SPA HTML shell at status 200. Check the content type, not the status.
  const href = await page.locator('.download-link').getAttribute('href');
  const res = await fetch(BASE + href);
  const type = res.headers.get('content-type') || '';
  t.check('review pdf resolves', type.includes('pdf'), `${href} -> ${type}`);

  // Tab must not escape the dialog while it is open.
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  t.check('focus stays trapped',
    await page.evaluate(() => !!document.activeElement.closest('.modal-content')));

  await page.keyboard.press('Escape');
  await page.waitForTimeout(900);
  t.check('Escape closes', await page.locator('.modal-content').count() === 0);
  t.check('scroll restored',
    await page.evaluate(() => getComputedStyle(document.body).overflow) !== 'hidden');
  t.check('focus returns to card',
    await page.evaluate(() => document.activeElement.classList.contains('is-interactive')));

  // Clicking the backdrop closes it too.
  await page.locator('.recognition-card.is-interactive').click();
  await page.waitForTimeout(800);
  await page.locator('.modal-overlay').click({ position: { x: 8, y: 8 } });
  await page.waitForTimeout(800);
  t.check('backdrop closes', await page.locator('.modal-content').count() === 0);

  // --- Mobile ---
  const mob = await openPage(browser, { width: 390, height: 844 });
  await mob.goto(BASE + '/', { waitUntil: 'load' });
  await mob.locator('#achievements').scrollIntoViewIfNeeded();
  await mob.waitForSelector('.recognition-card', { state: 'visible' });
  await mob.waitForTimeout(1200);
  t.check('mobile no overflow',
    !(await mob.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)));
  await mob.locator('.recognition-tab').nth(1).tap();
  await mob.waitForTimeout(700);
  t.check('mobile tab tap', await mob.locator('.recognition-card').count() === 1);
  await mob.close();

  await browser.close();
  process.exit(t.done(page));
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
