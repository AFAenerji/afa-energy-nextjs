import { Locale } from '@/lib/i18n';

interface PositioningChainProps {
  locale: Locale;
}

export default function PositioningChain({ locale }: PositioningChainProps) {
  const content = {
    en: {
      title: "Investment Readiness Chain",
      stages: [
        {
          title: "Technical Pre-Assessment",
          description: "Project fundamental eligibility — grid, permits, financing framework.",
          outcome: "Yes/No decision gate"
        },
        {
          title: "Grid & Connection Assessment",
          description: "Connection feasibility and capacity framework.",
          outcome: "Financial model preparation"
        },
        {
          title: "Investment Readiness Analysis",
          description: "Integration of technical findings into financial decision structure.",
          outcome: "Investment committee decision"
        }
      ],
      conclusion: "If any link in this chain is missing or fails, investment stalls. AFA's role is to make every link speak the same language."
    },
    tr: {
      title: "Yatırımın Hazırlık Zinciri",
      stages: [
        {
          title: "Teknik Ön Değerlendirme",
          description: "Projenin temel uygunluk analizi — şebeke, izin, finansman çerçevesi.",
          outcome: "Evet / Hayır karar noktası"
        },
        {
          title: "Şebeke & Bağlantı Değerlendirmesi",
          description: "Bağlantı fizibilitesi ve kapasite çerçevesi.",
          outcome: "Finansal model hazırlığı"
        },
        {
          title: "Yatırıma Hazırlık Analizi",
          description: "Teknik bulguların finansal karar yapısına entegrasyonu.",
          outcome: "Yatırım komitesi kararı"
        }
      ],
      conclusion: "Bu zincirin herhangi bir halkası eksikse veya başarısız olursa, yatırım ilerlemez. AFA'nın rolü, tüm halkaları aynı dilde konuşturmaktır."
    },
    ro: {
      title: "Lanț de Pregătire pentru Investiții",
      stages: [
        {
          title: "Pre-Evaluare Tehnică",
          description: "Eligibilitate fundamentală a proiectului — rețea, autorizații, cadru de finanțare.",
          outcome: "Punct de decizie Da/Nu"
        },
        {
          title: "Evaluare Rețea și Conexiune",
          description: "Viabilitate conexiune și cadru capacitate.",
          outcome: "Pregătire model financiar"
        },
        {
          title: "Analiză Pregătire Investiție",
          description: "Integrarea constatărilor tehnice în structura decizională financiară.",
          outcome: "Decizie comitet de investiții"
        }
      ],
      conclusion: "Dacă orice legătură din acest lanț lipsește sau eșuează, investiția stagnează. Rolul AFA este să facă ca fiecare legătură să vorbească aceeași limbă."
    }
  };

  const currentContent = content[locale];

  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-dark font-heading">
          {currentContent.title}
        </h2>

        {/* Chain Stages */}
        <div className="flex flex-col desktop:flex-row items-center justify-center gap-8 mb-12">
          {currentContent.stages.map((stage, index) => (
            <div key={index} className="flex-1 max-w-[320px]">
              {/* Stage Card */}
              <div className="bg-white border border-border rounded-[12px] p-6 border-l-4 border-l-primary">
                {/* Number Badge */}
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">
                  {index + 1}
                </div>

                {/* Stage Content */}
                <h3 className="text-xl font-bold mb-3 text-dark font-heading">
                  {stage.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {stage.description}
                </p>
                <div className="text-sm font-semibold text-secondary">
                  → Outcome: {stage.outcome}
                </div>
              </div>

              {/* Arrow (except last) */}
              {index < currentContent.stages.length - 1 && (
                <div className="hidden desktop:block absolute text-2xl text-secondary transform translate-x-full ml-8">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Conclusion Box */}
        <div className="bg-muted border-l-4 border-l-accent p-4 max-w-[800px] mx-auto">
          <p className="text-gray-700 italic leading-relaxed">
            {currentContent.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}
