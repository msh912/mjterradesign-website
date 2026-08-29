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
  sections/     Hero, Statement, WorkIndex, PageHeading, ContactCta
  ScrambleText.tsx (currently unused), Reveal.tsx
content/        site.ts · projects.ts (the archive) · profile.ts (the CV)
lib/            gsap.ts, utils.ts, motion.ts
public/images/  50 published images, cropped out of the book mockups
public/og/      one 1200x630 share card per project, generated from its cover
assets/         gitignored source material, see below
```

**All portfolio content lives in `content/`.** Pages read from it, adding work
means adding an entry to `content/projects.ts`, not writing a new page. Then run
`npm run og` to build that project's share card; without it the page falls back
to sharing the raw cover, which is usually the wrong shape.

## The design world (current, implemented)

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
| `assets/behance/` | the original 49 downloads (landscape only 1400px, superseded) |
| `assets/behance-hires/` | **the good set**: same 49 re-pulled from Behance's `source` module: landscape 2550px, graphic 6405px, logofolio 3952px |
| `assets/cropped/` | 111 page crops, backdrop and shadow removed |
| `assets/PROFILE-EXTRACTED.md` | the **older, graphic-led** CV. Superseded by `content/profile.ts` |

Behance serves larger originals off the same hash, `project_modules/source/<hash>.jpg`
rather than `project_modules/1400/<hash>.jpg`. That is where the hi-res set came from.

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

The site is real. All 10 projects are MJ's actual work, named and described from
his own books, with 50 images published.

The Logofolio was removed from the site at MJ's request. Its research record is
kept in CONTENT-INVENTORY.md section C and the source art is still under
`assets/behance-hires/logofolio/`, so it can be restored if he changes his mind.

**Open, needs MJ:**

1. **Proof `CONTENT-INVENTORY.md`.** Ten specific conflicts are listed at the
   bottom of it, all real disagreements between his own two books (semester
   numbers, studio names, one logo caption). Nothing was guessed.
2. **Proof `content/profile.ts`**: the CV, transcribed from a printed page.
4. `gh auth login`: installed, not authenticated. Only matters for repos/PRs.
5. Google Drive connector is unauthorized. Only worth doing if original design
   files exist; MJ said the Behance set is all there is.

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
