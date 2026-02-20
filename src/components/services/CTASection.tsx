import Link from 'next/link';

type Props = {
  locale: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
};

export default function CTASection({ locale, title, subtitle, ctaLabel }: Props) {
  return (
    <section className="w-full bg-white py-20 lg:py-24" aria-label="Call to action">
      <div className="afa-container text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-base leading-relaxed afa-text-body-muted max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        <Link
          href={`/${locale}/teknik-on-degerlendirme`}
          className="afa-btn-primary inline-flex items-center text-base no-underline"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
