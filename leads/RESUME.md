# Resume point — lead verification

**Last updated:** 2026-09-03

## Status: verification pass COMPLETE

| | |
|---|---|
| Rows in workbook | 385 |
| Confirmed from official / business-run sources | 344 |
| Flagged "Needs recheck" | 41 |
| Not yet checked | 0 |
| Rows with a real email | 107 (was 22) |
| Rows with a real website | 306 |
| Rows deleted this pass | 3 |
| Columns | 14 (trimmed from 20) |
| Hixson expansion | not started — this is the remaining work |

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

## Verification statuses in column M

- **Re-verified 2026-09-03** — an official site or the business's own page confirmed it.
- **Needs recheck** — no such source could confirm the business or its details.
  The row is kept with its original phone; `NEEDS_RECHECK.csv` lists all 41 with
  the reason. These are the ones to call before working.

## Files

- `Hamilton_County_Auto_Glass_Leads_verified.xlsx` — the deliverable. 385 rows x 14 columns.
- `NEEDS_RECHECK.csv` — the 41 flagged rows with the reason for each.
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

**The Hixson expansion.** Find additional fleet-operating commercial prospects in
Hixson (37343) and adjacent, verify to the same standard, fill all 14 columns,
and match the row colouring (green = A, yellow = B, gray = C). Then refresh the
Summary tab counts and this file.

## Environment gotchas

- Outbound HTTP to arbitrary domains is blocked by the egress policy. `curl` and
  WebFetch both fail on lead sites. Web search is the only channel.
- `.claude/settings.json` raises the per-session web search cap. Separately there
  is an account-level rate limit that resets on a wall clock and the setting does
  not govern it; if searches start failing with a reset time, wait it out.
- `pip install openpyxl` if it is missing.
- Run git from the repo root — the shell's working directory resets between calls.
