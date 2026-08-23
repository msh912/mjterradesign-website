# MjTerraDesign — portfolio site

Full portfolio for MJ Terra Design. Elegant, sophisticated, modern, high-tech.
Built on the house stack documented in `WEBSITE-STACK-TRANSFER.md` — **read that
file before changing the stack, the design system, or adding an animation.**

## Stack

Next.js 15 (App Router) · React 19 · TS strict · Tailwind 4 (`@theme` tokens) ·
GSAP 3 + ScrollTrigger · Lenis · Motion 12 · R3F 9 / drei 10 / Rapier 2 / three 0.184 ·
@phosphor-icons/react. Versions in `package.json` are pinned and known-compatible.

## Layout of the repo

```
app/            routes: / · /work · /work/[slug] · /about · /contact · not-found
components/
  layout/       SmoothScroll (Lenis↔GSAP), SiteHeader, SiteFooter
  effects/      ShaderBackground (+Client wrapper), AuroraEdge
  sections/     Hero, Statement, WorkIndex, PageHeading, ContactCta
  ScrambleText.tsx, Reveal.tsx
content/        site.ts (meta/nav/socials), projects.ts (the whole portfolio dataset)
lib/            gsap.ts, utils.ts, motion.ts
public/         images/ videos/
```

**All portfolio content lives in `content/projects.ts`.** Pages read from it —
adding work means adding entries there, not writing new pages.

## Agreed direction (supersedes what is currently in the code)

MJ locked these in on 2026-08-23. **The committed scaffold predates them** — it
ships a dark green palette and placeholder projects. Replace, don't build on.

1. **Architecture-led.** Landscape architecture is the headline; graphic design
   is a strong secondary section. Not a 50/50 split, not two separate doors.
2. **Individual projects** are the unit of work — not the three Behance
   portfolio books. The books get broken apart into ~10-15 named projects.
3. **White / gallery ground.** Near-white, black type, minimal — "mostly black
   and white". Subtle, sophisticated art direction; subtle animation on buttons
   and icons throughout.
4. **Crop the artwork** out of the Behance book mockups (grey backdrop, drop
   shadow and page curl removed).

Goal: impress visitors enough that they start a project with him.

## Design system (dark palette below is SUPERSEDED — see above)

- **Colour.** All tokens are OKLCH and live in one place: the `@theme` block in
  `app/globals.css`. Currently a drenched dark green; must be re-tokenised to
  the white gallery ground. Avoid warm cream/sand near-whites — that specific
  palette is the AI tell, per the transfer doc §5. A true off-white at chroma ~0
  is the safe reading of "white".
- **Type.** Display: Bricolage Grotesque. Body: Hanken Grotesk. Mono: Martian
  Mono (small structural labels only). Paired on a contrast axis; none are on
  the reject-list. Note `ui-ux-pro-max` recommends Space Grotesk for this brief
  — it is on the transfer doc's reject-list, so the doc wins.
- **Motion.** `expo.out` / `power3.out` only, no bounce. Every animation checks
  `prefersReducedMotion()` from `lib/motion.ts`, and every reveal *enhances* an
  already-painted default so a headless render never ships blank.
- **Bans in force:** gradient text, side-stripe accents, default glassmorphism
  (the header pill is the one deliberate exception), hero-metric templates,
  identical icon+heading card grids, an uppercase eyebrow over every section,
  `01/02/03` scaffolding, `z-index: 9999`.

## Gotchas already handled here

- `ShaderBackground` is mounted via `ShaderBackgroundClient` — `ssr: false`
  dynamic imports are illegal in a Server Component.
- `transpilePackages` for three/r3f is in `next.config.ts`; the build fails without it.
- `ScrambleText` sizes each cell by its final glyph so line width can't jitter.
- Ground colour is baked inline on `<html>` so first paint isn't white.

## Workflow

- `npm run dev` (or `START.bat`, port 3000). Node 24 / Python 3.12 / gh 2.98 are
  installed but **not on the Bash tool's PATH** — prefix in PowerShell:
  `$env:PATH = "C:\Program Files\nodejs;$env:LOCALAPPDATA\Programs\Python\Python312;C:\Program Files\GitHub CLI;$env:PATH"`
- Always `npm run build` before committing nontrivial changes.
- Focused commits, descriptive subject + body, Co-Authored-By trailer.
- CRLF warnings on Windows commits are harmless.

## Skills

Nine skills are installed at `.claude/skills/` (gitignored): `impeccable` v4.1.1,
`frontend-design`, `ui-ux-pro-max`, plus `design-taste-frontend`,
`high-end-visual-design`, `minimalist-ui`, `redesign-existing-projects`,
`full-output-enforcement`, `imagegen-frontend-web`. `npx impeccable update`
manages the install and wrote the anti-slop hook into `.claude/settings.local.json`
— don't hand-edit that file. Unused taste-skill variants are in
`assets/taste-skill-bundle/`.

Impeccable reports `NO_PRODUCT_MD`: a from-scratch build must load
`reference/init.md` and write PRODUCT.md first.

## Status — nothing of MJ's work is in the site yet

The site is verified scaffolding, not a portfolio. All routes serve 200, the
build is clean, but `content/projects.ts` still holds three dummy projects and
`public/images/` is empty.

Source material, all gitignored under `assets/`:

- `assets/behance/` — 49 images at 2800px (graphic 11, landscape 26, logofolio 12)
- `assets/PROFILE-EXTRACTED.md` — MJ's CV, education, six roles, tools, contacts,
  transcribed from a mockup spread. **Unverified — have MJ proof it.**

## Next steps

1. `/impeccable init` → write PRODUCT.md (positioning, audience, the
   "start a project with me" goal).
2. **Identify the individual projects.** The single biggest blocker. Only two are
   known by name so far — *Purification Movement* (Lugano, Landscape Design
   Studio 2, 2024) and *8th Asian Men's Beach Handball Championship* (Iran, 2022).
   The remaining ~10-13 need mining out of the 49 spreads, then MJ's correction.
3. Re-tokenise `globals.css` to the white gallery ground.
4. Crop artwork out of the book mockups into `public/images/`.
5. Rewrite `content/projects.ts` from placeholders to the real archive.
6. `content/site.ts` — tagline, real socials, real domain.
   `app/about/page.tsx` — bio from the extracted profile.

## Blocked on MJ

- **Google Drive** connector is unauthorized (claude.ai connector settings). Once
  live, pull originals instead of cropping mockups.
- **`gh` is not authenticated** (`gh auth login`) — only matters for repos/PRs.
