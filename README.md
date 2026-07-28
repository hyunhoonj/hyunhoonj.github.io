# Hyunhoon Jung — personal site

Implementation of the `Personal Site.dc.html` design canvas
([Claude Design project](https://claude.ai/design/p/0fc009b0-e941-4408-92f2-37902e1651e5)).

Four pages, two languages, plus the writing desk from turn 8. No dependencies,
no framework, no build tooling beyond one Node script.

```
index.html                       메인 / Home            ┐
information.html                 소개                    │ Korean
contact.html                     연락                    │
writing/silence-….html           글 상세                 ┘
en/index.html                    Home                   ┐
en/information.html              Information            │ English
en/contact.html                  Contact                │
en/writing/silence-….html        Article                ┘
studio.html                      작성 어드민 / the writing desk

assets/content.js                 all the words, both languages — the only source
build.js                          node build.js → writes the eight pages
assets/broadsheet.css             the design system, imported from the project
assets/site.css                   the four pages
assets/render.js                  one renderer, used by build.js and studio.html
assets/site.js                    the contact form (nothing else)
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

**Through the studio.** Open `studio.html`. Pick a page in the left rail, pick a
language, type — the right column redraws the actual page at 47% through the
same renderer `build.js` uses, so the preview is not an approximation.

- **저장 / Save** keeps a draft in `localStorage`. It survives a reload; it does
  not touch any file.
- **발행 / Publish** downloads a replacement `content.js`. Drop it over
  `assets/content.js` and run `node build.js`.
- **되돌리기 / Revert** (twice) throws the draft away and reloads the file's values.

The 한국어 / English switch in the top bar changes the *editor's* language; the
one above the fields changes *which language you are writing*. The two documents
are stored separately, as the design says.

### The markup inside text fields

| | |
|---|---|
| `==text==` | highlight band |
| blank line | new paragraph |
| `> line` | pull-quote (bodies only) |
| `[도판 1]` / `[Fig. 1]` | drops figure 1 in at that point (bodies only) |
| `name \| url` | one footer link per line |

Figure layouts per work block: `two` (two 4:3), `tall` (two 4:5), `wide` (two 4:3
plus a full-width 16:8), `full` (one 16:8), `none`. A figure with no `src`
renders as the empty plate the canvas shows — drop a file in `images/` and put
its path in the slot to fill it.

## Notes on the translation from the canvas

Everything the canvas states is carried over at its stated value — the 1fr/1.6fr
split, the `calc(var(--space-8) * n)` rhythm, the two band colours, the type
sizes, both languages of every string. Where the implementation had to decide
something the canvas did not state:

- **Responsive behaviour.** The canvas is a fixed 1200px sheet. Below ~900px the
  1fr/1.6fr split folds to one column and the display sizes step down; below
  ~620px figure grids go single-column. These are *container* queries against
  `.sheet`, not viewport queries, so the studio's 1200px preview keeps the
  desktop layout however narrow the browser window is.
- **Language switch.** The canvas has a Korean and an English version of each
  page but no control to move between them (it switched through canvas chrome).
  The masthead gets a third, quieter nav item — `English` / `한국어` — pointing at
  the counterpart page.
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
  the design tool. A static site has nowhere to upload to, so a slot takes the
  path of a file in `images/` and shows what is there.
- **`broadsheet.css`.** Imported as-is except the print-treatment blocks
  (`.halftone`, `.cmyk*`), which drive an SVG filter deck (`print-plates.js`)
  this site does not carry and no page here uses.

Placeholder copy from the canvas — `[회사명]` / `[Company]`, `[저자]` / `[Author]`,
`hyunhoon@email.com`, the Github and Scholar URLs — is carried over verbatim and
still needs real values.
