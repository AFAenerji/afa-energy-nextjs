'use client';

import Image from 'next/image';
import Link from 'next/link';

interface GelistiriciCTAProps {
  content: {
    h2Part1: string;
    h2Gold: string;
    h2Part2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    privacyNote: string;
    disclaimer: string;
  };
  locale: string;
}

export default function GelistiriciCTA({ content, locale }: GelistiriciCTAProps) {
  const contactHref = locale === 'tr' ? '/tr/iletisim' : locale === 'en' ? '/en/contact' : '/ro/contact';

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Photo background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(145deg, #1a7570 0%, #0d4a47 40%, #0a3533 100%)',
        }}
      />
      <Image
        src="/images/gelistirici/developer-cta-landscape.jpg"
        alt=""
        aria-hidden="true"
        fill
        className="object-cover"
        style={{ objectPosition: 'center' }}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      {/* Teal overlay — DSS Rule 2.2 (opacity 0.72) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(24,98,95,0.72)',
          zIndex: 1,
        }}
      />
      {/* Bottom fade bridge */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, transparent 0%, #F8FAFB 100%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center justify-center text-center"
        style={{ zIndex: 3, padding: '96px 52px 120px', maxWidth: '1180px', margin: '0 auto' }}
      >
        {/* Gold accent line */}
        <div style={{ width: '40px', height: '3px', background: '#FFCB00', marginBottom: '24px' }} />

        {/* H2 */}
        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '36px',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          {content.h2Part1}
          <span style={{ color: '#FFCB00' }}>{content.h2Gold}</span>
          {content.h2Part2}
        </h2>

        {/* Subtitle */}
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.78)', maxWidth: '560px', lineHeight: 1.6, marginBottom: '32px' }}>
          {content.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Link
            href={contactHref}
            className="inline-flex items-center justify-center"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              background: '#FFCB00',
              color: '#0F2E2C',
              fontWeight: 700,
              fontSize: '13px',
              padding: '14px 28px',
              borderRadius: '2px',
              textDecoration: 'none',
              boxShadow: '0 6px 28px rgba(255,203,0,0.40), 0 2px 8px rgba(0,0,0,0.20)',
              transition: 'box-shadow 200ms ease-out',
            }}
          >
            {content.ctaPrimary}
          </Link>
          <Link
            href="#surec"
            className="inline-flex items-center justify-center"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              padding: '14px 28px',
              borderRadius: '2px',
              border: '1.5px solid rgba(255,255,255,0.30)',
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              transition: 'border-color 160ms ease-out',
            }}
          >
            {content.ctaSecondary}
          </Link>
        </div>

        {/* Privacy note */}
        {content.privacyNote && (
          <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', marginBottom: '8px' }}>
            {content.privacyNote}
          </p>
        )}

        {/* Disclaimer */}
        <p style={{ fontSize: '11px', fontStyle: 'italic', color: 'rgba(255,255,255,0.42)' }}>
          {content.disclaimer}
        </p>
      </div>
    </section>
  );
}
