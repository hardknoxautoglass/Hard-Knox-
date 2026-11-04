'use strict';
const cfg = require('../site-config');
const { esc, icon, telLink, smsLink, PHONE_NB } = require('../layout');
const S = require('./_shared');

const url = '/warranty/';
const trail = [S.trailHome, { label: 'Limited Warranty / Service Guarantee', url }];
const b = cfg.business;
const W = cfg.warranty;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Guarantee</p>
<h1>Hard Knox Auto Glass Limited Warranty / Service Guarantee</h1>
<p class="doc-meta">Version ${esc(W.version)} · Effective ${esc(W.effective)} · Applies to work authorized on or after the effective date. <span class="print-url" data-url=" Online copy: ${esc(cfg.origin)}${url}"></span></p>
<p class="lede">This is the complete guarantee, written to be read before you order work. You do not need an account, an appointment or a phone call to read it, and you can print it or ask for a paper copy before you authorize anything.</p>
<p><button class="btn btn-outline btn-small print-btn" type="button">${icon('print')}Print this guarantee</button></p>
</div></section>

<section class="section"><div class="wrap">
<div class="prose">
<nav class="toc" aria-labelledby="toc-h">
<h2 id="toc-h">Contents</h2>
<ol>
<li><a href="#summary">Summary in plain language</a></li>
<li><a href="#who">Who gives this guarantee and who it covers</a></li>
<li><a href="#what-is-covered">What is covered</a></li>
<li><a href="#how-long">How long coverage lasts</a></li>
<li><a href="#replacement">What Hard Knox will do: the covered remedy</a></li>
<li><a href="#chip-repair-credit">Chip repairs: the replacement credit</a></li>
<li><a href="#adas-calibration">ADAS calibration: separate terms</a></li>
<li><a href="#not-covered">What is not covered</a></li>
<li><a href="#how-to-report">How to report a problem</a></li>
<li><a href="#costs">What a covered claim costs you</a></li>
<li><a href="#legal-rights">Your legal rights</a></li>
<li><a href="#safe-drive-away">Safety note: safe drive-away time</a></li>
<li><a href="#version">Version, copies and earlier work</a></li>
</ol>
</nav>

<h2 id="summary">1. Summary in plain language</h2>
<p>${esc(cfg.strings.guaranteePreview)} If something covered goes wrong, Hard Knox inspects it and repairs, reinstalls or replaces the covered work or glass at no charge to you. If a covered problem with a windshield or other glass <em>replacement</em> cannot be corrected, Hard Knox refunds what you paid for that replacement. Chip repairs work differently: if a repaired chip spreads or you are not satisfied, what you paid for the repair is credited toward a full windshield replacement. New damage from rocks, debris, accidents and the like is not a defect and is not covered. ADAS calibration has separate terms. The sections below are the terms themselves; where this summary and a section differ, the section applies.</p>

<h2 id="who">2. Who gives this guarantee and who it covers</h2>
<p><strong>Warrantor:</strong> ${esc(b.name)}, a veteran-owned mobile auto glass service in ${esc(b.county)}, ${esc(b.state)}. Telephone and text: ${esc(b.phoneDisplay)}. Email: <span class="email">${esc(b.email)}</span>.</p>
<p><strong>Who is covered:</strong> the original customer, meaning the person who paid Hard Knox for the work, for the vehicle the work was performed on. This guarantee is not transferable: it ends if the vehicle is sold or otherwise transferred to someone else.</p>

<h2 id="what-is-covered">3. What is covered</h2>
<ul>
<li><strong>Defects in Hard Knox auto-glass installation workmanship.</strong> Examples: a water or air leak at a windshield or back glass that Hard Knox bonded in, a moulding or clip that Hard Knox fitted coming loose, or a door glass Hard Knox fitted that no longer runs correctly because of how it was installed.</li>
<li><strong>Defects in glass supplied and installed by Hard Knox.</strong> Examples: distortion, delamination, a flaw in the glass, or a defroster grid in back glass supplied by Hard Knox that fails without outside damage.</li>
</ul>
<p>Chip repairs are covered by section 6 rather than this section, and ADAS calibration by section 7.</p>

