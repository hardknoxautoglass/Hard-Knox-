# Validation report — v1.1 preview (private)

**Release:** `hardknox-site-2026-11-04-v1.1.zip` · SHA-256 `722d9937b1b37b12c2c1af5eaf8ec1d6d1339277ebb16615135d572156dc4522` · 26 files · 143,235 bytes. Supersedes v1.0 (`1c2a2a08…43f3f`): owner's name removed from the site; forest-and-gold design pass; Montserrat 600 added. Every check below was re-run on the v1.1 build on 2026-11-04.
**Status label:** **Ready for owner testing.** Not launch verified. Not published.

Three conclusions are kept separate throughout: **(A) preview verified** = run by the builder on the local preview server (Node emulation of the intended `.htaccess`, Chromium only); **(B) authorized deployment verified** = on Hostinger (preview subdomain or live) — *none run yet*; **(C) post-launch observations** — *none yet*. A local pass is never promoted to a live pass.

Environment for all (A) rows: Linux container, Node 22.23, Playwright 1.64 with Chromium 1243 (headless), axe-core 4.14.0, html-validate 11.18.0, Lighthouse 13.6.0; preview at `http://127.0.0.1:8080` served by `tools/serve.js`; date 2026-11-04. Re-runnable with the commands in `docs/content-maintenance.md`.

## 1. Facts and offers

| Check | Path | Expected | Observed | Method | Status |
|---|---|---|---|---|---|
| Name, phone (865) 299-3533, `tel:`/`sms:` to +18652993533, email as text, hours ending 6:00 PM ET, six services, mobile-only wording on every page | all 14 HTML files | present, consistent | present on all 14; one `mailto:` and only on Contact | `tools/check-facts.js` + `tools/crawl.js` | (A) pass |
| No prices, discounts, financing, price ranges, "free installation", OE-equivalent, insurer-pays/deductible, same-day/24-7, "lifetime", "coming soon", Knoxville/Georgia, reviews/ratings, company-age claims, "licensed/insured/bonded", placeholders | all pages, metadata, JSON-LD | none | none (lint also checks `<title>`/description/JSON-LD text) | `tools/check-facts.js` (0 failures) | (A) pass |
| No street address, map, coordinates, postal code, rating, Offer/priceRange, affiliation or sameAs in JSON-LD | `/` (AutoRepair node), service pages (Service nodes), breadcrumbs | none | none; `@id` = `https://hardknoxautoglass.com/#business`; telephone/name/url match visible text | `tools/crawl.js` JSON-LD checks | (A) pass |
| Credential status: "Licensed & Insured" absent | all | absent | absent | lint | (A) pass (pending B3 evidence to add) |
| Interim ADAS wording verbatim where used | Home, Services, Windshield, ADAS, About | brief's sentence | present verbatim on 5 pages | grep | (A) pass (A1 pending) |

## 2. Customer understanding

| Check | Expected | Observed | Status |
|---|---|---|---|
| Six standalone answer tests | meaning preserved on each page alone; no contradiction elsewhere | all six pass; quotations and locations in `docs/answer-tests.md` | (A) pass — owner read-through requested |
| Guarantee agreement across surfaces | preview sentence, chip credit (credit not refund), replacement refund, 30-day reporting request, separate ADAS terms identical in meaning on Home, footer, service pages, warranty, cancellation policy, FAQs | consistent (manual read + lint for "30-day warranty"/"refund" misuse) | (A) pass |
| Real pre-sale process alignment (paper copy, invoice version reference) | owner routine | documented in maintenance guide; not yet in operation | owner task |

## 3. Accessible conversion

Suite: `tools/a11y.js` → `tools/out/a11y-report.json`, final run on the packaged build: **209/209 checks passed, 0 failures; axe-core violations 0** across 14 routes × 2 widths (360 px and 1280 px), plus the header re-tested with the menu open.

