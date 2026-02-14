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
    <section className="relative h-[calc(100vh-64px)] overflow-hidden">
      {/* --- MOBILE BACKGROUND (<1024px) --- */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/images/hero-main_1200_1500_mobile.jpg"
          alt="" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Dark overlay for text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/30" />
      </div>

      {/* --- DESKTOP BACKGROUND (>=1024px) --- */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/hero-main_2560_1100.jpg"
          alt="" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-[20%_center]"
          quality={90}
        />
      </div>

      {/* --- CONTENT LAYER (absolute overlay) --- */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto max-w-7xl w-full px-6">
          
          {/* Text Container: centered on mobile, right-aligned on desktop */}
          <div className="w-full max-w-xl mx-auto lg:mr-0 lg:ml-auto lg:max-w-2xl">
            
            {/* AUDIT REPORT PANEL (Desktop Only): 
                - White background (95% opacity)
                - No Blur
                - Left Yellow Accent Border (Corporate Identity)
                - Thin Gray Border
            */}
            <div className="p-6 lg:bg-white/95 lg:p-10 lg:rounded-[4px] lg:border lg:border-gray-200 lg:border-l-[4px] lg:border-l-[#FFCB00] lg:shadow-none">
              
              {/* Motto */}
              <h1 className="text-white lg:text-slate-900 font-bold tracking-tight text-4xl lg:text-6xl leading-tight text-center lg:text-left">
                {hero.motto}
              </h1>

              {/* Subhead */}
              <p className="mt-6 text-white/95 lg:text-slate-700 text-lg lg:text-xl leading-relaxed text-center lg:text-left">
                {hero.supporting}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center lg:justify-start">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex justify-center items-center w-full sm:w-auto rounded-[4px] bg-[#FFCB00] px-6 py-3.5 text-[#18625F] font-bold border border-[#FFCB00] transition-none hover:bg-[#e6b800]"
                >
                  {hero.primaryCta}
                </Link>

                <Link
                  href={`/${locale}/investor-profile`}
                  className="inline-flex justify-center items-center w-full sm:w-auto rounded-[4px] bg-transparent px-6 py-3.5 text-white lg:text-[#0B1F1E] font-bold border border-[#FFCB00] transition-none hover:bg-[#FFCB00] hover:text-[#18625F]"
                >
                  {hero.secondaryCta}
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
