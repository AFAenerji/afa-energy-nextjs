import type { TechnicalKnowledgeCenterData } from '@/types/homepage';
import type { Locale } from '@/lib/i18n';
import TechnicalGlossary from './TechnicalGlossary';
import FAQSchema from '@/components/seo/FAQSchema';
import GlossarySchema from '@/components/seo/GlossarySchema';

const GLOSSARY_TERMS = [
  'ATR', 'DSCR', 'Curtailment', 'ANRE', 'CfD', 'PPA',
  'Pre-TDD', 'Prosumer', 'Bankability', 'Grid Connection',
];

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function faqId(gIdx: number, iIdx: number): string {
  return `faq-${gIdx}-${iIdx}`;
}

function linkTermsToGlossary(text: string): React.ReactNode[] {
  const regex = new RegExp(`\\b(${GLOSSARY_TERMS.join('|')})\\b`, 'g');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    GLOSSARY_TERMS.includes(part) ? (
      <a
        key={i}
        href={`#${slugify(part)}`}
        className="text-[#FFCB00] font-semibold hover:underline"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

type Props = {
  data: TechnicalKnowledgeCenterData;
  locale?: Locale | string;
};

export default function TechnicalFAQ({ data, locale = 'tr' }: Props) {
  if (!data?.groups?.length) return null;

  return (
    <>
      <FAQSchema groups={data.groups} />
      {data.glossary && data.glossary.length > 0 && (
        <GlossarySchema terms={data.glossary} locale={String(locale)} />
      )}

      <section
        id="knowledge-center"
        className="w-full dark-section bg-[#0F2E2C] py-20 lg:py-24"
      >
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          {/* Bridge */}
          <div className="mb-12" aria-hidden="true">
            <div className="h-px w-full bg-white/10" />
            <div className="mt-4 h-[3px] w-16 bg-[#FFCB00] rounded-sm" />
          </div>

          {/* Title */}
          <header className="mb-14 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl">
                {data.subtitle}
              </p>
            )}
          </header>

          {/* FAQ Groups — <details>/<summary> for SSR-friendly accordion */}
          <div className="space-y-12">
            {data.groups.map((group, gIdx) => (
              <div key={gIdx} id={`faq-group-${gIdx}`}>
                <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-[#FFCB00]">
                  {group.name}
                </h3>
                <div className="space-y-3">
                  {group.items.map((item, iIdx) => (
                    <details
                      key={`${gIdx}-${iIdx}`}
                      id={faqId(gIdx, iIdx)}
                      className="group rounded-lg border border-white/10 bg-white/[0.03] scroll-mt-24"
                    >
                      <summary className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.04] list-none [&::-webkit-details-marker]:hidden">
                        <span className="text-sm md:text-base font-medium text-white/90">
                          {linkTermsToGlossary(item.question)}
                        </span>
                        <span
                          className="shrink-0 text-xs font-semibold text-[#FFCB00] transition-transform group-open:rotate-45"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </summary>
                      <div className="border-t border-white/10 px-6 py-5">
                        <p className="text-sm md:text-base leading-relaxed text-white/75">
                          {linkTermsToGlossary(item.answer)}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Glossary with bidirectional links */}
          {data.glossary && data.glossary.length > 0 && (
            <TechnicalGlossary
              terms={data.glossary}
              locale={String(locale)}
              faqBackLinks={buildGlossaryBackLinks(data)}
            />
          )}
        </div>
      </section>
    </>
  );
}

function buildGlossaryBackLinks(
  data: TechnicalKnowledgeCenterData,
): Record<string, { id: string; label: string }[]> {
  const map: Record<string, { id: string; label: string }[]> = {};

  data.groups.forEach((group, gIdx) => {
    group.items.forEach((item, iIdx) => {
      const text = `${item.question} ${item.answer}`;
      for (const term of GLOSSARY_TERMS) {
        if (text.includes(term)) {
          if (!map[term]) map[term] = [];
          const id = faqId(gIdx, iIdx);
          if (!map[term].some((l) => l.id === id)) {
            map[term].push({
              id,
              label: item.question.length > 50
                ? item.question.slice(0, 47) + '...'
                : item.question,
            });
          }
        }
      }
    });
  });

  return map;
}
