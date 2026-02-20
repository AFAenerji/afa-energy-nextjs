import Link from 'next/link';

type Props = {
  locale: string;
  title: string;
  subtitle: string;
  navItems: readonly { label: string; sub: string; anchor: string }[];
};

export default function ServicesHero({ locale, title, subtitle, navItems }: Props) {
  return (
    <section className="w-full services-hero pt-16 pb-12 lg:pt-20 lg:pb-16">
      <div className="afa-container">
        {/* Bridge accent */}
        <div className="mb-8" aria-hidden="true">
          <div className="h-px w-full bg-white/10" />
          <div className="mt-4 h-[3px] w-16 rounded-sm afa-bridge-accent" />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl">
          {subtitle}
        </p>

        {/* Quick nav buttons — two-line structure */}
        {navItems.length > 0 && (
          <nav className="mt-10 flex flex-wrap gap-4" aria-label="Service phases">
            {navItems.map((item) => (
              <Link
                key={item.anchor}
                href={`/${locale}/hizmetler#${item.anchor}`}
                className="flex flex-col px-5 py-3 rounded-[var(--radius)] border border-white/20 text-white hover:border-[var(--afa-yellow)] transition-colors group"
              >
                <span className="text-[14px] font-[800] leading-tight tracking-tight">
                  {item.label}
                </span>
                <span className="text-[12px] font-[600] leading-tight mt-0.5 text-white/70 group-hover:text-white/90 transition-colors">
                  {item.sub}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
