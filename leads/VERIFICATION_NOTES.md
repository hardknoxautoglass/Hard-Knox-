# Lead Re-verification Pass — 2026-09-03

## Method
Every lead was checked against live Google/web search results: the business name plus
city/state, looking for (a) an official website that actually resolves, (b) a phone
number confirmed on the company's own site or on at least two independent directories
(BBB, Yelp, chamber of commerce, YellowPages, industry directories), (c) a street
address, and (d) any publicly published email address.

Direct HTTP fetching of the lead websites was not possible from this environment
(outbound requests to arbitrary domains are blocked by the network egress policy), so
site liveness was established from search-engine indexing of the site's own pages —
a domain returning current, indexed pages from its own contact/service URLs.

## Status: incomplete
**195 of 386 rows were re-verified.** The pass stopped when the session hit its hard
limit of 200 web searches. The remaining 191 rows are flagged
`NOT YET RE-VERIFIED` in column S and still carry their original unaudited data.

Not yet done:
- Re-verification of the remaining 191 rows
- The additional Hixson-area lead research

## What changed
- **2 rows deleted** (see below)
- **50 email addresses added** (list went from 22 to 72 rows with a real email)
- **21 websites added or corrected**
- **7 phone numbers corrected**
- **~180 street addresses confirmed or corrected**
- Two new columns: **Verification Status** (S) and **Verification Notes** (T)

## Rows deleted
| Business | Reason |
|---|---|
| Carter Distributing Company | Acquired by Cherokee Distributing (Knoxville) in Oct 2017; no longer operates as an independent company. The directory listings that fed the original row are stale. Cherokee Distributing now serves the Chattanooga market and is a valid replacement prospect. |
| Thompson Gas (Soddy-Daisy) | The address and phone on this row (8949 Dayton Pike / 423-877-6303) belong to **Gas Appliances Unlimited's** Soddy-Daisy store, which is already on the list. No ThompsonGas branch in Soddy-Daisy could be confirmed. |

## Corrections worth calling out
| Business | Correction |
|---|---|
| Maxi Auto Service | Website `maxicarcare.com` does not serve this location. The Broad St shop (which matches the listed phone) is `maxicarcarebroadst.com`. |
| Express Courier International | Website was `expressdelivers.net`; the real site is `expresscourier.net`. |
| Classic Collision (Hixson Pike) | No shop at that phone. The Hixson-area Classic Collision is at 4854 Dayton Blvd, (423) 875-5482. |
| Impact Facility Solutions | Phone corrected to (423) 415-1045 (the number on their own site and chamber listing). |
| Chattanooga Propane | Listed as Collegedale; the business is at 9536 Lee Hwy, **Ooltewah** 37363. |
| CarMax Chattanooga | Store line is (423) 414-3523, at 2211 Overnite Dr. |
| UTC Facilities | Department line is (423) 425-5916. |
| EPB | Local line (423) 648-1372 is more useful than the 800 number. |
| United Rentals | Chattanooga has four branches; the row now points at the Airways Blvd branch with its own phone. |
| Legacy Executive Transportation | Address 1710 Strawberry Ln is ZIP 37343 — Hixson, not Chattanooga proper. |
| Bin There Dump That | Local office is at 4810 Hixson Pike Ste 126, **Hixson**. |

## Flagged for a live phone check before outreach
| Business | Issue |
|---|---|
| Dempsey and Sons Well Drilling | YellowPages lists it CLOSED; Yelp shows a 2025-updated listing with recent reviews. Status genuinely unclear. |
| Advanced Collision Inc. | Now operating as Classic Collision at the same address/phone after acquisition — the row may duplicate the Classic Collision Jersey Pike entry. |
| Common Ground Tree Service | Two phone numbers in circulation (423-602-0466 and 423-621-4045) and several similar domains. |
| Charger Global Logistics | Chattanooga address but a 312 (Chicago) area-code phone. FMCSA authority MC896245 is active. |
| David Mathews Surveying | Business confirmed active, but the website `dmsmapping.com` could not be confirmed — no directory listing shows a site. |

## Files
- `Hamilton_County_Auto_Glass_Leads_verified.xlsx` — the updated workbook
- `verification_log.json` — per-row record of what was checked and changed
