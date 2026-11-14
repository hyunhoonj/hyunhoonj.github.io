/* One renderer, two callers.
 *
 * `node build.js` uses it to write the static pages; studio.html uses the
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

  /* A newline the author typed becomes a break. The three statements ask for
     this — the rest of the site lets the measure decide where lines end. The break
     is marked so a narrow sheet, which re-wraps at a different size, can stand
     it down rather than inherit a break measured against the wide one.
     A blank line is different: it parts two sentences that are meant to stand
     apart, not a line measured against the wide sheet, so it holds at every
     width — the phone shows the same paragraph break as the wide sheet. */
  function authorBreaks(html) {
    /* The space after the break matters: on a wide sheet it is swallowed as
       leading whitespace on the new line, and on a narrow one — where the break
       stands down — it is the only thing left keeping the two words apart. */
    return html.split(/[ \t]*\n[ \t]*\n\s*/).map(function (part) {
      return part.replace(/[ \t]*\n[ \t]*/g, '<br class="soft-break"> ');
    }).join('<br><br>');
  }
  function lines(text) {
    return String(text == null ? '' : text).split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function num(i) { return String(i + 1).padStart(2, '0'); }

  function articlePath(lang, slug) { return ROUTES[lang].writing + slug + '.html'; }

  /* The site carried exactly one article once, as `post`. It is a list now, and
     both callers normalise on the way in — so a content.js from before the
     change, or a draft saved in a browser back then, still opens. */
  function normalize(content) {
    if (!content) return content;
    if (!Array.isArray(content.posts)) content.posts = content.post ? [content.post] : [];
    delete content.post;
    /* The contents list was a field of its own once, typed beside the body it
       described — and the two drifted apart, as two lists of the same thing do.
       It is read off the headings now, so the field is dropped wherever an older
       file or draft still carries one. */
    content.posts.forEach(function (entry) {
      LANGS.forEach(function (lang) { if (entry && entry[lang]) delete entry[lang].toc; });
    });
    return content;
  }

  function postAt(content, index) {
    return (content.posts || [])[index || 0] || null;
  }

  /* Which article carries this slug in this language, or -1. Home blocks point
     at an article by slug, and a block left pointing at a deleted one must not
     become a link to a page that is not there. */
  function postIndexBySlug(content, lang, slug) {
    var posts = content.posts || [];
    if (!slug) return -1;
    for (var i = 0; i < posts.length; i++) {
      if (posts[i] && posts[i][lang] && posts[i][lang].slug === slug) return i;
    }
    return -1;
  }

  function pagePath(content, lang, page, index) {
    if (page === 'post') {
      var p = postAt(content, index);
      return articlePath(lang, (p && p[lang] && p[lang].slug) || '');
    }
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

  /* `link`, when given, maps a row's index to an href and links the row's
     text (the contents rail points each heading at its section; a reference
     points at its paper). The number stays outside the link. */
  function numbered(list, cls, link) {
    return '<div class="rail-list' + (cls ? ' ' + cls : '') + '">' +
      list.map(function (t, i) {
        var href = link ? link(i) : '';
        return '<div>' + num(i) + ' &nbsp;' + (href ? '<a href="' + esc(href) + '">' + esc(t) + '</a>' : esc(t)) + '</div>';
      }).join('') +
      '</div>';
  }

  /* A reference may end in its address: the citation then links there and
     the bare URL is not printed. Without one it stays plain text. */
  function reference(line) {
    var m = /^(.*?)\s*(https?:\/\/\S+)$/.exec(line);
    return m ? { text: m[1], href: m[2] } : { text: line, href: '' };
  }

  /* Section n of an article is #section-n, counted in the order headings()
     lists them, so the contents rail and the headings agree. */
  function sectionId(i) { return 'section-' + (i + 1); }

  /* Where a home block leads. A block opens its article when the slug names one.
     Failing that it can open a page of its own outside writing/ — the atlas —
     given as a root-relative `href` ('atlas/', 'en/atlas/'), resolved like any
     other path so it holds from the sheet and from the studio alike. */
  function blockTarget(ctx, b) {
    return postIndexBySlug(ctx.content, ctx.lang, b.slug) >= 0 ? articlePath(ctx.lang, b.slug) : String(b.href || '').trim();
  }

  /* One row under an article: [이전 글] or [다음 글], then the title, kind and
     year of the work it names. A slug names an article directly — how the parts
     of a series point at each other, since only the series has a home block.
     Otherwise the id names a home block, and the title opens
     whatever that block opens — its article, or the atlas — or the block itself
     on the home page when it opens nothing. A row with no title is left out. */
  function neighbour(ctx, label, w) {
    w = w || {};
    if (!String(w.title || '').trim()) return '';
    var title = esc(w.title);
    if (w.slug && postIndexBySlug(ctx.content, ctx.lang, w.slug) >= 0) {
      title = '<a href="' + esc(ctx.resolve(articlePath(ctx.lang, w.slug))) + '">' + title + '</a>';
    } else if (w.id) {
      var b = (ctx.content.home[ctx.lang].blocks || []).filter(function (x) { return x.id === w.id; })[0];
      var href = (b && blockTarget(ctx, b)) || ROUTES[ctx.lang].home + '#' + w.id;
      title = '<a href="' + esc(ctx.resolve(href)) + '">' + title + '</a>';
    }
    return '<div class="split article-next">' +
        bracket(label) +
        '<div class="meta"><span>' + title + '</span>' +
          '<span class="dim">,</span><span class="dim">' + esc(w.kind) + '</span>' +
          '<span class="dim">,</span><span class="dim">' + esc(w.year) + '</span>' +
        '</div>' +
      '</div>';
  }

  /* A post joins a series by carrying series: { id, title, label, part,
     partLabel, group }. The series has no page of its own: every part lists all
     the parts, read off the posts, so publishing a part is the only step. */
  function seriesParts(ctx, id) {
    return (ctx.content.posts || []).map(function (entry, i) { return { d: entry && entry[ctx.lang], i: i }; })
      .filter(function (x) { return x.d && x.d.series && x.d.series.id === id; })
      .sort(function (a, b) { return (Number(a.d.series.part) || 0) - (Number(b.d.series.part) || 0); });
  }

  /* The rail names the series and the part, and points at the full list. */
  function seriesRail(s) {
    return '<div><div class="rail-title">[' + esc(s.label) + ']</div>' +
      '<div class="rail-list rail-list--dim"><a href="#series">' + esc(s.title) + '</a>' +
      (s.partLabel ? '<span>' + esc(s.partLabel) + '</span>' : '') + '</div></div>';
  }

  /* Every part, under the group it belongs to; the one being read is not a link. */
  function seriesList(ctx, s) {
    var group = null;
    var rows = seriesParts(ctx, s.id).map(function (x) {
      var p = x.d, head = '';
      if (p.series.group && p.series.group !== group) {
        group = p.series.group;
        head = '<div class="series-group">' + esc(group) + '</div>';
      }
      var title = esc(p.title), here = x.i === ctx.index;
      return head + '<div' + (here ? ' class="is-current" aria-current="page"' : '') + '>' +
        String(p.series.part).padStart(2, '0') + ' &nbsp;' +
        (here ? title : '<a href="' + esc(ctx.resolve(articlePath(ctx.lang, p.slug))) + '">' + title + '</a>') +
        '</div>';
    }).join('');
    return '<div class="article-refs article-series" id="series">' +
      '<div class="rail-title">[' + esc(s.label) + ' — ' + esc(s.title) + ']</div>' +
      '<div class="rail-list">' + rows + '</div></div>';
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
      var href = blockTarget(ctx, b);
      if (href) title = '<a href="' + esc(ctx.resolve(href)) + '">' + title + '</a>';
      return '<article class="work"' + (b.id ? ' id="' + esc(b.id) + '"' : '') + '>' +
        plate(ctx, b.image, b.ratio) +
        '<div class="work-meta">' +
          '<span class="work-title">' + title + '</span>' +
          /* Kind and year each follow a comma — an empty one is left out
             with its comma, so a card can read just "title, year". */
          [b.kind, b.year].filter(function (v) { return String(v || '').trim(); }).map(function (v) {
            return '<span class="dim work-sep">,</span><span class="dim">' + esc(v) + '</span>';
          }).join('') +
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
    return '<p class="lede">' + authorBreaks(band(d.statement, 'band')) + '</p>\n' +
      '<div class="groups">\n' + groups + '\n</div>';
  }

  function contact(ctx) {
    var d = ctx.content.contact[ctx.lang];
    var f = d.formLabels || {};

    var channels = (d.channels || []).map(function (c) {
      var name = c.href ? '<a href="' + esc(c.href) + '">' + esc(c.name) + '</a>' : esc(c.name);
      return '<div>' + name + (c.note ? ' <span class="note">— ' + esc(c.note) + '</span>' : '') + '</div>';
    }).join('');

    /* With a sheet address the message is saved to the owner's Google Sheet and
       the visitor stays on the page; without one, sending opens their mail app. */
    var endpoint = String(d.endpoint || '').trim();
    var form = d.formOn === false ? '' :
      '<form class="form" data-contact-form data-email="' + esc(d.email) + '"' +
        (endpoint ? ' data-endpoint="' + esc(endpoint) + '" data-sending="' + esc(f.sending) + '"' +
          ' data-sent="' + esc(f.sent) + '" data-failed="' + esc(f.failed) + '"' : '') + '>' +
        '<div class="field"><label for="c-name">' + esc(f.name) + '</label>' +
          '<input class="input" id="c-name" name="name" type="text" autocomplete="name" required></div>' +
        '<div class="field"><label for="c-mail">' + esc(f.email) + '</label>' +
          '<input class="input" id="c-mail" name="email" type="email" autocomplete="email" required></div>' +
        '<div class="field"><label for="c-body">' + esc(f.message) + '</label>' +
          '<textarea class="input" id="c-body" name="message" rows="6" required></textarea></div>' +
        /* A field people never see. Bots fill it in, and the sheet ignores what they send. */
        (endpoint ? '<div class="form-trap" aria-hidden="true"><label>Website <input name="website" type="text" tabindex="-1" autocomplete="off"></label></div>' : '') +
        '<div class="form-foot">' +
          '<button class="btn btn-primary" type="submit">' + esc(f.send) + '</button>' +
          '<span class="form-note">' + esc(d.formNote) + '</span>' +
          (endpoint ? '<span class="form-status" role="status"></span>' : '') +
        '</div>' +
      '</form>';

    return '<p class="lede lede--narrow">' + authorBreaks(band(d.statement, 'band')) + '</p>\n' +
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
          /* [요즘] is optional: with no sentence to show, the block goes too. */
          (String(d.currently || '').trim() ?
            '<div class="contact-block contact-block--currently">' + bracket(d.currentlyLabel) +
              '<div class="currently">' + band(d.currently, 'band-2') + '</div>' +
            '</div>' : '') +
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
  /* The blocks a body is made of. The contents list and the body itself read the
     same ones, so a heading cannot be in one and not the other. */
  function blocks(text) {
    return String(text == null ? '' : text)
      .split(/\n\s*\n/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
  }

  var HEADING = /^##\s+(.+)$/;

  /* Every section heading, in the order the body sets them — this is the
     contents list. Nobody types it twice. */
  function headings(text) {
    return blocks(text).map(function (t) {
      var m = HEADING.exec(t);
      return m ? m[1].trim() : null;
    }).filter(Boolean);
  }

  function articleBody(ctx, text, figs) {
    var sections = 0;
    return blocks(text)
      .map(function (t) {
        var fig = /^\[(?:도판|Fig\.?)\s*(\d+)\]$/i.exec(t);
        if (fig) return figure(ctx, (figs || [])[Number(fig[1]) - 1]);

        var head = HEADING.exec(t);
        if (head) return '<h2 class="article-h2" id="' + sectionId(sections++) + '">' + esc(head[1].trim()) + '</h2>';

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
    var entry = postAt(ctx.content, ctx.index);
    if (!entry || !entry[ctx.lang]) return '';
    var d = entry[ctx.lang];
    var toc = headings(d.body);
    var refs = lines(d.refs).map(reference);
    var series = d.series && d.series.id ? d.series : null;

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
          /* An article with no section headings has no contents to list, and a
             bare [차례] over nothing reads as something missing. */
          (toc.length ? '<div><div class="rail-title">[' + esc(d.tocLabel) + ']</div>' + numbered(toc, '', function (i) { return '#' + sectionId(i); }) + '</div>' : '') +
          '<div><div class="rail-title">[' + esc(d.subjectsLabel) + ']</div>' +
            '<div class="rail-list rail-list--dim">' +
              lines(d.subjects).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') +
            '</div>' +
          '</div>' +
          (series ? seriesRail(series) : '') +
        '</div>' +
        '<div class="article-body">' + articleBody(ctx, d.body, d.figures) +
          '<div class="article-refs">' +
            '<div class="rail-title">[' + esc(d.refsLabel) + ']</div>' +
              numbered(refs.map(function (r) { return r.text; }), '', function (i) { return refs[i].href; }) +
          '</div>' +
          (series ? seriesList(ctx, series) : '') +
        '</div>' +
      '</div>\n' +
      neighbour(ctx, d.prevLabel, d.prev) +
      neighbour(ctx, d.nextLabel, d.next);
  }

  var PAGES = { home: home, info: info, contact: contact, post: post };

  /* ── entry points ─────────────────────────────────────────────────────── */

  /* opts: { lang, page, index, resolve, main } — `index` picks the article when
     page is 'post'. resolve maps a root-relative path onto whatever the calling
     document needs (build passes a relative-path helper, the studio passes the
     path through untouched). `main` replaces the page body while keeping the
     masthead and colophon, which is how the studio draws its Shared tab: the
     head and foot with the matter left blank. */
  function body(content, opts) {
    var lang = opts.lang, page = opts.page, index = opts.index || 0;
    var self = pagePath(content, lang, page, index);
    var other = lang === 'ko' ? 'en' : 'ko';
    var ctx = {
      content: content, lang: lang, page: page, index: index,
      common: content.common[lang],
      counterpart: pagePath(content, other, page, index),
      resolve: opts.resolve || function (p) { return relative(self, p); }
    };
    var main = opts.main != null ? opts.main : PAGES[page](ctx);
    return '<div class="sheet">\n<div class="page">\n' +
      masthead(ctx) + '\n' + main + '\n' + colophon(ctx) +
      '\n</div>\n</div>';
  }

  function meta(content, lang, page, index) {
    var c = content.common[lang];
    if (page === 'home') return { title: c.title, desc: plain(content.home[lang].statement) };
    if (page === 'info') return { title: c.navInfo + ' — ' + c.title, desc: plain(content.info[lang].statement) };
    if (page === 'contact') return { title: c.navContact + ' — ' + c.title, desc: plain(content.contact[lang].statement) };
    var entry = postAt(content, index);
    var d = (entry && entry[lang]) || {};
    return { title: (d.title || '') + ' — ' + c.title, desc: plain(d.dek) };
  }

  /* The full document, for build.js. `version` stamps the asset links: GitHub
     Pages serves them with a ten-minute cache, so without it a deploy can land
     and a browser still read yesterday's stylesheet. */
  function document_(content, opts) {
    var lang = opts.lang, page = opts.page, index = opts.index || 0;
    var self = pagePath(content, lang, page, index);
    var other = lang === 'ko' ? 'en' : 'ko';
    var stamp = opts.version ? '?v=' + opts.version : '';
    var rel = function (p) { return relative(self, p) + (/\.(css|js)$/.test(p) ? stamp : ''); };
    var m = meta(content, lang, page, index);
    var alternates = LANGS.map(function (l) {
      return '<link rel="alternate" hreflang="' + l + '" href="' + esc(rel(pagePath(content, l, page, index))) + '">';
    }).join('\n  ');

    return '<!DOCTYPE html>\n' +
      '<html lang="' + lang + '">\n' +
      '<head>\n' +
      '  <meta charset="utf-8">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '  <title>' + esc(m.title) + '</title>\n' +
      '  <meta name="description" content="' + esc(m.desc) + '">\n' +
      // The rights notice, in the forms machines read: the author, an opt-out
      // from AI training that some crawlers honour, and the W3C TDM
      // Reservation Protocol (see also robots.txt and /.well-known/tdmrep.json).
      '  <meta name="author" content="' + esc(content.common[lang].name) + '">\n' +
      '  <meta name="robots" content="noai, noimageai">\n' +
      '  <meta name="tdm-reservation" content="1">\n' +
      '  ' + alternates + '\n' +
      '  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
      '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&amp;family=Noto+Serif+KR:wght@300;400;600&amp;display=swap">\n' +
      '  <link rel="stylesheet" href="' + esc(rel('assets/broadsheet.css')) + '">\n' +
      '  <link rel="stylesheet" href="' + esc(rel('assets/site.css')) + '">\n' +
      '</head>\n' +
      '<body>\n' +
      body(content, { lang: lang, page: page, index: index, resolve: rel }) + '\n' +
      '<script src="' + esc(rel('assets/site.js')) + '"></script>\n' +
      '</body>\n' +
      '</html>\n';
  }

  return {
    LANGS: LANGS, ROUTES: ROUTES, ratio: ratio,
    esc: esc, band: band, plain: plain, lines: lines, num: num, headings: headings,
    relative: relative, pagePath: pagePath, articlePath: articlePath,
    normalize: normalize, postAt: postAt, postIndexBySlug: postIndexBySlug,
    body: body, meta: meta, document: document_
  };
});
