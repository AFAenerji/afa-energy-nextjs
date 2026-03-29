'use client';

import clsx from 'clsx';

interface Banner {
  number: string;
  title: string;
  desc: string;
  isGold?: boolean;
}

interface B4AfarklıYapanProps {
  content: {
    kicker: string;
    h2: string;
    banners: Banner[];
  };
}

export default function B4AfarklıYapan({ content }: B4AfarklıYapanProps) {
  return (
    <section style={{ backgroundColor: '#F5F7F6', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="mx-auto" style={{ maxWidth: '1180px', padding: '0 40px' }}>
        {/* Header */}
        <div className={clsx('text-center', 'mb-14')}>
          {/* Kicker */}
          <div className={clsx('flex', 'items-center', 'justify-center', 'gap-3', 'mb-3')}>
            <div style={{ width: '20px', height: '1px', background: '#28AFB0' }} />
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
            <div style={{ width: '20px', height: '1px', background: '#28AFB0' }} />
          </div>

          {/* H2 */}
          <h2
            className="font-bold"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '32px',
              lineHeight: '1.1',
              color: '#1A2A2A',
              fontWeight: 700,
            }}
          >
            {content.h2}
          </h2>
        </div>

        {/* Banner Stack */}
        <div className={clsx('flex', 'flex-col', 'gap-4')} style={{ maxWidth: '900px', margin: '0 auto' }}>
          {content.banners.map((banner) => {
            const isGold = banner.isGold === true;

            return (
              <div
                key={banner.number}
                className={clsx('flex', 'items-start', 'gap-6', 'rounded-lg', 'transition-background-color', 'duration-[120ms]', 'ease-linear', 'transition-box-shadow', 'transition-border-left-width')}
                style={{
                  backgroundColor: isGold ? '#FDFBF0' : '#FFFFFF',
                  padding: '24px 28px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  borderLeft: '4px solid',
                  borderLeftColor: isGold ? '#FFCB00' : '#28AFB0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isGold ? '#F5ECD6' : '#F8FAFB';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderLeftWidth = '6px';
                  if (isGold) {
                    e.currentTarget.style.borderLeftColor = '#E6B800';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isGold ? '#FDFBF0' : '#FFFFFF';
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderLeftWidth = '4px';
                  if (isGold) {
                    e.currentTarget.style.borderLeftColor = '#FFCB00';
                  }
                }}
              >
                {/* Banner Number */}
                <div
                  className={isGold ? 'text-afa-gold' : 'text-afa-accent'}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '36px',
                    lineHeight: '1',
                    fontWeight: 700,
                    opacity: isGold ? 0.4 : 0.25,
                    minWidth: '56px',
                    flexShrink: 0,
                  }}
                >
                  {banner.number}
                </div>

                {/* Banner Text */}
                <div className="flex-1">
                  <h3
                    className="font-semibold"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '16px',
                      lineHeight: '1.3',
                      color: '#18625F',
                      fontWeight: 600,
                      marginBottom: '6px',
                    }}
                  >
                    {banner.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#6B7B7A',
                    }}
                  >
                    {banner.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 64px 0 !important;
          }
          div[style*='padding: 0 40px'] {
            padding: 0 20px !important;
          }
          h2[style*='font-size: 32px'] {
            font-size: 26px !important;
          }
          div[style*='gap: 4'] {
            gap: 12px !important;
          }
          div[style*='padding: 24px 28px'] {
            padding: 20px !important;
            gap: 16px !important;
          }
          div[style*='fontSize: 36px'] {
            font-size: 28px !important;
            min-width: 44px !important;
          }
          h3[style*='fontSize: 16px'] {
            font-size: 15px !important;
          }
          p[style*='fontSize: 14px'] {
            font-size: 13px !important;
          }
        }
      `}</style>
    </section>
  );
}
