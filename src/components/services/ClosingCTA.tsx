import Link from "next/link";
import type { ServicesContent } from "@/content/services";
import styles from "@/app/[locale]/hizmetler/hizmetler.module.css";

type Props = {
  content: ServicesContent["closing"];
};

export default function ClosingCTA({ content }: Props) {
  return (
    <>
      <h2 id="get-started-title" className={styles.closingTitle}>
        {content.title}
      </h2>
      <p className={styles.closingBody}>{content.body}</p>

      <div className={styles.closingCtaWrap}>
        <div className={styles.closingCtaGroup}>
          <Link
            href={content.ctaInvestor.href}
            className={styles.closingCtaPrimary}
          >
            {content.ctaInvestor.text}
          </Link>
          <p className={styles.closingCtaMicro}>{content.ctaInvestor.micro}</p>
        </div>

        <div className={styles.closingCtaGroup}>
          <Link
            href={content.ctaDeveloper.href}
            className={styles.closingCtaSecondary}
          >
            {content.ctaDeveloper.text}
          </Link>
          <p className={styles.closingCtaMicro}>
            {content.ctaDeveloper.micro}
          </p>
        </div>
      </div>

      <Link href={content.ctaTertiary.href} className={styles.closingTertiary}>
        {content.ctaTertiary.text} &rarr;
      </Link>
    </>
  );
}
