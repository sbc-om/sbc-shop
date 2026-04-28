import type { CSSProperties } from "react";
import type { Module } from "../types";
import { formatOMR } from "../utils/format";

const moduleToneByCategory: Record<
  string,
  { baseColor: string; selectedColor: string; pillBg: string; pillText: string }
> = {
  website: {
    baseColor: "#fef3c7",
    selectedColor: "#fcd34d",
    pillBg: "rgba(255,255,255,0.88)",
    pillText: "#7c5a00",
  },
  products: {
    baseColor: "#d1fae5",
    selectedColor: "#6ee7b7",
    pillBg: "rgba(255,255,255,0.88)",
    pillText: "#065f46",
  },
  sales: {
    baseColor: "#dbeafe",
    selectedColor: "#93c5fd",
    pillBg: "rgba(255,255,255,0.88)",
    pillText: "#1d4ed8",
  },
  operations: {
    baseColor: "#ede9fe",
    selectedColor: "#c4b5fd",
    pillBg: "rgba(255,255,255,0.88)",
    pillText: "#5b21b6",
  },
  "crm-marketing": {
    baseColor: "#fee2e2",
    selectedColor: "#fca5a5",
    pillBg: "rgba(255,255,255,0.88)",
    pillText: "#b91c1c",
  },
  "apps-ai": {
    baseColor: "#e0f2fe",
    selectedColor: "#7dd3fc",
    pillBg: "rgba(255,255,255,0.88)",
    pillText: "#075985",
  },
};

interface ModuleCardProps {
  module: Module;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function ModuleCard({ module, selected, onToggle }: ModuleCardProps) {
  const tone = moduleToneByCategory[module.category] ?? {
    baseColor: "#f3f4f6",
    selectedColor: "#d1d5db",
    pillBg: "rgba(255,255,255,0.9)",
    pillText: "#374151",
  };

  const cardStyle: CSSProperties = {
    backgroundColor: selected ? tone.selectedColor : tone.baseColor,
  };

  const pillStyle: CSSProperties = {
    backgroundColor: tone.pillBg,
    color: tone.pillText,
  };

  return (
    <button
      type="button"
      onClick={() => onToggle(module.id)}
      aria-pressed={selected}
      style={cardStyle}
      className={[
        "group relative text-left w-full overflow-hidden rounded-[24px] px-4 py-4 transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
        selected
          ? "text-black shadow-[0_10px_28px_rgba(0,0,0,0.06)]"
          : "text-black shadow-[0_8px_24px_rgba(0,0,0,0.04)]",
      ].join(" ")}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug text-base">{module.name}</h3>

          <div className="mt-3 space-y-2 rounded-[18px] bg-white/55 px-3 py-3 text-[12px] leading-5 text-gray-800">
            <div className="space-y-1 text-left" dir="ltr" lang="en">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                English
              </div>
              <p className="m-0">{module.description.en}</p>
            </div>

            <div className="space-y-1 text-right" dir="rtl" lang="fa">
              <div className="text-[10px] font-semibold tracking-[0.02em] text-gray-500">
                فارسی
              </div>
              <p className="m-0">{module.description.fa}</p>
            </div>

            <div className="space-y-1 text-right" dir="rtl" lang="ar">
              <div className="text-[10px] font-semibold tracking-[0.02em] text-gray-500">
                العربية
              </div>
              <p className="m-0">{module.description.ar}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {module.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                style={selected ? undefined : pillStyle}
                className={[
                  "rounded-full px-2.5 py-1",
                  selected
                    ? "bg-white/90 text-gray-700"
                    : "",
                ].join(" ")}
              >
                ✦ {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 xl:justify-end xl:shrink-0">
          <span
            style={selected ? undefined : pillStyle}
            className={[
              "text-xs font-medium px-2.5 py-1 rounded-full",
              selected
                ? "bg-gray-700 text-white"
                : "",
            ].join(" ")}
          >
            {selected ? "Selected" : "Add"}
          </span>

          <span className="text-sm font-semibold xl:min-w-[130px] xl:text-right">
            {formatOMR(module.price)}
          </span>

          <span
            className={[
              "shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition",
              selected
                ? "bg-gray-700 text-white"
                : "bg-white/90 text-transparent group-hover:text-gray-600",
            ].join(" ")}
            aria-hidden="true"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M16.704 5.296a1 1 0 010 1.408l-7.5 7.5a1 1 0 01-1.408 0l-3.5-3.5a1 1 0 011.408-1.408L8.5 12.092l6.796-6.796a1 1 0 011.408 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}
