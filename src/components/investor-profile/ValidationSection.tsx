interface ValidationCard {
  number: string;
  title: string;
  description: string;
  afaDifference: string;
}

interface ValidationSectionProps {
  kicker: string;
  h2: string;
  validationCards: ValidationCard[];
  withoutTitle: string;
  withoutItems: string[];
  withTitle: string;
  withItems: string[];
  posBoxText: string;
}

export default function ValidationSection({
  kicker,
  h2,
  validationCards,
  withoutTitle,
  withoutItems,
  withTitle,
  withItems,
  posBoxText,
}: ValidationSectionProps) {
  return (
    <section
      aria-labelledby="y3-title"
      className="bg-afa-ice"
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
            id="y3-title"
            className="text-3xl font-bold"
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Validation Cards - tek sütun */}
        <div className="flex flex-col gap-5 mb-8">
          {validationCards.map((card, index) => (
            <div key={index} className="flex gap-5 items-start">
              {/* Number circle */}
              <div
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#18625F',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 800,
                  fontFamily: 'Montserrat, sans-serif',
                  boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2), inset -2px -2px 4px rgba(255,255,255,0.1)',
                }}
              >
                {card.number}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: '#0F2E2C' }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-1"
                  style={{ color: '#4A5568' }}
                >
                  {card.description}
                </p>
                <p
                  className="text-sm font-semibold italic"
                  style={{ color: '#28AFB0', marginTop: '4px' }}
                >
                  {card.afaDifference}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison - 2'li grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Sol: Olmadan */}
          <div
            className="bg-afa-light rounded-xl p-7"
            style={{ borderLeft: '4px solid #F25F5C' }}
          >
            <h3
              className="font-bold text-lg mb-4"
              style={{ color: '#0F2E2C' }}
            >
              {withoutTitle}
            </h3>
            <ul className="space-y-2">
              {withoutItems.map((item, index) => (
                <li
                  key={index}
                  className="text-sm leading-relaxed flex items-start gap-2 text-afa-gray"
                >
                  <span className="text-afa-warning mt-1">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sağ: İle */}
          <div
            className="bg-afa-card rounded-xl p-7"
            style={{ borderLeft: '4px solid #28AFB0' }}
          >
            <h3
              className="font-bold text-lg mb-4"
              style={{ color: '#0F2E2C' }}
            >
              {withTitle}
            </h3>
            <ul className="space-y-2">
              {withItems.map((item, index) => (
                <li
                  key={index}
                  className="text-sm leading-relaxed flex items-start gap-2"
                  style={{ color: '#4A5568' }}
                >
                  <span className="text-afa-accent mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
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
      `}</style>
    </section>
  );
}
