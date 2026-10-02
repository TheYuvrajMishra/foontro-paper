"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs, fees } from "@/lib/data";
import { PaperCard, Reveal, SectionHead, TornBottom, TornTop } from "./paper";

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="paper-tex overflow-hidden rounded-[4px] bg-card shadow-card">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-[1.12rem] font-semibold tracking-tight">{q}</span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-2 font-display text-[1.3rem] font-bold leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-6 leading-relaxed text-ink-soft">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Money() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" aria-label="Pricing and FAQ" className="relative scroll-mt-20 bg-paper-2">
      <TornTop className="text-paper" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="Money mechanics"
          title={
            <>
              One honest paragraph <em className="font-medium">about money.</em>
            </>
          }
          lede="Posting a brief is free. Browsing and chatting are free. Holding your money in escrow is free. Foontro earns a small platform fee on completed orders — the exact figure is being finalised, so here is the whole table with the gaps labelled, not hidden."
        />

        <Reveal delay={0.1}>
          <PaperCard className="mx-auto mt-12 max-w-2xl p-2">
            <ul className="ruled">
              {fees.map((f) => (
                <li
                  key={f.row}
                  className="flex items-center justify-between gap-4 border-b border-dashed border-line px-6 py-4 last:border-0"
                >
                  <span className="font-medium">{f.row}</span>
                  {f.confirm ? (
                    <span className="rounded-full border-2 border-ink-faint px-3.5 py-1 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-ink-faint">
                      To confirm
                    </span>
                  ) : (
                    <span className="tnum font-display text-[1.2rem] font-bold text-pine">{f.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </PaperCard>
        </Reveal>

        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal>
            <h3 className="text-center font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold tracking-tight">
              Asked at the desk, <em className="font-medium">often.</em>
            </h3>
          </Reveal>
          <div className="mt-8 flex flex-col gap-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <FaqItem
                  q={f.q}
                  a={f.a}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <TornBottom className="text-ember" />
    </section>
  );
}
