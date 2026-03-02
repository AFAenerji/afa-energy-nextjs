// src/content/services.ts
// AFA Energy Romania — Services Page Content
// Phase 1: Turkish (v15.1) | Phase 2: English | Phase 3: Romanian

export interface ServicesContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    cta: string;
    ctaHref: string;
    pillars: Array<{ label: string; desc: string }>;
  };
  positioning: {
    title: string;
    body: string;
    emphasis: string;
  };
  block1: {
    title: string;
    body: string;
    checks: string[];
    purpose: string;
    ctaInvestor: { text: string; href: string; micro: string };
    ctaDeveloper: { text: string; href: string; micro: string };
  };
  bridge: string;
  block2: {
    label: string;
    title: string;
    intro: string;
    stages: Array<{
      num: string;
      title: string;
      badge?: string;
      lead?: string;
      body: string;
      foot: string;
      result?: string;
      cta?: { text: string; href: string };
      image?: string;
    }>;
  };
  whyAfa: {
    title: string;
    items: Array<{ title: string; text: string }>;
    link: { text: string; href: string };
  };
  closing: {
    title: string;
    body: string;
    ctaInvestor: { text: string; href: string; micro: string };
    ctaDeveloper: { text: string; href: string; micro: string };
    ctaTertiary: { text: string; href: string };
  };
  disclaimer: string;
}

