'use client';

interface B5PiyasaDinamikleriProps {
  content: {
    kicker: string;
    h2: string;
    intro: string;
    romania: {
      title: string;
      breakingPoint: string;
      boardTranslation: string;
    };
    turkey: {
      title: string;
      breakingPoint: string;
      boardTranslation: string;
    };
    pullQuoteMain: string;
    pullQuoteSub: string;
  };
}

export default function B5PiyasaDinamikleri({ content }: B5PiyasaDinamikleriProps) {
  return (
    <section style={{ width: '100%', background: '#18625F', paddingBlock: '80px' }}>
      <div style={{
        maxWidth: '1180px',
        marginInline: 'auto',
        paddingInline: '52px'
      }}>

        {/* ── Header Group ── */}

        {/* Kicker */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '18px' }}>
          <div style={{ width: '28px', height: '1px', background: '#FFCB00', opacity: 0.6 }} />
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: '#FFCB00',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>
            {content.kicker}
          </span>
          <div style={{ width: '28px', height: '1px', background: '#FFCB00', opacity: 0.6 }} />
        </div>

        {/* H2 */}
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(26px, 3vw, 42px)',
          fontWeight: 800,
          color: '#FFFFFF',
          textAlign: 'center',
          lineHeight: 1.1,
          margin: '0 0 20px'
        }}>
          {content.h2}
        </h2>

        {/* Intro paragraph */}
        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.76)',
          lineHeight: 1.75,
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {content.intro}
        </p>

        {/* ── Cards Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          alignItems: 'stretch',
          marginTop: '44px'
        }}>

          {/* Romania Card */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Card body */}
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '4px 4px 0 0',
              borderTop: '3px solid #FFCB00',
              borderLeft: '1px solid rgba(255,203,0,0.22)',
              borderRight: '1px solid rgba(255,203,0,0.22)',
              borderBottom: 'none',
              padding: '32px 30px 30px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.22), 0 18px 36px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.10)'
            }}>
              {/* Ghost number */}
              <div style={{
                position: 'absolute',
                bottom: '-28px',
                right: '-12px',
                fontSize: '180px',
                fontWeight: 900,
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
                color: '#FFCB00',
                opacity: 0.04
              }}>
                01
              </div>

              {/* Title row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '24px',
                position: 'relative',
                zIndex: 1
              }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFCB00', lineHeight: 1 }}>
                  01
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1 }}>
                  {content.romania.title}
                </h3>
              </div>

              {/* Content columns */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                position: 'relative',
                zIndex: 1
              }}>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 10px', color: '#FFCB00' }}>
                    KIRILMA NOKTASI
                  </p>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.86)', lineHeight: 1.72, margin: 0 }}>
                    {content.romania.breakingPoint}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 10px', color: '#FFCB00' }}>
                    YK ÇEVİRİSİ
                  </p>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.86)', lineHeight: 1.72, margin: 0 }}>
                    {content.romania.boardTranslation}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab footer */}
            <div style={{
              padding: '12px 24px',
              borderRadius: '0 0 4px 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#FFCB00',
              boxShadow: '0 6px 14px rgba(0,0,0,0.22), 0 12px 24px rgba(0,0,0,0.14)'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F2E2C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                ANRE
              </span>
              <span style={{ fontSize: '10px', color: 'rgba(15,46,44,0.45)', fontWeight: 500 }}>
                — Romanya Enerji Regülatörü
              </span>
            </div>
          </div>

          {/* Turkey Card */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Card body */}
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '4px 4px 0 0',
              borderTop: '3px solid #28AFB0',
              borderLeft: '1px solid rgba(40,175,176,0.22)',
              borderRight: '1px solid rgba(40,175,176,0.22)',
              borderBottom: 'none',
              padding: '32px 30px 30px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.22), 0 18px 36px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.10)'
            }}>
              {/* Ghost number */}
              <div style={{
                position: 'absolute',
                bottom: '-28px',
                right: '-12px',
                fontSize: '180px',
                fontWeight: 900,
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
                color: '#28AFB0',
                opacity: 0.05
              }}>
                02
              </div>

              {/* Title row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '24px',
                position: 'relative',
                zIndex: 1
              }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#28AFB0', lineHeight: 1 }}>
                  02
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1 }}>
                  {content.turkey.title}
                </h3>
              </div>

              {/* Content columns */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                position: 'relative',
                zIndex: 1
              }}>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 10px', color: '#28AFB0' }}>
                    KIRILMA NOKTASI
                  </p>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.86)', lineHeight: 1.72, margin: 0 }}>
                    {content.turkey.breakingPoint}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 10px', color: '#28AFB0' }}>
                    YK ÇEVİRİSİ
                  </p>
                  <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.86)', lineHeight: 1.72, margin: 0 }}>
                    {content.turkey.boardTranslation}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab footer */}
            <div style={{
              padding: '12px 24px',
              borderRadius: '0 0 4px 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#28AFB0',
              boxShadow: '0 6px 14px rgba(0,0,0,0.22), 0 12px 24px rgba(0,0,0,0.14)'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F2E2C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                EPDK
              </span>
              <span style={{ fontSize: '10px', color: 'rgba(15,46,44,0.45)', fontWeight: 500 }}>
                — Türkiye Enerji Regülatörü
              </span>
            </div>
          </div>

        </div>

        {/* ── Pull-quote ── */}
        <div style={{
          marginTop: '24px',
          borderLeft: '3px solid #FFCB00',
          borderRadius: '0 4px 4px 0',
          padding: '24px 28px',
          background: 'rgba(255,255,255,0.06)'
        }}>
          <p style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.70,
            margin: '0 0 10px'
          }}>
            {content.pullQuoteMain}
          </p>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.44)',
            lineHeight: 1.65,
            margin: 0
          }}>
            {content.pullQuoteSub}
          </p>
        </div>

      </div>

      {/* Mobile Responsive */}
      <style jsx>{`
        @media (max-width: 767px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="gap: 32px"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          div[style*="paddingInline: 52px"] {
            padding-inline: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
