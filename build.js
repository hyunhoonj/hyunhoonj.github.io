#!/usr/bin/env node
/* node build.js — writes the static pages from assets/content.js, and stamps
 * every asset link with a version so a deploy is never read through a stale
 * cache. GitHub Pages serves assets with max-age=600; without the stamp a
 * change can be live and a browser still be reading the old stylesheet for
 * another ten minutes.
 *
 * Six fixed pages — home, information, contact, in two languages — plus two per
 * article in content.posts.
 *
 * No dependencies, no config. Run it after editing assets/content.js by hand,
 * or after dropping in a content.js exported from studio.html. */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const render = require('./assets/render.js');
const content = render.normalize(require('./assets/content.js'));

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

/* A slug is a filename and a URL, so it has to be one before anything is
 * written. An empty or repeated one would quietly overwrite another article's
 * page — better to stop with the reason than to deploy that. */
const bad = [];
for (const lang of render.LANGS) {
  const seen = new Set();
  content.posts.forEach((entry, i) => {
    const slug = String(((entry && entry[lang]) || {}).slug || '').trim();
    const where = `posts[${i}].${lang}`;
    if (!slug) bad.push(`${where}: the slug is empty`);
    else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) bad.push(`${where}: "${slug}" — lowercase letters, digits and hyphens only`);
    else if (seen.has(slug)) bad.push(`${where}: "${slug}" is used by another article`);
    else seen.add(slug);
  });
}
if (bad.length) {
  console.error('Nothing written — fix these slugs in assets/content.js:\n' +
    bad.map((b) => '  ' + b).join('\n'));
  process.exit(1);
}

const written = [];
for (const lang of render.LANGS) {
  const pages = [{ page: 'home' }, { page: 'info' }, { page: 'contact' }]
    .concat(content.posts.map((_, index) => ({ page: 'post', index })));
  for (const { page, index } of pages) {
    const out = path.join(root, render.pagePath(content, lang, page, index));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, render.document(content, { lang, page, index, version }), 'utf8');
    written.push(path.relative(root, out));
  }
}

/* An article deleted in the studio leaves its page behind, and a page nothing
 * links to is still a page anyone holding the URL can read. The writing folders
 * are generated in full, so anything in them this build did not write is gone
 * from the content and goes with it. */
const kept = new Set(written);
const removed = [];
for (const lang of render.LANGS) {
  const dir = render.ROUTES[lang].writing;
  if (!fs.existsSync(path.join(root, dir))) continue;
  for (const file of fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith('.html'))) {
    if (kept.has(dir + file)) continue;
    fs.unlinkSync(path.join(root, dir, file));
    removed.push(dir + file);
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
if (removed.length) console.log('\n' + removed.map((f) => '  − ' + f).join('\n'));
console.log(`\n${written.length} pages written` +
  (removed.length ? `, ${removed.length} removed` : '') +
  `, assets stamped v=${version}.`);
