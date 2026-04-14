import FramingCard from '@/components/ui/FramingCard';

interface Card {
  title: string;
  description: string;
}

interface FramingSectionProps {
  kicker: string;
  h2: string;
  pullQuote: string;
  pullQuoteSubtext: string;
  cards: Card[];
}

export default function FramingSection({
  kicker,
  h2,
  pullQuote,
  pullQuoteSubtext,
  cards,
}: FramingSectionProps) {
  return (
    <section
      aria-labelledby="y2-title"
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
            id="y2-title"
            className="text-3xl font-bold"
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Pull-Quote Box */}
        <div
          className="bg-afa-card rounded-xl mb-8"
          style={{
            borderLeft: '4px solid #FFCB00',
            padding: '24px 28px',
          }}
        >
          <p
            className="italic font-semibold mb-2"
            style={{
              color: '#0F2E2C',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            &ldquo;{pullQuote}&rdquo;
          </p>
          <p
            className="text-sm"
            style={{ color: '#4A5568' }}
          >
            {pullQuoteSubtext}
          </p>
        </div>

        {/* Grid - 4 cards (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      `}</style>
    </section>
  );
}
