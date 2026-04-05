'use client';

import Image from 'next/image';
import Link from 'next/link';

interface B1HeroProps {
  content: {
    sloganLabel: string;
    h1: string;
    subtitle: string;
    heroBody: string;
    heroCta: string;
    metrics: Array<{ value: string; label: string }>;
  };
  locale: string;
}

export default function B1Hero({ content, locale }: B1HeroProps) {
  return (
    <section style={{
      position: 'relative',
      background: '#18625F',
      minHeight: '540px',
      overflow: 'hidden',
    }}>
      {/* LAYER 1 — Grid Texture (z-index: 0) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* LAYER 2 — Photo + Gradient (z-index: 1) */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '52%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
      }}>
        <Image
          src="/images/hero-romania-flag.jpg"
          alt="Romanya bayrağı, Karpatlar"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          quality={85}
        />
        {/* Gradient overlay — left edge blends into teal */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #18625F 0%, rgba(24,98,95,0.92) 18%, rgba(24,98,95,0.58) 42%, rgba(24,98,95,0.15) 72%, rgba(24,98,95,0.00) 100%)',
        }} />
      </div>

      {/* LAYER 3 — Content (z-index: 3) */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        maxWidth: '1180px',
        marginInline: 'auto',
        paddingInline: '52px',
        paddingBlock: '60px',
      }}>
        {/* Kicker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '28px', height: '2px', background: '#FFCB00', flexShrink: 0 }} />
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#FFCB00',
            fontWeight: 600,
          }}>
            {content.sloganLabel}
          </span>
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(32px, 3.5vw, 50px)',
          fontWeight: 800,
          color: '#FFFFFF',
          lineHeight: 1.1,
          margin: '0 0 20px',
        }}>
          {content.h1}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(15px, 1.5vw, 19px)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.90)',
          margin: '0 0 16px',
        }}>
          {content.subtitle}
        </p>

        {/* Body */}
        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.76)',
          lineHeight: 1.75,
          maxWidth: '400px',
          margin: '0 0 32px',
        }}>
          {content.heroBody}
        </p>

        {/* CTA Button */}
        <Link href={`/${locale}/atr-matrix`} style={{
          display: 'inline-block',
          background: '#FFCB00',
          color: '#0F2E2C',
          fontWeight: 700,
          fontSize: '15px',
          padding: '14px 28px',
          borderRadius: '6px',
          textDecoration: 'none',
          marginBottom: '48px',
          letterSpacing: '0.01em',
          transition: 'background-color 120ms linear',
        }}>
          {content.heroCta} →
        </Link>

        {/* Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '520px',
        }}>
          {content.metrics.map((metric, index) => (
            <div key={index} style={{
              background: 'linear-gradient(160deg, #1E7A77 0%, #175E5C 100%)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '10px',
              borderBottom: '2px solid #28AFB0',
              padding: '20px 22px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.20), 0 8px 20px rgba(0,0,0,0.30), 0 20px 40px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '28px',
                fontWeight: 800,
                color: '#FFCB00',
                margin: '0 0 6px',
                lineHeight: 1,
              }}>
                {metric.value}
              </p>
              <p style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.78)',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Responsive */}
      <style jsx>{`
        @media (max-width: 767px) {
          div[style*="width: 52%"] {
            width: 100% !important;
            opacity: 0.25;
          }
          div[style*="maxWidth: 1180px"] {
            padding-inline: 24px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          div[style*="width: 52%"] {
            width: 45% !important;
          }
          div[style*="maxWidth: 1180px"] {
            padding-inline: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
