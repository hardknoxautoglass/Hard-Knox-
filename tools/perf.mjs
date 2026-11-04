// Lighthouse lab runs (mobile profile, simulated slow 4G) against the local preview on :8080.
// Three cold runs per page; the median is reported. Lab numbers are not field data (see docs/validation-report.md).
// Usage: node tools/perf.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'http://127.0.0.1:8080';
const PAGES = ['/', '/windshield-replacement/', '/warranty/', '/service-area-contact/'];
const RUNS = 3;
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';

const median = (arr) => { const s = [...arr].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };

const chrome = await chromeLauncher.launch({ chromePath: CHROME, chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
const results = { generatedAt: new Date().toISOString(), profile: 'Lighthouse default mobile (emulated Moto G Power, simulated slow 4G, 4x CPU slowdown)', pages: [] };
try {
  for (const p of PAGES) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      const { lhr } = await lighthouse(BASE + p, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], disableStorageReset: false });
      const a = lhr.audits;
      runs.push({
        perf: Math.round(lhr.categories.performance.score * 100),
        a11y: Math.round(lhr.categories.accessibility.score * 100),
        bp: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
        lcp: a['largest-contentful-paint'].numericValue,
        cls: a['cumulative-layout-shift'].numericValue,
        tbt: a['total-blocking-time'].numericValue,
        fcp: a['first-contentful-paint'].numericValue,
        si: a['speed-index'].numericValue,
        bytes: a['total-byte-weight'].numericValue,
        requests: a['network-requests'].details ? a['network-requests'].details.items.length : null,
        lcpElement: a['largest-contentful-paint-element'] && a['largest-contentful-paint-element'].details && a['largest-contentful-paint-element'].details.items[0] && a['largest-contentful-paint-element'].details.items[0].items ? a['largest-contentful-paint-element'].details.items[0].items[0].node.snippet : '',
      });
    }
    const med = (k) => median(runs.map((r) => r[k]));
    const entry = { path: p, runs, median: { perf: med('perf'), a11y: med('a11y'), bp: med('bp'), seo: med('seo'), lcp_ms: Math.round(med('lcp')), cls: Number(med('cls').toFixed(3)), tbt_ms: Math.round(med('tbt')), fcp_ms: Math.round(med('fcp')), bytes: Math.round(med('bytes')), requests: med('requests') } };
    results.pages.push(entry);
    console.log(p, JSON.stringify(entry.median));
  }
} finally {
  await chrome.kill();
}
fs.writeFileSync(path.join(__dirname, 'out', 'perf-report.json'), JSON.stringify(results, null, 2));
console.log('wrote tools/out/perf-report.json');
