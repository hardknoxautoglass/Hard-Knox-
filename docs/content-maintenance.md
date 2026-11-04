# Content and maintenance guide (private)

## How the site is put together

- `site/` is the finished website: plain HTML pages, one CSS file, one small JavaScript file, two font files, three icon files, `robots.txt`, `sitemap.xml`, `.htaccess`. Hostinger serves these files as they are. Nothing runs on the server.
- `tools/` is how the pages were generated and tested. It needs Node.js on a computer, never on the server. The master record of facts is **`tools/site-config.js`** (name, phone, email, hours, service area, the six services, the required sentences, the warranty version and effective dates). Page text lives in `tools/pages/*.js`; the shared header/footer/bottom bar in `tools/layout.js`; styles in `tools/src/site.css`; script in `tools/src/site.js`.
- `docs/` is this private handoff. `release/` holds the dated ZIPs and checksums. Neither is ever uploaded.

## Two ways to make a change

**A. Rebuild (recommended for anything that appears on more than one page).**
```bash
npm install
node tools/build.js
node tools/check-html.js && node tools/check-facts.js
node tools/serve.js &
node tools/crawl.js && node tools/a11y.js
node tools/release.js v1.1
```
Edit the value or sentence in `tools/site-config.js` or the page file, rebuild, run the checks, package. Every page, meta tag, footer and JSON-LD block updates together. The checks refuse prices, credential claims, wrong hours, placeholders, inline scripts and anything off-origin.

**B. Edit the HTML directly (fine for a one-line fix on one page).** Open the page's `index.html` in `site/`, change the sentence, and upload that one file. Remember that the header, footer and bottom bar are repeated in every page: a change to those must be made in all 14 files (or use method A). Do not touch the inline boot script in `<head>` — its hash is allow-listed in the CSP in `.htaccess`; any change to it must be mirrored there or the mobile menu will stop collapsing.

## Things that must change together (one fact, many surfaces)

| Fact | Surfaces |
|---|---|
| Phone number | every page (header, hero, FAQs, closing panel, footer, bottom bar, aside), JSON-LD `telephone`, Contact, Warranty §§2, 9, 13 — one value in `site-config.js` |
| Hours | Contact, footer, Home FAQ, closing panel, aside, JSON-LD `openingHoursSpecification` |
| Service area / communities | Contact lists, Home area section, JSON-LD `areaServed`, description tags |
| Warranty wording | `/warranty/`, guarantee preview on Home and footer, every service page's "guarantee" section, cancellation policy §5, Home FAQs; bump `warranty.version` and `effective` in `site-config.js`; archive the previous version (below) |
| ADAS arrangements | hero qualification, Home card and FAQ, Services, Windshield "Will my windshield need…", ADAS page, About, Warranty §7, Service markup |
| Effective dates | privacy, terms, cancellation (one value `privacy.effective`), warranty (`warranty.effective`) |

## Warranty versions

The guarantee applies by the version in force when work was authorized. When terms change:
1. Copy the current `site/warranty/index.html` to `docs/warranty-archive/warranty-v<old>-<effective date>.html` (create the folder) and commit it. That archived file is the terms for customers of that period.
2. Change the wording, bump `warranty.version` and `warranty.effective` in `site-config.js`, rebuild, re-run the checks, package and release.
3. Update the paper copy carried on the van and the version reference on invoices.
4. Never apply new terms to earlier work; section 13 of the guarantee promises this.

## Pre-sale availability in practice (owner routine)

- Every quote text or call that leads to scheduling: send the link `https://hardknoxautoglass.com/warranty/` ("Here's the full guarantee before you decide").
- Keep printed copies of the current guarantee on the van; offer one before authorization; note the version on the invoice.
- Do not describe insurer-paid work as "free"; do not offer deductible help, rebates or gifts.
- If you are asked to do extra work on site that the customer did not request, quote it separately and get a clear yes before starting; the FTC Cooling-Off Rule's requested-repair exception covers what they asked for, not extras you suggest.

## Periodic review

| When | What |
|---|---|
| Any change to contact details, hours, coverage, insurance, calibration fulfillment, warranty, hosting or communications providers | Update `site-config.js`/pages, rebuild, run the checks, re-package, update `docs/claims-ledger.md` and `docs/privacy-dataflow.md`, log the release |
| First week after launch | Search Console: coverage/crawl errors, redirect errors, sitemap status; test Call/Text on your own phone from the live site; check nothing has been injected (`view-source`, two `<script>` tags only) |
| About one month after launch | Search Console performance (impressions/clicks), the generative-AI impressions report if populated, Bing Webmaster Tools, CrUX field data if populated (otherwise record "insufficient field data"). These are different observations; none equals a call, quote or sale |
| Every six months (next: 2027-05-04) | Read every page as a customer; re-check the claims ledger rows; confirm the warranty paper copy matches the site; confirm the registrar lock/auto-renew; check the certificate renewed |
| Annually | Review `OFL.txt` still bundled with the fonts; review the privacy notice against actual providers |

## Search Console and Bing (owner, after launch; separate authorization for any change)

- Verify ownership with the **DNS TXT record** method (preferred; no file on the site) or the HTML-file method (upload the verification file to the web root and keep it through future releases). Do **not** use the meta-tag or Google Analytics methods — they add tags to pages.
- Submit `https://hardknoxautoglass.com/sitemap.xml`. Inspect `/`, `/windshield-replacement/` and `/warranty/` with URL Inspection; the expected outcome is "URL is on Google" over time, with no enhancements for LocalBusiness (no address → ineligible; this is expected, not an error).
- Run the Rich Results Test on the live home page once: Breadcrumbs may appear eligible on interior pages; LocalBusiness will report the missing address. Record the result in `docs/validation-report.md`.
- Do not add tracking, call-tracking numbers or analytics to measure calls; if you want to know how people found you, ask them and tally it on paper.

## Google Business Profile

See `docs/gbp-reconciliation.md`. Do not create extra profiles for towns, use a keyword-stuffed name, or hide/show a storefront address. Keep the profile as a service-area business with the address hidden.

## Adding things later (needs a new scope)

Reviews/testimonials (only real ones, with permission, no gating), real photos (strip EXIF, check plates and addresses, log rights in `docs/asset-rights-log.md`), a logo file, new services, a form, analytics, a map or a chat widget. Anything that adds cookies, storage or third-party requests also needs a privacy review before it goes live.
