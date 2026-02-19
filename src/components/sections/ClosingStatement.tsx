import React from "react";

type ClosingStatementData = {
  title?: string;
  subtitle?: string;
  items?: string[];
  disclaimer?: string;
};

type Props = {
  data?: ClosingStatementData;
};

export default function ClosingStatement({ data }: Props) {
  const title = data?.title ?? "Yatırımdan Önce Netlik";
  const subtitle =
    data?.subtitle ??
    "Yatırım kararını etkileyen teknik varsayımları, yatırım komitesi seviyesinde okunabilir ve doğrulanabilir bir yapıya dönüştürürüz.";

  const items =
    data?.items ?? ["Tam Bağımsızlık", "Teknik Filtreleme", "Banka finansmanına uygunluk odağı"];

  const disclaimer =
    data?.disclaimer ??
    "Bu içerik teknik ve ticari değerlendirme rehberidir; resmî onay veya yatırım getirisi taahhüdü içermez.";

  return (
    <section className="relative w-full bg-white py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center">
          <div className="h-px w-full bg-[#E0E0E0]" />
          <div className="mt-3 h-[3px] w-16 bg-[#FFCB00]" />
        </div>

        <header className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-[#0B1F1E]">
            {title}
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[#475467]">
            {subtitle}
          </p>
        </header>

        <div className="mt-14">
          <div className="mx-auto grid w-fit grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
            {items.slice(0, 3).map((label, idx) => (
              <div
                key={`${label}-${idx}`}
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-6 py-10 text-center"
              >
                <div className="mx-auto h-[2px] w-12 bg-[#FFCB00]" />
                <p className="mt-6 text-sm md:text-base font-semibold tracking-tight text-[#0B1F1E] leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mx-auto mt-16 max-w-4xl border-t border-[#E5E7EB] pt-8 text-center">
          <p className="text-xs md:text-sm leading-relaxed text-[#667085]">
            {disclaimer}
          </p>
        </footer>
      </div>
    </section>
  );
}
