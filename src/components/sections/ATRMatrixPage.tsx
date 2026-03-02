// components/sections/ATRMatrixPage.tsx
// AFA ATR Matrix™ — Full Page Component
// Server Component — NO "use client"

import Link from "next/link";
import styles from "./ATRMatrixPage.module.css";

// ─── TYPES ───

interface ATRMatrixLocale {
  hero: { eyebrow: string; title: string; subtitle: string; emphasis: string };
  why: { title: string; intro: string; questions: string[]; closing: string };
  pillars: {
    title: string;
    items: { number: string; heading: string; description: string; checks: string[]; closing: string }[];
  };
  process: { title: string; steps: { label: string; description: string }[]; closing: string };
  decision: {
    title: string;
    categories: { label: string; description: string; status: "proceed" | "conditional" | "hold" }[];
    disclaimer: string;
  };
  projectTypes: { title: string; intro: string; types: string[]; closing: string };
  independence: { title: string; body: string[]; emphasis: string };
  stakeholders: { title: string; items: { audience: string; description: string }[] };
  cta: {
    title: string;
    developerDescription: string; developerCta: string;
    investorDescription: string; investorCta: string;
  };
  disclaimer: string;
}

// ─── CONTENT (TR / EN / RO) ───

const content: Record<"tr" | "en" | "ro", ATRMatrixLocale> = {
  tr: {
    hero: {
      eyebrow: "AFA Metodoloji",
      title: "AFA ATR Matrix™",
      subtitle: "Yatırımcıya Sunulmadan Önce Projeleri Teknik Doğrulama Disiplininden Geçiren Sistem",
      emphasis: "Bir satış aracı değil; karar disiplini.",
    },
    why: {
      title: "Neden AFA ATR Matrix™?",
      intro: "Enerji piyasasında birçok proje teknik olarak mümkün görünür. Ancak yatırım kararı için şu soruların netleşmesi gerekir:",
      questions: [
        "Şebekeye fiilen bağlanabilir mi?",
        "Üretim kısıntısı riski gelir projeksiyonunu nasıl etkiler?",
        "İzin zinciri kronolojik ve düzenleyici uyum açısından tutarlı mı?",
        "Finansman sürecinde teknik varsayımlar savunulabilir mi?",
      ],
      closing: "Bu sorular netleşmeden yatırımcıya sunulan projeler, zaman ve sermaye kaybı doğurabilir. AFA Matrix, belirsizlikleri erken aşamada görünür hale getirir ve ölçülebilir bir risk çerçevesine dönüştürür.",
    },
    pillars: {
      title: "AFA Matrix Nasıl Çalışır?",
      items: [
        {
          number: "01", heading: "Bağlantı Gerçekliği",
          description: "Teknik Bağlantı Onayı (ATR) belgesi ve bağlantı koşulları, yalnızca belge düzeyinde değil; fiili uygulanabilirlik açısından değerlendirilir.",
          checks: ["Bağlantı noktası teknik uygunluğu", "Kapasite tahsisi doğruluğu", "Bağlantı altyapısının fiili durumu", "Şebekeye verilebilirlik varsayımı", "Bağlantı maliyet varsayımlarının tutarlılığı"],
          closing: "Bağlantının teorik değil; sürdürülebilir ve uygulanabilir olup olmadığı doğrulanır.",
        },
        {
          number: "02", heading: "Şebeke Dinamikleri ve Üretim Kısıntısı",
          description: "Projenin bağlanacağı bölgesel şebeke yapısı analiz edilir. Mevcut ve planlanan projeler dikkate alınarak sistemin üretimi hangi koşullarda kabul edebileceği değerlendirilir.",
          checks: ["Potansiyel üretim kısıntısı ihtimali", "Gelir projeksiyonuna etkisi", "Kapasite kullanımındaki sapma senaryoları", "Bölgesel yoğunluk ve planlanan kapasite analizi"],
          closing: "Üretim kısıntısı yalnız teknik bir risk değildir; gelir dayanıklılığının belirleyicisidir.",
        },
        {
          number: "03", heading: "İzin Zinciri ve Regülasyon Uyumu",
          description: "Bir projenin izinlerinin varlığı tek başına yeterli değildir; kronolojik ve düzenleyici bütünlüğü esastır.",
          checks: ["İzin sıralaması ve süre tutarlılığı", "Bağlantı ve imar uyumu", "Kurumsal onayların kapsamı", "Düzenleyici değişikliklere bağlı uyum riski"],
          closing: "İzin yapısının yatırım sürecinde kesinti yaratmayacak sağlamlıkta olup olmadığı doğrulanır.",
        },
        {
          number: "04", heading: "Finansal Dayanıklılık",
          description: "Teknik bulgular, finansal varsayımlara etkisi üzerinden değerlendirilir.",
          checks: ["Üretim varsayımlarının teknik tutarlılığı", "Gelir senaryolarının savunulabilirliği", "Maliyet projeksiyonlarının gerçekçiliği", "Takvim riskinin nakit akışa etkisi"],
          closing: "Finansmana uygunluk, yalnızca inşa edilebilirlik değil; belirsizliğin ölçülebilir risk bantları içinde tanımlanabilir olmasıdır.",
        },
      ],
    },
    process: {
      title: "Süreç Akışı",
      steps: [
        { label: "Başvuru ve Veri Toplama", description: "Proje verileri ve dokümanlar derlenir." },
        { label: "Teknik Analiz", description: "Dört doğrulama ekseni uygulanır." },
        { label: "Risk Sınıflandırması", description: "Bulgular risk bantlarına yerleştirilir." },
        { label: "Finansal Etki Çerçevesi", description: "Nitel risk bantları üzerinden değerlendirilir." },
        { label: "Sunulabilirlik Kararı", description: "Karar Kapısı sınıflandırması uygulanır." },
      ],
      closing: "Projenin aşaması değişse de değerlendirme disiplini değişmez.",
    },
    decision: {
      title: "Karar Sınıflandırması",
      categories: [
        { label: "İlerlenebilir", description: "Teknik doğrulama tamamlanmış, risk profili yatırımcıya sunulabilir düzeyde.", status: "proceed" },
        { label: "Koşullu İlerlenebilir", description: "Belirli koşulların karşılanması halinde ilerlemeye uygun; açık noktalar tanımlanmış.", status: "conditional" },
        { label: "Bu Aşamada İlerlenemez", description: "Mevcut veri ve doğrulama seviyesi ilerleme için yeterli değil; gerekçeler raporlanmış.", status: "hold" },
      ],
      disclaimer: "Bu sınıflandırma bağlayıcı yatırım kararı veya yatırım tavsiyesi niteliği taşımaz; teknik risk çerçevesi sunar.",
    },
    projectTypes: {
      title: "Hangi Projeler İçin Uygulanır?",
      intro: "AFA Matrix yalnızca yeni geliştirilen projeler için değil; her aşamadaki varlıklar için uygulanır.",
      types: ["Geliştirme Aşamasındaki Projeler", "İnşaata Hazır Projeler", "Satın Alma Sürecindeki Varlıklar", "Operasyonel Santraller", "Satış veya Refinansman Planlanan Tesisler"],
      closing: "Her proje, yatırımcıya sunulmadan önce aynı teknik filtreden geçer.",
    },
    independence: {
      title: "Tarafsızlık İlkesi",
      body: [
        "AFA; proje geliştirme, ekipman satışı, yüklenicilik (EPC) ve finansman sağlama faaliyetleri yürütmez.",
        "Bu yapı, değerlendirmelerin yalnızca teknik gerçeklik ve yatırımcı çıkarı doğrultusunda yapılmasını sağlar.",
      ],
      emphasis: "AFA ATR Matrix™, bir listeleme sistemi değil; kalite filtresidir.",
    },
    stakeholders: {
      title: "AFA Matrix Neyi Değiştirir?",
      items: [
        { audience: "Geliştirici İçin", description: "Yatırımcı karşısında savunulabilir bir teknik dosya yapısı oluşturur." },
        { audience: "Yatırımcı İçin", description: "Ham proje akışı yerine, önceden filtrelenmiş ve risk profili görünür hale getirilmiş projelere odaklanma imkânı sağlar." },
        { audience: "AFA İçin", description: "Değerlendirme disiplinini kurumsal hale getirir ve yatırımcı iletişiminde tutarlı bir kalite standardı oluşturur." },
      ],
    },
    cta: {
      title: "Sonraki Adım",
      developerDescription: "Projenizi değerlendirme sürecine almak istiyorsanız:",
      developerCta: "Geliştirici Sayfasına Git",
      investorDescription: "Filtrelenmiş proje akışına erişmek istiyorsanız:",
      investorCta: "Yatırımcı Sayfasına Git",
    },
    disclaimer: "Proje-spesifik yasal ve teknik doğrulama tavsiye edilir.",
  },

  en: {
    hero: {
      eyebrow: "AFA Methodology",
      title: "AFA ATR Matrix™",
      subtitle: "The System That Puts Every Project Through Technical Validation Before Investor Presentation",
      emphasis: "Not a sales tool; a decision discipline.",
    },
    why: {
      title: "Why AFA ATR Matrix™?",
      intro: "Many projects in the energy market appear technically feasible. However, the following questions must be resolved before an investment decision:",
      questions: [
        "Can it actually connect to the grid?",
        "How does curtailment risk affect revenue projections?",
        "Is the permit chain consistent in chronological and regulatory terms?",
        "Are technical assumptions defensible during the financing process?",
      ],
      closing: "Projects presented to investors without resolving these questions may result in time and capital loss. AFA Matrix makes uncertainties visible at an early stage and transforms them into a measurable risk framework.",
    },
    pillars: {
      title: "How Does AFA Matrix Work?",
      items: [
        {
          number: "01", heading: "Connection Reality",
          description: "The Technical Connection Approval (ATR) document and connection conditions are evaluated not only at document level but in terms of actual feasibility.",
          checks: ["Technical suitability of connection point", "Capacity allocation accuracy", "Actual status of connection infrastructure", "Grid feed-in assumption", "Consistency of connection cost assumptions"],
          closing: "Whether the connection is sustainable and feasible \u2014 not just theoretical \u2014 is verified.",
        },
        {
          number: "02", heading: "Grid Dynamics and Curtailment",
          description: "The regional grid structure where the project will connect is analyzed. The conditions under which the system can accept generation are evaluated considering existing and planned projects.",
          checks: ["Potential curtailment probability", "Impact on revenue projection", "Capacity utilization deviation scenarios", "Regional density and planned capacity analysis"],
          closing: "Curtailment is not just a technical risk; it determines revenue resilience.",
        },
        {
          number: "03", heading: "Permit Chain and Regulatory Compliance",
          description: "The existence of permits alone is not sufficient; chronological and regulatory integrity is essential.",
          checks: ["Permit sequencing and timeline consistency", "Connection and zoning compliance", "Scope of institutional approvals", "Compliance risk due to regulatory changes"],
          closing: "Whether the permit structure is robust enough not to cause disruption during the investment process is verified.",
        },
        {
          number: "04", heading: "Financial Resilience",
          description: "Technical findings are evaluated through their impact on financial assumptions.",
          checks: ["Technical consistency of production assumptions", "Defensibility of revenue scenarios", "Realism of cost projections", "Impact of timeline risk on cash flow"],
          closing: "Bankability is not just about constructability; it is about uncertainty being definable within measurable risk bands.",
        },
      ],
    },
    process: {
      title: "Process Flow",
      steps: [
        { label: "Application and Data Collection", description: "Project data and documents are compiled." },
        { label: "Technical Analysis", description: "Four validation axes are applied." },
        { label: "Risk Classification", description: "Findings are placed into risk bands." },
        { label: "Financial Impact Framework", description: "Evaluated through qualitative risk bands." },
        { label: "Presentability Decision", description: "Decision Gate classification is applied." },
      ],
      closing: "The project stage may change, but the evaluation discipline does not.",
    },
    decision: {
      title: "Decision Classification",
      categories: [
        { label: "Proceed", description: "Technical validation complete, risk profile presentable to investors.", status: "proceed" },
        { label: "Conditionally Proceed", description: "Suitable for advancement if certain conditions are met; open items defined.", status: "conditional" },
        { label: "Hold at This Stage", description: "Current data and validation level insufficient for advancement; rationale documented.", status: "hold" },
      ],
      disclaimer: "This classification does not constitute a binding investment decision or investment advice; it provides a technical risk framework.",
    },
    projectTypes: {
      title: "Which Projects Does It Apply To?",
      intro: "AFA Matrix is applied not only to newly developed projects but to assets at every stage.",
      types: ["Development-Stage Projects", "Construction-Ready Projects", "Acquisition-Stage Assets", "Operational Plants", "Assets Planned for Sale or Refinancing"],
      closing: "Every project passes through the same technical filter before investor presentation.",
    },
    independence: {
      title: "Independence Principle",
      body: [
        "AFA does not engage in project development, equipment sales, EPC contracting, or financing activities.",
        "This structure ensures that evaluations are conducted solely in line with technical reality and investor interest.",
      ],
      emphasis: "AFA ATR Matrix™ is not a listing system; it is a quality filter.",
    },
    stakeholders: {
      title: "What Does AFA Matrix Change?",
      items: [
        { audience: "For Developers", description: "Creates a defensible technical file structure for investor-facing presentations." },
        { audience: "For Investors", description: "Enables focus on pre-filtered projects with visible risk profiles instead of raw project flow." },
        { audience: "For AFA", description: "Institutionalizes evaluation discipline and establishes a consistent quality standard in investor communication." },
      ],
    },
    cta: {
      title: "Next Step",
      developerDescription: "If you want to submit your project for evaluation:",
      developerCta: "Go to Developer Page",
      investorDescription: "If you want to access the filtered project flow:",
      investorCta: "Go to Investor Page",
    },
    disclaimer: "Project-specific legal and technical verification is recommended.",
  },

  ro: {
    hero: {
      eyebrow: "Metodologia AFA",
      title: "AFA ATR Matrix™",
      subtitle: "Sistemul care supune fiecare proiect unei discipline de validare tehnic\u0103 \u00eenainte de prezentarea c\u0103tre investitori",
      emphasis: "Nu este un instrument de v\u00e2nzare; este o disciplin\u0103 decizional\u0103.",
    },
    why: {
      title: "De ce AFA ATR Matrix™?",
      intro: "Multe proiecte din pia\u021ba energetic\u0103 par fezabile din punct de vedere tehnic. Cu toate acestea, urm\u0103toarele \u00eentreb\u0103ri trebuie clarificate \u00eenainte de o decizie de investi\u021bie:",
      questions: [
        "Se poate conecta efectiv la re\u021bea?",
        "Cum afecteaz\u0103 riscul de curtailment proiec\u021biile de venituri?",
        "Lan\u021bul de autoriza\u021bii este consistent din punct de vedere cronologic \u0219i reglementar?",
        "Sunt ipotezele tehnice ap\u0103rabile \u00een procesul de finan\u021bare?",
      ],
      closing: "Proiectele prezentate investitorilor f\u0103r\u0103 clarificarea acestor \u00eentreb\u0103ri pot genera pierderi de timp \u0219i capital. AFA Matrix face incertitudinile vizibile \u00eentr-un stadiu timpuriu \u0219i le transform\u0103 \u00eentr-un cadru de risc m\u0103surabil.",
    },
    pillars: {
      title: "Cum func\u021bioneaz\u0103 AFA Matrix?",
      items: [
        {
          number: "01", heading: "Realitatea Conexiunii",
          description: "Documentul de Aprobare a Conexiunii Tehnice (ATR) \u0219i condi\u021biile de conectare sunt evaluate nu doar la nivel de document, ci din perspectiva fezabilit\u0103\u021bii efective.",
          checks: ["Adecvarea tehnic\u0103 a punctului de conectare", "Acurate\u021bea aloc\u0103rii de capacitate", "Starea real\u0103 a infrastructurii de conectare", "Ipoteza de alimentare a re\u021belei", "Consisten\u021ba ipotezelor de cost de conectare"],
          closing: "Se verific\u0103 dac\u0103 conexiunea este durabil\u0103 \u0219i fezabil\u0103 \u2014 nu doar teoretic\u0103.",
        },
        {
          number: "02", heading: "Dinamica Re\u021belei \u0219i Curtailment",
          description: "Structura regional\u0103 a re\u021belei unde se va conecta proiectul este analizat\u0103. Condi\u021biile \u00een care sistemul poate accepta generarea sunt evaluate \u021bin\u00e2nd cont de proiectele existente \u0219i planificate.",
          checks: ["Probabilitatea poten\u021bial\u0103 de curtailment", "Impactul asupra proiec\u021biei de venituri", "Scenarii de devia\u021bie a utiliz\u0103rii capacit\u0103\u021bii", "Analiza densit\u0103\u021bii regionale \u0219i a capacit\u0103\u021bii planificate"],
          closing: "Curtailment-ul nu este doar un risc tehnic; determin\u0103 rezilien\u021ba veniturilor.",
        },
        {
          number: "03", heading: "Lan\u021bul de Autoriza\u021bii \u0219i Conformitate",
          description: "Existen\u021ba autoriza\u021biilor singur\u0103 nu este suficient\u0103; integritatea cronologic\u0103 \u0219i reglementar\u0103 este esen\u021bial\u0103.",
          checks: ["Secven\u021bierea \u0219i consisten\u021ba cronologic\u0103 a autoriza\u021biilor", "Conformitatea conexiunii \u0219i a zon\u0103rii", "Domeniul aprob\u0103rilor institu\u021bionale", "Riscul de conformitate datorat modific\u0103rilor reglementare"],
          closing: "Se verific\u0103 dac\u0103 structura de autoriza\u021bii este suficient de robust\u0103 pentru a nu cauza \u00eentreruperi \u00een procesul de investi\u021bie.",
        },
        {
          number: "04", heading: "Rezilien\u021ba Financiar\u0103",
          description: "Constat\u0103rile tehnice sunt evaluate prin impactul lor asupra ipotezelor financiare.",
          checks: ["Consisten\u021ba tehnic\u0103 a ipotezelor de produc\u021bie", "Ap\u0103rabilitatea scenariilor de venituri", "Realismul proiec\u021biilor de costuri", "Impactul riscului de calendar asupra fluxului de numerar"],
          closing: "Bancabilitatea nu \u00eenseamn\u0103 doar constructibilitate; \u00eenseamn\u0103 c\u0103 incertitudinea poate fi definit\u0103 \u00een benzi de risc m\u0103surabile.",
        },
      ],
    },
    process: {
      title: "Fluxul Procesului",
      steps: [
        { label: "Aplica\u021bie \u0219i Colectare Date", description: "Datele \u0219i documentele proiectului sunt compilate." },
        { label: "Analiz\u0103 Tehnic\u0103", description: "Cele patru axe de validare sunt aplicate." },
        { label: "Clasificarea Riscurilor", description: "Constat\u0103rile sunt plasate \u00een benzi de risc." },
        { label: "Cadrul de Impact Financiar", description: "Evaluat prin benzi de risc calitative." },
        { label: "Decizia de Prezentabilitate", description: "Se aplic\u0103 clasificarea Decision Gate." },
      ],
      closing: "Etapa proiectului se poate schimba, dar disciplina de evaluare nu.",
    },
    decision: {
      title: "Clasificarea Deciziei",
      categories: [
        { label: "Se poate avansa", description: "Validarea tehnic\u0103 complet\u0103, profilul de risc prezentabil investitorilor.", status: "proceed" },
        { label: "Avansare condi\u021bionat\u0103", description: "Adecvat pentru avansare dac\u0103 anumite condi\u021bii sunt \u00eendeplinite; puncte deschise definite.", status: "conditional" },
        { label: "Men\u021binere \u00een aceast\u0103 etap\u0103", description: "Nivelul actual de date \u0219i validare insuficient pentru avansare; ra\u021bionale documentate.", status: "hold" },
      ],
      disclaimer: "Aceast\u0103 clasificare nu constituie o decizie de investi\u021bie obligatorie sau un sfat de investi\u021bie; ofer\u0103 un cadru de risc tehnic.",
    },
    projectTypes: {
      title: "Pentru ce proiecte se aplic\u0103?",
      intro: "AFA Matrix se aplic\u0103 nu doar proiectelor nou dezvoltate, ci activelor din fiecare etap\u0103.",
      types: ["Proiecte \u00een faza de dezvoltare", "Proiecte preg\u0103tite pentru construc\u021bie", "Active \u00een proces de achizi\u021bie", "Centrale opera\u021bionale", "Active planificate pentru v\u00e2nzare sau refinan\u021bare"],
      closing: "Fiecare proiect trece prin acela\u0219i filtru tehnic \u00eenainte de prezentarea c\u0103tre investitori.",
    },
    independence: {
      title: "Principiul Independen\u021bei",
      body: [
        "AFA nu desf\u0103\u0219oar\u0103 activit\u0103\u021bi de dezvoltare de proiecte, v\u00e2nzare de echipamente, contractare EPC sau finan\u021bare.",
        "Aceast\u0103 structur\u0103 asigur\u0103 c\u0103 evalu\u0103rile sunt efectuate exclusiv \u00een conformitate cu realitatea tehnic\u0103 \u0219i interesul investitorului.",
      ],
      emphasis: "AFA ATR Matrix™ nu este un sistem de listare; este un filtru de calitate.",
    },
    stakeholders: {
      title: "Ce schimb\u0103 AFA Matrix?",
      items: [
        { audience: "Pentru Dezvoltatori", description: "Creeaz\u0103 o structur\u0103 de dosar tehnic ap\u0103rabil\u0103 pentru prezent\u0103rile c\u0103tre investitori." },
        { audience: "Pentru Investitori", description: "Permite concentrarea pe proiecte pre-filtrate cu profiluri de risc vizibile \u00een loc de flux brut de proiecte." },
        { audience: "Pentru AFA", description: "Institu\u021bionalizeaz\u0103 disciplina de evaluare \u0219i stabile\u0219te un standard de calitate consistent \u00een comunicarea cu investitorii." },
      ],
    },
    cta: {
      title: "Pasul Urm\u0103tor",
      developerDescription: "Dac\u0103 dori\u021bi s\u0103 trimite\u021bi proiectul pentru evaluare:",
      developerCta: "Mergi la Pagina Dezvoltatorului",
      investorDescription: "Dac\u0103 dori\u021bi acces la fluxul de proiecte filtrate:",
      investorCta: "Mergi la Pagina Investitorului",
    },
    disclaimer: "Se recomand\u0103 verificarea juridic\u0103 \u0219i tehnic\u0103 specific\u0103 proiectului.",
  },
};

