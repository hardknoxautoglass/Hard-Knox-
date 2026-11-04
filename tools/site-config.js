'use strict';
// Single private master record for facts that appear on the site.
// Change a value here, rebuild, and every page, meta tag and JSON-LD block updates together.
// Anything NOT in the owner-supplied record is a default and is listed in docs/owner-checklist.md.

module.exports = {
  // Canonical host (DEFAULT pending owner answer F7). Lowercase, no www, trailing slash.
  origin: 'https://hardknoxautoglass.com',

  business: {
    name: 'Hard Knox Auto Glass',
    // Owner's name is intentionally not published anywhere on the site (owner instruction 2026-11-04).
    phoneDisplay: '(865) 299-3533',
    phoneE164: '+18652993533',
    email: 'HardKnoxAutoGlass@gmail.com',
    domainDisplay: 'HardKnoxAutoGlass.com',
    // Contact/business hours. A particular appointment is subject to availability.
    hoursDisplay: 'Monday–Saturday, 7:30 AM–6:00 PM Eastern Time',
    hoursShort: 'Mon–Sat 7:30 AM–6:00 PM ET',
    hoursSpec: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:30', closes: '18:00' },
    county: 'Hamilton County',
    state: 'Tennessee',
    stateAbbr: 'TN',
    // Owner-supplied Hamilton County cities and communities (order kept as supplied, grouped for reading).
    cities: ['Chattanooga', 'Collegedale', 'East Ridge', 'Lakesite', 'Lookout Mountain', 'Red Bank', 'Ridgeside', 'Signal Mountain', 'Walden'],
    communities: ['Ooltewah', 'Harrison', 'Apison', 'Middle Valley', 'Sale Creek'],
  },

  // Verbatim required strings (do not edit without owner instruction).
  strings: {
    securityNotice: 'For your security, please do not text payment-card, bank-account, insurance-policy, claim, or other sensitive information.',
    quoteLine: 'Call or text for a free quote.',
    travelLine: 'Any mobile/travel charge is quoted before service.',
    servingLine: 'Serving Hamilton County and nearby adjacent communities.',
    guaranteePreview: 'Our limited guarantee covers defects in our auto-glass installation workmanship and in glass we supply and install for as long as the original customer owns the vehicle. Coverage and exclusions apply.',
    adasInterim: 'Hard Knox Auto Glass offers ADAS calibration. Call or text with your vehicle year, make, model and general location so we can confirm the arrangements for your vehicle.',
  },

  // Warranty document version in force for the launch release.
  warranty: { version: '1.0', effective: 'November 4, 2026', effectiveISO: '2026-11-04' },
  privacy: { effective: 'November 4, 2026', effectiveISO: '2026-11-04' },
  copyrightYear: '2026',

  // Six service targets (used by Home cards, Services, footer and markup).
  services: [
    { key: 'windshield', name: 'Windshield Replacement', url: '/windshield-replacement/', icon: 'windshield',
      blurb: 'Full windshield replacement at your home, workplace or another suitable location. Aftermarket glass available; OEM glass may be available on request.' },
    { key: 'chip', name: 'Windshield Chip Repair', url: '/rock-chip-repair/', icon: 'chip',
      blurb: 'Resin repair of eligible rock chips, assessed in person. If a repaired chip spreads, what you paid for the repair is credited toward a full replacement.' },
    { key: 'door', name: 'Door Glass Replacement', url: '/door-quarter-back-glass/#door-glass', icon: 'door',
      blurb: 'Replacement of broken side window glass in a front or rear door, including cleanup of the glass that fell inside the door.' },
    { key: 'quarter', name: 'Quarter Glass Replacement', url: '/door-quarter-back-glass/#quarter-glass', icon: 'quarter',
      blurb: 'Replacement of the smaller fixed or vent pane behind the rear door or in the rear pillar.' },
    { key: 'back', name: 'Back Glass Replacement', url: '/door-quarter-back-glass/#back-glass', icon: 'back',
      blurb: 'Replacement of the rear windshield, including panes with defroster lines, and cleanup of broken glass.' },
    { key: 'adas', name: 'ADAS Calibration', url: '/adas-recalibration/', icon: 'adas',
      blurb: 'Calibration of windshield-mounted camera systems that some vehicles require after a windshield is replaced. Arrangements depend on your vehicle and the required procedure.' },
  ],

  nav: [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services/' },
    { label: 'About Us', url: '/about/' },
    { label: 'Contact Us', url: '/service-area-contact/' },
  ],

  policies: [
    { label: 'Limited Warranty / Service Guarantee', url: '/warranty/' },
    { label: 'Privacy Notice', url: '/privacy/' },
    { label: 'Website Terms of Use', url: '/terms/' },
    { label: 'Cancellation & Refund Policy', url: '/cancellation-refund-policy/' },
    { label: 'Accessibility', url: '/accessibility/' },
  ],
};
