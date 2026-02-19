import type { ClosingData } from "@/types/homepage";

type Props = {
  data: ClosingData;
};

export default function ClosingStatement({ data }: Props) {
  return (
    <section className="w-full bg-[#0F2E2C] relative overflow-hidden py-20 lg:py-28">
      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-texture" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full relative z-10">

        {/* Transition Bridge */}
        <div className="mb-16">
          <div className="h-px w-full bg-white/10" />
          <div className="mt-4 h-[3px] w-16 bg-[#FFCB00] rounded-sm" />
        </div>

        {/* Big Motto */}
        <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight mb-16 text-center leading-tight">
          {data.motto}
        </h2>

        {/* 3 Principles — Interactive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {data.principles.map((principle, idx) => (
            <div key={idx} className="group flex flex-col items-center text-center cursor-default">
              <div className="h-[3px] w-12 bg-[#FFCB00] mb-5 rounded-sm origin-center transition-transform duration-300 group-hover:scale-x-125" />
              <span className="w-10 h-10 rounded-full border-2 border-[#FFCB00]/40 text-[#FFCB00] text-sm font-bold flex items-center justify-center mb-4 transition-colors duration-300 group-hover:border-[#FFCB00] group-hover:bg-[#FFCB00]/10">
                {idx + 1}
              </span>
              <p className="text-lg font-medium text-white/70 leading-snug max-w-[240px] transition-colors duration-300 group-hover:text-[#FFCB00]">
                {principle}
              </p>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <p className="text-sm text-white/50 italic max-w-2xl mx-auto leading-relaxed text-center">
            {data.legal}
          </p>
        </div>

      </div>
    </section>
  );
}
