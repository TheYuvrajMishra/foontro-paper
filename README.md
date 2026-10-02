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
was lifted from the reference. Primary typeface is **Zain** (Google Fonts),
with Fraunces italic reserved for accent words and Caveat for margin notes.
Photography: 12 locally-hosted stock photos (`public/img/`) — desk, brief,
escrow envelope, freelancer portraits (illustrative), category thumbs,
community wall.

**Signature moments**
1. **The deal desk (hero):** pin a brief → verified freelancers answer → hire
   one → escrow seals with a wax stamp → approve → PAID stamp slams. The whole
   product in 20 seconds, playable.
2. **The sealed-envelope rule (escrow):** a dark "vault" chapter where scrolling
   breaks the wax seal, the flap opens and the release note slides out.
3. **The living desk (wild layer):** a canvas paper-storm — scraps drift and
   scatter from the pointer at 60fps (paused offscreen, off on
   reduced-motion/touch); every section rips open through torn paper halves on
   entry; cards tilt in 3D under the pointer.

## Run it

```bash
cd foontro-paper
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint (clean)
npm run build    # production build (passes)
```

## Sections

`nav` → hero + deal desk (real flow: browse → order → seal → paid) → trust
stubs + category marquee → how it works (the official 4 steps, exact site
copy) → escrow vault (scroll-scrubbed envelope, exact FAQ quotes) → **WE
FIXED ONE** (the 4 real value props) → for clients / for freelancers →
corkboard with the 9 real category tiles + trending services (real public
listings: Shubhi ₹1,200, Irva ₹6,000, Rehan ₹800) → **the order machine**
(interactive: pick a service → place order → escrow seals → chat → approve
& pay; the official Browse → Order → Chat → Approve & Pay) → social proof
(real testimonial attributions, no invented quotes) + paper-trail ledger +
login-streaks stamp card → money mechanics (real pricing: Basic Free = 10%
commission, Foontro Pro = ₹499 keep 100%; UPI/cards/netbanking) + real FAQ →
giant CTA ("India's FRESHEST freelance marketplace") → footer (real columns).

## What's real vs. demo (verified from foontro.com, 2026-10-02)

- **Real:** "India's Most Verified Freelance Marketplace", "5,000+ creators
  and teams", 21% freelancer acceptance rate (manual human review), the
  official 4-step flow Browse → Order → Chat → Approve & Pay (exact site
  copy), the 9 category tiles + popular searches, trending public listings
  (Shubhi Chouksey ₹1,200, Irva Jobanputra ₹6,000, Rehan Shahid ₹800), the
  "WE FIXED ONE." value props (exact copy), escrow/verification/fee FAQ
  answers (exact wording), pricing (Basic Free = 10% commission; Foontro
  Pro = ₹499, keep 100% + perks), UPI/debit/credit/netbanking via secure
  gateway, testimonial attributions (Rakhi Pal, Co-Founder Beep; Madhosh
  Muskan, Marketing Manager), final CTA copy, footer columns.
- **Key finding:** Foontro has NO "post a brief" feature — it is an
  order-based (gig-style) marketplace. The earlier fictional "Brief Machine"
  was replaced with the real **Order Machine** (pick a service → order →
  escrow seals → chat → approve & pay), and all "Post a brief" CTAs became
  "Browse services".
- **Demo / placeholders:** portrait photos (illustrative stock, labeled),
  chat-thread dialogue, ledger rows/IDs, streak tier names/counts, hero
  deal-desk staging. Nothing invented is presented as a company fact.

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
