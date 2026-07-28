/* The writing desk. Five tabs over one document, two languages kept apart,
   and the page itself redrawn on the right through the same renderer the build
   uses — so what the preview shows is literally what `node build.js` will emit.
   Drafts live in localStorage; Publish hands back a content.js to commit. */
(function () {
  'use strict';

  var R = window.SiteRender;
  var esc = R.esc;
  var DRAFT_KEY = 'personal-site:draft';
  var UI_KEY = 'personal-site:ui';
  var CONTENT_PATH = 'assets/content.js';

  /* ── strings ──────────────────────────────────────────────────────────── */

  var L = {
    ko: {
      role: '작성', save: '저장', publish: '발행', revert: '되돌리기',
      dirty: '저장되지 않은 변경', savedNow: '방금 저장됨',
      savedAgo: function (n) { return n + '분 전 저장됨'; },
      published: '커밋됨 — 1~2분 뒤 지면에 반영됩니다',
      publishing: '저장소에 커밋하는 중…',
      conflict: '저장소 쪽이 더 새롭습니다 — 한 번 더 누르면 덮어씁니다',
      failed: '실패',
      needToken: '발행하려면 [공통] 탭에서 GitHub 토큰을 넣어주세요',
      localDraft: '이 기기에 아직 발행되지 않은 초안이 있습니다',
      uploading: '사진 올리는 중…',
      uploaded: '사진 올렸습니다 — 반영까지 1~2분',
      upload: '사진 올리기',
      connection: '연결',
      connectionNote: '토큰을 넣으면 [발행]이 이 기기에서 저장소로 바로 커밋합니다. 커밋이 들어가면 지면은 자동으로 다시 만들어집니다.',
      tokenLabel: 'GitHub 토큰',
      tokenHint: 'fine-grained PAT · 이 저장소 하나 · Contents 읽기/쓰기. <strong>이 브라우저에만</strong> 저장되고 다른 곳으로 나가지 않습니다. 만료일을 걸어두세요.',
      tokenOn: '연결됨', tokenOff: '연결 안 됨',
      download: 'content.js 내려받기',
      downloadNote: '토큰 없이 직접 넣고 싶을 때',
      downloaded: 'content.js 내려받음',
      reverted: '파일의 값으로 되돌림',
      revertAsk: '한 번 더 누르면 assets/content.js 의 값으로 되돌립니다',
      pages: '지면', drafts: '초안', preview: '미리보기', edit: '편집',
      previewNote: '입력하는 대로 지면이 바뀝니다. 도판은 images/ 폴더의 파일 경로로 지정합니다.',
      tabs: { post: '글', home: '메인', info: '소개', contact: '연락', common: '공통' },
      crumb: { post: '글 › ', home: '지면 › 메인', info: '지면 › 소개', contact: '지면 › 연락', common: '설정 › 공통' },
      dualNote: '두 언어는 따로 저장됩니다',
      bandHint: '<span class="mark">==강조==</span> 로 감싼 부분이 하이라이트 밴드가 됩니다',
      bodyHint: '빈 줄 = 새 단락 · <span class="mark">==강조==</span> = 하이라이트 밴드 · <span class="mark">&gt; 문장</span> = 인용 · <span class="mark">[도판 1]</span> = 그 자리에 도판',
      linksHint: '한 줄에 하나 — 이름 | 주소',
      title: '제목', lead: '리드 문장', kind: '분류', date: '날짜', url: 'URL',
      readTime: '읽는 시간', body: '본문',
      toc: '차례 — 한 줄에 하나', subjects: '주제 — 한 줄에 하나', refs: '참고 — 한 줄에 하나',
      figures: '도판', imagePath: '이미지 경로', caption: '캡션',
      next: '다음 글', nextTitle: '제목', nextKind: '분류', nextYear: '연도', nextId: '연결 — 메인 블록 id',
      statementOne: '스테이트먼트 — 한 문장',
      workBlocks: '작업 블록', desc: '설명', year: '연도', layout: '도판 배치',
      link: '연결 — 글 주소', addBlock: '＋ 블록 추가',
      up: '위로', down: '아래로', del: '삭제',
      bio: '소개문 — 3인칭 한 덩어리', groups: '목록 묶음', label: '라벨',
      items: '항목 — 한 줄에 하나', addGroup: '＋ 묶음 추가',
      statement: '스테이트먼트', email: '메일', reply: '응답 안내',
      currently: '요즘 — 지금 상태 한 문장', elsewhere: '그 밖에',
      name: '이름', note: '설명', href: '주소', addChannel: '＋ 채널 추가',
      formSection: '보내기 폼', formOn: '폼 켜짐 — 끄기', formOff: '폼 꺼짐 — 켜기',
      formToggleNote: '끄면 메일 주소만 남습니다', formNote: '폼 아래 안내문',
      commonNote: '여기서 고친 값은 네 지면의 머리와 꼬리에 함께 적용됩니다.',
      displayName: '표시 이름', navInfo: '내비 — 소개', navContact: '내비 — 연락',
      langSwitch: '언어 전환 표시', footerLinks: '푸터 링크', copyright: '카피라이트',
      draftList: '초안 목록 — 한 줄에 하나',
      commonPreview: '위의 머리와 아래의 꼬리가 네 지면에 그대로 얹힙니다. 본문 자리는 각 지면에서 채워집니다.',
      chars: function (n) { return n + '자'; },
      readAbout: '읽는 시간 약 ', readUnit: function (n) { return n + '분'; }, draftWord: '초안',
      layouts: { two: '2단 · 4:3 둘', tall: '2단 · 4:5 둘', wide: '2단 + 전폭', full: '전폭 · 16:8', none: '도판 없음' }
    },
    en: {
      role: 'Studio', save: 'Save', publish: 'Publish', revert: 'Revert',
      dirty: 'Unsaved changes', savedNow: 'Saved just now',
      savedAgo: function (n) { return 'Saved ' + n + ' min ago'; },
      published: 'Committed — live in a minute or two',
      publishing: 'Committing to the repository…',
      conflict: 'The repository is newer — press again to overwrite',
      failed: 'Failed',
      needToken: 'Add a GitHub token under [Shared] to publish',
      localDraft: 'This device has a draft that was never published',
      uploading: 'Uploading…',
      uploaded: 'Uploaded — live in a minute or two',
      upload: 'Upload a photo',
      connection: 'Connection',
      connectionNote: 'With a token, Publish commits straight to the repository from this device. The pages rebuild themselves once the commit lands.',
      tokenLabel: 'GitHub token',
      tokenHint: 'A fine-grained PAT · this one repository · Contents: Read and write. Kept in <strong>this browser only</strong> and sent nowhere else. Give it an expiry.',
      tokenOn: 'Connected', tokenOff: 'Not connected',
      download: 'Download content.js',
      downloadNote: 'For putting the file in by hand',
      downloaded: 'content.js downloaded',
      reverted: 'Reverted to the file',
      revertAsk: 'Press again to reload the values in assets/content.js',
      pages: 'Pages', drafts: 'Drafts', preview: 'Preview', edit: 'Edit',
      previewNote: 'The page changes as you type. Figures take the path of a file in images/.',
      tabs: { post: 'Article', home: 'Home', info: 'Information', contact: 'Contact', common: 'Shared' },
      crumb: { post: 'Article › ', home: 'Page › Home', info: 'Page › Information', contact: 'Page › Contact', common: 'Settings › Shared' },
      dualNote: 'The two languages save separately',
      bandHint: 'Text wrapped in <span class="mark">==…==</span> becomes the highlight band',
      bodyHint: 'Blank line = new paragraph · <span class="mark">==text==</span> = highlight band · <span class="mark">&gt; line</span> = pull-quote · <span class="mark">[Fig. 1]</span> = figure here',
      linksHint: 'One per line — name | URL',
      title: 'Title', lead: 'Lead', kind: 'Kind', date: 'Date', url: 'URL',
      readTime: 'Read time', body: 'Body',
      toc: 'Contents — one per line', subjects: 'Subjects — one per line', refs: 'References — one per line',
      figures: 'Figures', imagePath: 'Image path', caption: 'Caption',
      next: 'Next', nextTitle: 'Title', nextKind: 'Kind', nextYear: 'Year', nextId: 'Link — home block id',
      statementOne: 'Statement — one sentence',
      workBlocks: 'Work blocks', desc: 'Description', year: 'Year', layout: 'Figures',
      link: 'Link — article slug', addBlock: '＋ Add block',
      up: 'Up', down: 'Down', del: 'Delete',
      bio: 'Bio — one third-person block', groups: 'List groups', label: 'Label',
      items: 'Items — one per line', addGroup: '＋ Add group',
      statement: 'Statement', email: 'Email', reply: 'Reply note',
      currently: 'Currently — one sentence', elsewhere: 'Elsewhere',
      name: 'Name', note: 'Note', href: 'URL', addChannel: '＋ Add channel',
      formSection: 'Message form', formOn: 'Form on — turn off', formOff: 'Form off — turn on',
      formToggleNote: 'When off, only the email address remains', formNote: 'Note under the form',
      commonNote: 'These values apply to the head and foot of all four pages.',
      displayName: 'Display name', navInfo: 'Nav — info', navContact: 'Nav — contact',
      langSwitch: 'Language switch label', footerLinks: 'Footer links', copyright: 'Copyright',
      draftList: 'Draft list — one per line',
      commonPreview: 'The head above and the foot below sit on all four pages. The body is filled in on each page.',
      chars: function (n) { return n + ' chars'; },
      readAbout: 'about ', readUnit: function (n) { return n + ' min'; }, draftWord: 'Draft',
      layouts: { two: 'Two · 4:3', tall: 'Two · 4:5', wide: 'Two + full', full: 'Full · 16:8', none: 'None' }
    }
  };

  var TABS = ['post', 'home', 'info', 'contact', 'common'];
  var LAYOUT_KEYS = ['two', 'tall', 'wide', 'full', 'none'];
  var RATIO_CSS = { '4-3': '4 / 3', '4-5': '4 / 5', '16-8': '16 / 8' };

  /* ── state ────────────────────────────────────────────────────────────── */

  var state = {
    ui: 'ko',
    tab: 'post',
    dlang: 'ko',
    /* Narrow sheets have room for one pane at a time (turn 9e), so edit and
       preview become a switch. On a wide sheet both are always up and this is
       inert. */
    view: 'edit',
    doc: clone(window.SITE_CONTENT),
    dirty: false,
    savedAt: null,
    /* The blob sha of assets/content.js as the repository had it when this
       device last looked — how a stale publish gets caught. */
    baseSha: null,
    flash: ''
  };

  var flashTimer = null;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function t() { return L[state.ui]; }
  function cur() { return state.doc[state.tab][state.dlang]; }

  var hadDraft = false;
  try {
    var stored = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    if (stored && stored.doc) {
      state.doc = stored.doc;
      state.savedAt = stored.savedAt || null;
      hadDraft = true;
    }
    /* The chrome-language switch is a wide-sheet control (turn 9e drops it for
       room), so the choice has to persist or a phone could never leave the
       default. */
    var ui = localStorage.getItem(UI_KEY);
    if (ui === 'ko' || ui === 'en') state.ui = ui;
  } catch (e) { /* a corrupt draft is not worth a broken editor */ }

  /* Paths are read and written against the current tab + language slice, so a
     field only has to say where it lives: "blocks.0.figures.1.caption". */
  function getPath(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, cur());
  }
  function setPath(path, value) {
    var parts = path.split('.');
    var o = cur();
    for (var i = 0; i < parts.length - 1; i++) {
      if (o[parts[i]] == null) o[parts[i]] = {}; /* a draft saved before a field existed */
      o = o[parts[i]];
    }
    o[parts[parts.length - 1]] = value;
    touch();
  }
  function touch() { state.dirty = true; renderStatus(); renderPreview(); }

  /* ── field builders ───────────────────────────────────────────────────── */

  function fieldText(label, path, extra) {
    extra = extra || {};
    var id = 'ed-' + path.replace(/\./g, '-');
    return '<div class="field">' +
      '<label for="' + id + '">' + esc(label) + '</label>' +
      '<input class="input" id="' + id + '" type="text" data-path="' + esc(path) + '"' +
        (extra.style ? ' style="' + extra.style + '"' : '') +
        ' value="' + esc(getPath(path) || '') + '">' +
      (extra.hint ? '<span class="studio-hint">' + extra.hint + '</span>' : '') +
      '</div>';
  }

  function fieldArea(label, path, rows, extra) {
    extra = extra || {};
    var id = 'ed-' + path.replace(/\./g, '-');
    return '<div class="field">' +
      '<label for="' + id + '">' + esc(label) + '</label>' +
      '<textarea class="input" id="' + id + '" rows="' + rows + '" data-path="' + esc(path) + '"' +
        ' style="resize:vertical;' + (extra.style || '') + '">' + esc(getPath(path) || '') + '</textarea>' +
      (extra.hint ? '<span class="studio-hint">' + extra.hint + '</span>' : '') +
      '</div>';
  }

  function rowHead(list, i) {
    var s = t();
    return '<div class="studio-row-head">' +
      '<span>' + String(i + 1).padStart(2, '0') + '</span>' +
      '<div class="studio-row-acts">' +
        '<button class="studio-mini" type="button" data-act="up" data-list="' + list + '" data-i="' + i + '">' + esc(s.up) + '</button>' +
        '<button class="studio-mini" type="button" data-act="down" data-list="' + list + '" data-i="' + i + '">' + esc(s.down) + '</button>' +
        '<button class="studio-mini studio-mini--danger" type="button" data-act="del" data-list="' + list + '" data-i="' + i + '">' + esc(s.del) + '</button>' +
      '</div>' +
      '</div>';
  }

  /* The design's <image-slot> upload has nowhere to upload to on a static site,
     so a slot is a plate showing whatever the path points at, plus the path. */
  function figureSlots(basePath, figs, spec) {
    var s = t();
    return '<div class="studio-figs">' + spec.map(function (sp, i) {
      var f = (figs || [])[i] || {};
      var path = basePath + '.' + i;
      var plate = f.src
        ? '<img src="' + esc(f.src) + '" alt="">'
        : esc(s.figures + ' ' + (i + 1) + ' · ' + sp.ratio.replace('-', ':'));
      return '<div class="studio-fig">' +
        '<div class="studio-fig-plate" style="aspect-ratio:' + RATIO_CSS[sp.ratio] + '">' + plate + '</div>' +
        '<label class="studio-upload">' +
          '<input type="file" accept="image/*" data-upload="' + esc(path) + '">' +
          '<span>' + esc(s.upload) + '</span>' +
        '</label>' +
        fieldText(s.imagePath + ' ' + (i + 1), path + '.src') +
        fieldText(s.caption + ' ' + (i + 1), path + '.caption') +
        '</div>';
    }).join('') + '</div>';
  }

  function specFor(layout) { return R.LAYOUTS[layout] || R.LAYOUTS.none; }

  /* ── editor per tab ───────────────────────────────────────────────────── */

  function editorPost() {
    var s = t(), d = cur();
    return '<div class="studio-fields">' +
      fieldText(s.title, 'title', { style: 'font-size:19px' }) +
      fieldArea(s.lead, 'dek', 3, { style: 'line-height:1.6', hint: s.bandHint }) +
      '<div class="studio-cols studio-cols--meta">' +
        fieldText(s.kind, 'kind') + fieldText(s.date, 'date') + fieldText(s.url, 'slug') +
      '</div>' +
      fieldArea(s.body, 'body', 16, { style: 'line-height:1.7;font-size:14px', hint: s.bodyHint }) +
      figureSlots('figures', d.figures, [{ ratio: '4-3' }, { ratio: '4-3' }]) +
      '<div class="studio-cols studio-cols--2">' +
        fieldArea(s.toc, 'toc', 3, { style: 'font-size:13px' }) +
        fieldArea(s.subjects, 'subjects', 3, { style: 'font-size:13px' }) +
      '</div>' +
      '<div class="studio-cols studio-cols--2">' +
        fieldArea(s.refs, 'refs', 3, { style: 'font-size:13px' }) +
        fieldText(s.readTime, 'readTime') +
      '</div>' +
      '<div class="studio-section">[' + esc(s.next) + ']</div>' +
      '<div class="studio-row-cols">' +
        fieldText(s.nextTitle, 'next.title') +
        fieldText(s.nextKind, 'next.kind') +
        fieldText(s.nextYear, 'next.year') +
      '</div>' +
      fieldText(s.nextId, 'next.id') +
      statusLine() +
      '</div>';
  }

  function editorHome() {
    var s = t(), d = cur();
    var rows = (d.blocks || []).map(function (b, i) {
      var spec = specFor(b.layout);
      return '<div class="studio-row">' + rowHead('blocks', i) +
        '<div class="studio-row-cols">' +
          fieldText(s.title, 'blocks.' + i + '.title') +
          fieldText(s.kind, 'blocks.' + i + '.kind') +
          fieldText(s.year, 'blocks.' + i + '.year') +
        '</div>' +
        fieldArea(s.desc, 'blocks.' + i + '.desc', 3, { style: 'font-size:14px;line-height:1.65' }) +
        '<div class="studio-row-cols studio-row-cols--link">' +
          '<div class="field"><label for="ed-layout-' + i + '">' + esc(s.layout) + '</label>' +
            '<select class="input" id="ed-layout-' + i + '" data-act="layout" data-i="' + i + '">' +
              LAYOUT_KEYS.map(function (k) {
                return '<option value="' + k + '"' + (b.layout === k ? ' selected' : '') + '>' + esc(s.layouts[k]) + '</option>';
              }).join('') +
            '</select></div>' +
          fieldText(s.link, 'blocks.' + i + '.slug') +
        '</div>' +
        (spec.length ? figureSlots('blocks.' + i + '.figures', b.figures, spec) : '') +
        '</div>';
    }).join('');

    return '<div class="studio-fields">' +
      fieldArea(s.statementOne, 'statement', 3, { style: 'font-size:15px;line-height:1.6', hint: s.bandHint }) +
      '<div class="studio-section">[' + esc(s.workBlocks) + ']</div>' + rows +
      '<div><button class="btn btn-ghost" type="button" data-act="add" data-list="blocks">' + esc(s.addBlock) + '</button></div>' +
      '</div>';
  }

  function editorInfo() {
    var s = t(), d = cur();
    var rows = (d.groups || []).map(function (g, i) {
      return '<div class="studio-row">' + rowHead('groups', i) +
        '<div class="studio-row-cols studio-row-cols--group">' +
          fieldText(s.label, 'groups.' + i + '.label') +
          fieldArea(s.items, 'groups.' + i + '.items', 4, { style: 'font-size:13px;line-height:1.7' }) +
        '</div>' +
        '</div>';
    }).join('');

    return '<div class="studio-fields">' +
      fieldArea(s.bio, 'statement', 7, { style: 'font-size:14px;line-height:1.7', hint: s.bandHint }) +
      '<div class="studio-section">[' + esc(s.groups) + ']</div>' + rows +
      '<div><button class="btn btn-ghost" type="button" data-act="add" data-list="groups">' + esc(s.addGroup) + '</button></div>' +
      '</div>';
  }

  function editorContact() {
    var s = t(), d = cur();
    var rows = (d.channels || []).map(function (c, i) {
      return '<div class="studio-row-cols studio-row-cols--channel">' +
        fieldText(s.name, 'channels.' + i + '.name') +
        fieldText(s.note, 'channels.' + i + '.note') +
        fieldText(s.href, 'channels.' + i + '.href') +
        '<button class="studio-mini studio-mini--danger studio-mini--baseline" type="button" data-act="del" data-list="channels" data-i="' + i + '">' + esc(s.del) + '</button>' +
        '</div>';
    }).join('');

    return '<div class="studio-fields">' +
      fieldArea(s.statement, 'statement', 3, { style: 'font-size:15px;line-height:1.6', hint: s.bandHint }) +
      '<div class="studio-cols studio-cols--contact">' +
        fieldText(s.email, 'email') + fieldText(s.reply, 'reply') +
      '</div>' +
      fieldArea(s.currently, 'currently', 3, { style: 'font-size:14px;line-height:1.65', hint: s.bandHint }) +
      '<div class="studio-section">[' + esc(s.elsewhere) + ']</div>' + rows +
      '<div><button class="btn btn-ghost" type="button" data-act="add" data-list="channels">' + esc(s.addChannel) + '</button></div>' +
      '<div class="studio-section">[' + esc(s.formSection) + ']</div>' +
      '<div class="studio-editor-head">' +
        '<button class="btn btn-ghost" type="button" data-act="formToggle">' +
          esc(d.formOn === false ? s.formOff : s.formOn) + '</button>' +
        '<span class="studio-hint">' + esc(s.formToggleNote) + '</span>' +
      '</div>' +
      fieldText(s.formNote, 'formNote') +
      '</div>';
  }

  function editorCommon() {
    var s = t();
    return '<div class="studio-fields">' +
      '<span class="studio-hint">' + esc(s.commonNote) + '</span>' +
      fieldText(s.displayName, 'name', { style: 'font-size:17px' }) +
      '<div class="studio-cols studio-cols--2">' +
        fieldText(s.navInfo, 'navInfo') + fieldText(s.navContact, 'navContact') +
      '</div>' +
      '<div class="studio-cols studio-cols--2">' +
        fieldText(s.langSwitch, 'langSwitch') + fieldText(s.copyright, 'copyright') +
      '</div>' +
      fieldArea(s.footerLinks, 'links', 5, { style: 'font-size:13px;line-height:1.7', hint: esc(s.linksHint) }) +
      fieldArea(s.draftList, 'drafts', 3, { style: 'font-size:13px;line-height:1.7' }) +
      connectionPanel() +
      '</div>';
  }

  /* Not content — the key this device uses to commit. It sits under the Shared
     tab because that tab is already the settings screen ("설정 › 공통"). */
  function connectionPanel() {
    var s = t(), G = window.SiteGitHub;
    var repo = G.REPO.owner + '/' + G.REPO.repo;
    return '<div class="studio-section">[' + esc(s.connection) + ']</div>' +
      '<span class="studio-hint">' + esc(s.connectionNote) + '</span>' +
      '<div class="field">' +
        '<label for="ed-token">' + esc(s.tokenLabel) + ' &mdash; ' + esc(repo) + '</label>' +
        '<input class="input" id="ed-token" type="password" autocomplete="off" spellcheck="false"' +
          ' data-token value="' + esc(G.token()) + '" placeholder="github_pat_…">' +
        '<span class="studio-hint">' +
          '<span class="studio-dot' + (G.hasToken() ? ' on' : '') + '"></span>' +
          esc(G.hasToken() ? s.tokenOn : s.tokenOff) + ' · ' + s.tokenHint +
        '</span>' +
      '</div>' +
      '<div class="studio-editor-head">' +
        '<button class="btn btn-ghost" type="button" data-act="download">' + esc(s.download) + '</button>' +
        '<span class="studio-hint">' + esc(s.downloadNote) + '</span>' +
      '</div>';
  }

  var EDITORS = { post: editorPost, home: editorHome, info: editorInfo, contact: editorContact, common: editorCommon };

  function statusLine() {
    var s = t(), d = cur();
    var chars = String(d.body || d.statement || '').replace(/\s/g, '').length;
    var mins = Math.max(1, Math.round(chars / 450));
    return '<div class="studio-status">' +
      '<span>' + esc(s.chars(chars)) + '</span><span>,</span>' +
      '<span>' + esc(s.readAbout + s.readUnit(mins)) + '</span><span>,</span>' +
      '<span>' + esc(s.draftWord) + '</span>' +
      '</div>';
  }

  /* ── render ───────────────────────────────────────────────────────────── */

  function slot(name) { return document.querySelector('[data-slot="' + name + '"]'); }

  /* An option may carry a shorter cut for the narrow sheet — 한국어 becomes KO
     once the row has to hold the edit/preview switch too. CSS picks. */
  function seg(nameAttr, options) {
    return options.map(function (o) {
      var label = o.abbr
        ? '<span class="full">' + esc(o.label) + '</span><span class="abbr">' + esc(o.abbr) + '</span>'
        : esc(o.label);
      return '<label class="seg-opt" style="white-space:nowrap">' +
        '<input type="radio" name="' + nameAttr + '" value="' + o.value + '"' + (o.on ? ' checked' : '') + '>' +
        label + '</label>';
    }).join('');
  }

  function savedLabel() {
    var s = t();
    if (state.flash) return state.flash;
    if (state.dirty) return s.dirty;
    if (!state.savedAt) return '';
    var mins = Math.floor((Date.now() - state.savedAt) / 60000);
    return mins < 1 ? s.savedNow : s.savedAgo(mins);
  }

  /* Typing only ever touches this much of the chrome. */
  function renderStatus() { slot('saved').textContent = savedLabel(); }

  function renderBar() {
    var s = t();
    var cm = state.doc.common[state.dlang];
    /* The bar wears the Latin half of the name only — "Hyunhoon Jung / 작성". */
    slot('brand').innerHTML = esc(String(cm.name || '').split(' / ')[0]) +
      ' <span class="slash">/</span> ' + esc(s.role);
    slot('crumb').textContent = state.tab === 'post'
      ? s.crumb.post + (state.doc.post[state.dlang].slug || '')
      : s.crumb[state.tab];
    document.querySelector('[data-action="save"]').textContent = s.save;
    document.querySelector('[data-action="publish"]').textContent = s.publish;
    document.querySelector('[data-action="revert"]').textContent = s.revert;
    slot('uilang').innerHTML = seg('uilang', [
      { value: 'ko', label: '한국어', on: state.ui === 'ko' },
      { value: 'en', label: 'English', on: state.ui === 'en' }
    ]);
    renderStatus();
  }

  function renderRail() {
    var s = t();
    slot('pagesLabel').textContent = '[' + s.pages + ']';
    slot('draftsLabel').textContent = '[' + s.drafts + ']';
    slot('tabs').innerHTML = TABS.map(function (k) {
      var label = esc(s.tabs[k]);
      return '<button class="studio-tab" type="button" data-tab="' + k + '"' +
        (state.tab === k ? ' aria-current="true"' : '') + '>' +
        (state.tab === k ? '<span class="on">' + label + '</span>' : label) + '</button>';
    }).join('');
    slot('drafts').innerHTML = R.lines(state.doc.common[state.dlang].drafts)
      .map(function (d) { return '<span>' + esc(d) + '</span>'; }).join('');
  }

  function renderEditor() {
    var s = t();
    slot('editor').innerHTML =
      '<div class="studio-editor-head">' +
        '<div class="seg seg--view">' + seg('dcview', [
          { value: 'edit', label: s.edit, on: state.view === 'edit' },
          { value: 'preview', label: s.preview, on: state.view === 'preview' }
        ]) + '</div>' +
        '<div class="seg">' + seg('dclang', [
          { value: 'ko', label: '한국어', abbr: 'KO', on: state.dlang === 'ko' },
          { value: 'en', label: 'English', abbr: 'EN', on: state.dlang === 'en' }
        ]) + '</div>' +
        '<span class="studio-hint studio-dualnote">' + esc(s.dualNote) + '</span>' +
      '</div>' +
      '<div class="studio-editor-body">' + EDITORS[state.tab]() + '</div>';
  }

  function renderPreview() {
    var s = t();
    var page = state.tab === 'common' ? 'home' : state.tab;
    var opts = { lang: state.dlang, page: page, resolve: function (p) { return p; } };
    if (state.tab === 'common') {
      opts.main = '<p class="studio-common-note">' + esc(s.commonPreview) + '</p>' +
        '<div class="studio-common-block"></div>';
    }
    var host = slot('preview');
    host.innerHTML = R.body(state.doc, opts);
    host.inert = true; /* a picture of the page: nothing in it takes focus */
    slot('previewLabel').textContent = '[' + s.preview + ']';
    slot('previewNote').textContent = s.previewNote;
    if (state.tab === 'post') {
      var status = slot('editor').querySelector('.studio-status');
      if (status) status.outerHTML = statusLine();
    }
  }

  function renderAll() {
    document.body.dataset.view = state.view;
    renderBar(); renderRail(); renderEditor(); renderPreview();
  }

  /* ── actions ──────────────────────────────────────────────────────────── */

  function flash(msg) {
    state.flash = msg;
    renderStatus();
    clearTimeout(flashTimer);
    flashTimer = setTimeout(function () { state.flash = ''; renderStatus(); }, 5000);
  }

  function save() {
    state.savedAt = Date.now();
    state.dirty = false;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ doc: state.doc, savedAt: state.savedAt }));
    } catch (e) {
      flash(String(e.message || e));
      return;
    }
    renderStatus();
  }

  /* The document, as the file the build reads. */
  function contentSource() {
    return [
      '/* Written by the studio. `node build.js` turns this into the eight pages.',
      ' * The workflow in .github/workflows/build.yml does that on every commit. */',
      '(function (root, factory) {',
      '  var content = factory();',
      '  if (typeof module === \'object\' && module.exports) module.exports = content;',
      '  else root.SITE_CONTENT = content;',
      '})(typeof globalThis !== \'undefined\' ? globalThis : this, function () {',
      '  return ' + JSON.stringify(state.doc, null, 2).split('\n').join('\n  ') + ';',
      '});',
      ''
    ].join('\n');
  }

  /* The escape hatch: no token, no network — just the file. */
  function download() {
    var url = URL.createObjectURL(new Blob([contentSource()], { type: 'text/javascript' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = 'content.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    flash(t().downloaded);
  }

  /* Publishing commits assets/content.js from wherever you happen to be
     standing. The sha we read on the way in is handed back on the way out, so
     GitHub refuses the write if another device got there first. */
  var overwriteArmed = false;
  function publish() {
    var G = window.SiteGitHub, s = t();
    if (!G.hasToken()) {
      state.tab = 'common';
      renderAll();
      flash(s.needToken);
      return;
    }
    save();
    flash(s.publishing);

    G.sha(CONTENT_PATH).then(function (remote) {
      if (state.baseSha && remote && remote !== state.baseSha && !overwriteArmed) {
        overwriteArmed = true;
        setTimeout(function () { overwriteArmed = false; }, 8000);
        flash(s.conflict);
        return null;
      }
      overwriteArmed = false;
      return G.putText(CONTENT_PATH, contentSource(), 'Update content from the studio', remote);
    }).then(function (newSha) {
      if (!newSha) return;
      state.baseSha = newSha;
      /* Published work is no longer a draft — the next load, on any device,
         should start from what the repository now serves. */
      try { localStorage.removeItem(DRAFT_KEY); } catch (e) { /* nothing to clear */ }
      state.dirty = false;
      flash(s.published);
    }).catch(function (err) {
      flash(s.failed + ' — ' + (err.message || err));
    });
  }

  /* A figure, straight from the phone's camera roll into images/. */
  function uploadFigure(basePath, file) {
    var G = window.SiteGitHub, s = t();
    if (!G.hasToken()) { state.tab = 'common'; renderAll(); flash(s.needToken); return; }

    var clean = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-|-$/g, '');
    var path = 'images/' + Date.now().toString(36) + '-' + (clean || 'figure.png');
    flash(s.uploading);

    G.putFile(path, file, 'Add ' + path + ' from the studio').then(function () {
      setPath(basePath + '.src', path);
      renderEditor();
      renderPreview();
      flash(s.uploaded);
    }).catch(function (err) {
      flash(s.failed + ' — ' + (err.message || err));
    });
  }

  /* Two taps rather than a modal: the first arms it and says so in the bar,
     the second throws the draft away. */
  var revertArmed = false;
  function revert() {
    if (!revertArmed) {
      revertArmed = true;
      flash(t().revertAsk);
      setTimeout(function () { revertArmed = false; }, 5000);
      return;
    }
    revertArmed = false;
    localStorage.removeItem(DRAFT_KEY);
    state.doc = clone(window.SITE_CONTENT);
    state.dirty = false;
    state.savedAt = null;
    renderAll();
    flash(t().reverted);
  }

  var BLANKS = {
    blocks: function () { return { id: '', slug: '', title: '', kind: '', year: '', desc: '', layout: 'two', figures: [{ src: '', alt: '', caption: '' }, { src: '', alt: '', caption: '' }] }; },
    groups: function () { return { label: '', items: '' }; },
    channels: function () { return { name: '', note: '', href: '' }; }
  };

  function list(name) {
    var d = cur();
    if (!Array.isArray(d[name])) d[name] = [];
    return d[name];
  }

  function move(name, i, dir) {
    var l = list(name), j = i + dir;
    if (j < 0 || j >= l.length) return;
    var tmp = l[i]; l[i] = l[j]; l[j] = tmp;
  }

  /* Changing a layout keeps the captions already written and grows or trims the
     figure list to the number of plates the new layout has. */
  function setLayout(i, layout) {
    var b = list('blocks')[i];
    b.layout = layout;
    var want = specFor(layout).length;
    b.figures = b.figures || [];
    while (b.figures.length < want) b.figures.push({ src: '', alt: '', caption: '' });
    b.figures.length = want;
  }

  /* ── wiring ───────────────────────────────────────────────────────────── */

  document.addEventListener('input', function (e) {
    var el = e.target;
    if (!el.dataset) return;
    if (el.dataset.path) { setPath(el.dataset.path, el.value); return; }
    /* The token is not part of the document, so it never marks it dirty. */
    if (el.hasAttribute('data-token')) {
      window.SiteGitHub.setToken(el.value.trim());
      var dot = el.parentNode.querySelector('.studio-dot');
      if (dot) dot.classList.toggle('on', window.SiteGitHub.hasToken());
      if (window.SiteGitHub.hasToken()) syncBaseSha();
    }
  });

  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.name === 'uilang') {
      state.ui = el.value;
      try { localStorage.setItem(UI_KEY, state.ui); } catch (e) { /* private mode */ }
      renderAll();
      return;
    }
    if (el.name === 'dclang') { state.dlang = el.value; renderAll(); return; }
    if (el.name === 'dcview') {
      state.view = el.value;
      document.body.dataset.view = state.view;
      /* The switch only shows on a narrow sheet, where the pane you just left
         may have been scrolled a long way down. */
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    if (el.dataset && el.dataset.upload && el.files && el.files[0]) {
      uploadFigure(el.dataset.upload, el.files[0]);
      el.value = '';
      return;
    }
    if (el.dataset && el.dataset.act === 'layout') {
      setLayout(Number(el.dataset.i), el.value);
      state.dirty = true;
      renderEditor(); renderBar(); renderPreview();
    }
  });

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-tab], [data-act], [data-action]');
    if (!el) return;

    if (el.dataset.tab) { state.tab = el.dataset.tab; renderAll(); return; }

    if (el.dataset.action === 'save') return save();
    if (el.dataset.action === 'publish') return publish();
    if (el.dataset.action === 'revert') return revert();

    var act = el.dataset.act;
    if (act === 'download') return download();
    if (!act || act === 'layout') return;
    var name = el.dataset.list;
    var i = Number(el.dataset.i);

    if (act === 'add') list(name).push(BLANKS[name]());
    else if (act === 'del') list(name).splice(i, 1);
    else if (act === 'up') move(name, i, -1);
    else if (act === 'down') move(name, i, 1);
    else if (act === 'formToggle') cur().formOn = cur().formOn === false;
    else return;

    state.dirty = true;
    renderEditor(); renderStatus(); renderPreview();
  });

  window.addEventListener('beforeunload', function (e) {
    if (!state.dirty) return;
    e.preventDefault();
    e.returnValue = '';
  });

  /* Keep "saved N minutes ago" honest without re-rendering anything else. */
  setInterval(function () { if (!state.dirty && !state.flash) renderStatus(); }, 30000);

  function syncBaseSha() {
    window.SiteGitHub.sha(CONTENT_PATH)
      .then(function (s) { state.baseSha = s; })
      .catch(function () { state.baseSha = null; /* offline, or a bad token */ });
  }

  renderAll();
  if (window.SiteGitHub.hasToken()) syncBaseSha();

  /* Opening on a second device with work still sitting on this one is the
     easiest way to lose it — say so rather than let it look published. */
  if (hadDraft && JSON.stringify(state.doc) !== JSON.stringify(window.SITE_CONTENT)) {
    flash(t().localDraft);
  }
})();
