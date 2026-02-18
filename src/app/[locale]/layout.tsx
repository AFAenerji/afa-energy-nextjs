import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const translations = {
    tr: {
      title: 'AFA Energy Romania',
      description: 'Romanya yenilenebilir enerji yatırımları için bağımsız teknik danışmanlık ve yatırım kararı desteği'
    },
    en: {
      title: 'AFA Energy Romania', 
      description: 'Independent technical advisory and investment decision support for renewable energy investments in Romania'
    },
    ro: {
      title: 'AFA Energy Romania',
      description: 'Consultanță tehnică independentă și suport pentru decizii de investiții în energie regenerabilă în România'
    }
  };

  const metadata = translations[locale as keyof typeof translations] || translations.tr;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      locale: locale,
      type: 'website',
      url: `https://afaenergy.ro/${locale}`,
      siteName: 'AFA Energy Romania',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `https://afaenergy.ro/${locale}`,
      languages: {
        'tr': 'https://afaenergy.ro/tr',
        'en': 'https://afaenergy.ro/en', 
        'ro': 'https://afaenergy.ro/ro',
      },
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
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-grow w-full pt-16">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
