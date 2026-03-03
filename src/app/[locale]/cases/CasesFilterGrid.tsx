"use client";

import { useState } from "react";
import styles from "./vakalar.module.css";

/* ── Types ── */
type CaseCategory = "grid-risk" | "bankability" | "optimization";

export interface CaseItem {
  ref: string;
  category: CaseCategory;
  title: string;
  specs: string;
  diagnosis: string;
}

interface FilterConfig {
  key: "all" | CaseCategory;
  label: string;
}

interface Props {
  cases: CaseItem[];
  filters: FilterConfig[];
  categoryLabels: Record<CaseCategory, string>;
}

/* ── Category → accent color (for hover border) ── */
const ACCENT_MAP: Record<CaseCategory, string> = {
  "grid-risk": "#F25F5C",
  bankability: "#28AFB0",
  optimization: "#FFCB00",
};

/* ── Category → badge CSS class ── */
const BADGE_MAP: Record<CaseCategory, string> = {
  "grid-risk": styles.caseBadgeGridRisk,
  bankability: styles.caseBadgeBankability,
  optimization: styles.caseBadgeOptimization,
};

export default function CasesFilterGrid({
  cases,
  filters,
  categoryLabels,
}: Props) {
  const [active, setActive] = useState<"all" | CaseCategory>("all");

  const filtered =
    active === "all" ? cases : cases.filter((c) => c.category === active);

  return (
    <>
      {/* FILTER BAR */}
      <section className={styles.filterSection}>
        <div className={styles.filterBar}>
          {filters.map((f) => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${
                active === f.key ? styles.filterBtnActive : ""
              }`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* CASE CARDS */}
      <section className={styles.casesSection}>
        <div className={styles.casesGrid}>
          {filtered.map((c) => (
            <article
              key={c.ref}
              className={styles.caseCard}
              style={{ "--card-accent": ACCENT_MAP[c.category] } as React.CSSProperties}
            >
              <span className={`${styles.caseBadge} ${BADGE_MAP[c.category]}`}>
                {categoryLabels[c.category]}
              </span>
              <h3 className={styles.caseTitle}>{c.title}</h3>
              <p className={styles.caseSpecs}>{c.specs}</p>
              <p className={styles.caseRef}>{c.ref}</p>
              <p className={styles.caseDiagnosis}>{c.diagnosis}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
