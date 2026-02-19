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
    <section className="w-full bg-[#0F2E2C] py-20 lg:py-24 dark-section">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-center">
          <div className="h-px w-full bg-white/10" />
          <div className="mt-3 h-[3px] w-16 bg-[#FFCB00]" />
        </div>

        <header className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
            {title}
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-white/80">
            {subtitle}
          </p>
        </header>

        <div className="mt-14">
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {items.slice(0, 3).map((label, idx) => (
              <div
                key={`${label}-${idx}`}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-6 py-10 text-center"
              >
                <div className="mx-auto h-[2px] w-12 bg-[#FFCB00]" />
                <p className="mt-6 text-sm md:text-base font-semibold text-white/90">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mx-auto mt-16 max-w-4xl border-t border-white/10 pt-8 text-center">
          <p className="text-xs md:text-sm leading-relaxed text-white/60">
            {disclaimer}
          </p>
        </footer>
      </div>
    </section>
  );
}
