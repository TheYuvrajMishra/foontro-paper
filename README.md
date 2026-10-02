# FOONTRO — "Paper Trails" (concept redesign, craft.do genre)

A warm, playful, paper-torn landing page concept for **foontro.com** —
India's curated freelance marketplace. Built with Next.js 16 (App Router),
TypeScript, Tailwind CSS v4 and `motion`. Zero other dependencies.

## The concept

The page is a **sunlit studio desk**: every deal is a piece of paper you can
touch. Briefs get pinned, escrow is money sealed in a wax-stamped envelope,
approval is a rubber stamp slamming PAID. Torn-paper edges separate sections;
washi tape, push pins, sticky notes and doodle arrows hold it all together.

**Reference:** craft.do (Inspire mode) — the paper-genre system (documents as
living UI, stacked paper cards, generous whitespace, warm paper background,
playful document motifs, centered editorial conversion flow). All copy,
illustrations, components and brand assets are original to Foontro; nothing
was lifted from the reference. Display type is Fraunces, body Instrument Sans,
margin notes Caveat (all open Google Fonts).

**Signature moments**
1. **The deal desk (hero):** pin a brief → verified freelancers answer → hire
   one → escrow seals with a wax stamp → approve → PAID stamp slams. The whole
   product in 20 seconds, playable.
2. **The sealed-envelope rule (escrow):** a dark "vault" chapter where scrolling
   breaks the wax seal, the flap opens and the release note slides out.

## Run it

```bash
cd foontro-paper
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint (clean)
npm run build    # production build (passes)
```

## Sections

`nav` → hero + deal desk → trust stubs + category marquee → how it works
(4 pinned folds) → escrow vault (scroll-scrubbed envelope) → for clients /
for freelancers → corkboard categories + freelancer specimen cards →
paper-trail ledger + login-streaks stamp card → money mechanics + FAQ →
giant CTA → footer.

## What's real vs. demo

- **Real:** brand name, ember `#F36938` / near-black `#181818` brand colors,
  "5,000+ creators and teams", verified-freelancer flow, escrow-until-approval,
  "Login Streaks are live — earn metallic frames & boost search visibility",
  India-first positioning, Play Store app existence.
- **Demo / placeholders:** freelancer names, brief budgets, ratings, gig
  "from" prices, ledger rows, streak starting state, commission and payout
  timing (marked "To confirm" — see `lib/data.ts`). Nothing invented is
  presented as a company fact.

## Accessibility & motion

- One `<h1>`, real HTML text, landmarks (`header`/`main`/`footer`/`nav`),
  meta + Open Graph + JSON-LD (`Organization`), skip link, labelled controls.
- `prefers-reduced-motion`: scroll scenes render final states statically;
  reveals/marquee/floats are disabled via CSS + `useReducedMotion()`.
- Text contrast: body ink-on-paper ~13:1, primary CTAs ember-deep-on-paperwhite
  ~5.9:1, ink-on-ember ~5.5:1, paper-on-ink ~13:1.
- Touch: 44px+ targets, no hover-only content.

No browser-based visual QA was run (per standing instruction — Chromium/
Playwright only on explicit request).
