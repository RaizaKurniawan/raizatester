// Tools section: category filters.
//
// Each chip carries its own count badge, so the chip is the oracle -- the test
// reads the expected number off the UI rather than hardcoding a table that
// goes stale every time a tool is added to src/components/Tools.jsx.

const { BASE, launch, openPage, requireServer, tracker } = require('./helpers');

(async () => {
  await requireServer();
  const t = tracker();
  const browser = await launch();
  const page = await openPage(browser);

  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.locator('#tools').scrollIntoViewIfNeeded();
  await page.waitForSelector('.tool-card', { state: 'visible' });
  await page.waitForTimeout(800);

  const chipCount = await page.locator('.tools-chip').count();
  t.check('chips render', chipCount > 1, `${chipCount} chips`);

  // Every filter: the rendered cards must match the chip's badge, the chip must
  // report pressed, and no card from another category may leak through.
  for (let i = 0; i < chipCount; i++) {
    const chip = page.locator('.tools-chip').nth(i);
    const raw = (await chip.innerText()).replace(/\s+/g, ' ').trim();
    const m = raw.match(/^(.*?)\s*(\d+)$/);
    const name = m ? m[1] : raw;
    const want = m ? parseInt(m[2], 10) : -1;

    await chip.click();
    await page.waitForTimeout(450);

    const rendered = await page.locator('.tool-card').count();
    const pressed = await chip.getAttribute('aria-pressed');
    const cats = await page.evaluate(() => [...new Set(
      Array.from(document.querySelectorAll('.tool-card .tool-meta span:first-child'))
        .map(s => s.textContent.split('·')[0].trim()))]);

    const catOk = name.toLowerCase() === 'all'
      || (cats.length === 1 && cats[0] === name.toLowerCase());
    t.check(
      `filter ${name}`,
      rendered === want && pressed === 'true' && catOk,
      `chip=${want} rendered=${rendered} cats=[${cats.join(', ')}]`
    );
  }

  // Rapid switching: AnimatePresence exit animations overlap, so cards from a
  // previous filter can survive if the keys or exit handling are wrong.
  for (let r = 0; r < 3; r++)
    for (let i = 0; i < chipCount; i++) await page.locator('.tools-chip').nth(i).click();
  await page.waitForTimeout(1200);

  const lastLabel = (await page.locator('.tools-chip').nth(chipCount - 1).innerText())
    .replace(/\s+/g, ' ').trim();
  const lastWant = parseInt(lastLabel.match(/(\d+)$/)?.[1] ?? '-1', 10);
  t.check('rapid switching', await page.locator('.tool-card').count() === lastWant,
    `settled on ${lastLabel}`);

  t.check('single active chip',
    await page.locator('.tools-chip[aria-pressed="true"]').count() === 1);

  // Keyboard: the chips must be real buttons, not click-only divs.
  await page.locator('.tools-chip').first().focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  t.check('keyboard activation',
    await page.locator('.tools-chip').first().getAttribute('aria-pressed') === 'true');

  // Duplicate cards would mean the React key is not stable across filtering.
  const names = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.tool-card h3')).map(h => h.textContent.trim()));
  const dupes = names.filter((n, i) => names.indexOf(n) !== i);
  t.check('no duplicate cards', dupes.length === 0,
    `${names.length} cards${dupes.length ? ' dupes=' + dupes.join(',') : ''}`);

  await browser.close();
  process.exit(t.done(page));
})().catch(e => { console.error('ERROR:', e.message); process.exit(2); });
