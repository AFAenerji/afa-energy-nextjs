'use client';

import Image from 'next/image';
import Link from 'next/link';

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
    ctaBandLabel: string;
    ctaBandH2: string;
    ctaBandBody: string;
    ctaBandButtonLabel: string;
    ctaBandButtonHref: string;
  };
}

export default function B3DegerlendirmeCercevesi({ content }: B3DegerlendirmeCercevesiProps) {
  return (
    <>
      {/* PART 1 — Cards Section */}
      <section style={{ background: '#18625F', padding: '80px 0 64px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
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
            div[style*='maxWidth: 1200px'] {
              padding: 0 24px !important;
            }
            div[style*='gridTemplateColumns'] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* PART 2 — Photo CTA Band */}
      <div style={{ position: 'relative', width: '100%', height: '340px', overflow: 'hidden' }}>
        {/* Background photo */}
        <Image
          src="/images/b3-cta-photo.jpg"
          alt="Şebeke iletim altyapısı"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'brightness(0.9) saturate(0.85)',
          }}
        />

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,46,44,0.78)' }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 1,
          height: '100%',
          display: 'flex', flexDirection: 'column' as const,
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center' as const,
          padding: '48px 40px',
          maxWidth: '1200px', margin: '0 auto',
        }}>
          {/* Label with lines */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,203,0,0.60)', display: 'inline-block' }} />
            <span style={{ color: 'rgba(255,203,0,0.90)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>
              {content.ctaBandLabel}
            </span>
            <span style={{ width: '24px', height: '1px', background: 'rgba(255,203,0,0.60)', display: 'inline-block' }} />
          </div>

          {/* H2 */}
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 800,
            lineHeight: 1.15, letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '16px', maxWidth: '640px',
          }}>
            {content.ctaBandH2}
          </h2>

          {/* Body */}
          <p style={{
            fontSize: '15px', lineHeight: 1.65,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '520px', marginBottom: '36px',
          }}>
            {content.ctaBandBody}
          </p>

          {/* Gold CTA Button */}
          <Link
            href={content.ctaBandButtonHref}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '15px 32px', borderRadius: '6px',
              background: '#FFCB00', color: '#0F2E2C',
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '15px', fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(255,203,0,0.35)',
              transition: 'background-color 120ms linear, box-shadow 120ms linear',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E6B800';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(255,203,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFCB00';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,203,0,0.35)';
            }}
          >
            {content.ctaBandButtonLabel}
          </Link>
        </div>

        {/* Mobile Responsive */}
        <style jsx>{`
          @media (max-width: 768px) {
            div[style*='height: 340px'] {
              height: 380px !important;
            }
            div[style*='padding: 48px 40px'] {
              padding: 40px 24px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
