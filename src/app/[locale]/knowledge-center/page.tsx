import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { getHomepageDictionary } from '@/lib/getHomepageDictionary';
import KnowledgeCenterClient from '@/components/sections/KnowledgeCenterClient';
import FAQSchema from '@/components/seo/FAQSchema';
import GlossarySchema from '@/components/seo/GlossarySchema';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

const pageMeta: Record<Locale, { title: string; description: string }> = {
  tr: {
    title: 'Teknik Bilgi Merkezi | AFA Energy Romania',
    description:
      'Romanya yenilenebilir enerji yatırımları için teknik SSS, sözlük ve bağımsız değerlendirme rehberi.',
  },
  en: {
    title: 'Technical Knowledge Center | AFA Energy Romania',
    description:
      'Technical FAQ, glossary, and independent assessment guide for renewable energy investments in Romania.',
  },
  ro: {
    title: 'Centrul de Cunoștințe Tehnice | AFA Energy Romania',
    description:
      'Întrebări frecvente tehnice, glosar și ghid de evaluare independentă pentru investiții în energie regenerabilă în România.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const meta = pageMeta[validLocale];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}/${validLocale}/knowledge-center`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/knowledge-center`]),
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${validLocale}/knowledge-center`,
      siteName: 'AFA Energy Romania',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface KnowledgeCenterPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function KnowledgeCenterPage({
  params,
}: KnowledgeCenterPageProps) {
  const { locale } = await params;
  const dictionary = await getHomepageDictionary(locale);
  const kc = dictionary.data.technicalKnowledgeCenter;

  if (!kc) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-slate-600">Knowledge Center content not available.</p>
      </div>
    );
  }

  return (
    <>
      <FAQSchema groups={kc.groups} />
      {kc.glossary && (
        <GlossarySchema terms={kc.glossary} locale={locale} />
      )}
      <KnowledgeCenterClient data={kc} locale={locale} />
    </>
  );
}
