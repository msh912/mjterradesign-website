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

## Design system (current, provisional)

- **Colour — committed/drenched dark.** Deep brand-tinted ground
  (`oklch(0.148 0.017 168)`), one luminous mineral accent
  (`oklch(0.795 0.168 150)`), ochre counterpoint under 5%. All tokens are OKLCH
  and live in one place: the `@theme` block in `app/globals.css`.
  Explicitly **not** a warm cream/sand near-white — that palette is the AI tell.
- **Type.** Display: Bricolage Grotesque. Body: Hanken Grotesk. Mono: Martian Mono
  (small structural labels only). Paired on a contrast axis; none are on the
  reject-list in the transfer doc.
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

- `npm run dev` (or `START.bat`, port 3000). **Node is not yet installed on this
  machine** — install Node 20+ LTS before the first `npm install`.
- Always `npm run build` before committing nontrivial changes.
- Focused commits, descriptive subject + body, Co-Authored-By trailer.
- CRLF warnings on Windows commits are harmless.

## Open placeholders

- `content/projects.ts` — three dummy projects, replace with the real archive.
- `content/site.ts` — tagline, real socials, real domain.
- `app/about/page.tsx` — bio copy and location.
- Palette + fonts are a defensible starting point, not a brand decision. Re-token
  in `globals.css` once the actual work is in view.
