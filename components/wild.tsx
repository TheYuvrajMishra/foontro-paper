"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/* ————————————————————————————————————————————————
   PAPER STORM — ambient canvas: drifting paper scraps
   with pointer repulsion. 60fps, transform-only draws,
   paused when hidden, off on reduced-motion / touch.
———————————————————————————————————————————————— */
export function PaperStorm({ density = 44 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#fdfaf1", "#e4d3ac", "#f36938", "#2f5d46", "#efe5cd", "#c9962e"];
    type Scrap = {
      x: number; y: number; vx: number; vy: number;
      s: number; r: number; vr: number; c: string; o: number; ph: number;
    };
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const scraps: Scrap[] = Array.from({ length: density }, () => ({
      x: rnd(0, w), y: rnd(0, h),
      vx: rnd(-9, 9), vy: rnd(-16, -5),
      s: rnd(7, 22), r: rnd(0, Math.PI * 2), vr: rnd(-0.012, 0.012),
      c: colors[(Math.random() * colors.length) | 0],
      o: rnd(0.22, 0.55), ph: rnd(0, Math.PI * 2),
    }));

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.016;
      if (!document.hidden) {
        ctx.clearRect(0, 0, w, h);
        for (const p of scraps) {
          p.x += p.vx * 0.016 + Math.sin(t * 0.7 + p.ph) * 0.28;
          p.y += p.vy * 0.016;
          p.r += p.vr;
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 19600) {
            const d = Math.sqrt(d2) || 1;
            const f = ((140 - d) / 140) * 3.4;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
          if (p.y < -30) { p.y = h + 30; p.x = Math.random() * w; }
          if (p.x < -30) p.x = w + 30;
          if (p.x > w + 30) p.x = -30;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.r);
          ctx.globalAlpha = p.o;
          ctx.fillStyle = p.c;
          ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.66);
          ctx.restore();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}

/* ————————————————————————————————————————————————
   RIP REVEAL — a section tears open as you arrive:
   two torn paper halves rip apart (transform-only).
———————————————————————————————————————————————— */
function TearEdge({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  // deterministic jagged edge
  let d = flip ? "M0 26 L1200 26 " : "M0 0 L1200 0 ";
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const pts: string[] = [];
  for (let x = 1200; x >= 0; x -= 48) pts.push(`${x},${flip ? 26 - 4 - rnd() * 16 : 4 + rnd() * 16}`);
  d += pts.map((p) => `L${p}`).join(" ") + " Z";
  return (
    <svg viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path d={d} fill="currentColor" />
    </svg>
  );
}

export function RipReveal({
  children,
  className = "",
  cover = "bg-paper",
}: {
  children: ReactNode;
  className?: string;
  cover?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
  return (
    <div className={`relative ${className}`}>
      {children}
      <motion.div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 z-20 h-1/2 ${cover} origin-top`}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease }}
      >
        <TearEdge className={`absolute -bottom-[24px] left-0 h-[26px] w-full ${cover.replace("bg-", "text-")}`} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 z-20 h-1/2 ${cover} origin-bottom`}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease, delay: 0.06 }}
      >
        <TearEdge flip className={`absolute -top-[24px] left-0 h-[26px] w-full ${cover.replace("bg-", "text-")}`} />
      </motion.div>
    </div>
  );
}

/* ————————————————————————————————————————————————
   TILT CARD — pointer-tracked 3D tilt, spring-smoothed.
———————————————————————————————————————————————— */
export function TiltCard({
  children,
  className = "",
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(mx, { stiffness: 160, damping: 18 });

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px * max * 2);
    my.set(-py * max * 2);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
