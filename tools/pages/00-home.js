'use strict';
const cfg = require('../site-config');
const { esc, icon, telLink, smsLink, ctaGroup, securityNotice, PHONE_NB } = require('../layout');
const S = require('./_shared');

const b = cfg.business;

const serviceCards = cfg.services.map((s) => `<li><article class="card">
  ${icon(s.icon)}
  <h3><a href="${s.url}">${esc(s.name)}</a></h3>
  <p>${esc(s.blurb)}</p>
  <a class="card-link" href="${s.url}">About ${esc(s.name.toLowerCase())}</a>
</article></li>`).join('\n');

const faqs = [
  ['faq-services', 'What services does Hard Knox Auto Glass offer?',
    `<p>Six things: windshield replacement, windshield rock chip repair, door glass replacement, quarter glass replacement, back glass replacement, and ADAS calibration for vehicles that need it after a windshield is replaced. All glass work is done at your location. <a href="/services/">Compare the services</a>.</p>`],
  ['faq-shop', 'Is this a shop I can drive to? How do I get a quote?',
    `<p>No. Hard Knox Auto Glass is mobile only. There is no shop, storefront, waiting room or walk-in address; Brandon comes to your home, workplace or another suitable location in Hamilton County, Tennessee.</p>
<p>To get a free, no-obligation quote, call or text ${telLink('', PHONE_NB)} with your vehicle's year, make and model, which glass is damaged and the general area where the vehicle will be. ${esc(cfg.strings.securityNotice)}</p>`],
  ['faq-where', 'Where can the work be done?',
    `<p>Most glass work needs a reasonably level, safe spot with room to open the doors and the hood, out of heavy rain or strong wind: a driveway, a workplace parking space you are allowed to use, or a similar location. Brandon confirms that the spot will work when he quotes the job. Weather or unsuitable site conditions can require rescheduling. ADAS calibration has its own site and vehicle requirements, explained on the <a href="/adas-recalibration/">ADAS calibration page</a>.</p>`],
  ['faq-info', 'What should I send for a quote?',
    `<p>Year, make and model; which glass is damaged; what you see (a photo of a chip or crack helps but is not a diagnosis); whether there is a camera or sensor housing behind the mirror; the general area where the vehicle will be; and days that suit you. Please leave out your full VIN, plate, exact home address, insurance documents and payment details. <a href="/services/#quote">What to have ready</a>.</p>`],
  ['faq-pay', 'How do I pay, and is there a cancellation fee?',
    `<p>Card or cash, due when the work is complete. There is no cancellation fee. Quotes are free and carry no obligation. <a href="/cancellation-refund-policy/">Cancellation, rescheduling and refund policy</a>.</p>`],
  ['faq-hours', 'What are your hours?',
    `<p>${esc(b.hoursDisplay)}. Those are the hours for calls and texts; a particular appointment is subject to availability.</p>`],
  ['faq-travel', 'I\'m just outside Hamilton County. Is travel included?',
    `<p>Call or text first to confirm that Brandon can come to you. Within Hamilton County, mobile service is part of the quoted price. Outside the county, ${esc(cfg.strings.travelLine).toLowerCase()} A free quote means the quote itself costs nothing; it does not set the final cost until the vehicle, the work, the location and any travel charge have been confirmed. <a href="/service-area-contact/">Service area details</a>.</p>`],
  ['faq-rock', 'Is a new rock strike covered by the guarantee for as long as I own the car?',
    `<p>No. The limited guarantee covers defects in Hard Knox's installation workmanship and in glass Hard Knox supplies and installs, for as long as the original customer owns the vehicle. New damage from road debris, rocks, accidents, vandalism, misuse or other outside events is not a defect and is not covered. <a href="/warranty/#not-covered">What the guarantee does not cover</a>.</p>`],
  ['faq-chip-spread', 'My repaired chip spread. Do I get a cash refund?',
    `<p>No cash refund; you get a credit. If a chip Hard Knox repaired spreads, fails an applicable state inspection, or you are simply not satisfied with the repair, the amount you paid for that repair is applied toward a full windshield replacement by Hard Knox. The benefit belongs to the original customer. A cash refund is a different remedy that applies only when a covered <em>replacement</em> problem cannot be corrected. <a href="/warranty/#chip-repair-credit">Chip repair credit terms</a>.</p>`],
  ['faq-adas-driveway', 'Can you come to my driveway for ADAS calibration?',
    `<p>Sometimes. Hard Knox Auto Glass offers ADAS calibration, but whether it can be done in a driveway depends on your vehicle, the procedure its manufacturer requires (static, dynamic or both) and the site. Some procedures need a level, well-lit space with room for targets; some are completed by driving the vehicle on suitable roads; some need a different location. Call or text with your year, make, model and general location, and Brandon will confirm the arrangements for your vehicle before anything is scheduled. <a href="/adas-recalibration/">ADAS calibration explained</a>.</p>`],
  ['faq-30-days', 'Can I call after 30 days about a defect?',
    `<p>Yes. Hard Knox asks you to call as soon as you notice a problem, preferably within 30 days of noticing it, with your invoice or other proof of service handy, because early reporting makes the cause easier to find and fix. Reporting later does not by itself cancel coverage. Covered defects are covered for as long as the original customer owns the vehicle. If you cannot make a voice call, text or email instead. <a href="/warranty/#how-to-report">How to report a problem</a>.</p>`],
  ['faq-insurance', 'Do you work with my insurance company?',
    `<p>You are welcome to use a Hard Knox quote or invoice with your insurer, but Hard Knox does not file claims, cannot tell you what your policy covers or what your deductible is, and does not make promises about what an insurer will pay or reimburse. Our price is due at completion; any claim or reimbursement is between you and your insurer.</p>`],
];

