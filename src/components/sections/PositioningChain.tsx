import type { Locale } from '@/lib/i18n';
import type { PositioningChainData, AtrMatrixItem } from '@/types/homepage';

interface PositioningChainProps {
  data: PositioningChainData;
  locale: Locale;
}

export default function PositioningChain({ data }: PositioningChainProps) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-slate-900 font-heading mb-4">
          {data.title}
        </h2>
        <div className="w-12 h-1 bg-amber-400 mx-auto mb-16" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.framework.map((item: AtrMatrixItem) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E7EB] rounded-[4px] p-6"
            >
              {/* Step Number */}
              <div className="text-[#28AFB0] text-xs font-bold tracking-[0.2em] mb-3">
                {item.id}
              </div>

              {/* Title */}
              <h3 className="text-[#0B1F1E] font-semibold text-base mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#5A5A5A] text-sm leading-relaxed mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
