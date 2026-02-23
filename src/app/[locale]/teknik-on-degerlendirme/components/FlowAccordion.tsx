'use client';

import { useState } from 'react';
import type { ServiceFlow, ServiceCompass } from './pageContract';
import styles from './FlowAccordion.module.css';

interface FlowAccordionProps {
  compass: ServiceCompass;
  flows: ServiceFlow[];
}

export default function FlowAccordion({ compass, flows }: FlowAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className={styles.flowSection}>
      <div className="afa-container">
        {/* Service Compass Header */}
        <div className={styles.compassHeader}>
          <h2 className={styles.compassTitle}>{compass.title}</h2>
          <p className={styles.compassSubtitle}>{compass.subtitle}</p>
          <p className={styles.compassDescription}>{compass.description}</p>
        </div>

        {/* Flow Bands */}
        {flows.map((flow, index) => {
          const isOpen = openIndex === index;

          return (
            <article key={flow.id} className={styles.flowBand}>
              {/* 8px institutional accent border */}
              <div
                className={styles.bandAccent}
                style={{ background: flow.accentColor }}
              />

              <div className={styles.bandContent}>
                {/* Accordion Header */}
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`flow-body-${flow.id}`}
                >
                  <div className={styles.headerText}>
                    <h3
                      className={styles.flowTitle}
                      style={{ color: flow.accentColor }}
                    >
                      {flow.title}
                    </h3>
                    <p className={styles.flowSubtitle}>{flow.subtitle}</p>
                  </div>

                  {/* Chevron */}
                  <svg
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Accordion Body */}
                <div
                  id={`flow-body-${flow.id}`}
                  className={`${styles.accordionBody} ${isOpen ? styles.accordionBodyOpen : ''}`}
                  role="region"
                  aria-labelledby={`flow-header-${flow.id}`}
                >
                  <div className={styles.stepsContainer}>
                    {flow.steps.map((step) => (
                      <div key={step.number} className={styles.step}>
                        <div
                          className={styles.stepNumber}
                          style={{ background: flow.accentColor }}
                        >
                          {step.number}
                        </div>
                        <div className={styles.stepContent}>
                          <h4 className={styles.stepTitle}>{step.title}</h4>
                          <p className={styles.stepDescription}>{step.description}</p>
                          {step.details && step.details.length > 0 && (
                            <ul className={styles.detailsList}>
                              {step.details.map((detail) => (
                                <li key={detail}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
