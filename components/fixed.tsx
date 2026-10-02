import { valueProps } from "@/lib/data";
import { PaperCard, Pin, Reveal, SectionHead, TornTop } from "./paper";

/* "We didn't build another freelance platform. WE FIXED ONE."
   Exact copy from foontro.com, pinned as four red-inked index cards. */
export default function Fixed() {
  return (
    <section id="fixed" aria-label="Why Foontro" className="relative scroll-mt-20 bg-paper">
      <TornTop className="text-ink" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="Why Foontro"
          title={
            <>
              We didn&apos;t build another freelance platform.{" "}
              <em className="font-medium">
                <span className="relative inline-block">
                  WE FIXED ONE.
                  <svg aria-hidden="true" viewBox="0 0 220 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-ember">
                    <path d="M3 10 C 60 4, 150 4, 217 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </em>
            </>
          }
          lede={valueProps.sub}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="h-full">
              <PaperCard tilt={i % 2 ? "1.4deg" : "-1.4deg"} className="relative h-full p-6">
                <Pin className="absolute -top-3 left-1/2 -translate-x-1/2" />
                <p className="tnum font-sans text-[2rem] font-black text-ember/25">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-sans text-[1.2rem] font-extrabold leading-snug tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{c.copy}</p>
              </PaperCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-hand text-[1.5rem] leading-snug text-ink-soft">
            “Neither side can be cheated. This is the foundation on which the entire
            platform is built.” — foontro.com
          </p>
        </Reveal>
      </div>
    </section>
  );
}
