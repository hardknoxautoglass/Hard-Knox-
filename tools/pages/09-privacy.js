'use strict';
const cfg = require('../site-config');
const { esc } = require('../layout');
const S = require('./_shared');

const url = '/privacy/';
const trail = [S.trailHome, { label: 'Privacy Notice', url }];
const b = cfg.business;
const P = cfg.privacy;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Privacy</p>
<h1>Privacy Notice</h1>
<p class="doc-meta">Effective ${esc(P.effective)}.</p>
<p class="lede">This notice describes what actually happens with information when you browse ${esc(b.domainDisplay)} and when you contact ${esc(b.name)}. It is written to match how the site and the business really work, which is simpler than most: the website collects nothing itself, and the business keeps only what it needs to quote, do and stand behind the work.</p>
</div></section>

<section class="section"><div class="wrap">
<div class="prose">
<h2 id="browsing">1. When you browse this website</h2>
<p>This website is a set of plain pages. It has <strong>no forms, no accounts, no chat, no analytics, no advertising, no tracking pixels, no embedded maps or videos, no social-media widgets and no third-party scripts</strong>. Fonts, styles and scripts are served from this site's own domain. The site sets <strong>no cookies</strong> and stores nothing in your browser's storage.</p>
<p>Like every website, it is delivered by a hosting company. This site is hosted by <strong>Hostinger</strong>. When your browser requests a page, Hostinger's servers receive the technical details needed to deliver it: your IP address, the page requested, the time, and your browser type. Hostinger may keep these in server and security logs for the operation and protection of its hosting service, under its own retention rules. ${esc(b.name)} does not use these logs to identify or track visitors.</p>
<p>Because the site does not track you, there is nothing to opt out of. Browser "Do Not Track" and Global Privacy Control signals do not change anything, because no tracking or sale of information happens in the first place.</p>

<h2 id="contact">2. When you call, text or email</h2>
<p>The Call and Text buttons on this site open your own phone's dialer or messaging app with the business number filled in. <strong>Tapping a button sends nothing by itself</strong>; you decide whether to place the call or send the message. The email link on the Contact page works the same way.</p>
<p>When you do call, text or email, ${esc(b.name)} receives what you send: your phone number or email address, what you tell us about your vehicle and the glass, any photos you attach, and where you would like the work done. This information is used to answer you, give you a quote, and arrange and perform the work. It is <strong>not used for marketing</strong>, you are not added to any mailing or messaging list, and asking for a quote does not sign you up for anything.</p>
<p>Calls and texts are carried by the telephone and messaging providers involved (your carrier and ours), which handle them under their own terms. Voicemail and text messages are stored on the business phone. Email is received through <strong>Google's Gmail service</strong>, which stores and processes it under Google's terms.</p>
<p><strong>Please do not send</strong> payment-card numbers, bank details, insurance policy or claim documents, your full VIN, or your exact home address in a first message. We confirm the address by phone when the work is scheduled.</p>

<h2 id="work">3. When work is quoted, scheduled and done</h2>
<p>To do the job and honor the guarantee, ${esc(b.name)} keeps a record of the work: your name, phone number (and email if you used it), the vehicle's year, make and model, the glass and work performed, the service location, the date and the amount paid. This is the invoice or work order you also receive.</p>
<p><strong>Payment</strong> is made in person when the work is complete, by card or cash. <strong>This website does not process payments</strong> and never sees payment details. If you pay by card, the card reader and its payment provider handle your card information under their own terms; ${esc(b.name)} does not store card numbers.</p>
<p><strong>Warranty records.</strong> Because the limited guarantee lasts for as long as the original customer owns the vehicle, work records are kept so that a claim can be checked and honored later. Records are not kept longer than needed for that purpose and for ordinary tax and business obligations.</p>
<p>If ADAS calibration for your vehicle involves another provider, the vehicle details needed to perform the calibration are shared with that provider for that purpose only. You will be told who is involved when the arrangements for your vehicle are confirmed.</p>

<h2 id="recipients">4. Who receives information, and why</h2>
<table>
<caption>Providers involved in delivering this site and running the business</caption>
<thead><tr><th scope="col">Provider</th><th scope="col">What they receive</th><th scope="col">Why</th></tr></thead>
<tbody>
<tr><td>Hostinger (web hosting)</td><td>Technical request data (IP address, page, time, browser type) in server and security logs</td><td>Delivering and protecting the website</td></tr>
<tr><td>Telephone and messaging carriers</td><td>Calls and text messages you choose to send, and the numbers involved</td><td>Carrying calls and texts</td></tr>
<tr><td>Google (Gmail)</td><td>Email you choose to send to ${esc(b.email)}</td><td>Receiving and storing email</td></tr>
<tr><td>Card-payment provider</td><td>Card details you present in person at payment</td><td>Processing card payments; the website is not involved</td></tr>
<tr><td>Calibration provider, if one is involved for your vehicle</td><td>Vehicle details needed for the calibration</td><td>Performing the calibration you authorized</td></tr>
</tbody>
</table>
<p>${esc(b.name)} does not sell personal information, does not share it for advertising, and does not give it to anyone else except where the law requires it.</p>

<h2 id="choices">5. Your choices and questions</h2>
<ul>
<li><strong>Ask what we hold about you, correct it, or ask for it to be deleted.</strong> Call or text ${esc(b.phoneDisplay)} or email <span class="email">${esc(b.email)}</span>. We will confirm it is you (usually by matching the phone number or email the record came from), answer, and delete what you ask to have deleted unless it is needed to honor your guarantee or to meet a tax or legal obligation, in which case we will tell you.</li>
<li><strong>Stop contact.</strong> There is no marketing to stop, but if you want no further contact about a quote or job, say so and it ends there.</li>
<li><strong>Links to other sites.</strong> This site links to a small number of outside pages (for example, government guidance). Those sites have their own privacy practices; this site does not send them anything when a page loads, only when you choose to follow a link.</li>
</ul>

<h2 id="children">6. Children</h2>
<p>This site and the services are for vehicle owners and drivers. No information is knowingly collected from anyone under 18, and the site has no features for anyone to submit information.</p>

<h2 id="changes">7. Changes to this notice</h2>
<p>If the way the site or the business handles information changes, this notice will be updated and the effective date at the top will change. The current version is always at ${esc(cfg.origin)}${url}.</p>

<h2 id="privacy-contact">8. Privacy questions</h2>
<p>${esc(b.name)}, ${esc(b.county)}, ${esc(b.state)}. Call or text ${esc(b.phoneDisplay)}, or email <span class="email">${esc(b.email)}</span>. See also the <a href="/accessibility/">accessibility page</a> and the <a href="/terms/">website terms of use</a>.</p>
</div>
</div></section>
`;

module.exports = {
  url,
  title: 'Privacy Notice | Hard Knox Auto Glass',
  description: 'What happens when you browse HardKnoxAutoGlass.com and when you call, text or email Hard Knox Auto Glass, which providers are involved, and how to ask a question.',
  breadcrumbs: trail,
  body,
  jsonld: [S.breadcrumbList(trail)],
};
