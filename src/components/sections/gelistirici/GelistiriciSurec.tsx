'use client';

import { useState } from 'react';

interface PhaseData {
  num: string;
  title: string;
  body: string;
  highlight?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface GelistiriciSurecProps {
  content: {
    sectionLabel: string;
    h2: string;
    phases: PhaseData[];
    faqLabel: string;
    faqItems: FaqItem[];
  };
}

// Per-card accent colors (border-left + kicker text)
const PHASE_BORDERS = ['#18625F', '#FFCB00', '#F25F5C', '#18625F'];
const KICKER_COLORS = ['#18625F', '#9A7A00', '#C04440', '#18625F'];
const KICKER_LABELS = ['Faz 1', 'Faz 2', 'Faz 3', 'Faz 4'];

// Aggressive embossed shadow — approved variant exceeding DSS v8.2 Rule 11
const PHASE_SHADOW = '12px 12px 32px rgba(0,0,0,0.15), -8px -8px 24px rgba(255,255,255,0.95)';
const PHASE_SHADOW_HOVER = '16px 16px 40px rgba(0,0,0,0.18), -10px -10px 30px rgba(255,255,255,1)';

export default function GelistiriciSurec({ content }: GelistiriciSurecProps) {
  return (
    <section id="surec" style={{ background: '#EEF7F7', padding: '96px 0' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', paddingInline: '52px' }}>
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: '14px', height: '2px', background: '#FFCB00' }} />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#18625F',
              }}
            >
              {content.sectionLabel}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '40px',
              fontWeight: 800,
              color: '#0F2E2C',
              lineHeight: 1.15,
            }}
          >
            {content.h2}
          </h2>
        </div>

        {/* Phase grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '20px' }}
        >
          {content.phases.map((phase, i) => (
            <PhaseCard key={i} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ phase, index }: { phase: PhaseData; index: number }) {
  const [hovered, setHovered] = useState(false);

  // Render body with highlight if present
  const renderBody = () => {
    if (!phase.highlight) return phase.body;
    const parts = phase.body.split(phase.highlight);
    if (parts.length < 2) return phase.body;
    return (
      <>
        {parts[0]}
        <strong style={{ color: '#18625F' }}>{phase.highlight}</strong>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#FFFFFF',
        borderRadius: '16px',
        minHeight: '200px',
        padding: '32px',
        borderLeft: `4px solid ${PHASE_BORDERS[index]}`,
        boxShadow: hovered ? PHASE_SHADOW_HOVER : PHASE_SHADOW,
        transition: 'box-shadow 200ms ease-out',
      }}
    >
      {/* Card content — z-index 2 to stay above ghost number */}
      <div style={{ position: 'relative', zIndex: 2, paddingRight: '80px' }}>
        {/* Kicker */}
        <div
          style={{
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: KICKER_COLORS[index],
            marginBottom: '12px',
          }}
        >
          {KICKER_LABELS[index]}
        </div>
        {/* Title */}
        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '22px',
            fontWeight: 700,
            color: '#0F2E2C',
            marginBottom: '16px',
            lineHeight: 1.3,
          }}
        >
          {phase.title}
        </h3>
        {/* Body */}
        <p style={{ fontSize: '15px', color: '#18625F', lineHeight: 1.7 }}>
          {renderBody()}
        </p>
      </div>

      {/* Ghost number — DSS Rule 18.5 */}
      <span
        className="select-none pointer-events-none"
        style={{
          position: 'absolute',
          bottom: '-20px',
          right: '20px',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '140px',
          fontWeight: 900,
          lineHeight: 1,
          color: 'rgba(24,98,95,0.10)',
          zIndex: 1,
        }}
      >
        {phase.num}
      </span>
    </div>
  );
}
