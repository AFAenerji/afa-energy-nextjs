'use client';

import Link from 'next/link';

interface B1HeroProps {
  content: {
    sloganLabel: string;
    h1: string;
    subheadline: string;
    body: string;
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
        className={clsx('absolute', 'inset-0', 'pointer-events-none')}
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          zIndex: 0,
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
        <p
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 'clamp(14px, 1.15vw, 16px)',
            lineHeight: '1.75',
            maxWidth: '600px',
            marginTop: '18px',
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          {content.body}
        </p>

        {/* Metric Cards */}
        <div
          className={clsx('grid', 'gap-6')}
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            marginTop: '32px',
          }}
        >
          {content.metrics.map((metric, idx) => {
            const borderColorClass =
              idx === 0
                ? 'border-afa-accent'
                : idx === 1
                  ? ''
                  : 'border-afa-gold';
            const borderColorInline = idx === 1 ? { borderBottomColor: '#4CC9F0' } : {};

            return (
              <div
                key={idx}
                className={`relative rounded-2xl ${borderColorClass}`}
                style={{
                  background: 'linear-gradient(160deg, #1f7d7a 0%, #165f5c 55%, #0f4846 100%)',
                  padding: '36px 32px 32px',
                  border: '1px solid rgba(40,175,176,0.25)',
                  borderBottomWidth: '3px',
                  boxShadow:
                    '0 1px 0 rgba(255,255,255,0.12) inset, 0 -4px 0 rgba(0,0,0,0.30) inset, 0 20px 48px rgba(0,0,0,0.40), 0 6px 16px rgba(0,0,0,0.22)',
                  overflow: 'hidden',
                  ...borderColorInline,
                }}
              >
                {/* Radial highlight */}
                <div
                  className="absolute"
                  style={{
                    top: '0',
                    right: '0',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.09), transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <div className={clsx('text-afa-gold', 'font-extrabold')} style={{ fontSize: 'clamp(40px, 3.8vw, 54px)', lineHeight: '1', fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.45', fontFamily: 'Open Sans, sans-serif', marginTop: '8px', color: 'rgba(255,255,255,0.70)' }}>
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <Link
          href={content.ctaHref}
          className={clsx('inline-flex', 'items-center', 'gap-2', 'bg-afa-gold', 'text-afa-deep', 'font-bold', 'rounded-md', 'transition-background-color', 'duration-[120ms]', 'ease-linear', 'transition-box-shadow')}
          style={{
            padding: '13px 24px',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            marginTop: '22px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E6B800';
            e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';
          }}
        >
          <span>{content.ctaText}</span>
          <span
            className={clsx('inline-block', 'transition-transform', 'duration-[120ms]', 'ease-linear')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            →
          </span>
        </Link>
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
