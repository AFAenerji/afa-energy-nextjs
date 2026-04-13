interface HeroSectionProps {
  kicker: string;
  h1: string;
  subtitle: string;
  ctaText: string;
}

export default function HeroSection({ kicker, h1, subtitle, ctaText }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="y1-title"
      className="relative bg-afa-deep text-left overflow-hidden"
      style={{ padding: '100px 0 80px' }}
    >
      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1180px] mx-auto px-[52px]">
        {/* Kicker Pill */}
        <div
          className="inline-block bg-afa-gold rounded font-black uppercase mb-6"
          style={{
            color: '#0F2E2C',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            padding: '6px 16px',
          }}
        >
          {kicker}
        </div>

        {/* H1 */}
        <h1
          id="y1-title"
          className="font-black mb-6"
          style={{
            color: '#FFFFFF',
            fontSize: '44px',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: '700px',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          {h1}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg mb-8"
          style={{
            color: 'rgba(255,255,255,0.72)',
            maxWidth: '620px',
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>

        {/* CTA Button */}
        <a
          href="#investor-form"
          className="inline-block bg-afa-gold rounded-lg font-bold"
          style={{
            color: '#0F2E2C',
            fontSize: '15px',
            fontWeight: 700,
            padding: '14px 32px',
            textDecoration: 'none',
            boxShadow: '0 6px 28px rgba(255,203,0,0.60), 0 2px 8px rgba(0,0,0,0.30)',
          }}
        >
          {ctaText}
        </a>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 80px 0 60px !important;
          }
          div[class*="px-"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          h1 {
            font-size: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
