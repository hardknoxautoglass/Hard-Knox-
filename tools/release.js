'use strict';
/* Builds the public release ZIP from an allow-list of site/ contents (no enclosing folder),
   re-extracts it into an empty directory, verifies the file list (including dotfiles) matches site/,
   and records the SHA-256 checksum. Usage: node tools/release.js [label]
   Output: release/hardknox-site-<date>-<label>.zip and release/CHECKSUMS.txt */
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const REL = path.join(ROOT, 'release');
fs.mkdirSync(REL, { recursive: true });

const ALLOW = /^(index\.html|404\.html|robots\.txt|sitemap\.xml|\.htaccess|[a-z0-9-]+\/index\.html|assets\/(css\/site\.[0-9a-f]{8}\.css|js\/site\.[0-9a-f]{8}\.js|fonts\/montserrat-(600|700|800)\.[0-9a-f]{8}\.woff2|fonts\/OFL\.txt|img\/(favicon\.svg|favicon-32\.png|apple-touch-icon\.png)))$/;

function listFiles(dir) {
  const out = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) walk(p); else out.push(path.relative(dir, p));
    }
  })(dir);
  return out.sort();
}

const files = listFiles(SITE);
const disallowed = files.filter((f) => !ALLOW.test(f));
if (disallowed.length) { console.error('Refusing to package files outside the allow-list:', disallowed); process.exit(1); }

const label = process.argv[2] || 'v1.0';
const date = new Date().toISOString().slice(0, 10);
const zipName = `hardknox-site-${date}-${label}.zip`;
const zipPath = path.join(REL, zipName);
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
// -X: no extra attributes; -r: recurse; -D: no directory entries; run inside site/ so there is no enclosing folder.
execFileSync('zip', ['-X', '-r', '-D', '-q', zipPath, '.', '-i', ...files], { cwd: SITE });

// Re-extract into an empty temp dir and compare.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hardknox-release-'));
execFileSync('unzip', ['-q', zipPath, '-d', tmp]);
const extracted = listFiles(tmp);
const same = JSON.stringify(extracted) === JSON.stringify(files);
let bytesSame = true;
for (const f of files) {
  const a = fs.readFileSync(path.join(SITE, f)); const b = fs.readFileSync(path.join(tmp, f));
  if (!a.equals(b)) { bytesSame = false; console.error('content differs:', f); }
}
fs.rmSync(tmp, { recursive: true, force: true });
if (!same || !bytesSame) { console.error('Extracted ZIP does not match site/'); process.exit(1); }

const sha = crypto.createHash('sha256').update(fs.readFileSync(zipPath)).digest('hex');
const size = fs.statSync(zipPath).size;
const line = `${sha}  ${zipName}  (${size} bytes, ${files.length} files, built ${new Date().toISOString()})`;
fs.appendFileSync(path.join(REL, 'CHECKSUMS.txt'), line + '\n');
fs.writeFileSync(path.join(REL, `${zipName}.filelist.txt`), files.join('\n') + '\n');
console.log('Release ZIP:', path.relative(ROOT, zipPath));
console.log('SHA-256   :', sha);
console.log(`Files     : ${files.length} (re-extracted and byte-compared: OK)`);
console.log('Contents  :', files.join(', '));
