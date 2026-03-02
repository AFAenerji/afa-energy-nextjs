import styles from "@/app/[locale]/hizmetler/hizmetler.module.css";

type Props = {
  text: string;
};

export default function TransitionBridge({ text }: Props) {
  return (
    <div className={styles.bridge}>
      <p className={styles.bridgeText}>{text}</p>
    </div>
  );
}
