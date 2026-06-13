import { useEffect, useRef, useState } from "react";

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

function playDoneBeep() {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  try {
    const AudioCtx = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    osc.start();
    osc.stop(ctx.currentTime + 0.65);
    osc.onended = () => ctx.close();
  } catch {
    // best-effort beep; ignore failures
  }
}

interface Props {
  labels: TimerLabels;
}

export default function TeaTimer({ labels }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(labels.defaultSeconds);
  const [status, setStatus] = useState<Status>("idle");
  const intervalRef = useRef<number | null>(null);

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
          playDoneBeep();
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

  const onPrimary = () => {
    if (status === "idle") setStatus("running");
    else if (status === "running") setStatus("idle");
    else {
      setSecondsLeft(labels.defaultSeconds);
      setStatus("running");
    }
  };

  const onReset = () => {
    setStatus("idle");
    setSecondsLeft(labels.defaultSeconds);
  };

  const primaryLabel =
    status === "running" ? labels.pauseLabel : labels.startLabel;

  const statusLabel =
    status === "running"
      ? labels.runningLabel
      : status === "done"
      ? labels.doneLabel
      : labels.idleLabel;

  return (
    <div className="rounded-3xl bg-(--color-forest-deep) border-2 border-(--color-gold) p-8 sm:p-10 text-center">
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-(--color-gold)/15 text-(--color-gold) text-[11px] font-semibold tracking-[0.15em] uppercase">
        {labels.badge}
      </span>
      <h3 className="mt-4 text-xl sm:text-2xl font-bold text-(--color-cream)">
        {labels.heading}
      </h3>

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
          {status === "done" ? labels.startLabel : primaryLabel}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center bg-transparent border border-(--color-cream)/40 hover:border-(--color-cream) text-(--color-cream) text-sm px-5 py-2.5 rounded-full transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-(--color-gold) focus-visible:outline-offset-2"
        >
          {labels.resetLabel}
        </button>
      </div>
    </div>
  );
}
