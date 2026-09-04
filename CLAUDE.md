# MjTerraDesign, portfolio site

Portfolio for **MJ Terra Design**: Mohamadjavad Shoori, architect and graphic
designer in Milan. Built on the house stack documented in
`WEBSITE-STACK-TRANSFER.md`: **read that file before changing the stack, the
design system, or adding an animation.**

Product truth lives in `PRODUCT.md` (written via `/impeccable init`).
The archive and its provenance live in `CONTENT-INVENTORY.md`.

## Stack

Next.js 15 (App Router) · React 19 · TS strict · Tailwind 4 (`@theme` tokens) ·
GSAP 3 + ScrollTrigger · Lenis · Motion 12 · @phosphor-icons/react.
Versions in `package.json` are pinned and known-compatible.

three / R3F / drei / Rapier are still in `package.json` and `next.config.ts`
but **nothing imports them any more**: the shader background was removed when
the site moved to the white gallery ground. Safe to uninstall.

## Layout of the repo

```
app/            routes: / · /work · /work/[slug] · /about · /contact · not-found
  icon.svg · apple-icon.png     the contour mark, no letterforms
  opengraph-image.jpg           site share card, plus .alt.txt
  sitemap.ts · robots.ts        built from content/, canonical www host
components/
  layout/       SmoothScroll (Lenis↔GSAP), SiteHeader, SiteFooter
  motion/       MotionRoot, wires every scroll animation from data-anim
  sections/     Hero, Statement, Practice, Fields, WorkIndex, PageHeading,
                ContactCta. The home page is three texts (Hero, Statement,
                Practice) then Fields, the three circles into each field
  HashScroll.tsx    lands /work#<field> on its section; Lenis and the browser's
                    native hash jump otherwise disagree about where the page is
  ScrambleText.tsx (currently unused), Reveal.tsx
  NamePortrait.tsx  MJ's name on the home page, portrait riding the cursor on
                    hover. Portalled to <body> because `rise` leaves a transform
                    on its block, which would trap a position:fixed child
content/        site.ts · projects.ts (the archive) · profile.ts (the CV)
lib/            gsap.ts, utils.ts, motion.ts
public/images/  50 published images, cropped out of the book mockups
public/og/      one 1200x630 share card per project, generated from its cover
public/thumbs/  one 640x640 round-index crop per project, same generator
public/images/fields/   the three home-page field marks, MJ's line drawings.
                Corners masked to alpha: the ground is #fafafa, so a white
                square would print a brighter tile behind each one
assets/         gitignored source material, see below
```

**Three fields.** `Field` is `landscape | architecture | graphic`. Every surface
that lists them derives from `byField`, so a circle on the home page and its
section on `/work` come alive purely from content: a field with no work in it
renders as "In preparation" and is deliberately not a link, because sending
someone to an empty section is worse than saying so. Architecture was empty until
2026-08-29, when MJ supplied the office book; that path is proven and is how any
fourth field would arrive.

**All portfolio content lives in `content/`.** Pages read from it, adding work
means adding an entry to `content/projects.ts`, not writing a new page. Then run
`npm run og` to build that project's share card; without it the page falls back
to sharing the raw cover, which is usually the wrong shape.

## The design world (current, implemented)

- **The circle is the navigation.** The home page offers the three fields as
  circles; opening one hands you the same shape again, once per project, as a
  wrapping row on `/work`. Detail pages keep full plates, because the circle is
  a way in and not a way to look at a drawing. Index circles are served from
  `public/thumbs/`, **not** the covers: `images.unoptimized` means a cover would
  ship several hundred KB to draw a coin, and /work went 4243KB -> 879KB when
  they were introduced. A square crop keeps the short side whole, so `thumbFocus`
  (`left`/`right`) only bites on a landscape cover and (`top`/`bottom`) only on a
  portrait one. Six projects set it, judged off a round contact sheet: sharp's
  `attention` strategy chases contrast and crops book pages onto their body type.
- **Gallery.** Near-white ground, black type, hairline rules, and the artwork
  supplying every colour on the page. Impeccable mode: **Experience**: the work
  leads from the first viewport and the interface recedes.
