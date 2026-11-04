'use strict';
/* Facts and prohibited-claims lint over the rendered site.
   Fails on: prices or price language, credential claims not cleared, urgency/availability promises,
   wrong market names, placeholders, inline styles/handlers (CSP), off-origin resources, and missing required strings. */
const fs = require('fs');
const path = require('path');
const cfg = require('./site-config');

const SITE = path.join(__dirname, '..', 'site');
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (p.endsWith('.html')) files.push(p); } })(SITE);

const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

const forbidden = [
  [/\$\s?\d/, 'dollar amount'],
  [/\b\d+\s?%\s?(off|discount)/i, 'percentage discount'],
  [/\b(starting at|as low as|from only|price match|price-match|financing|discount|coupon|special offer|promo)\b/i, 'price/promo language'],
  [/\b(free (installation|replacement|repair|travel|glass))\b/i, '"free work" claim'],
  [/\b(licensed|insured)\b|\bbonded(?=,? (and |& )?(licensed|insured))/i, 'credential claim not cleared'],
  [/\b(certified|ASE|AGSC|I-CAR|accredited|award)\b/, 'certification/award claim'],
  [/\b(same[- ]day|next[- ]day|24\/7|within (an|one|24) hour|rapid response|immediate|instant)\b/i, 'urgency/availability promise'],
  [/\bemergency\b(?! braking)/i, 'emergency service claim'],
  [/\b(lifetime|life-time)\b/i, '"lifetime" wording (duration is ownership, not lifetime)'],
  [/\bcoming soon\b/i, '"coming soon"'],
  [/\b(Knoxville|Georgia|GA\b|Dalton|Ringgold|Fort Oglethorpe|Cleveland, TN|Bradley County)\b/, 'market not confirmed'],
  [/\b(OE[- ]equivalent|OEM[- ]equivalent|dealer quality)\b/i, 'OE-equivalent claim'],
  [/\b(we (file|handle|process) (your )?(insurance )?claims?|waive[sd]? (your )?deductible|deductible (waived|covered|paid)|no deductible|insurance (pays|covers|approved))\b/i, 'insurance claim'],
  [/\b(safe to drive (now|immediately|right away|in)|drive immediately|drive right away|ready to drive in \d)\b/i, 'driving-safety assurance'],
  [/(?<!not a )\b30[- ]day warranty\b|\bwithin 30 days or (coverage|the warranty)/i, '30-day warranty wording'],
  [/\b(lorem|ipsum|TODO|TBD|placeholder|XXX|lorem)\b/, 'placeholder text'],
  [/\[(ADDRESS|DATE|NAME|TBD|INSERT)[^\]]*\]/i, 'template placeholder'],
  [/\b(review[s]? from|five[- ]star|5-star|rated \d|testimonial)\b/i, 'review/rating claim'],
  [/\b(established|since (19|20)\d\d|founded in|years in business|family[- ]owned)\b/i, 'company-age claim'],
  [/\b(5:00 PM|5 PM|7:00 AM|8:00 AM|Sunday[^.]*open)\b/, 'wrong hours'],
  [/\b(walk-ins welcome|visit our shop|our location at|stop by)\b/i, 'storefront wording'],
  [/\bpower window|sunroof|mirror repair|leak repair|fleet\b/i, 'service not in scope'],
];
const required = [
  [cfg.business.phoneDisplay, 'phone number'],
  [cfg.strings.securityNotice, 'security notice'],
  [`tel:${cfg.business.phoneE164}`, 'tel link'],
  [`sms:${cfg.business.phoneE164}`, 'sms link'],
  ['Read Full Guarantee', 'guarantee link'],
  ['6:00 PM', 'hours end at 6:00 PM'],
];
const markup = [
  [/\sstyle="/, 'inline style attribute (CSP)'],
  [/<style[\s>]/, 'inline <style> element (CSP)'],
  [/\son[a-z]+="/i, 'inline event handler (CSP)'],
  [/(src|href)="https?:\/\/(?!www\.w3\.org\/TR\/WCAG22\/"|hardknoxautoglass\.com\/)/, 'off-origin resource or link (only the canonical host and the WCAG reference link are allowed)'],
  [/(src|href)="http:\/\//, 'insecure http URL'],
  [/loading="lazy"[^>]*hero|hero[^>]*loading="lazy"/, 'lazy-loaded hero'],
];

let fails = 0;
for (const f of files) {
  const rel = '/' + path.relative(SITE, f).replace(/index\.html$/, '');
  const html = fs.readFileSync(f, 'utf8');
  const text = strip(html);
  for (const [re, why] of forbidden) {
    const m = text.match(re);
    if (m) { fails++; console.log(`FAIL ${rel}: ${why}: "…${text.slice(Math.max(0, m.index - 40), m.index + 60)}…"`); }
  }
  for (const [re, why] of markup) {
    const m = html.match(re);
    if (m) { fails++; console.log(`FAIL ${rel}: ${why}: ${m[0].slice(0, 80)}`); }
  }
  for (const [s, why] of required) {
    if (!html.includes(s) && !text.includes(s)) { fails++; console.log(`FAIL ${rel}: missing ${why}`); }
  }
}
// mailto appears only on the Contact page
for (const f of files) {
  const rel = '/' + path.relative(SITE, f).replace(/index\.html$/, '');
  const n = (fs.readFileSync(f, 'utf8').match(/href="mailto:/g) || []).length;
  if (n && rel !== '/service-area-contact/') { fails++; console.log(`FAIL ${rel}: mailto link outside Contact`); }
  if (rel === '/service-area-contact/' && n !== 1) { fails++; console.log(`FAIL ${rel}: expected exactly one mailto, found ${n}`); }
}
// Required file set / forbidden files in site/
const all = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else all.push(path.relative(SITE, p)); } })(SITE);
const allowedExt = /\.(html|css|js|woff2|svg|png|txt|xml)$/;
for (const rel of all) {
  if (rel === '.htaccess') continue;
  if (!allowedExt.test(rel) || /README|\.map$|\.zip$|\.md$|\.log$|\.json$/i.test(rel)) { fails++; console.log(`FAIL file not in allow-list: ${rel}`); }
}
for (const must of ['index.html', '404.html', 'robots.txt', 'sitemap.xml', '.htaccess']) if (!all.includes(must)) { fails++; console.log(`FAIL missing ${must}`); }

console.log(`\ncheck-facts: ${files.length} pages, ${all.length} files, ${fails} failures.`);
process.exit(fails ? 1 : 0);
