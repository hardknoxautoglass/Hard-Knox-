# Resume point — lead verification

**Last updated:** 2026-09-03

| | |
|---|---|
| Rows in workbook | 386 |
| Verified | 227 |
| Remaining | 159 (79 have a website, 80 do not) |
| Rows with a real email | 77 (was 22) |
| Columns | 14 (trimmed from 20) |
| Hixson expansion | not started |

## Sourcing rules — IMPORTANT, these changed mid-project

**Do not use Yelp.** The user found it serving false information. The same caution applies to other third-party-edited aggregators: YellowPages, Manta, Buzzfile, ZoomInfo, Nextdoor, chamber directories.

**Primary source is the business's own website.** The practical technique, since direct HTTP is blocked here: use WebSearch with `allowed_domains` set to the company's own domain, e.g.

    WebSearch(query="contact address phone email Chattanooga",
              allowed_domains=["examplecompany.com"])

That returns only pages from their own site, so the address, phone and email come from the company itself.

**For businesses with no website** (80 of the remainder), the user approved using pages the business itself maintains — its own Facebook page or Google Business Profile — cross-checked against Tennessee Secretary of State registration to confirm the entity is active. The distinction that matters: self-maintained by the business (acceptable) versus third-party-edited (not).

Record which source was used in column N so it is auditable later.

## Verification standard

Confirm the business is operating, that the website domain actually belongs to it, the phone, the address, and any published email. Keep a row that has a verified phone and address but no website. Delete only when the business no longer exists independently, or nothing at all can be confirmed. Where sources conflict, keep the row and say so in column N rather than guessing.

## Files

- `Hamilton_County_Auto_Glass_Leads_verified.xlsx` — 386 rows x 14 columns. Column M = Verification Status, column N = Verification Notes.
- `verification_log.json` — machine-readable record keyed by 0-based data index (index i = sheet row i+2).
- `REMAINING_TO_VERIFY.csv` — generated earlier; regenerate from column M rather than trusting it, since rows have been verified since.
- `VERIFICATION_NOTES.md` — deletions, corrections, and leads flagged for a live phone check.

## Applier script

Batches are applied with a small script that writes to both the workbook and the log at once. Recreate it in the scratchpad if lost — it reads a JSON list on stdin of
`{"i": <0-based index>, "status": "keep|delete|recheck", "email":…, "website":…, "phone":…, "address":…, "city":…, "zip":…, "evidence":…, "note":…}`
and sets Verification Date, Status and Notes automatically. Commit after every batch.

## Rows currently flagged for follow-up

| Row index | Issue |
|---|---|
| 184 | Dempsey & Sons Well Drilling — a directory listed it CLOSED while other listings showed 2025 activity. Needs an official-source check. |
| 205 | Alsco Uniforms — alsco.com lists only Knoxville, Nashville and Memphis for TN. Confirm a Chattanooga branch exists. |
| 208 | Octapharma Plasma — official Chattanooga page exists (center 133) but street address and phone did not surface. |
| 223 | American Foundation & Waterproofing — official site lists the Knoxville HQ number; the sheet's 423 number is unconfirmed. |
| 230 | 31W Insulation — no pages surfaced from 31winsulation.com. Confirm the domain and the branch. |
| 177 | David Mathews Surveying — active, but website dmsmapping.com never confirmed. |
| 20 | Advanced Collision — now trades as Classic Collision at the same address/phone; may duplicate that row. |

## Remaining work

1. The 79 outstanding rows that have a website — domain-restricted search, one or two per business.
2. The 80 with no website — business-maintained Facebook/Google profile plus TN SOS registration.
3. The Hixson expansion (ZIP 37343 and adjacent): find additional fleet-operating commercial prospects, verify to the same standard, fill all 14 columns, and match the row colouring (green = A, yellow = B, gray = C).
4. Refresh the Summary tab counts and this file when done.

## Environment gotchas

- Outbound HTTP to arbitrary domains is blocked by the egress policy. `curl` and WebFetch both fail on lead sites. Web search is the only channel — don't rediscover this.
- `.claude/settings.json` on this branch raises the per-session web search cap to 500. The cap also appears to refill between sessions.
- `pip install openpyxl` if it is missing.
- Run git commands from the repo root; the shell's working directory resets between Bash calls.
