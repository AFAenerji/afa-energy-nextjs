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

  return (
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full">

        {/* Signature Bar */}
        <div className="w-16 h-[3px] bg-afa-gold mb-8 rounded-sm mx-auto" />

        <h2 className="text-2xl font-bold text-afa-deep tracking-tight mb-3 text-center">
          {data.title}
        </h2>
        <p className="text-base text-afa-neutral-600 text-center mb-12">
          İhtiyacınıza göre doğru başlangıç noktasını seçin.
        </p>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.cards.map((card) => {
            const isInvestor = card.type === "investor";
            const isSelected = selectedId === card.type;
            const cardCtaText =
              typeof data.cta === "object"
                ? data.cta[card.type as keyof typeof data.cta] || data.cta.default
                : data.cta;

            return (
              <div
                key={card.type}
                onClick={() => setSelectedId(card.type)}
                className={`
                  relative text-left p-8 rounded-lg flex flex-col
                  transition-colors duration-300 cursor-pointer
                  ${isInvestor
                    ? "border-2 border-afa-primary bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                    : "border border-gray-300 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                  }
                  ${isSelected ? "ring-2 ring-afa-gold ring-offset-2" : ""}
                `}
              >
                {/* Premium Badge (Investor only) */}
                {isInvestor && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-afa-gold text-afa-deep">
                    Premium
                  </span>
                )}

                {/* Role Badge */}
                <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
                  isInvestor
                    ? "bg-afa-primary/10 text-afa-primary"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {isInvestor ? "Öncelikli" : "İkincil"}
                </span>

                <h3 className={`tracking-tight mb-3 ${
                  isInvestor
                    ? "text-xl font-extrabold text-afa-primary"
                    : "text-lg font-semibold text-gray-700"
                }`}>
                  {card.title}
                </h3>
                <p className="text-sm text-afa-neutral-600 leading-relaxed mb-6 flex-grow">
                  {card.description}
                </p>

                {/* In-Card CTA */}
                <Link
                  href={`/${locale}/contact?role=${card.type}`}
                  className={`inline-flex items-center justify-center w-full rounded-lg px-6 py-3 text-[15px] font-bold transition-colors ${
                    isInvestor
                      ? "bg-afa-gold text-afa-deep afa-cta-gold"
                      : "border-2 border-afa-primary text-afa-primary bg-transparent hover:bg-afa-primary hover:text-white"
                  }`}
                >
                  {cardCtaText}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Dynamic Status Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-afa-neutral-600 leading-relaxed max-w-2xl mx-auto">
            <span className="inline-block w-2 h-2 rounded-full bg-afa-gold mr-2 align-middle" />
            {selectedId === "investor"
              ? "Yatırımcı olarak devam ediyorsunuz: Teknik değerlendirme, Yatırım Komitesi standartlarına göre özelleştirilecektir."
              : "Geliştirici olarak devam ediyorsunuz: Teknik kontrol, yatırımcı sunumu öncesi güvenilirlik odaklı hazırlanacaktır."}
          </p>
        </div>

      </div>
    </section>
  );
}
