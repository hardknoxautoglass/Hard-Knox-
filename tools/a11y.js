'use strict';
/* Accessibility and behaviour suite (Playwright + axe-core) against the local preview on :8080.
   Covers: axe on every route at phone and desktop widths; reflow at 320 px and 1280@400%; 200% text;
   text-spacing overrides; landscape/short screens; no-JS; keyboard/menu behaviour; focus not obscured;
   target sizes; reduced motion; print of the warranty; network/cookie/storage/service-worker audit.
   Writes tools/out/a11y-report.json. Exit code 1 on any failure. */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE = 'http://127.0.0.1:8080';
const info = JSON.parse(fs.readFileSync(path.join(__dirname, 'out', 'build-info.json'), 'utf8'));
const ROUTES = [...info.pages.filter((p) => p !== '/404.html'), '/this-page-does-not-exist/'];
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const results = { generatedAt: new Date().toISOString(), axe: [], checks: [], failures: [] };
const fail = (msg) => { results.failures.push(msg); console.log('FAIL', msg); };
const ok = (name, detail) => { results.checks.push({ name, detail, pass: true }); };
const check = (cond, name, detail) => { if (cond) ok(name, detail); else { results.checks.push({ name, detail, pass: false }); fail(`${name} ${detail || ''}`); } };

async function hasHorizontalScroll(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}
async function isFullyVisible(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0 && el.scrollHeight <= el.clientHeight + 2;
  }, selector);
}

