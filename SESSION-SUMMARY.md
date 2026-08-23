# Session summary — 2026-08-23

First working session. **Read this plus `CLAUDE.md` to pick up cleanly.**

Blunt version: the foundation is built and verified, and **none of MJ's actual
work is in the site yet**. The site is a working shell with three dummy projects.

---

## 1. What exists

**A working Next.js 15 site.** Scaffolded from `WEBSITE-STACK-TRANSFER.md`:
App Router · React 19 · TS strict · Tailwind 4 · GSAP/ScrollTrigger · Lenis ·
Motion · R3F/drei/Rapier. Routes: `/`, `/work`, `/work/[slug]`, `/about`,
`/contact`, not-found.

Verified, not assumed:

- `npm run build` — clean, 10 routes prerendered, no type errors
- Dev server — all five routes returned HTTP 200, no warnings in the log
- **Not verified: how any of it looks.** There is no browser automation here.
  MJ has to open it and give feedback.

**A complete toolchain**, all installed this session via winget:
Node 24.19.0 / npm 11.17.0 · Python 3.12.10 · GitHub CLI 2.98.0.
None are on the Bash tool's PATH — see `CLAUDE.md` for the prefix.

**Nine skills** at `.claude/skills/` (gitignored). MJ had dropped them in a root
`skills/` folder, which is not a discovery path, so none were registering.
`impeccable` was updated 3.9.1 → 4.1.1 and its anti-slop hook is now wired into
`.claude/settings.local.json`.

**Source material** staged under `assets/` (gitignored):

| Path | Contents |
|---|---|
| `assets/behance/` | 49 images at 2800px — graphic 11, landscape 26, logofolio 12 |
| `assets/PROFILE-EXTRACTED.md` | MJ's CV, education, six roles, tools, contacts |
| `assets/taste-skill-bundle/` | the 7 unused taste-skill variants |

---

## 2. What does NOT exist

- `content/projects.ts` holds **"Project One / Two / Three"** — pure placeholder
- `public/images/` is **empty**; not one of the 49 images is served
- The palette is still **dark green**, not MJ's black-and-white direction
- `content/site.ts` and `app/about/page.tsx` are placeholder copy

**The committed scaffold predates MJ's design decisions. Replace it, don't
build on it.**

---

## 3. Decisions locked in

MJ chose these explicitly. Don't re-litigate them.

1. **Architecture-led** — landscape architecture headlines, graphic design is a
   strong secondary. Not 50/50, not two separate doors.
2. **Individual projects** are the unit of work — not the three Behance books.
   Break the books apart into ~10-15 named projects.
3. **White / gallery ground** — near-white, black type, minimal. Subtle,
   sophisticated. Subtle animation on buttons and icons throughout.
4. **Crop the artwork** out of the book mockups (grey backdrop, shadow, page
   curl removed).

Stated goal: impress visitors enough that they start a project with him.

---

## 4. Two findings worth keeping

**The Behance images are mockups, not artwork.** The graphic and landscape
galleries are photographs of *printed portfolio books* — page spreads on grey
surfaces with drop shadows and page curl. The individual projects live *inside*
those spreads. Only the logofolio set is clean full-bleed artwork.

**MJ's CV came out of one of those spreads** — education, six roles with dates,
tools, contacts, and a written bio. It is transcribed in
`assets/PROFILE-EXTRACTED.md` but was read off a compressed image, so
**MJ should proof it before any of it is published.**

---

## 5. The real blocker

**The projects have no names.** Two are identified out of roughly twelve:

- *Purification Movement: From waste to living shore* — Lugano, Switzerland.
  Landscape Design Studio 2, Semester 3, group project. Profs: Yves Hope Strode,
  Sara Protasoni. Role: concept design, masterplan, diagrams, render.
  Tools: Rhino, Illustrator, Photoshop, QGIS. Portfolio dated 2024.
- *8th Asian Men's Beach Handball Championship* — Iran, 2022. Logo / identity.

The rest need mining out of the 49 spreads, then correcting with MJ. No design
skill substitutes for this — the whole site is built from that dataset.

---

## 6. Next session

1. `/impeccable init` → write PRODUCT.md. Impeccable reports `NO_PRODUCT_MD`
   and its own rules require this before a from-scratch build.
2. **Identify the projects** — mine the spreads, hand MJ a list to correct.
3. Re-tokenise `app/globals.css` to the white gallery ground.
4. Crop artwork out of the mockups into `public/images/`.
5. Rewrite `content/projects.ts` from the real archive.
6. Fix `content/site.ts` (tagline, socials, domain) and the About bio.

---

## 7. Waiting on MJ

- **Google Drive** connector is unauthorized — enable it in claude.ai connector
  settings. Real exports beat cropped mockups by a wide margin.
- **Update the git remote.** The GitHub account moved `mjshoori` → `msh912`.
  Pushes still work via redirect, but fix it:
  `git remote set-url origin https://github.com/msh912/MjTerraDesign_website.git`
  (attempted this session, blocked by the permission classifier).
- **`gh auth login`** — installed but not authenticated. Only matters for
  repos/PRs.
- **Proof `assets/PROFILE-EXTRACTED.md`.**
- **Look at the running site** and say what's wrong — that feedback loop is the
  only way visual problems get found.

---

## 8. Gotchas already paid for

- Skills only load from `.claude/skills/` or `~/.claude/skills/`, and they are
  read **at session start** — installing mid-session does nothing until restart.
- `impeccable` hardcodes `.claude/skills/impeccable/scripts/` in its setup steps
  *and* its `allowed-tools`, so project-level is the only friction-free location.
- `ui-ux-pro-max` recommends **Space Grotesk**, which is on the transfer doc's
  §5 reject-list. The doc wins.
- Windows CRLF warnings on commit are harmless.
- Don't leave a dev server on port 3000 (it was stopped before this handoff).
