/* AFA KURAL — Koyu Zemin Kontrast Standardı:
 * afa-deep (#0F2E2C) zemin üzerinde minimum text-white/75
 * Legal bar: bg-white + text-afa-deep (beyaz zemin, koyu metin)
 * WCAG AA: normal metin 4.5:1, büyük metin 3:1 minimum
 *
 * AFA KURAL — Footer İletişim Bilgisi Yasağı:
 * Footer'da telefon, e-posta veya doğrudan iletişim bilgisi
 * gösterilemez. Yalnızca /iletisim sayfasına yönlendirme yapılır. */
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

  const technicalLinks = [
    { key: 'services', href: lp('services') },
    { key: 'cases', href: lp('cases') },
    { key: 'atrMatrix', href: lp('atr-matrix') },
  ];

  const corporateLinks = [
    { key: 'about', href: lp('about') },
    { key: 'knowledgeCenter', href: lp('knowledge-center') },
    { key: 'reachUs', href: lp('contact') },
  ];

  return (
      <footer className="dark-section bg-afa-deep text-white" data-theme="dark">
        <div className="mx-auto max-w-6xl px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-8 lg:gap-10">

            {/* Col 1: Brand + Address */}
            <div className="flex flex-col items-start text-left">
              <Link href={`/${locale}`} aria-label="Ana Sayfaya Don" className="inline-block mb-6">
                <Image
                  src="/images/dikey_afa_beyaz.png"
                  alt="AFA Energy Romania"
                  width={180}
                  height={127}
                  className="w-36 h-auto object-contain"
                />
              </Link>
              <p className="text-lg font-bold text-white leading-snug">
                {t('motto')}
              </p>
              <p className="text-sm text-white/80 mt-1">
                {t('valueSlogan')}
              </p>
            </div>

            {/* Col 2: Teknik Hizmetler */}
            <div>
              <h4 className="text-afa-gold text-xs font-semibold uppercase tracking-widest mb-5">
                {t('footerTechnicalHeading')}
              </h4>
              <nav aria-label="Alt gezinme: Teknik Hizmetler" className="flex flex-col gap-2">
                {technicalLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="text-sm text-white/85 font-medium hover:text-afa-gold transition-colors duration-120 py-1"
                  >
                    {t(link.key as keyof import('@/lib/i18n').Translations)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 3: Kurumsal */}
            <div>
              <h4 className="text-afa-gold text-xs font-semibold uppercase tracking-widest mb-5">
                {t('footerCorporateHeading')}
              </h4>
              <nav aria-label="Alt gezinme: Kurumsal" className="flex flex-col gap-2">
                {corporateLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="text-sm text-white/85 font-medium hover:text-afa-gold transition-colors duration-120 py-1"
                  >
                    {t(link.key as keyof import('@/lib/i18n').Translations)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 4: Başvuru */}
            <nav aria-label="Alt gezinme: Başvuru" className="flex flex-col">
              <h4 className="text-afa-gold text-xs font-semibold uppercase tracking-widest mb-5">
                {t('footerCtaHeading')}
              </h4>
              <Link
                href={lp('investor')}
                className="w-full bg-afa-gold text-afa-deep font-bold text-sm py-3 px-4 rounded-[4px] text-center block transition-colors duration-120"
              >
                {t('footerCtaInvestor')}
              </Link>
              <Link
                href={lp('developer')}
                className="w-full border border-afa-accent text-afa-accent bg-transparent font-bold text-sm py-3 px-4 rounded-[4px] text-center block transition-colors duration-120 hover:bg-afa-accent hover:text-white mt-3"
              >
                {t('footerCtaDeveloper')}
              </Link>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                {t('footerCtaNote')}
              </p>
            </nav>

          </div>

          {/* Address band */}
          <div className="border-t border-white/10 mt-8 pt-8 -mx-8 px-8 py-6 bg-afa-primary/20 md:flex md:gap-12">
            <div className="mb-4 md:mb-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-afa-gold mb-2">
                {t('officeRomania')}
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                Strada NERVA TRAIAN, Nr. 27–33<br />
                București, Sector 3<br />
                Romania
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-afa-gold mb-2">
                {t('officeTurkey')}
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                Fetih Mah., Kavakyeli Sitesi<br />
                Tahralı Sk. A Blok No:7 Kat:1 D:4<br />
                34704 Ataşehir / İstanbul
              </p>
            </div>
          </div>

        </div>

        {/* Legal bar — white background */}
        <div className="bg-white -mx-0 px-8 py-4">
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-afa-deep">
              {t('footerIdentity')} · {t('footerDisclaimer')}
            </p>
            <div className="flex gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-xs text-afa-deep hover:text-afa-primary transition-colors duration-120"
              >
                {t('privacyPolicy')}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-xs text-afa-deep hover:text-afa-primary transition-colors duration-120"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
  );
}
