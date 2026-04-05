import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { LOCALE_PATHS } from '@/lib/routes';
import { canonicalFromFullPath, alternatesFromLocalePaths } from '@/lib/seo/canonical';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { SITE_URL } from '@/lib/env';
import B1Hero from '@/components/hakkimizda/B1Hero';
import B2BizKimiz from '@/components/hakkimizda/B2BizKimiz';
import B3DegerlendirmeCercevesi from '@/components/hakkimizda/B3DegerlendirmeCercevesi';
import ATRBand from '@/components/hakkimizda/ATRBand';
import B5PiyasaDinamikleri from '@/components/hakkimizda/B5PiyasaDinamikleri';
import B6B7Kapanis from '@/components/hakkimizda/B6B7Kapanis';

async function loadContent(locale: Locale) {
  const trMessages = await import('@/../messages/tr/hakkimizda.json');
  const enMessages = await import('@/../messages/en/hakkimizda.json');
  const roMessages = await import('@/../messages/ro/hakkimizda.json');
  
  const dict = {
    tr: trMessages.default || trMessages,
    en: enMessages.default || enMessages,
    ro: roMessages.default || roMessages,
  };
  
  return dict[locale];
}

const metaContent = {
  tr: {
    title: 'AFA Energy Romania - Hakkımızda | Yatırımcı Tarafı Teknik Doğrulama',
    description:
      'Romanya yenilenebilir enerji yatırımlarında yatırımcı tarafı teknik doğrulama ve karar disiplini standardı.',
    breadcrumbHome: 'Ana Sayfa',
    breadcrumbSelf: 'Hakkımızda',
  },
  en: {
    title: 'AFA Energy Romania - About Us | Investor-Side Technical Validation',
    description:
      'Investor-side technical validation and decision discipline standard in Romanian renewable energy investments.',
    breadcrumbHome: 'Home',
    breadcrumbSelf: 'About Us',
  },
  ro: {
    title: 'AFA Energy Romania - Despre Noi | Validare Tehnică pe Partea Investitorului',
    description:
      'Standard de validare tehnică pe partea investitorului și disciplină decizională în investițiile în energie regenerabilă din România.',
    breadcrumbHome: 'Acasă',
    breadcrumbSelf: 'Despre Noi',
  },
} as const;

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const meta = metaContent[validLocale];
  const aboutPaths = LOCALE_PATHS.about;
  const canonicalUrl = canonicalFromFullPath(aboutPaths[validLocale]);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesFromLocalePaths(aboutPaths),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: validLocale,
      type: 'website',
      url: canonicalUrl,
      siteName: 'AFA Energy Romania',
    },
  };
}

/* ── Page Component ── */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const meta = metaContent[locale];
  const content = await loadContent(locale);

  return (
    <main>
      {/* JSON-LD: Breadcrumbs */}
      <BreadcrumbSchema
        items={[
          { name: meta.breadcrumbHome, url: `${SITE_URL}/${locale}` },
          {
            name: meta.breadcrumbSelf,
            url: canonicalFromFullPath(LOCALE_PATHS.about[locale]),
          },
        ]}
      />

      <B1Hero content={content.hero} locale={locale} />
      <B2BizKimiz content={content.b2} />
      <B3DegerlendirmeCercevesi content={content.b3} />
      <ATRBand content={content.atrBand} />
      <B5PiyasaDinamikleri content={content.b5} />
      <B6B7Kapanis content={content.b6b7} />
    </main>
  );
}
