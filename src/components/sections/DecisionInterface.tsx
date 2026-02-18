"use client";

import { useState } from "react";
import Link from "next/link";
import type { DecisionData } from "@/types/homepage";

type Props = {
  data: DecisionData;
  locale: string;
};

export default function DecisionInterface({ data, locale }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        
        <h2 className="text-2xl font-bold text-[#0B1F1E] mb-12 text-center">
          {data.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.cards.map((card) => {
            const isSelected = selectedId === card.type;
            
            return (
              <button
                key={card.type}
                onClick={() => setSelectedId(card.type)}
                className={`
                  text-left p-8 rounded-[4px] cursor-pointer w-full
                  flex flex-col min-h-[220px]
                  focus:outline-none focus-visible:outline-2 focus-visible:outline-[#18625F]
                  ${isSelected
                    ? 'border-2 border-[#FFCB00] bg-[rgba(255,203,0,0.03)]'
                    : 'border border-[#E0E0E0] bg-white hover:border-[#28AFB0]'
                  }
                `}
              >
                <h3 className="text-lg font-semibold text-[#0B1F1E] mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  {card.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* CTA Button - ALWAYS GREEN */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center bg-[#18625F] text-white font-semibold text-[15px] px-8 py-4 rounded-[4px] hover:bg-[#0F5654] transition-colors"
          >
            {data.cta}
          </Link>
        </div>

      </div>
    </section>
  );
}
