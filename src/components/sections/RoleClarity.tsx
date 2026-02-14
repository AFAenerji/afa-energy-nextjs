import { Locale } from '@/lib/i18n';

interface RoleClarityProps {
  locale: Locale;
}

export default function RoleClarity({ locale }: RoleClarityProps) {
  const content = {
    en: {
      title: "Role Clarity",
      does: {
        title: "AFA Does",
        items: [
          "Provides technical risk assessment",
          "Offers investment readiness analysis", 
          "Coordinates pre-TDD process",
          "Delivers bankability framework"
        ]
      },
      doesnt: {
        title: "AFA Doesn't",
        items: [
          "Does not develop projects",
          "Does not provide financing",
          "Is not an official approval authority",
          "Does not provide investment guarantee"
        ]
      },
      conclusion: "These boundaries protect AFA's independence. As an investor-side advisor, there are no conflicts of interest."
    },
    tr: {
      title: "Rol Netliği",
      does: {
        title: "AFA YAPAR",
        items: [
          "Teknik risk değerlendirmesi yapar",
          "Yatırıma hazırlık analizi sunar",
          "Pre-TDD koordinasyonu sağlar",
          "Banka finansmanına uygunluk çerçevesi sunar"
        ]
      },
      doesnt: {
        title: "AFA YAPMAZ",
        items: [
          "Proje geliştirme yapmaz",
          "Finansman sağlamaz",
          "Resmi onay makamı değildir",
          "Yatırım garantisi vermez"
        ]
      },
      conclusion: "Bu sınırlar AFA'nın bağımsızlığını korur. Yatırımcı tarafında konumlanan bir danışman olarak, çıkar çatışması olmaz."
    },
    ro: {
      title: "Claritate Roluri",
      does: {
        title: "AFA FACE",
        items: [
          "Furnizează evaluare risc tehnic",
          "Oferă analiză pregătire investiție",
          "Coordonează procesul pre-TDD",
          "Furnizează cadru finanțabilitate"
        ]
      },
      doesnt: {
        title: "AFA NU FACE",
        items: [
          "Nu dezvoltă proiecte",
          "Nu furnizează finanțare",
          "Nu este o autoritate oficială de aprobare",
          "Nu furnizează garanție investiție"
        ]
      },
      conclusion: "Aceste limite protejează independența AFA. Ca consultant pe partea investitorului, nu există conflicte de interese."
    }
  };

  const currentContent = content[locale];

  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-dark font-heading">
          {currentContent.title}
        </h2>

        {/* Two-Column Matrix */}
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 mb-12">
          {/* AFA Does Column */}
          <div className="bg-[#E8F5F5] border-l-4 border-l-primary rounded-[12px] p-6">
            <h3 className="text-xl font-bold mb-6 text-dark font-heading">
              {currentContent.does.title}
            </h3>
            <ul className="space-y-3">
              {currentContent.does.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFA Doesn't Column */}
          <div className="bg-[#FFF5E8] border-l-4 border-l-[#F25F5C] rounded-[12px] p-6">
            <h3 className="text-xl font-bold mb-6 text-dark font-heading">
              {currentContent.doesnt.title}
            </h3>
            <ul className="space-y-3">
              {currentContent.doesnt.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-600 font-bold text-lg">✗</span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-muted border-l-4 border-l-accent p-5 max-w-[800px] mx-auto">
          <p className="text-gray-700 italic leading-relaxed">
            {currentContent.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}
