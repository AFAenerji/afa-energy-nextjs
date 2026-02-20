import type { GlossaryTerm } from '@/types/homepage';
import { slugify } from '@/lib/slugify';

type FAQBackLink = { id: string; label: string };

type Props = {
  terms: GlossaryTerm[];
  locale?: string;
  standalone?: boolean;
  faqBackLinks?: Record<string, FAQBackLink[]>;
};

const SERVICE_MAP: Record<string, { label: string; path: string }> = {
  ATR: { label: 'ATR Analizi', path: '/hizmetler#asama-1' },
  'Grid Connection': { label: 'Teknik İnceleme', path: '/hizmetler#asama-2' },
  Curtailment: { label: 'Teknik İnceleme', path: '/hizmetler#asama-2' },
  Bankability: { label: 'Operasyonel Denetim', path: '/hizmetler#asama-3' },
  DSCR: { label: 'Operasyonel Denetim', path: '/hizmetler#asama-3' },
  'Pre-TDD': { label: 'ATR Analizi', path: '/hizmetler#asama-1' },
};

export default function TechnicalGlossary({
  terms,
  locale = 'tr',
  standalone = false,
  faqBackLinks = {},
}: Props) {
  if (!terms?.length) return null;

  const Wrapper = standalone ? 'section' : 'div';
  const wrapperClass = standalone
    ? 'w-full dark-section py-20 lg:py-24'
    : 'mt-16 border-t border-white/10 pt-10';

  return (
    <Wrapper id="glossary" className={wrapperClass}>
      <div className={standalone ? 'afa-container' : undefined}>
        <h3 className="mb-8 text-sm font-bold uppercase tracking-[0.25em] afa-group-heading">
          Teknik Sözlük
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {terms.map((item) => {
            const slug = slugify(item.term);
            const service = SERVICE_MAP[item.term];
            const backLinks = faqBackLinks[item.term];

            return (
              <div key={item.term} id={slug} className="flex flex-col scroll-mt-24">
                <dt className="text-sm font-semibold text-white">
                  {item.term}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed afa-text-secondary">
                  {item.definition}
                  {service && (
                    <a
                      href={`/${locale}${service.path}`}
                      className="ml-2 inline-block afa-term-link hover:underline text-xs font-medium"
                    >
                      → {service.label}
                    </a>
                  )}
                  {backLinks && backLinks.length > 0 && (
                    <span className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs afa-text-muted">
                      {backLinks.map((link) => (
                        <a
                          key={link.id}
                          href={`#${link.id}`}
                          className="hover:underline afa-backlink"
                          title={link.label}
                        >
                          ↑ SSS
                        </a>
                      ))}
                    </span>
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
