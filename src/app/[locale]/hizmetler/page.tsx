import type { Metadata } from "next";
import { Locale, locales, defaultLocale } from "@/lib/i18n";
import { LOCALE_PATHS } from "@/lib/routes";
import { SITE_URL } from "@/lib/env";
import { servicesContent } from "@/content/services";
import styles from "./hizmetler.module.css";
import ServicesHero from "@/components/services/ServicesHero";
import PositioningBlock from "@/components/services/PositioningBlock";
import ProjectSourcing from "@/components/services/ProjectSourcing";
import TransitionBridge from "@/components/services/TransitionBridge";
import ServiceTimeline from "@/components/services/ServiceTimeline";
import WhyAfaGrid from "@/components/services/WhyAfaGrid";
import ClosingCTA from "@/components/services/ClosingCTA";

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

  return (
    <main>
      {/* Section 1: Hero */}
      <ServicesHero content={content.hero} />

      {/* Section 2: Positioning */}
      <PositioningBlock content={content.positioning} />

      {/* Section 3: Project Sourcing (Block 1) + Transition Bridge */}
      <section
        id="project-sourcing"
        aria-labelledby="project-sourcing-title"
        className={styles.block1}
      >
        <div className={styles.block1Content}>
          <ProjectSourcing content={content.block1} />
          <TransitionBridge text={content.bridge} />
        </div>
      </section>

      {/* Section 4: Technical Validation (Block 2) */}
      <section
        id="technical-validation"
        aria-labelledby="technical-validation-title"
        className={styles.block2}
      >
        <div className={styles.block2Content}>
          <ServiceTimeline content={content.block2} />
        </div>
      </section>

      {/* Section 5: Why AFA */}
      <section
        id="why-afa"
        aria-labelledby="why-afa-title"
        className={styles.whyAfa}
      >
        <div className={styles.whyAfaContent}>
          <WhyAfaGrid content={content.whyAfa} />
        </div>
      </section>

      {/* Section 6: Closing CTA */}
      <section
        id="get-started"
        aria-labelledby="get-started-title"
        className={styles.closing}
      >
        <div className={styles.closingContent}>
          <ClosingCTA content={content.closing} />
        </div>
      </section>

      {/* Section 7: Disclaimer */}
      <section id="disclaimer" className={styles.disclaimer}>
        <div className={styles.disclaimerContent}>
          <p className={styles.disclaimerText}>{content.disclaimer}</p>
        </div>
      </section>
    </main>
  );
}
