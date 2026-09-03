# Resume point — lead verification

**Stopped:** 2026-09-03, to conserve account usage limits. Everything below is committed and pushed.

## Where things stand

| | |
|---|---|
| Rows in workbook | 386 |
| Re-verified | 195 |
| Still to verify | 191 |
| Rows with a real email | 72 (was 22) |
| Hixson expansion | not started |

Nothing is half-saved. The workbook, the log, and this file are all consistent with each other.

## Files

- `Hamilton_County_Auto_Glass_Leads_verified.xlsx` — the workbook. Column S says `Re-verified 2026-09-03` or `NOT YET RE-VERIFIED`; column T says what was found or corrected.
- `verification_log.json` — machine-readable record, keyed by 0-based data index (index i = sheet row i+2).
- `REMAINING_TO_VERIFY.csv` — the 191 outstanding rows with their sheet row numbers, ready to work straight down.
- `VERIFICATION_NOTES.md` — method, deletions and reasons, corrections, and the leads flagged for a live phone check.

## To pick this back up

Start a session on branch `claude/lead-verification-hixson-8jr30o` and say:

> Continue the lead verification. Read leads/RESUME.md and leads/REMAINING_TO_VERIFY.csv, verify the 191 outstanding rows to the same standard, then do the Hixson expansion.

## Method to keep using

One web search per business: `"<Business Name>" <City> TN phone address website email`. From the results establish that the business is operating, that the website domain actually belongs to it, that the phone is confirmed either on the company's own site or across two independent directories, plus the address and any published email.

Keep a row that has a verified phone and address but no website — just note that no website exists. Delete only when the business no longer exists independently, or when nothing at all can be confirmed. Where sources conflict, keep the row and say so in column T rather than guessing.

## Environment gotchas

- Outbound HTTP to arbitrary domains is blocked by the network egress policy. `curl` and WebFetch both fail on lead websites. Web search is the only verification channel — don't waste time rediscovering this.
- The per-session web search cap is raised to 500 in `.claude/settings.json`, which only applies to sessions started on a branch that has that file. The cap also appears to refill between sessions.
- `pip install openpyxl` if it isn't already present.
- Save results to `verification_log.json` after every batch so an interrupted run never loses more than one batch.

## Note on the interrupted parallel session

A second session (`session_01B84QRu1DgSRqSyKZ7b53rc`) was running this work and was interrupted before it committed anything. Roughly 15 minutes of its verification exists only inside its container and is **not** reflected here. If that session is still resumable, sending it "commit and push what you have" would recover it. Otherwise those rows simply get redone — they are still marked `NOT YET RE-VERIFIED`, so nothing is silently wrong.
