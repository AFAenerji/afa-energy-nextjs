import Link from "next/link";
import type { ServicesContent } from "@/content/services";
import styles from "@/app/[locale]/services/hizmetler.module.css";
import {
  IndependenceIcon,
  GridRealityIcon,
  DecisionDisciplineIcon,
  InvestorFocusIcon,
} from "./icons/WhyAfaIcons";

type Props = {
  content: ServicesContent["whyAfa"];
};

const ICONS = [
  IndependenceIcon,
  GridRealityIcon,
  DecisionDisciplineIcon,
  InvestorFocusIcon,
];

export default function WhyAfaGrid({ content }: Props) {
  return (
    <>
      <h2 id="why-afa-title" className={styles.whyAfaTitle}>
        {content.title}
      </h2>

      <div className={styles.whyAfaGrid}>
        {content.items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <div key={item.title} className={styles.whyCard}>
              <div className={styles.whyCardIcon}>
                <Icon />
              </div>
              <h3 className={styles.whyCardTitle}>{item.title}</h3>
              <p className={styles.whyCardText}>{item.text}</p>
            </div>
          );
        })}
      </div>

      <Link href={content.link.href} className={styles.whyAfaLink}>
        {content.link.text} &rarr;
      </Link>
    </>
  );
}
