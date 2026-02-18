import { useEffect, useMemo, useRef, useState } from "react";
import type { IntroData } from "@/types/homepage";

type Props = {
  data: IntroData;
};

export default function IntroductoryStatement({ data }: Props) {
  const bullets = useMemo(
    () =>
      data.bullets || [
        "Şebeke Bağlantı Zekası",
        "Yatırımcı Tarafı Model",
        "Yatırım Komitesi Uyumlu Raporlama",
      ],
    [data.bullets]
  );

  const paragraphs = useMemo(() => data.paragraphs || [], [data.paragraphs]);
  const itemCount = Math.min(bullets.length, paragraphs.length || bullets.length);
  const [activeIndex, setActiveIndex] = useState(0);
  const blocksRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!paragraphs.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        const topMost = visible.reduce((prev, curr) => {
          const prevTop = (prev.target as HTMLElement).getBoundingClientRect().top;
          const currTop = (curr.target as HTMLElement).getBoundingClientRect().top;
          return currTop < prevTop ? curr : prev;
        });

        const indexAttr = (topMost.target as HTMLElement).getAttribute("data-index");
        const idx = indexAttr ? Number(indexAttr) : 0;
        const safeIdx = Math.max(0, Math.min(idx, bullets.length - 1));
        setActiveIndex(safeIdx);
      },
      {
        threshold: 0.4,
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    blocksRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [paragraphs.length, bullets.length]);

  return (
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full">
        {/* Transition Line */}
        <div className="mb-12">
          <div className="h-px w-full bg-[#E0E0E0]" />
          <div className="mt-3 h-[3px] w-16 bg-[#FFCB00]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Sticky Content */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-3xl font-bold text-[#0B1F1E] leading-tight mb-8">
                {data.heading}
              </h2>

              <div className="flex flex-col gap-6">
                {bullets.slice(0, itemCount).map((label: string, idx: number) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div key={idx} className="flex gap-4 items-start">
                      <span
                        className={`mt-2 h-[2px] w-10 shrink-0 transition-colors duration-300 ${
                          isActive ? "bg-[#FFCB00]" : "bg-[#E0E0E0]"
                        }`}
                      />
                      <span
                        className={`text-base leading-relaxed transition-colors duration-300 ${
                          isActive ? "text-[#0B1F1E] font-semibold" : "text-[#667085]"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Flowing Content */}
          <div className="lg:col-span-7 lg:pt-2">
            <div className="space-y-10">
              {paragraphs.map((text, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => {
                    blocksRef.current[index] = el;
                  }}
                  className="scroll-mt-40"
                >
                  <p className="text-lg leading-relaxed text-[#475467]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
