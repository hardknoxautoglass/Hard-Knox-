'use strict';
const cfg = require('../site-config');
const { esc } = require('../layout');
const S = require('./_shared');

const url = '/windshield-replacement/';
const trail = [S.trailHome, S.trailServices, { label: 'Windshield Replacement', url }];
const b = cfg.business;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Windshield replacement</p>
<h1>Mobile Windshield Replacement in Hamilton County, TN</h1>
<p class="lede">Hard Knox Auto Glass replaces windshields at your home, workplace or another suitable location anywhere in ${esc(b.county)}, ${esc(b.state)}, including Chattanooga. The owner does the work personally. ${esc(cfg.strings.quoteLine)}</p>
</div></section>

<section class="section"><div class="wrap page-grid">
<div class="prose">
<h2 id="when">When a windshield needs replacing rather than repairing</h2>
<p>Replacement is usually the answer when the damage is a long crack, when a chip sits in the driver's main line of sight, when the damage reaches the edge of the glass, when there are several chips, or when an in-person look shows a chip is too deep or has already started to spread. Smaller, fresher chips can often be <a href="/rock-chip-repair/">repaired instead</a>, which keeps the factory glass and its original seal. The call is made in person; a photo sent with your text helps us give you a realistic first answer.</p>

<h2 id="what-happens">What happens at a mobile replacement</h2>
<ol>
<li><strong>Protecting the vehicle.</strong> Wipers, cowl trim and mouldings come off; the dash, hood and paint are covered.</li>
<li><strong>Cutting out the old glass.</strong> The old windshield is cut free of its urethane bed and lifted out, and the pinchweld (the metal lip the glass sits on) is cleaned and prepared. If rust, corrosion or frame damage is found under the old glass, we will show you before going further, because those conditions affect how well new glass can seal (see the <a href="/warranty/#not-covered">guarantee exclusions</a>).</li>
<li><strong>Setting the new glass.</strong> Primer and fresh automotive urethane adhesive are applied and the new windshield is set and aligned. Mouldings, clips, the mirror, rain sensor and camera bracket are refitted as the vehicle requires.</li>
<li><strong>Cure time and drive-away.</strong> The adhesive needs time to reach the strength required to hold the windshield in a crash. See the safety note below.</li>
<li><strong>Calibration, if your vehicle needs it.</strong> Vehicles with a camera behind the windshield may require ADAS calibration after the glass is replaced. See the next section.</li>
</ol>

<h2 id="glass">Glass options</h2>
<p><strong>Aftermarket glass is available</strong> and is what most replacements use. <strong>OEM glass</strong> (glass made for the vehicle manufacturer and carrying its branding) <strong>may be available on request</strong>; say so when you ask for a quote and we will confirm availability and price for your vehicle. Either way the installation is the same, and both are covered by the same <a href="/warranty/">limited guarantee</a> against defects in the glass Hard Knox supplies and in the installation workmanship.</p>

<h2 id="adas">Will my windshield need ADAS calibration?</h2>
<p>If your vehicle has a camera mounted behind the windshield near the mirror, used for features such as lane-keeping assistance, forward-collision warning or automatic emergency braking, the manufacturer may call for that camera to be calibrated after the windshield is replaced, because the new glass changes what the camera sees. Not every windshield needs it, and the decision depends on your specific vehicle and its manufacturer's instructions, not on a general rule.</p>
<p>${esc(cfg.strings.adasInterim)} The procedure your vehicle requires (static, dynamic or both) determines where calibration can be done and what the site needs to provide. Details, limits and the separate calibration terms are on the <a href="/adas-recalibration/">ADAS calibration page</a>.</p>

<div class="callout callout--safety">
<h2 id="safe-drive-away">Safe drive-away time</h2>
<p>Windshield adhesive needs time to reach the strength required to hold the windshield in place in a crash, and driving too soon can compromise windshield retention. The safe drive-away time depends on the adhesive used, the installation conditions and your vehicle's requirements, so there is no single number that applies to every job. Ask for the safe drive-away time for your vehicle before the technician leaves, and do not drive the vehicle before it. Always wear your seatbelt.</p>
</div>

<h2 id="site">Where the work can be done</h2>
<p>A windshield replacement needs a reasonably level spot where the vehicle can stay put, room to open the doors and hood, and shelter from heavy rain and strong wind so the adhesive and the inside of your vehicle stay clean and dry. A driveway, a workplace parking space you are allowed to use, or a similar approved location all work. Weather or unsuitable site conditions can require rescheduling; there is no cancellation fee. <a href="/services/#site">More on suitable locations</a>.</p>

<h2 id="guarantee">What the guarantee covers on a replacement</h2>
<p>${esc(cfg.strings.guaranteePreview)} If a covered problem with a replacement cannot be corrected, Hard Knox refunds the amount paid for that replacement. New damage from rocks, debris, accidents or other outside events is not covered, and problems caused by pre-existing rust, corrosion or frame damage are not covered. <a href="/warranty/#replacement">Replacement terms in the full guarantee</a>.</p>

<h2 id="related">Related services</h2>
<ul>
<li><a href="/rock-chip-repair/">Windshield rock chip repair</a> — for smaller, fresher chips that have not spread.</li>
<li><a href="/adas-recalibration/">ADAS calibration</a> — for vehicles whose camera must be calibrated after glass replacement.</li>
<li><a href="/door-quarter-back-glass/">Door, quarter and back glass replacement</a> — for the other windows on the vehicle.</li>
<li><a href="/cancellation-refund-policy/">Cancellation, rescheduling and refund policy</a> — including how travel outside Hamilton County is quoted.</li>
</ul>
</div>
${S.quoteAside({ extra: `<h2>For the quote, send</h2>${S.quoteChecklist()}` })}
</div></section>
`;

module.exports = {
  url,
  title: 'Mobile Windshield Replacement | Hard Knox Auto Glass',
  description: 'Windshield replacement at your home, workplace or other suitable site in Chattanooga and Hamilton County, TN. Aftermarket or OEM glass; calibration if needed.',
  breadcrumbs: trail,
  body,
  jsonld: [
    S.serviceNode({ url, name: 'Windshield Replacement', serviceType: 'Mobile windshield replacement',
      description: 'Windshield replacement performed at the customer\'s home, workplace or another suitable location in Hamilton County, Tennessee. Aftermarket glass available; OEM glass may be available on request. Some vehicles require ADAS calibration afterwards.' }),
    S.breadcrumbList(trail),
  ],
};
