'use strict';
const cfg = require('../site-config');
const { esc } = require('../layout');
const S = require('./_shared');

const url = '/cancellation-refund-policy/';
const trail = [S.trailHome, { label: 'Cancellation & Refund Policy', url }];
const b = cfg.business;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Policy</p>
<h1>Cancellation, Rescheduling &amp; Refund Policy</h1>
<p class="doc-meta">Effective ${esc(cfg.privacy.effective)}.</p>
<p class="lede">What happens if you need to cancel or move an appointment, how weather is handled, how and when you pay, how travel outside Hamilton County is charged, and which guarantee remedy applies if something is wrong with the work.</p>
</div></section>

<section class="section"><div class="wrap">
<div class="prose">
<h2 id="cancel">1. Cancelling or rescheduling</h2>
<p><strong>There is no cancellation fee.</strong> If you need to cancel or move an appointment, call or text ${esc(b.phoneDisplay)} as early as you can so the time can be offered to someone else. You can reschedule as many times as you need to; nothing is charged for a visit that does not happen.</p>

<h2 id="weather">2. Weather and site conditions</h2>
<p>Glass work needs a dry, reasonably sheltered and level spot. Heavy rain, strong wind, lightning, extreme temperatures, or a site that turns out to be unsuitable (for example, no level space or no permission to work there) can require rescheduling, even on the day. When that happens, Brandon will tell you as early as possible and offer another time. <strong>No charge applies to a visit that is rescheduled for weather or site conditions.</strong> ADAS calibration has its own conditions, described on the <a href="/adas-recalibration/#site">ADAS calibration page</a>.</p>

<h2 id="payment">3. Payment</h2>
<p>Payment is <strong>by card or cash, due upon completion</strong> of the work. The amount is the price confirmed with you before the work was scheduled, plus any additional work you separately authorized during the job. The website does not take payments, and no payment details should be sent by text or email.</p>

<h2 id="travel">4. Mobile and travel charges</h2>
<p>Within Hamilton County, Tennessee, mobile service is part of the quoted price. For locations outside Hamilton County, in directly adjacent communities, <strong>${esc(cfg.strings.travelLine).toLowerCase()}</strong> You will know the full amount, including any travel charge, before you agree to the work. A free quote means the quote costs nothing; it does not mean travel is free or that the final price is set before the vehicle, the work and the location have been confirmed.</p>

<h2 id="refunds">5. Refunds and remedies</h2>
<p>Refunds follow the <a href="/warranty/">Limited Warranty / Service Guarantee</a>, which is the document that defines them. In short:</p>
<ul>
<li><strong>Covered defect in a replacement or in installation workmanship:</strong> Hard Knox inspects and repairs, reinstalls or replaces the covered work or glass at no charge. <strong>If a covered problem with a replacement cannot be corrected, Hard Knox refunds the amount you paid for that replacement.</strong> <a href="/warranty/#replacement">Guarantee, section 5</a>.</li>
<li><strong>Chip repair that spreads, fails an applicable inspection, or does not satisfy you:</strong> the amount you paid for that repair is applied as a <strong>credit toward a full windshield replacement</strong> by Hard Knox. It is a credit, not a cash refund. <a href="/warranty/#chip-repair-credit">Guarantee, section 6</a>.</li>
<li><strong>New damage after the work</strong> (a new rock strike, an accident) is not a defect and is not refunded or covered; it is quoted as new work. <a href="/warranty/#not-covered">Guarantee, section 8</a>.</li>
<li><strong>ADAS calibration</strong> is covered by the separate terms confirmed with your quote and work order. <a href="/warranty/#adas-calibration">Guarantee, section 7</a>.</li>
</ul>
<p>To report a problem, follow <a href="/warranty/#how-to-report">section 9 of the guarantee</a>: call, text or email as soon as you notice it, preferably within 30 days, with your invoice or other proof of service. Reporting later does not by itself cancel coverage.</p>

<h2 id="additional-work">6. Additional work</h2>
<p>A quote inquiry is never authorization for additional work. If something extra is found during a job, you are told first, it is quoted separately, and it is done only if you authorize it. You can decline additional work without affecting the work you originally authorized.</p>

<h2 id="contact">7. Questions</h2>
<p>Call or text ${esc(b.phoneDisplay)}, or email <span class="email">${esc(b.email)}</span>. See also the <a href="/terms/">website terms of use</a>.</p>
</div>
</div></section>
`;

module.exports = {
  url,
  title: 'Cancellation & Refund Policy | Hard Knox Auto Glass',
  description: 'No cancellation fee. Rescheduling for weather or site conditions, card or cash at completion, travel charges outside Hamilton County, and which remedy applies.',
  breadcrumbs: trail,
  body,
  jsonld: [S.breadcrumbList(trail)],
};
