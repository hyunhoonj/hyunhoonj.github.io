# Hyunhoon Jung — personal site

Implementation of the `Personal Site.dc.html` design canvas
([Claude Design project](https://claude.ai/design/p/0fc009b0-e941-4408-92f2-37902e1651e5)).

Four pages, two languages, at two widths — the 1200px sheet from turns 3–7 and
the 390px one from turn 9 — plus the writing desk from turns 8 and 9e. No
dependencies, no framework, no build tooling beyond one Node script.

```
index.html                       메인 / Home            ┐
information.html                 소개                    │ Korean
contact.html                     연락                    │
writing/silence-….html           글 상세                 ┘
en/index.html                    Home                   ┐
en/information.html              Information            │ English
en/contact.html                  Contact                │
en/writing/silence-….html        Article                ┘
studio-e064cec987.html           작성 어드민 / the writing desk

assets/content.js                 all the words, both languages — the only source
build.js                          node build.js → writes the eight pages
.github/workflows/build.yml       runs build.js on every content commit
assets/broadsheet.css             the design system, imported from the project
assets/site.css                   the four pages
assets/render.js                  one renderer, used by build.js and the studio
assets/site.js                    the contact form (nothing else)
assets/github.js                  the studio's commit path into this repository
assets/studio.css, studio.js      the writing desk
images/fig-waiting-state.png      the one real figure in the canvas
```

## Running it

Every page is a plain file; opening `index.html` in a browser works. A local
server is nicer for the studio:

```sh
python3 -m http.server 8000     # then http://localhost:8000/
```

## Editing

Two ways in, one source of truth (`assets/content.js`):

**By hand.** Edit `assets/content.js`, run `node build.js`, done.

**Through the studio.** Open `studio-e064cec987.html`. Pick a page in the left rail, pick a
language, type — the right column redraws the actual page at 47% through the
same renderer `build.js` uses, so the preview is not an approximation. On a
phone the rail becomes one scrolling row of tabs and 편집 / 미리보기 become a
switch, since there is only room for one pane; the preview then shows the page
at the width a reader actually holds it at, unscaled.

- **저장 / Save** keeps a draft in `localStorage`. It survives a reload; it does
  not touch any file, and it does not leave the device.
- **발행 / Publish** commits `assets/content.js` to this repository over the
  GitHub API — from a laptop or from a phone, no server in between. A workflow
  then runs `node build.js` and commits the eight pages; the site is live a
  minute or two later. Publishing clears the local draft, so the next load on
  any device starts from what the repository serves.
- **되돌리기 / Revert** (twice) throws the draft away and reloads the file's values.

If a figure slot is empty, **사진 올리기** commits the picture into `images/` the
same way and fills the path in — which is the whole point of using this from a
phone.

The 한국어 / English switch in the top bar changes the *editor's* language; the
one above the fields changes *which language you are writing*. The two documents
are stored separately, as the design says. The editor-language switch is a
wide-sheet control — turn 9e gives that room to 저장 / 발행 — so the choice is
remembered in `localStorage` and carries over to a phone.

## Publishing from a phone

The studio commits over the GitHub REST API, which answers CORS, so there is no
server anywhere in this. It needs one token, once per device.

1. GitHub → Settings → Developer settings → **Fine-grained personal access
   tokens** → Generate new token.
2. Repository access: **Only select repositories** → `hyunhoonj.github.io`.
3. Permissions → Repository permissions → **Contents: Read and write**. Nothing
   else. Give it an expiry.
4. Open the studio → **공통 / Shared** tab → **[연결]** → paste it.

The dot next to the field turns cyan when it is stored. From then on 발행
commits `assets/content.js`, `.github/workflows/build.yml` rebuilds the eight
pages, and Pages serves them a minute or two later.

**About the token.** It lives in that browser's `localStorage` — per device,
never committed, sent nowhere but `api.github.com`. Whoever holds the unlocked
phone holds the token, which is why it is scoped to one repository and one
permission and should carry an expiry; revoke it on GitHub if a device goes
missing. Nothing here can reach it from another site, but it is a real key sitting
in a browser, and that is the trade this setup makes.

**Two devices at once.** The studio remembers the blob sha it last saw. If the
repository moved on since — you published from the laptop, then opened the phone
— 발행 refuses the first press and says so; pressing again overwrites. And a
device holding an unpublished draft says so on load rather than looking synced.

**The studio's address is not a secret.** It sits at an unguessable path so the
site never leads anyone to it, but this repository is public, so the filename is
readable by anyone who looks at it. Without a token the page is a read-only
editor, which is why that is acceptable here. If it needs to be genuinely
private, the studio has to move to a separate private repository.

### The markup inside text fields

| | |
|---|---|
| `==text==` | highlight band |
| blank line | new paragraph |
| `## text` | section heading (bodies only) |
| `> line` | pull-quote — the renderer supplies the quotation marks |
| `[도판 1]` / `[Fig. 1]` | figure 1 from this document's figure list |
| `[표: caption]` / `[Table: caption]` | a table — see below |
| `name \| url` | one footer link per line |

A table is one block, no blank lines inside it: the marker line, then one row
per line with cells split by `|`. The first row is the head.

```
[표: 표 1 — 침묵의 종류와 사용자의 다음 행동]
종류 | 평균 지연 | 재질문 비율
계산 | 3.2초 | .72
```

Each figure in the article's figure list carries its own aspect ratio (4:3,
16:9, 1:1, 4:5); each home block carries one cover image and its ratio, and
`cols` sets how many cards a desktop row holds. An image with no `src` renders
as the empty plate the canvas shows.

## Notes on the translation from the canvas

Everything the canvas states is carried over at its stated value — the 1fr/1.6fr
split, the `calc(var(--space-8) * n)` rhythm, the two band colours, the type
sizes, both languages of every string. Where the implementation had to decide
something the canvas did not state:

- **Where the two sheets meet.** The canvas states 1200px and 390px and nothing
  in between. Below 900px the 1fr/1.6fr split folds to one column, contact
  reorders (address → form → the rest), and the display sizes start down; below
  620px the sheet is turn 9 exactly. These are *container* queries against
  `.sheet`, not viewport queries, so the studio's 1200px preview keeps the wide
  layout however narrow the browser window is — and its phone preview gets the
  narrow one at real size.
- **Language switch.** The canvas has a Korean and an English version of each
  page but no control to move between them (it switched through canvas chrome).
  The masthead gets a third, quieter nav item — `English` / `한국어` — pointing at
  the counterpart page. On the narrow sheet that third item is one thing too
  many beside `Information`, so `navInfoShort` (`Info`, as turn 9 sets it) takes
  over; a label with no short cut just keeps its full one.
- **Article page.** Turn 8's preview drops the `[주제]` and `[다음 글]` blocks that
  the confirmed page (5a / 7c) carries — the editor simply had no fields for
  them. Both are kept, and the studio grew the fields.
- **Contact page.** Turn 8 restructured the left column ( `[메일]` + `[그 밖에]`
  with notes, `[요즘]` on the right) over 6b / 7d's `[직접]` + `[응답]`. Turn 8
  wins, being both later and a superset.
- **Work titles link.** They are spans in the canvas; here a block with a `slug`
  links to its article. Identical appearance, and the site is navigable.
- **Contact form.** There is no server. The design's own note says the message is
  sent as mail and nothing is stored, so submitting composes a `mailto:` in the
  visitor's mail client. With JavaScript off the form does nothing and the
  address above it is still a live link.
- **Figure slots.** The canvas's `<image-slot>` is an upload widget belonging to
  the design tool. With a token in place the slot does upload — straight into
  `images/` as a commit — and it also takes a path typed by hand, for the times
  the file is already in the repository.
- **What the phone drops.** Turn 9f is explicit — "설명은 상세로 넘김" — so the
  narrow index shows the picture, the title, and the kind and year, and the
  sentence waits for the article. That is a stated decision, unlike the figure
  counts in the earlier mobile mock, which only ever differed because the mock
  carried the editor's seed text.
- **The article body.** Turn 3a's seed and the confirmed page 5a lay the same
  material out slightly differently — the seed opens with a `## 설계되지 않은 몇 초`
  heading, 5a does not. The pages follow 5a, which is the 확정판.
- **`broadsheet.css`.** Imported as-is except the print-treatment blocks
  (`.halftone`, `.cmyk*`), which drive an SVG filter deck (`print-plates.js`)
  this site does not carry and no page here uses.

Placeholder copy from the canvas — `[회사명]` / `[Company]`, `[저자]` / `[Author]`,
`hyunhoon@email.com`, the Github and Scholar URLs — is carried over verbatim and
still needs real values.
