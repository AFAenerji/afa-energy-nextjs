import type { ClosingData } from "@/types/homepage";

type Props = {
  data: ClosingData;
};

export default function ClosingStatement({ data }: Props) {
  return (
    <section className="w-full bg-[#0F2E2C] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Transition Bridge */}
        <div className="mb-16">
          <div className="h-px w-full bg-white/10" />
          <div className="mt-4 h-[3px] w-16 bg-[#FFCB00]" />
        </div>

        {/* Big Motto */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-16 text-center">
          {data.motto}
        </h2>

        {/* 3 Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-left md:text-center">
          {data.principles.map((principle, idx) => (
            <div key={idx} className="flex flex-col items-start md:items-center">
              <div className="h-[3px] w-12 bg-[#FFCB00] mb-4" />
              <p className="text-lg font-medium text-white/90 leading-snug">
                {principle}
              </p>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <p className="text-xs text-white/50 italic max-w-2xl mx-auto leading-relaxed text-center">
            {data.legal}
          </p>
        </div>

      </div>
    </section>
  );
}
