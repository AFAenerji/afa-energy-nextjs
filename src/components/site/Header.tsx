'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Locale, getTranslation } from '@/lib/i18n';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const t = (key: keyof import('@/lib/i18n').Translations) => getTranslation(locale, key);

  const handleNavigation = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-24 bg-white border-b border-[#E0E0E0] shadow-[0_10px_30px_rgba(0,0,0,0.12)] relative">
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#28AFB0]"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo + Brand Name */}
            <a 
              href={`/${locale}`}
              className="h-full flex items-center gap-3 no-underline"
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
                <Image
                  src="/images/afa_1.png"
                  alt="AFA Energy Romania"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight whitespace-nowrap">AFA Energy Romania</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => handleNavigation('/investor')}
                className="flex items-center justify-center h-10 text-base font-semibold leading-none text-[#0B1F1E] border-2 border-[#28AFB0] px-4 rounded-[4px] hover:bg-[#28AFB0] hover:text-white transition-all duration-200"
              >
                {t('investor')}
              </button>
              <button
                onClick={() => handleNavigation('/developer')}
                className="flex items-center justify-center h-10 text-base font-semibold leading-none text-[#0B1F1E] border-2 border-[#FFCB00] px-4 rounded-[4px] hover:bg-[#FFCB00] hover:text-[#0B1F1E] transition-all duration-200"
              >
                {t('developer')}
              </button>
              <button
                onClick={() => handleNavigation('/services')}
                className="flex items-center justify-center h-10 text-base font-semibold leading-none text-[#0B1F1E] hover:text-[#18625F] transition-all duration-200"
              >
                {t('services')}
              </button>
              <button
                onClick={() => handleNavigation('/cases')}
                className="flex items-center justify-center h-10 text-base font-semibold leading-none text-[#0B1F1E] hover:text-[#18625F] transition-all duration-200 pointer-events-none opacity-50 cursor-not-allowed"
              >
                {t('cases')}
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="flex items-center justify-center h-10 text-base font-semibold leading-none text-[#0B1F1E] hover:text-[#18625F] transition-all duration-200"
              >
                {t('about')}
              </button>
              <button
                onClick={() => handleNavigation('/info')}
                className="flex items-center justify-center h-10 text-base font-semibold leading-none text-[#0B1F1E] hover:text-[#18625F] transition-all duration-200 pointer-events-none opacity-50 cursor-not-allowed"
              >
                {t('info')}
              </button>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="hidden md:flex items-center h-full">
                <div className="flex items-center border border-[#E0E0E0] rounded-[4px] p-1">
                  {['tr', 'en', 'ro'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => router.push(`/${lang}`)}
                      className={`px-3 py-1 text-sm font-medium rounded-[2px] transition-colors duration-200 ${
                        locale === lang 
                          ? 'bg-[#18625F] text-white' 
                          : 'text-[#666666] hover:text-[#18625F]'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA Button */}
              <button
                onClick={() => handleNavigation('/contact')}
                className="flex items-center justify-center h-10 px-5 bg-[#18625F] text-white border-2 border-[#18625F] rounded-[4px] text-base font-semibold leading-none hover:bg-white hover:text-[#18625F] transition-all duration-200"
              >
                {t('contact')}
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-[#0B1F1E]"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-center">
                  <span className={`block h-0.5 w-full bg-[#0B1F1E] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-[#0B1F1E] transition-all duration-300 my-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-[#0B1F1E] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        locale={locale}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