const faqHtml = faqs.map(([id, q, a]) => `<details id="${id}"><summary>${esc(q)}</summary><div class="faq-body">${a}</div></details>`).join('\n');

const areaChips = [...b.cities, ...b.communities].map((c) => `<li>${esc(c)}</li>`).join('');

const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="ribbon">${icon('star')}Veteran Owned &amp; Operated${icon('star')}</p>
      <h1>Mobile Auto Glass Repair, Replacement &amp; ADAS Calibration</h1>
      <p class="lede">Hard Knox Auto Glass comes to you across ${esc(b.county)}, ${esc(b.state)}, including Chattanooga. Brandon Layne replaces windshields, repairs rock chips and replaces door, quarter and back glass where your vehicle is parked, and offers ADAS calibration for vehicles that need it.</p>
      <p><strong>We come to you.</strong> Mobile glass work can be done at:</p>
      <ul class="hero-where">
        <li>${icon('house')}<span><strong>Your home</strong> — a level driveway or parking spot with room to work</span></li>
        <li>${icon('building')}<span><strong>Your workplace</strong> — a parking space you are allowed to use while the work is done</span></li>
        <li>${icon('road')}<span><strong>Another approved location</strong> — somewhere safe, level and out of heavy rain or strong wind</span></li>
      </ul>
      ${S.adasQualifier()}
      ${ctaGroup()}
      <p class="serving">${esc(cfg.strings.servingLine)}</p>
    </div>
    ${S.heroArt()}
  </div>
</section>

<section class="section section--night" aria-labelledby="cred-h">
  <div class="wrap">
    <h2 id="cred-h" class="visually-hidden">Who you are dealing with</h2>
    <ul class="cred-list">
      <li>${icon('star')}<div><strong>Veteran Owned &amp; Operated</strong><span>Owner Brandon Layne served six years as an Army National Guard mechanic.</span></div></li>
      <li>${icon('wrench')}<div><strong>10+ years in auto glass</strong><span>Brandon has more than 10 years in auto glass and more than 15 years in the automotive industry.</span></div></li>
      <li>${icon('van')}<div><strong>Mobile service only</strong><span>No shop to drive to. The work is done where your vehicle is parked.</span></div></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="services-h">
  <div class="wrap">
    <p class="eyebrow">Services</p>
    <h2 id="services-h" class="section-title">Six things we do, all at your location</h2>
    <ul class="cards">
${serviceCards}
    </ul>
    <p><a class="link-strong" href="/services/">Compare all services and see what to have ready for a quote</a></p>
  </div>
</section>

<section class="section section--deep" aria-labelledby="how-h">
  <div class="wrap">
    <p class="eyebrow">How it works</p>
    <h2 id="how-h" class="section-title">Three steps from damaged glass to done</h2>
    <ol class="steps">
      <li><div><h3>Call or text for a free quote</h3><p>Tell us the year, make and model, which glass is damaged, and the general area where the vehicle will be. A photo of a chip helps, though it is not a diagnosis. Quotes are free with no obligation.</p></div></li>
      <li><div><h3>We confirm the details</h3><p>Brandon confirms the vehicle, the scope of work, the location, the price and availability before anything is scheduled. Outside Hamilton County, ${esc(cfg.strings.travelLine).toLowerCase()}</p></div></li>
      <li><div><h3>The work is done at a suitable site</h3><p>Brandon comes to your home, workplace or another approved location. Card or cash is due when the work is complete. For ADAS calibration, the arrangements confirmed in step 2 apply: some vehicles and procedures need a different site.</p></div></li>
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="why-h">
  <div class="wrap">
    <p class="eyebrow">Why Hard Knox</p>
    <h2 id="why-h" class="section-title">One local technician, start to finish</h2>
    <ul class="features">
      <li>${icon('road')}<div><h3>Local roots</h3><p>Brandon was born and raised in Hamilton County and works here, not out of a call center.</p></div></li>
      <li>${icon('wrench')}<div><h3>Experience you can ask about</h3><p>More than 10 years in auto glass and more than 15 years in the automotive industry, including six years as an Army National Guard mechanic.</p></div></li>
      <li>${icon('phone')}<div><h3>Direct contact</h3><p>Call or text and you reach Brandon, the person who does the work, not a dispatcher. Quotes are free with no obligation.</p></div></li>
      <li>${icon('shield')}<div><h3>A written limited guarantee</h3><p>Installation workmanship and glass we supply are guaranteed against defects for as long as you own the vehicle, with the terms published in full. <a href="/warranty/">Read the guarantee</a>.</p></div></li>
    </ul>
  </div>
