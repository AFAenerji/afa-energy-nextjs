import type { ServicesContent } from "@/content/services";
import styles from "@/app/[locale]/services/hizmetler.module.css";

type Props = {
  content: ServicesContent["positioning"];
};

export default function PositioningBlock({ content }: Props) {
  return (
    <section
      id="positioning"
      aria-labelledby="positioning-title"
      className={styles.positioning}
    >
      <div className={styles.positioningContent}>
        <h2 id="positioning-title" className={styles.positioningTitle}>
          {content.title}
        </h2>
        <p className={styles.positioningBody}>{content.body}</p>
        <p className={styles.positioningEmphasis}>{content.emphasis}</p>
      </div>
    </section>
  );
}
