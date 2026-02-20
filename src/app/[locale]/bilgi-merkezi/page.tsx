import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { getHomepageDictionary } from '@/lib/getHomepageDictionary';
import TechnicalFAQ from '@/components/sections/TechnicalFAQ';
import FAQSchema from '@/components/seo/FAQSchema';
import GlossarySchema from '@/components/seo/GlossarySchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

const pageMeta: Record<Locale, { title: string; description: string; heroTitle: string; heroSubtitle: string; breadcrumbHome: string; breadcrumbSelf: string }> = {
  tr: {
    title: 'Teknik Bilgi Merkezi | AFA Energy Romania',
    description:
      'Romanya yenilenebilir enerji yatırımları için teknik SSS, sözlük ve bağımsız değerlendirme rehberi.',
    heroTitle: 'Teknik Bilgi Merkezi',
    heroSubtitle: 'Yatırımcılar, geliştiriciler ve teknik karar vericiler için kapsamlı SSS ve teknik sözlük.',
    breadcrumbHome: 'Ana Sayfa',
    breadcrumbSelf: 'Bilgi Merkezi',
  },
  en: {
    title: 'Technical Knowledge Center | AFA Energy Romania',
    description:
      'Technical FAQ, glossary, and independent assessment guide for renewable energy investments in Romania.',
    heroTitle: 'Technical Knowledge Center',
    heroSubtitle: 'Comprehensive FAQ and technical glossary for investors, developers, and technical decision-makers.',
    breadcrumbHome: 'Home',
    breadcrumbSelf: 'Knowledge Center',
  },
  ro: {
    title: 'Centrul de Cunoștințe Tehnice | AFA Energy Romania',
    description:
      'Întrebări frecvente tehnice, glosar și ghid de evaluare independentă pentru investiții în energie regenerabilă în România.',
    heroTitle: 'Centrul de Cunoștințe Tehnice',
    heroSubtitle: 'Întrebări frecvente și glosar tehnic pentru investitori, dezvoltatori și factori de decizie tehnici.',
    breadcrumbHome: 'Acasă',
    breadcrumbSelf: 'Centrul de Cunoștințe',
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
      canonical: `${SITE_URL}/${validLocale}/bilgi-merkezi`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/bilgi-merkezi`]),
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${validLocale}/bilgi-merkezi`,
      siteName: 'AFA Energy Romania',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface BilgiMerkeziPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function BilgiMerkeziPage({
  params,
}: BilgiMerkeziPageProps) {
  const { locale } = await params;
  const dictionary = await getHomepageDictionary(locale);
  const kc = dictionary.data.technicalKnowledgeCenter;
  const meta = pageMeta[locale] ?? pageMeta.tr;

  if (!kc) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-slate-600">Knowledge Center content not available.</p>
      </div>
    );
  }

  return (
    <>
      {/* JSON-LD Schemas */}
      <BreadcrumbSchema
        items={[
          { name: meta.breadcrumbHome, url: `${SITE_URL}/${locale}` },
          { name: meta.breadcrumbSelf, url: `${SITE_URL}/${locale}/bilgi-merkezi` },
        ]}
      />
      <FAQSchema groups={kc.groups} />
      {kc.glossary && (
        <GlossarySchema terms={kc.glossary} locale={locale} />
      )}

      {/* Page Hero */}
      <section className="w-full bg-[#0F2E2C] pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-8" aria-hidden="true">
            <div className="h-px w-full bg-white/10" />
            <div className="mt-4 h-[3px] w-16 bg-[#FFCB00] rounded-sm" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {meta.heroTitle}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl">
            {meta.heroSubtitle}
          </p>
        </div>
      </section>

      {/* FAQ + Glossary */}
      <TechnicalFAQ data={kc} locale={locale} />
    </>
  );
}
