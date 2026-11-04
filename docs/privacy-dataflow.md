# Privacy: data-flow record and applicability decisions (private)

Prepared 2026-11-04 for the v1.0 preview. Items marked **owner** need the owner's facts (checklist A8); items marked **host** are verified only on the real Hostinger configuration at cutover.

## 1. Data path, step by step

| Step | What happens | Who receives what | Purpose | Access | Retention (known / unknown) |
|---|---|---|---|---|---|
| Page view | Browser requests HTML, one CSS file, one JS file, two WOFF2 fonts, favicon. No cookies, no browser storage, no service worker, no third-party requests (verified locally; **host** re-check). | Hostinger web server: IP, URL, time, user agent, referrer (standard access/security logs). Any Hostinger CDN/security layer in front of the server receives the same. | Delivering and protecting the site | Hostinger ops; owner via hPanel logs if enabled | Per Hostinger's policy — unknown; not controlled by the owner. Notice says "under its own retention rules". |
| Outbound link click | Browser follows a link to w3.org (accessibility page) only when clicked. Referrer-Policy: strict-origin-when-cross-origin. | w3.org receives the origin only | Reference | — | — |
| Tap Call | OS dialer opens with +1 865-299-3533 prefilled. Nothing is sent until the user places the call. | None until the call is placed; then the caller's carrier and the business line's carrier/provider (**owner**: carrier vs VoIP) | Quote request | the owner; anyone else with the business phone (**owner**) | Call log on the business phone and carrier records (**owner**: voicemail retention, forwarding, recording — none assumed) |
| Tap Text | OS messaging app opens addressed to the number with an empty body (no prefilled message). | Same as above when sent; SMS/MMS content and photos stored on the business phone (**owner**: any messaging app/backup/cloud sync) | Quote request, scheduling | the owner | On the phone until deleted (**owner**: practice) |
| Email (Contact page `mailto:`) | Mail app opens addressed to HardKnoxAutoGlass@gmail.com. | Google (Gmail) when sent | Quote request | the owner (Google account) | Gmail retention per Google terms and the owner's mailbox practice (**owner**) |
| Quote and scheduling | The owner confirms vehicle, scope, exact address by phone, price, availability. | the owner's records (**owner**: paper, phone notes, app) | Performing the work | the owner | Until the job and any warranty need have passed (**owner**) |
| Payment at completion | Card via card reader or cash. Website never involved. | Card-payment provider (**owner**: name) receives card data; the owner keeps the invoice total | Payment | Provider; the owner | Provider's retention; invoice kept for tax/warranty |
| Work order / invoice | Name, phone/email, vehicle Y/M/M, glass and work, location, date, amount, warranty version. | the owner; customer copy | Service record; guarantee claims; tax | the owner | Kept for the guarantee period (original-customer ownership) and tax obligations |
| ADAS calibration (if a partner) | Vehicle details shared with the partner as needed (**owner**: whether a partner exists and what they receive). | Partner | Performing calibration | Partner | Partner's policy |
| Warranty claim | Customer calls/texts/emails with proof of service; inspection arranged. | the owner | Honoring the guarantee | the owner | With the job record |

Not present anywhere: forms, uploads, accounts, calculators, scheduling widgets, chat, mailing lists, analytics, call-tracking numbers, advertising, pixels, session replay, social embeds, maps, video, external fonts, icon CDNs, third-party scripts, consent banners, accessibility overlays, marketing messages, contact databases created by the site.

## 2. Applicability decisions

| Rule | Legal trigger | Owner facts | Current primary source | Conclusion | Action | Responsible | Review |
|---|---|---|---|---|---|---|---|
| Tennessee Information Protection Act (TIPA, eff. 2025-07-01) | Conducts business in TN or targets TN residents **and** > $25M annual revenue **and** (≥ 175,000 consumers' PI, or ≥ 25,000 consumers with > 50% revenue from sale) | Sole mobile operator; revenue far below $25M (**owner to confirm**); no sale of PI | tn.gov AG announcement 2025-04-30; T.C.A. § 47-18-3201 et seq. | **Does not apply on these facts** | Keep the notice honest; no TIPA-specific rights section (nothing to administer) | Owner | 2027-05-04 |
| CCPA/CPRA | For-profit doing business in California and (> $25M adjusted revenue, or ≥ 100,000 consumers/households bought/sold/shared, or ≥ 50% revenue from selling/sharing) | No California business; below all thresholds | cppa.ca.gov FAQ | **Does not apply** | None; no "Do Not Sell" link (nothing sold) | Owner | 2027-05-04 |
| CalOPPA | Operator of a commercial website that collects personally identifiable information through the site from California consumers | Site has no forms/accounts and sets no cookies; the only data flows are initiated by the visitor in their own phone/mail app, outside the site | CA AG "Making Your Privacy Practices Public" | **Not triggered** (no online collection by the site). The notice nonetheless carries an effective date, provider list, DNT/GPC statement and contact, so it would also satisfy CalOPPA content expectations if a regulator took a broader view | None further | Owner | 2027-05-04 |
| GDPR Art. 3 | EU establishment, or offering goods/services to people in the EU, or monitoring their behaviour | Hamilton County, TN mobile service; English only; USD; no EU targeting; no monitoring | EDPB Guidelines 3/2018 | **Does not apply** (mere accessibility from abroad is not targeting) | No banner, no EU rights section | — | on change |
| ePrivacy / cookie and device-storage rules (EU/UK) and US state cookie rules | Storing or reading information on the user's device beyond what is strictly necessary | No cookies, no storage, no service worker (verified locally; **host** re-check for host-injected cookies) | — | **Nothing to consent to** | If any future feature adds storage, it needs a separate scope and privacy review | Owner | at any feature change |
| Telephone Consumer Protection Act (TCPA) / CAN-SPAM | Business-initiated marketing calls/texts/emails | None initiated; replies to inquiries only | — | Not triggered by the site; keep it that way (no marketing texts to inquiry numbers without consent) | Handoff note | Owner | — |

## 3. Verification record

| Check | Environment | Result | Date |
|---|---|---|---|
| Requests on first and repeat visit (Home, Contact, Warranty) are same-origin only: HTML, CSS, JS, two fonts | Local preview (Chromium) | 7 distinct same-origin URLs, 0 off-origin | 2026-11-04 |
| `document.cookie`, context cookies, localStorage, sessionStorage, IndexedDB, service-worker registrations | Local preview | all empty / 0 | 2026-11-04 |
| Contact handoff links are exact `tel:`/`sms:`/`mailto:` with no prefilled body, no redirect, no tracking | Local preview | pass | 2026-11-04 |
| CSP blocks foreign inline scripts (observed when the test harness tried to inject one) | Local preview headers | blocked | 2026-11-04 |
| Host-injected scripts, cookies, redirects, `Set-Cookie`, security layers | **Hostinger preview and live** | **not yet run** | at cutover |
| Phone/voicemail/SMS provider behaviour, mailbox retention | **Owner facts** | **pending (A8)** | before launch |

## 4. What the notice does not claim

No "we collect nothing" (Hostinger logs exist); no "never sell"; no deletion deadline; no worldwide-compliance statement; no banner; no rights list that nobody could administer. The notice's effective date is the build date and must be set to the publication date at launch (checklist A9).
