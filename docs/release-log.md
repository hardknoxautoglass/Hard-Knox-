# Release log (private)

Record every build that is packaged, every upload, swap, rollback and header change. One row per event.

| Date (UTC) | Event | Release / ZIP | SHA-256 | Authorized by | Environment | Outcome |
|---|---|---|---|---|---|---|
| 2026-11-04 | Plan approved by owner ("build website"); defaults from the plan applied | — | — | Owner (chat) | — | Build started |
| 2026-11-04 | v1.0 preview packaged after the full check chain passed (html-validate 0 errors; facts lint 0; crawl 0 problems; a11y suite 209/209, axe 0 violations; Lighthouse 100/100/100/100 on 4 pages) | `release/hardknox-site-2026-11-04-v1.0.zip` (25 files, 126,083 bytes) | `1c2a2a08ded8db263bef5d40772d60c6c3f4ab5f824a315a7881ee4b8e743f3f` | Builder (packaging only) | Local preview | Ready for owner testing; **not published** |
| 2026-11-04 | Owner instructions: remove the owner's name from the site; make the design more luxurious. Name removed everywhere (lint enforced); forest-and-gold design pass; gradient contrast made robust at the lightest point. Full chain re-run: html-validate 0; facts 0; crawl 0; a11y 209/209, axe 0; Lighthouse 100/100/100/100 ×4. v1.1 packaged. Private preview artifact republished (version 2). | `release/hardknox-site-2026-11-04-v1.1.zip` (26 files, 143,235 bytes) | `722d9937b1b37b12c2c1af5eaf8ec1d6d1339277ebb16615135d572156dc4522` | Builder (packaging only) | Local preview | Ready for owner testing; **not published**; v1.1 supersedes v1.0 |
| | Hostinger password-protected preview upload | | | Owner (explicit) | Preview subdomain | pending |
| | Backup export + restore drill | | | Owner | Preview folder | pending |
| | Publication cutover | | | **Owner (separate explicit authorization required)** | Live | pending |
| | Live smoke test | | | | Live | pending |

Rules: no upload to the live document root without a row here naming who authorized it; keep the previous release outside the web root for rollback; append, never rewrite, earlier rows.
