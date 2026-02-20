import Link from 'next/link';

type Props = {
  locale: string;
  title: string;
  subtitle: string;
  navItems: readonly { label: string; anchor: string }[];
};

export default function ServicesHero({ locale, title, subtitle, navItems }: Props) {
  return (
    <section className="w-full dark-section pt-16 pb-12 lg:pt-20 lg:pb-16">
      <div className="afa-container">
        {/* Bridge accent */}
        <div className="mb-8" aria-hidden="true">
          <div className="h-px w-full bg-white/10" />
          <div className="mt-4 h-[3px] w-16 rounded-sm afa-bridge-accent" />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-4 text-base md:text-lg afa-text-secondary max-w-3xl">
          {subtitle}
        </p>

        {/* Quick nav buttons */}
        {navItems.length > 0 && (
          <nav className="mt-8 flex flex-wrap gap-3" aria-label="Service phases">
            {navItems.map((item) => (
              <Link
                key={item.anchor}
                href={`/${locale}/hizmetler#${item.anchor}`}
                className="inline-flex items-center px-4 py-2 text-sm font-bold rounded-[var(--radius)] border border-white/20 text-white hover:border-[var(--yellow-accent)] hover:text-[var(--yellow-accent)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
