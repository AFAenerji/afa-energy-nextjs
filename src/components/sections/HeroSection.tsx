import Image from "next/image";
import Link from "next/link";
import { Locale } from '@/lib/i18n';
import fs from 'fs';
import path from 'path';

interface HeroSectionProps {
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  // Load content from JSON structure
  const contentPath = path.join(process.cwd(), 'src', 'content', locale, 'homepage.json');
  const hero = JSON.parse(fs.readFileSync(contentPath, 'utf-8')).hero;

  return (
    <section className="relative min-h-[700px] lg:h-screen -mt-16 pt-16">
      {/* === MOBILE (<1024px): Image + Overlay + Centered Text === */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/images/hero-main_1200_1500_mobile.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/30" />
      </div>

      {/* Mobile Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[700px] px-6 lg:hidden">
        <div className="w-full max-w-xl text-center">
          <h1 className="text-white font-bold tracking-tight text-4xl leading-tight">
            {hero.motto}
          </h1>
          <p className="mt-6 text-white/95 text-lg leading-relaxed">
            {hero.supporting}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex justify-center items-center w-full sm:w-auto rounded-[4px] bg-[#FFCB00] px-6 py-3.5 text-[#18625F] font-bold border border-[#FFCB00] transition-none hover:bg-[#e6b800]"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}/investor-profile`}
              className="inline-flex justify-center items-center w-full sm:w-auto rounded-[4px] bg-transparent px-6 py-3.5 text-white font-bold border border-[#FFCB00] transition-none hover:bg-[#FFCB00] hover:text-[#18625F]"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>
      </div>

      {/* === DESKTOP (>=1024px): Image left, Panel absolute right === */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/hero-main_2560_1100.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-left"
          quality={90}
        />
        {/* Corporate Turquoise Triangle Overlay */}
        <div
          className="absolute inset-0 bg-[#18625F]/80"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 40% 100%)' }}
        />
      </div>

      {/* Desktop Panel — lower right corner */}
      <div className="hidden lg:block absolute right-0 bottom-20 z-10 w-[650px]">
        <div className="bg-white/95 p-16 rounded-[4px] border border-gray-200 border-l-[4px] border-l-[#FFCB00]">
          <h1 className="text-slate-900 font-bold tracking-tight text-6xl leading-tight">
            {hero.motto}
          </h1>
          <p className="mt-8 text-slate-700 text-2xl leading-relaxed">
            {hero.supporting}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex justify-center items-center rounded-[4px] bg-[#FFCB00] px-6 py-3.5 text-[#18625F] font-bold border border-[#FFCB00] transition-none hover:bg-[#e6b800]"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}/investor-profile`}
              className="inline-flex justify-center items-center rounded-[4px] bg-transparent px-6 py-3.5 text-[#0B1F1E] font-bold border border-[#FFCB00] transition-none hover:bg-[#FFCB00] hover:text-[#18625F]"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
