'use strict';
const cfg = require('../site-config');
const { esc } = require('../layout');
const S = require('./_shared');

const url = '/terms/';
const trail = [S.trailHome, { label: 'Website Terms of Use', url }];
const b = cfg.business;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Terms</p>
<h1>Website Terms of Use</h1>
<p class="doc-meta">Effective ${esc(cfg.privacy.effective)}.</p>
<p class="lede">These terms cover the use of ${esc(b.domainDisplay)} and explain how a quote inquiry becomes authorized work. They are deliberately short. They do not override the <a href="/warranty/">limited guarantee</a>, the <a href="/cancellation-refund-policy/">cancellation and refund policy</a>, or any right you have under ${esc(b.state)} or federal law.</p>
</div></section>

<section class="section"><div class="wrap">
<div class="prose">
<h2 id="who">1. Who runs this site</h2>
<p>${esc(b.domainDisplay)} is the website of ${esc(b.name)}, a mobile auto glass service owned and operated by ${esc(b.owner)} in ${esc(b.county)}, ${esc(b.state)}. Contact details are on the <a href="/service-area-contact/">contact page</a>.</p>

<h2 id="information">2. What the information on this site is for</h2>
<p>The pages describe the services offered, how they work, where they are offered, and the guarantee and policies that apply. They are general information to help you decide what to ask for. They are not a diagnosis of your vehicle, and nothing on the site tells you whether a particular chip can be repaired, whether your vehicle needs calibration, or whether a vehicle is safe to drive; those decisions are made for your specific vehicle, in person, by the technician. We try to keep the site accurate and current; if you find something that looks wrong, please tell us.</p>

<h2 id="quotes">3. Quote inquiries</h2>
<p>Calling, texting or emailing for a quote is free and places you under no obligation. A quote inquiry is a request for information, not an order. ${esc(b.name)} confirms the vehicle, the scope of work, the service location, the price, any mobile/travel charge outside Hamilton County, and availability with you before anything is scheduled. A quote is based on what you describe; if the vehicle or the damage turns out to be different when inspected in person, Brandon will tell you before any work starts and you can decide how to proceed.</p>

<h2 id="authorization">4. How work is authorized</h2>
<p>Work begins only when you have agreed to the confirmed scope and price for your vehicle. Your agreement is given to Brandon directly, by phone, text or in person, and is recorded on the work order or invoice for the job. <strong>A quote inquiry is never authorization for additional work.</strong> If something extra is found during the job, for example a damaged window regulator behind a broken door glass, or rust under an old windshield, you are told first, any additional work is quoted separately, and it is done only if you authorize it.</p>

<h2 id="payment">5. Payment</h2>
<p>Payment is by card or cash and is due upon completion of the work. There is no cancellation fee. Details, including what happens when weather or site conditions force a reschedule, are in the <a href="/cancellation-refund-policy/">cancellation, rescheduling and refund policy</a>.</p>

<h2 id="guarantee">6. Guarantee</h2>
<p>Work is covered by the <a href="/warranty/">Hard Knox Auto Glass Limited Warranty / Service Guarantee</a>, which is published in full and available on paper before you authorize work. Nothing in these website terms reduces that guarantee.</p>

<h2 id="insurance">7. Insurance</h2>
<p>${esc(b.name)} does not file insurance claims, does not advise on what a policy covers or what a deductible is, and makes no representation about what an insurer will approve, pay or reimburse. You are welcome to use a Hard Knox quote or invoice with your insurer; any claim or reimbursement is between you and your insurer, and the price for the work is due to Hard Knox at completion.</p>

<h2 id="using-the-site">8. Using the site</h2>
<ul>
<li>You may read, print and link to pages on this site for your own use, including printing the guarantee for your records.</li>
<li>The text, illustrations, icons and layout of this site belong to ${esc(b.name)} unless otherwise noted (the heading typeface is used under the SIL Open Font License). Please do not copy them for another business.</li>
<li>Do not attempt to interfere with the site or its hosting.</li>
<li>Links to outside sites are provided for convenience; ${esc(b.name)} does not control those sites.</li>
</ul>

<h2 id="privacy">9. Privacy and accessibility</h2>
<p>How information is handled is described in the <a href="/privacy/">privacy notice</a>. Help using the site and how to report a barrier are on the <a href="/accessibility/">accessibility page</a>.</p>

<h2 id="changes">10. Changes</h2>
<p>These terms may be updated from time to time; the effective date at the top will change when they are. The version on this page is the current one.</p>

<h2 id="contact">11. Questions</h2>
<p>Call or text ${esc(b.phoneDisplay)}, or email <span class="email">${esc(b.email)}</span>.</p>
</div>
</div></section>
`;

module.exports = {
  url,
  title: 'Website Terms of Use | Hard Knox Auto Glass',
  description: 'Terms for using HardKnoxAutoGlass.com, how quote inquiries work and how work is actually authorized. They do not limit the limited guarantee or your legal rights.',
  breadcrumbs: trail,
  body,
  jsonld: [S.breadcrumbList(trail)],
};
