'use strict';
const cfg = require('./site-config');
const icons = require('./icons');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline bootstrap: lets CSS know JavaScript is running before first paint, so the mobile
// menu can start collapsed without a flash. Its SHA-256 is allow-listed in the CSP (see build.js).
const INLINE_BOOT = "document.documentElement.className+=' js'";

// The displayed number may wrap only at the space after the area code; "299-3533" never splits.
// Plain characters only (no non-breaking entities) so that copying the number pastes cleanly into a dialer.
const [areaCode, localPart] = cfg.business.phoneDisplay.split(' ');
const PHONE_NB = `<span class="num">${esc(areaCode)} <span class="nb">${esc(localPart)}</span></span>`;
function telLink(cls, label) {
  return `<a class="${cls}" href="tel:${cfg.business.phoneE164}">${label}</a>`;
}
function smsLink(cls, label) {
  return `<a class="${cls}" href="sms:${cfg.business.phoneE164}">${label}</a>`;
}

function icon(name, cls = 'icon') {
  return `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
}

function securityNotice(cls = 'notice') {
  return `<p class="${cls}">${esc(cfg.strings.securityNotice)}</p>`;
}

function ctaGroup({ withNotice = true, compact = false } = {}) {
  return `<div class="cta-group${compact ? ' cta-group--compact' : ''}">
  <div class="cta-buttons">
    ${telLink('btn btn-gold', icon('phone') + 'Call for a Free Quote')}
    ${smsLink('btn btn-outline', icon('sms') + 'Text for a Free Quote')}
  </div>
  <p class="cta-number">Call or text ${PHONE_NB}</p>
  ${withNotice ? securityNotice() : ''}
</div>`;
}

// Original shield mark (placeholder until the owner's logo file arrives): forest shield, gold rim, gold stripe, windshield.
function brandMark() {
  return `<svg class="brand-mark" viewBox="0 0 48 52" width="40" height="44" aria-hidden="true" focusable="false">
<defs><clipPath id="hk-shield"><path d="M24 2.5 43 9.5v15.2c0 11-7.6 20.2-19 24.3C12.6 44.9 5 35.7 5 24.7V9.5l19-7Z"/></clipPath></defs>
<path d="M24 2.5 43 9.5v15.2c0 11-7.6 20.2-19 24.3C12.6 44.9 5 35.7 5 24.7V9.5l19-7Z" fill="#14523b" stroke="#c9a227" stroke-width="2.5" stroke-linejoin="round"/>
<g clip-path="url(#hk-shield)"><path d="M2 36 48 22v5L2 41Z" fill="#c9a227"/><path d="M2 42 48 28v2L2 44Z" fill="#e8d27a"/></g>
<path d="M13.5 31 18.2 16.8a2 2 0 0 1 1.9-1.4h7.8a2 2 0 0 1 1.9 1.4L34.5 31Z" fill="#f6f3eb" stroke="#0b3526" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M18.5 28.5 21.5 19" stroke="#14523b" stroke-width="1.6" stroke-linecap="round"/>
</svg>`;
}

function brand() {
  return `<a class="brand" href="/" aria-label="${esc(cfg.business.name)} — home">
  ${brandMark()}
  <span class="brand-text">
    <span class="brand-top">Hard Knox</span>
    <span class="brand-rule" aria-hidden="true"></span>
    <span class="brand-bottom">Auto Glass</span>
  </span>
</a>`;
}

// Decorative gold ribbon sweep (echoes the van wrap) for dark panels. Unique gradient id per instance.
function ribbonArt(id) {
  return `<svg class="ribbon-art" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true" focusable="false">
<defs><linearGradient id="rb-${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6a10"/><stop offset="0.35" stop-color="#e8d27a"/><stop offset="0.62" stop-color="#c9a227"/><stop offset="1" stop-color="#8a6a10"/></linearGradient></defs>
<path d="M0 158 C 340 118 720 58 1440 26 L 1440 60 C 720 92 340 152 0 192 Z" fill="url(#rb-${id})"/>
<path d="M0 206 C 360 170 780 112 1440 82 L 1440 92 C 780 122 360 180 0 216 Z" fill="#e8d27a" opacity="0.55"/>
</svg>`;
}

function header(current) {
  const items = cfg.nav.map((n) => {
    const isCurrent = n.url === current;
    return `<li><a href="${n.url}"${isCurrent ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`;
  }).join('\n      ');
  return `<header class="site-header">
  <div class="wrap header-inner">
    ${brand()}
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>
      ${icon('menu', 'icon icon-menu')}${icon('close', 'icon icon-close')}<span>Menu</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Primary">
      <ul>
      ${items}
      </ul>
    </nav>
    ${telLink('btn btn-gold header-call', icon('phone') + `<span>Call ${PHONE_NB}</span>`)}
  </div>
  <div class="ribbon-rule" aria-hidden="true"></div>
</header>`;
}

function breadcrumbs(trail) {
  if (!trail || !trail.length) return '';
  const items = trail.map((t, i) => {
    const last = i === trail.length - 1;
    return last
      ? `<li aria-current="page">${esc(t.label)}</li>`
      : `<li><a href="${t.url}">${esc(t.label)}</a></li>`;
  }).join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><div class="wrap"><ol>${items}</ol></div></nav>`;
}

function bottomBar() {
  return `<aside class="bottom-bar" id="bottom-bar" aria-label="Quick contact">
  <div class="wrap">
    ${securityNotice('notice notice--bar')}
    <div class="bottom-bar-actions">
      ${telLink('btn btn-gold', icon('phone') + 'Call')}
      ${smsLink('btn btn-cream', icon('sms') + 'Text')}
    </div>
  </div>
</aside>`;
}

function footer() {
  const b = cfg.business;
  const services = cfg.services.map((s) => `<li><a href="${s.url}">${esc(s.name)}</a></li>`).join('');
  const policies = cfg.policies.map((p) => `<li><a href="${p.url}">${esc(p.label)}</a></li>`).join('');
  const nav = cfg.nav.map((n) => `<li><a href="${n.url}">${esc(n.label)}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <section class="footer-col footer-guarantee" aria-labelledby="footer-guarantee-h">
      <h2 id="footer-guarantee-h">Guarantee summary</h2>
      <p>${esc(cfg.strings.guaranteePreview)}</p>
      <p><a class="link-strong" href="/warranty/">Read Full Guarantee</a></p>
    </section>
    <section class="footer-col" aria-labelledby="footer-services-h">
      <h2 id="footer-services-h">Services</h2>
      <ul class="footer-list">${services}</ul>
    </section>
    <section class="footer-col" aria-labelledby="footer-contact-h">
      <h2 id="footer-contact-h">Call or text for a free quote</h2>
      <p class="footer-phone">${telLink('link-strong', PHONE_NB)}</p>
      <p class="footer-actions">${telLink('btn btn-gold btn-small', 'Call')} ${smsLink('btn btn-cream btn-small', 'Text')}</p>
      <p>Email: <span class="email">${esc(b.email)}</span></p>
      <p>Hours: ${esc(b.hoursDisplay)}. A particular appointment is subject to availability.</p>
      <p>Mobile service only across ${esc(b.county)}, ${esc(b.state)}, including Chattanooga. No shop or walk-in location. ${esc(cfg.strings.servingLine)}</p>
      ${securityNotice('notice notice--footer')}
    </section>
    <section class="footer-col" aria-labelledby="footer-pages-h">
      <h2 id="footer-pages-h">Pages</h2>
      <ul class="footer-list">${nav}</ul>
      <h2 class="footer-h-policies">Policies</h2>
      <ul class="footer-list">${policies}</ul>
    </section>
  </div>
  <div class="wrap footer-base">
    <p>© ${esc(cfg.copyrightYear)} ${esc(b.name)}. Veteran Owned &amp; Operated.</p>
  </div>
</footer>`;
}

function jsonLd(data) {
  if (!data) return '';
  const list = Array.isArray(data) ? data : [data];
  return list.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`).join('\n');
}

function page(p, assets) {
  const canonical = cfg.origin + p.url;
  const robots = p.noindex ? '<meta name="robots" content="noindex">' : '';
  const preload = assets.font800 ? `<link rel="preload" href="${assets.font800}" as="font" type="font/woff2" crossorigin>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${p.noindex ? robots : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#14523B">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
${preload}
<link rel="stylesheet" href="${assets.css}">
<script>${INLINE_BOOT}</script>
<script src="${assets.js}" defer></script>
${jsonLd(p.jsonld)}
</head>
<body class="${p.bodyClass || ''}">
<a class="skip-link" href="#main">Skip to main content</a>
${icons.sprite}
${header(p.navCurrent || p.url)}
${breadcrumbs(p.breadcrumbs)}
<main id="main" tabindex="-1">
${p.body}
</main>
${bottomBar()}
${footer()}
</body>
</html>
`;
}

module.exports = { page, esc, icon, telLink, smsLink, ctaGroup, securityNotice, ribbonArt, INLINE_BOOT, PHONE_NB };
