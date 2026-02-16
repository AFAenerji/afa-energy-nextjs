import type { MetricsData } from "@/types/homepage";

type Props = {
  data: MetricsData;
};

export default function ExperienceMetrics({ data }: Props) {
  if (!data?.items?.length) return null;

  return (
    <section className="w-full bg-[#0F2E2C] py-20 md:py-24 lg:py-28 border-t border-white/10 flex justify-center">
      <div className="w-full max-w-6xl px-6 lg:px-8">
        
        {/* Eyebrow - Centered on mobile, left on desktop */}
        <p className="mb-8 text-sm font-bold uppercase tracking-[0.3em] text-white/80 text-center lg:text-left md:mb-10">
          {data.eyebrow || "Veriye Dayalı Deneyim"}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-14 relative">
          {data.items.map((item, index) => (
            <div key={index} className="relative flex flex-col items-center text-center lg:items-start lg:text-left lg:pr-6 md:px-4">
              
              {/* Vertical Divider (Desktop Only) - Conditional based on number of metrics */}
              {index < data.items.length - 1 && data.items.length > 1 && (
                <div className="hidden lg:block absolute right-0 top-0 h-full w-px bg-white/10" />
              )}

              {/* Value & Unit */}
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-5xl font-extrabold leading-none text-[#FFCB00] md:text-[54px] tracking-tight">
                  {item.value}
                </span>
                <span className="mt-3 text-lg font-bold uppercase tracking-[0.1em] text-[#FFCB00] md:text-xl">
                  {item.unit}
                </span>
              </div>

              {/* Label - High Visibility */}
              <p className="mt-4 text-base font-medium leading-relaxed text-white/95 mx-auto lg:mx-0 max-w-[220px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 border-t border-white/20 pt-8 text-center lg:text-left">
          <p className="text-sm leading-relaxed text-white/60 max-w-3xl">
            {data.note}
          </p>
        </div>
        
      </div>
    </section>
  );
}