// Services Page v15.4 — Structured data
// Stage content, WhyAFA cards, Positioning, Photo Breaks

import type { Locale } from "@/lib/i18n";
import type {
  TimelineStageData,
  WhyAfaCard,
  PositioningData,
  PhotoBreakData,
} from "./types";

/* ── Timeline Stages ── */
export const timelineStages: Record<Locale, TimelineStageData[]> = {
  tr: [
    {
      number: "01",
      title: "Teknik \u00D6n De\u011Ferlendirme",
      badge: "Ba\u015Flang\u0131\u00E7: 3 i\u015F g\u00FCn\u00FC",
      lead: "Bir projeyi detayl\u0131 incelemeden \u00F6nce, yat\u0131r\u0131m s\u00FCrecine al\u0131p almayaca\u011F\u0131n\u0131za h\u0131zla karar vermeniz gerekir.",
      body: "Teknik \u00D6n De\u011Ferlendirme \u00E7al\u0131\u015Fmas\u0131; projenin \u015Febeke ba\u011Flant\u0131 ko\u015Fullar\u0131n\u0131, temel izin durumunu ve ilk finansal varsay\u0131mlar\u0131 k\u0131sa s\u00FCrede tarayarak karar vericinize net bir ba\u015Flang\u0131\u00E7 noktas\u0131 sunar.",
      foot: "Bu a\u015Fama, erken de\u011Ferlendirme yapacak yat\u0131r\u0131mc\u0131lar ve proje portf\u00F6y\u00FCn\u00FC h\u0131zla filtrelemek isteyen fonlar i\u00E7in tasarlanm\u0131\u015Ft\u0131r.",
      result: "ilerlenebilir, ko\u015Fullu ilerlenebilir veya ek do\u011Frulama gerekli",
      cta: { text: "\u00D6n TDD Ba\u015Fvurusu Yap", href: "/tr/teknik-on-degerlendirme" },
      image: { src: "", alt: "Teknik \u00F6n de\u011Ferlendirme s\u00FCreci g\u00F6rseli" },
    },
    {
      number: "02",
      title: "Detayl\u0131 Teknik \u0130nceleme",
      body: "Detayl\u0131 Teknik \u0130nceleme (Technical Due Diligence), yat\u0131r\u0131m karar\u0131n\u0131n teknik temelini olu\u015Fturan kapsaml\u0131 analiz s\u00FCrecidir. \u015Eebeke ba\u011Flant\u0131s\u0131, enerji \u00FCretim projeksiyonlar\u0131, ekipman de\u011Ferlendirmesi, izin ve uyum kontrol\u00FC bu a\u015Famada derinlemesine incelenir.",
      extraBody: "\u0130nceleme kapsam\u0131; projenin b\u00FCy\u00FCkl\u00FC\u011F\u00FCne, belge yo\u011Funlu\u011Funa ve teknik karma\u015F\u0131kl\u0131\u011F\u0131na g\u00F6re belirlenir.",
      foot: "Bu a\u015Famada \u00FCretilen raporlar, yat\u0131r\u0131m komitesi (IC) standartlar\u0131nda haz\u0131rlan\u0131r ve karar s\u00FCrecine do\u011Frudan girdi sa\u011Flar.",
      image: { src: "", alt: "Detayl\u0131 teknik inceleme analiz g\u00F6rseli" },
    },
    {
      number: "03",
      title: "Sat\u0131n Alma S\u00FCreci \u2014 Teknik Uyumla\u015Ft\u0131rma",
      body: "Sat\u0131n alma s\u00FCrecinde teknik bulgular\u0131n ticari m\u00FCzakereye entegrasyonunu sa\u011Flar\u0131z. Tespit edilen risklerin SPA\u2019ya yans\u0131t\u0131lmas\u0131, garanti mekanizmalar\u0131n\u0131n yap\u0131land\u0131r\u0131lmas\u0131 ve teknik ko\u015Fullar\u0131n m\u00FCzakere pozisyonuna d\u00F6n\u00FC\u015Ft\u00FCr\u00FClmesinde dan\u0131\u015Fmanl\u0131k veririz.",
      foot: "Bu a\u015Fama, teknik bulgular\u0131n sat\u0131n alma belgelerine do\u011Fru ve eksiksiz yans\u0131mas\u0131n\u0131 garanti eder.",
      image: { src: "", alt: "Sat\u0131n alma s\u00FCreci teknik uyum g\u00F6rseli" },
    },
    {
      number: "04",
      title: "EPC A\u015Famas\u0131 \u2014 \u0130\u015Fveren M\u00FChendisli\u011Fi",
      body: "\u0130n\u015Faat a\u015Famas\u0131nda EPC y\u00FCklenicisinin teknik performans\u0131n\u0131 ba\u011F\u0131ms\u0131z olarak izleriz. Tasar\u0131m uygunlu\u011Fu, malzeme kalitesi, montaj standartlar\u0131 ve devreye alma s\u00FCre\u00E7lerinin s\u00F6zle\u015Fme \u015Fartlar\u0131na uyumunu denetleriz.",
      foot: "Yat\u0131r\u0131mc\u0131n\u0131n sahada g\u00F6z\u00FC ve kula\u011F\u0131 olarak, in\u015Faat risklerini minimize ederiz.",
      warning: {
        title: "\u00D6NEML\u0130",
        body: "AFA, EPC (M\u00FChendislik, Tedarik, \u0130n\u015Faat) y\u00FCklenicisi de\u011Fildir. Yat\u0131r\u0131mc\u0131 ad\u0131na ba\u011F\u0131ms\u0131z teknik g\u00F6zetim sa\u011Flar.",
        variant: "important",
      },
      image: { src: "", alt: "EPC a\u015Famas\u0131 saha g\u00F6zetim g\u00F6rseli" },
    },
    {
      number: "05",
      title: "\u0130\u015Fletme D\u00F6nemi \u2014 Varl\u0131k Y\u00F6netimi",
      body: "\u0130\u015Fletme d\u00F6neminde santralin teknik performans\u0131n\u0131 izler, bak\u0131m stratejisini de\u011Ferlendirir ve performans sapmalar\u0131n\u0131 analiz ederiz. Uzun vadeli de\u011Fer korumas\u0131 i\u00E7in teknik \u00F6neri ve raporlama sa\u011Flar\u0131z.",
      foot: "Varl\u0131k y\u00F6netimi teknik dan\u0131\u015Fmanl\u0131\u011F\u0131, yat\u0131r\u0131m\u0131n uzun vadeli getiri performans\u0131n\u0131 koruma alt\u0131na al\u0131r.",
      image: { src: "", alt: "\u0130\u015Fletme d\u00F6nemi performans izleme g\u00F6rseli" },
    },
    {
      number: "06",
      title: "Santral Sat\u0131\u015F\u0131 / Refinansman",
      body: "\u00C7\u0131k\u0131\u015F a\u015Famas\u0131nda veya refinansman s\u00FCrecinde, varl\u0131\u011F\u0131n g\u00FCncel teknik durumunu ba\u011F\u0131ms\u0131z olarak de\u011Ferlendiririz. Vendor Due Diligence (VDD) raporlar\u0131 haz\u0131rlar, teknik riskleri ve kalan \u00F6m\u00FCr projeksiyonlar\u0131n\u0131 potansiyel al\u0131c\u0131lara veya bor\u00E7 verenlere sunar\u0131z.",
      foot: "Bu a\u015Fama, \u00E7\u0131k\u0131\u015F de\u011Ferini maksimize etmek ve al\u0131c\u0131 taraf\u0131n g\u00FCvenini sa\u011Flamak i\u00E7in kritiktir.",
      image: { src: "", alt: "Santral sat\u0131\u015F ve refinansman s\u00FCreci g\u00F6rseli" },
    },
  ],
  en: [
    {
      number: "01",
      title: "Technical Pre-Assessment",
      badge: "Start: 3 business days",
      lead: "Before conducting a detailed review, you need to quickly decide whether to include this project in the investment process.",
      body: "The Technical Pre-Assessment scans the project\u2019s grid connection conditions, basic permit status, and initial financial assumptions in a short time, providing your decision-maker with a clear starting point.",
      foot: "This stage is designed for investors seeking early assessment and funds looking to quickly filter their project portfolio.",
      result: "proceed, conditional proceed, or additional validation required",
      cta: { text: "Submit Pre-TDD Application", href: "/en/technical-assessment" },
      image: { src: "", alt: "Technical pre-assessment process visual" },
    },
    {
      number: "02",
      title: "Detailed Technical Review",
      body: "Detailed Technical Review (Technical Due Diligence) is a comprehensive analysis process forming the technical foundation of the investment decision. Grid connection, energy production projections, equipment assessment, permit and compliance review are examined in depth at this stage.",
      extraBody: "The scope of review is determined by the project\u2019s size, document density, and technical complexity.",
      foot: "Reports produced at this stage are prepared to investment committee (IC) standards and provide direct input to the decision process.",
      image: { src: "", alt: "Detailed technical review analysis visual" },
    },
    {
      number: "03",
      title: "Acquisition Process \u2014 Technical Harmonization",
      body: "We ensure the integration of technical findings into commercial negotiations during the acquisition process. We provide advisory on reflecting identified risks in the SPA, structuring guarantee mechanisms, and converting technical conditions into negotiation positions.",
      foot: "This stage guarantees the accurate and complete reflection of technical findings in acquisition documents.",
      image: { src: "", alt: "Acquisition process technical alignment visual" },
    },
    {
      number: "04",
      title: "EPC Phase \u2014 Owner\u2019s Engineering",
      body: "During the construction phase, we independently monitor the EPC contractor\u2019s technical performance. We oversee design compliance, material quality, installation standards, and commissioning processes for contract compliance.",
      foot: "As the investor\u2019s eyes and ears on site, we minimize construction risks.",
      warning: {
        title: "IMPORTANT",
        body: "AFA is not an EPC (Engineering, Procurement, Construction) contractor. It provides independent technical oversight on behalf of the investor.",
        variant: "important",
      },
      image: { src: "", alt: "EPC phase site oversight visual" },
    },
    {
      number: "05",
      title: "Operational Period \u2014 Asset Management",
      body: "During the operational period, we monitor the plant\u2019s technical performance, evaluate maintenance strategy, and analyze performance deviations. We provide technical recommendations and reporting for long-term value protection.",
      foot: "Asset management technical advisory safeguards the investment\u2019s long-term return performance.",
      image: { src: "", alt: "Operational period performance monitoring visual" },
    },
    {
      number: "06",
      title: "Plant Sale / Refinancing",
      body: "During the exit phase or refinancing process, we independently assess the asset\u2019s current technical condition. We prepare Vendor Due Diligence (VDD) reports, presenting technical risks and remaining life projections to potential buyers or lenders.",
      foot: "This stage is critical for maximizing exit value and ensuring buyer confidence.",
      image: { src: "", alt: "Plant sale and refinancing process visual" },
    },
  ],
  ro: [
    {
      number: "01",
      title: "Evaluare Tehnic\u0103 Preliminar\u0103",
      badge: "\u00CEnceput: 3 zile lucr\u0103toare",
      lead: "\u00CEnainte de a examina un proiect \u00EEn detaliu, trebuie s\u0103 decide\u021Bi rapid dac\u0103 s\u0103-l include\u021Bi \u00EEn procesul de investi\u021Bie.",
      body: "Evaluarea Tehnic\u0103 Preliminar\u0103 scaneaz\u0103 condi\u021Biile de conectare la re\u021Bea ale proiectului, starea de baz\u0103 a autoriza\u021Biilor \u0219i ipotezele financiare ini\u021Biale \u00EEntr-un timp scurt, oferind factorului de decizie un punct de plecare clar.",
      foot: "Aceast\u0103 etap\u0103 este conceput\u0103 pentru investitorii care doresc evaluare timpurie \u0219i fondurile care doresc filtrarea rapid\u0103 a portofoliului de proiecte.",
      result: "se poate proceda, procedare condi\u021Bionat\u0103 sau validare suplimentar\u0103 necesar\u0103",
      cta: { text: "Depune Cerere Pre-TDD", href: "/ro/evaluare-tehnica" },
      image: { src: "", alt: "Vizual proces evaluare tehnic\u0103 preliminar\u0103" },
    },
    {
      number: "02",
      title: "Analiz\u0103 Tehnic\u0103 Detaliat\u0103",
      body: "Analiza Tehnic\u0103 Detaliat\u0103 (Technical Due Diligence) este un proces de analiz\u0103 cuprinz\u0103tor care formeaz\u0103 baza tehnic\u0103 a deciziei de investi\u021Bie. Conectarea la re\u021Bea, proiec\u021Biile de produc\u021Bie de energie, evaluarea echipamentelor, controlul autoriza\u021Biilor \u0219i conformit\u0103\u021Bii sunt examinate \u00EEn profunzime.",
      extraBody: "Domeniul de analiz\u0103 este determinat de dimensiunea proiectului, densitatea documentelor \u0219i complexitatea tehnic\u0103.",
      foot: "Rapoartele produse \u00EEn aceast\u0103 etap\u0103 sunt preg\u0103tite la standarde de comitet de investi\u021Bii (IC) \u0219i furnizeaz\u0103 input direct procesului decizional.",
      image: { src: "", alt: "Vizual analiz\u0103 tehnic\u0103 detaliat\u0103" },
    },
    {
      number: "03",
      title: "Procesul de Achizi\u021Bie \u2014 Armonizare Tehnic\u0103",
      body: "Asigur\u0103m integrarea constat\u0103rilor tehnice \u00EEn negocierile comerciale \u00EEn timpul procesului de achizi\u021Bie. Oferim consultan\u021B\u0103 privind reflectarea riscurilor identificate \u00EEn SPA, structurarea mecanismelor de garan\u021Bie \u0219i conversia condi\u021Biilor tehnice \u00EEn pozi\u021Bii de negociere.",
      foot: "Aceast\u0103 etap\u0103 garanteaz\u0103 reflectarea corect\u0103 \u0219i complet\u0103 a constat\u0103rilor tehnice \u00EEn documentele de achizi\u021Bie.",
      image: { src: "", alt: "Vizual aliniere tehnic\u0103 proces achizi\u021Bie" },
    },
    {
      number: "04",
      title: "Faza EPC \u2014 Ingineria Beneficiarului",
      body: "\u00CEn faza de construc\u021Bie, monitoriz\u0103m independent performan\u021Ba tehnic\u0103 a contractorului EPC. Supraveghem conformitatea proiect\u0103rii, calitatea materialelor, standardele de instalare \u0219i procesele de punere \u00EEn func\u021Biune pentru conformitatea contractual\u0103.",
      foot: "Ca ochii \u0219i urechile investitorului pe \u0219antier, minimiz\u0103m riscurile de construc\u021Bie.",
      warning: {
        title: "IMPORTANT",
        body: "AFA nu este contractor EPC (Inginerie, Aprovizionare, Construc\u021Bie). Ofer\u0103 supraveghere tehnic\u0103 independent\u0103 \u00EEn numele investitorului.",
        variant: "important",
      },
      image: { src: "", alt: "Vizual supraveghere \u0219antier faz\u0103 EPC" },
    },
    {
      number: "05",
      title: "Perioada Opera\u021Bional\u0103 \u2014 Management de Active",
      body: "\u00CEn perioada opera\u021Bional\u0103, monitoriz\u0103m performan\u021Ba tehnic\u0103 a centralei, evalu\u0103m strategia de \u00EEntre\u021Binere \u0219i analiz\u0103m abaterile de performan\u021B\u0103. Furniz\u0103m recomand\u0103ri tehnice \u0219i raportare pentru protec\u021Bia valorii pe termen lung.",
      foot: "Consultan\u021Ba tehnic\u0103 de management al activelor protejeaz\u0103 performan\u021Ba randamentului pe termen lung al investi\u021Biei.",
      image: { src: "", alt: "Vizual monitorizare performan\u021B\u0103 perioad\u0103 opera\u021Bional\u0103" },
    },
    {
      number: "06",
      title: "V\u00E2nzare Central\u0103 / Refinan\u021Bare",
      body: "\u00CEn faza de ie\u0219ire sau procesul de refinan\u021Bare, evalu\u0103m independent starea tehnic\u0103 actual\u0103 a activului. Preg\u0103tim rapoarte Vendor Due Diligence (VDD), prezent\u00E2nd riscurile tehnice \u0219i proiec\u021Biile de via\u021B\u0103 r\u0103mas\u0103 poten\u021Bialilor cump\u0103r\u0103tori sau creditorilor.",
      foot: "Aceast\u0103 etap\u0103 este critic\u0103 pentru maximizarea valorii de ie\u0219ire \u0219i asigurarea \u00EEncrederii cump\u0103r\u0103torului.",
      image: { src: "", alt: "Vizual proces v\u00E2nzare \u0219i refinan\u021Bare central\u0103" },
    },
  ],
};

