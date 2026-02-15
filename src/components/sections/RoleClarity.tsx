import type { Locale } from '@/lib/i18n';
import type { RoleClarityData } from '@/types/homepage';

interface RoleClarityProps {
  data: RoleClarityData;
  locale: Locale;
}

export default function RoleClarity({ data }: RoleClarityProps) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-slate-900 font-heading mb-4">
          {data.roleTitle}
        </h2>
        <div className="w-12 h-1 bg-amber-400 mx-auto mb-16" />

        {/* Two-Column Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* AFA DOES — Clarity */}
          <div className="bg-white border border-gray-200 rounded-sm p-8 border-l-4 border-l-teal-800">
            <h3 className="text-xl font-bold text-teal-800 font-heading mb-6 uppercase tracking-wide">
              AFA YAPAR
            </h3>
            <ul className="space-y-4">
              {data.does.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-teal-800 text-white rounded-sm flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFA DOES NOT — Ambiguity */}
          <div className="bg-white border border-gray-200 rounded-sm p-8 border-l-4 border-l-red-500">
            <h3 className="text-xl font-bold text-red-600 font-heading mb-6 uppercase tracking-wide">
              AFA YAPMAZ
            </h3>
            <ul className="space-y-4">
              {data.doesNot.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-sm flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    ✗
                  </span>
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Boundary Note */}
        <div className="bg-gray-50 border-l-4 border-l-amber-400 p-6 max-w-3xl mx-auto rounded-sm">
          <p className="text-slate-600 leading-relaxed italic">
            {data.boundaryNote}
          </p>
        </div>
      </div>
    </section>
  );
}
