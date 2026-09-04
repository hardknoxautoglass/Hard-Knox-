# Resume point — lead verification

**Last updated:** 2026-09-04

## Status: PAUSED mid-verification of the Vibe queue — 220 of 414 done

Picking this back up: the queue, the results and the remaining work are all on disk.
- `leads/vibe_verification_results.json` — every decision made so far, keyed by business name.
- `leads/VIBE_REMAINING_TO_VERIFY.csv` — the 194 still to check.
- `leads/VIBE_REJECTED_2026-09-04.csv` — the 66 thrown out, with the reason for each.

Method that works: one WebSearch per company, `allowed_domains` set to that company's own
domain, query "contact phone address email <trade> <city>". About 6 per turn. If the first
returns nothing, one retry with different wording, then mark `nocontact` and move on.

Roughly 1 in 5 Vibe records is junk — wrong state, parked domain, or an unrelated business
attached to the name. Always confirm the city before trusting a row.

| | |
|---|---|
| Rows in workbook | 586 |
| Confirmed from official / business-run sources | 391 (all of them) |
| Flagged / unverified | 0 |
| New leads added this pass | 44 |
| Businesses removed as unconfirmable | 40 |
| Hixson-city rows | 107 (was 52) |
| Duplicates found and removed | 1 (Chattanooga Propane) |
| Rows with a real email | 182 (was 22) |
| Rows with a real website | 520 |
| Rows with a real phone | 522 of 586 |
| Columns | 14 (trimmed from 20) |

## Sourcing rules — these are binding

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

- `Hamilton_County_Auto_Glass_Leads_verified.xlsx` — the deliverable. 433 rows x 14 columns.
- `VIBE_PROSPECTING_LEADS_2026-09-03.csv` — 421 Hamilton County companies from the paid Vibe Prospecting
  export. Deliberately NOT merged into the workbook: see the section below.
- `DELETED_UNCONFIRMED_2026-09-03.csv` — the 37 businesses removed in the final pass, with the reason for each.
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

Nothing outstanding on the original brief. Natural next steps if the work continues:

- Fill the blanks. 11 rows still have no phone and 270 have no email, because
  those businesses publish neither on their own site or page. A gap-filling pass
  was run over the worst of them: every one of the 11 remaining phone gaps was
  searched twice. What is left needs a call, not another search.
- Emails are the thinnest column and the one the user most wants filled. The
  pattern that works is a domain-restricted search of the company's own site for
  "contact us email address"; hit rate is roughly one in three on local
  independents and near zero on national chains and dealerships, which publish
  forms instead.
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
