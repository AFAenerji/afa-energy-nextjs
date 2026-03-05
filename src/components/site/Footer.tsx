import Image from 'next/image';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { getLocalizedSlug } from '@/lib/slugs';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = (key: keyof import('@/lib/i18n').Translations) => getTranslation(locale, key);
  const lp = (canonical: string) => `/${locale}/${getLocalizedSlug(canonical, locale) ?? canonical}`;

  const navigationLinks = [
    { key: 'investorGate', href: lp('investor') },
    { key: 'developerArea', href: lp('developer') },
    { key: 'services', href: lp('services') },
    { key: 'cases', href: lp('cases') },
    { key: 'about', href: lp('about') },
    { key: 'knowledgeCenter', href: lp('knowledge-center') },
    { key: 'reachUs', href: lp('contact') },
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
          color: rgba(255,255,255,0.85) !important;
        }
        .footer-lock .footer-link:hover {
          color: var(--yellow-accent) !important;
        }
        .footer-lock .footer-muted {
          color: rgba(255,255,255,0.3) !important;
        }
      `}</style>

      <footer
        className="dark-section footer-lock bg-afa-deep !text-white"
        role="contentinfo"
      >
        <div className="mx-auto max-w-6xl px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Col 1: Brand + Address */}
            <div>
              <Link href={`/${locale}`} aria-label="Ana Sayfaya Don" className="inline-block mb-6">
                <Image
                  src="/images/afa_beyaz.png"
                  alt="AFA Energy Romania"
                  width={144}
                  height={40}
                  className="w-36 h-auto object-contain"
                />
              </Link>
              <p className="text-lg font-bold !text-white leading-snug max-w-[340px]">
                {t('motto')}
              </p>
              <p className="text-sm !text-white/70 mt-1 max-w-[340px]">
                {t('valueSlogan')}
              </p>
              <div className="mt-4 text-sm !text-white/60 leading-relaxed">
                <p>Strada NERVA TRAIAN, Nr. 27–33</p>
                <p>București, Sector 3</p>
                <p>Romania</p>
              </div>
              <div className="mt-3 text-sm !text-white/60 leading-relaxed">
                <p>Fetih Mah., Kavakyeli Sitesi</p>
                <p>Tahralı Sk. A Blok No:7 Kat:1 D:4</p>
                <p>34704 Ataşehir / İstanbul</p>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] !text-white/40 uppercase mb-5">
                {t('technicalServices')}
              </h4>
              <nav className="flex flex-col gap-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="footer-link text-sm !text-white/85 hover:text-afa-gold py-1"
                  >
                    {t(link.key as keyof import('@/lib/i18n').Translations)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 3: CTA Block */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.15em] !text-white/40 uppercase mb-5">
                {t('footerCtaHeading')}
              </h4>
              <Link
                href={lp('investor')}
                className="w-full bg-afa-gold text-afa-deep font-semibold text-sm py-3 px-4 rounded-[4px] text-center block transition-colors"
              >
                {t('footerCtaInvestor')}
              </Link>
              <Link
                href={lp('developer')}
                className="w-full border border-white/40 !text-white font-medium text-sm py-3 px-4 rounded-[4px] text-center block transition-colors hover:border-white mt-3"
              >
                {t('footerCtaDeveloper')}
              </Link>
              <p className="footer-muted text-xs !text-white/50 mt-4 leading-relaxed">
                {t('footerCtaNote')}
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
