'use strict';
const cfg = require('../site-config');
const { esc } = require('../layout');
const S = require('./_shared');

const url = '/accessibility/';
const trail = [S.trailHome, { label: 'Accessibility', url }];
const b = cfg.business;

const body = `
<section class="page-intro"><div class="wrap">
<p class="eyebrow">Accessibility</p>
<h1>Accessibility</h1>
<p class="doc-meta">Last updated ${esc(cfg.privacy.effective)}.</p>
<p class="lede">${esc(b.name)} wants everyone to be able to find out what we do, read the guarantee, and reach us for a quote. This page says what help is available, how the site was built and tested, and how to tell us about a problem. It states only what has actually been checked.</p>
</div></section>

<section class="section"><div class="wrap">
<div class="prose">
<h2 id="help">Getting help or a quote another way</h2>
<ul>
<li><strong>By phone:</strong> call ${esc(b.phoneDisplay)}, ${esc(b.hoursDisplay)}.</li>
<li><strong>By text:</strong> text the same number. Texting works for quotes, scheduling and warranty questions, and is a full alternative if a voice call is difficult for you.</li>
<li><strong>By email:</strong> <span class="email">${esc(b.email)}</span>. Email is slower than a call or text but is answered.</li>
<li><strong>In person:</strong> Brandon can read you the guarantee or any page of this site, and can bring a paper copy of the guarantee to the appointment. Ask when you book.</li>
</ul>
<p>The <a href="/service-area-contact/">contact page</a> has all of these options with working links.</p>

<h2 id="built">How the site is built</h2>
<ul>
<li>Plain HTML pages with a consistent layout: a skip link to the main content, one main heading per page, a logical heading order, and named landmarks for navigation, main content and footer.</li>
<li>Every control is a real link or button and works with a keyboard alone, with a visible two-color focus ring. The mobile menu button announces its name and whether the menu is open, and the Escape key closes it and returns focus to the button.</li>
<li>Text, links and buttons meet the WCAG 2.2 Level AA contrast minimums in their default, hover and focus states, measured with the actual colors used.</li>
<li>Text can be resized to 200% and the page reflows to a 320-pixel-wide window without sideways scrolling. Browser text-spacing overrides and the operating-system "reduce motion" setting are respected; the site has no animation that carries information and no time limits.</li>
<li>The Call and Text buttons are at least 44 by 44 pixels. On phones they stay at the bottom of the screen with the security notice; on short or sideways screens and at high zoom they move into the page so they never cover content or a focused control.</li>
<li>Everything works without JavaScript: navigation, every page, the guarantee, and the phone, text and email links.</li>
<li>Decorative icons are hidden from assistive technology and always accompanied by text. The one illustration on the homepage has a text description.</li>
<li>The guarantee page prints completely, including every section, so it can be read on paper or saved as a PDF.</li>
</ul>

<h2 id="tested">How it has been tested</h2>
<p>Before release, every page, including the error page and the policy pages, was checked with:</p>
<ul>
<li>automated accessibility testing (axe-core) in the Chromium browser at phone and desktop sizes, with no violations outstanding;</li>
<li>keyboard-only operation of the navigation, menu, expandable questions, in-page links and contact links in Chromium;</li>
<li>reflow at 320 CSS pixels wide (equivalent to 400% zoom on a 1280-pixel screen), 200% text size, text-spacing overrides, and short landscape screens;</li>
<li>a JavaScript-disabled pass of every page;</li>
<li>a print check of the guarantee page.</li>
</ul>
<p><strong>What has not yet been done:</strong> testing with screen readers on physical devices (such as NVDA on Windows and VoiceOver on iPhone) and in Safari, Firefox, Edge and Samsung Internet. Those checks are planned and this page will be updated when they are complete. If you use one of those and something does not work, we would like to hear about it.</p>

<h2 id="standard">The standard we aim for</h2>
<p>The target is the <a href="https://www.w3.org/TR/WCAG22/">Web Content Accessibility Guidelines (WCAG) 2.2</a>, Level AA, across every page. We do not claim a certification, and no automated score is treated as proof of accessibility; the guidelines are the yardstick and real use is the test.</p>

<h2 id="report">Report a barrier</h2>
<p>If any part of this site is hard to use, or you could not reach us the way you wanted to, please tell us. Say which page, what you were trying to do, and the browser or assistive technology you were using, if you know it.</p>
<ul>
<li>Call or text ${esc(b.phoneDisplay)} (${esc(b.hoursShort)}).</li>
<li>Email <span class="email">${esc(b.email)}</span>.</li>
</ul>
<p>Messages go to Brandon, the owner, and are read during business hours. You will get a reply, and real problems get fixed.</p>
</div>
</div></section>
`;

module.exports = {
  url,
  title: 'Accessibility | Hard Knox Auto Glass',
  description: 'How HardKnoxAutoGlass.com works with keyboards, screen readers and zoom, the help available by phone, text or email, and how to report a barrier.',
  breadcrumbs: trail,
  body,
  jsonld: [S.breadcrumbList(trail)],
};
