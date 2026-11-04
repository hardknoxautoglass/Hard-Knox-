# Deployment, staging and rollback guide (private)

This guide takes the release ZIP from the repository to HardKnoxAutoGlass.com on Hostinger **only after the owner has given separate, explicit publication authorization**. Nothing in it is to be done on a hunch. Keep this file and everything else in `docs/` **outside** `public_html`.

## 0. What is being deployed

- Release: `release/hardknox-site-<date>-v1.0.zip` with its SHA-256 in `release/CHECKSUMS.txt` and the exact file list beside it.
- Contents (no enclosing folder): `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `.htaccess`, twelve page folders each holding one `index.html`, and `assets/` (one hashed CSS, one hashed JS, two hashed WOFF2 fonts + `OFL.txt`, three icon files). 25 files.
- Canonical host built in: `https://hardknoxautoglass.com/` (checklist A6). If the owner chooses `www`, change `origin` in `tools/site-config.js`, run `node tools/build.js`, re-run the checks and re-package before any upload.

## 1. Prerequisites to confirm in hPanel (do not skip; checklist A7)

| # | Check | Where | Pass condition |
|---|---|---|---|
| 1 | Product is Hostinger **Web Hosting** (Single/Premium/Business/Cloud), not **Website Builder** | hPanel → Websites | File Manager and `.htaccess` support exist. A Builder-only plan cannot serve these files: **stop and report**; do not buy or change anything. |
| 2 | Document root for this domain | hPanel → Websites → Dashboard → "Website root" / File Manager | Usually `/public_html` for the primary domain, `/domains/hardknoxautoglass.com/public_html` for an addon domain. Write it down. |
| 3 | Domain registrar and DNS manager; registrar lock on; auto-renew on | hPanel → Domains, or the external registrar | Note where DNS lives. Do not change DNS for this release unless the domain is not yet pointed at the hosting. |
| 4 | TLS certificate valid for `hardknoxautoglass.com` **and** `www.hardknoxautoglass.com` | hPanel → Websites → Security → SSL; `curl -sI https://www.hardknoxautoglass.com/` | Both serve a valid certificate before `.htaccess` (which forces HTTPS) is uploaded. If `www` has no certificate, request one first; otherwise the www → bare redirect would start with a certificate warning. |
| 5 | Existing contents of the document root | File Manager | Download everything (including dotfiles) as the pre-launch backup; list any verification files (`google*.html`, `BingSiteAuth.xml`), existing `.htaccess` rules and redirects to preserve. If a site is live, build the migration map (section 7). |
| 6 | DNS records export | DNS zone editor | Save every record (A/AAAA/CNAME/MX/TXT incl. SPF/DKIM/DMARC). Nothing is to be removed by this release. |
| 7 | Backups | hPanel → Files → Backups | Confirm the plan's backup cadence and that a restore is possible; take a manual backup immediately before cutover. |
| 8 | "Force HTTPS" toggle | hPanel → Security → SSL | Either state is fine; the `.htaccess` rule produces the same single-hop redirect. Do not add a second redirect layer (e.g., Cloudflare rules) without re-testing for loops. |

## 2. Stage: private preview on the real host (recommended before cutover)

Purpose: prove that Hostinger honours the `.htaccess` (404 status, headers, redirects, no listing), that nothing is injected, and that the pages render on the real stack. Use **real access control**, not obscurity.

1. In hPanel create a subdomain, e.g. `preview.hardknoxautoglass.com`, with its own folder (e.g. `/domains/preview.hardknoxautoglass.com/public_html`). Request its SSL certificate.
2. Upload the ZIP there via File Manager → Upload → Extract (confirm the files land directly in the folder, not in a sub-folder).
3. Protect the folder: hPanel → Advanced → **Password Protect Directories** → the preview folder. Share the credentials only with the owner.
4. Edit **only the preview copy** of `.htaccess`: comment out the `www` rule and change the HTTPS rule's target host to the preview host (or remove rules 1–2) so the preview does not redirect to production. Keep everything else identical. **Never copy the preview's auth or edits into production.**
5. Run the host checks (section 4) against the preview with the password.
6. Record results in `docs/validation-report.md` under "Authorized deployment verified (preview)". Note what the preview cannot prove: the production certificate, the production redirects, and search-engine behaviour.
7. After launch, delete the preview folder and subdomain.

