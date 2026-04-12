'use client';

import { useState, useEffect } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface GelistiriciFaqProps {
  content: {
    faqLabel: string;
    faqHeading: string;
    faqIntro: string;
    faqItems: FaqItem[];
  };
}

// Trigger shadows
const TRIGGER_SHADOW = 'inset 0 2px 4px rgba(255,255,255,0.90), 4px 6px 12px rgba(0,0,0,0.15), 2px 3px 6px rgba(0,0,0,0.10), -2px -2px 8px rgba(255,255,255,0.80)';
const TRIGGER_SHADOW_ACTIVE = 'inset 0 2px 4px rgba(255,255,255,0.60), 2px 3px 8px rgba(0,0,0,0.10), -1px -1px 4px rgba(255,255,255,0.60)';

// Answer panel shadow
const PANEL_SHADOW = 'inset 4px 5px 12px rgba(0,0,0,0.20), inset -2px -3px 8px rgba(255,255,255,0.10)';

// Chevron shadow
const CHEVRON_SHADOW = 'inset 0 1px 2px rgba(255,255,255,0.80), 1px 2px 4px rgba(0,0,0,0.10), -1px -1px 3px rgba(255,255,255,0.90)';

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      {/* Trigger */}
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          background: isOpen ? '#F0F0F0' : '#F5F5F5',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left' as const,
          borderRadius: isOpen ? '24px 24px 0 0' : '50px',
          boxShadow: isOpen ? TRIGGER_SHADOW_ACTIVE : TRIGGER_SHADOW,
          transition: 'box-shadow 200ms ease-out, background-color 160ms ease-out',
        }}
      >
        {/* Question text */}
        <span
          style={{
            flex: 1,
            fontSize: '16px',
            fontWeight: 600,
            color: '#0F2E2C',
            lineHeight: 1.4,
          }}
        >
          {item.q}
        </span>

        {/* Chevron in debossed circle */}
        <span
          style={{
            width: '28px',
            height: '28px',
            flexShrink: 0,
            background: '#E8E8E8',
            borderRadius: '50%',
            boxShadow: CHEVRON_SHADOW,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 200ms ease-out',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 8l5 5 5-5"
              stroke="#18625F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Answer panel — opacity + visibility animation only */}
      <div
        style={{
          background: '#18625F',
          borderRadius: '0 0 24px 24px',
          boxShadow: isOpen ? PANEL_SHADOW : 'none',
          padding: isOpen ? '24px 32px' : '0 32px',
          height: isOpen ? 'auto' : '0',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' as const : 'hidden' as const,
          pointerEvents: isOpen ? 'auto' as const : 'none' as const,
          transition: 'opacity 160ms ease-out, visibility 160ms ease-out',
        }}
      >
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.95)',
            margin: 0,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function GelistiriciFaq({ content }: GelistiriciFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section style={{ background: '#EEF7F7', padding: '96px 0' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', paddingInline: '52px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          {/* Kicker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span
              style={{
                width: '28px',
                height: '2px',
                background: '#FFCB00',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#18625F',
              }}
            >
              {content.faqLabel}
            </span>
          </div>

          {/* Heading with teal left accent */}
          <h2
            style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: 800,
              color: '#0F2E2C',
              lineHeight: 1.15,
              marginBottom: '20px',
              paddingLeft: '20px',
              borderLeft: '4px solid #28AFB0',
              borderRadius: 0,
            }}
          >
            {content.faqHeading}
          </h2>

          {/* Intro paragraph */}
          <p
            style={{
              fontSize: isMobile ? '15px' : '16px',
              color: '#3a5452',
              lineHeight: 1.75,
              paddingLeft: isMobile ? 0 : '24px',
              maxWidth: '680px',
            }}
          >
            {content.faqIntro}
          </p>
        </div>

        {/* Accordion items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {content.faqItems.map((item, i) => (
            <FaqAccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
