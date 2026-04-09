'use client';

import Link from 'next/link';

interface B6B7KapanisProps {
  content: {
    pullQuote: string;
    kicker: string;
    h2: string;
    subhead1: string;
    subhead2: string;
    description: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    disclaimer: string;
  };
}

export default function B6B7Kapanis({ content }: B6B7KapanisProps) {
  return (
    <section style={{ background: '#F8FAFB', padding: '80px 52px 72px' }} className="b6b7-section">
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

        {/* Pull Quote — left-aligned */}
        <div style={{
          borderLeft: '6px solid #FFCB00',
          paddingLeft: '28px',
          marginBottom: '52px',
          maxWidth: '640px'
        }}>
          <p style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#0F2E2C',
            lineHeight: 1.3,
            fontStyle: 'normal',
            margin: 0
          }}>
            {content.pullQuote}
          </p>
        </div>

        {/* Divider */}
        <hr style={{
          border: 'none',
          borderTop: '1px solid rgba(15,46,44,0.10)',
          marginBottom: '52px'
        }} />

        {/* CTA Block — centered */}
        <div style={{ textAlign: 'center' }}>

          {/* Kicker */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '12px', marginBottom: '18px'
          }}>
            <div style={{ width: '28px', height: '1px', background: '#FFCB00', opacity: 0.8 }} />
            <span style={{
              fontSize: '11px', letterSpacing: '0.18em',
              color: '#FFCB00', fontWeight: 600, textTransform: 'uppercase'
            }}>
              {content.kicker}
            </span>
            <div style={{ width: '28px', height: '1px', background: '#FFCB00', opacity: 0.8 }} />
          </div>

          {/* H2 */}
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800, color: '#0F2E2C',
            lineHeight: 1.1, marginBottom: '14px'
          }}>
            {content.h2}
          </h2>

          {/* Subhead — two lines, NOT italic */}
          <p style={{
            fontSize: '17px', fontWeight: 600,
            color: '#18625F', lineHeight: 1.5,
            marginBottom: '28px', fontStyle: 'normal'
          }}>
            {content.subhead1}<br />{content.subhead2}
          </p>

          {/* Description — left-aligned within centered block */}
          <p style={{
            fontSize: '15px',
            color: 'rgba(15,46,44,0.68)',
            lineHeight: 1.75, maxWidth: '580px',
            margin: '0 auto 36px', textAlign: 'left'
          }}>
            {content.description}
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex', gap: '12px',
            justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: '28px'
          }}>
            <Link href={content.ctaPrimaryHref} style={{
              background: '#FFCB00', color: '#0F2E2C',
              fontWeight: 700, fontSize: '15px',
              padding: '14px 28px', borderRadius: '6px',
              textDecoration: 'none', display: 'inline-block',
              transition: 'background-color 120ms linear'
            }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E6B800'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFCB00'; }}
            >
              {content.ctaPrimary}
            </Link>
            <Link href={content.ctaSecondaryHref} style={{
              background: 'transparent', color: '#18625F',
              fontWeight: 700, fontSize: '15px',
              padding: '14px 28px', borderRadius: '6px',
              border: '2px solid #18625F',
              textDecoration: 'none', display: 'inline-block',
              transition: 'background-color 120ms linear, border-color 120ms linear'
            }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(24,98,95,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {content.ctaSecondary}
            </Link>
          </div>

          {/* Disclaimer */}
          <p style={{
            fontSize: '13px', color: '#4B5563',
            lineHeight: 1.65, maxWidth: '560px',
            margin: '0 auto', textAlign: 'center'
          }}>
            {content.disclaimer}
          </p>

        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 767px) {
          .b6b7-section {
            padding: 64px 24px 56px !important;
          }
        }
      `}</style>
    </section>
  );
}
