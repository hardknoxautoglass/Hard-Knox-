# Resume point — lead verification

**Last updated:** 2026-09-04

## How to restart this work in a fresh session

Paste this as the first message. It is deliberately short — everything else is on disk.

> Read `leads/RESUME.md`, then pick up the work it lists under "Remaining work".
> Same method and same sourcing rules as before. Record each batch with
> `leads/tools/rec.py` and commit after every batch.

The Vibe queue itself is finished, so there is no queue file to work from any more.
If a new queue arrives, drop it in as `vibe_queue.json` and the same four scripts run it.

Do not paste the spreadsheet, the CSVs, or the old conversation into a new session.
The state is in the files; re-reading them costs a fraction of re-reading a transcript.

## Status: the Vibe queue is FINISHED — all 414 decided

- `leads/vibe_queue.json` — all 414 queued companies.
- `leads/vibe_verification_results.json` — every decision, keyed by business name.
- `leads/VIBE_REMAINING_TO_VERIFY.csv` — now empty apart from its header.
- `leads/VIBE_REJECTED_2026-09-04.csv` — the 159 not added, with the reason for each.
- `leads/tools/` — the scripts. `rec.py` records a batch, `tolead.py` turns a recorded batch
  into workbook rows, `addleads.py` appends them, `refresh.py` regenerates the two derived
  CSVs from the results file, `apply.py` edits existing rows in place.

Outcome across the 414: **255 confirmed and added**, 52 dead records, 101 with no contact
published, 5 duplicates, 1 merged into an existing row.

The batch loop, for whenever the next queue arrives:

    python3 leads/tools/rec.py < batch.json
    python3 leads/tools/tolead.py < batch.json | python3 leads/tools/addleads.py
    python3 leads/tools/refresh.py
    git commit

Method that works: one WebSearch per company, `allowed_domains` set to that company's own
domain, query "contact phone address email <trade> <city>". About 6 per turn. If the first
returns nothing, one retry with different wording, then mark `nocontact` and move on.

What the tail of the export taught, beyond the 1-in-5 junk rate already known:

- **Check the domain before anything else.** Whole records collapse on it. gmail.com,
  yelp.com, fedex.com, webs.com and webstarts.com all appeared as a company's "website".
  Others carried a real site belonging to a different company — Wilson Waste Management on
  Velez Trucking's domain, U.S. Logistics Group on BWY Transport's, Mission Stone Tile on a
  hair salon's.
- **Check the state.** Several records are out-of-area firms with a Chattanooga address
  bolted on: Olympus Cleaning is in St Albans, England; Everest Plumbing in Toronto;
  Pro-Seal Paving in Waukesha, Wisconsin; Perfection Floors in Grandview, Missouri;
  Roof Curb Systems in Trenton, Georgia; SELCAT in Newnan, Georgia.
- **Watch for hijacked sites.** Patriot Concrete's homepage now serves an Indonesian
  gambling page over its old service pages, and spam articles have been injected under
  Swope Equipment's domain. Details read off a compromised site were not recorded as
  verified.
- **The search tool will sometimes assert a phone number with no link behind it.** Twice it
  offered contact details that no page on the company's own domain supported. Those were
  not recorded. If there is no link, there is no source.

### Workbook as it stands

| | |
|---|---|
| Rows | 685 |
| Priority A / B / C | 301 / 288 / 96 |
| Hixson-city rows | 107 |
| With a phone | 677 |
| With an email | 238 |
| With a website | 646 |
| With a street address | 603 |

Every row is based in Hamilton County; the ZIP audit that proves it is in the sourcing
rules below.
| Columns | 14 |

Every row was confirmed against the business's own website or a page the business itself
maintains. Column K names the source; column N records what was found or corrected.

## Sourcing rules — these are binding

**Hamilton County, Tennessee only.** The user asked for this explicitly on 2026-09-04.
A business qualifies on where it is *based*, not where it says it serves — plenty of
Hamilton County firms advertise work in Georgia or Cleveland, and that is fine; what is
not fine is a firm based elsewhere that lists Chattanooga as a service area.

In the county: Chattanooga, Hixson, Soddy-Daisy, Ooltewah, Collegedale, Signal Mountain,
East Ridge, Red Bank, Harrison, Lookout Mountain TN (37350), Walden, Apison, Lakesite,
Sale Creek, Birchwood, Ridgeside.

