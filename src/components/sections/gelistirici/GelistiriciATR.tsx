'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface AxisData {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  body: string;
  metaLabel: string;
  metaItems: string[];
  contextLabel: string;
  contextText: string;
  resultLabel: string;
  resultText: string;
}

interface GelistiriciATRProps {
  content: {
    sectionLabel: string;
    h2: string;
    intro1: string;
    intro2: string;
    intro3?: string;
    bridge: string;
    axes: AxisData[];
    statusTitle: string;
    statusLabels: {
      proceed: string;
      conditional: string;
      blocked: string;
    };
    statusDescriptions: {
      proceed: string;
      conditional: string;
      blocked: string;
    };
    disclaimer: string;
    photoLabel: string;
    photoTitle: string;
  };
}

const CARD_SHADOW = 'inset 4px 4px 10px rgba(0,0,0,0.12), inset -3px -3px 8px rgba(255,255,255,0.85)';

// Status circle shadows — embossed (DSS Rule 11)
const CIRCLE_SHADOW = '12px 12px 24px rgba(0,0,0,0.18), -8px -8px 20px rgba(255,255,255,0.95), inset 2px 2px 4px rgba(255,255,255,0.30)';
const CIRCLE_SHADOW_HOVER = '16px 16px 32px rgba(0,0,0,0.22), -10px -10px 24px rgba(255,255,255,0.98), inset 2px 2px 4px rgba(255,255,255,0.40)';
// Mobile circle shadow
const CIRCLE_SHADOW_MOBILE = '8px 8px 16px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.90), inset 1px 1px 3px rgba(255,255,255,0.30)';

const STATUS_CONFIG = [
  { key: 'proceed' as const, bg: '#28AFB0', color: '#ffffff', icon: '\u2713', labelColor: '#28AFB0' },
  { key: 'conditional' as const, bg: '#FFCB00', color: '#0F2E2C', icon: '~', labelColor: '#9A7A00' },
  { key: 'blocked' as const, bg: '#F25F5C', color: '#ffffff', icon: '\u00D7', labelColor: '#F25F5C' },
];

function StatusCircle({
  bg,
  color,
  icon,
  label,
  labelColor,
  description,
}: {
  bg: string;
  color: string;
  icon: string;
  label: string;
  labelColor: string;
  description: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const baseShadow = isMobile ? CIRCLE_SHADOW_MOBILE : CIRCLE_SHADOW;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: isMobile ? '72px' : '88px',
          height: isMobile ? '72px' : '88px',
          borderRadius: '50%',
          background: bg,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '32px' : '40px',
          fontWeight: 700,
          boxShadow: hovered && !isMobile ? CIRCLE_SHADOW_HOVER : baseShadow,
          transition: 'box-shadow 200ms ease-out',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: '14px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginTop: '20px',
          textAlign: 'center',
          color: labelColor,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '12px',
          color: 'rgba(24,98,95,0.60)',
          marginTop: '6px',
          textAlign: 'center',
        }}
      >
        {description}
      </div>
    </div>
  );
}

function StatusCirclesRow({ content }: { content: GelistiriciATRProps['content'] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '32px' : '80px',
      }}
    >
      {STATUS_CONFIG.map((cfg) => (
        <StatusCircle
          key={cfg.key}
          bg={cfg.bg}
          color={cfg.color}
          icon={cfg.icon}
          label={content.statusLabels[cfg.key]}
          labelColor={cfg.labelColor}
          description={content.statusDescriptions[cfg.key]}
        />
      ))}
    </div>
  );
}

