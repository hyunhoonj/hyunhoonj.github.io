#!/usr/bin/env node
/* node build.js — writes the eight static pages from assets/content.js.
 *
 * No dependencies, no config. Run it after editing assets/content.js by hand,
 * or after dropping in a content.js exported from studio.html. */

const fs = require('fs');
const path = require('path');

const content = require('./assets/content.js');
const render = require('./assets/render.js');

const root = __dirname;
const written = [];

for (const lang of render.LANGS) {
  for (const page of ['home', 'info', 'contact', 'post']) {
    const out = path.join(root, render.pagePath(content, lang, page));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, render.document(content, { lang, page }), 'utf8');
    written.push(path.relative(root, out));
  }
}

console.log(written.map((f) => '  ' + f).join('\n'));
console.log(`\n${written.length} pages written.`);
