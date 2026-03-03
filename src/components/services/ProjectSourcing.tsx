import Link from "next/link";
import type { ServicesContent } from "@/content/services";
import styles from "@/app/[locale]/services/hizmetler.module.css";

type Props = {
  content: ServicesContent["block1"];
};

function CheckSvg() {
  return (
    <svg
      className={styles.checkIcon}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="4 10 8 14 16 6" />
    </svg>
  );
}

export default function ProjectSourcing({ content }: Props) {
  return (
    <>
      <h2 id="project-sourcing-title" className={styles.block1Title}>
        {content.title}
      </h2>
      <p className={styles.block1Body}>{content.body}</p>

      <div className={styles.block1Grid}>
        {/* Left column: checklist */}
        <div>
          <ul className={styles.checkList}>
            {content.checks.map((check) => (
              <li key={check} className={styles.checkItem}>
                <CheckSvg />
                <span>{check}</span>
              </li>
            ))}
          </ul>
          <p className={styles.purposeText}>{content.purpose}</p>
        </div>

        {/* Right column: CTA card */}
        <div className={styles.ctaCard}>
          <div className={styles.ctaCardGroup}>
            <Link
              href={content.ctaInvestor.href}
              className={styles.ctaCardPrimary}
            >
              {content.ctaInvestor.text}
            </Link>
            <p className={styles.ctaCardMicro}>{content.ctaInvestor.micro}</p>
          </div>

          <div className={styles.ctaCardGroup}>
            <Link
              href={content.ctaDeveloper.href}
              className={styles.ctaCardSecondary}
            >
              {content.ctaDeveloper.text}
            </Link>
            <p className={styles.ctaCardMicro}>{content.ctaDeveloper.micro}</p>
          </div>
        </div>
      </div>
    </>
  );
}