function SectionHeader({ content, isMobile }: { content: GelistiriciATRProps['content']; isMobile: boolean }) {
  return (
    <div
      style={{
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '80px 16px' : '80px 24px',
      }}
    >
      {/* Kicker — inline-flex with decorative gold lines */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#18625F',
          marginBottom: '24px',
        }}
      >
        {!isMobile && (
          <span style={{ width: '24px', height: '2px', background: '#FFCB00', display: 'inline-block' }} />
        )}
        {content.sectionLabel}
        {!isMobile && (
          <span style={{ width: '24px', height: '2px', background: '#FFCB00', display: 'inline-block' }} />
        )}
      </div>

      {/* H2 */}
      <h2
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: isMobile ? '36px' : '48px',
          fontWeight: 800,
          color: '#0F2E2C',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 32px auto',
        }}
      >
        {content.h2}
      </h2>

      {/* Intro paragraphs */}
      <p
        style={{
          fontSize: isMobile ? '16px' : '18px',
          lineHeight: 1.8,
          color: '#18625F',
          textAlign: 'center',
          maxWidth: isMobile ? '100%' : '680px',
          margin: '0 auto 24px auto',
          padding: isMobile ? '0 16px' : undefined,
        }}
      >
        {content.intro1}
      </p>
      <p
        style={{
          fontSize: isMobile ? '16px' : '18px',
          lineHeight: 1.8,
          color: '#18625F',
          textAlign: 'center',
          maxWidth: isMobile ? '100%' : '680px',
          margin: '0 auto 0 auto',
          padding: isMobile ? '0 16px' : undefined,
        }}
      >
        {content.intro2}
      </p>
      {content.intro3 && content.intro3.split('\n\n').map((para, i) => (
        <p
          key={`intro3-${i}`}
          style={{
            fontSize: isMobile ? '16px' : '18px',
            lineHeight: 1.8,
            color: '#18625F',
            textAlign: 'center',
            maxWidth: isMobile ? '100%' : '680px',
            margin: '12px auto 0 auto',
            padding: isMobile ? '0 16px' : undefined,
          }}
        >
          {para}
        </p>
      ))}

      {/* Gold quote block — centered wrapper, left-aligned content */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
        <div
          style={{
            display: 'inline-block',
            textAlign: 'left',
            borderLeft: '4px solid #FFCB00',
            borderRadius: '0 12px 12px 0',
            padding: '20px 32px',
            background: 'rgba(255,203,0,0.05)',
          }}
        >
          <p
            style={{
              fontSize: '17px',
              fontWeight: 500,
              color: '#18625F',
              lineHeight: 1.6,
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {content.bridge}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GelistiriciATR({ content }: GelistiriciATRProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: '#EEF7F7', padding: '96px 0' }}>
      {/* Header block — centered */}
      <SectionHeader content={content} isMobile={isMobile} />

      <div style={{ maxWidth: '1180px', margin: '0 auto', paddingInline: '52px' }}>
        {/* Sticky layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[38fr_62fr]"
          style={{ gap: '48px', alignItems: 'start' }}
        >
          {/* Left — sticky photo */}
          <div className="hidden lg:block" style={{ position: 'sticky', top: '40px' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                height: '520px',
                boxShadow: '0 8px 40px rgba(15,46,44,0.25)',
              }}
            >
              {/* Fallback bg */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(145deg, #1a7570 0%, #0d4a47 40%, #0a3533 100%)',
                }}
              />
              <Image
                src="/images/gelistirici/atr-scada-control-room.jpg"
                alt=""
                aria-hidden="true"
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              {/* Gradient overlay — DSS Rule 2.3 */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, #18625F 0%, transparent 55%)',
                  zIndex: 1,
                }}
              />
              {/* Label */}
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', zIndex: 2 }}>
                <div
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#FFCB00',
                    marginBottom: '4px',
                  }}
                >
                  {content.photoLabel}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.92)' }}>
                  {content.photoTitle}
                </div>
              </div>
            </div>

            {/* Status indicator container — embossed */}
            <div
              style={{
                background: '#E8F3F3',
                borderRadius: '20px',
                padding: '40px 48px',
                marginTop: '20px',
                boxShadow: '8px 8px 20px rgba(0,0,0,0.12), -6px -6px 16px rgba(255,255,255,0.90)',
              }}
            >
              {/* Section title */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#18625F',
                  opacity: 0.7,
                  textAlign: 'center',
                  marginBottom: '32px',
                }}
              >
                {content.statusTitle}
              </div>

              {/* Circles row */}
              <StatusCirclesRow content={content} />
            </div>

            {/* Disclaimer — debossed */}
            <div
              style={{
                background: '#E8F3F3',
                borderRadius: '12px',
                padding: '20px 28px',
                marginTop: '16px',
                boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.06), inset -2px -2px 6px rgba(255,255,255,0.80)',
                borderTop: '2px solid rgba(255,203,0,0.50)',
              }}
            >
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#18625F', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
                {content.disclaimer}
              </p>
            </div>
          </div>

          {/* Right — axis cards */}
          <div className="flex flex-col gap-5">
            {content.axes.map((axis, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={axis.id}
                  ref={setCardRef(i)}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    background: isActive ? '#f5fbfb' : '#FFFFFF',
                    borderRadius: '12px',
                    padding: '28px 28px 28px 32px',
                    borderLeft: `4px solid ${isActive ? '#18625F' : 'transparent'}`,
                    boxShadow: CARD_SHADOW,
                    transition: 'border-color 160ms linear, background-color 160ms linear',
                    cursor: 'pointer',
                  }}
                >
                  {/* Num */}
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#18625F',
                      marginBottom: '6px',
                    }}
                  >
                    {axis.num}
                  </div>
                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#0F2E2C',
                      marginBottom: '4px',
                    }}
                  >
                    {axis.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#6B8080',
                      fontStyle: 'italic',
                      marginBottom: '10px',
                    }}
                  >
                    {axis.subtitle}
                  </div>
                  <p style={{ fontSize: '14px', color: '#2C3E3D', lineHeight: 1.6, marginBottom: isActive ? '16px' : 0 }}>
                    {axis.body}
                  </p>

                  {/* Meta — visible when active */}
                  {isActive && (
                    <div style={{ marginTop: '8px' }}>
                      {/* Evaluation items */}
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#18625F', marginBottom: '6px' }}>
                          {axis.metaLabel}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {axis.metaItems.map((item, j) => (
                            <li key={j} className="flex items-start gap-2" style={{ fontSize: '13px', color: '#2C3E3D', lineHeight: 1.5, marginBottom: '4px' }}>
                              <span style={{ color: '#FFCB00', fontWeight: 700, flexShrink: 0 }}>·</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Context */}
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#18625F', marginBottom: '4px' }}>
                          {axis.contextLabel}
                        </div>
                        <p style={{ fontSize: '13px', color: '#5A6E6D', lineHeight: 1.5 }}>
                          {axis.contextText}
                        </p>
                      </div>
                      {/* Result */}
                      <div
                        style={{
                          background: 'rgba(24,98,95,0.06)',
                          borderLeft: '3px solid #18625F',
                          padding: '10px 14px',
                          borderRadius: '0 4px 4px 0',
                        }}
                      >
                        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#18625F', marginBottom: '4px' }}>
                          {axis.resultLabel}
                        </div>
                        <p style={{ fontSize: '13px', fontWeight: 500, color: '#18625F', lineHeight: 1.4 }}>
                          {axis.resultText}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
