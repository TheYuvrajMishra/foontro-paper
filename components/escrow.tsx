"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { MarginNote, Reveal, Stamp, TornBottom, TornTop } from "./paper";

const captions = [
  "Sealed — your money waits inside.",
  "The seal breaks…",
  "Released — approved by you.",
];

function VaultEnvelope() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [cap, setCap] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const flap = useTransform(scrollYProgress, [0.12, 0.45], [0, -168]);
  const sealScale = useTransform(scrollYProgress, [0.28, 0.42], [1, 0]);
  const sealRotate = useTransform(scrollYProgress, [0.28, 0.42], [-8, -40]);
  const letterY = useTransform(scrollYProgress, [0.45, 0.78], [70, -46]);
  const letterO = useTransform(scrollYProgress, [0.45, 0.58], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCap(v < 0.3 ? 0 : v < 0.55 ? 1 : 2);
  });

  if (reduce) {
    return (
      <div className="flex flex-col items-center gap-6 py-10">
        <OpenEnvelopeStatic />
        <p className="font-hand text-3xl text-paper/90">{captions[2]}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <div className="relative" style={{ width: 340, height: 250 }}>
          {/* letter sliding out */}
          <motion.div
            style={{ y: letterY, opacity: letterO }}
            className="paper-tex absolute left-1/2 top-6 z-10 w-64 -translate-x-1/2 rounded-[4px] bg-card p-5 text-center shadow-lift"
          >
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-pine">Escrow release</p>
            <p className="tnum mt-2 font-display text-[2rem] font-bold text-ink">₹4,500</p>
            <p className="mt-1 text-[0.9rem] text-ink-soft">to Ananya S. — approved by you</p>
            <p className="mt-3 inline-block rounded-full bg-pine/10 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-pine">
              ✓ Released
            </p>
          </motion.div>

          {/* envelope body */}
          <div className="absolute inset-x-0 bottom-0 top-16 rounded-[8px] bg-kraft shadow-lift" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 top-16 rounded-[8px] bg-[#d9c294] opacity-60"
            style={{ clipPath: "polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)" }}
          />
          {/* flap */}
          <motion.div
            aria-hidden="true"
            style={{ rotateX: flap }}
            className="absolute inset-x-0 top-16 h-32 origin-top bg-[#c8ab74]"
          >
            <div className="h-full w-full" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" , background: "#c8ab74"}} />
          </motion.div>
          {/* wax seal */}
          <motion.div style={{ scale: sealScale, rotate: sealRotate }} className="absolute left-1/2 top-40 z-20 -translate-x-1/2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ember shadow-stamp">
              <div className="flex h-[70%] w-[70%] items-center justify-center rounded-full border-2 border-card/50">
                <span className="font-display text-2xl font-bold text-card">F</span>
              </div>
            </div>
          </motion.div>
        </div>

        <p aria-live="polite" className="mt-10 min-h-[3rem] text-center font-hand text-[2rem] text-paper/90">
          {captions[cap]}
        </p>
        <p className="mt-2 text-[0.8rem] uppercase tracking-[0.2em] text-paper/40">
          Keep scrolling — the seal only breaks for you
        </p>
      </div>
    </div>
  );
}

function OpenEnvelopeStatic() {
  return (
    <div className="paper-tex w-64 rounded-[4px] bg-card p-5 text-center shadow-lift" role="img" aria-label="Released escrow note">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-pine">Escrow release</p>
      <p className="tnum mt-2 font-display text-[2rem] font-bold text-ink">₹4,500</p>
      <p className="mt-1 text-[0.9rem] text-ink-soft">to Ananya S. — approved by you</p>
    </div>
  );
}

const rules = [
  {
    t: "Paid upfront, held by Foontro",
    c: "You pay when you order. The freelancer can't touch it — but they can see it's real.",
  },
  {
    t: "Work starts on proof of funds",
    c: "No more 'do the work, we'll pay later'. The money is already on the table, sealed.",
  },
  {
    t: "Released only on your approval",
    c: "Revisions happen first if needed. Your stamp is the only key to the envelope.",
  },
];

export default function Escrow() {
  return (
    <section id="escrow" aria-label="Escrow protection" className="relative bg-ink text-paper">
      <TornTop className="text-paper" />
      <div className="mx-auto max-w-6xl px-5 pt-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ember">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-ember/60" />
              Escrow, explained
              <span aria-hidden="true" className="inline-block h-px w-8 bg-ember/60" />
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(2rem,5.2vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
              The sealed-envelope <em className="font-medium text-ember">rule.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-paper/70">
              Every Foontro order works the same way: your payment goes into a sealed
              envelope before work begins — and only your approval breaks the seal.
            </p>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="flex flex-col gap-5 pt-4 lg:sticky lg:top-28">
            {rules.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.08}>
                <div className="rounded-[4px] border border-paper/15 bg-paper/5 p-5">
                  <p className="flex items-center gap-3 font-display text-[1.15rem] font-semibold">
                    <span className="tnum flex h-8 w-8 items-center justify-center rounded-full bg-ember text-[0.9rem] font-bold text-card">
                      {i + 1}
                    </span>
                    {r.t}
                  </p>
                  <p className="mt-2 pl-11 text-[0.95rem] leading-relaxed text-paper/65">{r.c}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <div className="pl-1">
                <Stamp color="text-ember">No approval · no payout</Stamp>
              </div>
            </Reveal>
          </div>
          <VaultEnvelope />
        </div>

        <MarginNote className="pb-16 text-center text-paper/50">
          psst — freelancers love this part too. guaranteed money &gt; promises.
        </MarginNote>
      </div>
      <TornBottom className="text-paper" />
    </section>
  );
}
