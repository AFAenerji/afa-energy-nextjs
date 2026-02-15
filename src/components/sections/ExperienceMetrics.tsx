import type { Locale } from '@/lib/i18n';
import type { MetricsData, MetricGroup, Metric } from '@/types/homepage';

interface ExperienceMetricsProps {
  data: MetricsData;
  locale: Locale;
}

export default function ExperienceMetrics({ data }: ExperienceMetricsProps) {
  // Flatten all metrics across groups for the grid
  const allMetrics = data.groups.flatMap((g: MetricGroup) =>
    g.metrics.map((m: Metric) => ({ ...m, groupTitle: g.title }))
  );

  return (
    <section className="bg-teal-800 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-white font-heading mb-4">
          {data.title}
        </h2>
        <div className="w-12 h-1 bg-amber-400 mx-auto mb-16" />

        {/* 4-Column Grid (2 on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {allMetrics.map((metric, index: number) => (
            <div key={index} className="text-center">
              {/* Large Number */}
              <div className="text-5xl md:text-6xl font-bold text-amber-400 mb-3 font-heading">
                {metric.number}
              </div>

              {/* Label */}
              <div className="text-base font-bold text-white mb-2 font-heading">
                {metric.label}
              </div>

              {/* Detail */}
              <p className="text-white/60 text-sm leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
