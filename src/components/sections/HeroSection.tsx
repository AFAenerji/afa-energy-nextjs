import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { HeroData } from "@/types/homepage";

type Props = {
  data: HeroData;
  locale: Locale;
};

export default function HeroSection({ data, locale }: Props) {
  const hrefPrimary = `/${locale}/developer`;
  const hrefSecondary = `/${locale}/services`;

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden bg-white scroll-mt-[72px]">
      {/* --- MOBILE LAYOUT (<1024px) --- */}
      <div className="lg:hidden flex flex-col">
        <div className="relative h-[400px] w-full">
          <Image
            src="/images/hero-main_1200_1500_mobile.jpg"
            alt="Renewable energy infrastructure in Romania — AFA Energy Romania independent technical advisory"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_40%]"
          />
        </div>

        <div className="bg-white/95 backdrop-blur-sm px-6 py-10">
          <p className="text-xs font-bold tracking-[0.18em] text-[#28AFB0] uppercase mb-3">
            {data.tag}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0B1F1E]">
            {data.motto}
          </h1>
          <p className="mt-4 text-base leading-[1.6] text-[#3A3A3A]">
            {data.subhead}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={hrefPrimary}
              className="flex-1 inline-flex items-center justify-center rounded-md bg-[#FFCB00] px-5 py-3 text-sm lg:text-base font-bold text-black leading-tight hover:bg-[#E6B800] transition-colors no-underline"
            >
              {data.primaryCta}
            </Link>
            <Link
              href={hrefSecondary}
              className="flex-1 inline-flex items-center justify-center rounded-md border-2 border-[#18625F] bg-transparent px-5 py-3 text-sm lg:text-base font-semibold text-[#18625F] leading-tight hover:bg-[#18625F] hover:text-white transition-colors no-underline"
            >
              {data.secondaryCta}
            </Link>
          </div>

          <div className="mt-16 pt-4 border-t border-[#18625F]/15">
            <p className="text-xs text-slate-500 leading-relaxed">
              {data.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT (≥1024px) --- */}
      <div className="relative hidden lg:block h-[600px] w-full">
        <Image
          src="/images/hero-main_2560_1100.jpg"
          alt="Renewable energy infrastructure in Romania — AFA Energy Romania independent technical advisory"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_40%]"
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/15" />

        <div className="absolute inset-y-0 right-0 z-20 flex w-[40%] max-w-[580px] min-w-[480px] items-center justify-center pr-16 pl-4">
          <div className="w-full rounded-2xl bg-white/95 p-10 shadow-2xl backdrop-blur-sm">
            <p className="text-xs font-bold tracking-[0.18em] text-[#28AFB0] uppercase mb-4">
              {data.tag}
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.05] max-w-[760px] tracking-tight text-[#0B1F1E]">
              {data.motto}
            </h1>
            <p className="mt-5 text-lg leading-[1.6] max-w-[640px] text-[#3A3A3A]">
              {data.subhead}
            </p>
            <div className="mt-8 flex items-center gap-8">
              <Link
                href={hrefPrimary}
                className="flex-1 inline-flex items-center justify-center rounded-md bg-[#FFCB00] px-8 py-3 text-sm lg:text-base font-bold text-black leading-tight hover:bg-[#E6B800] transition-colors no-underline"
              >
                {data.primaryCta}
              </Link>
              <Link
                href={hrefSecondary}
                className="flex-1 inline-flex items-center justify-center rounded-md border-2 border-[#18625F] bg-transparent px-8 py-3 text-sm lg:text-base font-semibold text-[#18625F] leading-tight hover:bg-[#18625F] hover:text-white transition-colors no-underline"
              >
                {data.secondaryCta}
              </Link>
            </div>
            <div className="mt-16 pt-4 border-t border-[#18625F]/15">
              <p className="text-xs text-slate-500 leading-relaxed">
                {data.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
