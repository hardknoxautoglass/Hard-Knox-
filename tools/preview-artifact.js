'use strict';
/* Derives a private-preview copy of site/ for publishing as a claude.ai artifact.
   - absolute links/asset paths become relative (artifact pages are not served from a domain root)
   - a visible "preview build" banner is added to every page
   - the root page is emitted as body content with <title> and <style> first (the artifact host wraps it in its own skeleton);
     every other page stays a full document.
   Output: tools/out/preview/ (never shipped, never committed). Usage: node tools/preview-artifact.js */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const OUT = path.join(__dirname, 'out', 'preview');
const info = JSON.parse(fs.readFileSync(path.join(__dirname, 'out', 'build-info.json'), 'utf8'));
const checksums = fs.existsSync(path.join(ROOT, 'release', 'CHECKSUMS.txt')) ? fs.readFileSync(path.join(ROOT, 'release', 'CHECKSUMS.txt'), 'utf8').trim().split('\n').pop() : '';
const sha = (checksums.match(/^([0-9a-f]{64})/) || [])[1] || '';

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else files.push(path.relative(SITE, p)); } })(SITE);

const banner = (prefix) => `<div class="preview-banner" role="note"><strong>Preview build v1.0${sha ? ' · ' + sha.slice(0, 8) : ''}</strong> — a private review copy, not the live site. Call, Text and email buttons may do nothing inside this preview; test them on the real site. Print also does not work here. <a href="${prefix}index.html">Home</a></div>`;
const bannerCss = `.preview-banner{background:#7a4706;color:#fff;font:600 14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;padding:10px max(16px,env(safe-area-inset-right,0px)) 10px max(16px,env(safe-area-inset-left,0px));text-align:center}.preview-banner a{color:#fff}`;

// Rewrite "/x" references to be relative to a page at `depth` directory levels below the root.
function relativize(html, depth) {
  const prefix = depth === 0 ? '' : '../'.repeat(depth);
  return html
    .replace(/(href|src)="\/(?!\/)([^"#]*)(#[^"]*)?"/g, (m, attr, p, frag) => {
      let target = p;
      if (target === '' ) target = 'index.html';
      else if (target.endsWith('/')) target = target + 'index.html';
      return `${attr}="${prefix}${target}${frag || ''}"`;
    });
}

for (const rel of files) {
  const src = path.join(SITE, rel);
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (rel === '.htaccess' || rel === 'robots.txt' || rel === 'sitemap.xml') continue; // not part of a page preview
  if (rel.endsWith('.css')) {
    // CSS lives in assets/css/; fonts in assets/fonts/
    fs.writeFileSync(dest, fs.readFileSync(src, 'utf8').split('url("/assets/fonts/').join('url("../fonts/'));
    continue;
  }
  if (!rel.endsWith('.html')) { fs.copyFileSync(src, dest); continue; }

  const depth = rel.split('/').length - 1;
  const prefix = depth === 0 ? '' : '../'.repeat(depth);
  let html = relativize(fs.readFileSync(src, 'utf8'), depth);
  // canonical stays absolute (production host); the artifact is private and not indexable anyway.
  html = html.replace('<a class="skip-link" href="#main">Skip to main content</a>', `<a class="skip-link" href="#main">Skip to main content</a>\n${banner(prefix)}`);

  if (rel === 'index.html') {
    // Root page: the artifact host supplies <!doctype>, <html>, <head> (charset + viewport) and <body>.
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || 'Hard Knox Auto Glass';
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    const headKeep = head
      .split('\n')
      .filter((l) => /<link rel="(icon|apple-touch-icon|preload|stylesheet)"|<script/.test(l) && !/<title>|<meta|rel="canonical"/.test(l))
      .join('\n');
    const bodyInner = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
    const bodyClass = (html.match(/<body class="([^"]*)"/) || [])[1] || '';
    const out = `<title>Hard Knox Auto Glass</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>${bannerCss} body{font:1rem/1.55 system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}</style>
${headKeep}
<div class="${bodyClass}">
${bodyInner}
</div>
`;
    fs.writeFileSync(dest, out);
    void title;
  } else {
    html = html.replace('</head>', `<style>${bannerCss}</style>\n</head>`);
    fs.writeFileSync(dest, html);
  }
}

const outFiles = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else outFiles.push(path.relative(OUT, p)); } })(OUT);
const map = {};
for (const f of outFiles) if (f !== 'index.html') map[f] = path.relative(ROOT, path.join(OUT, f));
fs.writeFileSync(path.join(__dirname, 'out', 'preview-files.json'), JSON.stringify(map, null, 2));
console.log(`Preview copy: ${outFiles.length} files in tools/out/preview/ (root page + ${Object.keys(map).length} files).`);
// Sanity: no absolute "/..." references remain in HTML/CSS
let leftovers = 0;
for (const f of outFiles) if (/\.(html|css)$/.test(f)) { const s = fs.readFileSync(path.join(OUT, f), 'utf8'); const m = s.match(/(href|src|url\()="?\/(?!\/)[a-z]/g); if (m) { leftovers += m.length; console.log('absolute ref left in', f, m.slice(0, 3)); } }
console.log('absolute references remaining:', leftovers);