## 3. Cutover (only with explicit publication authorization recorded in `docs/release-log.md`)

If the domain already points at the target folder, **replacing its contents is publication**. Use a prepared switch so the live window is seconds:

1. Confirm the manual backup from step 1.7 exists and that you have the downloaded copy of the old root (step 1.5).
2. Upload the ZIP to a sibling folder, e.g. `/public_html_new/`, and extract it there. Verify the file list matches `release/*.filelist.txt` (25 files, `.htaccess` present, no enclosing folder, no stray files).
3. Copy any verification files from the old root into `/public_html_new/` (e.g., `google1234.html`, `BingSiteAuth.xml`). Do not copy old `.htaccess` rules unless they are in the migration map.
4. In File Manager: rename `public_html` → `public_html_old`, then `public_html_new` → `public_html`. (Two renames; a few seconds of 404s at most.) If the hosting uses `/domains/<domain>/public_html`, do the same there.
5. Run the live smoke test (section 5) immediately.
6. Keep `public_html_old` **outside the web root**: move it to `/backups/public_html_old_<date>/` (not browsable), or download and delete it. Never leave an archive, ZIP or backup browsable inside the web root.
7. Set the effective dates (checklist A9) **before** packaging the launch build, not after.

## 4. Host checks (preview and live) — commands and expected results

Replace `HOST` with the preview host (add `-u user:pass`) or `hardknoxautoglass.com`.

```bash
curl -sI https://HOST/ | sed -n '1p;/content-security-policy/Ip;/x-content-type-options/Ip;/referrer-policy/Ip;/permissions-policy/Ip;/x-frame-options/Ip;/cache-control/Ip;/set-cookie/Ip'
```
Expected: `HTTP/2 200`, the CSP exactly as in `site/.htaccess`, `nosniff`, `strict-origin-when-cross-origin`, `DENY`, the Permissions-Policy, `Cache-Control: max-age=300, must-revalidate`, **no** `Set-Cookie`.

```bash
curl -sI https://HOST/no-such-page/deeper/ | head -1
```
Expected: `HTTP/2 404` (and the body is the styled 404 page: `curl -s https://HOST/no-such-page/ | grep -c 'We can'`).

```bash
curl -sI https://HOST/assets/ | head -1
```
Expected: `404` (directory listing off; no index).

```bash
curl -sI http://hardknoxautoglass.com/services/ | sed -n '1p;/location/Ip'
curl -sI https://www.hardknoxautoglass.com/services/ | sed -n '1p;/location/Ip'
curl -sI https://hardknoxautoglass.com/services | sed -n '1p;/location/Ip'
curl -sI https://hardknoxautoglass.com/services/index.html | sed -n '1p;/location/Ip'
curl -sI "https://hardknoxautoglass.com/warranty/?utm_source=test" | head -1
```
Expected (live only): each of the first four is a single `301` straight to `https://hardknoxautoglass.com/services/` (no chain, no loop); the last is `200` (query strings are left alone; the self-canonical handles them).

```bash
curl -sI https://HOST/assets/css/site.XXXXXXXX.css | sed -n '/cache-control/Ip;/content-type/Ip;/content-encoding/Ip'
```
Expected: `public, max-age=31536000, immutable`, `text/css`, and `br` or `gzip` when requested with `-H 'Accept-Encoding: gzip, br'`.

```bash
curl -s https://HOST/robots.txt; curl -s https://HOST/sitemap.xml | grep -c '<loc>'
```
Expected: the two-line robots file with the absolute sitemap URL; `13` locations.

