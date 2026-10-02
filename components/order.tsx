"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { demoChat, realFlow, services, type Service } from "@/lib/data";
import {
  MarginNote, PaperCard, Reveal, SectionHead, Stamp, Tape, TornBottom, TornTop,
} from "./paper";

function PaperBurst() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const bits = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/3 block"
          style={{
            width: 10 + (i % 3) * 6,
            height: 7 + (i % 2) * 5,
            background: ["#f36938", "#2f5d46", "#e4d3ac", "#c9962e"][i % 4],
          }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: (i % 2 ? 1 : -1) * (60 + ((i * 53) % 140)),
            y: -40 - ((i * 37) % 160),
            rotate: (i % 2 ? 1 : -1) * (180 + i * 40),
            opacity: 0,
          }}
          transition={{ duration: 1.1, delay: 0.45 + (i % 5) * 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

function ServiceCard({
  s, selected, onSelect,
}: {
  s: Service; selected: boolean; onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`w-full rounded-[4px] border-2 p-3 text-left transition-all ${
        selected ? "border-ember-deep bg-card shadow-lift" : "border-line bg-paper-2/60 hover:border-ink/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <Image
          src={s.photo}
          alt=""
          width={96}
          height={96}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 text-[0.95rem] font-bold">
            {s.name}
            {s.badge && (
              <span className="rounded-full bg-ember/15 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-ember-deep">
                {s.badge}
              </span>
            )}
          </p>
          <p className="mt-0.5 line-clamp-1 text-[0.85rem] text-ink-soft">{s.tagline}</p>
        </div>
        <p className="tnum shrink-0 font-sans text-[1.15rem] font-black text-pine">{s.price}</p>
      </div>
    </button>
  );
}

export default function Order() {
  const [service, setService] = useState<Service>(services[0]);
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const reduce = useReducedMotion();

  const reset = () => {
    setStage(0);
    setService(services[0]);
  };

  return (
    <section id="order" aria-label="Start an order" className="relative scroll-mt-20 bg-paper">
      <TornTop className="text-paper-2" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="Start an order"
          title={
            <>
              No brief queue. <em className="font-medium">Just order.</em>
            </>
          }
          lede="Foontro skips the whole post-a-brief song and dance — you browse verified services and order directly. Try the real flow below: pick a trending service, place the order, watch escrow seal it."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ——— the order machine ——— */}
          <Reveal>
            <div className="relative">
              <Tape className="-top-3 left-10 -rotate-6" />
              <Tape tone="tape-blue" className="-top-3 right-12 rotate-3" />
              <PaperCard className="relative overflow-hidden px-5 py-8 sm:px-8">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
                    The order machine
                  </p>
                  <p className="rounded-full bg-paper-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Interactive demo
                  </p>
                </div>

                {/* stage stepper */}
                <ol className="mt-4 flex gap-1.5" aria-label="Order progress">
                  {["Browse", "Order", "Chat", "Paid"].map((s, i) => (
                    <li
                      key={s}
                      aria-current={stage === i ? "step" : undefined}
                      className={`flex-1 rounded-full py-1.5 text-center text-[0.72rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                        stage >= i ? "bg-ink text-paper" : "bg-paper-2 text-ink-faint"
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ol>

                <div className="relative mt-6 min-h-[430px]" aria-live="polite">
                  <AnimatePresence mode="wait">
                    {stage === 0 && (
                      <motion.div
                        key="browse"
                        initial={reduce ? {} : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? {} : { opacity: 0, y: -14 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="font-hand text-[1.6rem] text-ink-soft" id="pick-service">
                          pick a trending service
                        </p>
                        <div className="mt-3 flex flex-col gap-2.5" role="radiogroup" aria-labelledby="pick-service">
                          {services.map((s) => (
                            <ServiceCard key={s.id} s={s} selected={service.id === s.id} onSelect={() => setService(s)} />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setStage(1)}
                          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember-deep px-7 py-4 text-[1.05rem] font-bold text-card shadow-stamp transition-transform hover:-translate-y-0.5"
                        >
                          Order {service.name.split(" ")[0]}&apos;s service · {service.price}
                        </button>
                        <p className="mt-3 text-center text-[0.82rem] text-ink-faint">
                          Names, taglines and prices are real public listings · photos illustrative
                        </p>
                      </motion.div>
                    )}

                    {stage === 1 && (
                      <motion.div
                        key="order"
                        initial={reduce ? {} : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? {} : { opacity: 0, y: -14 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center py-6 text-center"
                      >
                        <div className="paper-tex w-full max-w-sm rounded-[4px] bg-card p-5 text-left shadow-lift">
                          <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ember-deep">
                            Order summary
                          </p>
                          <p className="mt-2 font-sans text-[1.05rem] font-bold leading-snug">{service.tagline}</p>
                          <div className="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3">
                            <span className="text-[0.9rem] text-ink-soft">by {service.name}</span>
                            <span className="tnum font-sans text-[1.3rem] font-black">{service.price}</span>
                          </div>
                          <p className="mt-3 rounded-[4px] bg-pine/10 p-3 text-[0.88rem] leading-relaxed text-pine">
                            🔒 Your {service.price} goes into Foontro escrow — it does{" "}
                            <strong>not</strong> reach the freelancer yet.
                          </p>
                        </div>
                        <div className="mt-5 flex flex-wrap justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => setStage(0)}
                            className="rounded-full border border-ink/20 bg-card px-6 py-3 text-[0.95rem] font-semibold shadow-card"
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={() => setStage(2)}
                            className="rounded-full bg-ink px-7 py-3 text-[0.95rem] font-bold text-paper shadow-card transition-transform hover:-translate-y-0.5"
                          >
                            Place order · seal it in escrow
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {stage === 2 && (
                      <motion.div
                        key="chat"
                        initial={reduce ? {} : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? {} : { opacity: 0, y: -14 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                      >
                        <motion.div
                          initial={reduce ? { scale: 1, rotate: -7, opacity: 1 } : { scale: 2.2, rotate: -20, opacity: 0 }}
                          animate={{ scale: 1, rotate: -7, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 320, damping: 13 }}
                        >
                          <Stamp className="text-[1rem]">Escrow sealed</Stamp>
                        </motion.div>
                        <div className="mt-5 w-full max-w-sm rounded-[4px] border border-line bg-card p-4 shadow-card">
                          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
                            Chat thread · demo dialogue
                          </p>
                          <div className="flex flex-col gap-2">
                            {demoChat.map((m, i) => (
                              <motion.p
                                key={i}
                                initial={reduce ? {} : { opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: reduce ? 0 : 0.25 + i * 0.35 }}
                                className={`max-w-[85%] rounded-[4px] px-3 py-2 text-[0.9rem] leading-snug ${
                                  m.from === "client"
                                    ? "self-end bg-ink text-paper"
                                    : m.from === "system"
                                      ? "self-center bg-paper-2 text-center text-[0.78rem] text-ink-soft"
                                      : "self-start bg-paper-2"
                                }`}
                              >
                                {m.text}
                              </motion.p>
                            ))}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStage(3)}
                          className="mt-6 rounded-full bg-pine px-8 py-3.5 text-[1rem] font-bold text-card shadow-stamp transition-transform hover:-translate-y-0.5"
                        >
                          Approve &amp; pay · release {service.price}
                        </button>
                      </motion.div>
                    )}

                    {stage === 3 && (
                      <motion.div
                        key="paid"
                        initial={reduce ? {} : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative flex flex-col items-center py-8 text-center"
                      >
                        <PaperBurst />
                        <motion.div
                          initial={reduce ? { scale: 1, rotate: -8, opacity: 1 } : { scale: 2.6, rotate: -24, opacity: 0 }}
                          animate={{ scale: 1, rotate: -8, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 12 }}
                        >
                          <Stamp className="text-[2rem]">Paid</Stamp>
                        </motion.div>
                        <p className="mt-6 max-w-xs font-hand text-[1.6rem] leading-snug text-ink-soft">
                          {service.price} released to {service.name.split(" ")[0]} — the real Foontro flow, start to finish.
                        </p>
                        <button
                          type="button"
                          onClick={reset}
                          className="mt-6 rounded-full border border-ink/20 bg-card px-6 py-2.5 text-[0.92rem] font-semibold shadow-card transition-transform hover:-translate-y-0.5"
                        >
                          ↺ Order another
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </PaperCard>
            </div>
          </Reveal>

          {/* ——— the official flow ——— */}
          <div>
            <Reveal>
              <div className="relative rotate-2 bg-card p-3 pb-10 shadow-lift">
                <Tape tone="tape-rose" className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
                <Image
                  src="/img/brief.jpg"
                  alt="A hand writing project notes in a notebook"
                  width={640}
                  height={420}
                  className="aspect-[3/2] w-full rounded-[2px] object-cover"
                />
                <p className="mt-2.5 text-center font-hand text-[1.35rem] leading-none text-ink-soft">
                  step zero: know what you need
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mt-8 font-sans text-[1.5rem] font-extrabold tracking-tight">
                The official Foontro flow
              </h3>
              <p className="mt-1 text-[0.92rem] text-ink-soft">
                Word-for-word from foontro.com — four steps, no fine print.
              </p>
            </Reveal>
            <ol className="mt-5 flex flex-col gap-3">
              {realFlow.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <li className="flex gap-4 rounded-[4px] border border-line bg-card p-4 shadow-card">
                    <span className="tnum font-sans text-[1.7rem] font-black leading-none text-line">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-bold">{s.title}</p>
                      <p className="mt-0.5 text-[0.93rem] leading-relaxed text-ink-soft">{s.copy}</p>
                      <p className="mt-1.5 flex flex-wrap gap-1.5">
                        {s.points.map((p) => (
                          <span key={p} className="rounded-full bg-paper-2 px-2.5 py-0.5 text-[0.75rem] font-semibold text-ink-soft">
                            {p}
                          </span>
                        ))}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <MarginNote className="mt-6">
              this is the spine everything else hangs on.
            </MarginNote>
          </div>
        </div>
      </div>
      <TornBottom className="text-paper" />
    </section>
  );
}