Not in the county, and each one has already appeared in this data wearing a Chattanooga
label: Cleveland (Bradley), Dayton (Rhea), Jasper, Kimball, Whitwell, Guild and Whiteside
(Marion), Dunlap (Sequatchie), Athens and Etowah (McMinn), and everything over the state
line — Ringgold, Fort Oglethorpe, Rossville, Chickamauga, LaFayette, Trenton, Dalton.
Lookout Mountain straddles the line: 37350 is Hamilton County, 30750 is Walker County GA.

The check that catches these is the ZIP. Hamilton County ZIPs are 373xx in the ranges
37302, 37308, 37315, 37341, 37343, 37350, 37351, 37363, 37373, 37377, 37379, 37384,
37401-37424 and 37450. Note 37311 and 37312 are Cleveland, not Chattanooga.


**Do not use Yelp.** The user found it serving false information. Same caution for
other third-party-edited aggregators: YellowPages, Manta, Buzzfile, ZoomInfo,
Nextdoor, chamber directories.

**Primary source is the business's own website.** Direct HTTP is blocked in this
environment, so the technique is WebSearch with `allowed_domains` set to the
company's own domain:

    WebSearch(query="contact address phone email Chattanooga",
              allowed_domains=["examplecompany.com"])

That returns only their own pages, so address, phone and email come from the
company itself.

**For businesses with no website**, the user approved pages the business itself
maintains — its own Facebook page or Google Business Profile. The distinction
that matters is self-maintained (acceptable) versus third-party-edited (not).
Restricting to `allowed_domains=["facebook.com"]` works well for this.

Column K records which source was used, so every row is auditable.

## Verification standard now applied to every row

Every remaining row was confirmed against the business's own website or the page
the business itself maintains. Column K names the source, column N records what was
found or corrected.

Rows that no such source could confirm were removed at the user's instruction, not
kept and flagged. They are archived in `DELETED_UNCONFIRMED_2026-09-03.csv` with the
reason for each, so nothing is lost if one turns out to be real.

## Files

- `Hamilton_County_Auto_Glass_Leads_verified.xlsx` — the deliverable. 586 rows x 14 columns.
- `VIBE_PROSPECTING_LEADS_2026-09-03.csv` — 421 Hamilton County companies from the paid Vibe Prospecting
  export. Deliberately NOT merged into the workbook: see the section below.
- `DELETED_UNCONFIRMED_2026-09-03.csv` — the 40 businesses removed in the final pass, with the reason for each.
- `REMOVED_OUT_OF_COUNTY_2026-09-04.csv` — the 3 removed for being outside Hamilton County
  (Big Buck Construction in Cleveland, Chorba Contracting in Guntersville AL, East Tennessee
  Electric in Knoxville), with full details kept in case the search ever widens.
- `NEW_LEADS_2026-09-03.csv` — the 44 leads added this pass.
- `verification_log.json` — machine-readable record keyed by 0-based data index (index i = sheet row i+2).
- `VERIFICATION_NOTES.md` — method, deletions, and the notable corrections.

## Applier script

Batches are applied with a script in the scratchpad that writes to the workbook
and the log together. Recreate it if lost. It reads a JSON list on stdin of

    {"i": <0-based index>, "name": "<business name, checked against the row>",
     "status": "keep|delete|recheck", "email":…, "website":…, "phone":…,
     "address":…, "city":…, "zip":…, "evidence":…, "note":…}

Two safeguards matter and must be kept:
1. Every entry carries `name`, and the applier refuses the whole batch if a name
   does not match the row it targets. An earlier batch landed one row off and
   wrote seven businesses' details onto their neighbours; this is what prevents
   a repeat.
2. Deletions are applied in descending row order, and the log is re-keyed
   afterwards, so a deletion cannot silently shift every later row.

Commit after every batch.

## Remaining work

The Vibe queue is done. Natural next steps if the work continues:

- **Fill the blanks.** 75 rows have no phone and 464 have no email, because those
  businesses publish neither on their own site or page. The worst gaps were searched
  twice already. What is left needs a call, not another search.
