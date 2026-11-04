'use strict';
/* Crawls the local preview from / following every same-origin link, stylesheet, script, image and font.
   Checks: status codes, one <title>/<meta description>/<h1>/canonical per page, uniqueness, fragment targets,
   JSON-LD syntax and agreement with visible facts, sitemap == crawled indexable set, robots.txt, orphans.
   Writes tools/out/crawl-report.json and docs/inventory.md. Usage: node tools/crawl.js (server on :8080). */
const fs = require('fs');
const path = require('path');
const cfg = require('./site-config');

const BASE = process.env.BASE || 'http://127.0.0.1:8080';
const seen = new Map(); // url path -> record
const queue = ['/'];
const problems = [];
const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function attrs(tag, name) {
  const re = new RegExp(`<${tag}\\b[^>]*>`, 'gi');
  const out = [];
  let m;
  while ((m = re.exec(html_current))) {
    const a = new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, 'i').exec(m[0]);
    if (a) out.push({ value: a[1], tag: m[0] });
  }
  return out;
}
let html_current = '';

async function fetchPath(p) {
  const res = await fetch(BASE + p, { redirect: 'manual' });
  const body = await res.text();
  return { status: res.status, location: res.headers.get('location'), type: res.headers.get('content-type') || '', body, headers: Object.fromEntries(res.headers.entries()) };
}

