import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

function trackStart(initialSeconds: number, resumed: boolean) {
  if (typeof window === "undefined") return;
  window.posthog?.capture("tea_timer_started", {
    initial_seconds: initialSeconds,
    resumed,
  });
}

interface CelebrateConfig {
  title: string;
  body: string;
  promoLabel: string;
  promoCode: string;
  copyLabel: string;
  copiedLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

interface TimerLabels {
  badge: string;
  heading: string;
  defaultSeconds: number;
  idleLabel: string;
  runningLabel: string;
  doneLabel: string;
  startLabel: string;
  pauseLabel: string;
  resetLabel: string;
  celebrate: CelebrateConfig;
}

type Status = "idle" | "running" | "done";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function format(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${pad(m)}:${pad(s)}`;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function playDoneBeep() {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) return;
  try {
    const AudioCtx = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    [880, 1320].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const start = now + i * 0.18;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
      osc.start(start);
      osc.stop(start + 0.55);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch {
    // best-effort beep
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  shape: "rect" | "circle";
  life: number;
}

function launchConfetti(canvas: HTMLCanvasElement) {
  if (prefersReducedMotion()) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const W = rect.width;
  const H = rect.height;
  const colors = ["#F4D35E", "#FBE89A", "#7BA05B", "#C2410C", "#D4A93E", "#FAF6E8"];
  const particles: Particle[] = [];
  const count = 90;
  for (let i = 0; i < count; i++) {
    const angle = (-Math.PI / 2) + (Math.random() - 0.5) * 1.4;
    const speed = 4 + Math.random() * 5;
    particles.push({
      x: W / 2,
      y: H * 0.55,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      size: 5 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() < 0.5 ? "rect" : "circle",
      life: 0,
    });
  }
  const gravity = 0.18;
  const friction = 0.992;
  const maxLife = 180;
  let rafId = 0;
  const tick = () => {
    ctx.clearRect(0, 0, W, H);
    let alive = 0;
    for (const p of particles) {
      if (p.life > maxLife) continue;
      alive++;
      p.vy += gravity;
      p.vx *= friction;
      p.vy *= friction;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life++;
      const alpha = Math.max(0, 1 - p.life / maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    if (alive > 0) {
      rafId = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, W, H);
    }
  };
  rafId = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(rafId);
    ctx.clearRect(0, 0, W, H);
  };
}

interface Props {
  labels: TimerLabels;
}

export default function TeaTimer({ labels }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(labels.defaultSeconds);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (status !== "running") {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setStatus("done");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status]);

  useEffect(() => {
    if (status !== "done") return;
    playDoneBeep();
    let cleanup: (() => void) | undefined;
    const id = requestAnimationFrame(() => {
      if (canvasRef.current) {
        cleanup = launchConfetti(canvasRef.current);
      }
    });
    return () => {
      cancelAnimationFrame(id);
      cleanup?.();
    };
  }, [status]);

  const onPrimary = () => {
    if (status === "idle") {
      trackStart(secondsLeft, secondsLeft !== labels.defaultSeconds);
      setStatus("running");
    } else if (status === "running") {
      setStatus("idle");
    } else {
      trackStart(labels.defaultSeconds, false);
      setSecondsLeft(labels.defaultSeconds);
      setCopied(false);
      setStatus("running");
    }
  };

  const onReset = () => {
    setStatus("idle");
    setSecondsLeft(labels.defaultSeconds);
    setCopied(false);
  };

  const onCopyPromo = async () => {
    const code = labels.celebrate.promoCode;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore copy failures
    }
  };

  const primaryLabel =
    status === "running" ? labels.pauseLabel : labels.startLabel;

  const statusLabel =
    status === "running"
      ? labels.runningLabel
      : status === "done"
      ? labels.doneLabel
      : labels.idleLabel;

  const isDone = status === "done";
  const c = labels.celebrate;

  return (
    <div className="relative rounded-3xl bg-(--color-forest-deep) border-2 border-(--color-gold) p-8 sm:p-10 text-center overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full"
      />

      <div className="relative">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-(--color-gold)/15 text-(--color-gold) text-[11px] font-semibold tracking-[0.15em] uppercase">
          {labels.badge}
        </span>
        <h3 className="mt-4 text-xl sm:text-2xl font-bold text-(--color-cream)">
          {labels.heading}
        </h3>

        {isDone ? (
          <div className="mt-6">
            <div className="text-5xl sm:text-6xl" aria-hidden="true">🍵</div>
            <h4 className="mt-3 text-2xl sm:text-3xl font-bold text-(--color-gold)">
              {c.title}
            </h4>
            <p className="mt-2 text-sm sm:text-base text-(--color-cream)/85 max-w-sm mx-auto">
              {c.body}
            </p>

            <div className="mt-5 inline-flex flex-col items-center gap-3 bg-(--color-gold)/10 border-2 border-dashed border-(--color-gold)/60 rounded-2xl px-5 py-4">
              <span className="text-[11px] uppercase tracking-[0.15em] text-(--color-gold)/90 font-semibold">
                {c.promoLabel}
              </span>
              <span
                className="text-2xl sm:text-3xl font-bold tracking-[0.2em] text-(--color-cream)"
                style={{ fontFamily: "'JetBrains Mono', 'Menlo', monospace" }}
              >
                {c.promoCode}
              </span>
            </div>

            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={onCopyPromo}
                className="inline-flex items-center bg-(--color-gold) hover:bg-(--color-gold-deep) text-(--color-forest) font-semibold text-sm px-5 py-2.5 rounded-full transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-(--color-gold) focus-visible:outline-offset-2"
              >
                {copied ? c.copiedLabel : c.copyLabel}
              </button>
              <a
                href={c.ctaHref}
                className="inline-flex items-center bg-transparent border border-(--color-cream)/50 hover:border-(--color-cream) text-(--color-cream) text-sm px-5 py-2.5 rounded-full transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-(--color-gold) focus-visible:outline-offset-2"
              >
                {c.ctaLabel}
              </a>
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center text-(--color-cream)/70 hover:text-(--color-cream) text-sm px-3 py-2.5 transition-colors focus:outline-none focus-visible:underline"
              >
                {labels.resetLabel}
              </button>
            </div>
            <p className="sr-only" aria-live="assertive">{c.title}</p>
          </div>
        ) : (
          <>
            <div className="mt-8 flex justify-center" aria-hidden="true">
              <svg
                width="72"
                height="84"
                viewBox="0 0 72 84"
                fill="none"
                className={status === "running" ? "tea-bag-running" : ""}
              >
                <path d="M36 6v18" stroke="#F4D35E" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="18" y="24" width="36" height="44" rx="6" fill="#1E3024" stroke="#F4D35E" strokeWidth="2" />
                <path d="M22 38h28M22 48h28M22 58h28" stroke="#7BA05B" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M30 14l6-8 6 8" stroke="#F4D35E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            <div
              aria-hidden="true"
              className="mt-6 text-5xl sm:text-6xl font-bold tabular-nums tracking-[0.05em] text-(--color-cream)"
              style={{ fontFamily: "'JetBrains Mono', 'Menlo', monospace" }}
            >
              {format(secondsLeft)}
            </div>
            <p
              className="mt-3 text-xs sm:text-sm tracking-[0.1em] uppercase text-(--color-cream)/70"
              aria-live="polite"
            >
              {statusLabel}
            </p>

            <div className="mt-7 flex justify-center gap-3">
              <button
                type="button"
                onClick={onPrimary}
                className="inline-flex items-center bg-(--color-gold) hover:bg-(--color-gold-deep) text-(--color-forest) font-semibold text-sm px-5 py-2.5 rounded-full transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-(--color-gold) focus-visible:outline-offset-2"
              >
                {primaryLabel}
              </button>
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center bg-transparent border border-(--color-cream)/40 hover:border-(--color-cream) text-(--color-cream) text-sm px-5 py-2.5 rounded-full transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-(--color-gold) focus-visible:outline-offset-2"
              >
                {labels.resetLabel}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
