'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface B1HeroProps {
  content: {
    sloganLabel: string;
    h1: string;
    subheadline: string;
    heroBody: string;
    heroCta: string;
    metrics: Array<{ value: string; label: string }>;
    ctaText: string;
    ctaHref: string;
  };
}

export default function B1Hero({ content }: B1HeroProps) {
  return (
    <section className={clsx('relative', 'w-full', 'bg-afa-primary-dark')} style={{ padding: '96px 64px 88px' }}>
      {/* Dark Overlay */}
      <div className={clsx('absolute', 'inset-0', 'bg-afa-deep')} style={{ opacity: 0.65, zIndex: 0 }} />

      {/* Grid Pattern Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className={clsx('relative', 'mx-auto')} style={{ maxWidth: '1120px', zIndex: 1 }}>
        {/* Slogan Label */}
        <div className={clsx('flex', 'items-center', 'gap-3', 'mb-4')}>
          <div className="bg-afa-gold" style={{ width: '24px', height: '2px' }} />
          <span
            className={clsx('text-afa-gold', 'uppercase', 'font-semibold')}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.22em',
              fontWeight: 600,
            }}
          >
            {content.sloganLabel}
          </span>
        </div>

        {/* H1 */}
        <h1
          className="font-extrabold"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(34px, 4.8vw, 62px)',
            lineHeight: '1.10',
            maxWidth: '640px',
            color: 'rgba(255,255,255,0.95)',
            fontWeight: 800,
          }}
        >
          {content.h1}
        </h1>

        {/* Subheadline */}
        <p
          className="font-semibold"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            lineHeight: '1.35',
            maxWidth: '620px',
            marginTop: '14px',
            color: 'rgba(255,255,255,0.90)',
            fontWeight: 600,
          }}
        >
          {content.subheadline}
        </p>

        {/* Body */}
        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.7,
          maxWidth: '420px',
          margin: '24px 0 0',
        }}>
          {content.heroBody}
        </p>

        {/* CTA Button */}
        <Link href="/tr/atr-matrix" style={{
          display: 'inline-block',
          background: '#FFCB00',
          color: '#0F2E2C',
          fontWeight: 700,
          fontSize: '15px',
          padding: '14px 28px',
          borderRadius: '6px',
          textDecoration: 'none',
          marginTop: '32px',
          marginBottom: '40px',
          transition: 'background-color 120ms linear',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#E6B800';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FFCB00';
        }}>
          {content.heroCta} →
        </Link>

        {/* Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          width: 'fit-content',
        }}>
          {content.metrics.map((metric, index) => (
            <div key={index} style={{
              background: 'linear-gradient(160deg, #1E7A77 0%, #175E5C 100%)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '10px',
              borderBottom: '2px solid #28AFB0',
              padding: '20px 24px',
              minWidth: '160px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.25), 0 16px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.10)',
            }}>
              <p style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#FFCB00',
                margin: '0 0 6px',
                lineHeight: 1,
                fontFamily: 'Montserrat, sans-serif',
              }}>
                {metric.value}
              </p>
              <p style={{
                fontSize: '12px',
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
        @media (max-width: 768px) {
          section {
            padding: 64px 24px 56px !important;
          }
          div[style*='grid-template-columns'] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          section {
            padding: 80px 40px 72px !important;
          }
        }
      `}</style>
    </section>
  );
}
