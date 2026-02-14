import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import '../globals.css';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AFA Energy Romania',
  description: 'Independent technical advisory and investment decision support',
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
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
    <html lang={locale}>
      <body className={`${montserrat.variable} ${openSans.variable}`}>
        <div className="min-h-screen flex flex-col">
          <Header locale={locale} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
