import EmbossedCard from '@/components/ui/EmbossedCard';

interface Profile {
  ghostNumber: string;
  badge: string;
  title: string;
  bodyLines: string[];
  topBg: string;
  isGold?: boolean;
}

interface ProfilesSectionProps {
  kicker: string;
  h2: string;
  profiles: Profile[];
}

export default function ProfilesSection({ kicker, h2, profiles }: ProfilesSectionProps) {
  return (
    <section
      aria-labelledby="y4-title"
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
            id="y4-title"
            className="text-3xl font-bold"
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Grid - 3 embossed cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <EmbossedCard
              key={index}
              ghostNumber={profile.ghostNumber}
              badge={profile.badge}
              title={profile.title}
              bodyLines={profile.bodyLines}
              topBg={profile.topBg}
              isGold={profile.isGold}
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
