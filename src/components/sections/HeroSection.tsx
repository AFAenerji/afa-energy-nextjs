import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { HeroData } from "@/types/homepage";

type Props = {
  data: HeroData;
  locale: Locale;
};

export default function HeroSection({ data, locale }: Props) {
  // Routes based on locale
  const hrefPrimary = `/${locale}/developer`;
  const hrefSecondary = `/${locale}/investor`;

  return (
    <section className="w-full scroll-mt-[72px]">
      {/* --- MOBILE LAYOUT (<1024px) --- */}
      {/* Design: Stacked. Image on top, Content in white block below. */}
      <div className="lg:hidden flex flex-col">
        {/* 1. Mobile Image Area */}
        <div className="relative h-[400px] w-full">
          <Image
            src="/images/hero-main_1200_1500_mobile.jpg"
            alt="AFA Energy hero"
            fill
            priority
            className="object-cover object-[70%_40%]"
          />
        </div>

        {/* 2. White Content Block */}
        <div className="bg-white px-6 py-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#18625F] leading-tight">
            {data.motto}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#3A3A3A]">
            {data.subhead}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={hrefPrimary}
              className="inline-flex w-full items-center justify-center rounded-md bg-[#FFCB00] px-5 py-3 text-sm font-bold text-black shadow-sm active:scale-[0.98] transition-transform"
            >
              {data.primaryCta}
            </Link>
            <Link
              href={hrefSecondary}
              className="inline-flex w-full items-center justify-center rounded-md border-2 border-[#18625F] bg-white px-5 py-3 text-sm font-bold text-[#18625F] active:scale-[0.98] transition-transform"
            >
              {data.secondaryCta}
            </Link>
          </div>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT (≥1024px) --- */}
      {/* Design: Full width image with floating card on the right */}
      <div className="relative hidden lg:block h-[600px] w-full">
        <Image
          src="/images/hero-main_2560_1100.jpg"
          alt="AFA Energy hero"
          fill
          priority
          className="object-cover object-[70%_40%]"
        />
        {/* Subtle overlay for contrast */}
        <div className="pointer-events-none absolute inset-0 bg-black/15" />

        {/* Content Card Positioned Right */}
        <div className="absolute inset-y-0 right-0 flex w-[45%] min-w-[500px] items-center justify-center pr-12 pl-4">
          <div className="w-full rounded-lg bg-white/95 p-10 shadow-sm border border-[#E5E7EB] backdrop-blur-sm">
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-[#0B2E2D]">
              {data.motto}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#3A3A3A]">
              {data.subhead}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href={hrefPrimary}
                className="inline-flex items-center justify-center rounded-md bg-[#FFCB00] px-8 py-3 text-base font-bold text-black hover:bg-[#E6B800] transition-colors"
              >
                {data.primaryCta}
              </Link>
              <Link
                href={hrefSecondary}
                className="inline-flex items-center justify-center rounded-md border-2 border-[#18625F] bg-transparent px-8 py-3 text-base font-bold text-[#18625F] hover:bg-[#18625F] hover:text-white transition-colors"
              >
                {data.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
