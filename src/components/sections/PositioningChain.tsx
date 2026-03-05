"use client";

import { useState } from "react";
import type { PositioningChainData } from "@/types/homepage";

type Props = {
  data: PositioningChainData;
};

export default function PositioningChain({ data }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-afa-neutral-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        
        {/* Header Left-Aligned */}
        <div className="max-w-xl mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-afa-accent mb-3">
            METODOLOJİ
          </p>
          <h2 className="text-3xl font-bold text-afa-deep tracking-tight mb-4">
            {data.title}
          </h2>
          <p className="text-base text-afa-neutral-500 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* 4-Column Dashed Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative">
          {data.cards.map((card, index) => {
            const isHighlighted = hoveredIndex !== null && index <= hoveredIndex;

            return (
              <div key={card.id} className="relative flex flex-col">
                {/* Dashed Connector (Desktop Only) */}
                {index < data.cards.length - 1 && (
                  <div className={`hidden xl:block absolute top-10 -right-3 w-6 border-t-2 border-dashed z-10 transition-colors duration-300 ${
                    hoveredIndex !== null && index < hoveredIndex
                      ? "border-afa-gold"
                      : "border-gray-300"
                  }`} />
                )}

                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`bg-white rounded-lg p-6 lg:p-8 flex flex-col flex-grow transition-colors duration-300 ${
                    isHighlighted
                      ? "border-2 border-afa-gold shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                      : "border border-afa-border"
                  }`}
                >
                  {/* Step Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isHighlighted
                        ? "bg-afa-gold text-afa-deep"
                        : "bg-afa-primary/10 text-afa-primary"
                    }`}>
                      {index + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-afa-accent uppercase tracking-wider">
                      {card.id}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-afa-deep leading-snug tracking-tight whitespace-normal mb-3 min-h-[64px]">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm text-afa-neutral-600 leading-relaxed flex-grow">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