- **Chase the ones worth the trouble.** These came out of the queue as real, substantial
  fleet operators whose sites publish no reachable contact — the best of the 101
  no-contacts, and better prospects than most of what did get added:
  - Spirit Express (petroleum tankers, six metros — added at A with no contact on purpose)
  - Smith Logistics (ocean and air freight, customs brokerage, interstate trucking)
  - Norris and Son (refractory contractor, 51-200 staff)
  - Volunteer NDT (scaffold rental, industrial sites)
  - RiverCity Sign & Crane (bucket trucks and a boom)
  - Streamline Xpress (courier vans, East Ridge Avenue)
  - Tennessee Valley Forest Products (log and chip trucks)
  - Southeast Conservation Corps (crew trucks and vans)
  - Terra Firma (soil reclamation; shares 2611 Riverside Drive with Phaltless, already on
    the list, which may be a way in)
  - Tri-State Drilling published its address but no phone — 19+ rigs, worth the call
- **Talk to the trade neighbours, not just the customers.** Several rows are on the list
  because of who they know rather than what they drive, and the notes say so: Overlooked
  Materials and Scenic City Recycling both recycle glass; Oasis Glass Tinting and Osteen
  Construction (Southern Window Films) work in film; Truck N Trailer USA fits accessories
  for truck owners; Swope Equipment's rental yard sees every contractor in town; Transcomp
  does DOT compliance for local fleets; Vanguard places dozens of janitorial franchisees.
- **Emails are still the thinnest column.** The pattern that works is a domain-restricted
  search of the company's own site for "contact us email address"; hit rate is roughly one
  in three on local independents and near zero on national chains and franchises, which
  publish forms instead.
- Expand another town on the same method if wanted — Ooltewah and Soddy-Daisy are
  the next largest clusters.

## Vibe Prospecting (Explorium) — what was bought and why it sits apart

On 2026-09-03 the user authorised up to 1,090 credits and chose a companies-only pull.
500 Chattanooga-metro rows were exported for **1,000 credits** (dataset `ds-f4bc136f`),
2 credits per row: 1 to fetch, 1 for the firmographics enrichment that adds street and ZIP.
Roughly 90 credits remain.

Filtered to Hamilton County and deduped against the workbook: 31 were already on the list
(a good sign both lists describe the same market), leaving **421 new companies, 30 in Hixson**.

**This data is kept in a separate CSV on purpose.** It carries no phone and no email, and it
is not sourced from each company's own website, so it does not meet the standard the workbook
holds to. Treat it as a to-verify queue, not as leads.

Verification of the Hixson subset found the dataset is roughly 4 in 5 accurate:
- Confirmed and promoted into the workbook: B & B Crane, Advanced Waste Management, All Aboard
  USA, Tennessee Roofing & Construction, K & K Waste, DUCTZ, Heritage Fence.
- Rejected: River City Fire Protection (domain now redirects to a Nashville firm) and
  Metal Source (own site lists no Chattanooga-area location).
- Corrected: All Aboard USA's own site gives 1400 Market Street, not the Hixson address in the
  dataset. Where the two disagree, the website wins.

The export also duplicates rows (two spellings of Bill Owens on one domain) and occasionally
attaches the wrong domain to a business, so always confirm before calling.

Notes on the tooling: `export-to-csv` timed out at 60s but the export had in fact completed —
check `get-dataset` with no arguments before retrying, or you will pay twice. Paging the dataset
back with `load_into: "context"` overflows the context limit and the harness writes each page to
a file under `tool-results/`; parse those with a script rather than reading them.

## Adding new leads

`addleads.py` in the scratchpad appends rows, copying the style from an existing
row of the same priority so the green/yellow/grey colouring matches, skipping any
business name already present, and widening the autofilter. It reads a JSON list
of objects keyed by the exact column headers.

## Environment gotchas

- Outbound HTTP to arbitrary domains is blocked by the egress policy. `curl` and
  WebFetch both fail on lead sites. Web search is the only channel.
- `.claude/settings.json` raises the per-session web search cap. Separately there
  is an account-level rate limit that resets on a wall clock and the setting does
  not govern it; if searches start failing with a reset time, wait it out.
- `pip install openpyxl` if it is missing.
- Run git from the repo root — the shell's working directory resets between calls.

## Sourcing rule update — 2026-09-04 (supersedes the Facebook allowance above)

