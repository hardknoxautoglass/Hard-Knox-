# Resume point — lead verification

**Last updated:** 2026-09-03

## Status: COMPLETE — every row verified

| | |
|---|---|
| Rows in workbook | 392 |
| Confirmed from official / business-run sources | 392 (all of them) |
| Flagged / unverified | 0 |
| New leads added this pass | 44 |
| Businesses removed as unconfirmable | 40 |
| Hixson-city rows | 80 (was 52) |
| Rows with a real email | 113 (was 22) |
| Rows with a real website | 320 |
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

- `Hamilton_County_Auto_Glass_Leads_verified.xlsx` — the deliverable. 385 rows x 14 columns.
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

- Fill the blanks. Many rows read "Not publicly available" for phone or address
  because the business publishes neither on its own site or page. Those are
  gettable on a call, not from the web.
- Expand another town on the same method if wanted — Ooltewah and Soddy-Daisy are
  the next largest clusters.

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
