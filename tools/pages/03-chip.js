'use strict';
const cfg = require('../site-config');
const { esc } = require('../layout');
const S = require('./_shared');

const url = '/rock-chip-repair/';
const trail = [S.trailHome, S.trailServices, { label: 'Windshield Chip Repair', url }];
const b = cfg.business;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Windshield chip repair</p>
<h1>Windshield Rock Chip Repair</h1>
<p class="lede">Mobile repair of stone chips and short cracks in windshields across ${esc(b.county)}, ${esc(b.state)}, including Chattanooga. A repair is assessed in person, done where your vehicle is parked, and backed by a credit toward replacement if the chip spreads. ${esc(cfg.strings.quoteLine)}</p>
</div></section>

<section class="section"><div class="wrap page-grid">
<div class="prose">
<h2 id="can-it-be-repaired">Can my chip be repaired?</h2>
<p>Often, but not always, and not from a text message alone. Whether a chip can be repaired depends on its size, its type (a bullseye, a star break, a combination, a short crack), how deep it goes, where it sits on the windshield, and how long dirt and moisture have had to get into it. Chips in the driver's main line of sight, damage at the edge of the glass, and cracks that have already run are usually replacement jobs. The decision is made in person, at the glass. A photo sent with your text helps us give you a realistic first answer and tell you what to expect.</p>
<p>Sooner is better. A fresh chip is cleaner and takes resin better; one that has been driven on through rain and car washes is harder to repair well. Until it is looked at, avoid slamming doors and sudden temperature changes such as blasting the defroster on a cold morning, which can make a chip run.</p>

<h2 id="what-repair-does">What a repair does, and what it does not</h2>
<p>A repair cleans the damaged area, injects a clear resin under vacuum and pressure to fill the break, then cures it with ultraviolet light and polishes the surface. The goal is to stop the damage from spreading and to keep the windshield structurally sound.</p>
<p><strong>A repair does not restore the windshield to its original condition.</strong> A small mark or blemish usually remains visible, especially up close or at certain angles, and <strong>no repair can guarantee that a chip will never spread.</strong> If you want the glass to look new, replacement is the only way to get that.</p>

<h2 id="credit">If the repaired chip spreads: the replacement credit</h2>
<p>If a chip Hard Knox repaired later spreads, if the repaired area fails an applicable state inspection where one applies, or if you are simply not satisfied with the repair, <strong>the amount you paid for that repair is applied as a credit toward a full windshield replacement by Hard Knox Auto Glass.</strong></p>
<ul>
<li>It is a credit toward replacement, <strong>not a cash refund</strong>. The cash refund described in the guarantee is a different remedy that applies only when a covered problem with a <em>replacement</em> cannot be corrected.</li>
<li>The credit belongs to the original customer and applies to the vehicle the repair was done on.</li>
<li>To use it, call or text ${esc(b.phoneDisplay)} with your invoice or other proof of service. <a href="/warranty/#chip-repair-credit">Full chip repair credit terms</a>.</li>
</ul>

<h2 id="visit">What a mobile chip repair visit looks like</h2>
<p>We come to your home, workplace or another suitable location. The glass needs to be dry and reasonably shaded from direct sun while the resin is worked and cured, so a carport, garage or shaded spot helps; in bright sun the technician can shade the area. A chip repair takes less time than a replacement and the vehicle can usually be driven as soon as the resin is cured and the surface polished. Card or cash is due when the work is complete.</p>

<h2 id="related">Related pages</h2>
<ul>
<li><a href="/windshield-replacement/">Windshield replacement</a> — when a chip cannot be repaired, or if you decide you want new glass.</li>
<li><a href="/warranty/#chip-repair-credit">Chip repair credit in the limited guarantee</a>.</li>
<li><a href="/services/#quote">What to have ready for a quote</a>.</li>
</ul>
</div>
${S.quoteAside({ heading: 'Ask about a chip', extra: `<h2>Send with your text</h2><ul><li>Year, make and model</li><li>A photo of the chip with something for scale, if it is safe to take one</li><li>Roughly where it is on the windshield and when it happened</li><li>The general area where the vehicle will be</li></ul>` })}
</div></section>
`;

module.exports = {
  url,
  title: 'Windshield Chip Repair | Hard Knox Auto Glass',
  description: 'Mobile windshield rock chip repair in Hamilton County, TN: what repair can and cannot do, when replacement is better, and the credit toward a full replacement.',
  breadcrumbs: trail,
  body,
  jsonld: [
    S.serviceNode({ url, name: 'Windshield Chip Repair', serviceType: 'Mobile windshield rock chip repair',
      description: 'Resin repair of eligible windshield stone chips and short cracks, assessed in person and performed at the customer\'s location in Hamilton County, Tennessee. If a repaired chip spreads, the amount paid for the repair is credited toward a full windshield replacement.' }),
    S.breadcrumbList(trail),
  ],
};
