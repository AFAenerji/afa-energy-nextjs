import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { getMetadata } from '@/lib/dictionaries/metadata';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.ro';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const meta = getMetadata(validLocale);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: validLocale,
      type: 'website',
      url: `${SITE_URL}/${validLocale}`,
      siteName: 'AFA Energy Romania',
      images: [
        {
          url: `${SITE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/images/og-image.jpg`],
    },
    alternates: {
      canonical: `${SITE_URL}/${validLocale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}";`,
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Header locale={locale} />
        <main className="flex-grow w-full pt-[72px]">
          {children}
        </main>
        <Footer locale={locale} />
      </div>
    </>
  );
}
