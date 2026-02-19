'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import type { IntroData } from "@/types/homepage";

type Props = {
  data: IntroData;
};

export default function IntroductoryStatement({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = data.cards || [];
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setCardRef = useCallback((el: HTMLElement | null, idx: number) => {
    cardRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [cards.length]);

  const scrollToCard = (idx: number) => {
    setActiveIndex(idx);
    cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="w-full bg-white py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full">

        {/* Signature Header & Gold Bar */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="h-[3px] w-16 bg-[#FFCB00] mx-auto mb-8 rounded-sm" />
          <h2 className="text-3xl lg:text-5xl font-extrabold text-[#0B1F1E] tracking-tight max-w-3xl mx-auto leading-tight">
            Yatırım Öncesi Teknik ve Ticari Netlik
          </h2>
          <p className="text-lg text-[#374151] mt-6 max-w-2xl mx-auto leading-relaxed">
            Romanya pazarında projenin gerçek değeri, kâğıt üzerindeki kurgusu ile şebekenin fiilî kapasitesinin uyumuna bağlıdır.
          </p>
        </div>

        {/* 12-Column Sticky + Focus Mode Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left Column (5/12): Sticky Navigation */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <nav className="flex flex-col gap-6 mb-10">
              {cards.map((card, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  className="group flex items-center gap-4 text-left transition-all duration-300"
                >
                  {/* Expanding Gold Bar */}
                  <div
                    className={`h-[3px] rounded-sm transition-all duration-300 ${
                      activeIndex === idx
                        ? "w-16 bg-[#FFCB00]"
                        : "w-10 bg-[#E0E0E0] group-hover:w-16 group-hover:bg-[#FFCB00]/60"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
                      activeIndex === idx
                        ? "text-[#0B1F1E]"
                        : "text-[#999999] group-hover:text-[#0B1F1E]"
                    }`}
                  >
                    {card.title}
                  </span>
                </button>
              ))}
            </nav>

            {/* Methodology Card */}
            <div className="hidden lg:block rounded-xl border border-[#E0E0E0] bg-[#F5F5F5] p-6">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#28AFB0] mb-2">
                METODOLOJİ
              </p>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                Her değerlendirme, şebeke verisi, maliyet analizi ve bağımsız risk modellemesi üzerine kuruludur.
              </p>
            </div>
          </div>

          {/* Right Column (7/12): Focus Mode Content */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {cards.map((card, idx) => (
              <article
                key={idx}
                ref={(el) => setCardRef(el, idx)}
                aria-label={card.title}
                className={`rounded-2xl border p-8 transition-all duration-500 ${
                  activeIndex === idx
                    ? "border-[#18625F]/20 bg-white shadow-lg opacity-100 scale-100"
                    : "border-gray-100 bg-gray-50/50 opacity-50 scale-[0.98] hover:opacity-70"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      activeIndex === idx
                        ? "bg-[#FFCB00] text-[#0B1F1E]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <h3
                    className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                      activeIndex === idx ? "text-[#0B1F1E]" : "text-[#999999]"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <p
                  className={`text-base leading-relaxed transition-colors duration-300 ${
                    activeIndex === idx ? "text-[#667085]" : "text-[#999999]"
                  }`}
                >
                  {card.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
