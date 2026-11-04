# Hard Knox Auto Glass — Website build plan (v0.1, 2026-11-04)

**Status: plan only, for owner approval.** No production code is generated until Brandon approves this plan. Plan approval is not permission to access accounts, upload to a live folder, edit a Business Profile, change DNS, purchase anything or submit data to third parties. Publication needs its own explicit authorization later.

Everything below uses the owner-supplied business record as fact. Nothing in this plan asks for a fact the record already supplies.

---

## 1A. Design questions (owner decides; each has a default so nothing stalls)

| # | Question | Default if no answer |
|---|---|---|
| D1 | **Logo file.** The shield badge exists only inside the business-card and van images. Can you send the original logo as SVG, or a PNG with a transparent background at least 1,500 px wide? | An original SVG wordmark ("HARD KNOX / AUTO GLASS" in forest green with a gold rule) plus the "Veteran Owned & Operated" ribbon lockup. No shield is cropped out of a card image: too low-resolution, and the rights trail is unclear. |
| D2 | **Headline typeface.** (a) System font stack only: zero font bytes, fastest, least brand echo. (b) One self-hosted open-licensed (SIL OFL) display face in two weights, ~40–60 KB total, license bundled, body text still in the system stack. | (b), using a heavy geometric sans close to the card's "Mobile Auto Glass" lettering (Montserrat ExtraBold is the closest open-licensed match). |
| D3 | **Hero visual.** (a) Typographic hero with the gold-ribbon signature and an original line illustration of a windshield/vehicle outline (no people, plates or places). (b) The van image, **only** if it is a real photograph of your actual van and you hold the rights (it reads as a rendering/mockup). | (a). A cleared real photo can replace the illustration later without a layout change. |
| D4 | **Taglines.** The cards carry "We come to you!" and "Your location. Our expertise." Use both as short supporting lines (never as the H1)? | Yes, both. The van's "HOME · WORK · ANYWHERE" line is **not** used: "anywhere" contradicts the county-based service area. The site says "home, workplace or another suitable location." |
| D5 | **Single light theme.** No dark mode: one measured palette, matches print. Reduced motion, zoom and text-spacing overrides are honored regardless. | Single light theme. |

## 1B. Missing publication facts (not in the record)