/* ── WhyAFA Cards ── */
export const whyAfaCards: Record<Locale, WhyAfaCard[]> = {
  tr: [
    {
      icon: "Shield",
      title: "Ba\u011F\u0131ms\u0131zl\u0131k",
      body: "Proje geli\u015Ftirmiyoruz, EPC yapm\u0131yoruz, ekipman satm\u0131yoruz. Yaln\u0131zca yat\u0131r\u0131mc\u0131 ve bor\u00E7 veren taraf\u0131nda konumlanarak \u00E7\u0131kar \u00E7at\u0131\u015Fmas\u0131n\u0131 ortadan kald\u0131r\u0131yoruz.",
    },
    {
      icon: "Zap",
      title: "\u015Eebeke Ger\u00E7ekli\u011Fi",
      body: "Ba\u011Flant\u0131 karar\u0131n\u0131 belgeye de\u011Fil, \u015Febekenin fiziksel kapasitesine dayand\u0131r\u0131yoruz. ATR Matrix\u2122 metodolojimiz, ba\u011Flant\u0131 riskini projenin en erken a\u015Famas\u0131nda \u00F6l\u00E7er.",
    },
    {
      icon: "ClipboardCheck",
      title: "Karar Disiplini",
      body: "Teknik bulgular\u0131 yat\u0131r\u0131m komitesine sunulabilir formatta haz\u0131rl\u0131yoruz. Belirsizlikleri tan\u0131ml\u0131 senaryolara, riskleri \u00F6l\u00E7\u00FClebilir parametrelere d\u00F6n\u00FC\u015Ft\u00FCr\u00FCyoruz.",
    },
    {
      icon: "GitMerge",
      title: "Do\u011Fru E\u015Fle\u015Ftirme",
      body: "Projenin a\u015Famas\u0131n\u0131 ve risk profilini yat\u0131r\u0131mc\u0131n\u0131n risk tolerans seviyesiyle e\u015Fle\u015Ftiririz. Bu teknik e\u015Fle\u015Ftirme, her iki taraf i\u00E7in de s\u00FCrecin verimlili\u011Fini art\u0131r\u0131r.",
    },
  ],
  en: [
    {
      icon: "Shield",
      title: "Independence",
      body: "We don\u2019t develop projects, do EPC, or sell equipment. We eliminate conflicts of interest by positioning solely on the investor and lender side.",
    },
    {
      icon: "Zap",
      title: "Grid Reality",
      body: "We base connection decisions on the grid\u2019s physical capacity, not documentation. Our ATR Matrix\u2122 methodology measures connection risk at the earliest stage of the project.",
    },
    {
      icon: "ClipboardCheck",
      title: "Decision Discipline",
      body: "We prepare technical findings in investment committee-ready format. We convert uncertainties into defined scenarios and risks into measurable parameters.",
    },
    {
      icon: "GitMerge",
      title: "Right Match",
      body: "We match the project\u2019s stage and risk profile with the investor\u2019s risk tolerance level. This technical matching increases process efficiency for both parties.",
    },
  ],
  ro: [
    {
      icon: "Shield",
      title: "Independen\u021B\u0103",
      body: "Nu dezvolt\u0103m proiecte, nu facem EPC, nu vindem echipamente. Elimin\u0103m conflictele de interese pozi\u021Bion\u00E2ndu-ne exclusiv de partea investitorului \u0219i creditorului.",
    },
    {
      icon: "Zap",
      title: "Realitatea Re\u021Belei",
      body: "Baz\u0103m deciziile de conectare pe capacitatea fizic\u0103 a re\u021Belei, nu pe documenta\u021Bie. Metodologia noastr\u0103 ATR Matrix\u2122 m\u0103soar\u0103 riscul de conectare \u00EEn cea mai timpurie etap\u0103 a proiectului.",
    },
    {
      icon: "ClipboardCheck",
      title: "Disciplina Deciziei",
      body: "Preg\u0103tim constat\u0103rile tehnice \u00EEn format gata pentru comitetul de investi\u021Bii. Convertim incertitudinile \u00EEn scenarii definite \u0219i riscurile \u00EEn parametri m\u0103surabili.",
    },
    {
      icon: "GitMerge",
      title: "Potrivire Corect\u0103",
      body: "Potrivim etapa proiectului \u0219i profilul de risc cu nivelul de toleran\u021B\u0103 la risc al investitorului. Aceast\u0103 potrivire tehnic\u0103 cre\u0219te eficien\u021Ba procesului pentru ambele p\u0103r\u021Bi.",
    },
  ],
};

