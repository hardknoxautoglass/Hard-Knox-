'use strict';
const cfg = require('../site-config');
const { esc, icon, telLink, smsLink, securityNotice, PHONE_NB } = require('../layout');
const S = require('./_shared');

const url = '/service-area-contact/';
const trail = [S.trailHome, { label: 'Contact Us', url }];
const b = cfg.business;

const cityList = b.cities.map((c) => `<li>${esc(c)}</li>`).join('');
const communityList = b.communities.map((c) => `<li>${esc(c)}</li>`).join('');

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Contact</p>
<h1>Service Area, Hours &amp; Contact</h1>
<p class="lede">Hard Knox Auto Glass is a mobile-only service for ${esc(b.county)}, ${esc(b.state)}. There is no shop to visit. Check that we cover your area below, then call, text or email for a free, no-obligation quote.</p>
</div></section>

<section class="section"><div class="wrap page-grid">
<div class="prose">
<h2 id="call-or-text">Call or text for a free quote</h2>
<p class="cta-number">Phone and text: ${PHONE_NB}</p>
<div class="cta-buttons">
  ${telLink('btn btn-gold', icon('phone') + 'Call ' + PHONE_NB)}
  ${smsLink('btn btn-outline', icon('sms') + 'Text ' + PHONE_NB)}
</div>
<p class="copy-wrap"><button class="btn btn-outline btn-small copy-btn" type="button" data-copy="${esc(b.phoneDisplay)}">${icon('copy')}Copy number</button><span class="copy-status" role="status" aria-live="polite"></span></p>
${securityNotice()}
<p>Tapping Call or Text opens your phone's dialer or messaging app with the number filled in; nothing is sent until you send it. On a computer without a phone app, select the number above and copy it.</p>

<h2 id="email">Email</h2>
<p>Email is the slower route; calls and texts get the quickest reply. If you prefer email, write to <a href="mailto:${esc(b.email)}">${esc(b.email)}</a> (<span class="email">${esc(b.email)}</span>). Please keep insurance documents, card details and other sensitive information out of email, too.</p>

<h2 id="hours">Hours</h2>
<p><strong>${esc(b.hoursDisplay)}.</strong> Closed Sunday. These are the hours for calls, texts and email replies; a particular appointment is subject to availability, and Brandon will offer times when he confirms your quote.</p>

<h2 id="what-to-send">What to send for a quote</h2>
${S.quoteChecklist()}

<h2 id="area">Service area: Hamilton County, Tennessee</h2>
<p>Mobile service covers all of ${esc(b.county)}, including Chattanooga and these cities, towns and communities:</p>
<h3>Cities and towns</h3>
<ul class="area-list">${cityList}</ul>
<h3>Communities</h3>
<ul class="area-list">${communityList}</ul>
<p>If your part of the county is not named, it is still covered; the list is there to help you recognize your area.</p>

<h2 id="adjacent">Just outside Hamilton County?</h2>
<p>If you are in a community directly adjacent to Hamilton County, call or text to confirm availability for your location. ${esc(cfg.strings.travelLine)} Within Hamilton County, mobile service is part of the quoted price. A free quote means the quote costs nothing; the final price is confirmed once the vehicle, the work, the location and any travel charge are known, and before any work is scheduled.</p>

<h2 id="where">Where the work happens</h2>
<p>Brandon comes to your home, your workplace or another approved location: a reasonably level spot with room to open the doors and hood, sheltered from heavy rain and strong wind, where the vehicle can stay parked while the work is done. He confirms the exact address by phone when the job is scheduled, so there is no need to put it in a first text. Weather or unsuitable site conditions can require rescheduling; there is no cancellation fee. <a href="/services/#site">More on suitable locations</a>. ADAS calibration has its own requirements, explained on the <a href="/adas-recalibration/#site">ADAS calibration page</a>.</p>

<h2 id="accessibility">Need another way to reach us?</h2>
<p>If a phone call is difficult for you, text or email works just as well for quotes, scheduling and warranty questions. See the <a href="/accessibility/">accessibility page</a> for more about the help available and how to report a problem with this site.</p>

<h2 id="privacy">What happens with your details</h2>
<p>Calls, texts and emails go to Brandon and are used to answer you and arrange the work. The <a href="/privacy/">privacy notice</a> explains what is kept, who provides the phone and email services, and how to ask a question about your information.</p>
</div>

<aside class="aside" aria-labelledby="aside-h">
<h2 id="aside-h">At a glance</h2>
<dl class="defs">
<dt>Call or text</dt><dd>${PHONE_NB}</dd>
<dt>Email</dt><dd><span class="email">${esc(b.email)}</span></dd>
<dt>Hours</dt><dd>${esc(b.hoursDisplay)}</dd>
<dt>Service area</dt><dd>${esc(b.county)}, ${esc(b.state)}, including Chattanooga. Adjacent communities by confirmation.</dd>
<dt>Shop address</dt><dd>None. Mobile service only.</dd>
<dt>Quotes</dt><dd>Free, no obligation.</dd>
<dt>Payment</dt><dd>Card or cash, due upon completion.</dd>
</dl>
</aside>
</div></section>
`;

module.exports = {
  url,
  title: 'Service Area & Contact | Hard Knox Auto Glass',
  description: 'Call or text (865) 299-3533 for a free quote. Mobile auto glass across Hamilton County, TN, including Chattanooga and East Ridge. Mon–Sat 7:30 AM–6:00 PM ET.',
  breadcrumbs: trail,
  body,
  jsonld: [S.breadcrumbList(trail)],
};