<h2 id="how-long">4. How long coverage lasts</h2>
<p>Coverage for a covered defect lasts <strong>for as long as the original customer owns the vehicle</strong>. Ownership sets the duration; there is no separate time limit on reporting a covered defect (see section 9 on prompt reporting).</p>

<h2 id="replacement">5. What Hard Knox will do: the covered remedy</h2>
<ol>
<li><strong>Inspection.</strong> Hard Knox inspects the vehicle to confirm whether the problem is a covered defect. Inspection is done at a mutually agreed location within Hard Knox's normal service area, or at the location where the original work was done.</li>
<li><strong>Repair, reinstallation or replacement at no charge.</strong> If the problem is a covered defect, Hard Knox repairs, reinstalls or replaces the covered work or glass without charging you for parts, labor or travel to the vehicle within the normal service area.</li>
<li><strong>Calibration needed to complete a covered correction.</strong> If correcting a covered windshield defect requires the vehicle's camera to be calibrated again, that calibration is arranged as part of the correction and you are not charged for it.</li>
<li><strong>Refund if a covered replacement problem cannot be corrected.</strong> If a covered problem with a glass replacement cannot be corrected, Hard Knox refunds the amount you paid for that replacement. The refund is paid to the original customer.</li>
</ol>

<h2 id="chip-repair-credit">6. Chip repairs: the replacement credit</h2>
<p>A chip repair stabilizes the damaged area. <strong>It does not restore the windshield to its original condition</strong>; a blemish usually remains visible. <strong>It does not guarantee that the chip will not spread.</strong></p>
<p>If a chip repaired by Hard Knox later spreads, if the repaired area fails an applicable state inspection where one applies to your vehicle, <strong>or if you are not satisfied with the repair</strong>, Hard Knox will apply the amount you paid for that repair as a credit toward a full windshield replacement performed by Hard Knox on the same vehicle.</p>
<ul>
<li>This benefit is a <strong>credit toward replacement</strong>. It is not a cash refund. (The refund in section 5 applies to replacements, not repairs.)</li>
<li>The benefit belongs to the original customer and is not transferable.</li>
<li>To use the credit, contact Hard Knox as described in section 9 with your invoice or other proof of the repair.</li>
</ul>

<h2 id="adas-calibration">7. ADAS calibration: separate terms</h2>
<p>This guarantee covers glass and installation workmanship. It does not itself cover ADAS calibration, and it does not say that calibration is unwarranted. <strong>The terms that apply to ADAS calibration, including who performs the procedure and what is warranted, are confirmed with your quote and work order before you authorize calibration.</strong> If those terms have not been given to you, ask before authorizing. Section 5, item 3 (calibration needed to complete a covered windshield correction) still applies.</p>

<h2 id="not-covered">8. What is not covered</h2>
<ul>
<li><strong>New damage from outside events</strong>, including road debris, rocks, accidents, vandalism, misuse, improper care, or any other event after the work was completed. A new rock strike on a replaced windshield is new damage, not a defect, no matter how long you own the vehicle.</li>
<li><strong>Problems caused by pre-existing rust, corrosion or damage to the frame or pinchweld</strong> (the metal lip the glass bonds to). Some of these conditions only become visible once the old glass is removed; when that happens you are told before the work continues, and this guarantee does not cover leaks or bonding problems that result from those conditions.</li>
<li><strong>Problems unrelated to covered workmanship or to a defect in glass supplied by Hard Knox</strong>, such as wear in the vehicle's own regulators, motors, seals or trim that Hard Knox did not supply or install, or damage caused by someone else's later work.</li>
<li><strong>Spreading of a repaired chip</strong>, which is handled by the replacement credit in section 6 rather than by repair or refund.</li>
</ul>

