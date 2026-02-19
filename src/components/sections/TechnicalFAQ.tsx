'use client';

import { useId, useState, useCallback, useMemo } from 'react';
import type { TechnicalKnowledgeCenterData } from '@/types/homepage';
import { slugify } from '@/lib/slugify';
import TechnicalGlossary from './TechnicalGlossary';
import FAQSchema from '@/components/seo/FAQSchema';
import GlossarySchema from '@/components/seo/GlossarySchema';

/* ── Glossary terms eligible for cross-linking ── */
const HIGHLIGHT_TERMS = [
  'Grid Connection', 'Pre-TDD',
  'ATR', 'DSCR', 'Curtailment', 'ANRE', 'CfD', 'PPA',
  'Prosumer', 'Bankability',
] as const;

/* Longest-match-first regex: multi-word / hyphenated terms before short ones */
const TERM_REGEX = new RegExp(
  `(${HIGHLIGHT_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g',
);

/* ── Helpers ── */
function faqId(gIdx: number, iIdx: number): string {
  return `faq-${gIdx}-${iIdx}`;
}

function highlightAndLink(text: string): React.ReactNode[] {
  const parts = text.split(TERM_REGEX);
  return parts.map((part, i) => {
    if ((HIGHLIGHT_TERMS as readonly string[]).includes(part)) {
      return (
        <a
          key={i}
          href={`#${slugify(part)}`}
          className="afa-term-link font-semibold hover:underline"
        >
          {part}
        </a>
      );
    }
    return part.length > 0 ? <span key={i}>{part}</span> : null;
  });
}

/* ── Types ── */
type Props = {
  data: TechnicalKnowledgeCenterData;
  locale?: string;
};

/* ── Component ── */
export default function TechnicalFAQ({ data, locale = 'tr' }: Props) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = useCallback((key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const backLinks = useMemo(() => buildGlossaryBackLinks(data), [data]);

  if (!data?.groups?.length) return null;

  return (
    <>
      {/* JSON-LD: FAQPage + DefinedTermSet */}
      <FAQSchema groups={data.groups} />
      {data.glossary && data.glossary.length > 0 && (
        <GlossarySchema terms={data.glossary} locale={locale} />
      )}

      <section
        id="knowledge-center"
        aria-label="Teknik Bilgi Merkezi"
        className="w-full dark-section py-20 lg:py-24"
      >
        <div className="afa-container">
          {/* Bridge accent */}
          <div className="mb-12" aria-hidden="true">
            <div className="h-px w-full bg-white/10" />
            <div className="mt-4 h-[3px] w-16 rounded-sm afa-bridge-accent" />
          </div>

          {/* Title */}
          <header className="mb-14 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="mt-4 text-base md:text-lg afa-text-secondary max-w-3xl">
                {data.subtitle}
              </p>
            )}
          </header>

          {/* FAQ Groups */}
          <div className="space-y-12">
            {data.groups.map((group, gIdx) => (
              <div key={gIdx} id={`faq-group-${gIdx}`} role="group" aria-label={group.name}>
                <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.25em] afa-group-heading">
                  {group.name}
                </h3>
                <ul className="space-y-3 list-none p-0 m-0" role="list">
                  {group.items.map((item, iIdx) => {
                    const key = `${gIdx}-${iIdx}`;
                    const isOpen = !!openItems[key];
                    const panelId = `${baseId}-panel-${key}`;
                    const buttonId = `${baseId}-btn-${key}`;

                    return (
                      <li
                        key={key}
                        id={faqId(gIdx, iIdx)}
                        className="rounded-lg border border-white/10 bg-white/[0.03] scroll-mt-24"
                      >
                        <button
                          id={buttonId}
                          type="button"
                          onClick={() => toggleItem(key)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="afa-faq-trigger flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-[var(--yellow-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green-deep)] rounded-lg"
                        >
                          <span className="text-sm md:text-base font-medium afa-text-primary">
                            {highlightAndLink(item.question)}
                          </span>
                          <span className="shrink-0 text-xs font-semibold afa-toggle-label">
                            {isOpen ? 'Kapat' : 'Aç'}
                          </span>
                        </button>

                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className={isOpen ? 'border-t border-white/10 px-6 py-5' : 'sr-only'}
                        >
                          <p className="text-sm md:text-base leading-relaxed afa-text-secondary">
                            {highlightAndLink(item.answer)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Glossary with bidirectional links */}
          {data.glossary && data.glossary.length > 0 && (
            <TechnicalGlossary
              terms={data.glossary}
              locale={locale}
              faqBackLinks={backLinks}
            />
          )}
        </div>
      </section>
    </>
  );
}

/* ── Build reverse map: glossary term → FAQ items that mention it ── */
function buildGlossaryBackLinks(
  data: TechnicalKnowledgeCenterData,
): Record<string, { id: string; label: string }[]> {
  const map: Record<string, { id: string; label: string }[]> = {};

  data.groups.forEach((group, gIdx) => {
    group.items.forEach((item, iIdx) => {
      const text = `${item.question} ${item.answer}`;
      for (const term of HIGHLIGHT_TERMS) {
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
