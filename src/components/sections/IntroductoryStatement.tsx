import type { Locale } from '@/lib/i18n';
import type { IntroData } from '@/types/homepage';

interface IntroductoryStatementProps {
  data: IntroData;
  locale: Locale;
}

export default function IntroductoryStatement({ data }: IntroductoryStatementProps) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-3xl mx-auto text-left px-6">
        {/* Decorative accent line */}
        <div className="w-16 h-1 bg-amber-400 mb-10" />

        <h2 className="text-2xl font-bold text-slate-900 font-heading mb-6">
          {data.title}
        </h2>
        <p className="text-slate-600 text-xl leading-relaxed">
          {data.body}
        </p>

        {/* Bottom accent */}
        <div className="w-10 h-[2px] bg-slate-800 mt-10" />
      </div>
    </section>
  );
}
