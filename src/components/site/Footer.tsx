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
    <footer className="bg-[#0B2420] text-white" role="contentinfo">
      <div className="mx-auto max-w-6xl px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Brand col */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-9 h-9 rounded-[4px] overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/afa_beyaz.png"
                  alt="AFA Energy Romania"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <span className="font-bold text-sm text-white">{t('companyName')}</span>
            </div>
            <p className="text-lg font-bold text-white leading-snug">
              {t('motto')}
            </p>
            <p className="text-sm text-white/70 mt-1">
              {t('valueSlogan')}
            </p>
            <p className="text-sm text-white/50 leading-relaxed mt-4">
              {t('financeSlogan')}
            </p>
          </div>

          {/* Nav col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.15em] text-white/40 uppercase mb-5">
              {t('technicalServices')}
            </h4>
            <nav className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavigation(link.path)}
                  className="text-sm text-white/70 hover:text-white py-1 text-left"
                >
                  {t(link.key as keyof import('@/lib/i18n').Translations)}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.15em] text-white/40 uppercase mb-5">
              {t('contact')}
            </h4>
            <address className="not-italic text-sm text-white/60 leading-relaxed">
              {t('addressLine1')}<br />
              {t('addressLine2')}<br />
              {t('addressLine3')}
            </address>
            <button
              onClick={() => handleNavigation('/contact')}
              className="text-sm text-[#28AFB0] hover:text-white mt-4 inline-block"
            >
              {t('contactForm')} →
            </button>
          </div>

          {/* CTA col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.15em] text-white/40 uppercase mb-5">
              {t('investorIntake')}
            </h4>
            <button
              onClick={() => handleNavigation('/developer')}
              className="w-full bg-[#FFCB00] text-black font-semibold text-sm px-5 py-3 rounded-[4px] text-center block"
            >
              {t('contactForm')}
            </button>
            <button
              onClick={() => handleNavigation('/investor')}
              className="w-full mt-3 border border-white/20 text-white font-semibold text-sm px-5 py-3 rounded-[4px] text-center block hover:border-white/50"
            >
              {t('investorGate')}
            </button>
            <p className="mt-5 text-xs text-white/30 leading-relaxed">
              {t('formsOnlyPolicy')}
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            {t('companyName')}
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => handleNavigation('/privacy')}
              className="text-xs text-white/30 hover:text-white/60"
            >
              {t('privacyPolicy')}
            </button>
            <button
              onClick={() => handleNavigation('/terms')}
              className="text-xs text-white/30 hover:text-white/60"
            >
              {t('terms')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
