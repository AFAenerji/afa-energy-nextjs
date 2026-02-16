'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Locale, getTranslation } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ locale, isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();
  const t = (key: keyof import('@/lib/i18n').Translations) => getTranslation(locale, key);

  const handleNavigation = (path: string) => {
    router.push(`/${locale}${path}`);
    onClose();
  };

  const [servicesOpen, setServicesOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div id="mobile-menu" className="absolute right-0 top-0 bottom-0 w-80 max-w-[92vw] bg-[#18625F] shadow-xl flex flex-col">
        {/* Top Section */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={onClose}
              className="text-white text-2xl font-bold hover:opacity-80"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Ghost Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleNavigation('/investor')}
              className="w-full text-left"
            >
              {t('investor')}
            </button>
            <button
              onClick={() => handleNavigation('/developer')}
              className="w-full text-left"
            >
              {t('developer')}
            </button>
          </div>

          {/* Services Accordion */}
          <div className="mb-4">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between w-full text-white hover:opacity-80"
            >
              <span>{t('services')}</span>
              <span className={`${servicesOpen ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>
            {servicesOpen && (
              <div className="mt-2 ml-4 space-y-2">
                <button
                  onClick={() => handleNavigation('/services/technical')}
                  className="text-white/90 hover:opacity-100 text-left w-full"
                >
                  {t('technicalServices')}
                </button>
                <button
                  onClick={() => handleNavigation('/services/faq')}
                  className="text-white/90 hover:opacity-100 text-left w-full"
                >
                  {t('faq')}
                </button>
              </div>
            )}
          </div>

          {/* Regular Links */}
          <div className="space-y-3">
            <button
              onClick={() => handleNavigation('/cases')}
              className="text-white/90 hover:opacity-100 text-left w-full"
            >
              {t('cases')}
            </button>
            <button
              onClick={() => handleNavigation('/about')}
              className="text-white/90 hover:opacity-100 text-left w-full"
            >
              {t('about')}
            </button>
            <button
              onClick={() => handleNavigation('/info')}
              className="text-white/90 hover:opacity-100 text-left w-full"
            >
              {t('info')}
            </button>
            <button
              onClick={() => handleNavigation('/contact')}
              className="text-white/90 hover:opacity-100 text-left w-full"
            >
              {t('contact')}
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-white/10">
          <p className="text-white/90 text-sm font-medium">
            {t('motto')}
          </p>
        </div>
      </div>
    </div>
  );
}
