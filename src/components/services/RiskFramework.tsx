type FrameworkBlock = {
  title: string;
  items: readonly string[];
};

type Props = {
  title: string;
  decisionTerms: {
    title: string;
    terms: readonly { label: string; description: string }[];
  };
  blocks: readonly FrameworkBlock[];
};

export default function RiskFramework({ title, decisionTerms, blocks }: Props) {
  return (
    <section className={clsx('w-full', 'dark-section', 'py-20', 'lg:py-24')} aria-label="Risk framework">
      <div className="afa-container">
        <div className="mb-8" aria-hidden="true">
          <div className={clsx('h-px', 'w-full', 'bg-white/10')} />
          <div className={clsx('mt-4', 'h-[3px]', 'w-16', 'rounded-sm', 'afa-bridge-accent')} />
        </div>

        <h2 className={clsx('text-2xl', 'md:text-3xl', 'font-extrabold', 'tracking-tight', 'text-white', 'mb-12')}>
          {title}
        </h2>

        {/* Decision Terms */}
        <div className="mb-12">
          <h3 className={clsx('text-sm', 'font-bold', 'tracking-[0.15em]', 'uppercase', 'text-afa-gold', 'mb-6')}>
            {decisionTerms.title}
          </h3>
          <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4')}>
            {decisionTerms.terms.map((term) => (
              <div
                key={term.label}
                className={clsx('rounded-lg', 'border', 'border-white/10', 'bg-white/3', 'p-5')}
              >
                <p className={clsx('text-sm', 'font-bold', 'text-white', 'mb-1')}>{term.label}</p>
                <p className={clsx('text-xs', 'leading-relaxed', 'text-white/60')}>{term.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Framework Blocks */}
        <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-8')}>
          {blocks.map((block) => (
            <div key={block.title}>
              <h3 className={clsx('text-sm', 'font-bold', 'tracking-[0.15em]', 'uppercase', 'text-white/50', 'mb-4')}>
                {block.title}
              </h3>
              <ul className="space-y-2">
                {block.items.map((item, idx) => (
                  <li key={idx} className={clsx('flex', 'items-start', 'gap-2.5')}>
                    <span className={clsx('shrink-0', 'mt-1.5', 'w-1.5', 'h-1.5', 'rounded-full', 'bg-white/30')} />
                    <span className={clsx('text-sm', 'leading-relaxed', 'text-white/70')}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
