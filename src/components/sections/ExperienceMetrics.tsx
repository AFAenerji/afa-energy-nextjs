import type { MetricsData } from "@/types/homepage";

type Props = {
  data: MetricsData;
};

export default function ExperienceMetrics({ data }: Props) {
  if (!data?.items?.length) return null;

  return (
    <section className="w-full bg-[#0F2E2C] py-20 md:py-24 lg:py-28 border-t border-white/10 flex justify-center">
      <div className="w-full max-w-7xl px-6 lg:px-8">
        
        {/* Eyebrow - Centered on mobile, left on desktop */}
        <p className="mb-10 text-sm font-bold uppercase tracking-[0.2em] text-white/80 text-center md:text-left md:mb-12">
          {data.eyebrow || "Veriye Dayalı Deneyim"}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 relative">
          {data.items.map((item, index) => (
            <div key={index} className="relative flex flex-col items-center md:items-start text-center md:text-left">
              
              {/* Vertical Divider (Desktop Only) */}
              {index < 3 && (
                <div className="hidden lg:block absolute right-[-1rem] top-0 h-full w-px bg-white/10" />
              )}

              {/* Value & Unit */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-5xl font-extrabold leading-none text-[#FFCB00] md:text-[54px] tracking-tight">
                  {item.value}
                </span>
                <span className="mt-3 text-lg font-bold uppercase tracking-[0.1em] text-[#FFCB00] md:text-xl">
                  {item.unit}
                </span>
              </div>

              {/* Label - High Visibility */}
              <p className="mt-4 text-base font-medium leading-relaxed text-white/95 max-w-[280px] md:max-w-none">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 border-t border-white/20 pt-8 text-center md:text-left">
          <p className="text-sm leading-relaxed text-white/70 mx-auto md:mx-0 max-w-4xl">
            {data.note}
          </p>
        </div>
        
      </div>
    </section>
  );
}