/* ── Positioning (v15.4 Q1/Q2 format) ── */
export const positioningData: Record<Locale, PositioningData> = {
  tr: {
    question1: "Projeniz do\u011Fru yat\u0131r\u0131mc\u0131ya ula\u015Fab\u0131l\u0131yor mu?",
    question2: "Yat\u0131r\u0131m\u0131n\u0131z i\u00E7in do\u011Fru proje masan\u0131za geliyor mu?",
    paragraphs: [
      "Yenilenebilir enerji yat\u0131r\u0131mc\u0131s\u0131 santral sat\u0131n almaz; projenin gelecekte \u00FCretece\u011Fi nakit ak\u0131\u015Flar\u0131n\u0131, teknik dayan\u0131kl\u0131l\u0131\u011F\u0131n\u0131 ve reg\u00FClatif uyumlulu\u011Funu sat\u0131n al\u0131r. Yat\u0131r\u0131m karar\u0131, projenin bug\u00FCnk\u00FC g\u00F6r\u00FCnt\u00FCs\u00FCne de\u011Fil, teknik temeline ve \u00F6ng\u00F6r\u00FClebilir performans\u0131na dayanmal\u0131d\u0131r.",
      "Proje geli\u015Ftiricisi ise erken a\u015Famadan itibaren emek, sermaye ve zaman yat\u0131r\u0131m\u0131 yaparak projeyi olgunla\u015Ft\u0131r\u0131r. Ancak bu s\u00FCrecin sonunda projenin ger\u00E7ek teknik de\u011Ferini ba\u011F\u0131ms\u0131z bi\u00E7imde do\u011Frulatmak, do\u011Fru yat\u0131r\u0131mc\u0131yla bulu\u015Fmak ve s\u00FCrecin \u015Feffaf y\u00F6netilmesini sa\u011Flamak geli\u015Ftiricinin en b\u00FCy\u00FCk ihtiyac\u0131d\u0131r.",
      "Ancak bu iki taraf her zaman birbirini bulamaz. Bilgi asimetrisi, eksik teknik dok\u00FCmantasyon ve standart d\u0131\u015F\u0131 de\u011Ferlendirme s\u00FCre\u00E7leri, potansiyel olarak uygun e\u015Fle\u015Fmelerin ger\u00E7ekle\u015Fmesini engeller.",
      "AFA, bu e\u015Fle\u015Fmeyi teknik do\u011Frulama disipliniyle sa\u011Flar. Projenin \u015Febeke ba\u011Flant\u0131 ger\u00E7ekli\u011Finden finansal varsay\u0131mlar\u0131na, izin s\u00FCre\u00E7lerinden yap\u0131m kalitesine kadar her katman\u0131 ba\u011F\u0131ms\u0131z olarak inceleyerek hem yat\u0131r\u0131mc\u0131ya hem geli\u015Ftiriciye g\u00FCvenilir bir zemin olu\u015Fturur.",
    ],
    closing: "Amac\u0131m\u0131z yaln\u0131zca rapor \u00FCretmek de\u011Fil, yat\u0131r\u0131m karar\u0131n\u0131 netle\u015Ftirmektir.",
  },
  en: {
    question1: "Can your project reach the right investor?",
    question2: "Is the right project reaching your table for investment?",
    paragraphs: [
      "A renewable energy investor doesn\u2019t buy a power plant; they buy the project\u2019s future cash flows, technical resilience, and regulatory compliance. The investment decision should be based not on the project\u2019s current appearance, but on its technical foundation and predictable performance.",
      "The project developer matures the project by investing labor, capital, and time from the early stage. However, at the end of this process, independently validating the project\u2019s true technical value, meeting the right investor, and ensuring transparent process management is the developer\u2019s greatest need.",
      "But these two parties don\u2019t always find each other. Information asymmetry, incomplete technical documentation, and non-standard evaluation processes prevent potentially suitable matches from materializing.",
      "AFA ensures this match through technical validation discipline. By independently examining every layer from the project\u2019s grid connection reality to financial assumptions, from permit processes to construction quality, it creates a reliable foundation for both investors and developers.",
    ],
    closing: "Our goal is not just to produce reports, but to bring clarity to the investment decision.",
  },
  ro: {
    question1: "Poate proiectul dumneavoastr\u0103 s\u0103 ajung\u0103 la investitorul potrivit?",
    question2: "Ajunge proiectul potrivit pe masa dumneavoastr\u0103 de investi\u021Bii?",
    paragraphs: [
      "Un investitor \u00EEn energie regenerabil\u0103 nu cump\u0103r\u0103 o central\u0103; cump\u0103r\u0103 fluxurile viitoare de numerar ale proiectului, rezilien\u021Ba tehnic\u0103 \u0219i conformitatea reglementar\u0103. Decizia de investi\u021Bie ar trebui s\u0103 se bazeze nu pe aspectul actual al proiectului, ci pe fundamentul s\u0103u tehnic \u0219i performan\u021Ba previzibil\u0103.",
      "Dezvoltatorul de proiecte matureaz\u0103 proiectul investind munc\u0103, capital \u0219i timp din etapa timpurie. Totu\u0219i, la finalul acestui proces, validarea independent\u0103 a valorii tehnice reale a proiectului, \u00EEnt\u00E2lnirea cu investitorul potrivit \u0219i asigurarea unui management transparent al procesului este cea mai mare nevoie a dezvoltatorului.",
      "Dar aceste dou\u0103 p\u0103r\u021Bi nu se g\u0103sesc \u00EEntotdeauna. Asimetria informa\u021Bional\u0103, documenta\u021Bia tehnic\u0103 incomplet\u0103 \u0219i procesele de evaluare non-standard \u00EEmpiedic\u0103 materializarea potrivirilor poten\u021Bial adecvate.",
      "AFA asigur\u0103 aceast\u0103 potrivire prin disciplina valid\u0103rii tehnice. Examin\u00E2nd independent fiecare strat de la realitatea conex\u0103rii la re\u021Bea a proiectului p\u00E2n\u0103 la ipotezele financiare, de la procesele de autorizare p\u00E2n\u0103 la calitatea construc\u021Biei, creeaz\u0103 o baz\u0103 fiabil\u0103 at\u00E2t pentru investitori c\u00E2t \u0219i pentru dezvoltatori.",
    ],
    closing: "Scopul nostru nu este doar producerea de rapoarte, ci clarificarea deciziei de investi\u021Bie.",
  },
};

