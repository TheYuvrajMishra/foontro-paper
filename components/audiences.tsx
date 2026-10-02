import { PaperCard, Reveal, SectionHead, Stamp, Tape } from "./paper";

const clientPoints = [
  { t: "Verified portfolios", c: "Every freelancer passes a human verification check before taking orders." },
  { t: "Escrow on every order", c: "Your money is sealed before work begins. No chasing, no advances lost." },
  { t: "Milestone approvals", c: "Big project? Split it into milestones and approve each fold as it lands." },
  { t: "Direct chat + revisions", c: "Talk to the person doing the work. Revisions happen before money moves." },
];

const proPoints = [
  { t: "Pay secured before you start", c: "The brief comes with proof of funds. No more 'exposure' gigs." },
  { t: "No bidding wars", c: "Get matched to briefs that fit your craft. Your portfolio does the talking." },
  { t: "Streaks boost visibility", c: "Log in daily, earn metallic frames, and climb the search rankings." },
  { t: "Keep every rupee honest", c: "Clear payouts on approval. Your paper trail builds your reputation." },
];

function Sheet({
  eyebrow,
  title,
  points,
  cta,
  ctaHref,
  stamp,
  tapeTone,
}: {
  eyebrow: string;
  title: string;
  points: { t: string; c: string }[];
  cta: string;
  ctaHref: string;
  stamp: string;
  tapeTone?: "" | "tape-blue" | "tape-rose";
}) {
  return (
    <PaperCard className="relative flex h-full flex-col p-7 sm:p-9">
      <Tape tone={tapeTone} className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-pine">{eyebrow}</p>
      <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.1rem)] font-semibold leading-tight tracking-tight">
        {title}
      </h3>
      <ul className="mt-6 flex flex-col gap-4">
        {points.map((p) => (
          <li key={p.t} className="flex gap-3.5">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pine text-[0.8rem] font-bold text-card"
            >
              ✓
            </span>
            <div>
              <p className="font-bold">{p.t}</p>
              <p className="mt-0.5 text-[0.95rem] leading-relaxed text-ink-soft">{p.c}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
        <a
          href={ctaHref}
          className="rounded-full bg-ink px-6 py-3 font-semibold text-paper shadow-card transition-transform hover:-translate-y-0.5"
        >
          {cta}
        </a>
        <Stamp className="text-[0.72rem]">{stamp}</Stamp>
      </div>
    </PaperCard>
  );
}

export default function Audiences() {
  return (
    <section aria-label="For clients and freelancers" className="relative bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Two sides, one desk"
          title={
            <>
              Built for the hirer <em className="font-medium">and</em> the hired.
            </>
          }
          lede="Marketplaces usually pick a side. Foontro's paper trail protects both — that's why both keep coming back."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Sheet
              eyebrow="For clients"
              title="Hire like you've worked with them for years."
              points={clientPoints}
              cta="Post a brief — free"
              ctaHref="#cta"
              stamp="Zero risk hiring"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <span id="freelancers" className="block scroll-mt-28" />
            <Sheet
              eyebrow="For freelancers"
              title="Your craft, guaranteed pay."
              points={proPoints}
              cta="Apply as a freelancer"
              ctaHref="#cta"
              stamp="Verified only"
              tapeTone="tape-rose"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
