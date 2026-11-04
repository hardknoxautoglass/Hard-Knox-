'use strict';
const cfg = require('../site-config');
const { esc, icon } = require('../layout');
const S = require('./_shared');

const url = '/about/';
const trail = [S.trailHome, { label: 'About Us', url }];
const b = cfg.business;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">About</p>
<h1>About Hard Knox Auto Glass</h1>
<p class="lede">Hard Knox Auto Glass is a veteran-owned mobile auto glass service run by its owner, who was born and raised in ${esc(b.county)}, ${esc(b.state)}. There is no shop: the work comes to your home, workplace or another suitable location across the county, including Chattanooga.</p>
</div></section>

<section class="section"><div class="wrap page-grid">
<div class="prose">
<h2 id="owner">One owner, one technician</h2>
<p>The owner has spent more than 15 years in the automotive industry, including six years as a mechanic in the Army National Guard, and more than 10 of those years working on auto glass. When you call or text Hard Knox Auto Glass, you reach the owner, and the owner is the person who shows up and does the work.</p>
<p>That matters for a mobile service. The person quoting the job is the one who will decide, standing at your vehicle, whether a chip can be repaired or needs replacing, whether the parking spot will work, and whether your vehicle's camera needs calibrating after a new windshield. Nothing is handed off to a dispatcher or a different crew.</p>

<ul class="features">
<li>${icon('star')}<div><h3>Veteran Owned &amp; Operated</h3><p>Six years as an Army National Guard mechanic, then more than a decade working on auto glass.</p></div></li>
<li>${icon('wrench')}<div><h3>10+ years in auto glass</h3><p>Windshields, chip repairs, door, quarter and back glass, across the makes and models that drive Hamilton County's roads.</p></div></li>
<li>${icon('road')}<div><h3>Hamilton County, born and raised</h3><p>Local knowledge of where the work can be done, from Sale Creek to Apison, and a reputation that depends on neighbors.</p></div></li>
<li>${icon('van')}<div><h3>Mobile only</h3><p>No waiting room because there is no shop. Your vehicle stays where it is parked.</p></div></li>
</ul>

<h2 id="what-we-do">What Hard Knox does</h2>
<p><strong>Mobile windshield replacement.</strong> The old glass is cut out, the opening is cleaned and prepared, and the new windshield is bonded in with automotive urethane adhesive. Aftermarket glass is available; OEM glass may be available on request. <a href="/windshield-replacement/">How a replacement works</a>.</p>
<p><strong>Windshield chip repair.</strong> Eligible chips are filled with resin to stop them spreading. Every chip is assessed in person, and if a repaired chip spreads the amount paid for the repair is credited toward a full replacement. <a href="/rock-chip-repair/">How chip repair works</a>.</p>
<p><strong>Door, quarter and back glass.</strong> The other windows on the vehicle, replaced on site with the broken glass cleaned out. <a href="/door-quarter-back-glass/">Side and rear glass</a>.</p>
<p><strong>ADAS calibration.</strong> ${esc(cfg.strings.adasInterim)} The arrangements depend on the vehicle and the procedure its manufacturer requires. <a href="/adas-recalibration/">ADAS calibration explained</a>.</p>

<h2 id="how-we-work">How we work</h2>
<ul>
<li><strong>Free, no-obligation quotes</strong> by call or text, with the vehicle, scope, location, price and availability confirmed before anything is scheduled.</li>
<li><strong>Card or cash, due when the work is complete.</strong> No cancellation fee. Weather or unsuitable site conditions can require rescheduling.</li>
<li><strong>A written limited guarantee</strong> on installation workmanship and the glass Hard Knox supplies, published in full on this site. <a href="/warranty/">Read the guarantee</a>.</li>
<li><strong>Straight answers.</strong> If a chip cannot be repaired, if a pinchweld has rust under the old glass, or if a calibration cannot be done where the vehicle is parked, you will hear it before the work starts, not after.</li>
</ul>
</div>
${S.quoteAside({ heading: 'Talk to the owner' })}
</div></section>
`;

module.exports = {
  url,
  title: 'About Us | Hard Knox Auto Glass',
  description: 'Hard Knox Auto Glass is a veteran-owned mobile auto glass service in Hamilton County, TN, run by one owner-technician with 10+ years in auto glass. We come to you.',
  breadcrumbs: trail,
  body,
  jsonld: [S.breadcrumbList(trail)],
};
