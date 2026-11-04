'use strict';
const { icon } = require('../layout');
module.exports = {
  url: '/404.html',
  file: '404.html',
  title: 'Page Not Found | Hard Knox Auto Glass',
  description: 'That page could not be found. Go to the homepage, compare services, or get a free quote from Hard Knox Auto Glass.',
  noindex: true,
  inSitemap: false,
  navCurrent: null,
  bodyClass: 'page-404',
  body: `<section class="wrap notfound">
<h1>We can't find that page</h1>
<p class="lede">The address may be mistyped, or the page may have moved. Nothing has been lost on your end. Try one of these:</p>
<ul>
<li><a class="btn btn-gold" href="/">${icon('house')}Home</a></li>
<li><a class="btn btn-outline" href="/services/">${icon('windshield')}Services</a></li>
<li><a class="btn btn-outline" href="/service-area-contact/">${icon('phone')}Contact and free quote</a></li>
</ul>
<p>Or call or text (865) 299-3533 for a free quote.</p>
</section>`,
};
