'use strict';
// Rasterizes tools/src/img/favicon.svg to favicon-32.png and apple-touch-icon.png (180px).
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
(async () => {
  const dir = path.join(__dirname, 'src', 'img');
  const svg = fs.readFileSync(path.join(dir, 'favicon.svg'), 'utf8');
  const browser = await chromium.launch();
  for (const [size, name] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png']]) {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${svg.replace('width="64" height="64"', `width="${size}" height="${size}"`)}</body></html>`);
    await page.screenshot({ path: path.join(dir, name), omitBackground: true });
    await page.close();
    console.log('wrote', name);
  }
  await browser.close();
})();
