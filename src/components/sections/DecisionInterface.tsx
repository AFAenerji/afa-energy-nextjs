import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { DecisionData } from '@/types/homepage';

interface DecisionInterfaceProps {
  data: DecisionData;
  locale: Locale;
}

export default function DecisionInterface({ data, locale }: DecisionInterfaceProps) {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Investor Card */}
          <div className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg hover:scale-[1.02] group">
            <div className="h-2 bg-teal-800" />
            <div className="p-10">
              <div className="w-14 h-14 bg-teal-800 rounded-sm flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 font-heading mb-4">
                {data.investor.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {data.investor.description}
              </p>

              <Link
                href={`/${locale}/investor`}
                className="block w-full bg-teal-800 text-white px-6 py-4 rounded-sm font-bold text-center hover:bg-teal-900"
              >
                {data.investor.cta}
              </Link>
            </div>
          </div>

          {/* Developer Card */}
          <div className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg hover:scale-[1.02] group">
            <div className="h-2 bg-amber-400" />
            <div className="p-10">
              <div className="w-14 h-14 bg-amber-400 rounded-sm flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-teal-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 font-heading mb-4">
                {data.developer.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {data.developer.description}
              </p>

              <Link
                href={`/${locale}/developer`}
                className="block w-full bg-amber-400 text-teal-900 px-6 py-4 rounded-sm font-bold text-center hover:bg-amber-500"
              >
                {data.developer.cta}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
