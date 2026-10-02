"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { demoLedger } from "@/lib/data";
import { MarginNote, PaperCard, Reveal, SectionHead, Stamp, Tape, TornBottom, TornTop } from "./paper";

const stateStyle: Record<string, string> = {
  released: "bg-pine/10 text-pine",
  sealed: "bg-ember/10 text-ember-deep",
};

/* Real testimonial attributions from foontro.com (video testimonials —
   no text quotes exist on the site, so we show the faces, not fake words). */
const testimonials = [
  { name: "Rakhi Pal", role: "Co-Founder, Beep", note: "Video story on foontro.com" },
  { name: "Madhosh Muskan", role: "Marketing Manager", note: "Video story on foontro.com" },
];

/* Demo streak tiers — the mechanic (metallic frames + search visibility) is real. */
const streakTiers = [
  { days: 7, frame: "Bronze", note: "First metallic frame" },
  { days: 15, frame: "Silver", note: "Search visibility boost" },
  { days: 30, frame: "Gold", note: "Top of the board energy" },
];

function StreakCard() {
  const [stamped, setStamped] = useState(12);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <PaperCard tilt="1.5deg" className="relative p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          My streak card · demo
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
        {stamped >= 30 ? "Card full — gold frame earned" : "Stamp today's login"}
      </button>
      <p className="mt-3 text-center text-[0.8rem] text-ink-faint">
        Tier names &amp; counts are illustrative — the mechanic is real.
      </p>
    </PaperCard>
  );
}

export default function Voices() {
  return (
    <section aria-label="Proof, paper trail and streaks" className="relative bg-paper">
      <TornTop className="text-paper" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="Social proof"
          title={
            <>
              What people <em className="font-medium">actually say.</em>
            </>
          }
          lede="Foontro's testimonials are video stories, not pull-quotes — so here are the faces, with zero invented words in their mouths."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="paper-tex relative flex items-center gap-5 rounded-[4px] bg-card p-6 shadow-card">
                <Tape className="-top-3 left-8 -rotate-6" />
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[1.4rem] font-bold text-paper">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-sans text-[1.2rem] font-bold tracking-tight">{t.name}</p>
                  <p className="text-[0.92rem] text-ink-soft">{t.role}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-ember-deep">
                    <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-ember/15 text-[0.7rem]">▶</span>
                    {t.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* paper trail */}
        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal>
            <h3 className="text-center font-sans text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold tracking-tight">
              Every rupee leaves <em className="font-medium">a trail.</em>
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-center text-[0.95rem] text-ink-soft">
              A peek at how money moves on Foontro — sealed, approved, released.
            </p>
          </Reveal>
          <ol className="mt-8 flex flex-col gap-3">
            {demoLedger.map((row, i) => (
              <Reveal key={row.id} delay={i * 0.05}>
                <li className="paper-tex flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[4px] bg-card px-5 py-4 shadow-card">
                  <span className="tnum text-[0.8rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                    #{row.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{row.label}</span>
                    <span className="block text-[0.88rem] text-ink-soft">demo transaction</span>
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.1em] ${stateStyle[row.state]}`}>
                    {row.state === "sealed" ? "In escrow" : "Released"}
                  </span>
                  <span className="tnum font-sans text-[1.25rem] font-bold">{row.amount}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="mt-3 text-center text-[0.78rem] text-ink-faint">
            *Sample trail — amounts &amp; IDs illustrative, the mechanics are real.
          </p>
        </div>

        {/* the wall */}
        <Reveal className="mt-16">
          <div className="relative mx-auto max-w-4xl rotate-1 bg-card p-4 pb-14 shadow-lift">
            <Tape tone="tape-blue" className="-top-3 right-10 rotate-6" />
            <Image
              src="/img/community.jpg"
              alt="Freelancers collaborating around a wall of sticky notes"
              width={1200}
              height={600}
              className="aspect-[2/1] w-full rounded-[2px] object-cover"
            />
            <p className="mt-3 text-center font-hand text-[1.6rem] text-ink-soft">
              the wall where orders become portfolios
            </p>
          </div>
        </Reveal>

        {/* streaks */}
        <div className="mt-24 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-pine">
                Login streaks — live now
              </p>
              <h3 className="mt-4 font-sans text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">
                Show up daily.
                <br />
                Get <em className="font-medium">framed</em> for it.
              </h3>
              <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
                Login Streaks are live — earn metallic frames and boost your search
                visibility. Consistency, compounded.
              </p>
            </Reveal>
            <ul className="mt-6 flex flex-col gap-3">
              {streakTiers.map((t, i) => (
                <Reveal key={t.frame} delay={i * 0.07}>
                  <li className="flex items-center gap-4 rounded-[4px] border border-line bg-card px-5 py-3.5 shadow-card">
                    <span className="tnum font-sans text-[1.6rem] font-black text-line">{t.days}</span>
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
