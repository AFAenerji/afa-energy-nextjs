import { Locale, locales } from '@/lib/i18n';
import { getHomepageDictionary } from '@/lib/getHomepageDictionary';
import HomepageRenderer from '@/components/sections/HomepageRenderer';

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dictionary = await getHomepageDictionary(locale);

  return (
    <main>
      <HomepageRenderer sections={dictionary.sections} data={dictionary.data} locale={locale} />
    </main>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
