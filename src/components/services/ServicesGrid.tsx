import Link from 'next/link';

type DecisionInput = {
  label: string;
  value: string;
};

type ServicePhase = {
  id: string;
  anchor: string;
  tag: string;
  title: string;
  description: string;
  deliverables: readonly string[];
  decisionInputs?: readonly DecisionInput[];
};

type Props = {
  locale: string;
  phases: readonly ServicePhase[];
  ctaLabel: string;
};

export default function ServicesGrid({ locale, phases, ctaLabel }: Props) {
  return (
    <section className="w-full bg-[var(--muted)] py-20 lg:py-24" aria-label="Service phases">
      <div className="afa-container">
        <div className="space-y-16">
          {phases.map((phase) => (
            <article
              key={phase.id}
              id={phase.anchor}
              className="scroll-mt-24 rounded-lg border border-[var(--border)] bg-white p-8 md:p-10"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase afa-eyebrow mb-2 block">
                {phase.tag}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mb-4">
                {phase.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed afa-text-body-muted mb-6">
                {phase.description}
              </p>

              {/* Deliverables */}
              <ul className="space-y-2 mb-6">
                {phase.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[var(--green-authority)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Decision Inputs (Karar Girdisi) */}
              {phase.decisionInputs && phase.decisionInputs.length > 0 && (
                <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--muted)] p-5">
                  <p className="text-xs font-bold tracking-[0.15em] uppercase afa-eyebrow mb-3">
                    Karar Girdisi
                  </p>
                  <dl className="space-y-2">
                    {phase.decisionInputs.map((input, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:gap-3">
                        <dt className="text-sm font-semibold shrink-0 sm:w-48">{input.label}</dt>
                        <dd className="text-sm afa-text-body-muted">{input.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Phase CTA */}
              <div className="mt-8">
                <Link
                  href={`/${locale}/teknik-on-degerlendirme`}
                  className="afa-btn-primary inline-flex items-center text-sm no-underline"
                >
                  {ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
