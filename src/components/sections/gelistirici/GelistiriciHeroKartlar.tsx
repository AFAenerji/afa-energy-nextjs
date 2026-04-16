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

interface StackedCardProps {
  card: InfoCard;
  number: string;
}

export default function GelistiriciHeroKartlar({ content }: GelistiriciHeroKartlarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      style={{
        background: '#18625F',
        padding: isMobile ? '0 24px 60px' : '0 52px 80px',
        marginTop: isMobile ? 0 : -60,
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'stretch',
          gap: isMobile ? '40px' : '32px',
          maxWidth: '1180px',
          marginInline: 'auto',
        }}
      >
        <StackedCard card={content.card1} number="01" />
        <StackedCard card={content.card2} number="02" />
        <StackedCard card={content.card3} number="03" />
      </div>
    </section>
  );
}

function StackedCard({ card, number }: StackedCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        paddingBottom: '20px',
        paddingRight: '20px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Back layer — z:1 — DSS approved transform exception */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '0',
          bottom: '0',
          background: 'rgba(255,203,0,0.08)',
          border: '1px solid rgba(255,203,0,0.15)',
          borderRadius: '20px',
          zIndex: 1,
          /* USER-APPROVED DSS 22.4 OVERRIDE: transform on back layer only */
          transform: hovered ? 'translate(-4px, -4px)' : 'translate(0, 0)',
          transition: 'transform 200ms ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* Middle layer — z:2 — no transform */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          bottom: '10px',
          background: 'rgba(255,203,0,0.15)',
          border: '1px solid rgba(255,203,0,0.25)',
          borderRadius: '20px',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Front card — z:3 — NO transform, box-shadow only */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          background: '#0F2E2C',
          borderRadius: '20px',
          padding: '20px 20px 24px',
          minHeight: '200px',
          boxShadow: hovered
            ? '0 24px 48px rgba(0,0,0,0.35)'
            : '0 16px 40px rgba(0,0,0,0.30)',
          transition: 'box-shadow 200ms ease-out',
        }}
      >
        {/* Number — top right */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '14px',
            right: '18px',
            fontSize: '36px',
            fontWeight: 900,
            lineHeight: 1,
            color: 'rgba(255,203,0,0.25)',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {number}
        </span>

        {/* Title */}
        <div
          style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#FFCB00',
            marginBottom: '12px',
            paddingRight: '48px',
          }}
        >
          {card.kiker}
        </div>

        {/* Body */}
        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.85)',
            margin: 0,
          }}
        >
          {card.body}
        </p>
      </div>
    </div>
  );
}
