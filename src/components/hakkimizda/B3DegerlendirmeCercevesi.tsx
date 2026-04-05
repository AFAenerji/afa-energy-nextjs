'use client';

import Image from 'next/image';

interface Card {
  number: string;
  icon: string;
  title: string;
  body: string;
}

interface B3DegerlendirmeCercevesiProps {
  content: {
    sectionLabel: string;
    h2: string;
    intro: string;
    cards: Card[];
  };
}

export default function B3DegerlendirmeCercevesi({ content }: B3DegerlendirmeCercevesiProps) {
  return (
      <section style={{ background: '#18625F', padding: '80px 0 64px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 52px' }}>
          {/* Kicker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ width: '24px', height: '1px', background: '#FFCB00', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ color: '#FFCB00', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>
              {content.sectionLabel}
            </span>
          </div>

          {/* H2 */}
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 800,
            fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.1,
            color: 'rgba(255,255,255,0.95)', marginBottom: '14px',
            letterSpacing: '-0.02em',
          }}>
            {content.h2}
          </h2>

          {/* Intro */}
          <p style={{
            fontSize: '15px', lineHeight: 1.65,
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '48px',
          }}>
            {content.intro}
          </p>

          {/* 2×2 Card Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {content.cards.map((card, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '16px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column' as const,
                position: 'relative' as const,
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                transition: 'box-shadow 120ms linear',
              }}>
                {/* Gold corner accent */}
                <div style={{
                  position: 'absolute' as const, width: '60px', height: '60px',
                  borderRadius: '50%', background: '#FFCB00', opacity: 0.12, zIndex: 0,
                  ...(index === 0 && { top: '-30px', left: '-30px' }),
                  ...(index === 1 && { top: '-30px', right: '-30px' }),
                  ...(index === 2 && { bottom: '-30px', left: '-30px' }),
                  ...(index === 3 && { bottom: '-30px', right: '-30px' }),
                }} />

                {/* Card header: number + icon */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: '16px',
                  position: 'relative' as const, zIndex: 1,
                }}>
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '40px', fontWeight: 800, color: '#18625F', lineHeight: 1,
                  }}>
                    {card.number}
                  </span>

                  {/* 3D Teal Icon Circle */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    background: 'radial-gradient(circle at 35% 35%, #3DCDD0 0%, #28AFB0 40%, #1A8F90 100%)',
                    boxShadow: '3px 3px 0px rgba(12,70,70,0.55), 6px 6px 0px rgba(12,70,70,0.35), 10px 10px 0px rgba(12,70,70,0.18), 16px 16px 0px rgba(12,70,70,0.08), 4px 8px 18px rgba(0,0,0,0.22), inset 0 2px 4px rgba(255,255,255,0.40), inset 0 -2px 3px rgba(0,0,0,0.15)',
                  }}>
                    <Image
                      src={card.icon}
                      alt=""
                      width={28}
                      height={28}
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '15px',
                  fontWeight: 700, lineHeight: 1.35, marginBottom: '8px',
                  color: '#18625F', position: 'relative' as const, zIndex: 1,
                }}>
                  {card.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '13px', lineHeight: 1.6, color: '#4B5563',
                  flexGrow: 1, position: 'relative' as const, zIndex: 1,
                }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Responsive */}
        <style jsx>{`
          @media (max-width: 768px) {
            section {
              padding: 64px 0 48px !important;
            }
            div[style*='maxWidth: 1180px'] {
              padding: 0 24px !important;
            }
            div[style*='gridTemplateColumns'] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
  );
}
