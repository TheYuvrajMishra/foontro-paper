"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { faqs, pricing, escrowQuotes } from "@/lib/data";
import { PaperCard, Pin, Reveal, SectionHead, TornBottom, TornTop } from "./paper";

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
        <span className="font-sans text-[1.12rem] font-semibold tracking-tight">{q}</span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-2 font-sans text-[1.3rem] font-bold leading-none"
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
    <section id="money" aria-label="Pricing and FAQ" className="relative scroll-mt-20 bg-paper-2">
      <TornTop className="text-paper" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="Money mechanics"
          title={
            <>
              Simple pricing, <em className="font-medium">no surprise fees.</em>
            </>
          }
          lede="The real numbers from foontro.com. For clients: browsing and signing up are free — the commission is shown transparently at checkout before you confirm."
        />

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {pricing.freelancerPlans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <PaperCard tilt={i ? "1.2deg" : "-1.2deg"} className="relative h-full p-7">
                {i === 1 && <Pin className="absolute -top-3 left-1/2 -translate-x-1/2" />}
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ember-deep">{p.tag}</p>
                <h3 className="mt-1 font-sans text-[1.7rem] font-extrabold tracking-tight">{p.name}</h3>
                <p className="tnum mt-1 font-sans text-[2.4rem] font-black text-pine">{p.price}</p>
                <ul className="mt-4 space-y-2">
                  {p.rows.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[0.95rem] leading-snug text-ink-soft">
                      <span aria-hidden="true" className="mt-0.5 font-bold text-pine">✓</span> {r}
                    </li>
                  ))}
                </ul>
                {p.footnote && (
                  <p className="mt-4 border-t border-dashed border-line pt-3 text-[0.82rem] text-ink-faint">
                    {p.footnote}
                  </p>
                )}
              </PaperCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-3xl rounded-[4px] border border-line bg-card p-6 shadow-card">
            <p className="text-[0.95rem] leading-relaxed text-ink-soft">{pricing.clientNote}</p>
            <p className="mt-3 border-t border-dashed border-line pt-3 text-[0.9rem] leading-relaxed text-ink-soft">
              <strong className="text-ink">Payments:</strong> {escrowQuotes.methods}
            </p>
          </div>
        </Reveal>

        <div id="faq" className="mx-auto mt-20 max-w-3xl scroll-mt-24">
          <Reveal>
            <h3 className="text-center font-sans text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold tracking-tight">
              You asked. <em className="font-medium">We answered.</em>
            </h3>
            <p className="mt-2 text-center text-[0.92rem] text-ink-soft">
              The questions everyone asks — answered with the site&apos;s own words.
            </p>
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
