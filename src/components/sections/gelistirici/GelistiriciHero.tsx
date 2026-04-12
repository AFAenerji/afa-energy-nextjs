'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface InfoCard {
  kiker: string;
  body: string;
}

interface GelistiriciHeroProps {
  content: {
    sectionLabel: string;
    h1Line1: string;
    h1Line2: string;
    h1Line3: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    card1: InfoCard;
    card2: InfoCard;
    card3: InfoCard;
    photoTag: string;
  };
  locale: string;
}

const HERO_PHOTO_PATH = '/images/gelistirici/hero-developer-field.jpg';

export default function GelistiriciHero({ content, locale }: GelistiriciHeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const contactHref = locale === 'tr' ? '/tr/iletisim' : locale === 'en' ? '/en/contact' : '/ro/contact';
  const atrHref = `/${locale}${content.ctaSecondaryHref}`;
  const cards = [content.card1, content.card2, content.card3];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#18625F',
        minHeight: '100vh',
        marginTop: '-72px',
        paddingTop: '72px',
        ...(isMobile
          ? {
              backgroundImage: `url(${HERO_PHOTO_PATH})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}),
      }}
    >
      {/* Mobile: dark overlay for readability */}
      {isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15,46,44,0.50)',
            zIndex: 0,
          }}
        />
      )}

      {/* Main grid */}
      <div
        className="relative z-[1] mx-auto grid grid-cols-1 lg:grid-cols-[48fr_52fr]"
        style={{ maxWidth: '1180px', minHeight: 'calc(100vh - 72px)' }}
      >
        {/* ── Left: Text panel ── */}
        <div
          className="flex flex-col justify-center"
          style={
            isMobile
              ? {
                  background: 'rgba(15,46,44,0.88)',
                  borderRadius: '16px',
                  margin: '24px',
                  padding: '32px',
                  position: 'relative',
                  zIndex: 1,
                }
              : { padding: '120px 52px 100px' }
          }
        >
          {/* Section label with gold line */}
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: '20px', height: '2px', background: '#FFCB00' }} />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,203,0,0.85)',
              }}
            >
              {content.sectionLabel}
            </span>
          </div>

          {/* H1 */}
          <h1
            className="max-w-[560px]"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '52px',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              marginBottom: '24px',
            }}
          >
            <span style={{ display: 'block', color: '#FFFFFF' }}>{content.h1Line1}</span>
            <span style={{ display: 'block', color: '#FFFFFF' }}>{content.h1Line2}</span>
            <span style={{ display: 'block', color: '#FFCB00' }}>{content.h1Line3}</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: 'rgba(245,247,246,0.82)',
              lineHeight: 1.6,
              maxWidth: '540px',
              marginBottom: '32px',
            }}
          >
            {content.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
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
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,203,0,0.60), 0 2px 8px rgba(0,0,0,0.20)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(255,203,0,0.40), 0 2px 8px rgba(0,0,0,0.20)'; }}
            >
              {content.ctaPrimary}
            </Link>
            <Link
              href={atrHref}
              className="inline-flex items-center justify-center"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                padding: '14px 28px',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.40)',
                color: 'rgba(255,255,255,0.90)',
                textDecoration: 'none',
                transition: 'background-color 160ms ease-out, border-color 120ms linear',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.40)';
              }}
            >
              {content.ctaSecondary}
            </Link>
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-[10px] max-w-[380px]">
            {cards.map((card, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: '8px',
                  borderLeft: '3px solid rgba(255,203,0,0.50)',
                  padding: '16px 20px',
                  transition: 'background 160ms ease-out, border-left-color 160ms ease-out',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                  e.currentTarget.style.borderLeftColor = '#FFCB00';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.borderLeftColor = 'rgba(255,203,0,0.50)';
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#FFCB00',
                    marginBottom: '4px',
                  }}
                >
                  {card.kiker}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(245,247,246,0.72)', lineHeight: 1.5 }}>
                  {card.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Photo panel ── */}
        {!isMobile && (
          <div className="relative overflow-hidden hidden lg:block">
            {/* Photo — no CSS filter, overlays handle harmonization */}
            <Image
              src={HERO_PHOTO_PATH}
              alt="Renewable energy project site"
              fill
              className="object-cover"
              quality={85}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* Layer 1 — Teal brand overlay (DSS Rule 10, opacity 0.15) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(40,175,176,0.15)',
                pointerEvents: 'none',
                zIndex: 9,
              }}
            />
            {/* Layer 2 — Top gradient: fades sky into section bg */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '45%',
                background: 'linear-gradient(180deg, rgba(15,46,44,0.92) 0%, rgba(15,46,44,0.55) 50%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
            {/* Layer 3 — Left gradient: fade into section bg (DSS Rule 10.19) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, #0F2E2C 0%, rgba(15,46,44,0.60) 25%, transparent 55%)',
                pointerEvents: 'none',
                zIndex: 11,
              }}
            />
          </div>
        )}
      </div>

      {/* Photo fallback bg — behind right panel */}
      {!isMobile && (
        <div
          className="absolute top-0 right-0 bottom-0 w-[52%] hidden lg:block"
          style={{
            background: 'linear-gradient(145deg, #1a7570 0%, #0d4a47 40%, #0a3533 100%)',
            zIndex: 0,
          }}
        />
      )}
    </section>
  );
}
