import type { Locale } from '@/lib/i18n';
import type { PositioningChainData, AtrMatrixItem } from '@/types/homepage';

interface PositioningChainProps {
  data: PositioningChainData;
  locale: Locale;
}

export default function PositioningChain({ data }: PositioningChainProps) {
  return (
    <section className="bg-gray-50 py-24">
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
              className="bg-white border border-gray-200 rounded-sm p-8 border-l-4 border-l-teal-800 hover:shadow-md hover:-translate-y-1 group"
            >
              {/* Step Number */}
              <div className="w-10 h-10 bg-teal-800 text-white rounded-sm flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-amber-400 group-hover:text-teal-900">
                {item.id}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 font-heading mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
