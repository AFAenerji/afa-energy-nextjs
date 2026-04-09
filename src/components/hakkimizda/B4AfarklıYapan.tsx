'use client';

import { useState } from 'react';

interface Card {
  number: string;
  title: string;
  description: string;
}

interface B4AfarklıYapanProps {
  content: {
    kicker: string;
    h2: string;
    cards: Card[];
  };
}

const RIBBON_COLORS = [
  {
    ribbonColor: '#28AFB0',
    ribbonDark: '#1E8E8F',
    shadowColor: 'rgba(40,175,176,0.35)'
  },
  {
    ribbonColor: '#4CC9F0',
    ribbonDark: '#3AB0D9',
    shadowColor: 'rgba(76,201,240,0.35)'
  },
  {
    ribbonColor: '#18625F',
    ribbonDark: '#124A48',
    shadowColor: 'rgba(24,98,95,0.35)'
  },
  {
    ribbonColor: '#28AFB0',
    ribbonDark: '#239A9B',
    shadowColor: 'rgba(40,175,176,0.35)'
  },
  {
    ribbonColor: '#FFCB00',
    ribbonDark: '#E6B800',
    shadowColor: 'rgba(255,203,0,0.40)'
  }
];

function RibbonCard({ card, colorIndex }: { card: Card; colorIndex: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = RIBBON_COLORS[colorIndex];
  const isGold = colorIndex === 4;

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '30px 40px 30px 140px',
        position: 'relative',
        boxShadow: isHovered
          ? '0 8px 32px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)'
          : '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        minHeight: '130px',
        display: 'flex',
        alignItems: 'center',
        transition: 'box-shadow 120ms linear'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="b4-ribbon-card"
    >
      {/* Ribbon */}
      <div
        style={{
          position: 'absolute',
          left: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '90px',
          height: '110px',
          background: `linear-gradient(180deg, ${colors.ribbonColor} 0%, ${colors.ribbonDark} 100%)`,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 8px 25px ${colors.shadowColor}, inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)`,
          zIndex: 10
        }}
      >
        {/* Ribbon highlight overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
            borderRadius: '12px 12px 0 0',
            pointerEvents: 'none'
          }}
        />

        {/* Number container — debossed circle */}
        <div
          style={{
            position: 'relative',
            width: '70px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: isGold
              ? 'linear-gradient(145deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.03) 50%, rgba(255,255,255,0.20) 100%)'
              : 'linear-gradient(145deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,0.10) 100%)',
            boxShadow: isGold
              ? 'inset 3px 3px 8px rgba(0,0,0,0.20), inset -2px -2px 6px rgba(255,255,255,0.30), 2px 2px 4px rgba(0,0,0,0.15)'
              : 'inset 3px 3px 8px rgba(0,0,0,0.30), inset -2px -2px 6px rgba(255,255,255,0.20), 2px 2px 4px rgba(0,0,0,0.20)',
            zIndex: 1
          }}
        >
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '32px',
              fontWeight: 800,
              color: isGold ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
              textShadow: isGold
                ? '0 1px 3px rgba(0,0,0,0.25), 0 -1px 1px rgba(255,255,255,0.30)'
                : '0 1px 2px rgba(0,0,0,0.30), 0 -1px 1px rgba(255,255,255,0.20)',
              position: 'relative',
              zIndex: 2
            }}
          >
            {card.number}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#18625F',
            marginBottom: '8px',
            letterSpacing: '-0.01em'
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontSize: '14px',
            color: '#5A6C7D',
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          {card.description}
        </div>
      </div>
    </div>
  );
}

export default function B4AfarklıYapan({ content }: B4AfarklıYapanProps) {
  return (
    <section style={{ width: '100%', backgroundColor: '#F5F7F6', paddingBlock: '80px' }}>
      <div
        style={{
          maxWidth: '1180px',
          marginInline: 'auto',
          paddingInline: '52px'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#28AFB0',
              marginBottom: '12px'
            }}
          >
            {content.kicker}
          </div>

          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 700,
              color: '#18625F',
              letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            {content.h2}
          </h2>
        </div>

        {/* Card stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {content.cards.map((card, index) => (
            <RibbonCard key={index} card={card} colorIndex={index} />
          ))}
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 767px) {
          section {
            padding-block: 64px !important;
          }
          section > div {
            padding-inline: 24px !important;
          }
          .b4-ribbon-card {
            padding: 100px 24px 24px 24px !important;
            margin-top: 30px !important;
          }
          .b4-ribbon-card > div:first-child {
            left: 50% !important;
            top: -30px !important;
            transform: translateX(-50%) !important;
            width: 80px !important;
            height: 100px !important;
          }
          .b4-ribbon-card > div:first-child > div:nth-child(2) {
            width: 60px !important;
            height: 60px !important;
          }
          .b4-ribbon-card > div:first-child > div:nth-child(2) > span {
            font-size: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
