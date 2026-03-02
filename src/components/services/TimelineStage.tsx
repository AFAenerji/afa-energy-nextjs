import Link from "next/link";
import type { ServicesContent } from "@/content/services";
import styles from "@/app/[locale]/hizmetler/hizmetler.module.css";

type Props = {
  stage: ServicesContent["block2"]["stages"][number];
};

// Future: If accordion behavior needed, extract to client component with "use client"
export default function TimelineStage({ stage }: Props) {
  return (
    <div className={styles.timelineStage}>
      <div className={styles.timelineNumber}>{stage.num}</div>
      <div className={styles.timelineBody}>
        <h3 className={styles.timelineTitle}>{stage.title}</h3>
        {stage.badge && (
          <span className={styles.timelineBadge}>{stage.badge}</span>
        )}
        {stage.lead && <p className={styles.timelineLead}>{stage.lead}</p>}
        <p className={styles.timelineBodyText}>{stage.body}</p>
        <p className={styles.timelineFoot}>{stage.foot}</p>
        {stage.result && (
          <p className={styles.timelineResult}>{stage.result}</p>
        )}
        {stage.cta && (
          <Link href={stage.cta.href} className={styles.timelineCta}>
            {stage.cta.text}
          </Link>
        )}
      </div>
    </div>
  );
}
