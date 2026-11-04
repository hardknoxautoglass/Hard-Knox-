'use strict';
// Screenshot helper for visual review: node tools/shot.js <path> <name> [width] [height] [fullPage=1]
const path = require('path');
const { chromium } = require('playwright');
(async () => {
  const [, , urlPath = '/', name = 'shot', w = '390', h = '844', full = '1'] = process.argv;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('http://127.0.0.1:8080' + urlPath, { waitUntil: 'networkidle' });
  const out = path.join(__dirname, 'out', `${name}.png`);
  await page.screenshot({ path: out, fullPage: full === '1' });
  console.log('wrote', out, errors.length ? 'ERRORS: ' + errors.join(' | ') : 'no console errors');
  await browser.close();
})();
