import clsx from 'clsx';

interface SampleLine {
  label: string;
  value: string;
  riskLevel?: 'high' | 'medium' | 'low';
}

interface Sample {
  title: string;
  lines: SampleLine[];
  conclusion?: string;
}

interface SampleOutputsSectionProps {
  kicker: string;
  h2: string;
  samples: Sample[];
  disclaimer: string;
}

export default function SampleOutputsSection({
  kicker,
  h2,
  samples,
  disclaimer,
}: SampleOutputsSectionProps) {
  const getRiskColor = (level?: 'high' | 'medium' | 'low') => {
    if (level === 'high') return '#F25F5C';
    if (level === 'medium') return '#FFCB00';
    if (level === 'low') return '#18625F';
    return '#0F2E2C';
  };

  return (
    <section
      aria-labelledby="y6-5-title"
      className="bg-white"
      style={{ padding: '80px 0' }}
    >
      <div className={clsx('max-w-[1180px]', 'mx-auto', 'px-[52px]')}>
        {/* Header */}
        <div className={clsx('text-center', 'mb-12')}>
          <div
            className={clsx('text-xs', 'font-semibold', 'uppercase', 'tracking-wider', 'mb-3')}
            style={{ color: '#28AFB0', letterSpacing: '0.18em' }}
          >
            {kicker}
          </div>
          <h2
            id="y6-5-title"
            className={clsx('text-3xl', 'font-bold')}
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Grid - 2 samples */}
        <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6', 'mb-6')}>
          {samples.map((sample, sampleIndex) => (
            <div
              key={sampleIndex}
              className={clsx('bg-afa-ice', 'rounded-xl', 'p-6')}
              style={{ border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <h3
                className={clsx('font-bold', 'text-lg', 'mb-4')}
                style={{ color: '#0F2E2C' }}
              >
                {sample.title}
              </h3>

              {/* Lines */}
              <div className="space-y-3">
                {sample.lines.map((line, lineIndex) => (
                  <div
                    key={lineIndex}
                    className={clsx('flex', 'justify-between', 'items-start', 'pb-3')}
                    style={{
                      borderBottom:
                        lineIndex < sample.lines.length - 1
                          ? '1px solid rgba(0,0,0,0.06)'
                          : 'none',
                    }}
                  >
                    <span
                      className="text-sm"
                      style={{ color: '#4A5568' }}
                    >
                      {line.label}
                    </span>
                    <span
                      className={clsx('text-sm', 'font-semibold')}
                      style={{
                        color: getRiskColor(line.riskLevel),
                        fontWeight: 600,
                      }}
                    >
                      {line.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              {sample.conclusion && (
                <div
                  className={clsx('mt-4', 'pt-4', 'text-sm', 'font-bold')}
                  style={{
                    borderTop: '2px solid #18625F',
                    color: '#18625F',
                  }}
                >
                  {sample.conclusion}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className={clsx('text-xs', 'italic', 'text-center')}
          style={{ color: '#718096' }}
        >
          {disclaimer}
        </p>
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
