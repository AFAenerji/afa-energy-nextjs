import FramingCard from '@/components/ui/FramingCard';

interface Card {
  title: string;
  description: string;
}

interface ApproachSectionProps {
  kicker: string;
  h2: string;
  cards: Card[];
  posBoxText: string;
}

export default function ApproachSection({ kicker, h2, cards, posBoxText }: ApproachSectionProps) {
  return (
    <section
      aria-labelledby="y1-5-title"
      className="bg-afa-light"
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
            id="y1-5-title"
            className="text-3xl font-bold"
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Grid - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {cards.map((card, index) => (
            <FramingCard
              key={index}
              title={card.title}
              description={card.description}
            />
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
