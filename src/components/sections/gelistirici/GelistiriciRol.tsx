'use client';

import { useState } from 'react';

interface CardData {
  label: string;
  subtitle: string;
  body: string;
}

interface GelistiriciRolProps {
  content: {
    sectionLabel: string;
    h2: string;
    description: string;
    bridge: string;
    card1: CardData;
    card2: CardData;
    card3: CardData;
  };
}

// Per-card accent colors (Step 4)
const CARD_BORDER_COLORS = ['#28AFB0', '#FFCB00', '#F25F5C'];
const KICKER_COLORS = ['#1E8A8B', '#9A7A00', '#C04440'];

const GHOST_NUMBERS = ['1', '2', '3'];

// Embossed card shadow — G2 Card Amendment Note (approved override of DSS v8.2 Rule 11)
const CARD_SHADOW = '10px 10px 24px rgba(0,0,0,0.18), -6px -6px 16px rgba(255,255,255,0.92)';
const CARD_SHADOW_HOVER = '12px 12px 28px rgba(0,0,0,0.20), -7px -7px 18px rgba(255,255,255,0.95)';

// Icon container — debossed circle (DSS Rule 18)
const ICON_CONTAINER_SHADOW = 'inset 4px 4px 10px rgba(0,0,0,0.14), inset -3px -3px 8px rgba(255,255,255,0.85)';

// Fill SVG icons — DSS Rule 18 (Phosphor fill weight, 26px, #18625F)
const ICONS = [
  // TEKNİK — MagnifyingGlass fill (inspection / research)
  <svg key="tech" width="26" height="26" viewBox="0 0 256 256" fill="#18625F"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>,
  // TİCARİ — ChartLineUp fill (value growth)
  <svg key="comm" width="26" height="26" viewBox="0 0 256 256" fill="#18625F"><path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31,40,179.31V200H224A8,8,0,0,1,232,208Z"/></svg>,
  // FİNANSAL — Coins fill (financial / monetary)
  <svg key="fin" width="26" height="26" viewBox="0 0 256 256" fill="#18625F"><path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,172c0,13.22-30.79,28-72,28s-72-14.78-72-28v-6.15c1.32.09,2.65.15,4,.15,50.17,0,88-18.92,88-44V103.57C215.09,108.18,232,120.3,232,132ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A163.69,163.69,0,0,0,120,170.26V172c0,8.39-12.41,17.4-32,22.87Zm72-88c0,13.22-30.79,28-72,28S16,97.22,16,84,46.79,56,88,56s72,14.78,72,28Z"/></svg>,
];

function RolCard({ card, index }: { card: CardData; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#E8F3F3',
        borderRadius: '16px',
        minHeight: '240px',
        padding: '28px 24px',
        borderTop: `4px solid ${CARD_BORDER_COLORS[index]}`,
        boxShadow: hovered ? CARD_SHADOW_HOVER : CARD_SHADOW,
        transition: 'box-shadow 200ms ease-out',
      }}
    >
      {/* Icon — DSS Rule 18: debossed circle, absolute top-right */}
      <div
        style={{
          position: 'absolute',
          top: '22px',
          right: '22px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#EEF7F7',
          boxShadow: ICON_CONTAINER_SHADOW,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {ICONS[index]}
      </div>

      {/* Left content — padded to avoid icon overlap */}
      <div style={{ paddingRight: '64px' }}>
        {/* Kicker label */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: KICKER_COLORS[index],
            marginBottom: '8px',
          }}
        >
          {card.label}
        </div>

        {/* Subtitle */}
        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '18px',
            fontWeight: 700,
            color: '#0F2E2C',
            marginBottom: '10px',
            lineHeight: 1.3,
          }}
        >
          {card.subtitle}
        </h3>
      </div>

      {/* Body */}
      <p style={{ fontSize: '14px', color: '#2C3E3D', lineHeight: 1.6 }}>
        {card.body}
      </p>

      {/* Ghost number — DSS Rule 18.5 */}
      <span
        className="select-none pointer-events-none"
        style={{
          position: 'absolute',
          right: '12px',
          bottom: '-10px',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '180px',
          fontWeight: 900,
          lineHeight: 1,
          color: 'rgba(24,98,95,0.06)',
        }}
      >
        {GHOST_NUMBERS[index]}
      </span>
    </div>
  );
}

export default function GelistiriciRol({ content }: GelistiriciRolProps) {
  const cards = [content.card1, content.card2, content.card3];

  return (
    <section style={{ background: '#EEF7F7', padding: '96px 0' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', paddingInline: '52px' }}>
        {/* Kicker with gold line */}
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

        {/* H2 */}
        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '40px',
            fontWeight: 800,
            color: '#0F2E2C',
            marginBottom: '16px',
            lineHeight: 1.15,
          }}
        >
          {content.h2}
        </h2>

        {/* Intro paragraph — ATR highlighted */}
        <p
          className="mb-10"
          style={{ fontSize: '16px', fontWeight: 400, color: '#2C3E3D', maxWidth: '640px', lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{
            __html: content.description.replace(
              /ATR/g,
              '<span style="color:#18625F;font-weight:600">ATR</span>'
            ),
          }}
        />

        {/* Card grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '24px', marginBottom: '40px' }}
        >
          {cards.map((card, i) => (
            <RolCard key={i} card={card} index={i} />
          ))}
        </div>

        {/* Bridge */}
        <p
          style={{
            borderLeft: '3px solid #FFCB00',
            paddingLeft: '20px',
            fontSize: '15px',
            fontWeight: 500,
            fontStyle: 'italic',
            color: '#18625F',
            maxWidth: '640px',
            lineHeight: 1.6,
          }}
        >
          {content.bridge}
        </p>
      </div>
    </section>
  );
}
