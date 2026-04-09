'use client';

import Image from 'next/image';
import Link from 'next/link';

interface InfoCard {
  kiker: string;
  body: string;
}

interface GelistiriciHeroProps {
  content: {
    sectionLabel: string;
    h1Line1: string;
    h1Line2: string;
    h1Line3: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    card1: InfoCard;
    card2: InfoCard;
    card3: InfoCard;
  };
  locale: string;
}

export default function GelistiriciHero({ content, locale }: GelistiriciHeroProps) {
  const contactHref = locale === 'tr' ? '/tr/iletisim' : locale === 'en' ? '/en/contact' : '/ro/contact';
  const atrHref = `/${locale}${content.ctaSecondaryHref}`;

  const cards = [content.card1, content.card2, content.card3];

  return (
    <section className="bg-afa-primary-dark relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main grid */}
      <div className="relative z-[1] mx-auto grid min-h-[620px] max-w-[1180px] grid-cols-1 lg:grid-cols-[55fr_45fr]">
        {/* ── Left: Text panel ── */}
        <div className="flex flex-col justify-center px-6 py-10 lg:px-[52px] lg:py-16">
          {/* Section label */}
          <span className="mb-5 text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'rgba(255, 203, 0, 0.70)' }}>
            {content.sectionLabel}
          </span>

          {/* H1 */}
          <h1
            className="mb-6 max-w-[560px] font-bold leading-[1.2]"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 3vw, 38px)' }}
          >
            <span style={{ display: 'block', color: '#FFFFFF' }}>{content.h1Line1}</span>
            <span style={{ display: 'block', color: '#FFFFFF' }}>{content.h1Line2}</span>
            <span className="text-afa-gold" style={{ display: 'block' }}>{content.h1Line3}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mb-8 max-w-[480px] text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {content.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={contactHref}
              className="bg-afa-gold text-afa-deep inline-flex items-center justify-center rounded-[2px] px-6 text-[12.5px] font-bold tracking-[0.04em] transition-[background-color] duration-[160ms] ease-out hover:brightness-95"
              style={{ fontFamily: 'Montserrat, sans-serif', minWidth: '220px', height: '48px', textAlign: 'center', textDecoration: 'none' }}
            >
              {content.ctaPrimary}
            </Link>
            {/* TODO-SPRINT4: /atr-matrix route aktif olduğunda href güncellenmeli */}
            <Link
              href={atrHref}
              className="inline-flex items-center justify-center rounded-[2px] border-[1.5px] border-white px-5 text-[12.5px] font-semibold text-white transition-[background-color] duration-[160ms] ease-out hover:bg-white/[0.08]"
              style={{ height: '48px', textDecoration: 'none', textAlign: 'center' }}
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* ── Right: Photo panel ── */}
        <div className="relative h-[40vh] min-h-[280px] max-h-[400px] w-full lg:h-full lg:min-h-0 lg:max-h-none">
          <Image
            src="/images/gelistirici/hero-gelistirici-saha.jpg"
            alt="Renewable energy project site"
            fill
            className="object-cover"
            quality={85}
            style={{ filter: 'brightness(0.9) saturate(0.85)' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/b3-cta-photo.jpg';
            }}
          />
          {/* Gradient overlay — desktop only */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #18625F 0%, #18625F var(--gradient-fade, 42%), transparent calc(var(--gradient-fade, 42%) + 18%))',
              pointerEvents: 'none',
            }}
          />

          {/* Info cards — absolute bottom-left */}
          <div className="absolute bottom-[38px] left-[22px] z-10 flex max-w-[260px] flex-col gap-3">
            {cards.map((card, i) => (
              <div
                key={i}
                className={i === 0 ? 'block' : 'hidden lg:block'}
                style={{
                  background: 'rgba(15,46,44,0.85)',
                  borderLeft: '3px solid #FFCB00',
                  borderRadius: '2px',
                  padding: '16px 20px',
                }}
              >
                <div className="text-afa-gold mb-[7px] text-xs font-bold uppercase tracking-[0.12em]">
                  {card.kiker}
                </div>
                <div className="text-sm leading-snug" style={{ color: '#FFFFFF' }}>
                  {card.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
