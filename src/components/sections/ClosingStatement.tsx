import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { ClosingData } from '@/types/homepage';

interface ClosingStatementProps {
  data: ClosingData;
  locale: Locale;
}

export default function ClosingStatement({ data, locale }: ClosingStatementProps) {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Accent */}
        <div className="w-16 h-1 bg-amber-400 mx-auto mb-10" />

        {/* Motto */}
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight font-heading mb-6">
          {data.motto}
        </h2>

        {/* Supporting */}
        <p className="text-white/70 text-xl leading-relaxed mb-10">
          {data.subhead}
        </p>

        {/* CTA Button */}
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center justify-center bg-amber-400 text-teal-900 px-10 py-4 rounded-sm font-bold text-lg hover:bg-amber-500"
        >
          {data.primaryCta}
        </Link>
      </div>
    </section>
  );
}
