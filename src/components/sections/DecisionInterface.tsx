'use client';

import { useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n';

interface DecisionInterfaceProps {
  locale: Locale;
}

export default function DecisionInterface({ locale }: DecisionInterfaceProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  const content = {
    en: {
      investor: {
        persona: "Investor",
        description: "I want to evaluate renewable energy projects in Romania.",
        offer: "✓ Independent technical pre-assessment",
        buttonText: "Access Pre-Screened Projects"
      },
      developer: {
        persona: "Developer / Seller",
        description: "I want independent technical validation before presenting to investors.",
        offer: "✓ Independent technical validation report",
        buttonText: "Get Technical Validation Report"
      }
    },
    tr: {
      investor: {
        persona: "Yatırımcı",
        description: "Romanya'da yenilenebilir enerji projelerini değerlendirmek istiyorum.",
        offer: "✓ Bağımsız teknik ön değerlendirme",
        buttonText: "İncelemeye Hazır Projeleri Göster"
      },
      developer: {
        persona: "Geliştirici / Satıcı",
        description: "Projemi yatırımcılara sunmadan önce bağımsız teknik doğrulama istiyorum.",
        offer: "✓ Bağımsız teknik doğrulama raporu",
        buttonText: "Teknik Validasyon Raporu Al"
      }
    },
    ro: {
      investor: {
        persona: "Investitor",
        description: "Vreau să evaluez proiecte de energie regenerabilă în România.",
        offer: "✓ Pre-evaluare tehnică independentă",
        buttonText: "Accesează Proiecte Pre-Evaluate"
      },
      developer: {
        persona: "Dezvoltator / Vânzător",
        description: "Vreau validare tehnică independentă înainte de a prezenta investitorilor.",
        offer: "✓ Raport validare tehnică independentă",
        buttonText: "Obțin Raport de Validare Tehnică"
      }
    }
  };

  const currentContent = content[locale];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8">
          {/* Investor Card */}
          <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
            <div className="border-t-4 border-t-primary p-6">
              <h3 className="text-xl font-bold mb-4 text-dark font-heading">
                {currentContent.investor.persona}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {currentContent.investor.description}
              </p>
              
              {/* Offer Box */}
              <div className="bg-[#E8F5F5] p-4 rounded-[4px] mb-6">
                <div className="text-gray-700 font-medium">
                  {currentContent.investor.offer}
                </div>
              </div>

              {/* Primary Button */}
              <button
                onClick={() => handleNavigation('/investor')}
                className="w-full bg-primary text-accent px-6 py-3 rounded-[4px] font-bold hover:opacity-90 text-center"
              >
                {currentContent.investor.buttonText}
              </button>
            </div>
          </div>

          {/* Developer Card */}
          <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
            <div className="border-t-4 border-t-secondary p-6">
              <h3 className="text-xl font-bold mb-4 text-dark font-heading">
                {currentContent.developer.persona}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {currentContent.developer.description}
              </p>
              
              {/* Offer Box */}
              <div className="bg-[#E8F8FA] p-4 rounded-[4px] mb-6">
                <div className="text-gray-700 font-medium">
                  {currentContent.developer.offer}
                </div>
              </div>

              {/* Secondary Button */}
              <button
                onClick={() => handleNavigation('/developer')}
                className="w-full bg-transparent text-secondary border border-secondary px-6 py-3 rounded-[4px] font-bold hover:bg-secondary hover:text-white text-center"
              >
                {currentContent.developer.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
