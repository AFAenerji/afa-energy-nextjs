import type { Metadata } from "next";
import { Locale, locales, defaultLocale } from "@/lib/i18n";
import { LOCALE_PATHS } from "@/lib/routes";
import { SITE_URL } from "@/lib/env";
import { servicesContent } from "@/content/services";
import { timelineStages, whyAfaCards, positioningData, photoBreaks } from "./data";
import ServicesHero from "@/components/services/ServicesHero";
import PositioningBlock from "@/components/services/PositioningBlock";
import ProjectSourcing from "@/components/services/ProjectSourcing";
import PhotoBreak from "@/components/services/PhotoBreak";
import ServiceTimeline from "@/components/services/ServiceTimeline";
import WhyAfaGrid from "@/components/services/WhyAfaGrid";
import ClosingCTA from "@/components/services/ClosingCTA";
import DisclaimerSection from "@/components/services/DisclaimerSection";

/* ── Canonical helpers ── */
const canonicalFromFullPath = (path: string): string => `${SITE_URL}${path}`;
const alternatesFromLocalePaths = (paths: Record<Locale, string>) => {
  const languages: Record<string, string> = {};
  Object.entries(paths).forEach(([locale, path]) => {
    languages[locale] = `${SITE_URL}${path}`;
  });
  return languages;
};

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
  const { meta } = servicesContent[validLocale];
  const servicesPaths = LOCALE_PATHS.services;
  const canonicalUrl = canonicalFromFullPath(servicesPaths[validLocale]);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesFromLocalePaths(servicesPaths),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: "AFA Energy Romania",
      type: "website",
    },
  };
}

/* ── Static Params ── */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ── Page ── */
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const content = servicesContent[locale];
  const stages = timelineStages[locale];
  const cards = whyAfaCards[locale];
  const positioning = positioningData[locale];
  const breaks = photoBreaks[locale];

  return (
    <main>
      {/* Hero */}
      <ServicesHero content={content.hero} />

      {/* Positioning */}
      <PositioningBlock content={positioning} />

      {/* Project Sourcing (Block 1) */}
      <ProjectSourcing content={content.block1} bridge={content.bridge} />

      {/* Photo Break 1 — Transition */}
      <PhotoBreak data={breaks[0]} />

      {/* Technical Validation Timeline (Block 2) */}
      <ServiceTimeline
        locale={locale}
        label={content.block2.label}
        title={content.block2.title}
        intro={content.block2.intro}
        stages={stages}
      />

      {/* Photo Break 2 — Breathe */}
      <PhotoBreak data={breaks[1]} />

      {/* Why AFA */}
      <WhyAfaGrid
        title={content.whyAfa.title}
        cards={cards}
        link={content.whyAfa.link}
      />

      {/* Closing CTA */}
      <ClosingCTA content={content.closing} />

      {/* Disclaimer */}
      <DisclaimerSection text={content.disclaimer} />
    </main>
  );
}
