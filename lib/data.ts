/* ------------------------------------------------------------------ */
/*  Real vs demo — the honesty ledger for this redesign                */
/*                                                                     */
/*  REAL (verified from foontro.com, 2026-10-02):                      */
/*   · "India's Most Verified Freelance Marketplace"                   */
/*   · 5,000+ creators and teams · 21% freelancer acceptance rate       */
/*   · The 4-step flow: Browse → Order → Chat → Approve & Pay           */
/*     (with the site's exact step copy)                               */
/*   · 9 category tiles, 6 service dropdown categories, trending       */
/*     services with real names/taglines/prices (public listings)      */
/*   · Value props: "WE FIXED ONE." + 4 cards (site's exact copy)       */
/*   · Escrow + verification FAQ answers (site's exact wording)         */
/*   · Pricing: Basic Free = 10% commission; Foontro Pro = ₹499,        */
/*     keep 100% + perks; client browsing/signup free; UPI/cards/       */
/*     netbanking via secure gateway                                   */
/*   · Final CTA: "India's FRESHEST freelance marketplace."            */
/*   · Footer columns and socials                                      */
/*  DEMO (invented for the concept, never presented as real):           */
/*   · Chat-thread dialogue, order IDs, ledger transactions, streak     */
/*     counts, portrait photos (illustrative stock), hero deal-desk    */
/*     walkthrough staging                                             */
/* ------------------------------------------------------------------ */

export const REAL = {
  tagline: "India's Most Verified Freelance Marketplace",
  creators: "5,000+",
  creatorsNote: "Loved by 5,000+ creators and teams",
  acceptanceRate: "21%",
  acceptanceNote: "Only 21% of freelancer applications are approved",
  city: "India",
  finalCta: "You found it. India's FRESHEST freelance marketplace.",
  finalCtaSub:
    "Browse thousands of verified services. Order in minutes. Chat, collaborate, and pay only when the work is done right.",
};

export type Service = {
  id: string;
  name: string;
  tagline: string; // exact public listing tagline from foontro.com
  price: string; // exact public listing price
  badge?: string;
  photo: string; // illustrative stock portrait — NOT the real person
  note: string;
};

/* Trending services, straight off the foontro.com homepage (2026-10-02).
   Names, taglines and prices are real public listings; photos are stock. */
export const services: Service[] = [
  {
    id: "shubhi",
    name: "Shubhi Chouksey",
    tagline: "I help brands create engaging UGC videos and short-form content",
    price: "₹1,200",
    badge: "#1 Trending",
    photo: "/img/portrait-ananya.jpg",
    note: "UGC video · short-form content",
  },
  {
    id: "irva",
    name: "Irva Jobanputra",
    tagline: "I help brands with short form content and voiceover",
    price: "₹6,000",
    badge: "Foontro's Pick",
    photo: "/img/portrait-meera.jpg",
    note: "Short-form content · voiceover",
  },
  {
    id: "rehan",
    name: "Rehan Shahid",
    tagline: "I help brands create engaging UGC & reel content",
    price: "₹800",
    badge: "★ 5.0 rated",
    photo: "/img/portrait-rohan.jpg",
    note: "UGC · reels",
  },
];

/* The official 4-step flow from foontro.com — exact headlines and copy. */
export const realFlow = [
  {
    n: "01",
    title: "Browse",
    copy: "Browse verified services and find the right fit fast.",
    points: ["Smart search filters", "Curated service cards"],
  },
  {
    n: "02",
    title: "Order",
    copy: "Place your order in minutes. Your payment stays protected.",
    points: ["Clear deliverables", "Secure checkout"],
  },
  {
    n: "03",
    title: "Chat",
    copy: "Chat, revise, and approve in one shared thread.",
    points: ["Central chat thread", "Revision updates"],
  },
  {
    n: "04",
    title: "Approve & Pay",
    copy: "Release payment only when the work is right.",
    points: ["Final review", "Escrow release"],
  },
];

/* The 9 category tiles from foontro.com. */
export const categories = [
  { title: "Web & App Development", blurb: "Sites, apps and products that ship.", img: "/img/cat-dev.jpg", slug: "web-app-development" },
  { title: "Design & Creative", blurb: "Brand worlds, pixel by pixel.", img: "/img/cat-design.jpg", slug: "design-creative" },
  { title: "Logo", blurb: "Marks worth remembering.", img: "/img/cat-design.jpg", slug: "logo-design" },
  { title: "Copywriting", blurb: "Words that do the selling.", img: "/img/cat-writing.jpg", slug: "content-copywriting" },
  { title: "Digital Marketing & SEO", blurb: "Traffic with intent.", img: "/img/cat-marketing.jpg", slug: "digital-marketing-seo" },
  { title: "Video & Animation Reels", blurb: "Scroll-stopping motion.", img: "/img/cat-video.jpg", slug: "video-animation-reels" },
  { title: "Data & Analytics Dashboards", blurb: "Numbers you can act on.", img: "/img/cat-dev.jpg", slug: "data-analytics-dashboards" },
  { title: "Voice & Audio Voiceovers", blurb: "Voices with presence.", img: "/img/cat-video.jpg", slug: "voice-audio-voiceovers" },
  { title: "E-commerce & Shopify Store", blurb: "Storefronts that convert.", img: "/img/cat-marketing.jpg", slug: "ecommerce-shopify" },
];

