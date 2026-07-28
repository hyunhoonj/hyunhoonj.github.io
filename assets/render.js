/* One renderer, two callers.
 *
 * `node build.js` uses it to write the eight static pages; studio.html uses the
 * same functions for its live preview. That is the whole reason it exists as a
 * plain script with a CommonJS tail rather than an ES module — it has to load
 * from a file:// page and from Node without a build step in between.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SiteRender = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var LANGS = ['ko', 'en'];

  /* Where each page lands, relative to the site root. */
  var ROUTES = {
    ko: { home: 'index.html', info: 'information.html', contact: 'contact.html', writing: 'writing/' },
    en: { home: 'en/index.html', info: 'en/information.html', contact: 'en/contact.html', writing: 'en/writing/' }
  };

  /* Figure layouts, as the design uses them. `wide` spans both columns. */
  var LAYOUTS = {
    two: [{ ratio: '4-3' }, { ratio: '4-3' }],
    tall: [{ ratio: '4-5' }, { ratio: '4-5' }],
    wide: [{ ratio: '4-3' }, { ratio: '4-3' }, { ratio: '16-8', wide: true }],
    full: [{ ratio: '16-8', wide: true }],
    none: []
  };

  var ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESCAPES[c]; });
  }

  /* ==text== becomes a highlight band. Every occurrence, not just the first. */
  function band(text, cls) {
    var t = String(text == null ? '' : text);
    var re = /==([\s\S]+?)==/g, out = '', last = 0, m;
    while ((m = re.exec(t)) !== null) {
      out += esc(t.slice(last, m.index)) + '<span class="' + cls + '">' + esc(m[1]) + '</span>';
      last = m.index + m[0].length;
    }
    return out + esc(t.slice(last));
  }

  function plain(text) { return String(text == null ? '' : text).replace(/==/g, ''); }
  function lines(text) {
    return String(text == null ? '' : text).split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function num(i) { return String(i + 1).padStart(2, '0'); }

  function articlePath(lang, slug) { return ROUTES[lang].writing + slug + '.html'; }

  function pagePath(content, lang, page) {
    if (page === 'post') return articlePath(lang, content.post[lang].slug);
    return ROUTES[lang][page];
  }

  /* A relative href from one output file to another, so the whole site opens
     straight off the filesystem as well as off a server. */
  function relative(from, to) {
    var f = from.split('/').slice(0, -1);
    var t = to.split('/');
    var i = 0;
    while (i < f.length && i < t.length - 1 && f[i] === t[i]) i++;
    var up = f.length - i;
    var out = (up ? new Array(up + 1).join('../') : '') + t.slice(i).join('/');
    return out || './';
  }

  /* ── pieces ───────────────────────────────────────────────────────────── */

  function figure(ctx, fig, ratio, wide) {
    fig = fig || {};
    var body = fig.src
      ? '<img src="' + esc(ctx.resolve(fig.src)) + '" alt="' + esc(fig.alt || '') + '">'
      : '';
    return '<figure' + (wide ? ' class="figure-wide"' : '') + '>' +
      '<div class="frame ratio-' + ratio + '">' + body + '</div>' +
      (fig.caption ? '<figcaption>' + esc(fig.caption) + '</figcaption>' : '') +
      '</figure>';
  }

  function figures(ctx, layout, figs) {
    var spec = LAYOUTS[layout] || LAYOUTS.none;
    if (!spec.length) return '';
    var out = spec.map(function (s, i) { return figure(ctx, (figs || [])[i], s.ratio, s.wide); });
    return '<div class="figures">' + out.join('') + '</div>';
  }

  function masthead(ctx) {
    var c = ctx.common;
    var name = esc(c.name).replace(' / ', ' <span class="slash">/</span> ');
    var other = ctx.lang === 'ko' ? 'en' : 'ko';
    var nav = [
      link(ctx, ctx.page === 'home' ? '' : 'home', name, 'masthead-name'),
      link(ctx, 'info', esc(c.navInfo), '', ctx.page === 'info'),
      link(ctx, 'contact', esc(c.navContact), '', ctx.page === 'contact'),
      '<a class="lang-switch" lang="' + other + '" hreflang="' + other + '" href="' +
        esc(ctx.resolve(ctx.counterpart)) + '">' + esc(c.langSwitch) + '</a>'
    ];
    return '<header class="masthead">' +
      '<div>' + nav[0] + '</div>' +
      '<nav class="masthead-nav">' + nav[1] + nav[2] + nav[3] + '</nav>' +
      '</header>';
  }

  /* An internal link that goes flat when it would only point at itself. */
  function link(ctx, page, html, cls, current) {
    var klass = cls ? ' class="' + cls + '"' : '';
    if (!page || page === ctx.page) return '<span' + klass + (current ? ' aria-current="page"' : '') + '>' + html + '</span>';
    return '<a' + klass + (current ? ' aria-current="page"' : '') +
      ' href="' + esc(ctx.resolve(pagePath(ctx.content, ctx.lang, page))) + '">' + html + '</a>';
  }

  function colophon(ctx) {
    var items = lines(ctx.common.links).map(function (l, i, arr) {
      var parts = l.split('|');
      var name = esc((parts[0] || '').trim());
      var href = (parts[1] || '').trim();
      var a = href ? '<a href="' + esc(href) + '">' + name + '</a>' : '<span>' + name + '</span>';
      return a + (i < arr.length - 1 ? '<span>,</span>' : '');
    });
    return '<footer class="colophon">' +
      '<div class="colophon-links">' + items.join('') + '</div>' +
      '<span class="colophon-copy">' + esc(ctx.common.copyright) + '</span>' +
      '</footer>';
  }

  function bracket(text) { return '<div class="label">[' + esc(text) + ']</div>'; }

  function numbered(list, cls) {
    return '<div class="rail-list' + (cls ? ' ' + cls : '') + '">' +
      list.map(function (t, i) { return '<div>' + num(i) + ' &nbsp;' + esc(t) + '</div>'; }).join('') +
      '</div>';
  }

  /* ── pages ────────────────────────────────────────────────────────────── */

  function home(ctx) {
    var d = ctx.content.home[ctx.lang];
    var works = (d.blocks || []).map(function (b) {
      var title = esc(b.title);
      if (b.slug) {
        title = '<a href="' + esc(ctx.resolve(articlePath(ctx.lang, b.slug))) + '">' + title + '</a>';
      }
      return '<article class="work"' + (b.id ? ' id="' + esc(b.id) + '"' : '') + '>' +
        '<div class="split">' +
          '<div class="meta">' +
            '<span>' + title + '</span>' +
            '<span class="dim">,</span><span class="dim">' + esc(b.kind) + '</span>' +
            '<span class="dim">,</span><span class="dim">' + esc(b.year) + '</span>' +
          '</div>' +
          '<p class="work-desc">' + band(b.desc, 'band-2') + '</p>' +
        '</div>' +
        figures(ctx, b.layout, b.figures) +
        '</article>';
    }).join('\n');

    return '<h1 class="statement">' + band(d.statement, 'band') + '</h1>\n' +
      '<div class="works">\n' + works + '\n</div>';
  }

  function info(ctx) {
    var d = ctx.content.info[ctx.lang];
    var groups = (d.groups || []).map(function (g) {
      var items = lines(g.items).map(function (t) { return '<div>' + esc(t) + '</div>'; }).join('');
      return '<div class="split">' + bracket(g.label) + '<div class="group-items">' + items + '</div></div>';
    }).join('\n');
    return '<p class="lede">' + band(d.statement, 'band') + '</p>\n' +
      '<div class="groups">\n' + groups + '\n</div>';
  }

  function contact(ctx) {
    var d = ctx.content.contact[ctx.lang];
    var f = d.formLabels || {};

    var channels = (d.channels || []).map(function (c) {
      var name = c.href ? '<a href="' + esc(c.href) + '">' + esc(c.name) + '</a>' : esc(c.name);
      return '<div>' + name + (c.note ? ' <span class="note">— ' + esc(c.note) + '</span>' : '') + '</div>';
    }).join('');

    var form = d.formOn === false ? '' :
      '<form class="form" data-contact-form data-email="' + esc(d.email) + '">' +
        '<div class="field"><label for="c-name">' + esc(f.name) + '</label>' +
          '<input class="input" id="c-name" name="name" type="text" autocomplete="name" required></div>' +
        '<div class="field"><label for="c-mail">' + esc(f.email) + '</label>' +
          '<input class="input" id="c-mail" name="email" type="email" autocomplete="email" required></div>' +
        '<div class="field"><label for="c-body">' + esc(f.message) + '</label>' +
          '<textarea class="input" id="c-body" name="message" rows="6" required></textarea></div>' +
        '<div class="form-foot">' +
          '<button class="btn btn-primary" type="submit">' + esc(f.send) + '</button>' +
          '<span class="form-note">' + esc(d.formNote) + '</span>' +
        '</div>' +
      '</form>';

    return '<p class="lede lede--narrow">' + band(d.statement, 'band') + '</p>\n' +
      '<div class="split contact">' +
        '<div class="contact-col">' +
          '<div>' + bracket(d.emailLabel) +
            '<div><a class="contact-email" href="mailto:' + esc(d.email) + '">' + esc(d.email) + '</a></div>' +
            '<div class="contact-reply">' + esc(d.reply) + '</div>' +
          '</div>' +
          '<div>' + bracket(d.channelsLabel) + '<div class="channels">' + channels + '</div></div>' +
        '</div>' +
        '<div class="contact-col">' + form +
          '<div>' + bracket(d.currentlyLabel) +
            '<div class="currently">' + band(d.currently, 'band-2') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* Blank line = paragraph · `> ` = pull-quote · [도판 n] / [Fig. n] = figure n. */
  function articleBody(ctx, text, figs) {
    return String(text == null ? '' : text)
      .split(/\n\s*\n/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean)
      .map(function (t) {
        var fig = /^\[(?:도판|Fig\.?)\s*(\d+)\]$/i.exec(t);
        if (fig) return figure(ctx, (figs || [])[Number(fig[1]) - 1], '4-3', false);
        if (t.charAt(0) === '>') return '<p class="pull">' + band(t.slice(1).trim(), 'band-2') + '</p>';
        return '<p>' + band(t, 'band-2') + '</p>';
      })
      .join('\n');
  }

  function post(ctx) {
    var d = ctx.content.post[ctx.lang];
    var next = d.next || {};
    var nextTitle = esc(next.title);
    if (next.id) {
      nextTitle = '<a href="' + esc(ctx.resolve(ROUTES[ctx.lang].home)) + '#' + esc(next.id) + '">' + nextTitle + '</a>';
    }

    return '<div class="split article-head">' +
        '<div class="meta meta--dim">' +
          '<span>' + esc(d.kind) + '</span><span>,</span>' +
          '<span>' + esc(d.date) + '</span><span>,</span>' +
          '<span>' + esc(d.readTime) + '</span>' +
        '</div>' +
        '<div>' +
          '<h1 class="article-title">' + esc(d.title) + '</h1>' +
          '<p class="article-dek">' + band(d.dek, 'band') + '</p>' +
        '</div>' +
      '</div>\n' +
      '<div class="split article-grid">' +
        '<div class="rail">' +
          '<div><div class="rail-title">[' + esc(d.tocLabel) + ']</div>' + numbered(lines(d.toc)) + '</div>' +
          '<div><div class="rail-title">[' + esc(d.subjectsLabel) + ']</div>' +
            '<div class="rail-list rail-list--dim">' +
              lines(d.subjects).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="article-body">' + articleBody(ctx, d.body, d.figures) +
          '<div class="article-refs">' +
            '<div class="rail-title">[' + esc(d.refsLabel) + ']</div>' + numbered(lines(d.refs)) +
          '</div>' +
        '</div>' +
      '</div>\n' +
      '<div class="split article-next">' +
        bracket(d.nextLabel) +
        '<div class="meta"><span>' + nextTitle + '</span>' +
          '<span class="dim">,</span><span class="dim">' + esc(next.kind) + '</span>' +
          '<span class="dim">,</span><span class="dim">' + esc(next.year) + '</span>' +
        '</div>' +
      '</div>';
  }

  var PAGES = { home: home, info: info, contact: contact, post: post };

  /* ── entry points ─────────────────────────────────────────────────────── */

  /* opts: { lang, page, resolve, main } — resolve maps a root-relative path onto
     whatever the calling document needs (build passes a relative-path helper,
     the studio passes the path through untouched). `main` replaces the page
     body while keeping the masthead and colophon, which is how the studio draws
     its Shared tab: the head and foot with the matter left blank. */
  function body(content, opts) {
    var lang = opts.lang, page = opts.page;
    var self = pagePath(content, lang, page);
    var other = lang === 'ko' ? 'en' : 'ko';
    var ctx = {
      content: content, lang: lang, page: page,
      common: content.common[lang],
      counterpart: pagePath(content, other, page),
      resolve: opts.resolve || function (p) { return relative(self, p); }
    };
    var main = opts.main != null ? opts.main : PAGES[page](ctx);
    return '<div class="sheet">\n<div class="page">\n' +
      masthead(ctx) + '\n' + main + '\n' + colophon(ctx) +
      '\n</div>\n</div>';
  }

  function meta(content, lang, page) {
    var c = content.common[lang];
    if (page === 'home') return { title: c.title, desc: plain(content.home[lang].statement) };
    if (page === 'info') return { title: c.navInfo + ' — ' + c.title, desc: plain(content.info[lang].statement) };
    if (page === 'contact') return { title: c.navContact + ' — ' + c.title, desc: plain(content.contact[lang].statement) };
    return { title: content.post[lang].title + ' — ' + c.title, desc: plain(content.post[lang].dek) };
  }

  /* The full document, for build.js. */
  function document_(content, opts) {
    var lang = opts.lang, page = opts.page;
    var self = pagePath(content, lang, page);
    var other = lang === 'ko' ? 'en' : 'ko';
    var rel = function (p) { return relative(self, p); };
    var m = meta(content, lang, page);
    var alternates = LANGS.map(function (l) {
      return '<link rel="alternate" hreflang="' + l + '" href="' + esc(rel(pagePath(content, l, page))) + '">';
    }).join('\n  ');

    return '<!DOCTYPE html>\n' +
      '<html lang="' + lang + '">\n' +
      '<head>\n' +
      '  <meta charset="utf-8">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '  <title>' + esc(m.title) + '</title>\n' +
      '  <meta name="description" content="' + esc(m.desc) + '">\n' +
      '  ' + alternates + '\n' +
      '  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
      '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&amp;family=Noto+Serif+KR:wght@300;400;600&amp;display=swap">\n' +
      '  <link rel="stylesheet" href="' + esc(rel('assets/broadsheet.css')) + '">\n' +
      '  <link rel="stylesheet" href="' + esc(rel('assets/site.css')) + '">\n' +
      '</head>\n' +
      '<body>\n' +
      body(content, { lang: lang, page: page, resolve: rel }) + '\n' +
      '<script src="' + esc(rel('assets/site.js')) + '"></script>\n' +
      '</body>\n' +
      '</html>\n';
  }

  return {
    LANGS: LANGS, ROUTES: ROUTES, LAYOUTS: LAYOUTS,
    esc: esc, band: band, plain: plain, lines: lines, num: num,
    relative: relative, pagePath: pagePath, articlePath: articlePath,
    body: body, meta: meta, document: document_
  };
});
