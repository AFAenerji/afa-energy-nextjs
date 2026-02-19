import Image from 'next/image';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = (key: keyof import('@/lib/i18n').Translations) => getTranslation(locale, key);

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
    <>
      {/* Style block — freeze footer color context */}
      <style>{`
        .footer-lock,
        .footer-lock h4,
        .footer-lock p,
        .footer-lock span,
        .footer-lock address {
          color: inherit !important;
        }
        .footer-lock .footer-link {
          color: rgba(255,255,255,0.7) !important;
        }
        .footer-lock .footer-link:hover {
          color: #FFFFFF !important;
        }
        .footer-lock .footer-muted {
          color: rgba(255,255,255,0.3) !important;
        }
      `}</style>

      <footer
        className="dark-section footer-lock bg-[#0B2420] !text-white"
        role="contentinfo"
      >
        <div className="mx-auto max-w-6xl px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

            {/* Brand col */}
            <div>
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
                <span className="font-bold text-sm !text-white">{t('companyName')}</span>
              </div>
              <p className="text-lg font-bold !text-white leading-snug">
                {t('motto')}
              </p>
              <p className="text-sm !text-white/70 mt-1">
                {t('valueSlogan')}
              </p>
              <p className="text-sm !text-white/50 leading-relaxed mt-4">
                {t('financeSlogan')}
              </p>
            </div>

            {/* Nav col */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] !text-white/40 uppercase mb-5">
                {t('technicalServices')}
              </h4>
              <nav className="flex flex-col gap-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={`/${locale}${link.path}`}
                    className="footer-link text-sm !text-white/70 hover:!text-white py-1"
                  >
                    {t(link.key as keyof import('@/lib/i18n').Translations)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact col */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] !text-white/40 uppercase mb-5">
                {t('contact')}
              </h4>
              <address className="not-italic text-sm !text-white/60 leading-relaxed">
                {t('addressLine1')}<br />
                {t('addressLine2')}<br />
                {t('addressLine3')}
              </address>
              <Link
                href={`/${locale}/contact`}
                className="text-sm text-[#28AFB0] hover:!text-white mt-4 inline-block"
              >
                {t('contactForm')} →
              </Link>
            </div>

            {/* CTA col */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] !text-white/40 uppercase mb-5">
                {t('investorIntake')}
              </h4>
              <Link
                href={`/${locale}/developer`}
                className="w-full bg-[#FFCB00] !text-[#0B1F1E] font-semibold text-sm px-5 py-3 rounded-[4px] text-center block"
              >
                {t('contactForm')}
              </Link>
              <Link
                href={`/${locale}/investor`}
                className="w-full mt-3 border border-white/20 !text-white font-semibold text-sm px-5 py-3 rounded-[4px] text-center block hover:border-white/50"
              >
                {t('investorGate')}
              </Link>
              <p className="footer-muted mt-5 text-xs !text-white/30 leading-relaxed">
                {t('formsOnlyPolicy')}
              </p>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="footer-muted text-xs !text-white/30">
              {t('companyName')}
            </p>
            <div className="flex gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="footer-muted text-xs !text-white/30 hover:!text-white/60"
              >
                {t('privacyPolicy')}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="footer-muted text-xs !text-white/30 hover:!text-white/60"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