/* Value props — exact copy from foontro.com. */
export const valueProps = {
  headline: "We didn't build another freelance platform. WE FIXED ONE.",
  sub: "Verified talent, escrow protection, and a clear project flow built for real outcomes.",
  cards: [
    {
      title: "Verified talent, not random profiles",
      copy: "Every freelancer is surfaced with a practical profile so clients can move faster with more confidence.",
    },
    {
      title: "Escrow keeps the payment safe",
      copy: "Funds stay protected until the work is delivered and approved, giving both sides a clear path to completion.",
    },
    {
      title: "Quality work with real accountability",
      copy: "Clear briefs, direct chat, and structured approvals reduce friction and keep work moving.",
    },
    {
      title: "Simple pricing, no surprise fees",
      copy: "Projects stay transparent from the start, so teams can budget and scope with confidence.",
    },
  ],
};

/* Exact FAQ wording from foontro.com. */
export const escrowQuotes = {
  how: "When you place an order, your payment goes into Foontro, it does not reach the freelancer yet. The freelancer completes the work and delivers it to you through the platform. You review the delivery. Once you approve it, the payment is released to the freelancer.",
  safety:
    "Foontro uses a secure escrow model specifically designed to protect both clients and freelancers. As a client, your money is held safely and only released when you approve the delivery, you never pay and hope. As a freelancer, you are protected from clients who receive work and refuse to pay. Neither side can be cheated.",
  refunds:
    "If a freelancer fails to deliver the work within the agreed timeline or the delivery does not match what was discussed, you can raise a dispute. Foontro's team will review the case and, if the claim is valid, your payment will be refunded.",
  methods:
    "Foontro supports all major Indian payment methods, including UPI, debit and credit cards, and net banking. All transactions are processed securely through a secure payment gateway.",
  verification:
    "Every freelancer application is manually reviewed by the Foontro team, not by an algorithm. We assess portfolio quality, work samples, pricing clarity, and review an intro video for professionalism. Only 21% of applicants are approved — 4 in 5 are turned away.",
  what: "Foontro is India's most verified freelance marketplace, helping startups and small businesses hire trusted creative and digital talent without the usual risk. We're based in India and built specifically for the Indian market, with escrow-protected payments, verified freelancers, and direct chat built into every project.",
};

/* Real pricing from foontro.com (2026-10-02). */
export const pricing = {
  freelancerPlans: [
    {
      name: "Basic",
      price: "Free",
      tag: "Default · Current Plan",
      rows: ["10% platform commission", "Charged on every completed order payout", "Verified freelancer profile"],
    },
    {
      name: "Foontro Pro",
      price: "₹499",
      tag: "Recommended",
      rows: [
        "Keep 100% of your service price payout",
        "Priority ranking boost",
        "Premium gold profile frame",
        "Foontro Pro verified badge",
      ],
      footnote: "Renews every 30 days · cancel anytime",
    },
  ],
  clientNote:
    "Browsing and signing up are free for everyone. Foontro charges a platform commission on completed orders — significantly lower than global platforms — shown transparently at checkout before you confirm. No hidden fees, no monthly subscriptions.",
};

/* Real FAQ questions from foontro.com (answers from the site's FAQ). */
export const faqs = [
  {
    q: "What is Foontro?",
    a: escrowQuotes.what,
  },
  {
    q: "Is Foontro free to use?",
    a: "Yes — browsing and signing up are free for everyone. Foontro charges a platform commission on completed orders, significantly lower than global platforms, and the exact commission is shown transparently at checkout before you confirm any order. No hidden fees, no monthly subscriptions.",
  },
  {
    q: "How does the escrow payment work?",
    a: escrowQuotes.how,
  },
  {
    q: "What if the work isn't delivered as promised?",
    a: escrowQuotes.refunds,
  },
  {
    q: "How are freelancers verified?",
    a: escrowQuotes.verification,
  },
  {
    q: "Which payment methods are supported?",
    a: escrowQuotes.methods,
  },
];

export const navLinks = [
  { label: "Explore", href: "#order" },
  { label: "How it works", href: "#how" },
  { label: "Why Foontro", href: "#fixed" },
  { label: "Categories", href: "#board" },
  { label: "Pricing", href: "#money" },
  { label: "FAQ", href: "#faq" },
];

export const footerCols = [
  {
    title: "For Clients",
    links: ["How to hire", "Explore talent", "How we work"],
  },
  {
    title: "For Freelancers",
    links: ["How to create a service", "How we work", "Pricing"],
  },
  {
    title: "Company",
    links: [
      "About Foontro",
      "Trust and safety",
      "FAQ",
      "Terms of service",
      "Refund & cancellation policy",
      "Privacy policy",
      "Blog",
      "Contact us",
    ],
  },
  {
    title: "Follow us",
    links: ["Instagram", "Discord", "YouTube", "LinkedIn", "WhatsApp"],
  },
];

/* Demo-only: chat dialogue, ledger rows, streaks — staged for the concept. */
export type ChatMsg = { from: "client" | "freelancer" | "system"; text: string };
export const demoChat: ChatMsg[] = [
  { from: "client", text: "Love the concept — can the thumbnail text be bigger?" },
  { from: "freelancer", text: "On it. Sending v2 in an hour." },
  { from: "system", text: "Delivery received · 2 files attached" },
  { from: "client", text: "That's the one. Approving now." },
];

export type LedgerRow = { id: string; label: string; amount: string; state: "sealed" | "released" };
export const demoLedger: LedgerRow[] = [
  { id: "F-2049", label: "UGC video pack · Shubhi C.", amount: "₹1,200", state: "released" },
  { id: "F-2050", label: "Voiceover · Irva J.", amount: "₹6,000", state: "sealed" },
  { id: "F-2051", label: "Reel edits · Rehan S.", amount: "₹800", state: "sealed" },
];

export const streakDays = ["M", "T", "W", "T", "F", "S", "S"];
