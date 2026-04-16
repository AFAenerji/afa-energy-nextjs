'use client';

interface CardData {
  num: string;
  title: string;
  body: string;
}

interface GelistiriciDegerKorumaProps {
  content: {
    sectionLabel: string;
    h2: string;
    intro: string;
    cards: CardData[];
    pullQuote: string;
  };
}

const CARD_SHADOW = 'inset 4px 4px 10px rgba(0,0,0,0.12), inset -3px -3px 8px rgba(255,255,255,0.85)';

export default function GelistiriciDegerKoruma({ content }: GelistiriciDegerKorumaProps) {
  const paragraphs = content.intro.split('\n\n');

  return (
    <section style={{ background: '#EEF7F7', padding: '96px 0' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', paddingInline: '52px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '14px', height: '2px', background: '#FFCB00' }} />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#18625F',
              }}
            >
              {content.sectionLabel}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '40px',
              fontWeight: 800,
              color: '#0F2E2C',
              lineHeight: 1.15,
              marginBottom: '24px',
            }}
          >
            {content.h2}
          </h2>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#2C3E3D',
                maxWidth: '720px',
                marginBottom: '12px',
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Cards — G4 axis card style */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {content.cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '28px 28px 28px 32px',
                borderLeft: '4px solid #18625F',
                boxShadow: CARD_SHADOW,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ghost number */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: '12px',
                  bottom: '-8px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '100px',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: 'rgba(24,98,95,0.06)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                {card.num}
              </span>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#18625F',
                    marginBottom: '12px',
                  }}
                >
                  {card.title}
                </div>
                <p style={{ fontSize: '14px', color: '#2C3E3D', lineHeight: 1.6, margin: 0 }}>
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div
          style={{
            background: 'rgba(24,98,95,0.06)',
            borderLeft: '3px solid #18625F',
            borderRadius: '0 8px 8px 0',
            padding: '24px 32px',
            maxWidth: '720px',
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '16px',
              fontWeight: 600,
              fontStyle: 'italic',
              color: '#18625F',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {content.pullQuote}
          </p>
        </div>
      </div>
    </section>
  );
}
