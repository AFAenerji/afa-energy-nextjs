'use client';

import clsx from 'clsx';

interface Market {
  number: string;
  name: string;
  leftLabel: string;
  leftBody: string;
  rightLabel: string;
  rightBody: string;
}

interface B5PiyasaDinamikleriProps {
  content: {
    kicker: string;
    h2: string;
    intro: string;
    markets: Market[];
    closingParagraph1: string;
    closingParagraph2: string;
  };
}

export default function B5PiyasaDinamikleri({ content }: B5PiyasaDinamikleriProps) {
  return (
    <section className="bg-afa-primary-dark" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="mx-auto" style={{ maxWidth: '1180px', padding: '0 52px' }}>
        {/* Header */}
        <div className={clsx('text-center', 'mb-12')}>
          {/* Kicker */}
          <div className={clsx('flex', 'items-center', 'justify-center', 'gap-3', 'mb-4')}>
            <div className="bg-afa-gold" style={{ width: '24px', height: '1px', opacity: 0.5 }} />
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
            <div className="bg-afa-gold" style={{ width: '24px', height: '1px', opacity: 0.5 }} />
          </div>

          {/* H2 */}
          <h2
            className="font-bold"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              lineHeight: '1.15',
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 700,
            }}
          >
            {content.h2}
          </h2>
        </div>

        {/* Intro */}
        <p
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '15px',
            lineHeight: '1.7',
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '720px',
            margin: '0 auto 48px',
            textAlign: 'center',
          }}
        >
          {content.intro}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', marginBottom: '48px' }} />

        {/* Market Blocks */}
        {content.markets.map((market, idx) => {
          const isRomania = idx === 0;
          const lineColor = isRomania ? 'rgba(255,203,0,0.50)' : 'rgba(40,175,176,0.50)';
          const labelColor = isRomania ? 'rgba(255,203,0,0.80)' : 'rgba(40,175,176,0.80)';

          return (
            <div
              key={market.number}
              style={{
                marginBottom: idx === content.markets.length - 1 ? '0' : '48px',
              }}
            >
              {/* Market Header */}
              <div className={clsx('flex', 'items-baseline', 'gap-4', 'mb-3')}>
                <div
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    lineHeight: '1',
                    color: 'rgba(255,255,255,0.20)',
                    fontWeight: 800,
                  }}
                >
                  {market.number}
                </div>
                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '24px',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {market.name}
                </h3>
              </div>

              {/* Market Line */}
              <div style={{ height: '1px', background: lineColor, marginBottom: '24px' }} />

              {/* Market Content - Two Columns */}
              <div className={clsx('grid', 'gap-10')} style={{ gridTemplateColumns: '1fr 1fr', paddingLeft: '8px' }}>
                {/* Left Column */}
                <div>
                  <div
                    className={clsx('uppercase', 'font-semibold', 'mb-3')}
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.18em',
                      color: labelColor,
                      fontWeight: 600,
                    }}
                  >
                    {market.leftLabel}
                  </div>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '15px',
                      lineHeight: '1.7',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    {market.leftBody}
                  </p>
                </div>

                {/* Right Column */}
                <div>
                  <div
                    className={clsx('uppercase', 'font-semibold', 'mb-3')}
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.18em',
                      color: labelColor,
                      fontWeight: 600,
                    }}
                  >
                    {market.rightLabel}
                  </div>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '15px',
                      lineHeight: '1.7',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    {market.rightBody}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Gold Pull Statement */}
        <div
          style={{
            marginTop: '48px',
            padding: '28px 36px',
            background: 'rgba(255,203,0,0.18)',
            borderLeft: '4px solid #FFCB00',
            borderRadius: '0 8px 8px 0',
          }}
        >
          <p
            className="font-semibold"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '17px',
              lineHeight: '1.55',
              fontWeight: 600,
              color: '#FFCB00',
            }}
          >
            {content.closingParagraph1}
          </p>
          <p
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255,203,0,0.75)',
              marginTop: '12px',
            }}
          >
            {content.closingParagraph2}
          </p>
        </div>
      </div>

      {/* Mobile Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 64px 0 !important;
          }
          div[style*='padding: 0 52px'] {
            padding: 0 24px !important;
          }
          div[style*='gridTemplateColumns: 1fr 1fr'] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          div[style*='flex items-baseline gap-4'] {
            flex-direction: column !important;
            gap: 4px !important;
          }
          h3[style*='fontSize: 24px'] {
            font-size: 20px !important;
          }
          div[style*='padding: 32px 40px'] {
            padding: 24px !important;
          }
          p[style*='fontSize: 18px'] {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
