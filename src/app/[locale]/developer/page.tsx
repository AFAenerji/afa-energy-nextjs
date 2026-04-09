import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { canonicalFromFullPath, alternatesFromLocalePaths } from '@/lib/seo/canonical';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { SITE_URL } from '@/lib/env';
import { LOCALE_PATHS } from '@/lib/routes';
import GelistiriciHero from '@/components/sections/GelistiriciHero';
import gelistiriciContent from '@/lib/content/gelistirici.json';

const metaContent = {
  tr: {
    title: 'AFA Energy Romania - Proje Geliştiricisi | Teknik Doğrulama',
    description:
      'Romanya yenilenebilir enerji projelerinizin teknik gerçekliğini doğrulayın. AFA Energy teknik değerlendirme süreci.',
    breadcrumbHome: 'Ana Sayfa',
    breadcrumbSelf: 'Proje Geliştiricisi',
  },
  en: {
    title: 'AFA Energy Romania - Project Developer | Technical Validation',
    description:
      'Validate the technical reality of your Romanian renewable energy projects. AFA Energy technical assessment process.',
    breadcrumbHome: 'Home',
    breadcrumbSelf: 'Project Developer',
  },
  ro: {
    title: 'AFA Energy Romania - Dezvoltator de Proiecte | Validare Tehnică',
    description:
      'Validați realitatea tehnică a proiectelor dvs. de energie regenerabilă din România. Procesul de evaluare tehnică AFA Energy.',
    breadcrumbHome: 'Acasă',
    breadcrumbSelf: 'Dezvoltator de Proiecte',
  },
} as const;

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
  const devPaths = LOCALE_PATHS.developer;
  const canonicalUrl = canonicalFromFullPath(devPaths[validLocale]);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesFromLocalePaths(devPaths),
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function DeveloperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const meta = metaContent[locale];

  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: meta.breadcrumbHome, url: `${SITE_URL}/${locale}` },
          {
            name: meta.breadcrumbSelf,
            url: canonicalFromFullPath(LOCALE_PATHS.developer[locale]),
          },
        ]}
      />

      <GelistiriciHero content={gelistiriciContent.hero} locale={locale} />
    </main>
  );
}
