import Image from "next/image";
import Link from "next/link";
import type { ServicesContent } from "@/content/services";
import styles from "@/app/[locale]/services/hizmetler.module.css";

type Props = {
  content: ServicesContent["hero"];
};

export default function ServicesHero({ content }: Props) {
  return (
    <section id="hero" aria-labelledby="hero-title" className={`${styles.hero} services-hero dark-section`}>
      {/* z-0 — Background photograph */}
      <Image
        src="/images/services-hero.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />
      {/* z-1 — Flat brand-tint base overlay */}
      <div className={styles.overlayBase} aria-hidden="true" />
      {/* z-2 — Gradient vignette overlay */}
      <div className={styles.overlayGradient} aria-hidden="true" />
      {/* z-3 — Foreground content */}
      <div className={styles.heroContent}>
        {/* Gold accent line — inside container, travels with content */}
        <div className={styles.goldLine} aria-hidden="true" />
        <p className={styles.heroBadge}>{content.badge}</p>
        <h1 id="hero-title" className={styles.heroTitle}>
          {content.title}
        </h1>
        <p className={styles.heroDescription}>{content.description}</p>
        <Link href={content.ctaHref} className={styles.heroCta}>
          {content.cta}
        </Link>

        <div className={styles.pillarBar}>
          {content.pillars.map((pillar) => (
            <div key={pillar.label} className={styles.pillarItem}>
              <p className={styles.pillarLabel}>{pillar.label}</p>
              <p className={styles.pillarDesc}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
