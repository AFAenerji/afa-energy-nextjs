import FramingCard from '@/components/ui/FramingCard';

interface Card {
  title: string;
  description: string;
}

interface MotivationsSectionProps {
  kicker: string;
  h2: string;
  cards: Card[];
}

export default function MotivationsSection({ kicker, h2, cards }: MotivationsSectionProps) {
  return (
    <section
      aria-labelledby="y6-title"
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
            id="y6-title"
            className="text-3xl font-bold"
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Grid - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, index) => (
            <FramingCard
              key={index}
              title={card.title}
              description={card.description}
            />
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
            gap: 20px;
            padding: 32px;
          }
        }
      `}</style>
    </section>
  );
}