(async () => {
  const browser = await chromium.launch();
  // Test context: CSP bypass is needed only so axe-core and the text-spacing CSS can be injected.
  // The real CSP is exercised by the network/storage audit (section 9), which uses a normal context.
  const ctxA = await browser.newContext({ bypassCSP: true });
  const newPage = async (vp) => { const pg = await ctxA.newPage(); await pg.setViewportSize(vp); return pg; };

  // ---- 1. axe-core on every route, two widths --------------------------------------------
  for (const route of ROUTES) {
    for (const vp of [{ width: 360, height: 780 }, { width: 1280, height: 800 }]) {
      const page = await newPage(vp);
      await page.goto(BASE + route, { waitUntil: 'networkidle' });
      await page.addScriptTag({ content: AXE });
      const r = await page.evaluate(async () => {
        const res = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
        return { violations: res.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 5).map((n) => n.target.join(' ')) })), passes: res.passes.length, incomplete: res.incomplete.map((i) => ({ id: i.id, nodes: i.nodes.length })) };
      });
      results.axe.push({ route, width: vp.width, ...r });
      if (r.violations.length) fail(`axe ${route} @${vp.width}: ${r.violations.map((v) => `${v.id} (${v.nodes.join('; ')})`).join(' | ')}`);
      // Also open the mobile menu and re-run axe on the header
      if (vp.width === 360) {
        await page.click('.menu-toggle');
        const r2 = await page.evaluate(async () => (await window.axe.run(document.querySelector('.site-header'))).violations.map((v) => v.id));
        if (r2.length) fail(`axe open menu ${route}: ${r2.join(',')}`);
      }
      await page.close();
    }
  }
  ok('axe-core', `${ROUTES.length} routes × 2 widths, violations: ${results.axe.reduce((n, a) => n + a.violations.length, 0)}`);

  // ---- 2. Reflow / zoom / text spacing / landscape ----------------------------------------
  for (const route of ROUTES) {
    // 320 px wide (also equals a 1280 px screen at 400% zoom)
    let page = await newPage({ width: 320, height: 180 }); // 1280×720 @ 400%
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    check(!(await hasHorizontalScroll(page)), 'reflow 320×180 (1280@400%)', route);
    const barPos = await page.evaluate(() => getComputedStyle(document.getElementById('bottom-bar')).position);
    check(barPos === 'static', 'bottom bar in page flow at 400% zoom', `${route} position=${barPos}`);
    check(await isFullyVisible(page, '.notice--bar'), 'bar notice fully visible at 400% zoom', route);
    await page.close();

    page = await newPage({ width: 320, height: 640 });
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    check(!(await hasHorizontalScroll(page)), 'reflow 320×640', route);
    check(await isFullyVisible(page, '.notice--bar'), 'bar notice fully visible 320×640', route);
    await page.close();
    // 200% text size (browser text-only zoom approximation) at desktop and phone widths
    for (const w of [1280, 390]) {
      const pz = await newPage({ width: w, height: 800 });
      await pz.goto(BASE + route, { waitUntil: 'networkidle' });
      await pz.addStyleTag({ content: 'html{font-size:200% !important}' });
      await pz.waitForTimeout(100);
      check(!(await hasHorizontalScroll(pz)), `reflow at 200% text size @${w}`, route);
      await pz.close();
    }

    // Text spacing overrides (WCAG 1.4.12)
    page = await newPage({ width: 390, height: 844 });
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: '*{line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important} p{margin-bottom:2em !important}' });
    await page.waitForTimeout(100);
    check(!(await hasHorizontalScroll(page)), 'text-spacing override: no horizontal scroll', route);
    check(await isFullyVisible(page, '.notice--bar'), 'text-spacing override: bar notice fully visible', route);
    const clipped = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll('.btn, .site-nav a, .card h3, .ribbon, summary').forEach((el) => { if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible') bad.push(el.className || el.tagName); });
      return bad;
    });
    check(clipped.length === 0, 'text-spacing override: no clipped controls', `${route} ${clipped.join(',')}`);
    await page.close();

    // Short landscape phone
    page = await newPage({ width: 568, height: 320 });
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const pos = await page.evaluate(() => getComputedStyle(document.getElementById('bottom-bar')).position);
    check(pos === 'static', 'landscape 568×320: bar in page flow', `${route} position=${pos}`);
    check(!(await hasHorizontalScroll(page)), 'landscape 568×320: no horizontal scroll', route);
    await page.close();
  }

  // ---- 3. Portrait phone: focus never obscured by the fixed bar; last footer link reachable ----
  for (const route of ['/', '/warranty/', '/service-area-contact/']) {
    const page = await newPage({ width: 390, height: 844 });
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const barTop = await page.evaluate(() => document.getElementById('bottom-bar').getBoundingClientRect().top);
    let obscured = [];
    let count = 0; let lastHref = '';
    for (let i = 0; i < 400; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(30);
      const f = await page.evaluate(() => {
        const el = document.activeElement; if (!el || el === document.body) return null;
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        return { tag: el.tagName, text: (el.textContent || '').trim().slice(0, 40), href: el.getAttribute('href'), top: r.top, bottom: r.bottom, w: r.width, h: r.height, display: cs.display, visibility: cs.visibility, inBar: !!el.closest('#bottom-bar'), inMenu: !!el.closest('#site-nav') };
      });
      if (!f) break;
      count++;
      if (f.display === 'none' || f.visibility === 'hidden' || f.w === 0) fail(`hidden element received focus on ${route}: ${f.tag} ${f.text}`);
      if (!f.inBar && f.bottom > barTop + 1 && f.top < 844) obscured.push(`${f.tag} "${f.text}" bottom=${Math.round(f.bottom)} barTop=${Math.round(barTop)}`);
      if (f.inMenu) fail(`collapsed menu link received focus on ${route}: ${f.text}`);
      lastHref = f.href || lastHref;
      if (f.text.startsWith('Accessibility') && f.href === '/accessibility/') break; // last footer policy link
    }
    check(obscured.length === 0, 'focus not obscured by bottom bar', `${route}: ${obscured.slice(0, 3).join(' | ')}`);
    check(lastHref === '/accessibility/', 'last footer link reachable by keyboard', `${route} tabs=${count}`);
    await page.close();
  }

  // ---- 4. Keyboard: skip link, menu button semantics, Escape returns focus ----------------
  {
    const page = await newPage({ width: 360, height: 780 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const skip = await page.evaluate(() => ({ cls: document.activeElement.className, top: document.activeElement.getBoundingClientRect().top }));
    check(skip.cls === 'skip-link' && skip.top >= 0, 'skip link is first and becomes visible on focus', JSON.stringify(skip));
    await page.keyboard.press('Enter');
    const afterSkip = await page.evaluate(() => document.activeElement.id || document.activeElement.tagName);
    check(afterSkip === 'main', 'skip link moves focus to main', afterSkip);
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab'); // skip link
    await page.keyboard.press('Tab'); // brand
    await page.keyboard.press('Tab'); // menu button
    let a = await page.evaluate(() => ({ cls: document.activeElement.className, exp: document.activeElement.getAttribute('aria-expanded'), controls: document.activeElement.getAttribute('aria-controls'), name: document.activeElement.textContent.trim() }));
    check(a.cls.includes('menu-toggle') && a.exp === 'false' && a.controls === 'site-nav' && a.name === 'Menu', 'menu button name/expanded/controls', JSON.stringify(a));
    await page.keyboard.press('Enter');
    a = await page.evaluate(() => ({ exp: document.querySelector('.menu-toggle').getAttribute('aria-expanded'), navVisible: getComputedStyle(document.getElementById('site-nav')).display !== 'none' }));
    check(a.exp === 'true' && a.navVisible, 'menu opens with keyboard', JSON.stringify(a));
    await page.keyboard.press('Tab');
    const firstLink = await page.evaluate(() => document.activeElement.textContent.trim());
    check(firstLink === 'Home', 'tab moves into open menu', firstLink);
    await page.keyboard.press('Escape');
    a = await page.evaluate(() => ({ exp: document.querySelector('.menu-toggle').getAttribute('aria-expanded'), focus: document.activeElement.className }));
    check(a.exp === 'false' && a.focus.includes('menu-toggle'), 'Escape closes menu and returns focus', JSON.stringify(a));
    // FAQ disclosure by keyboard
    await page.goto(BASE + '/#faq-shop', { waitUntil: 'networkidle' });
    const opened = await page.evaluate(() => document.getElementById('faq-shop').open);
    check(opened, 'FAQ opens when linked by fragment', String(opened));
    await page.close();
  }

  // ---- 5. Target sizes ---------------------------------------------------------------------
  {
    const page = await newPage({ width: 390, height: 844 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    const sizes = await page.evaluate(() => {
      const out = { small: [], cta: [] };
      document.querySelectorAll('.btn').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.width < 44 || r.height < 44)) out.cta.push(`${el.textContent.trim()} ${Math.round(r.width)}×${Math.round(r.height)}`); });
      document.querySelectorAll('button, .site-nav a, .footer-list a, .breadcrumbs a, summary').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.width < 24 || r.height < 24)) out.small.push(`${el.textContent.trim().slice(0, 20)} ${Math.round(r.width)}×${Math.round(r.height)}`); });
      return out;
    });
    check(sizes.cta.length === 0, 'Call/Text and other buttons ≥ 44×44', sizes.cta.join('; '));
    check(sizes.small.length === 0, 'controls ≥ 24×24', sizes.small.join('; '));
    await page.close();
  }

  // ---- 6. No-JavaScript pass ----------------------------------------------------------------
  {
    const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 780 } });
    for (const route of ROUTES) {
      const page = await ctx.newPage();
      const res = await page.goto(BASE + route);
      const s = await page.evaluate(() => ({
        navVisible: getComputedStyle(document.getElementById('site-nav')).display !== 'none',
        navLinks: document.querySelectorAll('#site-nav a').length,
        toggleHidden: getComputedStyle(document.querySelector('.menu-toggle')).display === 'none',
        tel: document.querySelectorAll('a[href^="tel:"]').length, sms: document.querySelectorAll('a[href^="sms:"]').length,
        h1: document.querySelectorAll('h1').length, barNotice: !!document.querySelector('.notice--bar'),
        bodyPad: getComputedStyle(document.body).paddingBottom, barPos: getComputedStyle(document.getElementById('bottom-bar')).position,
      }));
      check(s.navVisible && s.navLinks === 4 && s.toggleHidden && s.tel > 0 && s.sms > 0 && s.h1 === 1 && s.barNotice, 'no-JS: nav visible, contact links present', `${route} ${JSON.stringify(s)}`);
      await page.close();
    }
    await ctx.close();
  }

  // ---- 7. Reduced motion ---------------------------------------------------------------------
  {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(BASE + '/');
    const sb = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
    check(sb === 'auto', 'reduced motion disables smooth scrolling', sb);
    await ctx.close();
  }

  // ---- 8. Print: warranty ---------------------------------------------------------------------
  {
    const page = await newPage({ width: 1280, height: 800 });
    await page.goto(BASE + '/warranty/', { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    const p = await page.evaluate(() => ({
      headerHidden: getComputedStyle(document.querySelector('.site-header')).display === 'none',
      barHidden: getComputedStyle(document.getElementById('bottom-bar')).display === 'none',
      sections: [...document.querySelectorAll('.prose h2')].filter((h) => h.id && h.id !== 'toc-h').map((h) => h.id),
      allVisible: [...document.querySelectorAll('.prose h2, .prose p, .prose li')].every((el) => getComputedStyle(el).display !== 'none'),
    }));
    check(p.headerHidden && p.barHidden && p.allVisible && p.sections.length === 13, 'warranty print: chrome hidden, all 13 sections visible', JSON.stringify(p.sections));
    const pdf = path.join(__dirname, 'out', 'warranty-print.pdf');
    await page.pdf({ path: pdf, format: 'Letter', printBackground: false });
    ok('warranty PDF written', pdf);
    await page.close();
  }

  // ---- 9. Network / cookies / storage / service workers (first + repeat visit) ---------------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    const offOrigin = []; const all = [];
    page.on('request', (req) => { all.push(req.url()); if (!req.url().startsWith(BASE)) offOrigin.push(req.url()); });
    for (const pass of ['first', 'repeat']) {
      for (const route of ['/', '/service-area-contact/', '/warranty/']) {
        await page.goto(BASE + route, { waitUntil: 'networkidle' });
        await page.click('.faq summary').catch(() => {});
        const state = await page.evaluate(async () => ({
          cookies: document.cookie, ls: localStorage.length, ss: sessionStorage.length,
          sw: 'serviceWorker' in navigator ? (await navigator.serviceWorker.getRegistrations()).length : 0,
          idb: 'indexedDB' in window && indexedDB.databases ? (await indexedDB.databases()).length : 0,
        }));
        const cookies = await ctx.cookies();
        check(!state.cookies && !cookies.length && !state.ls && !state.ss && !state.sw && !state.idb, `no cookies/storage/service workers (${pass} visit)`, `${route} ${JSON.stringify(state)}`);
      }
    }
    check(offOrigin.length === 0, 'zero off-origin requests', offOrigin.slice(0, 5).join(', '));
    results.requests = [...new Set(all.map((u) => u.replace(BASE, '')))];
    await ctx.close();
  }

  // ---- 10. Contact handoff links resolve to the exact number ---------------------------------
  {
    const page = await browser.newPage();
    await page.goto(BASE + '/service-area-contact/');
    const links = await page.evaluate(() => [...document.querySelectorAll('a[href^="tel:"], a[href^="sms:"], a[href^="mailto:"]')].map((a) => a.getAttribute('href')));
    const bad = links.filter((h) => !['tel:+18652993533', 'sms:+18652993533', 'mailto:HardKnoxAutoGlass@gmail.com'].includes(h));
    check(bad.length === 0, 'tel/sms/mailto hrefs exact, no prefilled bodies', bad.join(','));
    await page.close();
  }

  await ctxA.close();
  await browser.close();
  fs.writeFileSync(path.join(__dirname, 'out', 'a11y-report.json'), JSON.stringify(results, null, 2));
  const passed = results.checks.filter((c) => c.pass).length;
  console.log(`\na11y suite: ${passed}/${results.checks.length} checks passed, ${results.failures.length} failures.`);
  process.exit(results.failures.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
