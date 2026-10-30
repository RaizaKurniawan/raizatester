// Scroll-to-top button (src/components/ScrollToTop.jsx), on both entry points.
//
// The button stays mounted and fades, rather than unmounting, so the risk is
// an invisible element sitting over the page and swallowing clicks. The
// hidden-state checks below are the ones that matter.

const { BASE, launch, openPage, requireServer, tracker } = require('./helpers');

const PAGES = ['/', '/experience'];

(async () => {
  await requireServer();
  const t = tracker();
  const browser = await launch();
  let lastPage;

  for (const url of PAGES) {
    for (const vp of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      const page = await openPage(browser, vp);
      lastPage = page;
      const tag = `${url} @${vp.width}`;
      await page.goto(BASE + url, { waitUntil: 'load' });
      await page.waitForTimeout(1200);

      t.check(`${tag} exists`, await page.locator('.scroll-top').count() === 1);

      // Hidden at the top of the page...
      const top = await page.evaluate(() => {
        const el = document.querySelector('.scroll-top');
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const under = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return {
          hidden: s.visibility === 'hidden' || s.opacity === '0',
          tabIndex: el.tabIndex,
          blocks: !!under && under.closest('.scroll-top') !== null,
        };
      });
      t.check(`${tag} hidden at top`, top.hidden);
      t.check(`${tag} not focusable`, top.tabIndex === -1, `tabIndex=${top.tabIndex}`);
      // The important one: an invisible overlay must not eat clicks.
      t.check(`${tag} no click block`, !top.blocks);

      // ...visible once scrolled.
      await page.evaluate(() => window.scrollTo(0, 2200));
      await page.waitForTimeout(900);
      const shown = await page.evaluate(() => {
        const el = document.querySelector('.scroll-top');
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          visible: s.visibility === 'visible' && s.opacity === '1',
          tabIndex: el.tabIndex,
          onscreen: r.top >= 0 && r.bottom <= innerHeight && r.right <= innerWidth,
        };
      });
      t.check(`${tag} visible scrolled`, shown.visible);
      t.check(`${tag} focusable`, shown.tabIndex === 0);
      t.check(`${tag} within viewport`, shown.onscreen);

      // No overlap with real links or buttons at the bottom of the page.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);
      const overlaps = await page.evaluate(() => {
        const b = document.querySelector('.scroll-top').getBoundingClientRect();
        return Array.from(document.querySelectorAll('a, button'))
          .filter(n => !n.classList.contains('scroll-top'))
          .filter(n => {
            const q = n.getBoundingClientRect();
            return q.width && q.height &&
              !(q.right < b.left || q.left > b.right || q.bottom < b.top || q.top > b.bottom);
          })
          .map(n => (n.textContent || n.tagName).trim().slice(0, 20));
      });
      t.check(`${tag} no overlap`, overlaps.length === 0,
        overlaps.length ? JSON.stringify(overlaps) : '');

      // Click returns to the top.
      await page.locator('.scroll-top').click();
      await page.waitForTimeout(2000);
      t.check(`${tag} click -> top`, await page.evaluate(() => Math.round(scrollY)) === 0);

      if (vp.width > 600) {
        // Keyboard operability, desktop only (no tab key on a touch device).
        await page.evaluate(() => window.scrollTo(0, 2200));
        await page.waitForTimeout(800);
        await page.locator('.scroll-top').focus();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1800);
        t.check(`${tag} Enter -> top`, await page.evaluate(() => Math.round(scrollY)) === 0);
        t.check(`${tag} has aria-label`,
          !!(await page.locator('.scroll-top').getAttribute('aria-label')));
      }

      if (url !== '/experience') { await page.close(); lastPage = null; }
      else if (vp.width <= 600) { await page.close(); lastPage = null; }
    }
  }

  // Clicking from a #hash URL clears the stale hash without adding a history
  // entry, so Back still returns to the previous page rather than the hash.
  const page = await openPage(browser);
  lastPage = page;
  await page.goto(BASE + '/experience', { waitUntil: 'load' });
  await page.locator('.xp-cta').scrollIntoViewIfNeeded();
  await page.locator('.xp-cta').click();
  await page.waitForLoadState('load');
  await page.waitForTimeout(3400);
  await page.locator('.scroll-top').click();
  await page.waitForTimeout(1600);
  t.check('clears stale #hash', !page.url().includes('#'), page.url());
  await page.goBack();
  await page.waitForTimeout(2000);
  t.check('Back returns to /experience', page.url().includes('/experience'), page.url());

  await browser.close();
  process.exit(t.done(lastPage));
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
