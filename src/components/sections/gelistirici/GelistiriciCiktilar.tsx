'use client';

interface CiktiItem {
  num: string;
  title: string;
  body: string;
  badge: string;
}

interface GelistiriciCiktilarProps {
  content: {
    sectionLabel: string;
    h2: string;
    items: CiktiItem[];
  };
}

export default function GelistiriciCiktilar({ content }: GelistiriciCiktilarProps) {
  return (
    <section style={{ background: '#18625F', padding: '96px 0' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', paddingInline: '52px' }}>
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: '14px', height: '2px', background: '#FFCB00' }} />
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
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '36px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
            }}
          >
            {content.h2}
          </h2>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '20px' }}
        >
          {content.items.map((item, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '28px',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `3px solid ${i % 2 === 0 ? '#28AFB0' : '#FFCB00'}`,
                transition: 'box-shadow 200ms ease-out, background-color 160ms ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Title */}
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.3, position: 'relative', zIndex: 2 }}>
                {item.title}
              </h3>
              {/* Body */}
              <p style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6, position: 'relative', zIndex: 2 }}>
                {item.body}
              </p>
              {/* Badge — cards 04 and 06 only */}
              {item.badge && (
                <span
                  style={{
                    marginTop: 'auto',
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    background: '#FFCB00',
                    color: '#0F2E2C',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {item.badge}
                </span>
              )}
              {/* Ghost number */}
              <span
                className="select-none pointer-events-none"
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '16px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '160px',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: 'rgba(255,255,255,0.08)',
                  zIndex: 1,
                }}
              >
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
