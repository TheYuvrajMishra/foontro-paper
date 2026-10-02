/* ————————————————————————————————————————————————
   Foontro "Paper Trails" — content model
   REAL: brand, 5,000+ creators & teams, verified-freelancer flow,
         escrow-until-approval, Streaks (metallic frames + search
         visibility boost), India-first, Play Store app, #F36938 / #181818.
   DEMO: names, amounts, ratings, ledger rows, gig prices, tiers.
   Nothing invented is presented as a company fact.
———————————————————————————————————————————————— */

export const REAL = {
  creators: "5,000+",
  creatorsLabel: "creators & teams",
  escrowLine: "Every order is escrow-protected until you approve.",
  streaksLine:
    "Login Streaks are live — earn metallic frames & boost search visibility.",
} as const;

export type Brief = {
  id: string;
  label: string;
  title: string;
  blurb: string;
  /** DEMO amount */
  budget: string;
};

export const briefs: Brief[] = [
  {
    id: "logo",
    label: "Logo & brand kit",
    title: "Logo + mini brand kit for a D2C chai brand",
    blurb: "Playful, premium, works on a pouch and an app icon.",
    budget: "₹4,500",
  },
  {
    id: "landing",
    label: "Landing page",
    title: "Design + build a landing page for a fintech app",
    blurb: "React + Tailwind, 5 sections, copy polish included.",
    budget: "₹12,000",
  },
  {
    id: "video",
    label: "Explainer video",
    title: "60-sec product explainer, motion graphics",
    blurb: "Script help, voiceover direction, 2 revision rounds.",
    budget: "₹8,000",
  },
];

export type Freelancer = {
  name: string;
  craft: string;
  city: string;
  /** DEMO */
  rating: string;
  /** DEMO */
  projects: number;
  skills: string[];
  /** DEMO */
  rate: string;
  note: string;
};

export const freelancers: Freelancer[] = [
  {
    name: "Ananya S.",
    craft: "Brand designer",
    city: "Kolkata",
    rating: "4.9",
    projects: 32,
    skills: ["Logo", "Identity", "Packaging"],
    rate: "₹4,500",
    note: "Ships a first concept in 48 hours. Always does.",
  },
  {
    name: "Rohan V.",
    craft: "React developer",
    city: "Bengaluru",
    rating: "4.8",
    projects: 41,
    skills: ["Next.js", "TypeScript", "APIs"],
    rate: "₹12,000",
    note: "Clean PRs, honest timelines, zero drama.",
  },
  {
    name: "Meera K.",
    craft: "Motion designer",
    city: "Mumbai",
    rating: "5.0",
    projects: 27,
    skills: ["Explainers", "Kinetic type", "Lottie"],
    rate: "₹8,000",
    note: "Storyboards before a single keyframe.",
  },
];

export type Category = {
  name: string;
  gigs: string[];
  /** DEMO */
  from: string;
  tilt: string;
};

export const categories: Category[] = [
  { name: "Design", gigs: ["Logos", "Brand kits", "Pitch decks"], from: "₹1,499", tilt: "-2deg" },
  { name: "Development", gigs: ["Landing pages", "Web apps", "APIs"], from: "₹4,999", tilt: "1.5deg" },
  { name: "Video & Motion", gigs: ["Explainers", "Reels edits", "Thumbnails"], from: "₹1,999", tilt: "-1deg" },
  { name: "Writing", gigs: ["Website copy", "Blogs", "Scripts"], from: "₹999", tilt: "2deg" },
  { name: "Marketing", gigs: ["SEO", "Ad creatives", "Email"], from: "₹2,499", tilt: "-2.5deg" },
  { name: "AI & Automation", gigs: ["Chatbots", "Workflows", "n8n"], from: "₹3,999", tilt: "1deg" },
  { name: "Audio", gigs: ["Voiceovers", "Mixing", "Jingles"], from: "₹1,299", tilt: "-1.5deg" },
  { name: "Business", gigs: ["Data entry", "Research", "VA"], from: "₹799", tilt: "2.5deg" },
];

/** DEMO ledger rows — illustrative escrow movement, not real transactions */
export const ledger = [
  { id: "F-2049", what: "Logo + brand kit", who: "Ananya S.", amount: "₹4,500", state: "Released", time: "2h ago" },
  { id: "F-2048", what: "Landing page build", who: "Rohan V.", amount: "₹12,000", state: "In escrow", time: "5h ago" },
  { id: "F-2047", what: "Explainer video", who: "Meera K.", amount: "₹8,000", state: "Released", time: "1d ago" },
  { id: "F-2046", what: "Pitch deck", who: "Arjun P.", amount: "₹3,200", state: "Revision 2", time: "1d ago" },
  { id: "F-2045", what: "SEO audit", who: "Sara D.", amount: "₹2,400", state: "Released", time: "2d ago" },
] as const;

export const streakTiers = [
  { days: 7, frame: "Bronze", note: "Your first metallic frame" },
  { days: 15, frame: "Silver", note: "Search visibility boost kicks in" },
  { days: 30, frame: "Gold", note: "Top-of-search glow-up" },
] as const;

export const fees = [
  { row: "Posting a brief", value: "Free", confirm: false },
  { row: "Browsing & chatting", value: "Free", confirm: false },
  { row: "Escrow holding", value: "Free", confirm: false },
  { row: "Platform fee on orders", value: "To confirm", confirm: true },
  { row: "Freelancer payout timing", value: "To confirm", confirm: true },
] as const;

export const faqs = [
  {
    q: "How does escrow actually work?",
    a: "You pay when you place the order, but Foontro holds the money in escrow — the freelancer can't touch it yet. They start work knowing the payment is real. When you approve the final delivery, the money releases. Revisions happen before a single rupee moves.",
  },
  {
    q: "Who are the freelancers?",
    a: "Verified creators and small teams, mostly across India. Every profile passes a verification check before they can take orders — portfolios, identity, and past work get reviewed by a human, not just an algorithm.",
  },
  {
    q: "What if I don't like the work?",
    a: "Then you don't approve it. You request revisions and the freelancer reworks it while your money stays sealed in escrow. Approval is a stamp only you can slam.",
  },
  {
    q: "Do I have to pick from bids?",
    a: "No bidding wars. You post one brief and get matched with hand-picked freelancers who actually fit the job. You compare a few real portfolios, chat directly, and hire.",
  },
  {
    q: "I'm a freelancer. How do I join?",
    a: "Apply with your portfolio, pass verification, and start receiving matched briefs. Your payment is secured in escrow before you begin — and daily login Streaks earn you metallic frames plus a search visibility boost.",
  },
  {
    q: "Is Foontro only for Indian clients?",
    a: "Foontro is India-first — built for how India hires and pays — and remote-friendly by design. Clients and freelancers collaborate fully online, brief to approval.",
  },
];
