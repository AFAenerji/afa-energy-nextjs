import { Locale } from '@/lib/i18n';
import fs from 'fs';
import path from 'path';

interface ExperienceMetricsProps {
  locale: Locale;
}

export default function ExperienceMetrics({ locale }: ExperienceMetricsProps) {
  // Load content from JSON structure
  const contentPath = path.join(process.cwd(), 'src', 'content', locale, 'homepage.json');
  const metricsData = JSON.parse(fs.readFileSync(contentPath, 'utf-8')).metrics;

  // Flatten metrics from groups for current component structure
  const currentContent = {
    title: metricsData.title,
    metrics: metricsData.groups.flatMap((group: any) => group.metrics),
    insight: "Bu rakamlar 'ustalık' iddiası değildir. Deneyim kalitesini gösterir. Her ATR, grid risk testinin bir parçasıdır."
  };

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-dark font-heading">
          {currentContent.title}
        </h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8 mb-12">
          {currentContent.metrics.map((metric, index) => (
            <div key={index} className="text-center">
              {/* Large Number */}
              <div className="text-5xl font-bold text-primary mb-2 font-heading">
                {metric.number}
              </div>
              
              {/* Label */}
              <div className="text-lg font-bold mb-4 text-dark font-heading">
                {metric.label}
              </div>
              
              {/* Detail */}
              <div className="text-sm text-gray-600 leading-relaxed max-w-[280px] mx-auto">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Key Insight Box */}
        <div className="bg-white border-l-4 border-l-accent p-5 max-w-[800px] mx-auto">
          <p className="text-gray-700 italic leading-relaxed">
            {currentContent.insight}
          </p>
        </div>
      </div>
    </section>
  );
}
