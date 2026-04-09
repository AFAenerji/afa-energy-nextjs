'use client';

import Image from 'next/image';

interface ATRBandProps {
  content: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };
}

export default function ATRBand({ content }: ATRBandProps) {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      minHeight: '420px'
    }} className="atr-band-section">

      {/* Photo */}
      <Image
        src="/images/atr-band-towers.jpg"
        alt="Elektrik iletim direkleri"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        quality={85}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/images/b3-cta-photo.jpg';
        }}
      />

      {/* Left dark gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.08) 100%)'
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        minHeight: '420px',
        padding: '0 52px',
        maxWidth: '1180px',
        margin: '0 auto'
      }} className="atr-band-content">

        {/* Gold bar + text group */}
        <div style={{
          borderLeft: '5px solid #FFCB00',
          paddingLeft: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          maxWidth: '680px'
        }} className="atr-band-text">

          {/* Line 1 — large white bold */}
          <span style={{
            fontSize: 'clamp(22px, 2.6vw, 34px)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.2,
            textShadow: '0 2px 12px rgba(0,0,0,0.45)'
          }}>
            {content.line1}
          </span>

          {/* Line 2 — smaller white medium */}
          <span style={{
            fontSize: 'clamp(16px, 1.8vw, 24px)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.3,
            textShadow: '0 2px 10px rgba(0,0,0,0.40)'
          }}>
            {content.line2}
          </span>

          {/* Line 3 — hero word, gold, very large */}
          <span style={{
            fontSize: 'clamp(38px, 5vw, 68px)',
            fontWeight: 800,
            color: '#FFCB00',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            textShadow: '0 2px 16px rgba(0,0,0,0.40)'
          }}>
            {content.line3}
          </span>

          {/* Line 4 — smaller white medium */}
          <span style={{
            fontSize: 'clamp(16px, 1.8vw, 24px)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.3,
            textShadow: '0 2px 10px rgba(0,0,0,0.40)'
          }}>
            {content.line4}
          </span>

        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 767px) {
          .atr-band-section {
            min-height: 320px !important;
          }
          .atr-band-content {
            padding: 0 24px !important;
            min-height: 320px !important;
          }
          .atr-band-text {
            border-left-width: 4px !important;
            padding-left: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