<h2 id="how-to-report">9. How to report a problem</h2>
<ol>
<li><strong>Contact Hard Knox as soon as you notice the problem</strong>, preferably within 30 days of noticing it. The quickest way is to call ${telLink('', PHONE_NB)}. If a voice call is difficult for you, ${smsLink('', 'text the same number')} or email <span class="email">${esc(b.email)}</span>; all three routes are accepted.</li>
<li><strong>Have your invoice or other proof of service available</strong> (the date, the vehicle and the work done are enough if you have lost the paper copy).</li>
<li><strong>Describe what you see</strong> and, if you can, send a photo. Hard Knox will arrange an inspection.</li>
</ol>
<p>The 30-day request is about prompt reporting, because an early look makes the cause easier to find and fix. <strong>Reporting after 30 days does not by itself cancel coverage</strong>, and this is not a 30-day warranty: covered defects remain covered for as long as the original customer owns the vehicle (section 4).</p>

<h2 id="costs">10. What a covered claim costs you</h2>
<p>Nothing. There is no charge for the inspection of a reported problem, for a covered repair, reinstallation or replacement, or for travel to the vehicle within the normal service area. If an inspection shows the problem is not covered (for example, a new rock strike), Hard Knox will tell you and quote any repair or replacement as new work, which you are free to accept or decline.</p>

<h2 id="legal-rights">11. Your legal rights</h2>
<p><strong>This warranty gives you specific legal rights, and you may also have other rights which vary from state to state.</strong></p>
<p>This guarantee does not limit any implied warranty or any other right you have under ${esc(b.state)} law, and nothing in it shortens the time you have to exercise those rights.</p>
<p>To the extent permitted by applicable law, Hard Knox Auto Glass is not responsible for incidental or consequential losses, such as loss of use of the vehicle, towing, rental vehicle costs or lost time. <strong>Some states do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to you.</strong> This limitation does not apply to injury to a person, and it does not reduce any remedy this guarantee promises.</p>

<div class="callout callout--safety">
<h2 id="safe-drive-away">12. Safety note: safe drive-away time</h2>
<p>Windshield and back glass adhesive needs time to reach the strength required to hold the glass in place in a crash, and driving too soon can compromise glass retention. The safe drive-away time depends on the adhesive used, the installation conditions and your vehicle's requirements, so there is no single number that applies to every job. Ask for the safe drive-away time for your vehicle before the technician leaves, and do not drive the vehicle before it. Always wear your seatbelt.</p>
</div>

<h2 id="version">13. Version, copies and earlier work</h2>
<p>This is version ${esc(W.version)} of the Hard Knox Auto Glass Limited Warranty / Service Guarantee, effective ${esc(W.effective)}. It applies to work authorized on or after that date. Work authorized earlier is covered by the terms given to that customer at the time of the work; if you are unsure which terms apply to you, call or text ${esc(b.phoneDisplay)}.</p>
<p>You can read this page at any time without an account or appointment, print it, or ask for a paper copy before you authorize any work. Changes to this guarantee apply only to work authorized after the change; the version in force when your work was authorized continues to apply to that work.</p>
<p>Related pages: <a href="/cancellation-refund-policy/">Cancellation, rescheduling and refund policy</a> · <a href="/terms/">Website terms of use</a> · <a href="/service-area-contact/">Contact</a>.</p>
</div>
</div></section>
`;

module.exports = {
  url,
  title: 'Limited Warranty / Service Guarantee | Hard Knox Auto Glass',
  description: 'Full terms of the Hard Knox Auto Glass limited guarantee: covered defects, remedies, chip-repair credit, exclusions, calibration terms and how to report problems.',
  breadcrumbs: trail,
  bodyClass: 'page-warranty',
  body,
  jsonld: [S.breadcrumbList(trail)],
};
