import Image from "next/image";
import { MarginNote, Reveal, Stamp, TornTop } from "./paper";

export default function Finale() {
  return (
    <>
      <section id="cta" aria-label="Get started" className="relative scroll-mt-20 overflow-hidden bg-ember text-ink">
        <TornTop className="text-ember" />
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-24 text-center">
          <Reveal>
            <div className="inline-block">
              <Stamp color="text-ink" className="text-[0.8rem]">The last fold</Stamp>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
              Ready to put it <em className="font-medium">on paper?</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-[1.1rem] font-medium leading-relaxed text-ink/80">
              Pin your first brief today. Meet verified freelancers tomorrow.
              Pay only when you&apos;d proudly stamp it.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col items-center gap-4">
              <a
                href="#top"
                className="rounded-full bg-ink px-10 py-4.5 text-[1.1rem] font-bold text-paper shadow-lift transition-transform hover:-translate-y-1 hover:rotate-[-1deg]"
                style={{ paddingTop: "1.1rem", paddingBottom: "1.1rem" }}
              >
                Post your first brief
              </a>
              <p className="text-[0.85rem] font-bold uppercase tracking-[0.16em] text-ink/70">
                Free to post · Money moves only when you approve
              </p>
            </div>
          </Reveal>
          <MarginNote className="mt-10 text-ink/70">
            worst case? you get three great portfolios in your inbox.
          </MarginNote>
        </div>
      </section>

      <footer className="relative bg-ink text-paper">
        <TornTop className="text-ember" />
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-10">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <a href="#top" className="flex items-center gap-2.5" aria-label="Foontro home">
                <Image src="/foontro-logo.svg" alt="" width={34} height={34} className="h-8 w-8" />
                <span className="font-display text-[1.5rem] font-bold tracking-tight">Foontro</span>
              </a>
              <p className="mt-4 max-w-xs leading-relaxed text-paper/60">
                India&apos;s curated freelance marketplace. Verified freelancers,
                escrow on every order, approval on every payout.
              </p>
              <p className="mt-4 inline-block rounded-full border border-paper/20 px-4 py-1.5 text-[0.8rem] font-semibold text-paper/70">
                Get it on Google Play
              </p>
            </div>
            {[
              { h: "Marketplace", links: ["Browse the board", "Post a brief", "For freelancers", "Login streaks"] },
              { h: "Company", links: ["About", "Careers", "Press kit", "Brand"] },
              { h: "Support", links: ["Help desk", "Trust & safety", "Escrow explained", "Contact"] },
            ].map((col) => (
              <nav key={col.h} aria-label={col.h}>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-paper/40">{col.h}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#top" className="text-paper/70 transition-colors hover:text-paper">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-paper/15 pt-7 text-[0.85rem] text-paper/45 sm:flex-row">
            <p>© 2026 Foontro. Concept redesign — every deal, on paper.</p>
            <p className="font-hand text-[1.2rem] text-paper/55">made with paper cuts in india ✂</p>
          </div>
        </div>
      </footer>
    </>
  );
}