export const servicesContent: Record<"tr" | "en" | "ro", ServicesContent> = {
  tr: {
    meta: {
      title: "Hizmetlerimiz | AFA Energy Romania",
      description:
        "AFA, Romanya'da ön teknik durum tespiti yapılmış yenilenebilir enerji projelerini yatırımcılarla buluşturur.",
    },
    hero: {
      badge: "Yatırımdan Önce Netlik.",
      title: "Yatırıma Uygun Projeler ve Teknik Doğrulama.",
      description:
        "AFA, Romanya'da ön teknik durum tespiti yapılmış yenilenebilir enerji projelerini yatırımcılarla buluşturur. Her proje, AFA Matrix™ metodolojisi ile incelenmiş ve banka finansmanına uygunluk standardında doğrulanmıştır.",
      cta: "Yatırıma Uygun Projeleri Keşfet",
      ctaHref: "/tr/investor",
      pillars: [
        {
          label: "Şebeke Entegrasyonu",
          desc: "ATR ve şebeke bağlantısı doğrulama odağı",
        },
        {
          label: "Finansal Dayanıklılık",
          desc: "Üretim ve gelir senaryosu çerçevesi",
        },
        {
          label: "Yasal Uyum",
          desc: "İzin zinciri tutarlılık kontrolü",
        },
      ],
    },
    positioning: {
      title: "Yatırımcı Tarafında Konumlandırma",
      body: "AFA, yatırımcı tarafında konumlanır. Ön teknik durum tespiti yapılmış projeleri yatırımcılarla buluşturur; yatırım sürecinin her aşamasında teknik doğrulama desteği sağlar.",
      emphasis:
        "Amacımız yalnızca rapor üretmek değil, yatırım kararını netleştirmektir.",
    },
    block1: {
      title: "Yatırıma Uygun Proje Bulma",
      body: "AFA, ön teknik durum tespiti yapılmış ve yatırım kriterlerine göre filtrelenmiş projeleri yatırımcılarla eşleştirir. Her proje AFA Matrix™ incelemesinden geçmiş, teknik riskleri tanımlanmış ve finansal varsayımları doğrulanmıştır.",
      checks: [
        "Şebekeye bağlanma gerçekliği ön kontrolü yapılmış",
        "İzin ve prosedür akışı incelenmiş",
        "Teknik riskleri ön sınıflandırılmış",
        "Finansal varsayımları teknik açıdan gözden geçirilmiş",
      ],
      purpose:
        "Bu aşamanın amacı, yatırımcının yüksek potansiyelli adaylara odaklanmasını sağlamak ve değerlendirme sürecini hızlandırmaktır.",
      ctaInvestor: {
        text: "Yatırımcı Sayfasına Git",
        href: "/tr/investor",
        micro:
          "Uygun kriterlerdeki projeleri keşfedin, AFA'nın seçili havuzuna erişin.",
      },
      ctaDeveloper: {
        text: "Geliştirici Sayfasına Git",
        href: "/tr/developer",
        micro:
          "Projenizi AFA'nın yatırımcı ağı ile tanıştırın, teknik doğrulama desteği alın.",
      },
    },
    bridge:
      "Yatırım sürecinin her aşamasında da teknik doğrulama hizmetleri sağlıyoruz. Satın alma öncesi değerlendirmeden işletme dönemi varlık yönetimine kadar, aşağıdaki hizmetleri keşfedin.",
    block2: {
      label: "Teknik Hizmetler",
      title: "Teknik Doğrulama Aşamaları",
      intro: "",
      stages: [
        {
          num: "01",
          title: "Teknik Ön Değerlendirme",
          badge: "Tipik süre: 3 iş günü",
          lead: "Bir projeyi detaylı incelemeden önce en kritik soru şudur: Bu proje gerçekten incelenmeye değer mi?",
          body: "Teknik Ön Değerlendirme çalışması; şebeke kapasitesinin fiili uygulanabilirliği, izin zincirinin kronolojik bütünlüğü ve finansal varsayımların teknik gerçeklikle uyumu üzerinden ilk karar filtresini oluşturur.",
          foot: "Bu aşama, erken karar vermek isteyenler için hızlı filtreleme sağlar ve inceleme maliyetini etkili biçimde optimize eder.",
          result:
            "İlerlenebilir · Koşullu İlerlenebilir · Bu Aşamada İlerlenemez",
          cta: {
            text: "Ön TDD Başvurusu Yap",
            href: "/tr/teknik-on-degerlendirme",
          },
        },
        {
          num: "02",
          title: "Detaylı Teknik İnceleme",
          body: "Yatırım kararı yaklaşırken proje daha kapsamlı teknik analiz gerektirir. Bu aşamada şebeke entegrasyonu teknik olarak doğrulanır, üretim kısıntısı ve kapasite riski analiz edilir, teknik tasarım ve saha verileri incelenir, izin zinciri bütünlüğü değerlendirilir ve risklerin finansal etkisi hesaplanır.",
          foot: "Amaç, yatırım komitesi kararına temel oluşturacak teknik netliği sağlamaktır.",
        },
        {
          num: "03",
          title: "Satın Alma Süreci Teknik Destek",
          body: "Teknik doğrulama sonrası satın alma sürecine geçilir. Bu aşamada AFA; teknik bulguların sözleşme yapısına doğru yansımasını destekler, teknik risklerin fiyatlama üzerindeki etkisini değerlendirir ve teknik sorumluluk paylaşımının netleşmesine katkı sağlar.",
          foot: "Amaç, kapanış aşamasında teknik netliğin korunması ve sözleşme yapısının sağlığını güvence altına almaktır.",
        },
        {
          num: "04",
          title: "EPC Aşaması — İşveren Mühendisliği",
          body: "Satın alma sonrası inşaat sürecinde yatırımcı adına bağımsız teknik gözetim sağlanır. Kritik kilometre taşları kontrol edilir, teknik uygunluk doğrulanır, devreye alma testleri izlenir, takvim ve kalite riski değerlendirilir.",
          foot: "AFA yüklenici değildir; yatırımcı adına bağımsız teknik doğrulama sağlar.",
        },
        {
          num: "05",
          title: "İşletme Dönemi — Varlık Yönetimi",
          body: "Faaliyette olan santrallerde performans ve gelir dayanıklılığı öncelik kazanır. Üretim verileri analiz edilir, performans sapmaları değerlendirilir, şebeke etkileri incelenir ve operasyonel iyileştirme alanları belirlenir.",
          foot: "Amaç, varlığın teknik ve finansal istikrarını güçlendirmektir.",
        },
        {
          num: "06",
          title: "Santral Satışı / Refinansman",
          body: "Satış veya refinansman sürecinde teknik netlik belirleyici olur. AFA; teknik dosyanın yatırımcı beklentilerine uygun hazırlanmasını destekler, performans ve risk profilini netleştirir, olası teknik soruları proaktif olarak giderir.",
          foot: "Bu aşama, varlık değerinin korunması ve güçlendirilmesi için yapılandırılır.",
        },
      ],
    },
    whyAfa: {
      title: "Neden AFA?",
      items: [
        {
          title: "Bağımsızlık",
          text: "Proje geliştirmeyiz, ekipman satmayız, finansman sağlamayız. Yalnızca yatırımcı çıkarı temelinde çalışırız.",
        },
        {
          title: "Şebeke Gerçekliği",
          text: "Bağlantı kararını belgeye değil, fiili uygulanabilirliğe dayandırırız.",
        },
        {
          title: "Karar Disiplini",
          text: "Teknik bulguları yatırım komitesi kararına dönüşecek netlikte sunarız.",
        },
        {
          title: "Yatırımcı Odaklılık",
          text: "Önce filtreleme, sonra doğrulama, ardından teknik koruma. Her aşamada yatırımcının yanındayız.",
        },
      ],
      link: { text: "Metodoloji sayfasını ziyaret edin", href: "/tr/metodoloji" },
    },
    closing: {
      title: "Şimdi Başlayalım",
      body: "Proje arıyorsanız yatırımcı sayfasına gidin. Projenizi yatırımcılarla buluşturmak istiyorsanız geliştirici sayfasına başvurun. Mevcut bir projeyi değerlendirmek istiyorsanız teknik ön değerlendirme başvurusu yapın.",
      ctaInvestor: {
        text: "Yatırımcı Sayfasına Git",
        href: "/tr/investor",
        micro: "AFA'nın seçili proje havuzuna erişin.",
      },
      ctaDeveloper: {
        text: "Geliştirici Sayfasına Git",
        href: "/tr/developer",
        micro: "Projenizi yatırımcılarla buluşturun.",
      },
      ctaTertiary: {
        text: "Ön TDD Başvurusu Yap",
        href: "/tr/teknik-on-degerlendirme",
      },
    },
    disclaimer:
      "Proje-spesifik yasal ve teknik doğrulama tavsiye edilir. Hizmet sunumu, güncel Romanya Enerji Düzenleme Kurumu (ANRE) ve iletim operatörü (TSO) düzenlemelerine ve şebeke bağlantı çerçevelerine tabidir (Mart 2026 itibarıyla).",
  },

  en: {
    meta: {
      title: "Our Services | AFA Energy Romania",
      description:
        "AFA connects investors with pre-screened renewable energy projects in Romania, validated through independent technical due diligence.",
    },
    hero: {
      badge: "Clarity Before Investment.",
      title: "Investment-Ready Projects and Technical Validation.",
      description:
        "AFA connects investors with pre-screened renewable energy projects in Romania. Each project is reviewed through the AFA Matrix™ methodology and validated at bank-financing eligibility standards.",
      cta: "Explore Investment-Ready Projects",
      ctaHref: "/en/investor",
      pillars: [
        {
          label: "Grid Integration",
          desc: "ATR and grid connection verification focus",
        },
        {
          label: "Financial Resilience",
          desc: "Production and revenue scenario framework",
        },
        {
          label: "Regulatory Compliance",
          desc: "Permit chain consistency control",
        },
      ],
    },
    positioning: {
      title: "Investor-Side Positioning",
      body: "AFA is positioned on the investor side. We connect investors with pre-screened projects and provide technical validation support at every stage of the investment process.",
      emphasis:
        "Our goal is not just to produce reports, but to bring clarity to the investment decision.",
    },
    block1: {
      title: "Finding Investment-Ready Projects",
      body: "AFA matches investors with projects that have undergone preliminary technical due diligence and have been filtered according to investment criteria. Each project has been reviewed through AFA Matrix™, with technical risks identified and financial assumptions validated.",
      checks: [
        "Grid connection feasibility pre-checked",
        "Permit and procedure flow reviewed",
        "Technical risks pre-classified",
        "Financial assumptions technically reviewed",
      ],
      purpose:
        "The goal of this stage is to help investors focus on high-potential candidates and accelerate the evaluation process.",
      ctaInvestor: {
        text: "Go to Investor Page",
        href: "/en/investor",
        micro:
          "Explore projects meeting the criteria and access AFA's curated pool.",
      },
      ctaDeveloper: {
        text: "Go to Developer Page",
        href: "/en/developer",
        micro:
          "Introduce your project to AFA's investor network and receive technical validation support.",
      },
    },
    bridge:
      "We also provide technical validation services at every stage of the investment process. From pre-acquisition assessment to operational asset management, explore the services below.",
    block2: {
      label: "Technical Services",
      title: "Technical Validation Stages",
      intro: "",
      stages: [
        {
          num: "01",
          title: "Technical Pre-Assessment",
          badge: "Typical duration: 3 business days",
          lead: "Before conducting a detailed review, the most critical question is: Is this project actually worth examining?",
          body: "The Technical Pre-Assessment establishes the initial decision filter through grid capacity feasibility, permit chain chronological integrity, and alignment of financial assumptions with technical reality.",
          foot: "This stage provides rapid screening for early decision-makers and effectively optimizes review costs.",
          result: "Proceed · Conditional Proceed · Hold at This Stage",
          cta: {
            text: "Submit Pre-TDD Application",
            href: "/en/teknik-on-degerlendirme",
          },
        },
        {
          num: "02",
          title: "Detailed Technical Review",
          body: "As the investment decision approaches, the project requires more comprehensive technical analysis. At this stage, grid integration is technically verified, curtailment and capacity risk are analyzed, technical design and site data are reviewed, permit chain integrity is assessed, and the financial impact of risks is calculated.",
          foot: "The goal is to provide the technical clarity that forms the basis for the investment committee decision.",
        },
        {
          num: "03",
          title: "Acquisition Process Technical Support",
          body: "After technical validation, the acquisition process begins. At this stage, AFA supports the accurate reflection of technical findings in the contract structure, assesses the impact of technical risks on pricing, and contributes to clarifying technical liability allocation.",
          foot: "The goal is to preserve technical clarity at the closing stage and safeguard the health of the contract structure.",
        },
        {
          num: "04",
          title: "EPC Phase — Owner's Engineering",
          body: "During construction following acquisition, independent technical oversight is provided on behalf of the investor. Critical milestones are verified, technical compliance is validated, commissioning tests are monitored, and schedule and quality risks are assessed.",
          foot: "AFA is not a contractor; it provides independent technical validation on behalf of the investor.",
        },
        {
          num: "05",
          title: "Operational Period — Asset Management",
          body: "For operating plants, performance and revenue resilience become the priority. Production data is analyzed, performance deviations are assessed, grid effects are reviewed, and operational improvement areas are identified.",
          foot: "The goal is to strengthen the technical and financial stability of the asset.",
        },
        {
          num: "06",
          title: "Plant Sale / Refinancing",
          body: "During sale or refinancing, technical clarity becomes decisive. AFA supports the preparation of technical documentation aligned with investor expectations, clarifies the performance and risk profile, and proactively addresses potential technical questions.",
          foot: "This stage is structured to preserve and strengthen asset value.",
        },
      ],
    },
    whyAfa: {
      title: "Why AFA?",
      items: [
        {
          title: "Independence",
          text: "We do not develop projects, sell equipment, or provide financing. We work solely on the basis of investor interest.",
        },
        {
          title: "Grid Reality",
          text: "We base connection decisions on actual feasibility, not just documentation.",
        },
        {
          title: "Decision Discipline",
          text: "We present technical findings with the clarity needed for investment committee decisions.",
        },
        {
          title: "Investor Focus",
          text: "First screening, then validation, then technical protection. We stand with the investor at every stage.",
        },
      ],
      link: {
        text: "Visit the methodology page",
        href: "/en/metodoloji",
      },
    },
    closing: {
      title: "Let's Get Started",
      body: "If you're looking for projects, visit the investor page. If you want to connect your project with investors, apply on the developer page. If you need to evaluate an existing project, submit a technical pre-assessment application.",
      ctaInvestor: {
        text: "Go to Investor Page",
        href: "/en/investor",
        micro: "Access AFA's curated project pool.",
      },
      ctaDeveloper: {
        text: "Go to Developer Page",
        href: "/en/developer",
        micro: "Connect your project with investors.",
      },
      ctaTertiary: {
        text: "Submit Pre-TDD Application",
        href: "/en/teknik-on-degerlendirme",
      },
    },
    disclaimer:
      "Project-specific legal and technical validation is recommended. Service delivery is subject to current Romanian Energy Regulatory Authority (ANRE) and transmission system operator (TSO) regulations and grid connection frameworks (as of March 2026).",
  },

  ro: {
    meta: {
      title: "Serviciile Noastre | AFA Energy Romania",
      description:
        "AFA conectează investitorii cu proiecte de energie regenerabilă pre-evaluate din România, validate prin due diligence tehnic independent.",
    },
    hero: {
      badge: "Claritate Înainte de Investiție.",
      title: "Proiecte Eligibile și Validare Tehnică.",
      description:
        "AFA conectează investitorii cu proiecte de energie regenerabilă pre-evaluate din România. Fiecare proiect este analizat prin metodologia AFA Matrix™ și validat la standarde de eligibilitate pentru finanțare bancară.",
      cta: "Explorați Proiectele Eligibile",
      ctaHref: "/ro/investor",
      pillars: [
        {
          label: "Integrare Rețea",
          desc: "Focus pe verificarea ATR și conexiunea la rețea",
        },
        {
          label: "Reziliență Financiară",
          desc: "Cadru de scenarii de producție și venituri",
        },
        {
          label: "Conformitate Reglementară",
          desc: "Control de coerență al lanțului de autorizații",
        },
      ],
    },
    positioning: {
      title: "Poziționare pe Partea Investitorului",
      body: "AFA este poziționat pe partea investitorului. Conectăm investitorii cu proiecte pre-evaluate și oferim suport de validare tehnică la fiecare etapă a procesului de investiție.",
      emphasis:
        "Scopul nostru nu este doar producerea de rapoarte, ci clarificarea deciziei de investiție.",
    },
    block1: {
      title: "Găsirea Proiectelor Eligibile pentru Investiție",
      body: "AFA potrivește investitorii cu proiecte care au trecut prin due diligence tehnic preliminar și au fost filtrate conform criteriilor de investiție. Fiecare proiect a fost analizat prin AFA Matrix™, cu riscuri tehnice identificate și ipoteze financiare validate.",
      checks: [
        "Fezabilitatea conexiunii la rețea pre-verificată",
        "Fluxul de autorizații și proceduri revizuit",
        "Riscuri tehnice pre-clasificate",
        "Ipoteze financiare revizuite tehnic",
      ],
      purpose:
        "Scopul acestei etape este de a ajuta investitorii să se concentreze pe candidații cu potențial ridicat și de a accelera procesul de evaluare.",
      ctaInvestor: {
        text: "Pagina Investitorului",
        href: "/ro/investor",
        micro:
          "Explorați proiectele care îndeplinesc criteriile și accesați pool-ul curatoriat AFA.",
      },
      ctaDeveloper: {
        text: "Pagina Dezvoltatorului",
        href: "/ro/developer",
        micro:
          "Prezentați proiectul dumneavoastră rețelei de investitori AFA și primiți suport de validare tehnică.",
      },
    },
    bridge:
      "Oferim, de asemenea, servicii de validare tehnică la fiecare etapă a procesului de investiție. De la evaluarea pre-achiziție la managementul activelor operaționale, explorați serviciile de mai jos.",
    block2: {
      label: "Servicii Tehnice",
      title: "Etapele de Validare Tehnică",
      intro: "",
      stages: [
        {
          num: "01",
          title: "Evaluare Tehnică Preliminară",
          badge: "Durată tipică: 3 zile lucrătoare",
          lead: "Înainte de a efectua o analiză detaliată, cea mai critică întrebare este: Merită acest proiect să fie examinat?",
          body: "Evaluarea Tehnică Preliminară stabilește filtrul inițial de decizie prin fezabilitatea capacității de rețea, integritatea cronologică a lanțului de autorizații și alinierea ipotezelor financiare cu realitatea tehnică.",
          foot: "Această etapă oferă screening rapid pentru decidenții timpurii și optimizează eficient costurile de analiză.",
          result: "Procedează · Procedează Condiționat · Oprire la Această Etapă",
          cta: {
            text: "Depune Cerere Pre-TDD",
            href: "/ro/teknik-on-degerlendirme",
          },
        },
        {
          num: "02",
          title: "Analiză Tehnică Detaliată",
          body: "Pe măsură ce decizia de investiție se apropie, proiectul necesită o analiză tehnică mai cuprinzătoare. În această etapă, integrarea în rețea este verificată tehnic, riscul de curtailment și capacitate este analizat, proiectarea tehnică și datele de sit sunt revizuite, integritatea lanțului de autorizații este evaluată, iar impactul financiar al riscurilor este calculat.",
          foot: "Scopul este de a oferi claritatea tehnică care stă la baza deciziei comitetului de investiții.",
        },
        {
          num: "03",
          title: "Suport Tehnic Proces de Achiziție",
          body: "După validarea tehnică, începe procesul de achiziție. În această etapă, AFA sprijină reflectarea corectă a constatărilor tehnice în structura contractuală, evaluează impactul riscurilor tehnice asupra prețului și contribuie la clarificarea alocării responsabilității tehnice.",
          foot: "Scopul este păstrarea clarității tehnice în etapa de finalizare și asigurarea sănătății structurii contractuale.",
        },
        {
          num: "04",
          title: "Faza EPC — Ingineria Beneficiarului",
          body: "În timpul construcției post-achiziție, se oferă supraveghere tehnică independentă în numele investitorului. Reperele critice sunt verificate, conformitatea tehnică este validată, testele de punere în funcțiune sunt monitorizate, iar riscurile de calendar și calitate sunt evaluate.",
          foot: "AFA nu este contractor; oferă validare tehnică independentă în numele investitorului.",
        },
        {
          num: "05",
          title: "Perioada Operațională — Management de Active",
          body: "Pentru centralele în funcțiune, performanța și reziliența veniturilor devin prioritare. Datele de producție sunt analizate, abaterile de performanță sunt evaluate, efectele de rețea sunt revizuite și sunt identificate zonele de îmbunătățire operațională.",
          foot: "Scopul este consolidarea stabilității tehnice și financiare a activului.",
        },
        {
          num: "06",
          title: "Vânzare Centrală / Refinanțare",
          body: "În timpul vânzării sau refinanțării, claritatea tehnică devine decisivă. AFA sprijină pregătirea documentației tehnice aliniate cu așteptările investitorilor, clarifică profilul de performanță și risc și abordează proactiv potențialele întrebări tehnice.",
          foot: "Această etapă este structurată pentru a conserva și consolida valoarea activului.",
        },
      ],
    },
    whyAfa: {
      title: "De Ce AFA?",
      items: [
        {
          title: "Independență",
          text: "Nu dezvoltăm proiecte, nu vindem echipamente, nu oferim finanțare. Lucrăm exclusiv pe baza interesului investitorului.",
        },
        {
          title: "Realitatea Rețelei",
          text: "Bazăm deciziile de conexiune pe fezabilitatea reală, nu doar pe documentație.",
        },
        {
          title: "Disciplina Deciziei",
          text: "Prezentăm constatările tehnice cu claritatea necesară pentru deciziile comitetului de investiții.",
        },
        {
          title: "Focus pe Investitor",
          text: "Întâi screening, apoi validare, apoi protecție tehnică. Suntem alături de investitor la fiecare etapă.",
        },
      ],
      link: {
        text: "Vizitați pagina de metodologie",
        href: "/ro/metodoloji",
      },
    },
    closing: {
      title: "Să Începem",
      body: "Dacă căutați proiecte, vizitați pagina investitorului. Dacă doriți să conectați proiectul dumneavoastră cu investitorii, aplicați pe pagina dezvoltatorului. Dacă trebuie să evaluați un proiect existent, depuneți o cerere de evaluare tehnică preliminară.",
      ctaInvestor: {
        text: "Pagina Investitorului",
        href: "/ro/investor",
        micro: "Accesați pool-ul curatoriat de proiecte AFA.",
      },
      ctaDeveloper: {
        text: "Pagina Dezvoltatorului",
        href: "/ro/developer",
        micro: "Conectați proiectul dumneavoastră cu investitorii.",
      },
      ctaTertiary: {
        text: "Depune Cerere Pre-TDD",
        href: "/ro/teknik-on-degerlendirme",
      },
    },
    disclaimer:
      "Se recomandă validarea juridică și tehnică specifică proiectului. Furnizarea serviciilor este supusă reglementărilor actuale ale Autorității Naționale de Reglementare în Domeniul Energiei (ANRE) și ale operatorului de sistem de transport (TSO) și cadrelor de conexiune la rețea (din martie 2026).",
  },
};
