'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CardData {
  pill: string;
  subtitle: string;
  body: string;
}

interface GelistiriciRolTanimiProps {
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

const PILL_GRADIENTS = [
  'linear-gradient(180deg, #28AFB0 0%, #18625F 100%)',
  'linear-gradient(180deg, #FFD54F 0%, #FFCB00 100%)',
  'linear-gradient(180deg, #FF7B78 0%, #F25F5C 100%)',
];

const SUBTITLE_COLORS = ['#18625F', '#8a6c00', '#c44442'];

const PILL_TEXT_STYLES: React.CSSProperties[] = [
  { color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.35)' },
  { color: '#0F2E2C' },
  { color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.35)' },
];

const GHOST_NUMBERS = ['01', '02', '03'];

function RolCard({
  card,
  index,
}: {
  card: CardData;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-row items-stretch overflow-hidden"
      style={{
        width: '240px',
        flexShrink: 0,
        minHeight: '210px',
        borderRadius: '20px',
        background: 'linear-gradient(145deg, #f8f8f8 0%, #ffffff 50%, #f5f5f5 100%)',
        padding: '20px',
        gap: '16px',
        boxShadow:
          '10px 10px 24px rgba(0,0,0,0.11), -5px -5px 16px rgba(255,255,255,0.85), inset 2px 2px 4px rgba(255,255,255,1), inset -2px -2px 4px rgba(0,0,0,0.03)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 160ms ease-out, box-shadow 160ms ease-out',
      }}
    >
      {/* Pill */}
      <div
        style={{
          width: '42px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '34px',
            height: '100%',
            minHeight: '140px',
            borderRadius: '17px',
            background: PILL_GRADIENTS[index],
            boxShadow:
              'inset 2px 2px 4px rgba(0,0,0,0.15), inset -2px -2px 4px rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.20em',
              ...PILL_TEXT_STYLES[index],
            }}
          >
            {card.pill}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            lineHeight: 1.3,
            marginBottom: '10px',
            color: SUBTITLE_COLORS[index],
          }}
        >
          {card.subtitle}
        </div>
        <div
          style={{
            fontSize: '11.5px',
            lineHeight: 1.7,
            color: '#4b5563',
          }}
        >
          {card.body}
        </div>
      </div>

      {/* Ghost number */}
      <span
        className="select-none pointer-events-none"
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '14px',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: '42px',
          lineHeight: 1,
          opacity: 0.055,
          color: '#000000',
        }}
      >
        {GHOST_NUMBERS[index]}
      </span>
    </div>
  );
}

export default function GelistiriciRolTanimi({ content }: GelistiriciRolTanimiProps) {
  const cards = [content.card1, content.card2, content.card3];

  return (
    <section className="bg-white">
      <div className="mx-auto grid min-h-[600px] max-w-[1180px] grid-cols-1 lg:grid-cols-[70fr_30fr]">
        {/* ── Mobile photo (top) ── */}
        <div className="relative h-[300px] w-full lg:hidden">
          <Image
            src="/images/gelistirici/dkj7.jpg"
            alt="Project developer on site"
            fill
            className="object-cover"
            quality={85}
            style={{ filter: 'brightness(0.9) saturate(0.85)' }}
          />
        </div>

        {/* ── Left: Text panel ── */}
        <div className="px-6 py-10 lg:pl-[52px] lg:pr-[36px] lg:py-[64px]">
          {/* Section label */}
          <span className="text-afa-primary text-xs uppercase tracking-[0.18em] font-medium mb-[14px] block">
            {content.sectionLabel}
          </span>

          {/* H2 */}
          <h2
            className="font-bold text-afa-primary-dark mb-[16px]"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(22px, 2.2vw, 28px)',
              lineHeight: 1.2,
            }}
          >
            {content.h2}
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-sm leading-relaxed mb-[12px] max-w-[620px]">
            {content.description}
          </p>

          {/* Cards */}
          <div className="flex gap-[16px] items-stretch flex-wrap lg:flex-nowrap">
            {cards.map((card, i) => (
              <RolCard key={i} card={card} index={i} />
            ))}
          </div>

          {/* Bridge — renders AFTER cards */}
          <p
            className="text-gray-600 text-sm italic mb-[36px] max-w-[620px]"
            style={{
              paddingTop: '20px',
              marginTop: '24px',
              borderTop: '1px solid rgba(24,98,95,0.15)',
            }}
          >
            {content.bridge}
          </p>
        </div>

        {/* ── Right: Photo panel (desktop) ── */}
        <div className="relative hidden lg:block">
          <Image
            src="/images/gelistirici/dkj7.jpg"
            alt="Project developer on site"
            fill
            className="object-cover"
            quality={85}
            style={{ filter: 'brightness(0.9) saturate(0.85)' }}
          />

          {/* Accent bar — left edge */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '5px',
              zIndex: 4,
              background:
                'linear-gradient(to bottom, transparent 0%, #FFCB00 12%, #FFCB00 88%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Inset border — top-right corner only */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              bottom: '20px',
              left: '20px',
              zIndex: 3,
              borderTop: '3px solid rgba(255,203,0,0.75)',
              borderRight: '3px solid rgba(255,203,0,0.75)',
              borderBottom: 'none',
              borderLeft: 'none',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}
