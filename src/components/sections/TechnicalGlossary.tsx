import type { GlossaryTerm } from '@/types/homepage';

type Props = {
  terms: GlossaryTerm[];
  locale?: string;
  standalone?: boolean;
};

function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const SERVICE_MAP: Record<string, { label: string; path: string }> = {
  ATR: { label: 'ATR Check', path: '/services/atr-check' },
  'Grid Connection': { label: 'Grid Feasibility', path: '/services/grid-feasibility' },
  Curtailment: { label: 'Grid Feasibility', path: '/services/grid-feasibility' },
  Bankability: { label: 'Bankability Reporting', path: '/services/bankability-reporting' },
  DSCR: { label: 'Bankability Reporting', path: '/services/bankability-reporting' },
  'Pre-TDD': { label: 'ATR Check', path: '/services/atr-check' },
};

export default function TechnicalGlossary({ terms, locale = 'tr', standalone = false }: Props) {
  if (!terms?.length) return null;

  const Wrapper = standalone ? 'section' : 'div';
  const wrapperClass = standalone
    ? 'w-full dark-section bg-[#0F2E2C] py-20 lg:py-24'
    : 'mt-16 border-t border-white/10 pt-10';

  return (
    <Wrapper id="glossary" className={wrapperClass}>
      <div className={standalone ? 'mx-auto w-full max-w-6xl px-6 lg:px-8' : undefined}>
        <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.25em] text-[#FFCB00]">
          Teknik Sözlük
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {terms.map((item) => {
            const slug = slugify(item.term);
            const service = SERVICE_MAP[item.term];

            return (
              <div key={item.term} id={slug} className="flex flex-col scroll-mt-24">
                <dt className="text-sm font-semibold text-white">
                  {item.term}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-white/70">
                  {item.definition}
                  {service && (
                    <a
                      href={`/${locale}${service.path}`}
                      className="ml-2 inline-block text-[#FFCB00] hover:underline text-xs font-medium"
                    >
                      → {service.label}
                    </a>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </Wrapper>
  );
}
