'use client';

import type { IntroData } from "@/types/homepage";

function IconGrid() {
  return (
    <svg aria-hidden="true" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg aria-hidden="true" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg aria-hidden="true" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

const CARD_ICONS = [IconGrid, IconShield, IconDocument];

type Props = {
  data: IntroData;
};

export default function IntroductoryStatement({ data }: Props) {
  const cards = data.cards || [];

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Signature Bar + Headline */}
        <div className="flex flex-col items-center mb-14">
          <div className="h-[3px] w-16 bg-[#FFCB00] mx-auto mb-8 rounded-sm" />
          <h2 className="text-3xl lg:text-5xl font-extrabold text-[#0B1F1E] leading-tight tracking-tight text-center">
            {data.heading}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, index) => {
            const isHighlight = index === 1;
            const Icon = CARD_ICONS[index] || CARD_ICONS[0];

            return (
              <div
                key={index}
                role="article"
                aria-label={card.title}
                className={`
                  group relative rounded-2xl p-8 flex flex-col
                  transition-all duration-500
                  ${isHighlight
                    ? "bg-[#0F2E2C] text-white md:-mt-6 md:mb-6 shadow-2xl border border-[#FFCB00]/20 hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)]"
                    : "bg-white border border-gray-200 shadow-sm hover:shadow-2xl hover:border-[#18625F]/30 hover:-translate-y-2"
                  }
                `}
              >
                {/* Gold Accent Tab — Highlight Card Top-Right */}
                {isHighlight && (
                  <div className="absolute top-0 right-8 w-10 h-[3px] bg-[#FFCB00] rounded-b-sm" />
                )}

                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 ${
                  isHighlight
                    ? "bg-[#FFCB00] text-[#0B1F1E]"
                    : "bg-[#F5F5F5] text-[#18625F] group-hover:bg-[#FFCB00] group-hover:text-[#0B1F1E]"
                }`}>
                  <Icon />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold tracking-tight mb-3 ${
                  isHighlight ? "text-white" : "text-[#0B1F1E]"
                }`}>
                  {card.title}
                </h3>

                {/* Description */}
                <p className={`text-base leading-relaxed ${
                  isHighlight ? "text-white/80" : "text-[#5A5A5A]"
                }`}>
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
