'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LeftColumnItem {
  status: 'completed' | 'critical' | 'uncertainty' | 'risk' | 'target';
  label?: string;
  text: string;
}

interface RightColumnQuestion {
  q: string;
  note: string;
}

interface GelistiriciGerilimProps {
  content: {
    sectionLabel: string;
    kicker: string;
    title: string;
    h2: string;
    subtitle: string;
    openingParagraph: string;
    openingP1: string;
    openingP2: string;
    pullQuote: string;
    leftColumnTitle: string;
    leftColumnItems: LeftColumnItem[];
    rightColumnTitle: string;
    rightColumnIntro: string;
    rightColumnQuestions: RightColumnQuestion[];
    bridgeText: string;
  };
}

// Status dot/indicator colors
const STATUS_COLORS: Record<LeftColumnItem['status'], string> = {
  completed: '#FFCB00',
  critical: '#F25F5C',
  uncertainty: '#FF8C42',
  risk: '#F25F5C',
  target: '#28AFB0',
};

// Status label prefixes for items without explicit labels
const STATUS_PREFIXES: Record<LeftColumnItem['status'], string> = {
  completed: 'TAMAMLANDI',
  critical: '',
  uncertainty: '',
  risk: '',
  target: 'HEDEF',
};

export default function GelistiriciGerilim({ content }: GelistiriciGerilimProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section style={{ background: '#0F2E2C', padding: '0 0 80px', color: '#fff' }}>
      {/* G3 Banner — B+ Gold Gradient Split */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          minHeight: isMobile ? 'auto' : '380px',
          overflow: 'hidden',
        }}
      >
        {/* Left: text panel */}
        <div
          style={{
            background: '#0F2E2C',
            padding: isMobile ? '40px 24px' : '52px 52px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Kicker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '2px', background: '#FFCB00', flexShrink: 0 }} />
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: 'rgba(255,203,0,0.80)',
            }}>
              {content.kicker}
            </span>
          </div>

          {/* H2 */}
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#FFFFFF',
            marginBottom: '8px',
          }}>
            {content.title}
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: '13px',
            fontStyle: 'italic',
            color: 'rgba(255,203,0,0.65)',
            marginBottom: '20px',
          }}>
            {content.subtitle}
          </p>

          {/* Opening paragraph */}
          <p style={{
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.72)',
            maxWidth: '480px',
          }}>
            {content.openingParagraph ?? content.openingP1 ?? ''}
          </p>
        </div>

        {/* Right: photo with B+ gold gradient — desktop only */}
        {!isMobile && (
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: '380px' }}>
            <Image
              src="/images/gelistirici/g3-investor-perspective-permit-review.jpeg"
              alt="Teknik izin belgelerini inceleyen profesyonel"
              fill
              quality={85}
              style={{
                objectFit: 'cover',
                objectPosition: 'center 30%',
                filter: 'brightness(0.82) saturate(0.75)',
              }}
              onError={(e) => {
                const parent = e.currentTarget.parentElement as HTMLElement;
                if (parent) parent.style.background =
                  'linear-gradient(160deg, #1a5c58 0%, #0d3835 50%, #061a18 100%)';
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* B+ Gold gradient — dark → gold → transparent */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(90deg,
                  #0F2E2C 0%,
                  rgba(15,46,44,0.90) 8%,
                  rgba(255,203,0,0.40) 22%,
                  rgba(255,203,0,0.12) 36%,
                  transparent 52%
                )`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* Bottom gold accent line */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #FFCB00 0%, rgba(255,203,0,0.35) 55%, transparent 80%)',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
          </div>
        )}
      </div>

      {/* Existing G3 content below banner */}
      <div style={{ maxWidth: '1180px', margin: '0 auto', paddingInline: '52px', paddingTop: '56px' }}>
        {/* Opening P2 — context paragraph */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '760px',
            margin: '0 auto',
            padding: '0 0 36px',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.80)',
              marginBottom: 0,
            }}
          >
            {content.openingP2}
          </p>
        </div>

        {/* Pull quote */}
        <div
          style={{
            borderLeft: '4px solid #FFCB00',
            background: 'rgba(255,255,255,0.05)',
            padding: '20px 28px',
            maxWidth: '760px',
            margin: '0 auto 48px',
            borderRadius: 0,
          }}
        >
          <p
            style={{
              fontSize: '16px',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {content.pullQuote}
          </p>
        </div>

        {/* Two-column card layout — Option B: light cards on dark background */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {/* LEFT CARD — RTB Thresholds — Teal header */}
          <div
            style={{
              background: '#F0F7F7',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.18)',
            }}
          >
            {/* Teal header band */}
            <div style={{ background: '#18625F', padding: '12px 20px', borderBottom: '3px solid #28AFB0' }}>
              <div style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#A8DADC',
              }}>
                {content.leftColumnTitle}
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {content.leftColumnItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: STATUS_COLORS[item.status],
                      flexShrink: 0, marginTop: '5px',
                    }} />
                    <div>
                      <div style={{
                        fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em',
                        textTransform: 'uppercase', marginBottom: '3px',
                        color: item.status === 'completed' ? '#28AFB0'
                          : item.status === 'critical' ? '#F25F5C'
                          : item.status === 'risk' ? '#C0392B'
                          : item.status === 'uncertainty' ? '#a07000'
                          : '#18625F',
                      }}>
                        {item.label || STATUS_PREFIXES[item.status]}
                      </div>
                      <p style={{ fontSize: '13px', color: '#2d4a46', lineHeight: 1.6, margin: 0 }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CARD — Investor Questions — Gold header */}
          <div
            style={{
              background: '#F0F7F7',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.18)',
            }}
          >
            {/* Gold header band */}
            <div style={{ background: '#18625F', padding: '12px 20px', borderBottom: '3px solid #FFCB00' }}>
              <div style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#FFCB00',
              }}>
                {content.rightColumnTitle}
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: '20px' }}>
              {/* Intro */}
              <p style={{
                fontSize: '12px', fontStyle: 'italic',
                color: 'rgba(45,74,70,0.70)', marginBottom: '16px', lineHeight: 1.5,
              }}>
                {content.rightColumnIntro}
              </p>

              {/* Questions with notes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {content.rightColumnQuestions.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, color: '#18625F',
                      flexShrink: 0, minWidth: '18px',
                    }}>
                      {i + 1}.
                    </span>
                    <div>
                      <p style={{ fontSize: '13px', color: '#2d4a46', lineHeight: 1.6, margin: '0 0 4px' }}>
                        {item.q}
                      </p>
                      {item.note && (
                        <p style={{
                          fontSize: '11px', fontStyle: 'italic',
                          color: 'rgba(24,98,95,0.70)', margin: 0, lineHeight: 1.5,
                        }}>
                          → {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom band — bridge text */}
        <div
          style={{
            borderLeft: '4px solid #FFCB00',
            borderRadius: 0,
            background: 'rgba(255,255,255,0.05)',
            padding: '24px 32px',
            maxWidth: '860px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '15px',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {content.bridgeText}
          </p>
        </div>
      </div>
    </section>
  );
}
