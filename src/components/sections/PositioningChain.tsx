import { Locale } from '@/lib/i18n';
import fs from 'fs';
import path from 'path';

interface PositioningChainProps {
  locale: Locale;
}

export default function PositioningChain({ locale }: PositioningChainProps) {
  // Load content from JSON structure
  const contentPath = path.join(process.cwd(), 'src', 'content', locale, 'homepage.json');
  const currentContent = JSON.parse(fs.readFileSync(contentPath, 'utf-8')).investmentChain;

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
