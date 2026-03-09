'use client';

import { useState, useEffect, useMemo } from 'react';
import type { InvestorProfileMessages } from '@/i18n/loadInvestorProfileMessages';

interface InvestorProfileClientProps {
  initialLocale: 'tr' | 'en';
  initialMessages: InvestorProfileMessages;
}

const COLORS = {
  'primary-dark': '#18625F',
  primary: '#28AFB0',
  'primary-light': '#4CC9F0',
  gold: '#FFCB00',
  coral: '#F25F5C',
  deep: '#0F2E2C',
  light: '#F5F5F5',
  ice: '#F8FAFB',
  white: '#FFFFFF',
  'gray-600': '#4A5568',
  'gray-400': '#999999',
} as const;

const profileBorderColor: Record<'deep' | 'primary' | 'coral', string> = {
  deep: COLORS.deep,
  primary: COLORS.primary,
  coral: COLORS.coral,
};

export default function InvestorProfileClient({
  initialLocale,
  initialMessages,
}: InvestorProfileClientProps) {
  const [language, setLanguage] = useState<'tr' | 'en'>(initialLocale);
  const [messagesMap, setMessagesMap] = useState<{
    tr: InvestorProfileMessages | null;
    en: InvestorProfileMessages | null;
  }>({
    tr: initialLocale === 'tr' ? initialMessages : null,
    en: initialLocale === 'en' ? initialMessages : null,
  });

  const messages = useMemo(
    () => messagesMap[language] || initialMessages,
    [messagesMap, language, initialMessages]
  );

  useEffect(() => {
    const saved = localStorage.getItem('afa_investor_profile_lang');
    if (saved === 'tr' || saved === 'en') {
      setLanguage(saved);
    }
  }, []);

  const handleLanguageChange = async (newLang: 'tr' | 'en') => {
    if (newLang === language) return;
    setLanguage(newLang);
    localStorage.setItem('afa_investor_profile_lang', newLang);

    if (!messagesMap[newLang]) {
      const loaded =
        newLang === 'en'
          ? await import('@/i18n/messages/en/investor-profile.json')
          : await import('@/i18n/messages/tr/investor-profile.json');
      setMessagesMap((prev) => ({
        ...prev,
        [newLang]: loaded.default || loaded,
      }));
    }
  };

  const [hoveredProfile, setHoveredProfile] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Language Switcher — floating top-right */}
      <div
        style={{
          position: 'fixed',
          top: '5rem',
          right: '1.5rem',
          zIndex: 40,
          display: 'flex',
          gap: '0.25rem',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '4px',
          padding: '0.25rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
        role="group"
        aria-label="Language switcher"
      >
        {(['tr', 'en'] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            aria-pressed={language === lang}
            onClick={() => handleLanguageChange(lang)}
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '13px',
              fontWeight: language === lang ? 700 : 400,
              backgroundColor: language === lang ? COLORS.deep : 'transparent',
              color: language === lang ? COLORS.white : COLORS['gray-600'],
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 120ms linear, color 120ms linear',
            }}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── SECTION 1: HERO ── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '6rem 1.5rem 5rem',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/investor-profile-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.9) grayscale(0.2)',
          }}
        />
        {/* Solid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: COLORS.deep,
            opacity: 0.65,
          }}
        />
        {/* Grid pattern */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.04,
          }}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        {/* Content */}
        <div
          style={{
            position: 'relative',
            maxWidth: '960px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              backgroundColor: COLORS.gold,
              color: COLORS.deep,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              padding: '0.375rem 1rem',
              borderRadius: '4px',
              marginBottom: '1.5rem',
            }}
          >
            {messages.heroBadge}
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              color: COLORS.white,
              lineHeight: 1.15,
              whiteSpace: 'pre-line',
              marginBottom: '1.25rem',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {messages.heroHeading}
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            {messages.heroSubheading}
          </p>
        </div>
      </section>

      {/* ── SECTION 2: FRAMING ── */}
      <section style={{ backgroundColor: COLORS.white, padding: '5rem 1.5rem' }}>
        <div
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
          }}
          className="lg-two-col"
        >
          {/* Left column */}
          <div>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: COLORS.deep,
                marginBottom: '1.5rem',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {messages.framingHeading}
            </h2>
            <blockquote
              style={{
                borderLeft: `4px solid ${COLORS.gold}`,
                paddingLeft: '1.5rem',
                margin: '0 0 1.5rem 0',
              }}
            >
              <p
                style={{
                  fontSize: '18px',
                  fontStyle: 'italic',
                  color: COLORS.deep,
                  lineHeight: 1.6,
                }}
              >
                {messages.framingQuote}
              </p>
            </blockquote>
            <p
              style={{
                fontSize: '15px',
                color: COLORS['gray-600'],
                lineHeight: 1.7,
              }}
            >
              {messages.framingClosing}
            </p>
          </div>
          {/* Right column — checklist */}
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {messages.framingChecklist.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    fontSize: '15px',
                    color: COLORS['gray-600'],
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      color: COLORS.primary,
                      fontWeight: 700,
                      fontSize: '18px',
                      flexShrink: 0,
                      marginTop: '1px',
                    }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: VALIDATION ── */}
      <section style={{ backgroundColor: COLORS.ice, padding: '5rem 1.5rem' }}>
        <div
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
          }}
          className="lg-two-col"
        >
          {/* Left column */}
          <div>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: COLORS.deep,
                marginBottom: '1rem',
                whiteSpace: 'pre-line',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {messages.validationHeading}
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: COLORS['gray-600'],
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {messages.validationIntro}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {messages.validationRisks.map((risk, i) => (
                <li
                  key={i}
                  style={{
                    borderLeft: `3px solid ${COLORS.coral}`,
                    paddingLeft: '1rem',
                    backgroundColor: COLORS.white,
                    borderRadius: '4px',
                    padding: '1rem',
                    marginBottom: '0.75rem',
                    fontSize: '14px',
                    color: COLORS['gray-600'],
                    lineHeight: 1.6,
                  }}
                >
                  {risk}
                </li>
              ))}
            </ul>
          </div>
          {/* Right column — conclusion card */}
          <div
            style={{
              backgroundColor: COLORS['primary-dark'],
              borderRadius: '4px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                color: COLORS.white,
                fontSize: '15px',
                lineHeight: 1.7,
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              {messages.validationWithout}
            </p>
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.2)',
                paddingTop: '1.5rem',
              }}
            >
              <p
                style={{
                  color: COLORS.white,
                  fontSize: '15px',
                  lineHeight: 1.7,
                  fontWeight: 700,
                }}
              >
                {messages.validationWith}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: INVESTOR PROFILES ── */}
      <section style={{ backgroundColor: COLORS.white, padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: COLORS.deep,
              textAlign: 'center',
              marginBottom: '0.75rem',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {messages.profilesHeading}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: COLORS['gray-600'],
              textAlign: 'center',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
            }}
          >
            {messages.profilesIntro}
          </p>

          {messages.profiles.map((profile, i) => {
            const borderColor = profileBorderColor[profile.colorRole];
            const isHovered = hoveredProfile === i;
            return (
              <div
                key={i}
                style={{
                  borderLeft: `4px solid ${isHovered ? borderColor : COLORS.light}`,
                  border: `1px solid ${COLORS.light}`,
                  borderLeftWidth: '4px',
                  borderLeftColor: isHovered ? borderColor : COLORS.light,
                  backgroundColor: COLORS.white,
                  borderRadius: '4px',
                  padding: '2rem',
                  marginBottom: '1.5rem',
                  transition: 'border-color 120ms linear',
                }}
                onMouseEnter={() => setHoveredProfile(i)}
                onMouseLeave={() => setHoveredProfile(null)}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: COLORS['primary-dark'],
                    marginBottom: '0.25rem',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {profile.type}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: COLORS['gray-400'],
                    marginBottom: '1.5rem',
                  }}
                >
                  {profile.subtitle}
                </p>

                {/* Thinking */}
                <h4
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: COLORS.deep,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {language === 'tr' ? 'Nasıl düşünür?' : 'How does it think?'}
                </h4>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.25rem 0',
                  }}
                >
                  {profile.thinking.map((t, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '14px',
                        color: COLORS['gray-600'],
                        lineHeight: 1.6,
                        paddingLeft: '1rem',
                        position: 'relative',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: COLORS.primary,
                        }}
                        aria-hidden="true"
                      >
                        •
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>

                {/* Preferences */}
                <h4
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: COLORS.deep,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {language === 'tr'
                    ? 'Tercih ettiği proje'
                    : 'Preferred project'}
                </h4>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.25rem 0',
                  }}
                >
                  {profile.preferences.map((p, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '14px',
                        color: COLORS['gray-600'],
                        lineHeight: 1.6,
                        paddingLeft: '1rem',
                        position: 'relative',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: COLORS.primary,
                        }}
                        aria-hidden="true"
                      >
                        •
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                {/* Threshold */}
                <h4
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: COLORS.deep,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {language === 'tr' ? 'Karar eşiği' : 'Decision threshold'}
                </h4>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: COLORS.ice,
                    color: COLORS.deep,
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '0.375rem 0.75rem',
                    borderRadius: '4px',
                    marginBottom: '0.5rem',
                  }}
                >
                  {profile.threshold}
                </span>
                <p
                  style={{
                    fontSize: '14px',
                    color: COLORS['gray-600'],
                    lineHeight: 1.6,
                    marginTop: '0.5rem',
                  }}
                >
                  {profile.thresholdDetail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 5: RISK TABLE ── */}
      <section style={{ backgroundColor: COLORS.ice, padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: COLORS.deep,
              textAlign: 'center',
              marginBottom: '0.75rem',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {messages.riskHeading}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: COLORS['gray-600'],
              textAlign: 'center',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            {messages.riskIntro}
          </p>

          <div
            style={{
              border: `1px solid ${COLORS.light}`,
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: COLORS.white,
            }}
          >
            {messages.riskRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(160px, auto) 1fr',
                  borderBottom:
                    i < messages.riskRows.length - 1
                      ? `1px solid ${COLORS.light}`
                      : 'none',
                  padding: '1rem 1.25rem',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    color: COLORS['primary-dark'],
                    fontSize: '14px',
                  }}
                >
                  {row.investor}
                </span>
                <span
                  style={{
                    color: COLORS['gray-600'],
                    fontSize: '14px',
                    lineHeight: 1.5,
                  }}
                >
                  {row.approach}
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
              color: COLORS.deep,
              fontSize: '18px',
              marginTop: '2rem',
              lineHeight: 1.5,
            }}
          >
            {messages.riskClosing}
          </p>
        </div>
      </section>

      {/* ── SECTION 6: MOTIVATIONS ── */}
      <section style={{ backgroundColor: COLORS.deep, padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: COLORS.white,
              textAlign: 'center',
              marginBottom: '0.75rem',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {messages.motivationHeading}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.75)',
              textAlign: 'center',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
            }}
          >
            {messages.motivationIntro}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.25rem',
            }}
            className="motivation-grid"
          >
            {messages.motivations.map((m, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderTop: `3px solid ${COLORS.primary}`,
                  borderRadius: '4px',
                  padding: '1.5rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: COLORS.white,
                    marginBottom: '0.5rem',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {m.title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.6,
                  }}
                >
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.75)',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '2rem auto 0.75rem',
              lineHeight: 1.6,
            }}
          >
            {messages.motivationATRNote}
          </p>
          <p style={{ textAlign: 'center' }}>
            <a
              href={`/${language}/atr-matrix`}
              style={{
                color: COLORS.primary,
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 120ms linear',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = 'underline')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = 'none')
              }
            >
              {messages.motivationATRLink}
            </a>
          </p>
        </div>
      </section>

      {/* ── SECTION 7: CLOSING CTA ── */}
      <section
        style={{
          backgroundColor: COLORS.gold,
          padding: '5rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: COLORS.deep,
              whiteSpace: 'pre-line',
              marginBottom: '1rem',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {messages.ctaHeading}
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: COLORS.deep,
              opacity: 0.75,
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            {messages.ctaSubtext}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <a
              href={language === 'tr' ? '/tr/yatirimci' : '/en/investor'}
              style={{
                display: 'inline-block',
                backgroundColor: COLORS.deep,
                color: COLORS.white,
                fontWeight: 700,
                fontSize: '14px',
                padding: '0.875rem 2rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'background-color 120ms linear',
              }}
            >
              {messages.ctaPrimary}
            </a>
            <a
              href={`/${language}/atr-matrix`}
              style={{
                display: 'inline-block',
                border: `2px solid ${COLORS.deep}`,
                color: COLORS.deep,
                fontWeight: 700,
                fontSize: '14px',
                padding: '0.75rem 2rem',
                borderRadius: '4px',
                textDecoration: 'none',
                backgroundColor: 'transparent',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'background-color 120ms linear',
              }}
            >
              {messages.ctaSecondary}
            </a>
          </div>

          <p
            style={{
              fontSize: '12px',
              color: COLORS.deep,
              opacity: 0.6,
              marginTop: '2rem',
            }}
          >
            {messages.disclaimer}
          </p>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: COLORS.deep,
              marginTop: '1rem',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {messages.motto}
          </p>
        </div>
      </section>

      {/* Responsive grid styles */}
      <style>{`
        @media (min-width: 1024px) {
          .lg-two-col {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 768px) {
          .motivation-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .motivation-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
