import { realFlow } from "@/lib/data";
import { DoodleArrow, PaperCard, Pin, Reveal, SectionHead, TornBottom, TornTop } from "./paper";

export default function How() {
  return (
    <section id="how" aria-label="How Foontro works" className="relative scroll-mt-20 bg-paper">
      <TornTop className="text-paper-2" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="How it works"
          title={
            <>
              From browse to <em className="font-medium">paid</em> in four folds.
            </>
          }
          lede="The official Foontro flow, word-for-word from foontro.com. No bidding wars, no ghosting, no &ldquo;please release the payment&rdquo; DMs."
        />

        <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {realFlow.map((s, i) => (
            <div key={s.n} className="relative">
              <Reveal delay={i * 0.09}>
                <PaperCard tilt={i % 2 ? "1.2deg" : "-1.2deg"} className="h-full p-6">
                  <div className="flex items-start justify-between">
                    <span className="tnum font-sans text-[2.2rem] font-black text-line">
                      {s.n}
                    </span>
                    <Pin className="-mt-8" />
                  </div>
                  <h3 className="mt-2 font-sans text-[1.35rem] font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{s.copy}</p>
                  <ul className="mt-3 flex flex-col gap-1">
                    {s.points.map((p) => (
                      <li key={p} className="text-[0.85rem] font-semibold text-pine">
                        ✓ {p}
                      </li>
                    ))}
                  </ul>
                </PaperCard>
              </Reveal>
              {i < realFlow.length - 1 && (
                <DoodleArrow
                  flip={i % 2 === 1}
                  className="absolute -right-4 top-1/2 z-10 hidden w-16 -translate-y-1/2 lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <TornBottom className="text-ink" />
    </section>
  );
}