The user tightened this after finding gaps and bad numbers in the first pass:

**No Facebook. No Yelp. No directories of any kind.**

The method is now two steps, in this order:

1. **Open Google search** for the business — directories and social blocked — purely to
   discover its **official website**.
2. **Domain-restricted search on that official website** to read the contact details off it.

Contact details come from the official website and nowhere else. If a business has no
official website, its website and phone stay "Not publicly available" and the note says a
call is needed. The earlier allowance for a business's own Facebook page is withdrawn, and
the four rows that had been given Facebook URLs were reverted.

Why the first pass missed sites like ssautorepair.net: it only ever searched
`allowed_domains` set to a domain it already knew, so a blank website column meant the
business was never actually searched for. Step 1 above is what fixes that.


### Relaxation — 2026-09-04, later the same day

The user relaxed the rule above after seeing how many small operators publish no website
at all: **if a business is findable on Google and a phone number comes up, keep it and
record the number**, official website or not.

So the order of preference is now:

1. Official website — always preferred, and contact details are taken from it when it exists.
2. No official website but the business and a phone number are findable on Google — record
   them, and say in column K that the source was a search listing rather than an official
   site, so the row stays auditable.
3. Facebook and Yelp remain excluded as sources either way.

A useful check fell out of applying this: for Denton's Wrecker, Ray's Towing, Red Bank
Electric, Broome's Wrecker and Harvey's Plumbing, the numbers Google returned were
identical to the ones already in the workbook. The existing phone data is holding up.


## Gap-fill sweep — completed 2026-09-04

The user found a missing website (S&S Auto Repair) and suspected wrong numbers, which
exposed a flaw in the first pass: it only ever searched `allowed_domains` set to a domain
it already knew, so any row with a blank website was never actually searched for.

Every one of the 129 rows missing a website or phone was re-done by open Google search
first, then confirmed on whatever official site that turned up. `leads/tools/enrich.py`
applies the results, refusing a batch if any business name does not match the row it
targets.

**Result:** phones went from 611 to 677, websites 620 to 646, emails 222 to 238,
addresses 566 to 603. Rows that had been entirely empty - Berean Academy, Stanford
Plumbing, River City Excavating, Bobby Fryar Trucking - are now complete.

**Five wrong numbers corrected**, each against the company's own site:

| Business | Was | Now |
|---|---|---|
| Southern Auto Care | (423) 719-4014 | (423) 236-2863 |
| K & K Waste Disposal | (423) 877-4002 | (423) 225-1621 |
| Walden Plumbing | (423) 886-5631 | (423) 402-6245 |
| Home Pros Painting | (423) 320-6303 | (423) 551-9074 |
| Middle Valley Tire | (423) 842-3522 | (423) 551-9154 |

S&S Auto Repair's number was not wrong but was the appointment line; the shop's direct
line is now recorded. Sunrise EZ Dumpster holds a **(310) Los Angeles area code** and no
trace of the business exists - flagged in the row, not corrected, because there is no
right answer to put there.

**Reassuring finding:** for every business with no website - Denton's Wrecker, Ray's
Towing, Red Bank Electric, Broome's Wrecker, Reliable Towing and a dozen more - the
number Google returned was identical to the one already in the workbook. The first pass's
phone data was sound; its gaps were the problem.

**Still empty after two passes,** and unlikely to yield to more searching: Woodruff Lawn
Care, Jacklyn Emerson Five Star Cleaning, Chattanooga Masonry, Ooltewah Animal Clinic,
Catering Company, AJR Construction and Extreme Excavating. In most cases the trading name
itself is in doubt - several return only unrelated firms of similar name. Confirm what
these businesses are actually called before spending more time on them.

**Closure warnings noted in the rows:** Signal Mountain Cleaners and Dempsey and Sons
Well Drilling both carry a listing marking them closed. Harvey's Plumbing's domain shows
signs of lapsing.

---

## HANDOFF — 2026-09-05 (phone re-check: A tier finished)

Supersedes the 2026-09-04 handoff below, which is kept for the corrections it
lists. Method, worklist query and recording command are unchanged.

### Where the sweep stands

**Done: 206 rows. Remaining: 293 — 0 A, 224 B, 69 C.**

