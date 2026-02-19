'use client';

import { useId, useState } from "react";
import type { MetricsData } from "@/types/homepage";

type Props = {
  data: MetricsData;
};

export default function ExperienceMetrics({ data }: Props) {
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const panelId = useId();
  const eyebrow = data.eyebrow || "Veriye Dayalı Deneyim";
  const note = data.note || "";
  const methodology = (data as MetricsData & { methodology?: string }).methodology;

  if (!data?.items?.length) return null;

  return (
    <section id="experience-metrics" className="w-full dark-section bg-[#0F2E2C] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Scenario A Bridge: Line + Yellow Highlight to soften dark block entry */}
        <div className="mb-12" aria-hidden="true">
          <div className="h-px w-full bg-white/10" />
          <div className="mt-4 h-[3px] w-16 bg-[#FFCB00] rounded-sm" />
        </div>

        {/* Eyebrow */}
        <p className="mb-10 text-sm font-bold uppercase tracking-[0.3em] text-white/80 text-center lg:text-left">
          {eyebrow}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 relative">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center lg:items-start lg:text-left px-4"
            >
              {/* Vertical Divider (Desktop Only) */}
              {index < data.items.length - 1 && data.items.length > 1 && (
                <div className="hidden lg:block absolute right-0 top-0 h-full w-px bg-white/10" aria-hidden="true" />
              )}

              <div className="flex flex-col items-center lg:items-start">
                <span className="text-5xl font-extrabold leading-none text-[#FFCB00] md:text-[54px] tracking-tight">
                  {item.value}
                </span>
                {item.unit && (
                  <span className="mt-3 text-lg font-bold uppercase tracking-[0.1em] text-[#FFCB00] md:text-xl">
                    {item.unit}
                  </span>
                )}
              </div>

              {item.label && (
                <p className="mt-4 text-base font-medium leading-relaxed text-white/85">
                  {item.label}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note & Methodology Accordion */}
        <div className="mt-14 border-t border-white/20 pt-8">
          {note && (
            <p className="text-white/70 text-sm leading-relaxed max-w-3xl text-center lg:text-left italic">
              {note}
            </p>
          )}

          {methodology && methodology.trim().length > 0 && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setMethodologyOpen((v) => !v)}
                aria-expanded={methodologyOpen}
                aria-controls={panelId}
                className="inline-flex items-center gap-3 text-sm font-semibold text-[#FFCB00] hover:text-white transition-colors"
              >
                <span>Metodoloji</span>
                <span
                  aria-hidden="true"
                  className={`h-[10px] w-[10px] border-r-2 border-b-2 border-current transform transition-transform duration-200 ${
                    methodologyOpen ? "-rotate-135" : "rotate-45"
                  }`}
                />
              </button>

              {methodologyOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-label="Metodoloji"
                  className="mt-4 rounded-xl bg-white/5 border border-white/10 p-6 text-sm text-white/75 leading-relaxed"
                >
                  {methodology}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}