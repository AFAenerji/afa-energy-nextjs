import { Locale } from '@/lib/i18n';

interface IntroductoryStatementProps {
  locale: Locale;
}

export default function IntroductoryStatement({ locale }: IntroductoryStatementProps) {

  // Content will be added to i18n.ts
  const content = {
    en: "AFA is an independent technical advisor supporting investor decision processes. Our assessments provide analytical frameworks; they are neither official approval nor guarantee. Every project must undergo independent technical and legal verification before investment.",
    tr: "AFA, yatırımcının karar sürecini destekleyen bağımsız bir teknik danışmanıdır. Sunduğumuz değerlendirmeler, profesyonel analiz çerçevesidir; resmi onay veya garanti değildir. Her proje yatırımdan önce bağımsız teknik ve hukuki doğrulamadan geçmelidir.",
    ro: "AFA este un consultant tehnic independent care sprijină procesele de decizie ale investitorului. Evaluările noastre furnizează cadre analitice; nu sunt nici o aprobare oficială nici o garanție. Fiecare proiect trebuie să treacă printr-o verificare tehnică și juridică independentă înainte de investiție."
  };

  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-muted border-l-3 border-border max-w-[600px] mx-auto">
          <div className="p-4">
            <p className="text-[15px] font-normal leading-[1.7] text-gray-600">
              {content[locale]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
