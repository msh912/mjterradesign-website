# Elegant Website Playbook — Transfer Doc

Paste this whole file into a fresh Claude/Claude Code session to start a new site with the same
stack, structure, design system, animation toolkit, and hard-won lessons used across my sites
(Studio4and7, CanadaSoccerSchool / 3S Soccer Academy, parlab.ai).

> **How to use with a new Claude:** "Here's my house stack and playbook. Scaffold a new site named
> `<NAME>` following this exactly, then we'll build sections." Everything below is copy-paste ready.

---

## 1. The stack (exact, known-compatible versions)

- **Next.js 15** (App Router) · **React 19** · **TypeScript 5** (strict)
- **Tailwind CSS 4** (via `@tailwindcss/postcss`, tokens in `@theme`)
- **GSAP 3 + ScrollTrigger** — scroll-driven animation (`@gsap/react` for `useGSAP`)
- **Lenis** — momentum/smooth scroll, wired into GSAP's ticker
- **Motion 12** (`motion/react`) — component-level animation
- **React Three Fiber 9 + drei 10 + Rapier 2 + Three 0.184** — WebGL / 3D / physics
- **@phosphor-icons/react** — icons

`package.json` dependencies block (pin these — they're tested together):

```json
{
  "dependencies": {
    "@gsap/react": "^2.1.1",
    "@phosphor-icons/react": "^2.1.7",
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.6.1",
    "@react-three/rapier": "^2.2.0",
    "@types/three": "^0.184.1",
    "gsap": "^3.12.5",
    "lenis": "^1.1.14",
    "motion": "^12.8.0",
    "next": "^15.3.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.184.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.7",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.1.7",
    "typescript": "^5"
  }
}
```

---

## 2. Folder structure

```
app/
  layout.tsx        root layout: next/font + <SmoothScroll>
  globals.css       @theme tokens + base + section styles
  page.tsx          marketing home (imports sections)
  app/              optional /app dashboard route (own layout + css, native scroll)
components/
  layout/SmoothScroll.tsx
  effects/          ShaderBackground, LivingBackground, FluidCursor, Aurora…
  sections/         Hero, Statement, DeviceFeature, KineticMap, Features…
  ScrambleText.tsx
lib/
  gsap.ts           registers ScrollTrigger, re-exports gsap
  utils.ts          cn / lerp / clamp / mapRange
public/
  images/  videos/
START.bat           double-click dev launcher (Windows)
next.config.ts  tsconfig.json  postcss.config.mjs  .gitignore
```

---

## 3. Config files (copy-paste)

**next.config.ts** — the `transpilePackages` for three/r3f is REQUIRED or the build breaks:

```ts
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier'],
  devIndicators: false,                      // Next 15.5 dev bug workaround
  images: { formats: ['image/avif', 'image/webp'], unoptimized: true },
  webpack: (config) => { config.cache = { type: 'memory' }; return config }, // avoid ENOSPC
}
export default nextConfig
```

**tsconfig.json** — key bits: `strict`, `paths: {"@/*": ["./*"]}`, `moduleResolution: bundler`, `jsx: preserve`, plugin `next`.

**postcss.config.mjs**:
```js
const config = { plugins: { '@tailwindcss/postcss': {} } }
export default config
```

**START.bat** (Windows one-click dev):
```bat
@echo off
title <NAME> Dev Server
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"
npm run dev -- -p 3000
pause
```

**.gitignore**: standard Next ignores + `/.claude/` + `/assets/` (large source files/agent tooling).

---

## 4. Foundation code

**lib/gsap.ts**
```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export { gsap, ScrollTrigger }
```

**lib/utils.ts** — `cn`, `lerp`, `clamp(min,val,max)`, `mapRange`.

**components/layout/SmoothScroll.tsx** — the critical Lenis↔GSAP wiring (this is what makes scroll feel expensive):
```tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
const LenisCtx = createContext<{ lenis: Lenis | null }>({ lenis: null })
export const useLenis = () => useContext(LenisCtx)
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  useEffect(() => {
    const l = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    l.on('scroll', ScrollTrigger.update)               // feed Lenis into ScrollTrigger
    const tick = (t: number) => l.raf(t * 1000)
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0) // drive Lenis off GSAP's ticker
    setLenis(l)
    return () => { gsap.ticker.remove(tick); l.destroy() }
  }, [])
  return <LenisCtx.Provider value={{ lenis }}>{children}</LenisCtx.Provider>
}
```
> Note: Lenis smooths WHEEL only, not touch. On mobile, `scrub: true` tracks the raw finger; use
> `scrub: 1` (catch-up) on pinned mobile ScrollTriggers or motion feels jerky.

**app/layout.tsx** — fonts via `next/font/google` set as CSS variables on `<html>`, wrap children in `<SmoothScroll>`. Bake the body bg color inline on `<html style>` so the first paint matches (avoids white flash).

---

## 5. Design system principles (the anti-"AI slop" rules)

These are distilled from the **impeccable** skill and are the difference between "looks AI-made" and
"looks designed." Apply them every time.

### Color
- **Use OKLCH** for all tokens.
- **The cream/beige/sand near-white body bg is THE 2026 AI tell.** Avoid warm-neutral near-whites
  (L 0.84–0.97, C<0.06, hue 40–100) and token names like `--cream/--sand/--paper/--linen`. Instead:
  a saturated brand color, a true off-white at chroma ~0 (or tinted toward the BRAND hue, not warm),
  or a dark brand-tinted neutral.
- Pick a **color strategy** first: Restrained (neutrals + 1 accent ≤10%), Committed (1 saturated
  color 30–60%), Full-palette, or Drenched. Brand/marketing sites should commit, not hedge.
- Verify contrast: body text ≥4.5:1; large text ≥3:1. Light-gray body text on tinted white is the
  #1 readability failure.
- Derive the palette from the product/subject (I pull tokens straight from the device/product render).

### Typography
- **Reject-list (overused, read as AI default):** Inter, DM Sans/Serif, Space Grotesk, Space Mono,
  Plus Jakarta, Outfit, Instrument Sans/Serif, Fraunces, Playfair, Cormorant, Syne, IBM Plex *,
  Newsreader, Lora, Crimson. Look further (Fontshare: Clash Display, Cabinet Grotesk, General Sans,
  Satoshi; Google: Bricolage Grotesque, Hanken Grotesk, Jost, Big Shoulders, Schibsted Grotesk).
- Pair on a **contrast axis** (geometric display + humanist body, or serif + sans) — never two
  similar sans. A single family in committed weights is stronger than a timid pair.
- Display heading clamp max ≤ ~6rem for normal pages; go colossal (10–20vw) deliberately for a
  broken-grid hero. Letter-spacing floor -0.04em. Use `text-wrap: balance` on headings, `pretty` on prose.

### Layout
- Vary spacing for rhythm; break the grid intentionally; asymmetry is allowed.
- Flexbox for 1D, Grid for 2D. Responsive without breakpoints: `repeat(auto-fit, minmax(280px, 1fr))`.
- Cards are the lazy answer — use only when truly the best affordance; nested cards are always wrong.
- Semantic z-index scale, never `9999`.

### Motion
- Ease-out with exponential curves (`expo.out`, `power3.out`). No bounce/elastic.
- Reveals must ENHANCE an already-visible default — don't gate visibility on a class transition that
  can fail on hidden tabs/headless renders (ships blank). Guard every animation with
  `@media (prefers-reduced-motion: reduce)` (and check `matchMedia` in JS before `gsap.from(...)`).
- Blur, backdrop-filter, clip-path, mask, glow are legit premium motion materials, not just x/opacity.

### Absolute bans (rewrite if you catch yourself)
- Side-stripe `border-left` accents · gradient text (`background-clip:text`) · glassmorphism as
  default · the hero-metric template · identical repeated icon+heading card grids · a tiny uppercase
  tracked eyebrow above EVERY section · numbered `01/02/03` section markers as default scaffolding ·
  text that overflows its container at any breakpoint.

---

## 6. Signature "fancy" patterns (the stuff that makes it feel alive)

These are the reusable moves. Ask the new Claude to build any by name.

1. **Living WebGL shader background** (`components/effects/ShaderBackground.tsx`): a fixed full-screen
   R3F `<Canvas>` with a fullscreen-plane fragment shader (fbm noise → flowing gradient) whose palette
   is driven by a `uScroll` uniform (eased toward `window.scrollY / scrollHeight`). Colors shift down
   the page. Sections above it go transparent so it shows through = "changing live background." Keep
   the palette dark/refined (deep brand-tinted) so light type stays legible. Load via a **client
   wrapper** with `dynamic(() => import(...), { ssr: false })` — `ssr:false` dynamic imports are NOT
   allowed directly in a Server Component (page.tsx).

2. **AI aurora edge-glow** (CSS only): a fixed overlay, `pointer-events:none`, `::before` a big blurred
   `conic-gradient` masked with `radial-gradient(... transparent 56%, #000 82%)` so only the viewport
   EDGES glow, slowly `rotate()`-animated. The "spectrum halo hugging the screen."

3. **Kinetic scramble text** (`components/ScrambleText.tsx`): decodes text left→right through random
   glyphs on mount / when `play` flips. Used for hero words + section-title morphs. **Gotcha:** size
   each character cell by its FINAL glyph (render final char invisibly, overlay the random one
   absolutely) or the line width jitters every frame and wrapped titles jump between lines.

4. **Big-type showcase section** (`DeviceFeature`): oversized display title that wipes up out of an
   `overflow:hidden` mask (`gsap.from(inner,{yPercent:115})`), a transparent product PNG floating with
   a radial brand glow + gentle CSS float, callouts sliding in, alternating left/right sides. This is
   the workhorse "product part + huge words" section.

5. **Scroll-scrub video** (Apple-style): pin a section, seek a `<video>`'s `currentTime` to scroll
   progress (seek-throttled: only request the next frame after `seeked` fires). Product rotates/explodes
   as you scroll. **iOS gotcha:** a paused seek-only video never paints on iPhone until "primed" with a
   muted `play()`→`pause()`; also re-prime on first `touchstart` (Low Power Mode blocks autoplay).

6. **Cinematic mega-pin** (the 3S hero): ONE giant pinned section (`end:'+=1200%'`, `scrub`) whose
   `onUpdate(progress)` drives many phases (video scrub → menu reveal → door open → product morph →
   scenes → collage). Measure rects at rest, lerp left/top/width/height rather than transform-scale
   when boxes must line up precisely. Gate later phases behind progress thresholds.

7. **Section-to-section transitions:** dark↔light "peel" (next section has rounded top + negative
   margin, rising over the previous), clip-path wipes, a persistent element that travels/morphs
   between sections, color bleeds via the shader palette. Never hard cuts.

8. **Glassmorphism panel** (sparingly): `backdrop-filter: blur(22px) saturate(180%)`, translucent
   gradient bg, hairline inset highlights. Great for floating headers/pills; never as default.

9. **Count-up stats:** `gsap.to({v:0},{v:target, onUpdate:setText})` triggered on scroll-in.

10. **Reduced-motion + reveal safety** baked into every animated component.

---

## 7. Mobile responsiveness playbook (learned the hard way)

- Define a **safe frame**: assume ~390×844, verify math at 360×740 AND ~667 tall. Reserve the fixed
  header strip (top ~16–56px) and any fixed corner/back-to-top zones; keep every pinned full-viewport
  layer's content out of them.
- On pinned sections that are taller than the viewport, **top-anchor** content (don't vertical-center)
  or the top slides under the fixed chrome and the exit leaves a blank gap.
- Size big media by BOTH width and viewport HEIGHT (`min(84vw, calc((100vh - 310px)/1.5))`) so tall
  content can't overflow on short screens.
- **iOS Safari doesn't really support `background-attachment: fixed`** inside transformed/pinned
  containers — it re-rasters every frame (shimmer/flicker). Drop to `scroll` on mobile.
- Any hardcoded JS constant that mirrors a CSS value (e.g. row height for a translate step) must be
  MEASURED (`offsetHeight`) — mobile CSS changes the value and the constant overshoots.
- Replace hover-only affordances on touch (no hover): e.g. a hover-driven word becomes a static menu.
- Use `dvh`/`svh` for bottom-anchored elements if the URL bar shifts them.
- Put mobile overrides in `@media (max-width: 640/680/760px)` blocks so desktop is untouched.

---

## 8. AI asset generation workflow (images + video)

**The #1 lesson:** AI image/video tools **cannot reliably reproduce YOUR specific product from a text
prompt** — they reinvent it. Two correct paths:
- **Reference-locked models** (best for the product): generate in the Higgsfield web UI (or ChatGPT)
  with your product image ATTACHED as reference — **Nano Banana Pro / GPT Image 2** (stills),
  **Seedance 2.5 / Kling** (video). These stick to the reference. Always say "no text, no logos" and
  "dark/transparent background" so plates composite onto a dark site (never a white box on a dark bg).
- **Text-only generation** (only for ABSTRACT atmosphere — nebulae, wireframe/mocap art, glows):
  fine via any model since there's no exact product to match.

**Practical pipeline:**
- Export **transparent PNG plates** of the product (whole + parts: head, base, case) → `public/images/`
  → float them over dark sections with a brand glow. Transparent RGBA = no background box.
- For "rotates as you scroll," make a **turntable/​power-on video** with a reference-locked video model,
  dark bg, slow + loopable → `public/videos/` → wire the scroll-scrub pattern (#6.5).
- Chain within a tool when possible (a generated image's hosted URL can feed an image→video step).
- **What NOT to do:** don't text-prompt "make my device" and ship it; don't put a light/white-bg
  product image over a dark/green background (amateur composite).
- MCP note: a connected Higgsfield MCP may only expose lower-tier models (Soul image / DOP video). The
  strong reference-locked models live in the web UI — have the human generate there and drop files in.

---

## 9. Claude Code skills (names + when to use)

Install/enable these; invoke with `/name`. Even if a skill isn't installed in the new environment, the
PRINCIPLES above (from impeccable) still apply.

- **impeccable** — the design system driver. Loads a register (brand vs product) + anti-slop rules.
  Subcommands: `craft` / `shape` (build a feature), `init` (capture PRODUCT.md/DESIGN.md), `critique`,
  `audit` (a11y/perf/responsive), `polish`, `bolder` / `quieter`, `distill`, `harden`, `onboard`,
  `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`, `clarify`, `adapt`, `optimize`,
  `live` (in-browser variant iteration). It runs a hook that flags slop after UI edits.
- **frontend-design** — distinctive production-grade UI generation (components/pages/landing).
- **ui-ux-pro-max** — big library of styles/palettes/font-pairings/stacks; planning + review.
- **dataviz** — any chart/graph/dashboard/stat-tile; read BEFORE writing chart code.
- **artifact-design / artifact-capabilities / artifact-diagramming** — for claude.ai Artifacts.
- **verify** — drive the change end-to-end in the real app before committing.
- **code-review** (`/code-review [level]`), **simplify** — review/clean the working diff.
- **run** — launch/drive the app to see a change working.
- **init** — generate CLAUDE.md for a repo. **security-review**, **review** (GitHub PRs).
- **loop**, **schedule** — recurring/automated tasks. **update-config**, **fewer-permission-prompts**,
  **keybindings-help** — Claude Code harness config.

---

## 10. Hard-won gotchas / bug fixes (checklist)

- `ssr:false` dynamic import → must live in a `'use client'` wrapper, not the server page.
- three/r3f → `transpilePackages` in next.config or build fails.
- iOS scroll-scrub video → prime with muted play→pause + re-prime on touchstart.
- Mobile `background-attachment: fixed` → switch to `scroll` (flicker).
- `scrub: true` on mobile pins → use `scrub: 1`.
- JS constants mirroring CSS (row heights etc.) → measure at runtime.
- ScrambleText width jitter → size cells by the final character.
- Transparent product plates on dark, never light-bg images on dark.
- Reduced-motion guard on every animation; reveals enhance a visible default.
- No browser automation here — I cannot watch a live site render. Verify visuals in YOUR browser and
  give feedback (screenshots/recordings for reference sites; I read motion from video, not live URLs).
- Windows CRLF warnings on commit are harmless.

---

## 11. Workflow conventions

- Run locally via `START.bat` (port 3000) or `npm run dev`. Don't leave a rogue dev server on 3000.
- **Always `npm run build` before committing** nontrivial changes (catches type + SSR errors).
- Commit in focused chunks with a descriptive subject + body; end with the Co-Authored-By trailer.
- Branch off the default branch before committing if asked to push; use `gh` for repo creation/PRs.
- Private GitHub repo per site (`gh repo create <name> --private --source=. --push`).
- Keep a project memory of non-obvious decisions (a `memory/` or CLAUDE.md), and a per-site notes file.

---

## 12. Quick-start prompt for the new Claude

> "Scaffold a new Next.js 15 site named `<NAME>` using my house stack and playbook (pasted above):
> App Router + React 19 + TS strict + Tailwind 4 + GSAP/ScrollTrigger + Lenis + Motion +
> R3F/drei/Rapier. Create the folder structure, all config files, the lib + SmoothScroll foundation,
> an OKLCH `@theme` derived from [my brand/product], and a minimal working homepage that proves the
> stack (living shader bg + one GSAP scroll section). English only. Then `npm install`, verify the
> build, `git init`, and create a private GitHub repo. Follow the anti-slop design rules and the
> signature patterns. Load the `impeccable` skill first if available."
