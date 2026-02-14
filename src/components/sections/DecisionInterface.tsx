import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import fs from 'fs';
import path from 'path';

interface DecisionInterfaceProps {
  locale: Locale;
}

export default function DecisionInterface({ locale }: DecisionInterfaceProps) {
  // Load content from JSON structure
  const contentPath = path.join(process.cwd(), 'src', 'content', locale, 'homepage.json');
  const currentContent = JSON.parse(fs.readFileSync(contentPath, 'utf-8')).decisionCards;

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8">
          {/* Investor Card */}
          <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
            <div className="border-t-4 border-t-primary p-6">
              <h3 className="text-xl font-bold mb-4 text-dark font-heading">
                {currentContent.investor.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {currentContent.investor.description}
              </p>
              
              {/* Offer Box */}
              <div className="bg-[#E8F5F5] p-4 rounded-[4px] mb-6">
                <div className="text-gray-700 font-medium">
                  ✓ Teknik doğrulanmış projeler
                </div>
              </div>

              {/* Primary Button */}
              <Link
                href={`/${locale}/investor`}
                className="block w-full bg-primary text-accent px-6 py-3 rounded-[4px] font-bold hover:opacity-90 text-center transition-none"
              >
                {currentContent.investor.cta}
              </Link>
            </div>
          </div>

          {/* Developer Card */}
          <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
            <div className="border-t-4 border-t-secondary p-6">
              <h3 className="text-xl font-bold mb-4 text-dark font-heading">
                {currentContent.developer.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {currentContent.developer.description}
              </p>
              
              {/* Offer Box */}
              <div className="bg-[#E8F8FA] p-4 rounded-[4px] mb-6">
                <div className="text-gray-700 font-medium">
                  ✓ Bağımsız teknik analiz
                </div>
              </div>

              {/* Secondary Button */}
              <Link
                href={`/${locale}/developer`}
                className="block w-full bg-transparent text-secondary border border-secondary px-6 py-3 rounded-[4px] font-bold hover:bg-secondary hover:text-white text-center transition-none"
              >
                {currentContent.developer.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
