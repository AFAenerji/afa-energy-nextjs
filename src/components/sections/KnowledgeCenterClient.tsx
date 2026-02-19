'use client';

import { useId, useState } from 'react';
import type { TechnicalKnowledgeCenterData } from '@/types/homepage';
import TechnicalGlossary from './TechnicalGlossary';

const HIGHLIGHT_TERMS = [
  'ATR',
  'DSCR',
  'Curtailment',
  'ANRE',
  'CfD',
  'PPA',
  'Pre-TDD',
  'Prosumer',
  'Bankability',
  'Grid Connection',
];

function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function highlightAndLink(
  text: string,
  locale: string,
): React.ReactNode[] {
  const regex = new RegExp(`\\b(${HIGHLIGHT_TERMS.join('|')})\\b`, 'g');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    HIGHLIGHT_TERMS.includes(part) ? (
      <a
        key={i}
        href={`/${locale}/knowledge-center#${slugify(part)}`}
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
  locale: string;
};

export default function KnowledgeCenterClient({ data, locale }: Props) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  if (!data?.groups?.length) return null;

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full dark-section bg-[#0F2E2C] min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
        {/* Page Header */}
        <header className="mb-14">
          <div className="mb-8" aria-hidden="true">
            <div className="h-px w-full bg-white/10" />
            <div className="mt-4 h-[3px] w-16 bg-[#FFCB00] rounded-sm" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl">
              {data.subtitle}
            </p>
          )}
        </header>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Sticky Sidebar */}
          <nav
            aria-label="Knowledge Center Navigation"
            className="lg:w-64 shrink-0"
          >
            <div className="lg:sticky lg:top-24">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                Bölümler
              </p>
              <ul className="space-y-1" role="list">
                {data.groups.map((group, gIdx) => (
                  <li key={gIdx}>
                    <a
                      href={`#group-${gIdx}`}
                      className="block rounded-md px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      {group.name}
                    </a>
                  </li>
                ))}
                {data.glossary && data.glossary.length > 0 && (
                  <li>
                    <a
                      href="#glossary"
                      className="block rounded-md px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      Teknik Sözlük
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* FAQ Groups */}
            <div className="space-y-14">
              {data.groups.map((group, gIdx) => (
                <section
                  key={gIdx}
                  id={`group-${gIdx}`}
                  className="scroll-mt-24"
                >
                  <h2 className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-[#FFCB00]">
                    {group.name}
                  </h2>
                  <ul className="space-y-3 list-none p-0 m-0" role="list">
                    {group.items.map((item, iIdx) => {
                      const key = `${gIdx}-${iIdx}`;
                      const isOpen = !!openItems[key];
                      const panelId = `${baseId}-panel-${key}`;
                      const buttonId = `${baseId}-btn-${key}`;

                      return (
                        <li
                          key={key}
                          className="rounded-lg border border-white/10 bg-white/[0.03]"
                        >
                          <button
                            id={buttonId}
                            type="button"
                            onClick={() => toggleItem(key)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.04]"
                          >
                            <span className="text-sm md:text-base font-medium text-white/90">
                              {highlightAndLink(item.question, locale)}
                            </span>
                            <span
                              className="shrink-0 text-xs font-semibold text-[#FFCB00]"
                              aria-hidden="true"
                            >
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>

                          {isOpen && (
                            <div
                              id={panelId}
                              role="region"
                              aria-labelledby={buttonId}
                              className="border-t border-white/10 px-6 py-5"
                            >
                              <p className="text-sm md:text-base leading-relaxed text-white/75">
                                {highlightAndLink(item.answer, locale)}
                              </p>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>

            {/* Glossary */}
            {data.glossary && data.glossary.length > 0 && (
              <TechnicalGlossary
                terms={data.glossary}
                locale={locale}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
