import type { Metadata } from 'next';
import Image from 'next/image';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { getAssessmentDictionary } from '@/lib/getAssessmentDictionary';
import { SITE_URL } from '@/lib/env';
import FlowAccordion from './components/FlowAccordion';
import FinalFormSection from './components/FinalFormSection';

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
  const dict = await getAssessmentDictionary(validLocale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${validLocale}/teknik-on-degerlendirme`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/teknik-on-degerlendirme`]),
      ),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${SITE_URL}/${validLocale}/teknik-on-degerlendirme`,
      siteName: 'AFA Energy Romania',
      type: 'website',
    },
  };
}

/* ── Static Params ── */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ── Page ── */
interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function TeknikOnDegerlendirmePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const dict = await getAssessmentDictionary(locale);

  return (
    <>
      {/* Hero */}
      <section className="w-full pt-16 pb-12 lg:pt-20 lg:pb-16 relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/services-hero.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.55)' }}
        />

        <div className="afa-container relative">
          <div className="mb-8" aria-hidden="true">
            <div className="h-px w-full bg-white/10" />
            <div className="mt-4 h-[3px] w-16 rounded-sm afa-bridge-accent" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-left">
            {dict.hero.title}
          </h1>

          <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl text-left">
            {dict.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Flow Accordion — Hizmet Pusulası + Yol A, B, C */}
      <FlowAccordion compass={dict.serviceCompass} flows={dict.flows} />

      {/* AFA Difference */}
      <section className="w-full py-16" style={{ background: '#FFCB00' }}>
        <div className="afa-container">
          <h2
            className="text-2xl font-extrabold text-white mb-4 text-left"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {dict.afaDifference.title}
          </h2>
          {dict.afaDifference.paragraphs.map((p: string) => (
            <p key={p} className="text-[#0B1F1E] leading-relaxed mb-3 text-left last:mb-0">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="w-full dark-section py-12 lg:py-16">
        <div className="afa-container">
          <FinalFormSection
            locale={locale}
            content={dict.form}
            flows={dict.flows}
            trustSignal={dict.trustSignal}
          />
        </div>
      </section>
    </>
  );
}