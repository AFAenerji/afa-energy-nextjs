"use client";

import { useState } from "react";
import Link from "next/link";
import type { DecisionData } from "@/types/homepage";

type Props = {
  data: DecisionData;
  locale: string;
};

export default function DecisionInterface({ data, locale }: Props) {
  const [selectedId, setSelectedId] = useState<string>("investor");

  const ctaText =
    typeof data.cta === "object"
      ? data.cta[selectedId as keyof typeof data.cta] || data.cta.default
      : data.cta;

  return (
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">

        {/* Signature Bar */}
        <div className="w-16 h-[3px] bg-[#FFCB00] mb-8 rounded-sm mx-auto" />

        <h2 className="text-2xl font-bold text-[#0B1F1E] tracking-tight mb-3 text-center">
          {data.title}
        </h2>
        <p className="text-base text-[#5A5A5A] text-center mb-12">
          İhtiyacınıza göre doğru başlangıç noktasını seçin.
        </p>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.cards.map((card) => {
            const isInvestor = card.type === "investor";
            const isSelected = selectedId === card.type;

            return (
              <button
                key={card.type}
                type="button"
                onClick={() => setSelectedId(card.type)}
                className={`
                  relative text-left p-8 rounded-lg flex flex-col
                  transition-all duration-300 cursor-pointer
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18625F]
                  ${isInvestor
                    ? "border-2 border-[#18625F] bg-white shadow-md"
                    : "border border-gray-300 bg-white shadow-sm"
                  }
                  ${isSelected ? "ring-2 ring-[#FFCB00] ring-offset-2" : ""}
                `}
              >
                {/* Badge */}
                <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
                  isInvestor
                    ? "bg-[#18625F]/10 text-[#18625F]"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {isInvestor ? "Öncelikli" : "İkincil"}
                </span>

                <h3 className={`tracking-tight mb-3 ${
                  isInvestor
                    ? "text-xl font-extrabold text-[#18625F]"
                    : "text-lg font-semibold text-gray-700"
                }`}>
                  {card.title}
                </h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  {card.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic CTA */}
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/contact?role=${selectedId}`}
            className="inline-flex items-center justify-center bg-[#18625F] text-white font-semibold text-[15px] px-8 py-4 rounded-lg hover:bg-[#0F5654] transition-colors"
          >
            {ctaText}
          </Link>
        </div>

      </div>
    </section>
  );
}
