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
    <>
      <section
        className="closing-lock relative w-full py-20 lg:py-24 dark-section"
        style={{ isolation: "isolate", backgroundColor: "#0F2E2C" }}
      >
        {/* Background layer — gradient without affecting text */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,46,44,0) 0%, rgba(15,46,44,0.4) 100%)",
          }}
        />

        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center">
            <div className="h-px w-full bg-white/10" />
            <div className="mt-3 h-[3px] w-16 bg-[#FFCB00]" />
          </div>

          <header className="mx-auto max-w-4xl text-center">
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]"
              style={{ color: "#FFFFFF" }}
            >
              {title}
            </h2>
            <p
              className="mt-6 text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              {subtitle}
            </p>
          </header>

          <div className="mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {items.slice(0, 3).map((label, idx) => (
                <div
                  key={`${label}-${idx}`}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-6 py-10 text-center"
                >
                  <div className="mx-auto h-[2px] w-12 bg-[#FFCB00]" />
                  <p
                    className="mt-6 text-sm md:text-base font-semibold"
                    style={{ color: "rgba(255,255,255,0.92)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <footer className="mx-auto mt-16 max-w-4xl border-t border-white/10 pt-8 text-center">
            <p
              className="text-xs md:text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              {disclaimer}
            </p>
          </footer>
        </div>
      </section>

      {/* Scoped CSS — prevent global typography leakage */}
      <style>{`
        .closing-lock,
        .closing-lock h2,
        .closing-lock p,
        .closing-lock span {
          color: inherit !important;
        }
      `}</style>
    </>
  );
}
