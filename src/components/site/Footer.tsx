'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Locale, getTranslation } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const router = useRouter();
  const t = (key: keyof import('@/lib/i18n').Translations) => getTranslation(locale, key);

  const handleNavigation = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  const navigationLinks = [
    { key: 'home', path: '/' },
    { key: 'investorGate', path: '/investor' },
    { key: 'developerArea', path: '/developer' },
    { key: 'services', path: '/services' },
    { key: 'cases', path: '/cases' },
    { key: 'about', path: '/about' },
    { key: 'faq', path: '/faq' },
    { key: 'reachUs', path: '/contact' },
  ];

  return (
    <footer className="bg-primary text-white mt-[60px]" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        {/* Desktop: 3 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 desktop:grid-cols-[1.3fr_1fr_1fr] gap-5 desktop:gap-7">
          
          {/* COLUMN 1: Corporate Identity & Slogans */}
          <div className="space-y-4">
            {/* Logo + Brand Name */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-[4px] overflow-hidden bg-accent flex items-center justify-center">
                <Image
                  src="/images/afa_beyaz.png"
                  alt="AFA Energy Romania"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <div>
                <h3 className="font-bold text-[13px] leading-tight">
                  {t('companyName')}
                </h3>
              </div>
            </div>

            {/* MAIN MOTTO */}
            <div>
              <p className="font-extrabold text-base leading-tight">
                {t('motto')}
              </p>
            </div>

            {/* Value Slogan */}
            <div>
              <p className="font-bold text-sm leading-tight opacity-95">
                {t('valueSlogan')}
              </p>
            </div>

            {/* Finance Slogan - Short Version */}
            <div>
              <p className="text-[13px] opacity-90 max-w-[44ch]">
                {t('financeSlogan')}
              </p>
            </div>

            {/* Footer Blurb */}
            <div>
              <p className="text-[13px] opacity-90">
                {t('footerBlurb')}
              </p>
            </div>
          </div>

          {/* COLUMN 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm">
              {t('technicalServices')}
            </h4>
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavigation(link.path)}
                  className="block text-[13px] opacity-[0.92] hover:opacity-100 hover:underline text-left"
                >
                  {t(link.key as keyof import('@/lib/i18n').Translations)}
                </button>
              ))}
            </div>
          </div>

          {/* COLUMN 3: Contact Section */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm">
              {t('contact')}
            </h4>

            {/* Forms Only Policy Box */}
            <div className="border-t border-white/10 border-b border-white/10 py-2 my-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📋</span>
                <p className="text-xs font-semibold opacity-95">
                  {t('formsOnlyPolicy')}
                </p>
              </div>
            </div>

            {/* Full Address */}
            <div className="space-y-1 text-xs opacity-92 leading-[1.7]">
              <p>{t('addressLine1')}</p>
              <p>{t('addressLine2')}</p>
              <p>{t('addressLine3')}</p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap gap-2.5 mt-2.5">
              {/* Button 1: Primary */}
              <button
                onClick={() => handleNavigation('/contact')}
                className="footer-primary-btn font-extrabold px-3 py-2.5 rounded-[4px]"
              >
                {t('contactForm')}
              </button>

              {/* Button 2: Secondary */}
              <button
                onClick={() => handleNavigation('/investor/intake')}
                className="footer-secondary-btn font-extrabold px-3 py-2.5 rounded-[4px]"
              >
                {t('investorIntake')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-white/14">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex flex-col desktop:flex-row justify-between items-center text-xs opacity-[0.92] gap-2">
            {/* Left Side */}
            <div>
              <span>{t('companyName')}</span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavigation('/privacy')}
                className="hover:underline"
              >
                {t('privacyPolicy')}
              </button>
              <span className="opacity-70 px-2">|</span>
              <button
                onClick={() => handleNavigation('/terms')}
                className="hover:underline"
              >
                {t('terms')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