**The entire A tier is swept.** All 204 A-priority rows outstanding on 09-04
have been checked against the companies' own sites. What is left is B and C
work, so the highest-value corrections are already banked.

**Next six rows:** row 15 423 Auto | row 16 Wholesale Auto Brokers, then
continue B-priority in row order.

### One environment limit worth knowing

WebFetch is blocked by this session's network policy for essentially every
outside domain — `curl` gets a 403 from the egress proxy. **WebSearch is the
only channel that reads a company's own site.** It works well, but when a
site's number is not in the search index there is no second way to reach it,
which is why some rows are flagged UNCONFIRMED rather than resolved.

### The method lesson that cost the most

**One search of a multi-line business is not enough.** Three rows nearly took
a wrong overwrite from a single search that grabbed a secondary number:

- **Atlas Bolt** — one search returned 423-497-0463, a second returned the
  423-265-2341 on file. Kept the file number, noted the other.
- **MCS Facility Services** — one search returned their *residential*
  move-in/out line; the main office is the 423-872-2345 on file.
- **JBH Steel / H&H Brown** — 1801 and 1803 Polk Street, numbers one digit
  apart (267-9665 and 267-9655). Easy to misdial either way; both rows now
  carry the warning.

When a search returns a number that disagrees with the sheet, **search again
before overwriting.**

### Corrections made (phone unless stated)

- **Impact Facility Solutions — the 09-03 "correction" was wrong and is reverted.**
  Changed to 423-415-1045 off a *chamber listing*; their own site says
  **423-645-0830**. *Any row corrected from a directory rather than the
  company site deserves the same re-check.*
- **ECS Southeast** carried a **Nashville 615 number**; their Chattanooga page
  says **423-874-9020**.
- **Highway Environmental** carried its **Knoxville** number; Chattanooga is
  **423-629-2714** at 3900 N Hawthorne St.
- **Crown Subaru** → service line **423-704-9039** (the number on file appears
  nowhere on their site).
- **Two Men and a Truck** → **423-201-4154**.
- **Chattanooga Camper Sales** → **423-427-6640**.
- **Material Handling Inc** → **833-277-9797**.
- **Walden Security** → local **423-702-8200** made primary over the 800 line.
- **Mountain City Service** — Website was a **Facebook page**; real site is
  **mountaincityservice.com**.
- Addresses: **Architectural Surfaces** → 4500 Amnicola Hwy; **Doug Yates** →
  2306 E 23rd St; **Classic Collision row 145** → Chattanooga 37415 (it is the
  *Red Bank* shop, and still needs renaming); **911 Junk Out** → an Ooltewah
  apartment, so home-based.
- Filled in where blank: street addresses for **J.D. Helton**, **Chattanooga
  Boiler & Tank**, **Armor Xteriors**, **Mid-South Equipment**; ZIPs for
  **Lumberjacks**, **Cook's Pest**, **Keefe Plumbing**; emails for **Action
  Air**, **Thomas Brothers**, **Chattanooga Hardwood Center**.

### Duplicate rows found — merge before calling

A scan of all 685 rows for repeated phones, emails and domains found:

1. **Rows 86 and 609 — Paul Davis Restoration.** Identical in every field.
2. **Rows 67 and 611 — Pointe General Contractors / PGC LLC.** Same number,
   two domains, PGC being their initials.
3. **Rows 40 and 509 — Covenant Logistics / Covenant Trucking.** Same address
   and number; Covenant Trucking is the older trading name.
4. Rows 149/150/151 (funeral chapels) and 444/583 (Marion Environmental /
   MEI-Aqua Treat) share numbers but are **genuinely separate sites** — one
   call covers each group.

Two rows the scan flagged are **not** problems: row 584 is registered as
"Elder's Ace Hardware of South Knoxville, LLC" but its address is in Hamilton
County, and row 320's southern.edu website is right because it genuinely is
the university's campus auto shop.

### Still-open data problems

- **Manzano Masonry (row 301) is not a Hamilton County business** by its own
  account — Dayton, Rhea County, with Soddy-Daisy only a service area.
- **Addresses no source supports:** row 197 (Express Courier) claims Cintas's
  own published address; **Crider Landscaping** publishes only a Hixson PO box;
  **Gudel's** own site puts them on Hixson Pike, not Middle Valley Rd; **L H
  Lewis**'s details came off a social page.