| # | Fact needed | Why / what it affects |
|---|---|---|
| F1 | **Legal name and form** behind the DBA (e.g., "Brandon Layne d/b/a Hard Knox Auto Glass" or "Hard Knox Auto Glass LLC"). | Warrantor line in the warranty document (FTC written-disclosure rule, 16 CFR 701.3(a)(1)); Terms page. The footer can stay "© 2026 Hard Knox Auto Glass." |
| F2 | **Warranty correspondence address.** The FTC rule wants a warrantor mailing address (or the name/title and address of whoever handles warranty performance), or a phone number consumers can use **without charge**. (865) 299-3533 is a local number, not toll-free. A USPS PO Box or private mailbox would satisfy it without exposing a home address. Do you have one, or will you get one? | Warranty page "How to make a claim" section. Flagged as a warranty-page launch item if the rule applies (see §5, C4). |
| F3 | **ADAS fulfillment facts** (full question list in §5, C1). | Homepage H1 choice, hero qualification, ADAS page, warranty "calibration" section, Service markup. Draft wording from the brief is used meanwhile. |
| F4 | **Licensed & insured evidence.** Do you currently hold (a) general liability insurance covering mobile auto-glass work and (b) a business tax license (City of Chattanooga / Hamilton County)? Share carrier, policy period and license type **privately**; nothing is published from the documents. | Whether "Licensed & Insured" appears anywhere. Default: it appears nowhere. |
| F5 | **Communication and payment providers** (privacy notice and private data-flow record). Is (865) 299-3533 a carrier mobile line or a VoIP/app number (e.g., Google Voice)? Who else can see texts/voicemail? Any forwarding, recording or auto-reply? Which card reader/processor do you use at completion? Where do work orders/invoices live (paper, app)? Does any calibration partner receive customer or vehicle details? | Privacy notice accuracy; cancellation/refund page (payment). |
| F6 | **Hosting and domain facts.** Exact Hostinger product (e.g., Premium/Business Web Hosting vs. "Website Builder": Builder plans cannot serve uploaded HTML). Where HardKnoxAutoGlass.com is registered and where DNS is managed. Whether anything is live at the domain today (this build environment's network policy blocks that host, so I could not check). Any existing DNS/email records. Who will do the upload (you, or me under separate authorization). | §6 entirely; whether a migration map is needed. |
| F7 | **Canonical host.** `https://hardknoxautoglass.com/` (recommended: lowercase, no www) or `https://www.hardknoxautoglass.com/`. Print shows "HardKnoxAutoGlass.com"; that is fine, hostnames are case-insensitive. | Every canonical tag, sitemap, JSON-LD identifier, redirects. |
| F8 | **Work order / adhesive instructions.** Does your work order (paper or digital) state a safe drive-away time per job? Send a blank copy. | Whether the brief's safety callout can be used verbatim on the windshield and warranty pages. |
| F9 | **Reporting alternative.** Confirm a customer who cannot make a voice call may text the same number or email HardKnoxAutoGlass@gmail.com to report a warranty issue. | Warranty "How to report a problem"; Accessibility page. Planned default: yes, both. |
| F10 | **Google Business Profile.** Does one exist? If so, its current name, phone, category, service areas and hours as displayed. | Reconciliation sheet only. I will not edit a listing. |
| F11 | **Real photographs** you have rights to (you, the actual van, actual completed work) and permission to show them. | Hero and About imagery. Default: none used; no stock or generated imagery presented as real. |
| F12 | **Pre-site warranty wording.** Did customers before this launch receive any written guarantee? If so, send it so the correct older version is archived privately for their jobs. | Warranty versioning. |

---

## 2. Page architecture, URLs, navigation and homepage order

Every slash-ended route is served from its own `index.html`. Thirteen public pages are indexable, self-canonical and in the sitemap; `404.html` is served with HTTP 404 and is not in the sitemap.

```
/                              Home
/services/                     Service comparison + what to have ready
/windshield-replacement/
/rock-chip-repair/
/door-quarter-back-glass/      anchors: #door-glass  #quarter-glass  #back-glass
/adas-recalibration/
/about/
/service-area-contact/
/warranty/                     Hard Knox Auto Glass Limited Warranty / Service Guarantee (stable section anchors)
/privacy/
/terms/
/cancellation-refund-policy/
/accessibility/
/404.html                      HTTP 404; links to Home, Services, Contact
/assets/css/site.css  /assets/js/menu.js  /assets/img/…  /assets/fonts/… (if D2 = b)
/robots.txt  /sitemap.xml  /.htaccess
```

**Header (all pages):** logo linking home; Home, Services, About Us, Contact Us; desktop "Call (865) 299-3533" button. Mobile: one native `<button aria-expanded>` controlling the same `<nav>`; without JavaScript the navigation is simply visible. **Mobile bottom bar:** Call (gold, dark lettering) and Text (cream outline) with the full security notice directly above them; at short landscape heights or 400% zoom the bar and notice move into normal page flow.

**Footer (all pages):** guarantee summary + "Read Full Guarantee"; six service links; contact block (phone as selectable text with `tel:`/`sms:` links, email as plain text, hours, service-area line, security notice); policy links: Warranty, Privacy, Terms, Cancellation & Refund Policy, Accessibility; "© 2026 Hard Knox Auto Glass."

**Breadcrumbs:** on every interior page (Home › Services › Windshield Replacement; Home › Warranty). BreadcrumbList markup mirrors them exactly.

**Cross-links:** windshield → chip repair, ADAS, warranty#replacement, cancellation (travel charge); chip → windshield, warranty#chip-repair-credit; door/quarter/back ↔ windshield; ADAS ↔ windshield, warranty#adas-calibration; every service page → Services, Contact. All reachable by ordinary links with no script and no sitemap.

**Homepage order:** (1) header; (2) hero: "Veteran Owned & Operated" ribbon, H1 "Mobile Auto Glass Repair, Replacement & ADAS Calibration" (alternate H1 pending C1), Hamilton County and Chattanooga named, "We come to you" sentence describing homes, workplaces and other suitable locations with the calibration qualification beside it, "Call for a Free Quote" / "Text for a Free Quote" and "Serving Hamilton County and nearby adjacent communities"; (3) credentials strip: veteran owned, Brandon's 10+ years in auto glass, mobile service (licensing/insurance line only if F4 clears); (4) six service cards with original icons, factual one-liners and links, the three side/rear cards pointing at their anchors; (5) how it works: call or text → confirm vehicle, scope, location, price and availability → work at a suitable site, plus an accurate calibration note; (6) why Hard Knox: local roots, experience, National Guard mechanic background, direct contact, limited guarantee; (7) guarantee preview with the approved sentence, "Read Full Guarantee," and one line each flagging the chip credit and separate ADAS terms; (8) service area with adjacent coverage by confirmation, then an About preview; (9) FAQs (services, mobile visits, quote info, payment, hours, area/travel charges, guarantee, ADAS); (10) closing contact panel: Call/Text, copyable number, hours, area, notice; footer. No map, price badge, autoplay, parallax or animation-only information.

---

## 3. Visual direction and asset gaps

### Palette, measured from the supplied card and van images

Hex values are read from the images (approximate). If official brand codes exist, they replace these. Every pair below was computed, not estimated.

| Token | Hex | Source in the images | Use |
|---|---|---|---|
| Forest 900 | `#0B3526` | darkest wrap-panel green | footer, bottom bar, deep headings |
| Forest 700 | `#14523B` | badge field, card bottom band | header, hero, secondary buttons, links on cream |
| Forest 600 | `#1B6A4C` | — | hover/active states |
| Ink | `#10271D` | card lettering (near-black green) | body text |
| Cream | `#F6F3EB` | card background | page background |
| Cream deep | `#ECE7DA` | — | alternating sections, table stripes |
| White | `#FFFFFF` | van body | cards |
| Gold 500 | `#C9A227` | metallic wrap stripe, badge rim | primary button fill (dark lettering), ribbon, rules on green |
| Gold 300 | `#E8D27A` | stripe highlight | eyebrow text and focus ring on green |
| Gold 600 | `#A8841A` | — | meaningful icons/rules on cream |
| Amber 700 | `#9A5B08` | darkened card amber (`#D9901F`-ish fails on cream) | small accent text on cream |

| Pair | Ratio | Verdict |
|---|---|---|
| Ink on cream / on white | 14.24 / 15.79 | body text, pass |
| Forest 700 on cream (headings, links) | 8.23 | pass |
| Forest 600 on cream (hover) | 5.90 | pass |
| White on Forest 700 / Forest 900 | 9.13 / 13.54 | pass |
| Gold 300 text on Forest 700 | 6.06 | pass |
| Gold 500 on Forest 700 (ribbon, rules: non-text) | 3.77 | pass ≥ 3:1 |
| Forest 900 / Ink on Gold 500 (button lettering) | 5.60 / 6.53 | pass |
| **White on Gold 500** | **2.42** | **fail: never used** |
| Gold 500 on cream | 2.18 | decorative only; meaningful icons use Gold 600 (3.17) |
| Amber 700 small text on cream | 4.89 | pass; the card's lighter amber is not used for small text |
| Gold 500 ring on Forest 600 hover | 2.70 | fail: focus ring is a double ring (2 px Gold 300 + 2 px Forest 900) so it passes on every surface |

### Type, layout, signature

- **Type:** display face per D2; body `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. 16 px base (17 px from 768 px), fluid headings via `clamp()` (H1 2–2.75 rem), line-height 1.55, measure ≤ 65ch.
- **Layout:** mobile-first single column; service cards 2-up from 640 px, 3-up from 960 px; content max 72 rem; 16 px gutters; safe-area insets on the bottom bar; 6 px corners; 1 px borders.
- **Signature element:** the **gold ribbon**: a flat 6 px gold gradient rule under the green header and between major sections, echoing the wrap stripe; and the "Veteran Owned & Operated" ribbon lockup (gold on forest, two stars) in the hero exactly as on the card and van. Everything else stays quiet.
- **Icons:** original inline SVG line icons (windshield, chip starburst, door glass, quarter glass, back glass, sensor car) in the card's style, `aria-hidden`, always beside a text label.
- **Imagery rules:** no stock photos; nothing generated is presented as real; the card and van images themselves are not published (they carry a mockup look and old-layout risk). Real photos, if supplied, are inspected for plates, addresses, embedded text and EXIF/GPS before export and logged in `docs/asset-rights-log.md`.

### Asset gaps

1. Logo file (D1). 2. Font decision (D2). 3. Real photographs (F11, optional). 4. Official brand hex codes (optional).

### Reference-material conflicts noted

- The van omits ADAS; the card and the record include it → the site includes it.
- The van says "ANYWHERE" → not used (see D4).
- The card says "ADAS Recalibration" → copy uses "ADAS calibration (sometimes called recalibration)"; the URL stays `/adas-recalibration/` as specified.

---

## 4. Page table

| URL | Intent | Proposed title | Proposed description | H1 | Customer question answered | Evidence | Links in → out |
|---|---|---|---|---|---|---|---|
| `/` | Identify the mobile business, six services, coverage, quote options | Mobile Auto Glass in Hamilton County, TN \| Hard Knox Auto Glass | Veteran-owned mobile auto glass for Chattanooga and Hamilton County, TN: windshield replacement, chip repair, door, quarter and back glass, ADAS calibration. Call or text (865) 299-3533 for a free quote. | Mobile Auto Glass Repair, Replacement & ADAS Calibration | Who fixes my auto glass where the car is parked, and how do I get a quote? | Business record; C1 for ADAS wording | In: every page (logo, breadcrumbs, 404). Out: 6 service targets, Services, About, Contact, Warranty, all policies |
| `/services/` | Compare six services, choose a detail page, know what to have ready | Auto Glass Services \| Hard Knox Auto Glass | Compare mobile windshield replacement, rock chip repair, door, quarter and back glass replacement, and ADAS calibration from Hard Knox Auto Glass, and see what to have ready for a free quote. | Mobile Auto Glass Services | Which service do I need, and what do I tell you for a quote? | Record (services list) | In: nav, Home cards, footer. Out: 5 detail pages (+3 anchors), Contact, Warranty |
| `/windshield-replacement/` | Understand replacement, glass options, suitable sites, calibration | Mobile Windshield Replacement \| Hard Knox Auto Glass | Windshield replacement at your home, workplace or another suitable location in Chattanooga and Hamilton County, TN. Aftermarket glass available, OEM on request. Some vehicles need ADAS calibration. Free quotes by call or text. | Mobile Windshield Replacement in Hamilton County, TN | Can it be done where I am, which glass, and will it need calibration? | Record; C1; C3 (drive-away callout); C10 (OEM) | In: Home card, Services, chip, ADAS, side/rear. Out: chip repair, ADAS, warranty#replacement, cancellation, Contact |
| `/rock-chip-repair/` | Request assessment, understand limits, understand the replacement credit | Windshield Chip Repair \| Hard Knox Auto Glass | Mobile windshield rock chip repair in Hamilton County, TN. What repair can and cannot do, when replacement is the better call, and how the repair credit toward a full replacement works. | Windshield Rock Chip Repair | Can this chip be repaired, and what happens if it spreads? | Record; guarantee chip clause | In: Home card, Services, windshield. Out: windshield, warranty#chip-repair-credit, Contact |
| `/door-quarter-back-glass/` | Identify the pane; three named sections | Door, Quarter & Back Glass Replacement \| Hard Knox Auto Glass | Mobile replacement of door glass, quarter glass and back glass in Chattanooga and Hamilton County, TN. Find which pane you need, what to expect, then call or text for a free quote. | Door, Quarter & Back Glass Replacement | Which window is this, and can it be replaced on site? | Record | In: three Home cards (anchored), Services, windshield. Out: windshield, warranty, Contact |
| `/adas-recalibration/` | Plain-English ADAS, verified arrangements, limits, next step, separate terms | ADAS Calibration \| Hard Knox Auto Glass | What ADAS calibration is, why some windshields need it, and how Hard Knox Auto Glass arranges it for vehicles in Hamilton County, TN. Call or text with your year, make, model and location. | ADAS Calibration After Windshield Replacement | Does my car need calibration, and can you do it in my driveway? | C1 facts; draft wording until then | In: Home card, Services, windshield, warranty. Out: windshield, warranty#adas-calibration, Contact |
| `/about/` | Introduce Brandon; summarize services without invented history | About Brandon Layne \| Hard Knox Auto Glass | Hard Knox Auto Glass is owned by Brandon Layne, born and raised in Hamilton County, a veteran with more than 10 years in auto glass and six years as an Army National Guard mechanic. Mobile service, direct contact. | About Hard Knox Auto Glass | Who is working on my car, and why trust them? | Record biography (owner-confirmed) | In: nav, Home preview. Out: Services, Contact, Warranty |
| `/service-area-contact/` | Check coverage, hours, travel charge; call, text or email | Service Area & Contact \| Hard Knox Auto Glass | Call or text (865) 299-3533 for a free quote. Mobile auto glass across Hamilton County, TN: Chattanooga, East Ridge, Red Bank, Signal Mountain, Ooltewah and more. Mon–Sat 7:30 AM–6:00 PM ET. | Service Area, Hours & Contact | Do you come to my town, when, and how do I reach you? | Record (14 communities, hours, travel rule); C9 | In: nav, every page's CTA, footer. Out: Services, cancellation (travel), accessibility, privacy; the site's only `mailto:` |
| `/warranty/` | Read full guarantee; distinguish remedies; how to report | Limited Warranty / Service Guarantee \| Hard Knox Auto Glass | Full terms of the Hard Knox Auto Glass limited guarantee: covered workmanship and glass defects, remedies, the chip-repair credit, exclusions, calibration terms and how to report a problem. | Hard Knox Auto Glass Limited Warranty / Service Guarantee | What is covered, how long, and what do I do if something goes wrong? | Record guarantee table; F1, F2, F8, F9, C4 | In: Home, footer, every service page. Out: Contact, cancellation, chip repair, ADAS |
| `/privacy/` | Browsing vs. contacting; where to ask | Privacy Notice \| Hard Knox Auto Glass | What happens when you browse HardKnoxAutoGlass.com and when you call, text or email Hard Knox Auto Glass, which providers are involved, and where to send a privacy question. | Privacy Notice | What do you collect about me when I visit or contact you? | §7 verification on the real host; F5 | In: footer. Out: Contact, accessibility |
| `/terms/` | Website use, quote inquiries, real authorization route | Website Terms of Use \| Hard Knox Auto Glass | Terms for using HardKnoxAutoGlass.com, how quote inquiries work, and how auto glass work is actually authorized. These terms do not limit the limited guarantee or your statutory rights. | Website Terms of Use | What am I agreeing to by using the site or asking for a quote? | Record commercial terms; C5 | In: footer. Out: warranty, cancellation, privacy, Contact |
| `/cancellation-refund-policy/` | Cancellation, rescheduling, payment, travel, applicable remedy | Cancellation & Refund Policy \| Hard Knox Auto Glass | No cancellation fee. How rescheduling for weather or site conditions works, card or cash payment at completion, mobile/travel charges outside Hamilton County, and which guarantee remedy applies. | Cancellation, Rescheduling & Refund Policy | What if I cancel, the weather turns, or I want a refund? | Record commercial terms; guarantee remedies | In: footer, service pages, Contact. Out: warranty#remedies, Contact |
| `/accessibility/` | Assistance, working way to report a barrier, accessible contact | Accessibility \| Hard Knox Auto Glass | How HardKnoxAutoGlass.com is built to work with keyboards, screen readers and zoom, the help available by phone, text or email, and how to report a barrier. Only tested facts are stated. | Accessibility | I'm having trouble with the site or contacting you: what are my options? | §7 test records; F9 | In: footer, privacy. Out: Contact (phone, text, email) |
| `/404.html` | Recover: Home, Services, Contact | Page Not Found \| Hard Knox Auto Glass | (none; not indexable, served with status 404) | We can't find that page | Where do I go now? | — | Out: Home, Services, Contact; absolute asset paths so nested misses still render |

Titles are kept near 60 characters and descriptions under ~160; exact counts go in the metadata inventory at build.

---

## 5. Claims and policy decisions needing confirmation

| # | Item | Needs | Affects |
|---|---|---|---|
| C1 | **ADAS fulfillment and the H1.** Who performs calibration (Brandon, a partner)? Partner name and permission to name them? Static, dynamic or both? Which makes/systems? Site needs (level floor, lighting, space, targets)? Equipment and training/qualifications? Procedure and records (pre/post scan, report)? Alternate location arrangements? What happens, and who pays, if calibration cannot be completed? Who warrants the calibration and on what terms? | Owner answers; any partner's documented process | Hero H1 (keep as specified if Brandon performs it himself at the service site when conditions allow; otherwise propose "Mobile Auto Glass Repair & Replacement, Plus ADAS Calibration"), hero qualification, Home card and FAQ, windshield page, ADAS page, warranty calibration section, Service markup. Interim wording: "Hard Knox Auto Glass offers ADAS calibration. Call or text with your vehicle year, make, model and general location so we can confirm the arrangements for your vehicle." If the arrangement stays materially unclear, the preview finishes and this is named as the launch blocker. |
| C2 | **Licensed & Insured** | F4 evidence, both current, wording matching scope | Hero, credentials strip, About, footer. Default: absent everywhere. |
| C3 | **Safe drive-away callout** | F8 work-order copy | Windshield page safety section and warranty appendix. If the work order does not carry a per-job time, replacement wording is drafted from how the time is actually communicated; no universal time is ever published. |
| C4 | **Warranty document specifics.** (a) Warrantor identity (F1) and correspondence contact (F2). (b) FTC rule applicability: the guarantee covers supplied glass (a consumer product costing more than $15), so 16 CFR 701.3 disclosure and 702 pre-sale availability are treated as applying unless the owner's facts say otherwise; the document will carry the "Limited" designation and the required "specific legal rights… vary from state to state" sentence, and the incidental/consequential exclusion will carry the required state-variation qualifier. No implied-warranty disclaimer, "as is," exclusive remedy, new fee or shortened deadline is added. (c) Reporting: phone preferred, "preferably within 30 days of noticing," with text/email alternative (F9), never forfeiture. (d) **Decision:** when curing a covered defect needs travel or recalibration, the proposed position is that it is part of the no-charge remedy at the original service area; confirm or adjust. (e) Pre-sale availability in practice: warranty link in the quote text and a paper copy on the van before authorization. (f) Version 1.0 effective on launch date; earlier wording archived per F12. | Owner confirmation; F1, F2, F8, F9, F12 | `/warranty/`, guarantee summaries on Home/footer/service pages, cancellation page, Terms |
| C5 | **Tennessee checks (read at build, facts needed now).** T.C.A. § 56-7-1114 (auto-glass advertising, deductibles, inducements): no copy will call insurer-paid work "free," waive deductibles or recast the chip credit as a deductible incentive; confirm nothing is offered verbally either. T.C.A. § 66-19-104 (repair authorization): tell me how you authorize work today (written/electronic estimate and approval before starting, thresholds, signature or text). FTC Cooling-Off Rule: a customer-initiated request for repair at their home falls in the requested-repair exception; anything sold on site beyond what was requested does not. The handoff will explain this; the site promises or waives nothing. | Owner facts on the real work-order process | Terms, cancellation page, owner handoff |
| C6 | **Privacy applicability (private record).** On the owner's facts (sole mobile operator, no website forms, no accounts, no tracking), the Tennessee Information Protection Act ($25M revenue plus volume thresholds), CCPA/CPRA (no California business nexus, below revenue/volume thresholds) and GDPR Article 3 (no EU establishment or targeting) are expected to be "does not apply on these facts"; CalOPPA is expected "not triggered" because no personal information is collected online through the site, but the notice will still carry an effective date, provider list and a "Do Not Track / GPC" sentence stating there is nothing to opt out of. Cookie/storage law: no cookies or storage planned, so no consent tool. Owner confirms revenue is under $25M and no personal data is sold or shared. | Owner confirmation; F5 | `/privacy/`, data-flow record |
| C7 | **Reviews/testimonials:** none at launch. | Confirm | Home, About |
| C8 | **Hours line.** "Monday–Saturday, 7:30 AM–6:00 PM Eastern" as contact hours; Sunday closed. Should a holiday note appear? Only if true. | Confirm | Contact, footer, JSON-LD `openingHoursSpecification` |
| C9 | **Service-area list.** The 14 named communities, "Tennessee" stated, adjacent communities by confirmation with the travel-charge sentence. Confirm the list is complete and nothing on it is excluded. No Georgia, no radius. | Confirm | Contact, Home, `areaServed` |
| C10 | **Glass sourcing.** "Aftermarket glass available; OEM glass may be available on request." No "OE-equivalent" claim without evidence. | Confirm you can source OEM | Windshield page, Services, FAQ |
| C11 | **Biography wording.** Veteran Owned & Operated; born and raised in Hamilton County; 10+ years auto glass; 15+ years automotive; six years Army National Guard mechanic. Used exactly as supplied, attributed to Brandon, never to the company's age. | Owner sign-off on final sentences | Hero, credentials, About, Why Hard Knox |
| C12 | **Payment detail.** "Card or cash, due upon completion." Any card limits (e.g., no AmEx) or checks? | Confirm | Cancellation page, FAQ |

---

## 6. Host prerequisites and old URLs to preserve

**To confirm in hPanel before any upload (F6):**
1. Product supports uploaded static files: Hostinger shared/cloud **Web Hosting** does (LiteSpeed, File Manager/FTP, `.htaccess` honored, free Let's Encrypt with "Force HTTPS"). **Website Builder** plans do not; that would be flagged, not fixed by purchasing anything.
2. Document root for this domain (`/public_html` for the primary domain, `/domains/hardknoxautoglass.com/public_html` if added later).
3. Registrar and DNS manager for HardKnoxAutoGlass.com; registrar lock and auto-renew status.
4. TLS issued and valid on both `hardknoxautoglass.com` and `www.` before any canonical redirect is enabled.
5. Existing live files, redirects, verification files, and all DNS records (MX, SPF, DKIM, DMARC, TXT) exported and kept. Email is on Gmail, so no mail record depends on the site, but nothing existing is removed.
6. Backups: verify the plan's backup cadence and restore path in hPanel; take a manual off-site backup of current files and dotfiles before cutover.
7. **Preview:** a password-protected directory on a `preview.` subdomain via hPanel's directory password protection (real access control), outside the production root; removed after launch. Hostinger's WordPress staging tool is not used.
8. **Release switch:** upload the release to a sibling folder, verify, then swap folders in one step inside a short window; keep the previous folder outside the web root for rollback.
9. Host controls set from evidence, verified on real responses: custom 404 with status 404, directory listing off, correct MIME types, compression, short revalidating cache for HTML, long immutable cache only for hashed assets, restrictive CSP (self only; JSON-LD is `type="application/ld+json"` and does not execute, tested), `frame-ancestors 'none'`, `base-uri 'self'`, `object-src 'none'`, `form-action 'none'`, `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying unneeded device access. HSTS deferred until renewals have been observed; no subdomains, no preload.

**Old URLs:** unknown whether a site exists today (F6). If one does: inventory its URLs and any known inbound links, map each to a genuine successor with a permanent redirect or return 404/410, never blanket-redirect to Home. Either way the `.htaccess` handles http→https, www→non-www (per F7), `/index.html`→`/`, missing trailing slash→slash, and leaves `tel:`/`sms:`/`mailto:` and verification paths alone. Tracking-parameter variants resolve through the self-canonical, not redirects.

---

## 7. Measurable tests and who can run them

| Test | Method / tool | Pass condition | Who | Where |
|---|---|---|---|---|
| HTML validity | `html-validate` on every page | 0 errors | Builder | Local |
| Link, anchor and orphan crawl | Node crawler from `/` | 0 broken links/anchors, every page reachable, crawl set = sitemap set | Builder | Local, then preview |
| Metadata inventory | Script | unique titles/descriptions, one H1, one absolute self-canonical per page, 200 status | Builder | Local, preview, live |
| Automated accessibility | axe-core via Playwright (Chromium) at 360 px and 1280 px, every route incl. 404 and policies | 0 violations | Builder | Local |
| Contrast | computed table (§3) + axe | normal ≥ 4.5:1, large/non-text ≥ 3:1 in default, hover, focus, active | Builder | Local |
| Keyboard | scripted + manual: skip link, tab order, menu open/close/Escape/focus return, disclosures, anchor jumps, no trap, no obscured focus with bottom bar | all pass | Builder (Chromium); Owner on real devices | Local / device |
| Screen readers | NVDA + Chrome/Firefox (Windows); VoiceOver + Safari (iPhone) | names, states, landmarks, headings, link purpose announced; contact handoff works | **Owner** (step script supplied; the build container cannot run them) | Device |
| Reflow and zoom | Playwright at 320 px; 1280 px viewport at 400% (320 CSS px); 200% text; text-spacing override CSS; 568×320 landscape with bottom bar and full notice | no horizontal scroll, no clipped notice or footer link | Builder | Local |
| Reduced motion, no-JS, print | `prefers-reduced-motion`; `javaScriptEnabled:false` on every route; warranty print to PDF | content, nav, warranty, phone, text, email all reachable; print complete | Builder | Local |
| Performance | Lighthouse mobile profile (throttled), 3 cold runs each for Home, windshield page, warranty page and Contact; transferred bytes logged | median LCP ≤ 2.5 s lab, CLS ≤ 0.1, no layout jumps; lab interaction checks (menu, disclosures) | Builder | Local, repeated on preview |
| Network, cookies, storage | Playwright request log, cookies, localStorage/sessionStorage/IndexedDB, service workers; first and repeat visit; navigation and contact handoff | 0 off-origin requests, 0 cookies, 0 storage, 0 workers | Builder locally; Builder/Owner on Hostinger preview (host-injection check); repeat live | Local → preview → live |
| Redirect / 404 matrix | local emulation (not proof of host) → real LiteSpeed on preview → live | each variant lands on the clean URL, no loops/chains; nested missing URL returns 404 with styles | Builder local; authorized access for preview/live | Local → preview → live |
| Structured data | local JSON syntax + vocabulary review; Schema Markup Validator in **code-snippet** mode (no preview URL submitted); Rich Results Test on the live URL only | agrees with visible text; LocalBusiness feature expected **ineligible** (no address) and recorded as a limitation, not an error | Builder; live step at cutover | Local → live |
| Six standalone answer tests | table of URL, heading, expected meaning, observed text | all six preserved across hero, cards, FAQs, metadata, markup | Builder writes; **Owner** reads and confirms | Review |
| Real-device contact handoff | iPhone Safari, Android Chrome, Samsung Internet: tap Call → dialer shows the number; tap Text → composer addressed, nothing sent; Contact `mailto:` opens mail addressed; number copyable on desktop | correct number, no auto-send | **Owner** (steps supplied) | Device |
| Cross-browser | Chromium automated here; Firefox, Safari, Edge, Samsung Internet by hand | layout, menu, links, print | Owner (or an authorized session with those browsers) | Device |
| Host headers and controls | curl/browser on real responses | headers as in §6 item 9; listing off; 404 status | Builder with authorized preview access, else Owner with exact commands | Preview, live |
| Restore drill | upload known-good backup to the preview folder, verify, remove | site restores in one step | Authorized cutover phase | Preview |
| Field performance | aggregate field reports post-launch, no tags | report or "insufficient field data" | Owner, with instructions | After launch |

Each result is recorded as release / environment / path / expected / observed / method-device / date / status, with three separate conclusions: **preview verified**, **authorized deployment verified**, **post-launch observations**. A local check is never promoted to a live pass. With an essential device check outstanding, the package is labelled "ready for owner testing," not "launch verified."

---

## Repository layout (proposed)

```
site/        exact contents of the public ZIP (becomes public_html)
docs/        private owner handoff: this plan, owner checklist, claims ledger, privacy
             data-flow record, deploy/rollback guide, content & maintenance guide,
             page/metadata/link inventory, asset-rights log, validation report,
             Google Business Profile reconciliation sheet, release log
tools/       local build/test scripts (never shipped)
release/     dated ZIP + SHA-256 checksum (never inside public_html)
```

## What approval unlocks

Reply with "approved" plus answers to D1–D4 and whatever facts from 1B you have now. Unanswered items go into the private owner checklist with the exact sentence, page or release decision each one affects; a missing photo or optional credential is omitted, not a reason to stall. The build then delivers the full site, the release ZIP and the evidence package for content approval, and publication waits for a separate explicit go-ahead.
