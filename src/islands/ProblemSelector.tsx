import { useState, type CSSProperties } from "react";
import { Flame, HeartPulse, BatteryLow, Coffee } from "lucide-react";
import type { ProblemItem } from "../content/landing";

const iconMap = {
  Flame,
  HeartPulse,
  BatteryLow,
  Coffee,
} as const;

interface DefaultPrompt {
  emoji: string;
  title: string;
  body: string;
}

interface Props {
  items: readonly ProblemItem[];
  defaultPrompt: DefaultPrompt;
}

export default function ProblemSelector({ items, defaultPrompt }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((i) => i.id === selectedId) ?? null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Chọn vấn đề"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Flame;
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls="problem-panel"
              id={`problem-tab-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className={[
                "flex flex-col items-center gap-3 px-4 py-5 rounded-2xl border-2 transition-all text-center focus:outline-none focus-visible:outline-2 focus-visible:outline-(--color-forest) focus-visible:outline-offset-2",
                isSelected
                  ? "bg-(--color-cream-strong) border-(--color-gold) shadow-md"
                  : "bg-(--color-cream-soft) border-transparent hover:border-(--color-forest)/30",
              ].join(" ")}
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: item.iconBg, color: item.iconColor } satisfies CSSProperties}
              >
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-(--color-forest) leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="problem-panel"
        role="tabpanel"
        aria-labelledby={selected ? `problem-tab-${selected.id}` : undefined}
        aria-live="polite"
        className="mt-6 rounded-2xl bg-(--color-forest-deep) border-2 border-(--color-gold) p-6 sm:p-8 text-(--color-cream)"
      >
        {selected ? (
          <>
            <h3 className="flex items-center gap-2 text-(--color-gold) font-bold text-base sm:text-lg">
              <span aria-hidden="true">✨</span>
              {selected.solution.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-(--color-cream)/90">
              {selected.solution.body}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-(--color-gold)/90 bg-(--color-gold)/10 border border-(--color-gold)/30 rounded-full px-3 py-1.5">
              <span aria-hidden="true">✓</span>
              {selected.fit}
            </p>
          </>
        ) : (
          <>
            <h3 className="flex items-center gap-2 text-(--color-gold) font-bold text-base sm:text-lg">
              <span aria-hidden="true">{defaultPrompt.emoji}</span>
              {defaultPrompt.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-(--color-cream)/85">
              {defaultPrompt.body}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