- **Builders FirstSource (row 473)** is still filed as "Building First Source".

I also scanned for near-consecutive street numbers; most such pairs are genuine
commercial corridors, so there is **no systemic fabrication pattern**.

### Department contacts — the service desk, not the sales floor

- **Marshal Mize Ford** — collision **423-870-9573**, service 423-875-2058,
  parts 423-870-4053. The number on file is the sales floor.
- **Long of Chattanooga Mercedes** — they run **their own body shop**; ask for
  it first, then service on 423-855-5664.
- **Camping World** — separate service, parts, collision and mobile-service
  operations behind one toll-free.
- **S&H Trucking** — operations direct on 423-648-5355 ext 104 / 423-648-7198,
  and they employ **their own mechanics**.
- **NABCO Electric** — 24-hour line 423-622-8463, plus a Cleveland TN branch.
- **Southern Adventist University** — Plant Services 423-236-2291 alongside
  Transportation's 423-236-2716.
- **Cintas** — uniform services (on file) vs facility services 423-401-8800.
- **Overhead Door**'s 24-hour line is a *Knoxville* number.
- **JM Specialties** is now a division of **Guardian Access Solutions**;
  **Hullco** is now **West Shore Home**; **Milco National** is part of **DBM
  Global** — in each case vehicle spend may sit with the parent.

### Fleets the companies size themselves

- **Doug Yates Towing — over 50 trucks**, six locations, trading since 1946.
  The strongest single prospect confirmed in this sweep.
- **Chattanooga Tree Service** publishes its equipment list: three cranes, a
  75-ft roadside bucket truck, two 90-ft tracked lifts.
- **Reliable Heating & Air** — "largest residential HVAC service team in the
  Chattanooga area", fully-stocked vans.
- **Care Med Ambulance** and **Paul Davis** (30-minute response) — vehicles
  that cannot be off the road.

### Referral partners, not just customers

**Pro Auto and Fleet Detailing (row 400)** sells *headlight repair* into the
fleets on this list. **Chattanooga Trailer & Rental (row 498)** and
**Chattanooga Mobile Truck Repair (row 423)** have every regional fleet through
their shops. **Swope Equipment (row 652)** sees every contractor in town.
**Scenic City Recycling (row 634)** is a glass recycler — a disposal
conversation as well as a sales one.

### Unworked prospects found along the way

Holston Gases (a second Chattanooga point and an Ooltewah branch); Canteen
(Ringgold/Chattanooga); Lumberjacks Hardwood Center; Erwin Marine Riverfront;
Enterprise (Downtown and Airport branches); Tomahawk Crane (Mobile AL and
Pensacola FL, so Chattanooga is the HQ).

### Rows to treat with care

**Parman Energy** — site shows no Chattanooga branch and its contact page
renders under another company's name. **Conley Towing** — no reachable website;
FMCSA SAFER (a federal record) ties Conley Wrecker / Tennessee Wrecker / Spicer
Towing to one registrant, James Ratledge, contradicting the "David Ratledge" in
the 09-04 note. **All Aboard USA** — home page now serves a New Zealand tour
site. **Swope Equipment** — injected spam pages still served under /jsnly8tg/.
**S&H Trucking** — an Account Suspended page sits on their domain.

## HANDOFF — 2026-09-04 (phone re-check paused mid-sweep)

### Where the work stands

The workbook `leads/Hamilton_County_Auto_Glass_Leads_verified.xlsx` is **complete and usable right now** — 685 rows, all Hamilton County TN, all verified against official sources. The Vibe queue is finished and the gap-fill sweep (rows with no website) is finished. What is *partly* done is the **phone re-check**, the second thing the user asked for on 2026-09-04.

### The phone re-check: what it is and how far it got

Purpose: the user found wrong phone numbers in the sheet, so every row with a phone gets its number re-read off the company's own website.

**Done: 57 rows (10 batches). Remaining: 499 rows — 204 A, 226 B, 69 C.**

Error rate so far is roughly **one row in three needing a correction or a flag** — far worse than the 4% seen in the gap-fill sweep. This sweep is worth finishing.

