import { categories, freelancers } from "@/lib/data";
import { MarginNote, PaperCard, Pin, Reveal, SectionHead, Tape, TornBottom, TornTop } from "./paper";

export default function Board() {
  return (
    <section id="board" aria-label="Categories and freelancers" className="relative scroll-mt-20 bg-paper-2">
      <TornTop className="text-paper" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="The board"
          title={
            <>
              Pinboards for <em className="font-medium">every craft.</em>
            </>
          }
          lede="Eight boards, thousands of verified creators. Find your craft, pin a brief, and watch the right people answer."
        />

        {/* corkboard */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 rounded-[8px] border-[10px] border-[#8a6f4d] shadow-lift">
            <div className="rounded-[2px] bg-[#cfa96f] p-5 sm:p-8" style={{ backgroundImage: "radial-gradient(rgb(0 0 0 / 0.08) 1.2px, transparent 1.2px)", backgroundSize: "18px 18px" }}>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((c, i) => (
                  <Reveal key={c.name} delay={i * 0.05}>
                    <div
                      className="paper-tex relative rounded-[3px] bg-card p-5 shadow-lift"
                      style={{ transform: `rotate(${c.tilt})` }}
                    >
                      <Pin className="absolute -top-3 left-1/2 -translate-x-1/2" />
                      <p className="mt-2 font-display text-[1.25rem] font-bold tracking-tight">{c.name}</p>
                      <ul className="mt-2.5 space-y-1">
                        {c.gigs.map((g) => (
                          <li key={g} className="flex items-center gap-2 text-[0.92rem] text-ink-soft">
                            <span aria-hidden="true" className="text-ember">›</span> {g}
                          </li>
                        ))}
                      </ul>
                      <p className="tnum mt-3 border-t border-dashed border-line pt-2.5 text-[0.85rem] font-bold text-ink-faint">
                        from {c.from}*
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="mt-6 text-center text-[0.8rem] font-medium text-[#5d4a2e]">
                *Illustrative starting prices — every brief gets a custom quote.
              </p>
            </div>
          </div>
        </Reveal>

        {/* specimen cards */}
        <div className="mt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold tracking-tight">
                Fresh faces on the board
              </h3>
              <MarginNote>hover a card — it straightens up, like meeting someone.</MarginNote>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {freelancers.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <PaperCard
                  tilt={i === 1 ? "1.6deg" : "-1.4deg"}
                  className="group h-full p-6 transition-transform duration-300 hover:rotate-0"
                >
                  <Tape className="-top-3 left-8 -rotate-6" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-paper-2 font-display text-[1.4rem] font-bold text-ink-soft">
                      {f.name.charAt(0)}
                    </div>
                    <span className="rounded-full bg-pine/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-pine">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="mt-4 font-display text-[1.35rem] font-bold tracking-tight">{f.name}</p>
                  <p className="text-[0.95rem] text-ink-soft">{f.craft} · {f.city}</p>
                  <p className="tnum mt-1.5 text-[0.9rem] font-semibold">
                    ★ {f.rating} <span className="font-normal text-ink-faint">· {f.projects} projects</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {f.skills.map((s) => (
                      <span key={s} className="rounded-full bg-paper-2 px-3 py-1 text-[0.8rem] font-semibold text-ink-soft">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 border-t border-dashed border-line pt-3 text-[0.95rem] italic leading-relaxed text-ink-soft">
                    “{f.note}”
                  </p>
                  <div className="tnum mt-3 flex items-center justify-between">
                    <span className="text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-ink-faint">Starts at</span>
                    <span className="font-display text-[1.3rem] font-bold">{f.rate}</span>
                  </div>
                </PaperCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-center text-[0.78rem] text-ink-faint">*Illustrative profiles — the real board has 5,000+ creators & teams.</p>
        </div>
      </div>
      <TornBottom className="text-paper" />
    </section>
  );
}
