type Props = {
  title: string;
  statements: readonly string[];
  closing: string;
};

export default function TrustSection({ title, statements, closing }: Props) {
  return (
    <section className="w-full dark-section py-20 lg:py-24" aria-label="Independence">
      <div className="afa-container">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-10">
          {title}
        </h2>

        <ul className="space-y-4 mb-10">
          {statements.map((s, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full afa-bridge-accent" />
              <p className="text-sm md:text-base leading-relaxed afa-text-primary">
                {s}
              </p>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10 pt-8">
          <p className="text-sm leading-relaxed afa-text-secondary max-w-3xl">
            {closing}
          </p>
        </div>
      </div>
    </section>
  );
}
