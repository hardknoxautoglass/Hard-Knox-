'use strict';
const cfg = require('../site-config');
const { esc, icon, telLink, smsLink, securityNotice, PHONE_NB } = require('../layout');

const b = cfg.business;
const BUSINESS_ID = `${cfg.origin}/#business`;

function areaServed() {
  return [
    { '@type': 'AdministrativeArea', name: `${b.county}, ${b.state}` },
    ...b.cities.map((c) => ({ '@type': 'City', name: `${c}, ${b.stateAbbr}` })),
    ...b.communities.map((c) => ({ '@type': 'Place', name: `${c}, ${b.stateAbbr}` })),
  ];
}

// One business entity, stable identifier on the production host. No address, map, rating or price.
function businessNode(extra = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': BUSINESS_ID,
    name: b.name,
    url: `${cfg.origin}/`,
    telephone: b.phoneE164,
    email: b.email,
    description: `Veteran-owned mobile auto glass service for ${b.county}, ${b.state}, including Chattanooga: windshield replacement, windshield chip repair, door, quarter and back glass replacement, and ADAS calibration. Mobile only; no shop or walk-in location.`,
    areaServed: areaServed(),
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: b.hoursSpec.days,
      opens: b.hoursSpec.opens,
      closes: b.hoursSpec.closes,
    }],
    paymentAccepted: 'Cash, Card',
    ...extra,
  };
}

function serviceNode({ url, name, serviceType, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${cfg.origin}${url}#service`,
    name,
    serviceType,
    description,
    url: `${cfg.origin}${url}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'AdministrativeArea', name: `${b.county}, ${b.state}` },
  };
}

function breadcrumbList(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t.label, item: `${cfg.origin}${t.url}`,
    })),
  };
}

const trailHome = { label: 'Home', url: '/' };
const trailServices = { label: 'Services', url: '/services/' };

// Original hero illustration (no people, plates or places).
function heroArt() {
  return `<div class="hero-art"><svg viewBox="0 0 480 320" role="img" aria-labelledby="hero-art-title" width="480" height="320">
<title id="hero-art-title">Illustration: a windshield with a camera module behind the mirror area and a small stone chip, above a gold stripe.</title>
<defs>
<linearGradient id="hk-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2ece6"/></linearGradient>
<linearGradient id="hk-gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8841a"/><stop offset="0.45" stop-color="#e8d27a"/><stop offset="1" stop-color="#c9a227"/></linearGradient>
<clipPath id="hk-hood"><path d="M24 320 C 24 250 120 216 240 216 C 360 216 456 250 456 320 Z"/></clipPath>
</defs>
<path d="M24 320 C 24 250 120 216 240 216 C 360 216 456 250 456 320 Z" fill="#1b6a4c" stroke="#e8d27a" stroke-width="2"/>
<g clip-path="url(#hk-hood)">
<path d="M0 270 C 140 244 320 240 480 214 L 480 234 C 320 260 140 264 0 290 Z" fill="url(#hk-gold)"/>
<path d="M0 298 C 140 274 320 270 480 244 L 480 250 C 320 276 140 280 0 304 Z" fill="#e8d27a"/>
</g>
<path d="M110 52 Q 240 32 370 52 L 390 66 L 90 66 Z" fill="#072a1e" stroke="#c9a227" stroke-width="2" stroke-linejoin="round"/>
<path d="M90 66 L 60 214 Q 240 192 420 214 L 390 66 Z" fill="#072a1e" stroke="#c9a227" stroke-width="2" stroke-linejoin="round"/>
<path d="M104 78 L 82 200 Q 240 184 398 200 L 376 78 Z" fill="url(#hk-glass)" stroke="#e8d27a" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M150 92 L 128 186" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
<path d="M172 92 L 158 150" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
<rect x="212" y="86" width="56" height="26" rx="6" fill="#0b3526"/>
<circle cx="240" cy="99" r="6" fill="#e8d27a"/>
<circle cx="240" cy="99" r="2.5" fill="#0b3526"/>
<g stroke="#9a5b08" stroke-width="2.5" stroke-linecap="round" fill="none"><path d="M318 160 l 11 -9 M318 160 l 13 4 M318 160 l -6 11 M318 160 l -10 -4"/></g>
<circle cx="318" cy="160" r="3.5" fill="#c9a227"/>
<path d="M136 202 L 236 184" stroke="#0b3526" stroke-width="5" stroke-linecap="round"/>
<path d="M262 202 L 362 184" stroke="#0b3526" stroke-width="5" stroke-linecap="round"/>
</svg></div>`;
}

// What to have ready for a quote (never VIN, plate, exact address, policy or payment details).
function quoteChecklist() {
  return `<ul class="checklist">
<li>${icon('check')}<span>Year, make and model of the vehicle</span></li>
<li>${icon('check')}<span>Which glass is damaged: windshield, a door window, a quarter window or the back glass</span></li>
<li>${icon('check')}<span>What happened and what you see (a photo of a chip or crack helps, though it is not a diagnosis)</span></li>
<li>${icon('check')}<span>Whether the windshield has a camera or sensor housing behind the mirror</span></li>
<li>${icon('check')}<span>The general area where the vehicle will be, such as the town or neighborhood, and whether it is a driveway, a workplace lot or another spot</span></li>
<li>${icon('check')}<span>Days and times that suit you</span></li>
</ul>
<p>Please do not send a full VIN, a license plate, your exact home address, insurance documents or any payment details in a first text. We confirm the exact address by phone when the work is scheduled.</p>`;
}

function quoteAside({ heading = 'Get a free quote', extra = '' } = {}) {
  return `<aside class="aside" aria-labelledby="aside-h">
<h2 id="aside-h">${esc(heading)}</h2>
<p>${esc(cfg.strings.quoteLine)} Free, no obligation.</p>
${telLink('btn btn-gold', icon('phone') + 'Call ' + PHONE_NB)}
${smsLink('btn btn-outline', icon('sms') + 'Text ' + PHONE_NB)}
${securityNotice()}
<p><strong>Hours:</strong> ${esc(b.hoursDisplay)}.</p>
<p><strong>Mobile only.</strong> ${esc(cfg.strings.servingLine)} <a href="/service-area-contact/">Service area and contact details</a>.</p>
${extra}
</aside>`;
}

function adasQualifier() {
  return `<p><strong>ADAS calibration:</strong> whether calibration can be done at your location depends on your vehicle, the procedure it requires and the site. We confirm the arrangements for your vehicle before anything is scheduled. <a href="/adas-recalibration/">How ADAS calibration works</a>.</p>`;
}

module.exports = { businessNode, serviceNode, breadcrumbList, trailHome, trailServices, heroArt, quoteChecklist, quoteAside, adasQualifier, BUSINESS_ID };
