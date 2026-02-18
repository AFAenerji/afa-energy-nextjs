'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { IntroData } from "@/types/homepage";

const DEFAULT_BULLETS = [
  "Şebeke Bağlantı Zekası",
  "Yatırımcı Tarafı Model",
  "Yatırım Komitesi Uyumlu Raporlama",
];

const DEFAULT_ICONS = [
  "/images/grid-intelligence.png",
  "/images/investor-model.png",
  "/images/compliant-reporting.png",
];

type Props = {
  data: IntroData;
};

export default function IntroductoryStatement({ data }: Props) {
  const bullets = data.bullets || DEFAULT_BULLETS;
  const icons = data.icons || DEFAULT_ICONS;
  const items = bullets.map((label, i) => ({
    label,
    image: icons[i] || DEFAULT_ICONS[i] || DEFAULT_ICONS[0],
  }));
  
  // Limiting to top 2 paragraphs for concise impact
  const paragraphs = data.paragraphs?.slice(0, 2) || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to target block on click
  const scrollToBlock = (index: number) => {
    blocksRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    if (!paragraphs.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible?.target) return;

        const idx = Number((visible.target as HTMLElement).getAttribute("data-index"));
        setActiveIndex(idx);
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-25% 0px -45% 0px",
      }
    );

    blocksRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [paragraphs.length]);

  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full">
        
        {/* Transition Bridge */}
        <div className="mb-12">
          <div className="h-px w-full bg-[#E0E0E0]" />
          <div className="mt-3 h-[3px] w-16 bg-[#FFCB00]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE - Sticky on Desktop, Tab Bar on Mobile */}
          <div className="lg:col-span-5 min-w-0 relative">
            <div className="lg:sticky lg:top-28 z-20 bg-white">
              <div className="h-[3px] w-16 bg-[#FFCB00] rounded-sm mb-8" />
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0B1F1E] leading-tight mb-8 lg:mb-12">
                {data.heading}
              </h2>

              <nav 
                ref={navRef}
                className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 gap-6 lg:gap-5 border-b lg:border-none border-gray-100"
                aria-label="Value Proposition Selection"
              >
                <ul className="flex lg:flex-col gap-6 lg:gap-5">
                  {items.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <li key={idx} className="shrink-0 lg:shrink">
                        <button
                          onClick={() => scrollToBlock(idx)}
                          className="flex items-center lg:items-start gap-3 pb-4 lg:pb-0 whitespace-nowrap lg:whitespace-normal group outline-none"
                        >
                          {/* Mobile Thumbnail */}
                          <div className="lg:hidden relative w-6 h-6 shrink-0 rounded-sm overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.label}
                              fill
                              sizes="24px"
                              priority
                              className="object-contain"
                            />
                          </div>
                          <span
                            className={`hidden lg:block mt-2 h-[2px] transition-all duration-300 ${
                              isActive ? "w-10 bg-[#FFCB00]" : "w-5 bg-[#E0E0E0]"
                            }`}
                          />
                          <span
                            className={`text-sm lg:text-base transition-all duration-300 ${
                              isActive 
                                ? "text-[#0B1F1E] font-bold border-b-2 border-[#FFCB00] lg:border-none pb-1 lg:pb-0" 
                                : "text-[#667085] font-medium hover:text-[#0B1F1E]"
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Visual Metadata Area - Desktop Only */}
              <div className="hidden lg:block mt-12 relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#E0E0E0]">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      idx === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(min-width: 1024px) 400px, 0px"
                      priority={idx === 0}
                      className="object-contain p-6"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Focused Reading Content */}
          <div className="lg:col-span-7 min-w-0">
            <div className="space-y-20 lg:space-y-32">
              {paragraphs.map((text, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => { blocksRef.current[index] = el; }}
                  className={`transition-opacity duration-700 scroll-mt-48 ${
                    index === activeIndex ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <p className="text-lg lg:text-xl leading-[1.8] text-[#374151] max-w-[600px] break-words">
                    {text}
                  </p>
                </div>
              ))}
              <div className="h-[20vh] hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
