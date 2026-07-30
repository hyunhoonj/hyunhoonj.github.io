#!/usr/bin/env node
/* node build.js — writes the eight static pages from assets/content.js, and
 * stamps every asset link with a version so a deploy is never read through a
 * stale cache. GitHub Pages serves assets with max-age=600; without the stamp
 * a change can be live and a browser still be reading the old stylesheet for
 * another ten minutes.
 *
 * No dependencies, no config. Run it after editing assets/content.js by hand,
 * or after dropping in a content.js exported from studio.html. */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const content = require('./assets/content.js');
const render = require('./assets/render.js');

const root = __dirname;

/* One stamp for all of them: any asset changing gives every page a fresh set of
 * URLs. Cheaper to reason about than per-file hashes, and the pages are rewritten
 * on every build anyway. */
const ASSETS = ['broadsheet.css', 'site.css', 'site.js', 'render.js', 'content.js',
  'studio.css', 'studio.js', 'github.js'];
const version = crypto.createHash('sha256')
  .update(ASSETS.map((f) => fs.readFileSync(path.join(root, 'assets', f))).join('\n'))
  .digest('hex')
  .slice(0, 8);

const written = [];
for (const lang of render.LANGS) {
  for (const page of ['home', 'info', 'contact', 'post']) {
    const out = path.join(root, render.pagePath(content, lang, page));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, render.document(content, { lang, page, version }), 'utf8');
    written.push(path.relative(root, out));
  }
}

/* The studio is hand-written rather than generated, so its links get stamped
 * in place. */
for (const file of fs.readdirSync(root).filter((f) => /^studio-.*\.html$/.test(f))) {
  const before = fs.readFileSync(path.join(root, file), 'utf8');
  const after = before.replace(
    /(["'])(assets\/[\w.-]+\.(?:css|js))(?:\?v=[a-f0-9]+)?\1/g,
    (_, quote, asset) => `${quote}${asset}?v=${version}${quote}`
  );
  if (after !== before) fs.writeFileSync(path.join(root, file), after, 'utf8');
  written.push(file);
}

console.log(written.map((f) => '  ' + f).join('\n'));
console.log(`\n${written.length} pages written, assets stamped v=${version}.`);
