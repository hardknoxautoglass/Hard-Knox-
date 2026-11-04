'use strict';
/* Local preview server for site/.
   It EMULATES the intended .htaccess behaviour (directory index, trailing-slash and index.html
   redirects, custom 404 with a real 404 status, security headers, caching headers) so that the crawl,
   accessibility and performance checks run against realistic responses.
   It is NOT proof that Hostinger honours .htaccess; that is verified on the authorized preview/live host. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'site');
const PORT = Number(process.env.PORT || 8080);
const buildInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'out', 'build-info.json'), 'utf8'));

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon',
};

function securityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()');
  // The real CSP includes upgrade-insecure-requests; over plain HTTP locally that would break nothing but is dropped
  // so the emulation does not rewrite http:// requests. Everything else is identical to .htaccess.
  res.setHeader('Content-Security-Policy', buildInfo.csp.replace('; upgrade-insecure-requests', ''));
}

function send(res, status, file, extraHeaders = {}) {
  const ext = path.extname(file).toLowerCase();
  const body = fs.readFileSync(file);
  securityHeaders(res);
  res.setHeader('Content-Type', TYPES[ext] || 'application/octet-stream');
  if (ext === '.html') res.setHeader('Cache-Control', 'max-age=300, must-revalidate');
  else if (/\.[0-9a-f]{8}\.(css|js|woff2)$/.test(file)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  else res.setHeader('Cache-Control', 'public, max-age=86400');
  for (const [k, v] of Object.entries(extraHeaders)) res.setHeader(k, v);
  res.writeHead(status);
  res.end(body);
}

function redirect(res, location) {
  securityHeaders(res);
  res.writeHead(301, { Location: location, 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(`Moved to ${location}`);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let p = decodeURIComponent(url.pathname);
  const qs = url.search || '';

  // Dotfiles are denied (matches the .htaccess FilesMatch rule).
  if (p.split('/').some((seg) => seg.startsWith('.') && seg.length > 1)) {
    securityHeaders(res); res.writeHead(403, { 'Content-Type': 'text/plain' }); return res.end('Forbidden');
  }
  // /path/index.html -> /path/
  if (/\/index\.html$/.test(p)) return redirect(res, p.replace(/index\.html$/, '') + qs);

  const abs = path.join(ROOT, p);
  if (!abs.startsWith(ROOT)) { securityHeaders(res); res.writeHead(400); return res.end(); }

  if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
    if (!p.endsWith('/')) return redirect(res, p + '/' + qs); // add trailing slash
    const idx = path.join(abs, 'index.html');
    if (fs.existsSync(idx)) return send(res, 200, idx);
    // Directory without index: no listing (Options -Indexes) -> 404 page
    return send(res, 404, path.join(ROOT, '404.html'));
  }
  if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return send(res, 200, abs);
  return send(res, 404, path.join(ROOT, '404.html'));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Preview (emulated .htaccess) at http://127.0.0.1:${PORT}/`);
});
