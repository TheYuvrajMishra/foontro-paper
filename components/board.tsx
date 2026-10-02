import Image from "next/image";
import { categories, services } from "@/lib/data";
import { MarginNote, PaperCard, Pin, Reveal, SectionHead, Tape, TornBottom, TornTop } from "./paper";
import { TiltCard } from "./wild";

const tilts = ["-1.4deg", "1.2deg", "-0.8deg", "1.6deg", "-1.1deg", "0.9deg", "-1.5deg", "1.3deg", "-0.7deg"];

export default function Board() {
  return (
    <section id="board" aria-label="Categories and services" className="relative scroll-mt-20 bg-paper-2">
      <TornTop className="text-paper" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="The board"
          title={
            <>
              Every skill you need. <em className="font-medium">Right here.</em>
            </>
          }
          lede="Top-ordered services from verified talent, ready to hire today. The nine category tiles, straight from foontro.com."
        />

        {/* corkboard */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 rounded-[8px] border-[10px] border-[#8a6f4d] shadow-lift">
            <div className="rounded-[2px] bg-[#cfa96f] p-5 sm:p-8" style={{ backgroundImage: "radial-gradient(rgb(0 0 0 / 0.08) 1.2px, transparent 1.2px)", backgroundSize: "18px 18px" }}>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c, i) => (
                  <Reveal key={c.slug} delay={i * 0.04} className="h-full">
                    <TiltCard max={7} className="h-full">
                      <div
                        className="paper-tex relative h-full rounded-[3px] bg-card p-5 shadow-lift"
                        style={{ transform: `rotate(${tilts[i % tilts.length]})` }}
                      >
                        <Pin className="absolute -top-3 left-1/2 z-10 -translate-x-1/2" />
                        <div className="relative mb-3 overflow-hidden rounded-[2px]">
                          <Image
                            src={c.img}
                            alt={`${c.title} — example work`}
                            width={400}
                            height={300}
                            className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <p className="mt-2 font-sans text-[1.25rem] font-bold tracking-tight">{c.title}</p>
                        <p className="mt-1.5 text-[0.92rem] text-ink-soft">{c.blurb}</p>
                        <p className="mt-3 border-t border-dashed border-line pt-2.5">
                          <span className="text-[0.85rem] font-bold uppercase tracking-[0.12em] text-ember-deep">
                            Explore →
                          </span>
                        </p>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* specimen cards — real trending services */}
        <div className="mt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-sans text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold tracking-tight">
                Trending on the board
              </h3>
              <MarginNote>real public listings — names, taglines &amp; prices from foontro.com.</MarginNote>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08} className="h-full">
                <TiltCard max={8} className="h-full">
                <PaperCard
                  tilt={i === 1 ? "1.6deg" : "-1.4deg"}
                  className="group h-full p-6 transition-transform duration-300 hover:rotate-0"
                >
                  <Tape className="-top-3 left-8 -rotate-6" />
                  <div className="flex items-start justify-between gap-3">
                    <Image
                      src={s.photo}
                      alt={`${s.name} — illustrative portrait, not the real freelancer`}
                      width={112}
                      height={112}
                      className="h-14 w-14 rounded-full object-cover shadow-card"
                    />
                    <span className="rounded-full bg-pine/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-pine">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-[1.35rem] font-bold tracking-tight">{s.name}</p>
                  {s.badge && (
                    <p className="mt-0.5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-ember-deep">
                      {s.badge}
                    </p>
                  )}
                  <p className="mt-2 text-[0.95rem] italic leading-relaxed text-ink-soft">
                    “{s.tagline}”
                  </p>
                  <p className="mt-3 text-[0.85rem] font-semibold text-ink-faint">{s.note}</p>
                  <div className="tnum mt-3 flex items-center justify-between border-t border-dashed border-line pt-3">
                    <span className="text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-ink-faint">Starts at</span>
                    <span className="font-sans text-[1.3rem] font-black text-pine">{s.price}</span>
                  </div>
                </PaperCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-center text-[0.78rem] text-ink-faint">
            Portraits are illustrative stock — the listings themselves are real.
          </p>
        </div>
      </div>
      <TornBottom className="text-paper" />
    </section>
  );
}