| Check | Path(s) | Expected | Observed | Status |
|---|---|---|---|---|
| axe-core WCAG 2.0/2.1/2.2 A+AA + best-practice rules | 13 pages + a missing URL (404), 360 and 1280 px | 0 violations | 0 violations. 346 "needs review" nodes: every text node on the gradient panels (hero, page headers, closing panel) plus `.notice--bar` under the fixed overlay — axe cannot evaluate gradients, so these were computed by hand (next row). | (A) pass |
| Gradient panels, computed worst case (lightest radial stop forest-800 `#0f4531` under the strongest point of the gold sweep: gold-500 at 7% then gold-300 at 11% → `#2f5a3b`-range) | hero, interior page headers, closing panel, breadcrumbs | ≥ 4.5:1 text, ≥ 3:1 non-text | white headings ≈ 6.0:1; cream body/notice **7.04:1**; gold-300 eyebrows/links/meta **5.18:1**; gold-500 ribbon border 3.23:1 (non-text); on the flat forest-950 bands: cream 13.94:1, gold-300 10.25:1. Buttons: forest-900 lettering on the gold gradient 8.98:1 (top) to 5.60:1 (bottom). | (A) pass |
| Contrast, measured with the real colors | all states | ≥ 4.5:1 text, ≥ 3:1 large/non-text | ink/cream 14.24; forest-700/cream 8.23; forest-600 hover/cream 5.90; white/forest-700 9.13; cream/forest-900 12.21; gold-300 text/forest-700 6.06; gold-300 links/forest-900 8.98; forest-900 on gold-500 button 5.60; forest-900 on gold-300 hover 8.98; cream outline button on forest-700 8.23; amber-800 eyebrow/cream 6.93 and /cream-deep 6.23; ink-muted notice/cream 7.55, /cream-deep 6.78, /white 8.37; gold-600 icons/cream 3.17 and /white 3.51 (non-text); gold-500 ribbon/forest-700 3.77 (non-text). White on gold is never used (2.42). | (A) pass |
| Focus visible (double ring gold-300 + forest-900) | all | visible on cream, white, forest, gold | pass (axe + screenshots) | (A) pass |
| Skip link first in tab order, moves focus to `main` | `/` | yes | yes | (A) pass |
| Menu button: name "Menu", `aria-expanded`, `aria-controls="site-nav"`, opens by keyboard, Tab enters menu, Escape closes and returns focus, collapsed links never receive focus | `/` at 360 px | all | all | (A) pass |
| Hidden items never focusable; tab through whole page | `/`, `/warranty/`, `/service-area-contact/` at 390×844 | no hidden element focused; last footer link ("Accessibility") reachable | pass on all three | (A) pass |
| Focus not obscured by the fixed bottom bar (WCAG 2.4.11) | same three pages | focused element never under the bar | pass (script scrolls the focused control above the bar; verified for every tab stop) | (A) pass |
| Target size: `.btn` ≥ 44×44; nav/footer/breadcrumb links and summaries ≥ 24×24 | `/` at 390 px | all | all | (A) pass |
| Reflow at 320 CSS px (and 1280 px at 400% zoom = 320×180) | all 14 routes | no horizontal scroll; bottom bar in page flow at 400%; notice fully visible | pass on all | (A) pass |
| 200% text size | all routes at 1280 px and 390 px | no horizontal scroll | pass on all (after min-width fix) | (A) pass |
| Text-spacing override (line-height 1.5, letter 0.12em, word 0.16em, paragraph 2em) | all routes at 390 px | no horizontal scroll, bar notice not clipped, no clipped controls | pass on all | (A) pass |
| Short landscape 568×320 | all routes | bar in page flow, no horizontal scroll | pass | (A) pass |
| Reduced motion | `/` | smooth scrolling off | `scroll-behavior: auto` | (A) pass |
| No-JavaScript | all routes | nav visible (4 links), menu button hidden, tel/sms present, one H1, bar notice present, bar in page flow | pass on all | (A) pass |
| Print: warranty | `/warranty/` | header/bar hidden, all 13 sections visible | pass; PDF generated (`tools/out/warranty-print.pdf`, Letter) | (A) pass |
| Contact handoff hrefs exact, no prefilled bodies, no redirects | `/service-area-contact/` | `tel:+18652993533`, `sms:+18652993533`, `mailto:HardKnoxAutoGlass@gmail.com` | exact | (A) pass |
| **Real iOS/Android dialer and SMS composer; email app; copyable fallback on desktop** | live or preview URL on devices | dialer shows the number; composer addressed and empty; nothing sent | **not run (no devices in the build environment)** | owner task (steps below) |
| **Screen readers (NVDA + Chrome/Firefox; VoiceOver + Safari iOS)** | all pages | names, states, landmarks, headings, link purpose announced; menu state announced | **not run** | owner task |
| **Safari, Firefox, Edge, Samsung Internet** | layout, menu, print | consistent with Chromium | **not run** (only Chromium is installed here) | owner task |