/* ── Photo Break Content ── */
export const photoBreaks: Record<Locale, PhotoBreakData[]> = {
  tr: [
    {
      id: "photo-break-transition",
      imageSrc: "/images/services/photo-break-transition.jpg",
      imageAlt: "Romanya\u2019da r\u00FCzgar t\u00FCrbinleri ve g\u00FCne\u015F panelleri saha g\u00F6r\u00FCn\u00FCm\u00FC",
      mainText: "Teknik do\u011Frulama, yat\u0131r\u0131m karar\u0131n\u0131n temelidir.",
      subText: "Her a\u015Famada ba\u011F\u0131ms\u0131z teknik ortakl\u0131k.",
    },
    {
      id: "photo-break-breathe",
      imageSrc: "/images/services/photo-break-breathe.jpg",
      imageAlt: "Yenilenebilir enerji santrali saha inceleme g\u00F6r\u00FCn\u00FCm\u00FC",
      mainText: "Sahada do\u011Frulanan her bulgu, yat\u0131r\u0131m karar\u0131n\u0131 g\u00FC\u00E7lendirir.",
    },
  ],
  en: [
    {
      id: "photo-break-transition",
      imageSrc: "/images/services/photo-break-transition.jpg",
      imageAlt: "Wind turbines and solar panels field view in Romania",
      mainText: "Technical validation is the foundation of the investment decision.",
      subText: "Independent technical partnership at every stage.",
    },
    {
      id: "photo-break-breathe",
      imageSrc: "/images/services/photo-break-breathe.jpg",
      imageAlt: "Renewable energy plant site inspection view",
      mainText: "Every finding validated on site strengthens the investment decision.",
    },
  ],
  ro: [
    {
      id: "photo-break-transition",
      imageSrc: "/images/services/photo-break-transition.jpg",
      imageAlt: "Turbine eoliene \u0219i panouri solare vedere de teren \u00EEn Rom\u00E2nia",
      mainText: "Validarea tehnic\u0103 este fundamentul deciziei de investi\u021Bie.",
      subText: "Parteneriat tehnic independent la fiecare etap\u0103.",
    },
    {
      id: "photo-break-breathe",
      imageSrc: "/images/services/photo-break-breathe.jpg",
      imageAlt: "Vedere inspec\u021Bie teren central\u0103 energie regenerabil\u0103",
      mainText: "Fiecare constatare validat\u0103 pe teren consolideaz\u0103 decizia de investi\u021Bie.",
    },
  ],
};
