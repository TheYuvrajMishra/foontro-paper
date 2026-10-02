"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/* ——— deterministic jagged edges for torn paper ——— */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function tornPath(seed: number, flip: boolean): string {
  const rnd = mulberry32(seed);
  const W = 1200;
  const H = 26;
  const base = 7;
  let d = flip ? `M0 ${H} L${W} ${H} L${W} ${H - base}` : `M0 0 L${W} 0 L${W} ${base}`;
  const step = 34;
  const xs: number[] = [];
  for (let x = W; x >= 0; x -= step) xs.push(x);
  if (flip) {
    for (const x of xs) d += ` L${x} ${H - base - rnd() * 17}`;
    d += ` L0 ${H - base} Z`;
  } else {
    for (const x of xs) d += ` L${x} ${base + rnd() * 17}`;
    d += ` L0 ${base} Z`;
  }
  return d;
}

const TEAR_TOP = tornPath(7, false);
const TEAR_BOTTOM = tornPath(21, true);

/** Torn transition into a new section. Place as first child; color = previous section bg. */
export function TornTop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative z-10 -mb-px ${className}`}>
      <svg viewBox="0 0 1200 26" preserveAspectRatio="none" className="-mt-[25px] block h-[26px] w-full">
        <path d={TEAR_TOP} fill="currentColor" />
      </svg>
    </div>
  );
}

/** Torn transition out of a section. Place as last child; color = next section bg. */
export function TornBottom({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative z-10 -mt-px ${className}`}>
      <svg viewBox="0 0 1200 26" preserveAspectRatio="none" className="-mb-[25px] block h-[26px] w-full">
        <path d={TEAR_BOTTOM} fill="currentColor" />
      </svg>
    </div>
  );
}

/* ——— washi tape ——— */
export function Tape({
  className = "",
  tone = "",
  style,
}: {
  className?: string;
  tone?: "" | "tape-blue" | "tape-rose";
  style?: React.CSSProperties;
}) {
  return <div aria-hidden="true" className={`tape ${tone} ${className}`} style={style} />;
}

/* ——— push pin ——— */
export function Pin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" aria-hidden="true" className={className} width="26" height="32">
      <ellipse cx="16" cy="37" rx="7" ry="2.4" fill="rgb(34 28 17 / 0.25)" />
      <path d="M16 12 L16 34" stroke="#8a7a5c" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="10" r="9" fill="#b64a22" />
      <circle cx="16" cy="10" r="9" fill="url(#pg)" opacity="0.55" />
      <ellipse cx="12.5" cy="6.5" rx="3.4" ry="2.2" fill="#fff" opacity="0.5" />
      <defs>
        <radialGradient id="pg" cx="0.35" cy="0.3" r="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ——— rubber stamp text ——— */
export function Stamp({
  children,
  className = "",
  color = "text-ember-deep",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <span className={`stamp ${color} ${className}`}>
      <span className="relative">{children}</span>
    </span>
  );
}

/* ——— paper card ——— */
export function PaperCard({
  children,
  className = "",
  tilt = "0deg",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tilt?: string;
  labelledBy?: string;
}) {
  return (
    <div
      aria-labelledby={labelledBy}
      style={{ transform: `rotate(${tilt})` }}
      className={`paper-tex rounded-[4px] bg-card shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

/* ——— section heading: eyebrow + display title + lede ——— */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignCls}`}>
      <Reveal>
        <p
          className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] ${
            dark ? "text-ember" : "text-pine"
          } ${align === "center" ? "justify-center" : ""}`}
        >
          <span aria-hidden="true" className={`inline-block h-px w-8 ${dark ? "bg-ember/60" : "bg-pine/50"}`} />
          {eyebrow}
          <span aria-hidden="true" className={`inline-block h-px w-8 ${dark ? "bg-ember/60" : "bg-pine/50"}`} />
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-[clamp(2rem,5.2vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={0.16}>
          <p className={`max-w-xl text-[1.05rem] leading-relaxed ${dark ? "text-paper/70" : "text-ink-soft"}`}>
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ——— scroll reveal wrapper ——— */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ——— hand-drawn circle around a word ——— */
export function ScribbleCircle({ children }: { children: ReactNode }) {
  return (
    <span className="scribble-circle">
      {children}
      <svg viewBox="0 0 200 90" aria-hidden="true" preserveAspectRatio="none">
        <path
          d="M100 7 C 42 7, 9 24, 11 44 C 13 65, 56 83, 106 81 C 156 79, 191 61, 189 41 C 187 23, 144 9, 97 11"
          fill="none"
          stroke="var(--color-ember)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* ——— hand-drawn arrow ——— */
export function DoodleArrow({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 60"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M6 8 C 40 10, 78 18, 100 44 M100 44 l-14 -3 M100 44 l-2 -14"
        fill="none"
        stroke="var(--color-ink-soft)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ——— handwritten margin note ——— */
export function MarginNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-hand text-[1.35rem] leading-snug text-ink-soft ${className}`}>
      {children}
    </p>
  );
}

/* ——— infinite marquee ——— */
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max gap-4 ${reduce ? "" : "animate-marquee"}`}>
        <div className="flex gap-4 pr-4">{children}</div>
        <div className="flex gap-4 pr-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