## 4. Discovery

| Check | Expected | Observed | Status |
|---|---|---|---|
| HTML validity (`html-validate` recommended + document presets) | 0 errors | 14 files, 0 errors | (A) pass |
| Crawl from `/` following every link, stylesheet, script, image, font | every page reachable; 0 broken links; 0 broken fragments; 0 orphans | 19 URLs crawled (13 HTML, 6 assets); problems 0; all 28 fragment targets exist | (A) pass |
| Titles unique, ≤ 70 chars (all ≤ 62); descriptions unique, ≤ 162 chars; one H1; `lang="en"`; viewport | per page | all pass (full table in `docs/inventory.md`) | (A) pass |
| One absolute self-canonical per indexable page; `404.html` noindex and not in sitemap | 13 canonicals | all equal `https://hardknoxautoglass.com<path>`; no stray robots meta | (A) pass |
| Sitemap = crawled indexable set; robots.txt allows all and names the absolute sitemap | 13 URLs | 13 = 13; robots OK; no `lastmod` (no verified dates) | (A) pass |
| Redirect/404 matrix on the **emulation** | `/services`→301 `/services/`; `/services/index.html`→301; `/index.html`→301 `/`; `/nope`, `/nope/deeper/path`, `/services/nope/`, `/assets/` → 404 with styled page; `/warranty/?utm_source=x` → 200; `/.htaccess` → 403 | all as expected | (A) pass — **must be repeated on Hostinger** |
| 404 page uses absolute asset paths (renders on nested misses) | yes | yes | (A) pass |
| JSON-LD syntax + agreement with visible text | parses; breadcrumb names and Service names visible on their pages | pass on all pages | (A) pass |
| Schema Markup Validator (code-snippet mode, no preview URL) and Rich Results Test | vocabulary OK; LocalBusiness rich result **expected ineligible** (no address) | **not run** (Rich Results Test needs the live URL; snippet validation to be done at cutover) | pending (cutover) — expected limitation, not an error |
| Lighthouse SEO/Best Practices | 100/100 | 100/100 on all four pages (v1.1) | (A) pass |

## 5. Privacy and release

| Check | Expected | Observed | Status |
|---|---|---|---|
| Requests on first and repeat visit (Home, Contact, Warranty), menu and FAQ interaction | same-origin only | 7 distinct same-origin URLs; 0 off-origin | (A) pass |
| Cookies, localStorage, sessionStorage, IndexedDB, service workers | none | none, first and repeat | (A) pass |
| CSP header behaviour | foreign inline scripts blocked | blocked (observed when the harness injected one without bypass) | (A) pass (emulated header) |
| Public ZIP contents vs allow-list; no README/maps/backups/docs/logs/credentials; no enclosing folder; dotfile present | 26 allowed files | 26 files, re-extracted and byte-compared OK (`tools/release.js`) | (A) pass |
| No private address or private materials anywhere in `site/` | none | none (grep for street/PO/road numbers: none; owner record has no address) | (A) pass |
| **Host-level:** `Set-Cookie`, injected scripts, security layer, real headers, directory listing, compression, 404 status | per `docs/deploy-rollback.md` §4 | **not run** | (B) pending |
| **Provider behaviour** (phone line, voicemail, SMS app, Gmail retention, card processor) vs notice | matches notice | **owner facts pending (A8)** | pending |
| Restore drill | restores in one step on the preview folder | **not run** | (B) pending |

## 6. Performance (lab, not field)

`tools/perf.mjs` → `tools/out/perf-report.json`. Profile: Lighthouse 13 default mobile (emulated Moto G Power, simulated slow 4G, 4× CPU slowdown), **3 cold runs per page, median reported**, against the local preview (no real network latency, no CDN — treat as an upper bound on quality, re-run on the live host).

| Page | Perf | LCP (median) | CLS | TBT | FCP | Transferred (total-byte-weight) | Requests | Status |
|---|---|---|---|---|---|---|---|---|
| `/` | 100 | 1,052 ms | 0 | 0 ms | 1,052 ms | 116,203 B | 7 | pass (≤ 2.5 s lab) |
| `/windshield-replacement/` | 100 | 1,052 ms | 0 | 0 ms | 1,052 ms | 101,386 B | 7 | pass |
| `/warranty/` | 100 | 1,051 ms | 0 | 0 ms | 1,051 ms | 104,175 B | 7 | pass |
| `/service-area-contact/` | 100 | 1,052 ms | 0 | 0 ms | 1,052 ms | 98,774 B | 7 | pass |

