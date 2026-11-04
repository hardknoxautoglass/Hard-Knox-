'use strict';
const cfg = require('../site-config');
const { esc, icon } = require('../layout');
const S = require('./_shared');

const url = '/door-quarter-back-glass/';
const trail = [S.trailHome, S.trailServices, { label: 'Door, Quarter & Back Glass', url }];
const b = cfg.business;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Side and rear glass</p>
<h1>Door, Quarter &amp; Back Glass Replacement</h1>
<p class="lede">Mobile replacement of the other windows on your vehicle, at your home, workplace or another suitable location in ${esc(b.county)}, ${esc(b.state)}, including Chattanooga. Use the three sections below to identify which pane is broken, then call or text ${esc(b.phoneDisplay)} for a free quote.</p>
</div></section>

<section class="section"><div class="wrap page-grid">
<div class="prose">
<h2 id="which-pane">Which window is it?</h2>
<ul>
<li><a href="#door-glass">Door glass</a> — the window that rolls up and down in a front or rear door.</li>
<li><a href="#quarter-glass">Quarter glass</a> — a smaller pane that does not roll down: behind the rear door, in the rear pillar, or the small vent pane in a door.</li>
<li><a href="#back-glass">Back glass</a> — the rear windshield, often with defroster lines.</li>
</ul>
<p>Unlike a windshield, these panes are usually <strong>tempered</strong> glass, which breaks into small pieces and cannot be repaired. They are replaced. A photo of the broken window and the surrounding door or pillar helps Brandon quote the right part.</p>

<section class="anchor-section" id="door-glass" aria-labelledby="door-h">
<h2 id="door-h">${icon('door')} Door glass replacement</h2>
<p>Door glass is the roll-up window in a front or rear door. When it breaks, most of the glass falls inside the door and onto the seat and floor.</p>
<p><strong>What Brandon does:</strong> removes the interior door panel, vacuums the broken glass out of the door cavity and the cabin, fits the new glass to the window regulator (the mechanism that raises and lowers it), checks that the window travels fully and seals against the weatherstrip, and refits the panel.</p>
<p><strong>Good to know:</strong> if the regulator or motor was damaged when the glass broke, Brandon will show you and tell you before any extra work is quoted. A quote inquiry is never authorization for additional work. Until the window is replaced, a temporary cover keeps rain out; avoid driving with loose glass in the door.</p>
</section>

<section class="anchor-section" id="quarter-glass" aria-labelledby="quarter-h">
<h2 id="quarter-h">${icon('quarter')} Quarter glass replacement</h2>
<p>Quarter glass is a smaller fixed pane: behind the rear door on many sedans and SUVs, in the rear pillar on wagons and vans, or the small vent window at the front or back of a door. Some are bonded in place; some are held by clips, screws or a rubber gasket; some vent panes hinge open.</p>
<p><strong>What Brandon does:</strong> removes the broken pane and any trim, cleans the opening, and fits the new glass the way the vehicle was built, bonded with urethane, clipped, or gasketed, so it seals against water and wind noise.</p>
<p><strong>Good to know:</strong> quarter glass is the pane most often broken in a break-in. If that is what happened, photograph the damage before anything is touched if you need it for a report, and tell Brandon whether there is glass inside the cargo area so he can plan cleanup.</p>
</section>

<section class="anchor-section" id="back-glass" aria-labelledby="back-h">
<h2 id="back-h">${icon('back')} Back glass replacement</h2>
<p>Back glass is the rear windshield. On most vehicles it is tempered and bonded in with urethane, and it usually carries the rear defroster grid; on some vehicles it also carries an antenna or a brake-light mount.</p>
<p><strong>What Brandon does:</strong> cleans the broken glass out of the trunk or cargo area and the rear deck, removes the old urethane and prepares the opening, bonds in the new glass, reconnects the defroster and any antenna connections the replacement glass carries, and checks the seal.</p>
<p><strong>Good to know:</strong> a bonded back glass needs adhesive cure time before the vehicle is driven, the same as a windshield. Ask Brandon for the safe drive-away time for your vehicle. If the vehicle has a hatch or liftgate, a quick photo of the glass area helps identify the right part.</p>
</section>

<h2 id="guarantee">What the guarantee covers</h2>
<p>${esc(cfg.strings.guaranteePreview)} New damage from outside events is not covered, and problems caused by pre-existing rust, corrosion or frame damage around the opening are not covered. <a href="/warranty/">Read the full limited guarantee</a>.</p>

<h2 id="related">Related pages</h2>
<ul>
<li><a href="/windshield-replacement/">Windshield replacement</a></li>
<li><a href="/services/#quote">What to have ready for a quote</a></li>
<li><a href="/cancellation-refund-policy/">Cancellation, rescheduling and refund policy</a></li>
</ul>
</div>
${S.quoteAside({ extra: `<h2>Send with your text</h2><ul><li>Year, make and model</li><li>Which window: front or rear door, driver or passenger side, quarter pane, or back glass</li><li>A photo of the broken window and the area around it</li><li>The general area where the vehicle will be</li></ul>` })}
</div></section>
`;

module.exports = {
  url,
  title: 'Door, Quarter & Back Glass Replacement | Hard Knox Auto Glass',
  description: 'Mobile door glass, quarter glass and back glass replacement in Chattanooga and Hamilton County, TN. Identify the broken pane, then call or text for a free quote.',
  breadcrumbs: trail,
  body,
  jsonld: [
    S.serviceNode({ url: `${url}#door-glass`, name: 'Door Glass Replacement', serviceType: 'Mobile door glass replacement',
      description: 'Replacement of broken roll-up door window glass, including cleanup of glass inside the door, at the customer\'s location in Hamilton County, Tennessee.' }),
    S.serviceNode({ url: `${url}#quarter-glass`, name: 'Quarter Glass Replacement', serviceType: 'Mobile quarter glass replacement',
      description: 'Replacement of fixed or vent quarter glass panes at the customer\'s location in Hamilton County, Tennessee.' }),
    S.serviceNode({ url: `${url}#back-glass`, name: 'Back Glass Replacement', serviceType: 'Mobile back glass replacement',
      description: 'Replacement of rear windshield (back glass), including defroster reconnection where fitted, at the customer\'s location in Hamilton County, Tennessee.' }),
    S.breadcrumbList(trail),
  ],
};
