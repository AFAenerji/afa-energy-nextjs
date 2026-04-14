interface Card {
  title: string;
  description: string;
  icon: string;
}

interface PositioningSectionProps {
  kicker: string;
  h2: string;
  cards: Card[];
  posBoxText: string;
}

export default function PositioningSection({
  kicker,
  h2,
  cards,
  posBoxText,
}: PositioningSectionProps) {
  // Icon mapping - 4 farklı ikon (Phosphor Icons outline style)
  const iconMap: Record<string, React.ReactNode> = {
    'ban': (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
    'wrench': (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    'chart': (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
        <line x1="2" y1="2" x2="22" y2="22"/>
      </svg>
    ),
    'handshake': (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M8 21h8M12 17v4M3.05 11l1.45 1.45M20.95 11l-1.45 1.45"/>
        <path d="M18.36 6.64L19 7.27a2 2 0 0 1 0 2.83l-1 1a2 2 0 0 1-2.83 0L14 10M5.64 6.64L5 7.27a2 2 0 0 0 0 2.83l1 1a2 2 0 0 0 2.83 0L10 10"/>
        <line x1="9" y1="5" x2="9" y2="9"/>
        <line x1="15" y1="5" x2="15" y2="9"/>
      </svg>
    ),
  };

  return (
    <section
      aria-labelledby="y6-7-title"
      className="bg-afa-light"
      style={{
        borderTop: '4px solid #FFCB00',
        paddingTop: '84px',
        paddingBottom: '80px',
      }}
    >
      <div className="max-w-[1180px] mx-auto px-[52px]">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#28AFB0', letterSpacing: '0.18em' }}
          >
            {kicker}
          </div>
          <h2
            id="y6-7-title"
            className="text-3xl font-bold"
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Grid - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-afa-card rounded-xl p-7"
              style={{
                boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.06), inset -3px -3px 8px rgba(255,255,255,0.85)',
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 mb-4 flex items-center justify-center"
                style={{ color: '#F25F5C' }}
                aria-hidden="true"
              >
                {iconMap[card.icon] || iconMap['ban']}
              </div>

              {/* Title */}
              <h3
                className="font-bold text-base mb-2"
                style={{ color: '#0F2E2C' }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#4A5568' }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pos-box */}
        <div
          className="bg-afa-card rounded-lg p-5"
          style={{
            borderLeft: '4px solid #FFCB00',
            color: '#4A5568',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          {posBoxText}
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[class*="px-"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .grid {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
