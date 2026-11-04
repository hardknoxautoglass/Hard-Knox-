# Release log (private)

Record every build that is packaged, every upload, swap, rollback and header change. One row per event.

| Date (UTC) | Event | Release / ZIP | SHA-256 | Authorized by | Environment | Outcome |
|---|---|---|---|---|---|---|
| 2026-11-04 | Plan approved by owner ("build website"); defaults from the plan applied | — | — | Owner (chat) | — | Build started |
| 2026-11-04 | v1.0 preview packaged (see `release/CHECKSUMS.txt`) | `release/hardknox-site-2026-11-04-v1.0.zip` | see CHECKSUMS.txt | Builder (packaging only) | Local | Ready for owner testing; **not published** |
| | Hostinger password-protected preview upload | | | Owner (explicit) | Preview subdomain | pending |
| | Backup export + restore drill | | | Owner | Preview folder | pending |
| | Publication cutover | | | **Owner (separate explicit authorization required)** | Live | pending |
| | Live smoke test | | | | Live | pending |

Rules: no upload to the live document root without a row here naming who authorized it; keep the previous release outside the web root for rollback; append, never rewrite, earlier rows.
