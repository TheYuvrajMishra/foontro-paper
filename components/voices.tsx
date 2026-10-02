"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { REAL, ledger, streakTiers } from "@/lib/data";
import { MarginNote, PaperCard, Reveal, SectionHead, Stamp, TornBottom, TornTop } from "./paper";

const stateStyle: Record<string, string> = {
  Released: "bg-pine/10 text-pine",
  "In escrow": "bg-ember/10 text-ember-deep",
  "Revision 2": "bg-gold/15 text-[#8a6a1f]",
};

function StreakCard() {
  const [stamped, setStamped] = useState(12);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <PaperCard tilt="1.5deg" className="relative p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          My streak card
        </p>
        <span className="tnum rounded-full bg-ember/10 px-3 py-1 text-[0.8rem] font-bold text-ember-deep">
          {stamped} / 30 days
        </span>
      </div>
      <div className="mt-5 grid grid-cols-6 gap-2 sm:grid-cols-10" role="img" aria-label={`${stamped} of 30 days stamped`}>
        {days.map((d) => {
          const on = d <= stamped;
          const tier = streakTiers.find((t) => t.days === d);
          return (
            <div key={d} className="relative flex aspect-square items-center justify-center">
              {on ? (
                <motion.div
                  initial={{ scale: 1.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className={`flex h-full w-full items-center justify-center rounded-full border-2 ${
                    tier ? "border-ember bg-ember text-card" : "border-pine/60 bg-pine/10 text-pine"
                  }`}
                >
                  <span className="tnum text-[0.68rem] font-bold">{d}</span>
                </motion.div>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full border border-dashed border-line">
                  <span className="tnum text-[0.68rem] font-medium text-ink-faint">{d}</span>
                </div>
              )}
              {tier && (
                <span className="absolute -bottom-1 rounded-full bg-ink px-1.5 py-px text-[0.55rem] font-bold uppercase tracking-wide text-paper">
                  {tier.frame}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setStamped((s) => Math.min(30, s + 1))}
        disabled={stamped >= 30}
        className="mt-7 w-full rounded-full bg-ink px-6 py-3.5 font-semibold text-paper shadow-card transition-all hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-40 disabled:hover:translate-y-0"
      >
        {stamped >= 30 ? "Card full — gold frame earned" : "Stamp today&apos;s login"}
      </button>
      <p className="mt-3 text-center text-[0.8rem] text-ink-faint">
        Try it — this is exactly how the real Streaks feel.
      </p>
    </PaperCard>
  );
}

export default function Voices() {
  return (
    <section aria-label="Paper trail and streaks" className="relative bg-paper">
      <TornTop className="text-paper-2" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="Paper trail"
          title={
            <>
              Every rupee leaves <em className="font-medium">a trail.</em>
            </>
          }
          lede="A peek at how money actually moves on Foontro — sealed, approved, released. No black boxes, no 'trust me bro'."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <ol className="flex flex-col gap-3">
            {ledger.map((row, i) => (
              <Reveal key={row.id} delay={i * 0.05}>
                <li className="paper-tex flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[4px] bg-card px-5 py-4 shadow-card">
                  <span className="tnum text-[0.8rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                    #{row.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{row.what}</span>
                    <span className="block text-[0.88rem] text-ink-soft">
                      {row.who} · {row.time}
                    </span>
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.1em] ${stateStyle[row.state]}`}>
                    {row.state}
                  </span>
                  <span className="tnum font-display text-[1.25rem] font-bold">{row.amount}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="mt-3 text-center text-[0.78rem] text-ink-faint">
            *Sample trail — amounts illustrative, the mechanics are real.
          </p>
        </div>

        {/* streaks */}
        <div className="mt-24 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-pine">
                Login streaks — live now
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight tracking-tight">
                Show up daily.
                <br />
                Get <em className="font-medium">framed</em> for it.
              </h3>
              <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">{REAL.streaksLine}</p>
            </Reveal>
            <ul className="mt-6 flex flex-col gap-3">
              {streakTiers.map((t, i) => (
                <Reveal key={t.frame} delay={i * 0.07}>
                  <li className="flex items-center gap-4 rounded-[4px] border border-line bg-card px-5 py-3.5 shadow-card">
                    <span className="tnum font-display text-[1.6rem] font-black text-line">{t.days}</span>
                    <div>
                      <p className="font-bold">{t.frame} frame</p>
                      <p className="text-[0.92rem] text-ink-soft">{t.note}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}>
              <div className="mt-6">
                <Stamp className="text-[0.75rem]">Consistency compounds</Stamp>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <StreakCard />
          </Reveal>
        </div>

        <MarginNote className="mt-14 text-center">
          the ledger never lies — that&apos;s the whole point of paper.
        </MarginNote>
      </div>
      <TornBottom className="text-paper-2" />
    </section>
  );
}
