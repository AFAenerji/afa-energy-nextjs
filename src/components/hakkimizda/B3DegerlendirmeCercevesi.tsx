'use client';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

interface Card {
  number: string;
  icon: string;
  title: string;
  body: string;
}

interface B3DegerlendirmeCercevesiProps {
  content: {
    kicker: string;
    h2: string;
    intro: string;
    cards: Card[];
    ctaText: string;
    ctaHref: string;
  };
}

const CARD_ICONS = [
  '/icons/engineer.svg',
  '/icons/time-is-money.svg',
  '/icons/increase.svg',
  '/icons/approve.svg',
];

export default function B3DegerlendirmeCercevesi({ content }: B3DegerlendirmeCercevesiProps) {
  return (
    <section className="bg-afa-primary-dark" style={{ paddingTop: '88px', paddingBottom: '88px' }}>
      <div
        className={clsx('mx-auto', 'grid', 'items-start', 'gap-12')}
        style={{
          maxWidth: '1180px',
          padding: '0 40px',
          gridTemplateColumns: '5fr 7fr',
        }}
      >
        {/* Left Column */}
        <div>
          {/* Kicker */}
          <div className={clsx('flex', 'items-center', 'gap-2', 'mb-4')}>
            <div className="bg-afa-gold" style={{ width: '20px', height: '1px' }} />
            <span
              className={clsx('text-afa-gold', 'uppercase', 'font-semibold')}
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.18em',
                fontWeight: 600,
              }}
            >
              {content.kicker}
            </span>
          </div>

          {/* H2 */}
          <h2
            className={clsx('font-bold', 'mb-5')}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(24px, 2.4vw, 34px)',
              lineHeight: '1.15',
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 700,
            }}
          >
            {content.h2}
          </h2>

          {/* Intro */}
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '15px',
              lineHeight: '1.6',
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            {content.intro}
          </p>
        </div>

        {/* Right Column - 2x2 Card Grid */}
        <div className={clsx('grid', 'gap-5')} style={{ gridTemplateColumns: '1fr 1fr' }}>
          {content.cards.map((card, idx) => (
            <div
              key={card.number}
              className={clsx('rounded-xl', 'border', 'border-afa-gold', 'transition-background-color', 'duration-[120ms]', 'ease-linear')}
              style={{
                background: 'rgba(15,46,44,0.55)',
                borderColor: 'rgba(40,175,176,0.20)',
                borderBottomWidth: '3px',
                borderBottomColor: '#FFCB00',
                padding: '24px',
              }}
            >
              {/* Number Badge */}
              <span
                className={clsx('text-afa-gold', 'font-bold')}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  opacity: 1.0,
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                {card.number}
              </span>

              {/* Icon Circle */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #dde2e5 100%)',
                  boxShadow: '3px 3px 0px rgba(165,170,173,0.70), 6px 6px 0px rgba(155,160,163,0.45), 10px 10px 0px rgba(145,150,153,0.25), 4px 8px 18px rgba(0,0,0,0.16), inset 0 2px 3px rgba(255,255,255,0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginBottom: '12px',
                }}
              >
                <Image
                  src={CARD_ICONS[idx] || CARD_ICONS[0]}
                  alt=""
                  width={32}
                  height={32}
                  style={{
                    filter: 'invert(28%) sepia(44%) saturate(567%) hue-rotate(131deg) brightness(93%) contrast(92%)',
                  }}
                />
              </div>

              {/* Card Title */}
              <h3
                className="font-bold"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.3',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                {card.title}
              </h3>

              {/* Card Body */}
              <p
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.72)',
                  marginTop: '8px',
                }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Row - Full Width Below Grid */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
          <Link
            href={content.ctaHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: '1.5px solid #FFCB00',
              color: '#FFCB00',
              fontWeight: 700,
              fontSize: '15px',
              padding: '13px 28px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontFamily: 'Open Sans, sans-serif',
              transition: 'background-color 120ms linear',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,203,0,0.10)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {content.ctaText} →
          </Link>
        </div>
      </div>

      {/* Mobile Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*='gridTemplateColumns: 5fr 7fr'] {
            grid-template-columns: 1fr !important;
          }
          div[style*='gridTemplateColumns: 1fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          div[style*='gridTemplateColumns: 1fr 1fr'] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