Corrections made so far:
- Capital Toyota — number wrong; collision centre 423-490-0216 is the real glass buyer
- Crown CDJR — local number replaced by toll-free on their site
- Long Hyundai — **was carrying the Mercedes-Benz dealership's number from the row below it**
- Rivermont Paint & Body — wrong number, site says 423-702-6722
- U.S. Xpress — site now publishes only 866-646-5886
- Averitt Express — generic 800 number replaced with the Chattanooga terminal's 877-339-3530
- Hamilton County Schools — switchboard replaced with the Transportation Hotline 423-498-5555
- **United Rentals — address AND phone were both wrong** (6114 Airways Blvd is a *Jackson TN* branch). Now 3611 Amnicola Hwy, 423-353-9270
- Mosteller's Wrecker — website nationaltow.net was not theirs; removed
- Chattanooga Coca-Cola — chattanoogacocacola.com is dead; the live page is cocacolaunited.com/locations/chattanooga/

Flagged UNCONFIRMED (site publishes no number — call before relying on them): Integrity Buick GMC, CarMax, North Shore Auto Collision, Snider Fleet Solutions, Covenant Logistics, Pointe General Contractors, First Student, City of Chattanooga Fleet.

### Two findings the user should act on

1. **Classic Collision does its own glass replacement** — competitor, not customer. They run 8+ metro shops, and their Gunbarrel address and phone are **identical to Advanced Collision's**, so those brands have merged. Rows 20, 21 and 22 all chase one group. North Shore Auto Collision (row 23) is the better independent body-shop prospect — no glass service of its own.
2. **Named decision-makers found:** Kenneth Howell, Director of Fleet Management, City of Chattanooga (a "100 Best Fleets in North America" operation); Thomas Cummings, GM, Tennessee Crown Distributing.

### Unworked prospects discovered along the way (not yet in the sheet)

- Enterprise Rent-A-Car: four more Hamilton County branches (Downtown, Chapman Rd, Hixson, Airport) — only Lee Hwy is in the book
- United Rentals: second branch, 4001 Industry Dr, 423-624-4000; plus Flooring & Facility Solutions at 423-376-1893
- Penske: two more Chattanooga points (Hickory Valley Rd, Home Depot #742)

### To resume the phone re-check

Regenerate the worklist (skips rows already swept, sorts A-priority first):

```python
import json, openpyxl
wb=openpyxl.load_workbook('leads/Hamilton_County_Auto_Glass_Leads_verified.xlsx'); ws=wb['Leads']
log=json.load(open('leads/verification_log.json'))
swept={int(float(k))+2 for k,v in log.items() if isinstance(v,dict) and v.get('gapfill')}
hdr=[c.value for c in ws[1]]; ci={h:i+1 for i,h in enumerate(hdr)}
out=[]
for r in range(2, ws.max_row+1):
    n=ws.cell(r,ci['Business Name']).value
    if not n or r in swept: continue
    p=ws.cell(r,ci['Phone']).value
    if not p or 'not publicly' in str(p).lower(): continue
    pri=(ws.cell(r,ci['Lead Priority']).value or 'C').strip()[0].upper()
    out.append((pri,r,n,ws.cell(r,ci['Website']).value))
out.sort(key=lambda x:(x[0],x[1]))
```

**Next six rows:** row 118 ABC Supply Co. | row 119 Ferguson Waterworks | row 122 Chattanooga Housing Authority | row 125 Lumberjacks Tree Service | row 128 Landscape Workshop - Chattanooga Branch | row 129 Arrow Exterminators - Chattanooga Service Center

**Method per row** — one `WebSearch` with `allowed_domains` set to that company's own website; compare the published number to the sheet. If the domain returns nothing, do one open `WebSearch` with directories and social blocked to find the real site. Then record with:

```bash
python3 leads/tools/enrich.py < batch.json   # entries need "row" and "name"; omitted fields are left untouched
```

Commit and push after every batch to `claude/vibe-queue-verification-1p9xkh`.

**Where a dealership or contractor splits sales from service, put the service / parts / collision line in the note** — that department buys the glass, not the sales floor.

### Still on offer, never accepted

The A/B/C priority grades drift between sessions: 37% A among the original 433 rows versus 49-59% A among the Vibe additions, the same trades sitting in two different tiers, and inconsistent industry strings. A re-grade of all 685 rows against a written rubric was offered and the user has not answered either way.
