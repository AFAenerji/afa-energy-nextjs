/*
 * AFA Energy Romania — Footer
 * Sprint 3p — Clean Rewrite
 * Layout: 2fr + 1fr + 1fr + 1fr (brand column wide)
 */
import Image from 'next/image';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { getLocalizedSlug } from '@/lib/slugs';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = (key: keyof import('@/lib/i18n').Translations) =>
    getTranslation(locale, key);
  const lp = (canonical: string) =>
    `/${locale}/${getLocalizedSlug(canonical, locale) ?? canonical}`;

  return (
    <>
      {/* ── MAIN FOOTER ── */}
      <footer className="bg-afa-deep text-white dark-section"
              data-theme="dark">
        <div className="mx-auto max-w-6xl px-8 py-12">

          {/* ── MAIN GRID: 2fr + 1fr + 1fr + 1fr ── */}
          <div className="grid grid-cols-1 md:grid-cols-2
                          lg:grid-cols-[2fr_1fr_1fr_1fr]
                          items-start gap-8 lg:gap-10">

            {/* COL 1 — Brand (2fr — wide) */}
            <div className="flex flex-col items-start">
              <Link href={`/${locale}`}
                    aria-label="Ana Sayfaya Dön"
                    className="inline-block mb-3">
                <Image
                  src="/images/afa_beyaz.png"
                  alt="AFA Energy Romania"
                  width={127}
                  height={180}
                  className="w-36 h-auto object-contain"
                  loading="lazy"
                />
              </Link>
              <p className="text-lg font-bold text-white leading-snug mb-1">
                {t('motto')}
              </p>
              <p className="text-sm font-medium leading-relaxed mb-2"
                 style={{ color: '#FFCB00' }}>
                {t('footerTagline')}
              </p>
              <p className="text-xs italic leading-relaxed"
                 style={{ color: 'rgba(255,255,255,0.60)' }}>
                {t('footerDescription')}
              </p>
            </div>

            {/* COL 2 — Teknik Hizmetler (1fr) */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest
                             text-white pb-2 mb-4
                             border-b border-afa-accent">
                {t('footerTechnicalHeading')}
              </h4>
              <nav aria-label="Alt gezinme: Teknik Hizmetler"
                   className="flex flex-col gap-2">
                <Link href={lp('services')}
                      className="text-sm text-white/80
                                 hover:text-afa-gold
                                 transition-colors duration-120 py-1">
                  {t('services')}
                </Link>
                <Link href={lp('cases')}
                      className="text-sm text-white/80
                                 hover:text-afa-gold
                                 transition-colors duration-120 py-1">
                  {t('cases')}
                </Link>
                <Link href={lp('atr-matrix')}
                      className="text-sm text-white/80
                                 hover:text-afa-gold
                                 transition-colors duration-120 py-1">
                  {t('atrMatrix')}
                </Link>
              </nav>
            </div>

            {/* COL 3 — Kurumsal (1fr) */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest
                             text-white pb-2 mb-4
                             border-b border-afa-accent">
                {t('footerCorporateHeading')}
              </h4>
              <nav aria-label="Alt gezinme: Kurumsal"
                   className="flex flex-col gap-2">
                <Link href={lp('about')}
                      className="text-sm text-white/80
                                 hover:text-afa-gold
                                 transition-colors duration-120 py-1">
                  {t('about')}
                </Link>
                <Link href={lp('knowledge-center')}
                      className="text-sm text-white/80
                                 hover:text-afa-gold
                                 transition-colors duration-120 py-1">
                  {t('knowledgeCenter')}
                </Link>
                <Link href={lp('contact')}
                      className="text-sm text-white/80
                                 hover:text-afa-gold
                                 transition-colors duration-120 py-1">
                  {t('reachUs')}
                </Link>
              </nav>
            </div>

            {/* COL 4 — Başvuru CTA (1fr, no heading) */}
            <nav aria-label="Alt gezinme: Başvuru"
                 className="flex flex-col">
              <Link href={lp('investor')}
                    className="w-full bg-afa-gold text-afa-deep
                               font-bold text-sm py-3 px-4 rounded
                               text-center block
                               hover:bg-yellow-400
                               transition-colors duration-120">
                {t('footerCtaInvestor')}
              </Link>
              <Link href={lp('developer')}
                    className="w-full bg-transparent text-afa-accent
                               border border-afa-accent font-bold
                               text-sm py-3 px-4 rounded text-center
                               block mt-3
                               hover:bg-afa-accent hover:text-white
                               transition-colors duration-120">
                {t('footerCtaDeveloper')}
              </Link>
              <p className="text-xs text-white/60 mt-3 leading-relaxed
                            max-w-[160px]">
                {t('footerCtaNote')}
              </p>
            </nav>

          </div>
          {/* ── END MAIN GRID ── */}

          {/* ── ADDRESS BAND ── */}
          <div className="border-t border-white/10 mt-8 pt-5
                          grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-xs text-white/75 leading-relaxed">
              <span className="font-bold uppercase tracking-wider
                               text-afa-accent">
                {t('officeRomania')}
              </span>
              {' · '}
              Strada NERVA TRAIAN, Nr. 27–33, București, Sector 3, Romania
            </p>
            <p className="text-xs text-white/75 leading-relaxed">
              <span className="font-bold uppercase tracking-wider
                               text-afa-accent">
                {t('officeTurkey')}
              </span>
              {' · '}
              Tahralı Sk. A Blok No:7 Kat:1 D:4, 34704 Ataşehir, İstanbul, Turkey
            </p>
          </div>
          {/* ── END ADDRESS BAND ── */}

        </div>
      </footer>
      {/* ── END MAIN FOOTER ── */}

      {/* ── LEGAL BAR ── outside <footer>, cascade isolation ──
       * Root cause: .dark-section color:white cascades to children.
       * Fragment placement breaks inheritance chain.
       * text-[#555555]: PDF v4.0 exception, WCAG 7.4:1 on white.
       */}
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center
                          sm:justify-between gap-2">
            <p className="text-xs font-medium text-afa-deep">
              © {new Date().getFullYear()} AFA Energy Romania S.R.L.
              &nbsp;·&nbsp; CUI 51196522 &nbsp;·&nbsp; J2025005686008
            </p>
            <div className="flex gap-4 text-xs">
              <Link href={lp('privacy-policy')}
                    className="text-[#555555] hover:text-afa-deep
                               transition-colors duration-120">
                {t('privacyPolicy')}
              </Link>
              {/* Sprint 4a: span → Link once route exists */}
              <span className="text-[#555555] cursor-default">
                {t('cookiePolicy')}
              </span>
              <Link href={lp('terms-conditions')}
                    className="text-[#555555] hover:text-afa-deep
                               transition-colors duration-120">
                {t('terms')}
              </Link>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-[#555555]">
              {t('legalDisclaimer')}
            </p>
          </div>
        </div>
      </div>
      {/* ── END LEGAL BAR ── */}

    </>
  );
}
