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
| Rows | 686 |
| Priority A / B / C | 302 / 288 / 96 |
| Hixson-city rows | 107 |
| With a phone | 611 |
| With an email | 222 |
| With a website | 620 |
| With a street address | 566 |

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
