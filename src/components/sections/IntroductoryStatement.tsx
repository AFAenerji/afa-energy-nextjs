'use client';

import React from "react";
import type { IntroData } from "@/types/homepage";

type Props = {
  data: IntroData;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function IntroductoryStatement({ data }: Props) {
  return (
    <section className="w-full bg-white py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        
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

        {/* 3-Card Investment-Grade Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          
          {/* CARD 1: GRID INTELLIGENCE */}
          <article 
            aria-label="Şebeke Bağlantı Zekası"
            className="group relative bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-500 hover:shadow-2xl hover:border-[#18625F]/30 hover:-translate-y-2 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#18625F]/5 flex items-center justify-center mb-8 group-hover:bg-[#FFCB00] transition-colors duration-500">
               <svg aria-hidden="true" className="w-7 h-7 text-[#18625F] group-hover:text-[#0B1F1E] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M13 10V3L4 14h7v7l9-11h-7z M2 12h20 M12 2v20 M4.93 4.93l14.14 14.14" opacity="0.8" />
                  <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
               </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0B1F1E] mb-4">Şebeke Bağlantı Zekası</h3>
            <p className="text-base text-[#667085] leading-relaxed flex-grow">
              Şebeke kapasitesi ve bağlantı maliyetlerinin proje değerine etkisini, ATR sürecinden önce analiz ederek finansal sürprizleri önleriz.
            </p>
          </article>

          {/* CARD 2: INVESTOR-SIDE MODEL (Highlight) */}
          <article 
            aria-label="Yatırımcı Tarafı Model"
            className="group relative bg-[#0F2E2C] rounded-2xl p-8 shadow-2xl md:-mt-6 md:mb-6 border border-[#FFCB00]/20 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-8">
              <div className="h-1.5 w-12 bg-[#FFCB00] rounded-b-md shadow-sm" />
            </div>
            <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFCB00] flex items-center justify-center mb-8 shadow-lg shadow-[#FFCB00]/20">
                <svg aria-hidden="true" className="w-7 h-7 text-[#0B1F1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2" />
                </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-4">Yatırımcı Tarafı Model</h3>
                <p className="text-base text-white/90 leading-relaxed">
                Teknik riskleri, geliştirici perspektifinden değil, doğrudan yatırımcının finansal modeline (IRR/NPV) etkileriyle değerlendiririz.
                </p>
            </div>
          </article>

          {/* CARD 3: COMPLIANT REPORTING */}
          <article 
            aria-label="Uyumlu Raporlama"
            className="group relative bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-500 hover:shadow-2xl hover:border-[#18625F]/30 hover:-translate-y-2 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#18625F]/5 flex items-center justify-center mb-8 group-hover:bg-[#FFCB00] transition-colors duration-500">
               <svg aria-hidden="true" className="w-7 h-7 text-[#18625F] group-hover:text-[#0B1F1E] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622" opacity="0.8" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
               </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0B1F1E] mb-4">Uyumlu Raporlama</h3>
            <p className="text-base text-[#667085] leading-relaxed flex-grow">
              Bulguları, uluslararası fonların yatırım komitelerinin (IC) beklediği standartta, net ve banka finansmanına uygun bir formatta sunarız.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