</section>

<section class="section section--deep" aria-labelledby="guar-h">
  <div class="wrap">
    <div class="guarantee-box">
      <h2 id="guar-h">${icon('shield')}Our limited guarantee</h2>
      <p>${esc(cfg.strings.guaranteePreview)}</p>
      <ul>
        <li><strong>Chip repairs</strong> are different: a repair does not restore the glass to original condition or guarantee the chip will not spread. If it spreads, the amount you paid for the repair is credited toward a full windshield replacement. It is a credit, not a cash refund.</li>
        <li><strong>ADAS calibration</strong> is covered by separate terms confirmed with your quote, not by this glass guarantee.</li>
        <li><strong>New damage</strong> from rocks, road debris, accidents or other outside events is not a defect and is not covered.</li>
      </ul>
      <p><a class="btn btn-outline" href="/warranty/">Read Full Guarantee</a></p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="area-h">
  <div class="wrap area-grid">
    <div>
      <p class="eyebrow">Service area</p>
      <h2 id="area-h" class="section-title">Hamilton County, Tennessee</h2>
      <p>Mobile auto glass service across ${esc(b.county)}, including these cities and communities:</p>
      <ul class="area-list">${areaChips}</ul>
      <p>Live in a community directly adjacent to Hamilton County? Call or text to confirm availability. ${esc(cfg.strings.travelLine)}</p>
      <p><a class="link-strong" href="/service-area-contact/">Service area, hours and contact details</a></p>
    </div>
    <div>
      <p class="eyebrow">About</p>
      <h2 class="section-title">Meet Brandon Layne</h2>
      <p>Brandon was born and raised in Hamilton County. He has spent more than 15 years in the automotive industry, including six years as an Army National Guard mechanic, and more than 10 years working on auto glass. Hard Knox Auto Glass is his veteran-owned mobile service.</p>
      <p><a class="link-strong" href="/about/">Brandon's story</a></p>
    </div>
  </div>
</section>

<section class="section section--deep" aria-labelledby="faq-h">
  <div class="wrap">
    <p class="eyebrow">Questions</p>
    <h2 id="faq-h" class="section-title">Straight answers before you call</h2>
    <div class="faq">
${faqHtml}
    </div>
  </div>
</section>

<section class="section section--forest contact-panel" aria-labelledby="contact-h">
  <div class="wrap">
    <p class="eyebrow">Free quote</p>
    <h2 id="contact-h">Ready when you are</h2>
    <p class="big-number">${telLink('', PHONE_NB)}</p>
    <div class="cta-buttons">
      ${telLink('btn btn-gold', icon('phone') + 'Call for a Free Quote')}
      ${smsLink('btn btn-cream', icon('sms') + 'Text for a Free Quote')}
    </div>
    <p class="copy-wrap"><button class="btn btn-outline btn-small copy-btn" type="button" data-copy="${esc(b.phoneDisplay)}">${icon('copy')}Copy number</button><span class="copy-status" role="status" aria-live="polite"></span></p>
    ${securityNotice()}
    <dl>
      <dt>Hours</dt><dd>${esc(b.hoursDisplay)}. A particular appointment is subject to availability.</dd>
      <dt>Service area</dt><dd>${esc(b.county)}, ${esc(b.state)}, including Chattanooga. Adjacent communities by confirmation; ${esc(cfg.strings.travelLine).toLowerCase()}</dd>
      <dt>Email</dt><dd><span class="email">${esc(b.email)}</span> (calls and texts get the quickest reply)</dd>
    </dl>
  </div>
</section>
`;

module.exports = {
  url: '/',
  title: 'Mobile Auto Glass in Hamilton County, TN | Hard Knox Auto Glass',
  description: 'Veteran-owned mobile auto glass for Chattanooga and Hamilton County, TN: windshields, chip repair, door, quarter and back glass, ADAS calibration. Free quotes.',
  bodyClass: 'page-home',
  body,
  jsonld: S.businessNode(),
};
