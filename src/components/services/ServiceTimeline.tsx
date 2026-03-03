import type { ServicesContent } from "@/content/services";
import styles from "@/app/[locale]/services/hizmetler.module.css";
import TimelineStage from "./TimelineStage";

type Props = {
  content: ServicesContent["block2"];
};

export default function ServiceTimeline({ content }: Props) {
  return (
    <>
      {content.label && (
        <p className={styles.block2Label}>{content.label}</p>
      )}
      <h2 id="technical-validation-title" className={styles.block2Title}>
        {content.title}
      </h2>

      <div className={styles.timelineList}>
        {content.stages.map((stage) => (
          <TimelineStage key={stage.num} stage={stage} />
        ))}
      </div>
    </>
  );
}
