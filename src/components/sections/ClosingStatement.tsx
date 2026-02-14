import { Locale } from '@/lib/i18n';

interface ClosingStatementProps {
  locale: Locale;
}

export default function ClosingStatement({ locale }: ClosingStatementProps) {
  const content = {
    en: "Clarity Before Investment.",
    tr: "Yatırımdan Önce Netlik.",
    ro: "Claritate înainte de Investiție."
  };

  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl desktop:text-4xl font-bold text-primary leading-tight font-heading px-4">
            {content[locale]}
          </h2>
        </div>
      </div>
    </section>
  );
}
