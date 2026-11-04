'use strict';
// Validates every generated HTML file with html-validate (recommended preset + a few explicit rules).
const fs = require('fs');
const path = require('path');
const { HtmlValidate } = require('html-validate');

const SITE = path.join(__dirname, '..', 'site');
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(SITE);

const hv = new HtmlValidate({
  extends: ['html-validate:recommended', 'html-validate:document'],
  rules: {
    'no-inline-style': 'error',
    'tel-non-breaking': 'off',       // numbers inside tel: links sit in <span class="num"> with white-space: nowrap instead of entities
    'require-sri': 'off',            // all assets are same-origin; SRI is for cross-origin resources
    'no-trailing-whitespace': 'off',
    'long-title': ['error', { maxlength: 70 }],
    'heading-level': 'error',
    'wcag/h30': 'error',
    'wcag/h32': 'error',
    'wcag/h37': 'error',
    'wcag/h63': 'error',
    'empty-heading': 'error',
    'unique-landmark': 'error',
    'no-dup-id': 'error',
    'valid-id': 'error',
    'prefer-native-element': 'error',
    'meta-refresh': 'error',
  },
});

(async () => {
  let errors = 0;
  const summary = [];
  for (const f of files) {
    const report = await hv.validateFile(f);
    const rel = path.relative(SITE, f);
    const msgs = report.results.flatMap((r) => r.messages);
    const errs = msgs.filter((m) => m.severity === 2);
    const warns = msgs.filter((m) => m.severity === 1);
    errors += errs.length;
    summary.push({ file: rel, errors: errs.length, warnings: warns.length });
    for (const m of msgs) console.log(`${m.severity === 2 ? 'ERROR' : 'warn '} ${rel}:${m.line}:${m.column} ${m.ruleId} ${m.message}`);
  }
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'out', 'html-validate.json'), JSON.stringify(summary, null, 2));
  console.log(`\nhtml-validate: ${files.length} files, ${errors} errors.`);
  process.exit(errors ? 1 : 0);
})();
