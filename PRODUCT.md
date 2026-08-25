# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary, prospective clients.** People and organisations who might commission
landscape or architectural design work: private clients, developers, municipal
and cultural competition entrants, and studios looking for a collaborator on a
specific project. They arrive from a Behance link, an Instagram profile, or a
direct introduction. Their job is to decide, in a couple of minutes, whether
this person's work is good enough and serious enough to trust with a
commission, and then to find out how to start that conversation.

**Secondary, studios and employers hiring.** Practices in Milan and elsewhere
reviewing him for a role. He is available for both freelance and full-time.
They need the credentials, the roles, the education and the tools list to be
findable without hunting, but they are not who the site is shaped around.

Ordering is settled: built to win commissions first, with an unobstructed route
to the CV for anyone hiring.

## Product Purpose

A portfolio site for **MJ Terra Design**: the practice of Mohamadjavad Shoori,
architect and graphic designer in Milan. It exists to convert a visitor's
attention into a started conversation.

Success is not traffic or time-on-page. Success is a stranger who came for a
look sending an email that begins a project.

## Positioning

Landscape architecture where the drawing, the diagram and the identity are made
by the same hand. Most landscape practices outsource their graphic language;
most graphic designers cannot read a site plan. Mohamadjavad holds an M.Arch in
Landscape Architecture from Politecnico di Milano and roughly seven years of
professional graphic design practice, so the masterplan, the analytical
diagrams, the board layout and the project's identity are one continuous act of
design rather than four handoffs.

This is a truthful claim about how the work is made, and it is legible in the
work itself: the portfolio boards are simultaneously the architecture and the
graphic design.

## Operating Context

- Work is presented as **projects**, not as portfolio books. The three Behance
  galleries are containers; the individual named projects inside them are the
  unit a client evaluates.
- Projects carry academic and professional provenance that matters to the
  reader: location, year, studio and semester, supervising professors, whether
  it was group or solo, and his specific role within it.
- The working toolset is Rhino, Illustrator, Photoshop, InDesign, QGIS,
  Twinmotion, Lumion, AutoCAD, Figma, Fresco, CorelDraw and hand drawing.
- Evaluation happens fast and often on a phone, from a social link.
- He is reachable directly, email, phone, Instagram, LinkedIn, Behance. There
  is no studio front desk between him and a client.

## Capabilities and Constraints

- Next.js 15 App Router, React 19, TypeScript strict, Tailwind 4. Already
  scaffolded and building clean. This is settled; the stack question is closed.
- **No CMS.** All portfolio content is a typed dataset in
  `content/projects.ts`. Adding work means adding entries there.
- Static content only. No accounts, no booking, no payment, no search backend.
  Contact is a direct channel out (email / phone / social), not a stored form.
- **Image resolution has a hard ceiling.** Except for the logofolio, every
  source image is a photograph of a *printed* portfolio book, page spreads on
  a grey surface with drop shadow and page curl. The artwork must be cropped
  out of those photographs. Original design files are not available. Some
  projects will therefore be represented by imperfect crops, and no amount of
  processing recovers detail the photograph never had.
- **Undecided, do not invent:** the production domain; whether MJ Terra Design
  is a registered entity or a working name; project pricing, availability
  windows, or service tiers.

## Brand Commitments

- **Name: MJ Terra Design.** The practice name leads and is the wordmark.
  Mohamadjavad Shoori is the person behind it, named throughout and owning the
  About page. Not an anonymous studio voice.
- **Architecture-led.** Landscape architecture is the headline; graphic design
  is a strong secondary. Not a 50/50 split and not two separate doors into the
  site. Binding, chosen by the client over the alternatives.
- **Individual projects are the unit of work**: the three Behance books get
  broken apart into named projects.
- Binding visual constraints the client set, recorded but not expanded here:
  a white / gallery ground with black type, minimal and sophisticated; artwork
  cropped free of its book mockups.
- Voice: first person, plain, unpadded. He writes quickly and informally and
  dislikes inflated claims.

## Evidence on Hand

Real, in `assets/` (gitignored, not yet in the site):

| Source | Contents |
|---|---|
| `assets/behance/landscape/` | 26 spreads, Landscape Architecture Portfolio, published 13 Mar 2025 |
| `assets/behance/graphic/` | 11 spreads, Graphic Designing Portfolio, published 16 Apr 2025 |
| `assets/behance/logofolio/` | 12 clean full-bleed images, Logofolio collection 1, Nov 2022 |
| `assets/PROFILE-EXTRACTED.md` | CV: education, six roles with dates, tools, contacts, bio |

Two projects confirmed by name so far:

- **Purification Movement: From waste to living shore**: Lugano, Switzerland.
  Landscape Design Studio 2, Semester 3, group project. Professors Yves Hope
  Strode and Sara Protasoni. His role: concept design, masterplan, diagrams,
  render. Rhino, Illustrator, Photoshop, QGIS. Dated 2024.
- **8th Asian Men's Beach Handball Championship**: Iran, 2022. Logo/identity.

**`assets/PROFILE-EXTRACTED.md` was transcribed off a compressed mockup image
and has not been proofed by Mohamadjavad.** Every fact taken from it,
especially dates, professor names, phone number and the verbatim bio, is
provisional until he confirms it.

**Absences that must never be filled with invention:** there are no
testimonials, no named client list, no press coverage, no awards, no
competition results, no visitor or engagement metrics, and no case-study
outcomes. If the site appears to have any of these, they were fabricated.

## Product Principles

1. **The work is the argument.** Every layout decision serves the artwork's
   legibility first. Interface that competes with the drawings is a defect.
2. **Provenance is credibility.** Location, year, studio, professors, role and
   tools are not metadata to hide, for this audience they are the proof, and
   they are all the proof that honestly exists.
3. **Never invent proof.** No fabricated clients, testimonials, metrics or
   awards, and no implied commissions for academic projects. The absence list
   above is binding.
4. **One hand, visibly.** Where architecture and graphic design meet in a
   project, show it. That junction is the position, and it cannot be claimed in
   copy as convincingly as it can be shown.
5. **Every path ends at a conversation.** The site's only conversion is a
   started project. No page should be a dead end.

## Accessibility & Inclusion

- Every animation must check `prefersReducedMotion()` from `lib/motion.ts`, and
  every reveal must enhance an already-painted default, a headless or
  reduced-motion render must never ship blank or empty.
- Black-on-white body type is the ground state; contrast must not be traded
  away for atmosphere on any text that carries information.
- Image-heavy by nature: every project image needs real alt text describing the
  work, not a filename or a repeated project title.
- Read on phones from social links as often as on desktop.
