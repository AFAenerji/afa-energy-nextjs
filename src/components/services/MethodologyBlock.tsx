type Pillar = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  title: string;
  description: string;
  pillars: readonly Pillar[];
};

export default function MethodologyBlock({ title, description, pillars }: Props) {
  return (
    <section className="w-full bg-white py-20 lg:py-24" aria-label="Methodology">
      <div className="afa-container">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 afa-eyebrow">
          METODOLOJİ
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-base leading-relaxed max-w-3xl mb-12 afa-text-body-muted">
          {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="afa-card p-6 flex flex-col"
            >
              <span className="text-xs font-bold tracking-[0.15em] uppercase afa-eyebrow mb-3">
                {pillar.id}
              </span>
              <h3 className="text-base font-bold mb-2 afa-methodology-title">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed afa-text-body-muted">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