Browser (clean profile, DevTools → Network and Application): first and repeat visit to `/`, `/service-area-contact/`, `/warranty/`; open the menu; tap Call/Text/email on a phone. Expected: only same-origin requests; no cookies; empty storage; no service worker; no injected scripts (search the HTML source for `<script` — exactly two: the inline boot and `/assets/js/site.*.js`); no host "optimization" rewrites of the HTML.

If **anything** above fails on the live host, correct it immediately or roll back (section 6), clear host caches (hPanel → Advanced → Cache Manager, if present), and re-run this whole section.

## 5. Live smoke test (immediately after cutover)

| # | Check | Expected |
|---|---|---|
| 1 | `https://hardknoxautoglass.com/` loads with the padlock; header, hero, cards, footer render; fonts load | 200, styled |
| 2 | Every route in `sitemap.xml` returns 200 with its own title (script: `for u in $(curl -s https://hardknoxautoglass.com/sitemap.xml \| grep -o 'https[^<]*'); do printf "%s " "$u"; curl -s -o /dev/null -w "%{http_code}\n" "$u"; done`) | all 200 |
| 3 | Random missing URL and a nested one | 404 with the styled page |
| 4 | Redirect matrix (section 4) | single hops |
| 5 | Headers and CSP on a real response | as above |
| 6 | Contact destinations on a phone: Call opens dialer to +1 865-299-3533; Text opens the composer; Contact page email opens mail | correct number, nothing sent |
| 7 | Rendered facts: phone, hours end 6:00 PM, service area, six services, no "Licensed & Insured", no prices, effective dates = publication date | as built |
| 8 | Network/storage in a clean profile | same-origin only, no cookies |
| 9 | `robots.txt`, `sitemap.xml`, crawl directives (no `noindex` except `404.html`, no `X-Robots-Tag` header) | correct |
| 10 | Print preview of `/warranty/` | all 13 sections |

Record each as release / environment / path / expected / observed / method-device / date / status in `docs/validation-report.md` under "Authorized deployment verified (live)".

## 6. Rollback

- **Fast rollback (minutes):** rename `public_html` → `public_html_failed_<date>` and `public_html_old` (or the restored backup) → `public_html`. Clear host caches. Re-run the smoke test. Move the failed folder out of the web root.
- **From Hostinger backup:** hPanel → Files → Backups → restore the files backup taken in step 1.7 to the document root. Confirm dotfiles (`.htaccess`) were restored.
- **Restore drill (do once, on the preview folder, before launch):** upload the pre-launch backup ZIP to the preview folder, verify it serves, then put the release back. Record the drill in the validation report.
- Rolling back never touches DNS or certificates; if DNS was changed for this release (it should not have been), restore the exported zone.

## 7. Migration map (only if a site is live before cutover)

Not applicable until checklist A7 confirms whether anything is live. If it is: inventory every URL (crawl the live site, check Search Console "Pages" and any known inbound links), then for each old URL choose exactly one of: keep (same URL), 301 to the single genuinely equivalent new page, or 404/410. Add the 301s to `.htaccess` **above** rule 3, as `Redirect 301 /old-path /new-path/` lines, and test each old URL on the preview. No blanket redirect to Home. Keep `tel:`/`sms:`/`mailto:` and verification paths out of any rule.

## 8. Security hygiene for the owner (do once)

- Hostinger account and the Google account: unique passwords in a password manager; two-factor (passkey or authenticator app) on both; no shared logins.
- Registrar: lock on, auto-renew on, contact email current, expiry reminder in the calendar.
- Limit hPanel access to the owner; remove any agency/temporary users after launch.
- HSTS: **not enabled at launch.** Revisit after at least one automatic certificate renewal has been observed (about 90 days) and only with `max-age` alone — no `includeSubDomains`, no `preload`.

## 9. Release log

Every upload, swap, rollback and header change goes in `docs/release-log.md` with date, who authorized it, ZIP name and SHA-256, and the smoke-test outcome.
