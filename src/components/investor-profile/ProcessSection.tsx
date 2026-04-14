interface PhaseCard {
  phase: string;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  kicker: string;
  h2: string;
  phaseCards: PhaseCard[];
}

export default function ProcessSection({ kicker, h2, phaseCards }: ProcessSectionProps) {
  return (
    <section
      aria-labelledby="y8-title"
      className="bg-white"
      style={{ padding: '80px 0' }}
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
            id="y8-title"
            className="text-3xl font-bold"
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Grid - 4 phase cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phaseCards.map((card, index) => (
            <div
              key={index}
              className="bg-afa-ice rounded-xl p-7"
              style={{ border: '1px solid rgba(0,0,0,0.05)' }}
            >
              {/* Phase label */}
              <div
                className="text-xs font-bold uppercase mb-3"
                style={{
                  color: '#28AFB0',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                {card.phase}
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
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
