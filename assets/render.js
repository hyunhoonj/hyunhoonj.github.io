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

  /* Aspect ratios travel with the content as plain CSS values — '4/3', '1/1' —
     so a new one needs no class and no change here. */
  var DEFAULT_RATIO = '4/3';
  function ratio(value) {
    return /^\d+\s*\/\s*\d+$/.test(String(value || '')) ? String(value) : DEFAULT_RATIO;
  }

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

  function plain(text) { return String(text == null ? '' : text).replace(/==/g, '').replace(/\s+/g, ' ').trim(); }

  /* A newline the author typed becomes a break. Only the home statement asks
     for this — everywhere else the measure decides where lines end. The break
     is marked so a narrow sheet, which re-wraps at a different size, can stand
     it down rather than inherit a break measured against the wide one. */
  function authorBreaks(html) {
    /* The space after the break matters: on a wide sheet it is swallowed as
       leading whitespace on the new line, and on a narrow one — where the break
       stands down — it is the only thing left keeping the two words apart. */
    return html.replace(/[ \t]*\n[ \t]*/g, '<br class="soft-break"> ');
  }
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

  /* An empty plate where there is no image yet — exactly what the canvas draws
     for a slot nobody has filled. */
  function plate(ctx, image, r) {
    image = image || {};
    return '<div class="frame" style="aspect-ratio:' + ratio(r) + '">' +
      (image.src ? '<img src="' + esc(ctx.resolve(image.src)) + '" alt="' + esc(image.alt || '') + '">' : '') +
      '</div>';
  }

  function figure(ctx, fig) {
    fig = fig || {};
    return '<figure>' + plate(ctx, fig, fig.ratio) +
      (fig.caption ? '<figcaption>' + esc(fig.caption) + '</figcaption>' : '') +
      '</figure>';
  }

  /* A nav label that has a shorter cut for the narrow sheet, where the full one
     would not fit beside the brand and the language switch. CSS picks. */
  function navLabel(full, short) {
    if (!short || short === full) return esc(full);
    return '<span class="nav-full">' + esc(full) + '</span>' +
      '<span class="nav-abbr">' + esc(short) + '</span>';
  }

  function masthead(ctx) {
    var c = ctx.common;
    var name = esc(c.name).replace(' / ', ' <span class="slash">/</span> ');
    var other = ctx.lang === 'ko' ? 'en' : 'ko';
    var nav = [
      link(ctx, ctx.page === 'home' ? '' : 'home', name, 'masthead-name'),
      link(ctx, 'info', navLabel(c.navInfo, c.navInfoShort), '', ctx.page === 'info'),
      link(ctx, 'contact', navLabel(c.navContact, c.navContactShort), '', ctx.page === 'contact'),
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

  /* Home is an index of cards, not a stack of essays: one image, the line of
     metadata, and a sentence. The narrow sheet lays them two up and drops the
     sentence — the description belongs to the article from there on. */
  function home(ctx) {
    var d = ctx.content.home[ctx.lang];
    var cols = String(d.cols || '3').replace(/[^0-9]/g, '') || '3';

    var cards = (d.blocks || []).map(function (b) {
      var title = esc(b.title);
      if (b.slug) {
        title = '<a href="' + esc(ctx.resolve(articlePath(ctx.lang, b.slug))) + '">' + title + '</a>';
      }
      return '<article class="work"' + (b.id ? ' id="' + esc(b.id) + '"' : '') + '>' +
        plate(ctx, b.image, b.ratio) +
        '<div class="work-meta">' +
          '<span class="work-title">' + title + '</span>' +
          '<span class="dim work-sep">,</span><span class="dim">' + esc(b.kind) + '</span>' +
          '<span class="dim work-sep">,</span><span class="dim">' + esc(b.year) + '</span>' +
        '</div>' +
        '<p class="work-desc">' + band(b.desc, 'band-2') + '</p>' +
        '</article>';
    }).join('\n');

    return '<h1 class="statement">' + authorBreaks(band(d.statement, 'band')) + '</h1>\n' +
      '<div class="works" style="--cols:' + cols + '">\n' + cards + '\n</div>';
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
          '<div class="contact-block contact-block--email">' + bracket(d.emailLabel) +
            '<div><a class="contact-email" href="mailto:' + esc(d.email) + '">' + esc(d.email) + '</a></div>' +
            '<div class="contact-reply">' + esc(d.reply) + '</div>' +
          '</div>' +
          '<div class="contact-block contact-block--channels">' + bracket(d.channelsLabel) +
            '<div class="channels">' + channels + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="contact-col">' + form +
          '<div class="contact-block contact-block--currently">' + bracket(d.currentlyLabel) +
            '<div class="currently">' + band(d.currently, 'band-2') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function tableBlock(caption, lines) {
    var row = function (line, cell) {
      return '<tr>' + line.split('|').map(function (c) {
        return '<' + cell + '>' + esc(c.trim()) + '</' + cell + '>';
      }).join('') + '</tr>';
    };
    return '<div class="table-block">' +
      '<table class="table">' +
        '<thead>' + row(lines[0] || '', 'th') + '</thead>' +
        '<tbody>' + lines.slice(1).map(function (l) { return row(l, 'td'); }).join('') + '</tbody>' +
      '</table>' +
      (caption ? '<div class="table-cap">' + esc(caption) + '</div>' : '') +
      '</div>';
  }

  /* One block per blank-line-separated chunk:
       [도판 n] / [Fig. n]   figure n of this document's figures
       ## text               a section heading
       > text                a pull quote — the quotation marks are ours, so the
                             text never has to carry a matched pair
       [표: cap] + rows      a table, cells split by |, first row the head
       anything else         a paragraph */
  function articleBody(ctx, text, figs) {
    return String(text == null ? '' : text)
      .split(/\n\s*\n/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean)
      .map(function (t) {
        var fig = /^\[(?:도판|Fig\.?)\s*(\d+)\]$/i.exec(t);
        if (fig) return figure(ctx, (figs || [])[Number(fig[1]) - 1]);

        var head = /^##\s+(.+)$/.exec(t);
        if (head) return '<h2 class="article-h2">' + esc(head[1].trim()) + '</h2>';

        if (t.charAt(0) === '>') {
          return '<p class="pull">&ldquo;' + band(t.replace(/^>\s*/, ''), 'band-2') + '&rdquo;</p>';
        }

        var table = /^\[(?:표|Table)(?::\s*([^\]]*))?\]\n([\s\S]+)$/.exec(t);
        if (table) {
          var lines = table[2].split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
          return tableBlock((table[1] || '').trim(), lines);
        }

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

  /* The full document, for build.js. `version` stamps the asset links: GitHub
     Pages serves them with a ten-minute cache, so without it a deploy can land
     and a browser still read yesterday's stylesheet. */
  function document_(content, opts) {
    var lang = opts.lang, page = opts.page;
    var self = pagePath(content, lang, page);
    var other = lang === 'ko' ? 'en' : 'ko';
    var stamp = opts.version ? '?v=' + opts.version : '';
    var rel = function (p) { return relative(self, p) + (/\.(css|js)$/.test(p) ? stamp : ''); };
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
    LANGS: LANGS, ROUTES: ROUTES, ratio: ratio,
    esc: esc, band: band, plain: plain, lines: lines, num: num,
    relative: relative, pagePath: pagePath, articlePath: articlePath,
    body: body, meta: meta, document: document_
  };
});
