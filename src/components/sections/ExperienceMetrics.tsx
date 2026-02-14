import { Locale } from '@/lib/i18n';

interface ExperienceMetricsProps {
  locale: Locale;
}

export default function ExperienceMetrics({ locale }: ExperienceMetricsProps) {
  const content = {
    en: {
      title: "Data-Backed Experience",
      metrics: [
        {
          number: "500+",
          label: "ATR Assessments",
          detail: "Grid feasibility analysis and network capacity testing across 41 Romanian counties."
        },
        {
          number: "850+",
          label: "MW Technical Advisory",
          detail: "Grid integration and risk modeling across solar, wind, BESS, and hybrid technologies."
        },
        {
          number: "10+",
          label: "Years Cross-Border Operations",
          detail: "Turkey origins, Romania focus — regulatory adaptation and ANRE compliance."
        }
      ],
      insight: "These numbers don't claim 'mastery'—they demonstrate experience quality. Every ATR is part of a grid risk test."
    },
    tr: {
      title: "Veriye Dayalı Deneyim",
      metrics: [
        {
          number: "500+",
          label: "ATR Değerlendirmesi",
          detail: "Romanya'nın 41 ilçesinde grid fizibilite analizi ve şebeke kapasite testi."
        },
        {
          number: "850+",
          label: "MW Teknik Danışmanlık",
          detail: "Solar, wind, BESS, hybrid teknolojilerinde şebeke entegrasyonu ve risk modellemesi."
        },
        {
          number: "10+",
          label: "Yıl Sınır Ötesi Operasyon",
          detail: "Türkiye başlangıç, Romanya fokus — regülasyon adaptasyonu ve ANRE uyumu."
        }
      ],
      insight: "Bu rakamlar 'ustalık' iddiası değildir. Deneyim kalitesini gösterir. Her ATR, grid risk testinin bir parçasıdır."
    },
    ro: {
      title: "Experiență Bazată pe Date",
      metrics: [
        {
          number: "500+",
          label: "Evaluări ATR",
          detail: "Analiza viabilitate rețea și testare capacitate rețea în 41 județe române."
        },
        {
          number: "850+",
          label: "MW Consultanță Tehnică",
          detail: "Integrare rețea și modelare risc în tehnologii solare, eoliene, BESS și hibride."
        },
        {
          number: "10+",
          label: "Ani Operațiuni Transfrontaliere",
          detail: "Origini Turcia, fokus România — adaptare regulatoare și conformitate ANRE."
        }
      ],
      insight: "Aceste numere nu pretind 'măiestrie'—demonstrează calitatea experienței. Fiecare ATR este parte a unui test de risc rețea."
    }
  };

  const currentContent = content[locale];

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
