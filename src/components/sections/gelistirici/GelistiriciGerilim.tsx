'use client';

import { useState } from 'react';

interface TimelineItem {
  status: 'completed' | 'inProgress' | 'pending';
  phaseLabel: string;
  text: string;
}

interface AccordionItem {
  question: string;
  answer: string;
}

interface GelistiriciGerilimProps {
  content: {
    sectionLabel: string;
    h2: string;
    introP1: string;
    introP2: string;
    introP3: string;
    devLabel: string;
    timeline: TimelineItem[];
    invLabel: string;
    invSublabel: string;
    accordion: AccordionItem[];
    bridgeText: string;
  };
}

// Timeline dot colors by status
const DOT_COLORS: Record<TimelineItem['status'], string> = {
  completed: '#FFCB00',
  inProgress: '#28AFB0',
  pending: 'rgba(255,255,255,0.20)',
};

// Accordion shadows — DSS Rule 12 Version B (debossed)
const ACCORDION_SHADOW = 'inset 4px 4px 10px rgba(0,0,0,0.28), inset -2px -2px 6px rgba(255,255,255,0.04)';

function AccordionPanel({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      {/* Trigger — debossed */}
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
          border: 'none',
          borderRadius: isOpen ? '10px 10px 0 0' : '10px',
          padding: '18px 20px',
          boxShadow: ACCORDION_SHADOW,
          color: hovered ? '#FFFFFF' : 'rgba(255,255,255,0.90)',
          fontSize: '15px',
          fontWeight: 600,
          textAlign: 'left' as const,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: isOpen ? '0' : '10px',
          transition: 'background-color 160ms ease-out, color 120ms linear',
        }}
      >
        <span>{item.question}</span>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 400,
            color: '#FFCB00',
            flexShrink: 0,
            marginLeft: '12px',
          }}
        >
          {isOpen ? '\u2212' : '+'}
        </span>
      </button>

      {/* Content panel — animated via max-height */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? '160px' : '0',
          padding: isOpen ? '16px 20px' : '0 20px',
          transition: 'max-height 220ms ease-out, padding 220ms ease-out',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '0 0 10px 10px',
          marginBottom: '10px',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function GelistiriciGerilim({ content }: GelistiriciGerilimProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section style={{ background: '#0F2E2C', padding: '80px 0', color: '#fff' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', paddingInline: '52px' }}>
        {/* Header — centered */}
        <div className="text-center" style={{ marginBottom: '56px' }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div style={{ width: '14px', height: '2px', background: '#FFCB00' }} />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,203,0,0.85)',
              }}
            >
              {content.sectionLabel}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '38px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
            }}
          >
            {content.h2}
          </h2>
        </div>

        {/* Intro block */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '760px',
            margin: '0 auto',
            padding: '32px 0 36px',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.80)',
              marginBottom: '12px',
            }}
          >
            {content.introP1}
          </p>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.80)',
              marginBottom: '12px',
            }}
          >
            {content.introP2}
          </p>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.80)',
              marginBottom: 0,
            }}
          >
            {content.introP3}
          </p>
        </div>

        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: '64px', alignItems: 'start', marginBottom: '48px' }}
        >
          {/* Left — Vertical Timeline (DSS Rule 20) */}
          <div>
            {/* Column header */}
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#28AFB0',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              {content.devLabel}
            </div>

            {/* Timeline container */}
            <div style={{ position: 'relative', paddingLeft: '28px' }}>
              {/* Vertical spine */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '8px',
                  bottom: '8px',
                  width: '3px',
                  background: '#28AFB0',
                  borderRadius: '2px',
                }}
              />

              {/* Timeline items */}
              {content.timeline.map((item, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    marginBottom: i < content.timeline.length - 1 ? '28px' : 0,
                    paddingLeft: '8px',
                  }}
                >
                  {/* Dot on spine */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-34px',
                      top: '5px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      border: '2px solid #0F2E2C',
                      background: DOT_COLORS[item.status],
                    }}
                  />

                  {/* Phase label */}
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#FFCB00',
                      marginBottom: '4px',
                    }}
                  >
                    {item.phaseLabel}
                  </div>

                  {/* Item text */}
                  <p
                    style={{
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.95)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Accordion (DSS Rule 12 Version B) */}
          <div>
            {/* Column header */}
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#FFCB00',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              {content.invLabel}
            </div>

            {/* Sub-label */}
            <p
              style={{
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '20px',
                lineHeight: 1.5,
              }}
            >
              {content.invSublabel}
            </p>

            {/* Accordion items */}
            {content.accordion.map((item, i) => (
              <AccordionPanel
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>

        {/* Bridge quote — preserved */}
        <div
          style={{
            borderLeft: '4px solid #FFCB00',
            borderRadius: 0,
            background: 'rgba(255,255,255,0.05)',
            padding: '24px 32px',
            maxWidth: '860px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '15px',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {content.bridgeText}
          </p>
        </div>
      </div>
    </section>
  );
}
