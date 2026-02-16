import type { ClosingData } from "@/types/homepage";

type Props = {
  data: ClosingData;
};

export default function ClosingStatement({ data }: Props) {
  return (
    <section className="w-full bg-[#0F2E2C] py-32 border-t border-white/10">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        
        {/* Big Motto */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-16">
          {data.motto}
        </h2>

        {/* 3 Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-left md:text-center">
          {data.principles.map((principle, idx) => (
            <div key={idx} className="flex flex-col items-start md:items-center">
              <div className="w-8 h-1 bg-[#FFCB00] mb-4" />
              <p className="text-lg font-medium text-white/90 leading-snug">
                {principle}
              </p>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <p className="text-xs text-white/30 max-w-2xl mx-auto leading-relaxed">
            {data.legal}
          </p>
        </div>

      </div>
    </section>
  );
}
