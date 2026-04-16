'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GelistiriciHeroProps {
  content: {
    sectionLabel: string;
    motto: string;
    h1Line1: string;
    h1Line2: string;
    h1Line3: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    photoTag: string;
  };
  locale: string;
}

const PHOTO = '/images/gelistirici/hero-developer-field.jpg';

export default function GelistiriciHero({ content, locale }: GelistiriciHeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const contactHref =
    locale === 'tr' ? '/tr/iletisim' :
    locale === 'en' ? '/en/contact' : '/ro/contact';
  const atrHref = `/${locale}${content.ctaSecondaryHref}`;

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#18625F',
        minHeight: '100vh',
        marginTop: '-72px',
        paddingTop: '72px',
      }}
    >
      {/* ─── FOTOĞRAF (sadece desktop) ─── */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '54%',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <Image
            src={PHOTO}
            alt="Saha mühendisleri teknik plan inceliyor"
            fill
            priority
            quality={85}
            style={{
              objectFit: 'cover',
              objectPosition: 'center 65%',
              filter: 'brightness(0.80) saturate(0.75)',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement as HTMLElement;
              if (parent) {
                parent.style.background = 'linear-gradient(145deg, #1a7570 0%, #0d4a47 50%, #0a3533 100%)';
              }
            }}
          />

          {/*
            TEK OVERLAY — radial vignette
            Merkezden dışa doğru koyulaşır.
            Tüm köşeler ve kenarlar (üst dahil) #18625F'ye karışır.
            Merkez kısmı açık kalır — mühendis figürü görünür.
          */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(
                  ellipse 70% 60% at 60% 65%,
                  transparent 0%,
                  transparent 30%,
                  rgba(24,98,95,0.35) 52%,
                  rgba(24,98,95,0.70) 70%,
                  rgba(24,98,95,0.92) 85%,
                  #18625F 100%
                )
              `,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/*
            SOL KENAR GEÇİŞİ — sol 42%'ye kadar yumuşak fade
            Sol panel ile foto arasındaki sınırı yumuşatır.
          */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, #18625F 0%, rgba(24,98,95,0.90) 10%, rgba(24,98,95,0.50) 20%, rgba(24,98,95,0.20) 30%, transparent 42%)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {/* Bottom fade — blends hero photo into cards section below */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 240,
              background: 'linear-gradient(to top, #18625F 0%, rgba(24,98,95,0.85) 30%, rgba(24,98,95,0.40) 60%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
        </div>
      )}

      {/* ─── MOBİL: fotoğraf arka plan ─── */}
      {isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${PHOTO})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 50%',
            zIndex: 0,
          }}
        />
      )}
      {isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15,46,44,0.82)',
            zIndex: 1,
          }}
        />
      )}

      {/* ─── İÇERİK GRID ─── */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          maxWidth: '1180px',
          margin: '0 auto',
          minHeight: 'calc(100vh - 72px)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '46fr 54fr',
          alignItems: 'center',
        }}
      >
        {/* SOL PANEL */}
        <div
          style={
            isMobile
              ? {
                  background: 'rgba(15,46,44,0.88)',
                  borderRadius: '16px',
                  margin: '24px',
                  padding: '32px',
                }
              : { padding: '60px 52px 60px' }
          }
        >
          {/* Kicker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '20px', height: '2px', background: '#FFCB00', flexShrink: 0 }} />
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: 'rgba(255,203,0,0.85)',
            }}>
              {content.sectionLabel}
            </span>
          </div>

          {/* Motto */}
          {content.motto && (
            <p style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.80)',
              letterSpacing: '0.04em',
              marginBottom: '14px',
            }}>
              {content.motto}
            </p>
          )}

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(36px, 3.6vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            marginBottom: '24px',
            maxWidth: '540px',
          }}>
            <span style={{ display: 'block', color: '#FFFFFF' }}>{content.h1Line1}</span>
            {content.h1Line2 && (
              <span style={{ display: 'block', color: '#FFFFFF' }}>{content.h1Line2}</span>
            )}
            <span style={{ display: 'block', color: '#FFCB00' }}>{content.h1Line3}</span>
          </h1>

          {/* Subtitle */}
          {content.subtitle.split('\n\n').map((para, i, arr) => (
            <p key={i} style={{
              fontSize: '15px',
              lineHeight: 1.65,
              color: 'rgba(245,247,246,0.88)',
              maxWidth: '620px',
              marginBottom: i < arr.length - 1 ? '10px' : '32px',
            }}>
              {para}
            </p>
          ))}

          {/* CTA Butonları */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', maxWidth: '560px' }}>
            <Link
              href={contactHref}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
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
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,203,0,0.60), 0 2px 8px rgba(0,0,0,0.20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(255,203,0,0.40), 0 2px 8px rgba(0,0,0,0.20)';
              }}
            >
              {content.ctaPrimary}
            </Link>

            <Link
              href={atrHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
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
        </div>

        {/* SAĞ PANEL — desktop'ta boş, foto absolute olduğu için */}
        {!isMobile && <div />}
      </div>
    </section>
  );
}