- **Colour.** All tokens are OKLCH in the `@theme` block of `app/globals.css`.
  The ground is a **true neutral (chroma 0)**: warm cream/sand near-whites are
  the AI tell per transfer doc §5 and are deliberately avoided.
  The single accent is **not invented**: it is sampled from the brick red MJ
  already prints in both portfolio books (#9c5051–#af5556), darkened to
  `oklch(0.47 0.115 28)` so it clears 4.5:1 on the white ground.
- **Type.** Display: Bricolage Grotesque. Body: Hanken Grotesk. Mono: Martian
  Mono, used only for genuine structural metadata (location, year, studio),
  never as a decorative label. Note `ui-ux-pro-max` recommends Space Grotesk for
  this brief; it is on the transfer doc's reject-list, so the doc wins.
- **Motion.** Driven by `components/motion/MotionRoot.tsx`: one client
  component in the layout wires every scroll animation, so pages stay server
  components. Sections opt in declaratively with `data-anim`:

  | value | what it does |
  |---|---|
  | `lines` | GSAP SplitText line masks; lines rise out from behind their own edge |
  | `rise` | block lifts in through a shallow focus pull (blur → sharp) |
  | `stagger` | direct children follow one another |
  | `plate` | clip-path curtain opens while the image settles back from overscale, then drifts on scrub |
  | `meta` | small mono metadata ticks in per character |
  | `rule` | hairline drawn from the left |

  `expo.out` / `power3.out` only, no bounce. GSAP 3.15 includes SplitText.

  **The rule that matters:** the resting state in CSS is always the *visible*
  state; a hidden start state only ever exists inside a `gsap.from()`, which
  creates the tween in the same call. Reduced motion skips the system entirely,
  `@media print` forces the finished state, and a `FAILSAFE_MS` sweep reveals
  anything still hidden. Two earlier reveal implementations shipped blank
  sections, see the comments in `Reveal.tsx`: so `scratchpad` verification
  checks three guarantees: scrolled, never-scrolled, and reduced-motion.
- **Bans in force** (impeccable craft-floor): gradient text, eyebrows/kickers
  above headings, `01/02/03` scaffolding, identical icon+heading card grids,
  hero-metric templates, side-stripe accents, decorative glassmorphism,
  `z-index: 9999`.

## Gotchas already handled here

- `transpilePackages` for three/r3f is in `next.config.ts`; harmless now that
  nothing imports them, but the build fails if you re-add them without it.
- `images: { unoptimized: true }` in `next.config.ts`: `next/image` serves the
  raw files, so published image weight is the real payload. Keep crops lean.
- `ScrambleText` sizes each cell by its final glyph so line width can't jitter.
- Ground colour is baked inline on `<html>` so first paint is the gallery ground.

## Source material (gitignored under `assets/`)

| Path | What |
|---|---|
| `assets/press/landscape-portfolio-2026.pdf` | **the source of every landscape image on the site.** MJ's own press file for the 2026 landscape book, 31 pages |
| `assets/press/pages-2026/` | those 31 pages extracted at native resolution, `p01`–`p31` |
| `assets/press/professional-works-2026.pdf` | *Selected Works 2023-2026*, the **office** book (GN Architetti, 4&7, Karoshan, Terraviva). **The source of the architecture field.** Unlike the landscape book this one has a real text layer and composed vector art, so pages are *rendered* at 200dpi, not stripped of XObjects, which would drop every label |
| `assets/press/office-pages-2026/` | those 20 pages rendered, `o01`-`o20` |
| `assets/behance/` | the original 49 downloads (landscape only 1400px, superseded) |
| `assets/behance-hires/` | same 49 re-pulled from Behance's `source` module. **Still the source for the graphic-design work only**: the landscape half is superseded by the press PDF |
| `assets/cropped/` | 111 page crops, backdrop and shadow removed |
| `assets/PROFILE-EXTRACTED.md` | the **older, graphic-led** CV. Superseded by `content/profile.ts`, which is itself now behind the 2026 book's CV page |

**The landscape artwork is not photographed any more.** Until 2026-08-29 every
image on the site was a Behance render of MJ's printed book: page curl, drop
shadow, grey backdrop and a curved gutter baked into the crop. The press PDF is
the file behind that book, so each spread is one flat raster. `p13` is
`purification-movement/masterplan.jpg`, and so on: the map lives in the commit
that made the swap. Halves are cut clear of the hairline ruled down the gutter.
Each page is a single flattened image with **no text layer**, so extracting the
XObject natively is the resolution ceiling; rendering at higher DPI only upscales.

The 33 landscape images came from that PDF. The other 17 (`architectural-graphics`,
`elahie-urban-playground`, `four-and-seven`, `healing-garden`, `heliotrope`,
`roboteos`, `studio`, `portrait`) are still Behance book crops, because the
graphic-design book has no press file here.

Behance serves larger originals off the same hash, `project_modules/source/<hash>.jpg`
rather than `project_modules/1400/<hash>.jpg`. That is where the hi-res set came from.

`npm run sizes` regenerates `content/image-sizes.ts` from whatever is on disk;
`npm run og` rebuilds the share cards. Run both after touching artwork.

## Workflow

- `npm run dev` (or `START.bat`, port 3000). Node 24 / Python 3.12 / gh 2.98 are
  installed but **not on the Bash tool's PATH**: prefix in PowerShell:
  `$env:PATH = "C:\Program Files\nodejs;$env:LOCALAPPDATA\Programs\Python\Python312;C:\Program Files\GitHub CLI;$env:PATH"`
- Always `npm run build` before committing nontrivial changes.
- Focused commits, descriptive subject + body, Co-Authored-By trailer.
- CRLF warnings on Windows commits are harmless.

## Skills

Nine skills at `.claude/skills/` (gitignored): `impeccable` v4.1.1,
`frontend-design`, `ui-ux-pro-max`, plus `design-taste-frontend`,
`high-end-visual-design`, `minimalist-ui`, `redesign-existing-projects`,
`full-output-enforcement`, `imagegen-frontend-web`. `npx impeccable update`
manages the install and wrote the anti-slop hook into `.claude/settings.local.json`, don't hand-edit that file. `.impeccable/config.json` records `buildPath: code`.
Unused taste-skill variants are in `assets/taste-skill-bundle/`.

## Status

The site is real. All 15 projects are MJ's actual work, named and described from
his own books, with 75 images published. The M.Arch thesis,
`scars-of-extraction-seeds-of-renewal`, leads the landscape work: it is the only
project in the archive that is not group work, and its `contextLabel` is what the
field on `Project` exists for, because a thesis is neither a studio nor a client.

The Logofolio was removed from the site at MJ's request. Its research record is
kept in CONTENT-INVENTORY.md section C and the source art is still under
`assets/behance-hires/logofolio/`, so it can be restored if he changes his mind.

**Open, needs MJ:**

1. **Proof `CONTENT-INVENTORY.md`.** Twelve conflicts and questions are listed at
   the bottom of it. Conflicts 1 to 4 are real disagreements between the contents
   page and the title pages of his own books about semesters and studio names,
   and the 2026 press file did **not** settle them. Nothing was guessed.
2. **The graphic-design book has no press file here.** Its 16 images are still
   Behance crops of a photographed book, unlike the landscape and office ones.
   Ask MJ for that PDF and rerun the same swap.
3. **Punta Bianca has no date.** The office book dates the whole selection
   2023-2026 and dates no individual work except Roshano Land (2021). Every other
   office project is dated from MJ's CV instead; Punta Bianca is a competition he
   entered outside any job, so its `yearLabel` currently shows the book's range.
   See inventory question 13.
4. `gh auth login`: installed, not authenticated. Only matters for repos/PRs.
5. Google Drive connector is unauthorized. Only worth doing if original design
   files exist; MJ said the Behance set is all there is.

`content/profile.ts` is **no longer** open: MJ named the 2026 press file as the
reference on 2026-08-29 and the CV was rebuilt from its own CV spread.

## Live

The site is deployed at **https://www.mjterradesign.com** (the apex
308-redirects to www, so www is canonical and is what `content/site.ts`
carries). Vercel also serves it at `mjterradesign-website.vercel.app`.
Every push to `main` deploys automatically.

## The remote

`origin` is **`https://github.com/msh912/mjterradesign-website.git`**, which
Vercel deploys from. MJ is a collaborator, not the owner.

That repo was created through `vercel.com/new` as a *squashed snapshot* of the
old scaffold, so it shared **no history** with this clone. It was joined with
`git merge -s ours newrepo/main --allow-unrelated-histories`, which keeps this
tree byte-for-byte and makes pushes ordinary fast-forwards. **Never force-push
here**, it is not MJ's repo and Vercel builds from it. The previous URL is kept
as the remote `old-mjshoori`.