// ─── HELPERS ───

const statusClassMap: Record<string, string> = {
  proceed: styles.borderProceed,
  conditional: styles.borderConditional,
  hold: styles.borderHold,
};

// ─── PROPS ───

interface ATRMatrixPageProps {
  locale?: "tr" | "en" | "ro";
  developerHref?: string;
  investorHref?: string;
}

// ─── COMPONENT ───

export function ATRMatrixPage({
  locale = "tr",
  developerHref = "/developer",
  investorHref = "/investor",
}: ATRMatrixPageProps) {
  const t = content[locale];

  return (
    <main>
      {/* SECTION 1 — HERO (Split Layout) */}
      <section
        id="atr-matrix-hero"
        aria-labelledby="atr-matrix-hero-heading"
        className={`${styles.hero} atrMatrixHero`}
      >
        <div className={styles.heroGrid}>
          <div className={styles.heroTextColumn}>
            <p className={styles.heroEyebrow} aria-hidden="true">
              {t.hero.eyebrow}
            </p>
            <h1 id="atr-matrix-hero-heading" className={styles.heroTitle}>
              {t.hero.title}
            </h1>
            <p className={styles.heroSubtitle}>{t.hero.subtitle}</p>
            <div className={styles.heroDivider} aria-hidden="true" />
            <p className={styles.heroEmphasis}>{t.hero.emphasis}</p>
          </div>
          <div className={styles.heroPhotoColumn} aria-hidden="true">
            Photo Placeholder
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY */}
      <section id="why-atr-matrix" aria-labelledby="why-atr-matrix-heading" className={styles.why}>
        <div className={styles.narrowContainer}>
          <h2 id="why-atr-matrix-heading" className={styles.sectionHeading}>{t.why.title}</h2>
          <p className={styles.bodyText} style={{ marginBottom: "32px" }}>{t.why.intro}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            {t.why.questions.map((question, index) => (
              <div key={index} className={styles.questionBlock}>
                <p className={styles.questionText}>{question}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText}>{t.why.closing}</p>
        </div>
      </section>

      {/* SECTION 3 — FOUR PILLARS (hover: Level 1) */}
      <section id="how-it-works" aria-labelledby="how-it-works-heading" className={styles.pillars}>
        <div className={styles.container}>
          <h2 id="how-it-works-heading" className={styles.sectionHeading} style={{ marginBottom: "32px" }}>
            {t.pillars.title}
          </h2>
          <div className={styles.pillarsGrid}>
            {t.pillars.items.map((pillar) => (
              <div key={pillar.number} className={styles.pillarCard}>
                <span className={styles.pillarNumber} aria-hidden="true">{pillar.number}</span>
                <h3 className={styles.pillarHeading}>{pillar.heading}</h3>
                <p className={styles.smallText} style={{ marginBottom: "16px" }}>{pillar.description}</p>
                <ul className={styles.pillarChecks}>
                  {pillar.checks.map((check, i) => (
                    <li key={i} className={styles.smallText}>{check}</li>
                  ))}
                </ul>
                <p className={styles.pillarClosing}>{pillar.closing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO BAND 1 */}
      <div className={styles.photoBand} aria-hidden="true">
        Photo Placeholder
      </div>

      {/* SECTION 4 — PROCESS FLOW */}
      <section id="process-flow" aria-labelledby="process-flow-heading" className={styles.process}>
        <div className={styles.container}>
          <h2 id="process-flow-heading" className={styles.sectionHeading} style={{ marginBottom: "40px" }}>
            {t.process.title}
          </h2>

          {/* Desktop: horizontal */}
          <div className={styles.processDesktop}>
            {t.process.steps.map((step, index) => (
              <div key={index} className={styles.processStep}>
                <div className={styles.processStepContent}>
                  <div className={styles.stepCircle}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                  </div>
                  <p className={styles.stepLabel}>{step.label}</p>
                  <p className={styles.smallText}>{step.description}</p>
                </div>
                {index < t.process.steps.length - 1 && (
                  <div className={styles.horizontalConnector} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className={styles.processMobile}>
            {t.process.steps.map((step, index) => (
              <div key={index} className={styles.mobileStep}>
                <div className={styles.mobileStepLeft}>
                  <div className={styles.stepCircle}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                  </div>
                  {index < t.process.steps.length - 1 && (
                    <div className={styles.verticalConnector} aria-hidden="true" />
                  )}
                </div>
                <div className={styles.mobileStepContent}>
                  <p className={styles.stepLabel}>{step.label}</p>
                  <p className={styles.smallText}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={`${styles.smallText} ${styles.italic}`}>{t.process.closing}</p>
        </div>
      </section>

      {/* SECTION 5 — DECISION CLASSIFICATION (NO hover — Level 0) */}
      <section id="decision-classification" aria-labelledby="decision-classification-heading" className={styles.decision}>
        <div className={styles.container}>
          <h2 id="decision-classification-heading" className={styles.sectionHeading} style={{ marginBottom: "32px" }}>
            {t.decision.title}
          </h2>
          <div className={styles.decisionGrid}>
            {t.decision.categories.map((category) => (
              <div key={category.status} className={`${styles.decisionCard} ${statusClassMap[category.status]}`}>
                <h3 className={styles.decisionHeading}>{category.label}</h3>
                <p className={styles.smallText}>{category.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.disclaimerBox}>
            <p className={styles.smallText}>{t.decision.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROJECT TYPES */}
      <section id="project-types" aria-labelledby="project-types-heading" className={styles.projectTypes}>
        <div className={styles.container}>
          <h2 id="project-types-heading" className={styles.sectionHeading}>{t.projectTypes.title}</h2>
          <p className={styles.bodyText} style={{ marginBottom: "32px" }}>{t.projectTypes.intro}</p>
          <div className={styles.badgeWrap}>
            {t.projectTypes.types.map((type, index) => (
              <span key={index} className={styles.badge}>{type}</span>
            ))}
          </div>
          <p className={`${styles.smallText} ${styles.italic}`}>{t.projectTypes.closing}</p>
        </div>
      </section>

      {/* SECTION 7 — INDEPENDENCE (border-top separator) */}
      <section id="independence-principle" aria-labelledby="independence-principle-heading" className={styles.independence}>
        <div className={styles.narrowContainer}>
          <div className={styles.independenceBlock}>
            <h2 id="independence-principle-heading" className={styles.sectionHeading}>{t.independence.title}</h2>
            {t.independence.body.map((paragraph, index) => (
              <p key={index} className={styles.bodyText} style={{ marginBottom: "16px" }}>{paragraph}</p>
            ))}
            <p className={styles.independenceEmphasis}>
              {t.independence.emphasis.replace(/\.$/, "")}<span className={styles.seal}>.</span>
            </p>
          </div>
        </div>
      </section>

      {/* PHOTO BAND 2 */}
      <div className={styles.photoBandAlt} aria-hidden="true">
        Photo Placeholder
      </div>

      {/* SECTION 8 — STAKEHOLDERS (hover: Level 1) */}
      <section id="stakeholder-impact" aria-labelledby="stakeholder-impact-heading" className={styles.stakeholders}>
        <div className={styles.container}>
          <h2 id="stakeholder-impact-heading" className={styles.sectionHeading} style={{ marginBottom: "32px" }}>
            {t.stakeholders.title}
          </h2>
          <div className={styles.stakeholderGrid}>
            {t.stakeholders.items.map((item, index) => (
              <div key={index} className={styles.stakeholderCard}>
                <h3 className={styles.stakeholderHeading}>{item.audience}</h3>
                <p className={styles.smallText}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — CTA GOLD ZONE */}
      <section id="next-step" aria-labelledby="next-step-heading" className={styles.ctaBand}>
        <div className={styles.container}>
          <h2 id="next-step-heading" className={styles.ctaTitle}>{t.cta.title}</h2>
          <div className={styles.ctaFlex}>
            <div className={styles.ctaGroup}>
              <p className={styles.ctaDescription}>{t.cta.developerDescription}</p>
              <Link href={developerHref} className={styles.ctaPrimary}>{t.cta.developerCta}</Link>
            </div>
            <div className={styles.ctaGroup}>
              <p className={styles.ctaDescription}>{t.cta.investorDescription}</p>
              <Link href={investorHref} className={styles.ctaSecondary}>{t.cta.investorCta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — DISCLAIMER */}
      <section id="disclaimer" aria-labelledby="disclaimer-heading" className={styles.disclaimer}>
        <div className={styles.container}>
          <h2 id="disclaimer-heading" className={styles.srOnly}>
            {locale === "tr" ? "Yasal Uyar\u0131" : locale === "en" ? "Legal Disclaimer" : "Avertisment Legal"}
          </h2>
          <p className={styles.smallText}>{t.disclaimer}</p>
        </div>
      </section>
    </main>
  );
}
