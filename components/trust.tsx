import { REAL, categories } from "@/lib/data";
import { Marquee, Reveal, TornBottom, TornTop } from "./paper";

const stubs = [
  { big: REAL.creators, small: "creators & teams" },
  { big: "Every", small: "order escrow-protected" },
  { big: "Verified", small: "profiles only — humans check" },
  { big: "Zero", small: "bidding wars. Ever." },
];

export default function Trust() {
  return (
    <section aria-label="Foontro by the numbers" className="relative bg-paper-2">
      <TornTop className="text-paper" />
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stubs.map((s, i) => (
            <Reveal key={s.small} delay={i * 0.07}>
              <div className="paper-tex relative rounded-[4px] bg-card px-6 py-7 text-center shadow-card">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-3 left-0 border-l-2 border-dashed border-line"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-3 right-0 border-r-2 border-dashed border-line"
                />
                <p className="tnum font-display text-[2.4rem] font-bold tracking-tight text-ink">
                  {s.big}
                </p>
                <p className="mt-1 text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  {s.small}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 mb-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
            Pinned to the board right now
          </p>
        </Reveal>
        <Marquee>
          {categories.map((c) => (
            <span
              key={c.name}
              className="paper-tex whitespace-nowrap rounded-full border border-line bg-card px-5 py-2.5 text-[0.95rem] font-semibold shadow-card"
            >
              {c.name}
              <span className="tnum ml-2 text-[0.8rem] font-medium text-ink-faint">from {c.from}*</span>
            </span>
          ))}
          {["Logo design", "Pitch decks", "Thumbnails", "Copywriting", "Chatbots", "Voiceovers"].map((g) => (
            <span
              key={g}
              className="whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-[0.95rem] font-semibold text-paper"
            >
              {g}
            </span>
          ))}
        </Marquee>
        <p className="mt-3 text-center text-[0.75rem] text-ink-faint">*Illustrative starting prices</p>
      </div>
      <TornBottom className="text-paper" />
    </section>
  );
}
