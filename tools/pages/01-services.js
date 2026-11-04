'use strict';
const cfg = require('../site-config');
const { esc, icon } = require('../layout');
const S = require('./_shared');

const trail = [S.trailHome, { label: 'Services', url: '/services/' }];

const compare = `<ul class="compare">
<li>${icon('windshield')}<div><h3><a href="/windshield-replacement/">Windshield replacement</a></h3>
<p><strong>Choose this when:</strong> the windshield has a long crack, a chip in the driver's main line of sight, damage at the edge, several chips, or a chip that an in-person assessment says cannot be repaired.</p>
<p><strong>What you get:</strong> the old glass removed, the new windshield bonded in with automotive urethane adhesive, and a safe drive-away time for your vehicle. Aftermarket glass is available; OEM glass may be available on request.</p>
<p><strong>Keep in mind:</strong> some vehicles need <a href="/adas-recalibration/">ADAS calibration</a> after the windshield is replaced.</p></div></li>

<li>${icon('chip')}<div><h3><a href="/rock-chip-repair/">Windshield rock chip repair</a></h3>
<p><strong>Choose this when:</strong> a stone has left a small chip or short crack and you want to stop it from spreading. Whether a chip can be repaired depends on its size, type, depth, location and how long it has been exposed; it is assessed in person.</p>
<p><strong>What you get:</strong> the chip cleaned, filled with resin and cured. A repair stabilizes the glass and usually improves its appearance, but it does not restore the windshield to original condition and cannot guarantee the chip will not spread.</p>
<p><strong>Keep in mind:</strong> if a repaired chip spreads, the amount you paid for the repair is credited toward a full windshield replacement. <a href="/warranty/#chip-repair-credit">Chip repair credit</a>.</p></div></li>

<li>${icon('door')}<div><h3><a href="/door-quarter-back-glass/#door-glass">Door glass replacement</a></h3>
<p><strong>Choose this when:</strong> the window in a front or rear door is broken or shattered. Door glass is usually tempered and cannot be repaired, only replaced.</p>
<p><strong>What you get:</strong> the door panel opened, broken glass cleaned out of the door, the new glass fitted to the regulator and checked through its full travel.</p></div></li>

<li>${icon('quarter')}<div><h3><a href="/door-quarter-back-glass/#quarter-glass">Quarter glass replacement</a></h3>
<p><strong>Choose this when:</strong> the small fixed pane behind the rear door, in the rear pillar, or the small vent pane in a door is broken.</p>
<p><strong>What you get:</strong> the broken pane removed, the opening cleaned, and the new glass bonded or clipped in to match how the vehicle was built.</p></div></li>

<li>${icon('back')}<div><h3><a href="/door-quarter-back-glass/#back-glass">Back glass replacement</a></h3>
<p><strong>Choose this when:</strong> the rear windshield is broken. Back glass is usually tempered and shatters into small pieces; it is replaced, not repaired.</p>
<p><strong>What you get:</strong> broken glass cleaned out of the trunk or cargo area, the new glass bonded in, and any defroster connections reconnected where the vehicle has them.</p></div></li>

<li>${icon('adas')}<div><h3><a href="/adas-recalibration/">ADAS calibration</a></h3>
<p><strong>Choose this when:</strong> your vehicle has a camera behind the windshield for features such as lane keeping, forward-collision warning or automatic emergency braking, and the windshield is being replaced or the vehicle's manufacturer calls for calibration.</p>
<p><strong>What you get:</strong> ${esc(cfg.strings.adasInterim)}</p>
<p><strong>Keep in mind:</strong> the arrangements, including where calibration is done, depend on your vehicle and the required procedure. Calibration is covered by separate terms confirmed with your quote, not by the glass guarantee.</p></div></li>
</ul>`;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Services</p>
<h1>Mobile Auto Glass Services</h1>
<p class="lede">Hard Knox Auto Glass does six things, all at your home, workplace or another suitable location in ${esc(cfg.business.county)}, ${esc(cfg.business.state)}. Use this page to work out which one you need, then call or text ${esc(cfg.business.phoneDisplay)} for a free quote.</p>
</div></section>

<section class="section"><div class="wrap page-grid">
<div class="prose">
<h2 id="compare">Which service do you need?</h2>
${compare}

<h2 id="repair-or-replace">Not sure whether a windshield can be repaired?</h2>
<p>Send a photo of the damage with your text, say roughly where it is on the windshield and when it happened, and we will tell you whether it looks like a repair or a replacement. The photo is a starting point, not a diagnosis: the final call is made in person, because the depth of a chip and whether it has started to spread are hard to see in a picture.</p>

<h2 id="quote">What to have ready for a quote</h2>
<p>A quote is free and carries no obligation. The more of this you can send, the quicker the quote:</p>
${S.quoteChecklist()}
<p>We confirm the vehicle, the scope of work, the location, the price and availability before anything is scheduled. Card or cash is due when the work is complete. Outside Hamilton County, ${esc(cfg.strings.travelLine).toLowerCase()}</p>

<h2 id="site">What makes a location suitable?</h2>
<ul>
<li>A reasonably level spot where the vehicle can stay parked for the duration of the job.</li>
<li>Room to open the doors fully and, for windshield work, the hood.</li>
<li>Shelter from heavy rain and strong wind. Adhesive, glass and the inside of your vehicle all need to stay dry and clean while the work is done. Weather or unsuitable site conditions can require rescheduling.</li>
<li>Permission to be there: your own driveway, a workplace space you are allowed to use, or a similar approved spot.</li>
</ul>
<p>Calibration has additional requirements. See <a href="/adas-recalibration/#site">ADAS calibration site and vehicle requirements</a>.</p>

<h2 id="guarantee">What is guaranteed</h2>
<p>${esc(cfg.strings.guaranteePreview)} Chip repairs carry a replacement credit instead, and ADAS calibration has separate terms. <a href="/warranty/">Read the full limited guarantee</a> before you authorize work.</p>
</div>
${S.quoteAside()}
</div></section>
`;

module.exports = {
  url: '/services/',
  title: 'Auto Glass Services | Hard Knox Auto Glass',
  description: 'Compare mobile windshield replacement, chip repair, door, quarter and back glass replacement, and ADAS calibration, and see what to have ready for a free quote.',
  breadcrumbs: trail,
  body,
  jsonld: [S.breadcrumbList(trail)],
};
