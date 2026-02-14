'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Locale, getTranslation } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

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
      <header className="sticky top-0 z-50 bg-primary border-b border-white/[0.08] shadow-header">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Brand Name */}
            <a 
              href={`/${locale}`}
              className="flex items-center gap-3 no-underline"
            >
              <div className="relative w-10 h-10 rounded-[4px] overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/afa_beyaz.png"
                  alt="AFA Energy Romania"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="text-white font-bold text-lg font-heading">AFA Energy</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden desktop:flex items-center gap-6">
              {/* Ghost Buttons */}
              <button
                onClick={() => handleNavigation('/investor')}
                className="ghost-btn"
              >
                {t('investor')}
              </button>
              <button
                onClick={() => handleNavigation('/developer')}
                className="ghost-btn"
              >
                {t('developer')}
              </button>

              {/* Regular Links */}
              <button
                onClick={() => handleNavigation('/services')}
                className="text-white hover:opacity-80"
              >
                {t('services')}
              </button>
              <button
                onClick={() => handleNavigation('/cases')}
                className="text-white hover:opacity-80"
              >
                {t('cases')}
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="text-white hover:opacity-80"
              >
                {t('about')}
              </button>
              <button
                onClick={() => handleNavigation('/info')}
                className="text-white hover:opacity-80"
              >
                {t('info')}
              </button>
              <button
                onClick={() => handleNavigation('/contact')}
                className="text-white hover:opacity-80"
              >
                {t('contact')}
              </button>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="hidden desktop:block">
                <LanguageSwitcher currentLocale={locale} />
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="desktop:hidden text-white hover:opacity-80"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen ? 'true' : 'false'}
              >
                {/* Hamburger Icon */}
                <div className="w-6 h-5 flex flex-col justify-between">
                  <div className="h-0.5 bg-white"></div>
                  <div className="h-0.5 bg-white"></div>
                  <div className="h-0.5 bg-white"></div>
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
