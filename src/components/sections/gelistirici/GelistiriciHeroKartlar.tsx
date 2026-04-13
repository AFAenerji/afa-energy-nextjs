'use client';

import { useState, useEffect } from 'react';

interface InfoCard {
  kiker: string;
  body: string;
}

interface GelistiriciHeroKartlarProps {
  content: {
    card1: InfoCard;
    card2: InfoCard;
    card3: InfoCard;
  };
}

interface NeuCardProps {
  card: InfoCard;
  ghostNumber: string;
}

export default function GelistiriciHeroKartlar({ content }: GelistiriciHeroKartlarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      style={{
        background: '#18625F',
        padding: '0 52px 64px',
      }}
    >
      <div
        role="list"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'stretch',
          gap: isMobile ? '16px' : '24px',
          maxWidth: '1180px',
          marginInline: 'auto',
        }}
      >
        <NeuCard card={content.card1} ghostNumber="01" />
        <NeuCard card={content.card2} ghostNumber="02" />
        <NeuCard card={content.card3} ghostNumber="03" />
      </div>
    </section>
  );
}

/* ── NeuCard — DSS v8.2 Kural 19.H neumorphic info card ── */
function NeuCard({ card, ghostNumber }: NeuCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="listitem"
      aria-label={`${card.kiker} — ${ghostNumber}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#E8F0F0',
        borderRadius: '20px',
        padding: '7px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered
          ? '14px 14px 32px rgba(0,0,0,0.22), -8px -8px 20px rgba(255,255,255,0.92)'
          : '10px 10px 24px rgba(0,0,0,0.18), -6px -6px 16px rgba(255,255,255,0.88)',
        transition: 'box-shadow 200ms ease-out',
        cursor: 'default',
      }}
    >
      {/* Inner container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          background: 'linear-gradient(145deg, #ffffff 0%, #f0f4f4 100%)',
          borderRadius: '15px',
          overflow: 'hidden',
        }}
      >
        {/* Teal top panel */}
        <div
          style={{
            background: '#18625F',
            padding: '20px 24px',
            overflow: 'hidden',
            borderRadius: '15px 15px 0 0',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#FFCB00',
              display: 'block',
              lineHeight: 1.35,
            }}
          >
            {card.kiker}
          </span>
        </div>
        {/* Debossed content area — Kural 11 */}
        <div
          style={{
            flex: 1,
            padding: '20px 24px',
            background: '#EEF7F7',
            boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.12), inset -3px -3px 8px rgba(255,255,255,0.85)',
            borderRadius: '0 0 15px 15px',
            minHeight: '120px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ghost Number — Kural 18.5 */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '8px',
              bottom: '8px',
              fontSize: '88px',
              fontWeight: 900,
              lineHeight: 1,
              color: 'rgba(24,98,95,0.08)',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
              fontFamily: 'inherit',
            }}
          >
            {ghostNumber}
          </span>
          <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#1a3d36', margin: 0, position: 'relative', zIndex: 1 }}>
            {card.body}
          </p>
        </div>
      </div>
    </div>
  );
}
