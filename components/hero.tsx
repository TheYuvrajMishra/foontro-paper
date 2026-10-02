"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { briefs, freelancers, REAL, type Brief, type Freelancer } from "@/lib/data";
import { MarginNote, PaperCard, Pin, Reveal, ScribbleCircle, Stamp, Tape } from "./paper";

type Stage = "brief" | "matched" | "sealed" | "paid";

const steps: { id: Stage; label: string }[] = [
  { id: "brief", label: "Pin the brief" },
  { id: "matched", label: "Meet matches" },
  { id: "sealed", label: "Seal escrow" },
  { id: "paid", label: "Stamp paid" },
];

function WaxSeal({ size = 64 }: { size?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-ember shadow-stamp"
    >
      <div className="flex h-[72%] w-[72%] items-center justify-center rounded-full border-2 border-card/50">
        <span className="font-display text-card font-bold" style={{ fontSize: size * 0.34 }}>
          F
        </span>
      </div>
    </div>
  );
}

function Envelope({ sealed }: { sealed: boolean }) {
  return (
    <div className="relative mx-auto h-36 w-56" role="img" aria-label={sealed ? "Sealed escrow envelope" : "Open envelope"}>
      <div className="absolute inset-x-0 bottom-0 top-8 rounded-[6px] bg-kraft shadow-card" />
      <div
        className="absolute inset-x-0 top-8 h-20 bg-[#d9c294]"
        style={{ clipPath: "polygon(0 0, 50% 62%, 100% 0, 100% 100%, 0 100%)", opacity: 0.55 }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-24 origin-top rounded-t-[6px] bg-[#cbb181]"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 78%)" }}
        animate={sealed ? { rotateX: 0 } : { rotateX: -168 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
      />
      <div className="absolute left-1/2 top-[4.2rem] -translate-x-1/2">
        <motion.div
          initial={false}
          animate={sealed ? { scale: 1, rotate: -8 } : { scale: 0.4, opacity: 0.4 }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        >
          <WaxSeal />
        </motion.div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [stage, setStage] = useState<Stage>("brief");
  const [brief, setBrief] = useState<Brief>(briefs[0]);
  const [pro, setPro] = useState<Freelancer | null>(null);
  const reduce = useReducedMotion();
  const stageIdx = steps.findIndex((s) => s.id === stage);

  const reset = () => {
    setPro(null);
    setBrief(briefs[0]);
    setStage("brief");
  };

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
      {/* faint desk doodles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <svg className="absolute left-[6%] top-40 hidden w-40 lg:block" viewBox="0 0 120 60">
          <path d="M6 8 C 40 10, 78 18, 100 44 M100 44 l-14 -3 M100 44 l-2 -14" fill="none" stroke="#a2937a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <p className="absolute right-[7%] top-56 hidden rotate-6 font-hand text-2xl text-ink-faint lg:block">
          no bidding wars, promise
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-pine shadow-card">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ember" />
              India&apos;s curated freelance marketplace
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-[clamp(2.9rem,8.5vw,6.2rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
              Every deal,
              <br />
              <em className="font-medium">
                <ScribbleCircle>on paper.</ScribbleCircle>
              </em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-ink-soft">
              Foontro matches you with verified freelancers, holds your money in escrow,
              and releases it only when you approve the work. Hiring strangers — minus the gamble.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#cta"
                className="rounded-full bg-ember-deep px-7 py-3.5 text-[1rem] font-bold text-card shadow-stamp transition-transform hover:-translate-y-0.5"
              >
                Post your brief — it&apos;s free
              </a>
              <a
                href="#board"
                className="rounded-full border border-ink/20 bg-card px-7 py-3.5 text-[1rem] font-semibold shadow-card transition-transform hover:-translate-y-0.5"
              >
                Browse the board
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="tnum mt-6 text-[0.85rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
              {REAL.creators} {REAL.creatorsLabel} · escrow on every order
            </p>
          </Reveal>
        </div>

        {/* ————— THE DEAL DESK : signature moment ————— */}
        <Reveal delay={0.1} className="mt-16">
          <div className="relative mx-auto max-w-4xl">
            <Tape className="-top-3 left-10 -rotate-6" />
            <Tape tone="tape-blue" className="-top-3 right-12 rotate-3" />
            <PaperCard className="relative px-5 py-8 sm:px-10 sm:py-10">
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
                  The deal desk
                </p>
                <p className="rounded-full bg-paper-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Interactive demo · no real money moves
                </p>
              </div>
              <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.2rem)] font-semibold tracking-tight">
                Try a whole deal in 20 seconds.
              </h2>

              {/* progress */}
              <ol className="mt-6 flex flex-wrap items-center gap-2" aria-label="Deal progress">
                {steps.map((s, i) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span
                      aria-current={i === stageIdx ? "step" : undefined}
                      className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.82rem] font-bold ${
                        i <= stageIdx ? "bg-ink text-paper" : "bg-paper-2 text-ink-faint"
                      }`}
                    >
                      <span className="tnum">{i + 1}</span> {s.label}
                    </span>
                    {i < steps.length - 1 && (
                      <span aria-hidden="true" className="text-ink-faint">→</span>
                    )}
                  </li>
                ))}
              </ol>

              <div className="relative mt-8 min-h-[380px] sm:min-h-[340px]">
                <AnimatePresence mode="wait">
                  {stage === "brief" && (
                    <motion.div
                      key="brief"
                      initial={reduce ? {} : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? {} : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="font-hand text-2xl text-ink-soft">pick a brief to pin ↓</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3" role="group" aria-label="Choose a brief">
                        {briefs.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setBrief(b)}
                            aria-pressed={brief.id === b.id}
                            className={`rounded-[4px] border-2 p-4 text-left shadow-card transition-all hover:-translate-y-1 ${
                              brief.id === b.id
                                ? "border-ember bg-card"
                                : "border-transparent bg-paper-2/60"
                            }`}
                          >
                            <p className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-ember-deep">
                              {b.label}
                            </p>
                            <p className="mt-1.5 font-display text-[1.05rem] font-semibold leading-snug">
                              {b.title}
                            </p>
                            <p className="tnum mt-2 text-[0.9rem] font-bold">{b.budget}</p>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStage("matched")}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper shadow-card transition-transform hover:-translate-y-0.5"
                      >
                        <Pin className="h-5 w-5" /> Pin the brief
                      </button>
                    </motion.div>
                  )}

                  {stage === "matched" && (
                    <motion.div
                      key="matched"
                      initial={reduce ? {} : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? {} : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-start gap-3 rounded-[4px] border-l-4 border-ember bg-paper-2/70 p-4">
                        <Pin className="mt-0.5 h-6 w-6 shrink-0" />
                        <div>
                          <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-ember-deep">
                            Pinned brief
                          </p>
                          <p className="font-display text-[1.1rem] font-semibold">{brief.title}</p>
                          <p className="text-[0.92rem] text-ink-soft">{brief.blurb}</p>
                        </div>
                        <p className="tnum ml-auto shrink-0 font-display text-[1.3rem] font-bold">{brief.budget}</p>
                      </div>
                      <p className="mt-5 font-hand text-2xl text-ink-soft">
                        3 verified freelancers answered — pick yours
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-3">
                        {freelancers.map((f, i) => (
                          <motion.div
                            key={f.name}
                            initial={reduce ? {} : { opacity: 0, y: 26, rotate: i % 2 ? 2 : -2 }}
                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                            transition={{ delay: 0.12 + i * 0.1, type: "spring", stiffness: 220, damping: 20 }}
                            className="paper-tex rounded-[4px] bg-card p-4 shadow-card"
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-display text-[1.05rem] font-bold">{f.name}</p>
                              <span className="rounded-full bg-pine/10 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-pine">
                                ✓ Verified
                              </span>
                            </div>
                            <p className="text-[0.88rem] text-ink-soft">
                              {f.craft} · {f.city}
                            </p>
                            <p className="tnum mt-1 text-[0.85rem] font-semibold text-ink-faint">
                              ★ {f.rating} · {f.projects} projects
                            </p>
                            <p className="mt-2 text-[0.88rem] italic text-ink-soft">“{f.note}”</p>
                            <button
                              type="button"
                              onClick={() => {
                                setPro(f);
                                setStage("sealed");
                              }}
                              className="mt-3 w-full rounded-full bg-paper-2 px-4 py-2.5 text-[0.92rem] font-bold transition-colors hover:bg-ink hover:text-paper"
                            >
                              Hire {f.name.split(" ")[0]}
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {stage === "sealed" && pro && (
                    <motion.div
                      key="sealed"
                      initial={reduce ? {} : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? {} : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center text-center"
                    >
                      <Envelope sealed />
                      <motion.div
                        initial={reduce ? {} : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 15 }}
                        className="mt-2"
                      >
                        <Stamp>{brief.budget} sealed</Stamp>
                      </motion.div>
                      <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink-soft">
                        <strong className="text-ink">{pro.name}</strong> can see the money is real
                        and starts work. You hold the only key — your approval.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStage("paid")}
                        className="mt-6 rounded-full bg-ember-deep px-7 py-3 font-bold text-card shadow-stamp transition-transform hover:-translate-y-0.5"
                      >
                        Approve the work
                      </button>
                    </motion.div>
                  )}

                  {stage === "paid" && pro && (
                    <motion.div
                      key="paid"
                      initial={reduce ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduce ? {} : { opacity: 0 }}
                      className="flex flex-col items-center py-6 text-center"
                    >
                      <motion.div
                        initial={reduce ? { scale: 1, rotate: -7 } : { scale: 2.6, rotate: -24, opacity: 0 }}
                        animate={{ scale: 1, rotate: -7, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 320, damping: 13 }}
                      >
                        <span className="stamp text-[2rem] text-pine-deep">Paid</span>
                      </motion.div>
                      <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
                        <strong className="text-ink">{brief.budget}</strong> released to{" "}
                        <strong className="text-ink">{pro.name}</strong>. The brief, the escrow,
                        the approval — one clean paper trail.
                      </p>
                      <button
                        type="button"
                        onClick={reset}
                        className="mt-6 rounded-full border border-ink/20 bg-card px-6 py-3 font-semibold shadow-card transition-transform hover:-translate-y-0.5"
                      >
                        ↺ Run it again
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MarginNote className="mt-4 text-right">
                this is the whole product, really — pin, seal, stamp.
              </MarginNote>
            </PaperCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
