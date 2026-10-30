// Positioning guards: the claims a recruiter actually checks.
//
// These are not layout tests. They pin the facts that must stay consistent
// across the hero, About, and page metadata -- an inconsistency here reads as
// carelessness in a detail-oriented role, which is worse than a style slip.

const { BASE, launch, openPage, requireServer, tracker } = require('./helpers');

const TITLE = 'Senior QA Engineer';

(async () => {
  await requireServer();
  const t = tracker();
  const browser = await launch();
  const page = await openPage(browser);

  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(2600);

  // Seniority must read the same everywhere it appears.
  t.check('page title is senior', (await page.title()).includes(TITLE),
    await page.title());

  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
  t.check('og:title is senior', (ogTitle || '').includes(TITLE), ogTitle);
  t.check('single og:title',
    await page.locator('meta[property="og:title"]').count() === 1,
    'duplicate og tags make scrapers pick arbitrarily');

  const desc = await page.locator('meta[name="description"]').getAttribute('content');
  t.check('description sells QA', /QA|testing/i.test(desc || '') && !/futuristic/i.test(desc || ''),
    (desc || '').slice(0, 60) + '...');

  // The rotating hero role must LEAD with the senior title: whichever frame a
  // visitor lands on first is the one that sets their expectation.
  const firstRole = await page.evaluate(() => {
    const el = document.querySelector('.hero-role-text');
    return el ? el.textContent : '';
  });
  t.check('hero role leads senior', firstRole.length === 0 || TITLE.startsWith(firstRole.trim()) || firstRole.includes('Senior'),
    `"${firstRole}"`);

  // Above the fold: concrete proof, and a CTA that goes somewhere.
  const proof = await page.locator('.hero-proof li').count();
  t.check('hero has proof points', proof >= 3, `${proof} points`);

  const ctas = await page.locator('.hero-actions .cta-button').allInnerTexts();
  t.check('primary CTA is not "scroll"', !/scroll/i.test(ctas[0] || ''), ctas.join(' | '));

  const primaryHref = await page.locator('.hero-actions .cta-button').first().getAttribute('href');
  t.check('primary CTA targets experience', (primaryHref || '').includes('experience'),
    primaryHref);

  // The CV button must serve a real PDF, not the SPA shell at status 200.
  const cvHref = await page.locator('.hero-actions .cta-button').nth(1).getAttribute('href');
  const res = await fetch(BASE + cvHref);
  const type = res.headers.get('content-type') || '';
  t.check('hero CV resolves', type.includes('pdf'), `${cvHref} -> ${type}`);

  // Experience claim must match the timeline the site itself shows. The old
  // copy said 5 years while the roles went back further.
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200);
  const about = await page.locator('.about-section').innerText();
  t.check('About says senior', about.includes(TITLE));
  t.check('no stale 5-year claim', !/\b5\+?\s*years/i.test(about),
    'site timeline starts 2020 or earlier');

  const years = await page.locator('.stat-value').first().innerText();
  t.check('years stat >= 6', parseInt(years, 10) >= 6, years);

  await browser.close();
  process.exit(t.done(page));
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
