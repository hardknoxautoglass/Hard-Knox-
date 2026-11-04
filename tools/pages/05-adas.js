'use strict';
const cfg = require('../site-config');
const { esc } = require('../layout');
const S = require('./_shared');

const url = '/adas-recalibration/';
const trail = [S.trailHome, S.trailServices, { label: 'ADAS Calibration', url }];
const b = cfg.business;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">ADAS calibration</p>
<h1>ADAS Calibration After Windshield Replacement</h1>
<p class="lede">${esc(cfg.strings.adasInterim)}</p>
</div></section>

<section class="section"><div class="wrap page-grid">
<div class="prose">
<h2 id="what-is-adas">What ADAS is, in plain English</h2>
<p>ADAS stands for <em>advanced driver assistance systems</em>: the features that watch the road for you, such as lane-departure warning, lane-keeping assistance, forward-collision warning, automatic emergency braking and adaptive cruise control. On many vehicles the main sensor for these features is a camera mounted behind the windshield, near the rearview mirror, looking out through the glass.</p>
<p>The camera is aimed very precisely. When the windshield is replaced, the camera is unbolted and refitted and it now looks through a different piece of glass, so its aim can be slightly off. <strong>Calibration</strong> (sometimes called recalibration) is the manufacturer's procedure for re-aiming the camera so that the features behave the way they were designed to.</p>

<h2 id="does-my-vehicle-need-it">Does my vehicle need calibration?</h2>
<p>Not every windshield does. Whether calibration is required, and which procedure, is set by your vehicle's manufacturer for your specific year, make, model and equipment, not by a general rule. As a starting point: if there is a camera housing behind your mirror and your vehicle has any of the features above, calibration is likely to be part of the job. Brandon checks the manufacturer's current information for your vehicle when he quotes a windshield replacement and tells you what applies.</p>

<h2 id="static-dynamic">Static, dynamic or both</h2>
<dl class="defs">
<dt>Static calibration</dt>
<dd>Done with the vehicle parked. Printed targets are set up at measured distances in front of the vehicle, and a scan tool runs the camera through the manufacturer's routine. It needs a level floor, even lighting, and a clear space in front of the vehicle large enough for the targets.</dd>
<dt>Dynamic calibration</dt>
<dd>Done by driving. A scan tool is connected and the vehicle is driven on suitable roads, at the speeds and for the distance the manufacturer specifies, while the camera learns from lane markings and surroundings. It needs roads with clear markings and good conditions.</dd>
<dt>Both</dt>
<dd>Some vehicles require a static procedure followed by a dynamic one.</dd>
</dl>

<h2 id="driveway">Can you calibrate in my driveway?</h2>
<p><strong>Sometimes.</strong> Whether calibration can be done at your location depends on three things: your vehicle, the procedure its manufacturer requires, and the site. A dynamic calibration is done on the road, not in the driveway at all. A static calibration needs a level, well-lit space with enough clear room in front of the vehicle for the targets, which some driveways and parking areas have and many do not. Some vehicles need conditions that only a controlled indoor space provides.</p>
<p>That is why Hard Knox does not promise driveway calibration for every vehicle. <strong>Call or text with your vehicle year, make, model and general location</strong> and Brandon will confirm the arrangements that apply to your vehicle: where it can be done, what the site needs to provide, and what happens if a procedure cannot be completed at the planned location, before anything is scheduled.</p>

<h2 id="site">Site and vehicle requirements</h2>
<ul>
<li>A level, firm surface and even lighting for a static procedure, with clear space in front of the vehicle for targets. Strong direct sun, deep shadow or a sloping driveway can prevent a static procedure from completing.</li>
<li>Suitable roads with clear lane markings and good weather for a dynamic procedure.</li>
<li>A windshield that is the correct type for the vehicle's camera. Some vehicles require specific glass for the camera to calibrate; Brandon confirms this when he quotes the glass.</li>
<li>Correct tire pressures, a vehicle at its normal weight (no heavy cargo) and no warning lights for unrelated faults; these can stop a calibration routine from completing.</li>
</ul>

<h2 id="what-to-expect">What to expect</h2>
<ol>
<li>When you ask for a windshield quote, say whether there is a camera behind the mirror. Brandon checks what your vehicle's manufacturer requires.</li>
<li>Before anything is scheduled, he confirms the calibration arrangements for your vehicle: the procedure, where it will be done, what the site needs, the price, and the calibration terms that apply.</li>
<li>After the windshield is installed and the adhesive has reached its safe drive-away strength, the calibration procedure is carried out as confirmed.</li>
<li>You are told the result. If a procedure cannot be completed at the planned location or on the day, Brandon tells you what the next step is and what, if anything, it costs, as part of the arrangements confirmed before the job.</li>
</ol>

<h2 id="terms">Calibration terms are separate</h2>
<p>The <a href="/warranty/">Hard Knox Auto Glass Limited Warranty / Service Guarantee</a> covers defects in installation workmanship and in glass Hard Knox supplies. <strong>ADAS calibration is covered by separate terms that are confirmed with your quote and work order</strong>, including who performs the procedure and what is warranted. Ask for those terms before you authorize calibration, and keep the work order with your vehicle records. <a href="/warranty/#adas-calibration">What the guarantee says about calibration</a>.</p>

<h2 id="related">Related pages</h2>
<ul>
<li><a href="/windshield-replacement/">Windshield replacement</a> — the job that most often leads to calibration.</li>
<li><a href="/services/#quote">What to have ready for a quote</a>.</li>
</ul>
</div>
${S.quoteAside({ heading: 'Confirm arrangements for your vehicle', extra: `<h2>Send with your text</h2><ul><li>Year, make and model</li><li>Whether there is a camera housing behind the mirror</li><li>Which assistance features the vehicle has, if you know</li><li>The general area where the vehicle will be and what the parking space is like</li></ul>` })}
</div></section>
`;

module.exports = {
  url,
  title: 'ADAS Calibration | Hard Knox Auto Glass',
  description: 'What ADAS calibration is, why some windshields need it, and how Hard Knox Auto Glass arranges it for vehicles in Hamilton County, TN. Call or text to confirm.',
  breadcrumbs: trail,
  body,
  jsonld: [
    S.serviceNode({ url, name: 'ADAS Calibration', serviceType: 'ADAS camera calibration after windshield replacement',
      description: 'Calibration of windshield-mounted advanced driver assistance camera systems for vehicles that require it after windshield replacement. Offered by Hard Knox Auto Glass; the procedure, location and terms are confirmed for each vehicle before scheduling.' }),
    S.breadcrumbList(trail),
  ],
};
