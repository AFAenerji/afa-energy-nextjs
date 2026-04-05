'use client';

import clsx from 'clsx';
import Image from 'next/image';

interface StatusCard {
  name: string;
  desc: string;
  icon: string;
  barLabel: string;
}

interface B2BizKimizProps {
  content: {
    kicker: string;
    h2: string;
    paragraph1: string;
    paragraph2: string;
    statusLabel: string;
    statusCards: StatusCard[];
    footnote: string;
    photoAlt: string;
    pullQuoteMain: string[];
    pullQuoteSub: string;
  };
}

export default function B2BizKimiz({ content }: B2BizKimizProps) {
  return (
    <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div
        className={clsx('mx-auto', 'grid', 'items-stretch', 'gap-10')}
        style={{
          maxWidth: '1180px',
          padding: '0 52px',
          gridTemplateColumns: '6fr 6fr',
          alignItems: 'stretch',
        }}
      >
        {/* Left Column */}
        <div>
          {/* Kicker */}
          <div className={clsx('flex', 'items-center', 'gap-2', 'mb-4')}>
            <div className="bg-afa-gold" style={{ width: '20px', height: '1px' }} />
            <span
              className={clsx('text-afa-accent', 'uppercase', 'font-semibold')}
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
              fontSize: 'clamp(26px, 2.6vw, 34px)',
              lineHeight: '1.18',
              color: '#0F2E2C',
              fontWeight: 700,
            }}
          >
            {content.h2}
          </h2>

          {/* Paragraph 1 */}
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '15px',
              lineHeight: '1.65',
              color: '#374151',
            }}
          >
            {content.paragraph1}
          </p>

          {/* Divider */}
          <div style={{ height: '2px', background: '#E5E7EB', margin: '22px 0' }} />

          {/* Paragraph 2 */}
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '15px',
              lineHeight: '1.65',
              color: '#374151',
            }}
          >
            {content.paragraph2}
          </p>

          {/* Status Label */}
          <div
            className={clsx('uppercase', 'font-semibold')}
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.18em',
              fontWeight: 600,
              color: '#0F2E2C',
              marginTop: '24px',
              marginBottom: '14px',
              whiteSpace: 'pre-line',
            }}
          >
            {content.statusLabel}
          </div>

          {/* Status Cards */}
          <div>
            {content.statusCards.map((card, idx) => {
              const isGreen = idx === 0;
              const isYellow = idx === 1;
              const isRed = idx === 2;

              const barGradient = isGreen
                ? 'linear-gradient(180deg, #1E9A9B 0%, #34C5C6 100%)'
                : isYellow
                  ? 'linear-gradient(180deg, #E6B800 0%, #FFD740 100%)'
                  : 'linear-gradient(180deg, #D94542 0%, #F47572 100%)';

              const barLabelColor = isYellow ? '#0F2E2C' : '#FFFFFF';

              const borderLeftColor = isGreen
                ? '#28AFB0'
                : isYellow
                  ? '#FFCB00'
                  : '#F25F5C';

              const titleColor = isGreen
                ? '#28AFB0'
                : isYellow
                  ? '#C9950A'
                  : '#F25F5C';

              const hoverBg = isGreen
                ? 'rgba(40,175,176,0.06)'
                : isYellow
                  ? 'rgba(255,203,0,0.06)'
                  : 'rgba(242,95,92,0.06)';

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    minHeight: '120px',
                    padding: '22px',
                    marginBottom: '16px',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    borderLeft: `4px solid ${borderLeftColor}`,
                    background: '#FFFFFF',
                    maxWidth: '480px',
                    transition: 'background-color 120ms linear, box-shadow 120ms linear',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = hoverBg;
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Pill Bar */}
                  <div
                    style={{
                      width: '36px',
                      minHeight: '76px',
                      borderRadius: '50px',
                      flexShrink: 0,
                      marginRight: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: barGradient,
                      boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.30), inset 0 -1px 3px rgba(255,255,255,0.15), inset 2px 0 5px rgba(0,0,0,0.20)',
                    }}
                  >
                    <span
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: barLabelColor,
                      }}
                    >
                      {card.barLabel}
                    </span>
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '14px',
                        lineHeight: '1.3',
                        fontWeight: 700,
                        marginBottom: '4px',
                        color: titleColor,
                      }}
                    >
                      {card.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '13px',
                        lineHeight: '1.4',
                        color: '#6B7280',
                      }}
                    >
                      {card.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footnote */}
          <p
            className="italic"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '13px',
              lineHeight: '1.65',
              color: '#6B7280',
              marginTop: '18px',
            }}
          >
            {content.footnote}
          </p>
        </div>

        {/* Right Column - Photo */}
        <div className={clsx('flex', 'flex-col')} style={{ height: '100%' }}>
          <div
            className={clsx('relative', 'rounded-md', 'overflow-hidden', 'flex-1')}
            style={{
              minHeight: '320px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.12)',
            }}
          >
            {/* Photo */}
            <Image
              src="/images/hakkimizda-biz-kimiz.jpg"
              alt={content.photoAlt}
              fill
              className={clsx('object-cover', 'object-center')}
              style={{ filter: 'brightness(0.9) saturate(0.85)' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.style.background =
                    'linear-gradient(155deg, #1c6360 0%, #0f3d3a 45%, #082826 100%)';
                }
              }}
            />

            {/* Gold Pull-quote Overlay */}
            <div
              className={clsx('absolute', 'bottom-0', 'left-0', 'right-0', 'flex', 'flex-col')}
              style={{
                height: '48%',
                background: 'rgba(255,203,0,0.92)',
                padding: '24px 28px 28px',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                WebkitMaskImage: 'linear-gradient(transparent, black 30%)',
                maskImage: 'linear-gradient(transparent, black 30%)',
              }}
            >
              {/* Pull quote main */}
              <div
                className="font-black"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(16px, 1.8vw, 22px)',
                  lineHeight: '1.35',
                  color: '#0F2E2C',
                  letterSpacing: '-0.01em',
                  marginBottom: '8px',
                  fontWeight: 900,
                }}
              >
                {content.pullQuoteMain.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>

              {/* Pull separator */}
              <div
                style={{
                  width: '28px',
                  height: '2px',
                  background: 'rgba(15,46,44,0.28)',
                  marginBottom: '8px',
                }}
              />

              {/* Pull sub */}
              <p
                className={clsx('italic', 'font-semibold')}
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'rgba(15,46,44,0.85)',
                  maxWidth: '30ch',
                  fontWeight: 600,
                }}
              >
                {content.pullQuoteSub}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*='gridTemplateColumns'] {
            grid-template-columns: 1fr !important;
          }
          div[style*='gridTemplateColumns'] > div:nth-child(1) {
            order: 1;
          }
          div[style*='gridTemplateColumns'] > div:nth-child(2) {
            order: 2;
            margin-top: 32px;
          }
          div[style*='minHeight: 320px'] {
            min-height: 280px !important;
          }
          div[style*='maxWidth: 480px'] {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
