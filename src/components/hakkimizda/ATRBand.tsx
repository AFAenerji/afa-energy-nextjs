'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ATRBandProps {
  content: {
    kickerLabel: string;
    h2: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export default function ATRBand({ content }: ATRBandProps) {
  return (
    <>
      {/* ─────────────────────────────────────────────
          LAYER 1: TEXT BAND
          - Sits directly after B3 (dark #18625F)
          - Background: light #F8FAFB
          - Contains: kicker, H2, body, CTA
          - Top fade masks hard edge from B3
      ───────────────────────────────────────────── */}
      <div style={{
        background: '#F8FAFB',
        paddingTop: '64px',
        paddingBottom: '56px',
        paddingLeft: '52px',
        paddingRight: '52px',
        textAlign: 'center' as const,
        position: 'relative',
      }}>

        {/* Top gradient: B3 dark → transparent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, #18625F, transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* Content */}
        <div style={{
          maxWidth: '640px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 3,
        }}>

          {/* Kicker */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '18px',
          }}>
            <div style={{ width: '24px', height: '1px', background: '#FFCB00' }} />
            <span style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: '#18625F',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
            }}>
              {content.kickerLabel}
            </span>
            <div style={{ width: '24px', height: '1px', background: '#FFCB00' }} />
          </div>

          {/* H2 */}
          <h2 style={{
            fontSize: 'clamp(22px, 2.8vw, 36px)',
            fontWeight: 800,
            color: '#0F2E2C',
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}>
            {content.h2}
          </h2>

          {/* Body */}
          <p style={{
            fontSize: '15px',
            color: '#4A6E6C',
            lineHeight: 1.72,
            maxWidth: '520px',
            margin: '0 auto 32px',
          }}>
            {content.body}
          </p>

          {/* CTA */}
          <Link
            href={content.ctaHref}
            style={{
              display: 'inline-block',
              background: '#FFCB00',
              color: '#0F2E2C',
              fontSize: '15px',
              fontWeight: 700,
              padding: '14px 32px',
              borderRadius: '6px',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'background-color 120ms linear',
            }}
          >
            {content.ctaLabel} →
          </Link>

        </div>
      </div>

      {/* ─────────────────────────────────────────────
          LAYER 2: PANORAMIC PHOTO BAND
          - Sits BELOW text band, ABOVE B4
          - Full width, 300px height
          - Top fade: #F8FAFB → transparent (from text band)
          - Bottom fade: transparent → #F8FAFB (into B4)
      ───────────────────────────────────────────── */}
      <div style={{
        width: '100%',
        height: '300px',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Photo with onError fallback to gradient */}
        <Image
          src="/images/atr-band-transmission.jpg"
          alt="Elektrik iletim altyapısı"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.80) contrast(0.95)',
          }}
          quality={85}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.style.background =
                'linear-gradient(135deg, #18625F 0%, #1E7A77 50%, #0F2E2C 100%)';
            }
          }}
        />

        {/* Top fade: text band → photo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, #F8FAFB, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Bottom fade: photo → B4 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to top, #F8FAFB, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

      </div>
    </>
  );
}
