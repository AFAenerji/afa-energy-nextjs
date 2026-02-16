import type { MetricsData } from "@/types/homepage";

type Props = {
  data: MetricsData;
};

export default function ExperienceMetrics({ data }: Props) {
  // Safety Guard: If data or items are missing, render nothing to prevent crash
  if (!data?.items?.length) return null;

  return (
    <section className="w-full bg-[#0F2E2C] py-20 md:py-24 lg:py-28 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        
        {/* Eyebrow — Fallback included */}
        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.15em] text-white/60 md:mb-12">
          {data.eyebrow || "Veriye Dayalı Deneyim"}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 lg:gap-16 relative">
          {data.items.map((item, index) => (
            <div key={index} className="relative group">
              
              {/* Vertical Divider: Absolute positioning ensures full height, hidden on mobile */}
              {index < 2 && (
                <div className="hidden md:block absolute right-0 top-0 h-full w-px bg-white/10" />
              )}

              {/* Content Container */}
              {/* pr-padding ensures text doesn't touch the divider */}
              <div className="flex flex-col items-start pr-0 md:pr-12 lg:pr-14">
                
                {/* Line 1: Value (Yellow, Large) */}
                <span className="text-5xl font-extrabold leading-[1.05] text-[#FFCB00] md:text-[56px] tracking-tight">
                  {item.value}
                </span>

                {/* Line 2: Unit (Yellow, Smaller, Uppercase) */}
                {/* Height preservation: if missing, keep layout rhythm */}
                {item.unit ? (
                  <span className="mt-2 text-lg font-bold uppercase tracking-[0.08em] text-[#FFCB00] md:text-xl">
                    {item.unit}
                  </span>
                ) : (
                  <div className="mt-2 h-[28px]" aria-hidden="true" />
                )}

                {/* Line 3: Label (White/65) */}
                {/* Max-width constraints ensure columns don't stretch too wide on huge screens */}
                <p className="mt-4 text-sm leading-relaxed text-white/65 max-w-[220px] md:max-w-[240px] lg:max-w-[260px]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-14 border-t border-white/15 pt-8 md:mt-16">
          <p className="text-xs leading-relaxed text-white/45 max-w-3xl lg:max-w-2xl">
            {data.note}
          </p>
        </div>
        
      </div>
    </section>
  );
}