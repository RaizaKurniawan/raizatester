// Smoke test: both entry points render and the shared assets resolve.
// Run this first -- if it fails, the other suites will fail confusingly.

const { BASE, launch, openPage, requireServer, tracker } = require('./helpers');

(async () => {
  await requireServer();
  const t = tracker();
  const browser = await launch();
  const page = await openPage(browser);

  // Main page.
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  t.check('main page title', (await page.title()).length > 0, `"${await page.title()}"`);
  for (const id of ['about', 'experience', 'tools', 'contact', 'achievements'])
    t.check(`#${id} present`, await page.locator('#' + id).count() === 1);

  // Experience page. The clean URL depends on vercel.json cleanUrls in prod and
  // on Vite's multi-entry config in dev -- check it resolves to the right entry,
  // not an index.html fallback.
  await page.goto(BASE + '/experience', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  t.check('experience title', (await page.title()).toLowerCase().includes('experience'),
    `"${await page.title()}"`);
  t.check('experience heading', await page.locator('.xp-page').count() === 1);
  const cards = await page.locator('.xp-card, .xp-project').count();
  t.check('experience cards', cards > 0, `${cards} cards`);

  // Downloadable PDFs live in the Contact section on the main page. Collect the
  // real hrefs from the DOM so a renamed file is caught here rather than by a
  // visitor hitting a dead download.
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const pdfs = await page.evaluate(() =>
    [...new Set(Array.from(document.querySelectorAll('a[href$=".pdf"]'))
      .map(a => a.getAttribute('href'))
      .filter(h => h && h.startsWith('/')))]);

  t.check('pdf links present', pdfs.length > 0, `${pdfs.length} found`);

  // Vite answers unknown paths with the SPA HTML shell at status 200, so a
  // deleted file still "200"s. Check the content type, not the status code.
  for (const href of pdfs) {
    const res = await fetch(BASE + href);
    const type = res.headers.get('content-type') || '';
    t.check(`pdf ${href.split('/').pop()}`, type.includes('pdf'), `-> ${type}`);
  }

  await browser.close();
  process.exit(t.done(page));
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
