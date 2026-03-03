import Link from "next/link";
import type { ServicesContent } from "@/content/services";
import styles from "@/app/[locale]/services/hizmetler.module.css";

type Props = {
  content: ServicesContent["hero"];
};

export default function ServicesHero({ content }: Props) {
  return (
    <section id="hero" aria-labelledby="hero-title" className={styles.hero}>
      <div className={styles.heroContent}>
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
