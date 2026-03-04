import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { LOCALE_PATHS } from '@/lib/routes';
import { canonicalFromFullPath, alternatesFromLocalePaths } from '@/lib/seo/canonical';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { SITE_URL } from '@/lib/env';
import ContactPageClient from './ContactPageClient';

/* ── Metadata per locale ── */
const META = {
  tr: {
    title: 'İletişim | AFA Energy Romania',
    description:
      'AFA Energy Romania ile iletişime geçin. Yenilenebilir enerji yatırımlarında bağımsız teknik danışmanlık.',
  },
  en: {
    title: 'Contact | AFA Energy Romania',
    description:
      'Contact AFA Energy Romania. Independent technical advisory in Romanian renewable energy investments.',
  },
  ro: {
    title: 'Contact | AFA Energy Romania',
    description:
      'Contactați AFA Energy Romania. Consultanță tehnică independentă în investițiile în energie regenerabilă din România.',
  },
} as const;

const BREADCRUMB_HOME = { tr: 'Ana Sayfa', en: 'Home', ro: 'Acasă' } as const;
const BREADCRUMB_SELF = { tr: 'İletişim', en: 'Contact', ro: 'Contact' } as const;

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
  const meta = META[validLocale];
  const contactPaths = LOCALE_PATHS.contact;
  const canonicalUrl = canonicalFromFullPath(contactPaths[validLocale]);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesFromLocalePaths(contactPaths),
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

/* ── Static Params ── */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ── Page Component ── */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  return (
    <main>
      <BreadcrumbSchema
        items={[
          { name: BREADCRUMB_HOME[locale], url: `${SITE_URL}/${locale}` },
          {
            name: BREADCRUMB_SELF[locale],
            url: canonicalFromFullPath(LOCALE_PATHS.contact[locale]),
          },
        ]}
      />
      <ContactPageClient locale={locale} />
    </main>
  );
}