(async () => {
  while (queue.length) {
    const p = queue.shift();
    if (seen.has(p)) continue;
    const rec = { path: p, from: [] };
    seen.set(p, rec);
    let r;
    try { r = await fetchPath(p); } catch (e) { rec.status = 'ERR'; problems.push(`${p}: fetch failed ${e.message}`); continue; }
    rec.status = r.status; rec.type = r.type; rec.bytes = Buffer.byteLength(r.body);
    rec.headers = { csp: !!r.headers['content-security-policy'], nosniff: r.headers['x-content-type-options'], cache: r.headers['cache-control'] };
    if (r.status >= 300 && r.status < 400) { rec.location = r.location; problems.push(`${p}: unexpected redirect to ${r.location}`); continue; }
    if (r.status !== 200) { problems.push(`${p}: status ${r.status}`); continue; }
    if (!r.type.includes('text/html')) continue;

    html_current = r.body;
    const html = r.body;
    rec.title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    rec.description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    rec.canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
    rec.robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
    rec.h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));
    rec.lang = /<html lang="en">/.test(html);
    rec.viewport = /<meta name="viewport" content="width=device-width, initial-scale=1">/.test(html);
    rec.ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    rec.text = strip(html);
    rec.words = rec.text.split(' ').length;
    rec.jsonld = [];
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { rec.jsonld.push(JSON.parse(m[1])); } catch (e) { problems.push(`${p}: JSON-LD parse error ${e.message}`); }
    }
    rec.links = [];
    rec.external = [];
    rec.contact = { tel: 0, sms: 0, mailto: 0 };
    for (const a of attrs('a', 'href')) {
      const h = a.value;
      if (h.startsWith('tel:')) { rec.contact.tel++; if (h !== `tel:${cfg.business.phoneE164}`) problems.push(`${p}: bad tel link ${h}`); continue; }
      if (h.startsWith('sms:')) { rec.contact.sms++; if (h !== `sms:${cfg.business.phoneE164}`) problems.push(`${p}: bad sms link ${h}`); continue; }
      if (h.startsWith('mailto:')) { rec.contact.mailto++; if (h !== `mailto:${cfg.business.email}`) problems.push(`${p}: bad mailto ${h}`); continue; }
      if (/^https?:\/\//.test(h)) { rec.external.push(h); continue; }
      rec.links.push(h);
    }
    const assetRefs = [
      ...attrs('link', 'href').map((x) => x.value),
      ...attrs('script', 'src').map((x) => x.value),
      ...attrs('img', 'src').map((x) => x.value),
    ];
    for (const h of [...rec.links, ...assetRefs]) {
      if (/^https?:\/\//.test(h)) { if (!h.startsWith(cfg.origin)) problems.push(`${p}: off-origin asset ${h}`); continue; }
      const [pathPart, frag] = h.split('#');
      const target = pathPart ? new URL(pathPart, BASE + p).pathname : p;
      if (frag !== undefined) rec.fragLinks = (rec.fragLinks || []).concat([{ target, frag }]);
      if (!seen.has(target)) { queue.push(target); }
      const t = seen.get(target); if (t) t.from.push(p);
      else (rec._pending = rec._pending || []).push(target);
    }
    for (const t of rec._pending || []) { /* resolved after crawl */ }
  }
  // Record inbound links
  for (const rec of seen.values()) {
    for (const h of rec.links || []) {
      const target = new URL(h.split('#')[0] || rec.path, BASE + rec.path).pathname;
      const t = seen.get(target); if (t && !t.from.includes(rec.path)) t.from.push(rec.path);
    }
  }
  // Fragment targets exist
  for (const rec of seen.values()) {
    for (const { target, frag } of rec.fragLinks || []) {
      const t = seen.get(target);
      if (!t || !t.ids || !t.ids.has(frag)) problems.push(`${rec.path}: fragment #${frag} not found on ${target}`);
    }
  }
  const pages = [...seen.values()].filter((r) => r.type && r.type.includes('text/html') && r.status === 200);
  const titles = new Map(); const descs = new Map();
  for (const r of pages) {
    const expectCanonical = cfg.origin + r.path;
    if (!r.lang) problems.push(`${r.path}: missing lang`);
    if (!r.viewport) problems.push(`${r.path}: missing viewport`);
    if (!r.title) problems.push(`${r.path}: missing title`);
    if (r.title.length > 70) problems.push(`${r.path}: title ${r.title.length} chars`);
    if (!r.description) problems.push(`${r.path}: missing description`);
    if (r.description.length > 170) problems.push(`${r.path}: description ${r.description.length} chars`);
    if (r.h1.length !== 1) problems.push(`${r.path}: ${r.h1.length} h1 elements`);
    if (r.path !== '/404.html' && r.canonical !== expectCanonical) problems.push(`${r.path}: canonical "${r.canonical}" != ${expectCanonical}`);
    if (r.path === '/404.html' && r.robots !== 'noindex') problems.push('404.html should be noindex');
    if (r.path !== '/404.html' && r.robots) problems.push(`${r.path}: stray robots meta ${r.robots}`);
    if (titles.has(r.title)) problems.push(`${r.path}: duplicate title with ${titles.get(r.title)}`); titles.set(r.title, r.path);
    if (descs.has(r.description)) problems.push(`${r.path}: duplicate description with ${descs.get(r.description)}`); descs.set(r.description, r.path);
    if (!r.text.includes(cfg.business.phoneDisplay)) problems.push(`${r.path}: phone number not in visible text`);
    if (!r.text.includes(cfg.strings.securityNotice)) problems.push(`${r.path}: security notice missing`);
    if (r.contact.tel < 1 || r.contact.sms < 1) problems.push(`${r.path}: missing tel/sms links`);
    if (r.contact.mailto && r.path !== '/service-area-contact/') problems.push(`${r.path}: mailto outside Contact page`);
    if (r.path !== '/404.html' && r.from.length === 0 && r.path !== '/') problems.push(`${r.path}: ORPHAN (no inbound links)`);
    for (const node of r.jsonld) {
      const nodes = Array.isArray(node) ? node : [node];
      for (const n of nodes) {
        if (n['@type'] === 'AutoRepair') {
          if (n.telephone !== cfg.business.phoneE164) problems.push(`${r.path}: JSON-LD telephone mismatch`);
          if (n.name !== cfg.business.name) problems.push(`${r.path}: JSON-LD name mismatch`);
          if (n.address || n.geo || n.aggregateRating || n.priceRange || n.review) problems.push(`${r.path}: JSON-LD has a prohibited property`);
          if (n.url !== cfg.origin + '/') problems.push(`${r.path}: JSON-LD url mismatch`);
        }
        if (n['@type'] === 'BreadcrumbList') {
          const names = n.itemListElement.map((i) => i.name);
          for (const nm of names) if (!r.text.includes(nm)) problems.push(`${r.path}: breadcrumb "${nm}" not visible on page`);
        }
        if (n['@type'] === 'Service' && !r.text.includes(n.name)) problems.push(`${r.path}: Service "${n.name}" not visible on page`);
      }
    }
  }
  // Sitemap and robots
  const sm = await fetchPath('/sitemap.xml');
  const smUrls = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const indexable = pages.filter((r) => r.path !== '/404.html').map((r) => cfg.origin + r.path).sort();
  const smSorted = [...smUrls].sort();
  if (JSON.stringify(indexable) !== JSON.stringify(smSorted)) problems.push(`sitemap mismatch: crawl=${indexable.length} sitemap=${smUrls.length}\n  only crawl: ${indexable.filter((u) => !smUrls.includes(u))}\n  only sitemap: ${smUrls.filter((u) => !indexable.includes(u))}`);
  const robots = await fetchPath('/robots.txt');
  if (!robots.body.includes(`Sitemap: ${cfg.origin}/sitemap.xml`)) problems.push('robots.txt missing absolute sitemap');
  // Redirect / 404 matrix on the emulation server
  const matrix = [];
  for (const [req, exp] of [['/services', '301 /services/'], ['/services/index.html', '301 /services/'], ['/index.html', '301 /'], ['/nope', '404'], ['/nope/deeper/path', '404'], ['/services/nope/', '404'], ['/warranty/?utm_source=x', '200'], ['/.htaccess', '403'], ['/assets/', '404']]) {
    const r = await fetchPath(req);
    const got = r.status === 301 ? `301 ${new URL(r.location, BASE).pathname}` : String(r.status);
    matrix.push({ request: req, expected: exp, observed: got, pass: got === exp });
    if (got !== exp) problems.push(`matrix ${req}: expected ${exp} got ${got}`);
  }
  // 404 page styled? (stylesheet path absolute)
  const nf = await fetchPath('/nope/deeper/path');
  if (!/href="\/assets\/css\/site\.[0-9a-f]{8}\.css"/.test(nf.body)) problems.push('404 page stylesheet not absolute');

  const report = {
    base: BASE, crawledAt: new Date().toISOString(), pages: pages.map((r) => ({
      path: r.path, status: r.status, bytes: r.bytes, title: r.title, titleLen: r.title.length, description: r.description, descLen: r.description.length,
      h1: r.h1[0], canonical: r.canonical, robots: r.robots, words: r.words, inbound: r.from.length, external: r.external, jsonldTypes: r.jsonld.flat().map((n) => n['@type']), contact: r.contact,
    })),
    assets: [...seen.values()].filter((r) => !(r.type || '').includes('text/html')).map((r) => ({ path: r.path, status: r.status, bytes: r.bytes, cache: r.headers && r.headers.cache })),
    sitemap: smUrls, matrix, problems,
  };
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'out', 'crawl-report.json'), JSON.stringify(report, null, 2));

  // Inventory markdown for the owner handoff
  const md = [`# Page, metadata, link and canonical inventory`, '', `Generated by \`node tools/crawl.js\` against the local preview on ${report.crawledAt}. Canonical host: ${cfg.origin}`, '',
    '| URL | Status | Title (chars) | Description (chars) | H1 | Canonical | Words | Inbound links | JSON-LD |', '|---|---|---|---|---|---|---|---|---|',
    ...report.pages.map((p) => `| \`${p.path}\` | ${p.status} | ${p.title} (${p.titleLen}) | ${p.description} (${p.descLen}) | ${p.h1} | ${p.canonical || '— (noindex)'} | ${p.words} | ${p.inbound} | ${p.jsonldTypes.join(', ') || '—'} |`),
    '', '## Sitemap', '', ...report.sitemap.map((u) => `- ${u}`), '', '## Assets', '', '| Path | Status | Bytes | Cache-Control (emulated) |', '|---|---|---|---|',
    ...report.assets.map((a) => `| \`${a.path}\` | ${a.status} | ${a.bytes} | ${a.cache || ''} |`),
    '', '## Redirect / 404 matrix (local emulation; re-run on the real host)', '', '| Request | Expected | Observed | Pass |', '|---|---|---|---|',
    ...report.matrix.map((m) => `| \`${m.request}\` | ${m.expected} | ${m.observed} | ${m.pass ? 'yes' : 'NO'} |`),
    '', '## Problems', '', ...(problems.length ? problems.map((p) => `- ${p}`) : ['- none']), ''].join('\n');
  fs.writeFileSync(path.join(__dirname, '..', 'docs', 'inventory.md'), md);

  console.log(`Crawled ${seen.size} URLs (${pages.length} HTML). Problems: ${problems.length}`);
  for (const p of problems) console.log(' -', p);
  process.exit(problems.length ? 1 : 0);
})();
