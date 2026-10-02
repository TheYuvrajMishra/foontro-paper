"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { services, REAL, type Service } from "@/lib/data";
import { MarginNote, PaperCard, Reveal, ScribbleCircle, Stamp, Tape } from "./paper";
import { PaperStorm } from "./wild";

type Stage = "browse" | "order" | "sealed" | "paid";

const steps: { id: Stage; label: string }[] = [
  { id: "browse", label: "Pick a service" },
  { id: "order", label: "Place order" },
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
  const [stage, setStage] = useState<Stage>("browse");
  const [service, setService] = useState<Service>(services[0]);
  const reduce = useReducedMotion();
  const stageIdx = steps.findIndex((s) => s.id === stage);

  const reset = () => {
    setService(services[0]);
    setStage("browse");
  };

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
      {/* paper storm — the desk is alive */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <PaperStorm density={34} />
      </div>
      {/* faint desk doodles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <svg className="absolute left-[6%] top-40 hidden w-40 lg:block" viewBox="0 0 120 60">
          <path d="M6 8 C 40 10, 78 18, 100 44 M100 44 l-14 -3 M100 44 l-2 -14" fill="none" stroke="#a2937a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <p className="absolute right-[7%] top-56 hidden rotate-6 font-hand text-2xl text-ink-faint lg:block">
          no bidding wars, promise
        </p>
      </div>

      {/* taped polaroid — a real desk */}
      <div aria-hidden="true" className="absolute right-[2%] top-40 z-10 hidden w-60 xl:block">
        <div
          className="animate-float relative bg-card p-3 pb-12 shadow-lift"
          style={{ "--fl-rot": "4deg" } as React.CSSProperties}
        >
          <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
          <Image
            src="/img/hero.jpg"
            alt=""
            width={480}
            height={320}
            className="h-auto w-full rounded-[2px] object-cover"
          />
          <p className="mt-2.5 text-center font-hand text-[1.35rem] leading-none text-ink-soft">
            a real desk, somewhere in india
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-pine shadow-card">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ember" />
              {REAL.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-sans text-[clamp(3rem,9vw,6.6rem)] font-black leading-[0.95] tracking-[-0.02em]">
              Every deal,
              <br />
              <em className="font-display font-medium italic">
                <ScribbleCircle>on paper.</ScribbleCircle>
              </em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-ink-soft">
              Browse verified services, order in minutes, and pay only when the work is
              right. Your money sits in escrow until you approve — never pay and hope.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#order"
                className="rounded-full bg-ember-deep px-7 py-3.5 text-[1rem] font-bold text-card shadow-stamp transition-transform hover:-translate-y-0.5"
              >
                Browse services
              </a>
              <a
                href="#how"
                className="rounded-full border border-ink/20 bg-card px-7 py-3.5 text-[1rem] font-semibold shadow-card transition-transform hover:-translate-y-0.5"
              >
                See how it works
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="tnum mt-6 text-[0.85rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
              {REAL.creatorsNote} · escrow on every order
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
              <h2 className="font-sans text-[clamp(1.5rem,3.4vw,2.2rem)] font-extrabold tracking-tight">
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
                  {stage === "browse" && (
                    <motion.div
                      key="browse"
                      initial={reduce ? {} : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? {} : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="font-hand text-2xl text-ink-soft">pick a trending service ↓</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3" role="group" aria-label="Choose a service">
                        {services.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setService(s)}
                            aria-pressed={service.id === s.id}
                            className={`rounded-[4px] border-2 p-4 text-left shadow-card transition-all hover:-translate-y-1 ${
                              service.id === s.id
                                ? "border-ember bg-card"
                                : "border-transparent bg-paper-2/60"
                            }`}
                          >
                            {s.badge && (
                              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ember-deep">
                                {s.badge}
                              </p>
                            )}
                            <p className="mt-1 font-sans text-[1.05rem] font-bold leading-snug">
                              {s.name}
                            </p>
                            <p className="mt-1 line-clamp-2 text-[0.88rem] text-ink-soft">{s.tagline}</p>
                            <p className="tnum mt-2 text-[1rem] font-black text-pine">{s.price}</p>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStage("order")}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper shadow-card transition-transform hover:-translate-y-0.5"
                      >
                        Order {service.name.split(" ")[0]}&apos;s service · {service.price}
                      </button>
                      <p className="mt-3 text-[0.82rem] text-ink-faint">
                        Real public listings from foontro.com — names, taglines and prices are real.
                      </p>
                    </motion.div>
                  )}

                  {stage === "order" && (
                    <motion.div
                      key="order"
                      initial={reduce ? {} : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? {} : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="paper-tex w-full max-w-md rounded-[4px] bg-card p-5 text-left shadow-lift">
                        <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ember-deep">
                          Order summary
                        </p>
                        <p className="mt-2 font-sans text-[1.05rem] font-bold leading-snug">{service.tagline}</p>
                        <div className="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3">
                          <span className="text-[0.9rem] text-ink-soft">by {service.name}</span>
                          <span className="tnum font-sans text-[1.3rem] font-black">{service.price}</span>
                        </div>
                      </div>
                      <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink-soft">
                        One tap and your <strong className="text-ink">{service.price}</strong> moves
                        into Foontro escrow. <strong className="text-ink">{service.name.split(" ")[0]}</strong> sees
                        the money is real — and starts work.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStage("sealed")}
                        className="mt-6 rounded-full bg-ember-deep px-7 py-3 font-bold text-card shadow-stamp transition-transform hover:-translate-y-0.5"
                      >
                        Place order · seal it in escrow
                      </button>
                    </motion.div>
                  )}

                  {stage === "sealed" && (
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
                        <Stamp>{service.price} sealed</Stamp>
                      </motion.div>
                      <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink-soft">
                        The freelancer delivers through the platform, you chat and request
                        revisions in one thread. You hold the only key — your approval.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStage("paid")}
                        className="mt-6 rounded-full bg-pine px-7 py-3 font-bold text-card shadow-stamp transition-transform hover:-translate-y-0.5"
                      >
                        Approve &amp; pay
                      </button>
                    </motion.div>
                  )}

                  {stage === "paid" && (
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
                        <strong className="text-ink">{service.price}</strong> released to{" "}
                        <strong className="text-ink">{service.name}</strong>. Browse, order,
                        chat, approve — one clean paper trail.
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
                this is the whole product, really — browse, order, approve.
              </MarginNote>
            </PaperCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