Per page: 1 HTML (17–28 KB), 1 CSS (≈ 29 KB), 1 JS (≈ 3 KB), 3 WOFF2 (12 KB each), favicon. v1.0 measured 0.9 s LCP / ~80–94 KB; v1.1's extra font weight and richer stylesheet cost about 150 ms of simulated LCP and ~20 KB per page, well inside the budget. No lazy-loaded hero; explicit `width`/`height` on the SVG; metric-adjusted font fallback; CLS 0 in every run. Lab interactions (menu, FAQ disclosure, print button) have no measurable blocking time (TBT 0). **INP is a field metric and was not measured; field data: insufficient (not launched).** Core Web Vitals field targets (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75, mobile and desktop) are to be read from CrUX/Search Console after launch if populated; otherwise record "insufficient field data" — this does not block launch.

## 7. Owner device tests (exact steps)

Run on the password-protected Hostinger preview (or the live site after cutover); record device, OS, browser, date and result.

1. **Call handoff.** Open the homepage. Tap "Call for a Free Quote" in the hero, then the "Call" button in the bottom bar, then "Call" in the footer. Each time the dialer must open showing **+1 865-299-3533** (or (865) 299-3533) and must **not** place the call by itself. Cancel. Expected on iPhone: the "Call" confirmation sheet; on Android: the dialer with the number filled.
2. **Text handoff.** Tap "Text for a Free Quote" and the bar's "Text". The messaging app must open **addressed to the number with an empty message**. Do not send. Repeat in Samsung Internet if you have a Samsung phone.
3. **Email.** On the Contact page tap the email link. The mail app must open addressed to HardKnoxAutoGlass@gmail.com. Do not send.
4. **Copy fallback (computer).** On the Contact page click "Copy number"; the status line should say "Copied (865) 299-3533 to the clipboard." Paste it somewhere to confirm. Also select the number text with the mouse and copy it.
5. **Bottom bar and notice.** On the phone, scroll to the very bottom of the homepage: the copyright line must be fully readable above the bar. Rotate to landscape: the bar must move into the page (no longer floating). Set the phone's text size to the largest setting and reopen the page: no sideways scrolling, notice fully visible.
6. **VoiceOver (iPhone).** Turn on VoiceOver; swipe through the homepage header: it should announce "Hard Knox Auto Glass — home, link", then "Menu, button, collapsed"; double-tap: "expanded"; the four links; use the rotor "Landmarks" to find "Primary navigation", "main", "Quick contact" (the bar) and "content information" (footer). Open the Warranty page and use the rotor "Headings" to move through sections 1–13.
7. **NVDA (Windows, Chrome or Firefox).** Press `H` to move through headings on the homepage (one H1, then H2s per section); press `D` for landmarks; Tab to the menu button at a narrow window width (under 900 px) and confirm it says "Menu button collapsed/expanded"; press Escape and confirm focus returns to the button; on the Warranty page press `Ctrl+P` to print and confirm all sections appear in the preview.
8. **Other browsers.** Open the homepage and the Warranty page in Safari (Mac/iPhone), Firefox and Edge: layout, menu, icons and print preview should match Chrome. Report anything that looks different with a screenshot.

## 8. Definition-of-done status

| Release check | Status |
|---|---|
| Facts and offers | (A) pass; A1–A5, A8 facts pending before launch |
| Customer understanding | (A) pass; owner read-through requested |
| Accessible conversion | (A) pass on everything automatable; **device and screen-reader checks outstanding → "ready for owner testing"** |
| Discovery | (A) pass; host redirect/404 matrix and Rich Results Test at cutover |
| Privacy and release | (A) pass; host-level and provider verification pending |
| Approval and follow-through | Owner approves final public wording; **publication requires separate explicit authorization**; production-only checks assigned to the authorized cutover (`docs/deploy-rollback.md`) |

Holds that would stop a release if they appeared: material safety/coverage/privacy contradiction (none found); broken primary contact path (none found locally); unexplained tracker (none); private-file exposure (none in the ZIP); known applicable A/AA failure (none found by automated and keyboard testing; screen-reader confirmation outstanding).
