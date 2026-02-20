import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import ServicesHero from '@/components/services/ServicesHero';
import MethodologyBlock from '@/components/services/MethodologyBlock';
import ServicesGrid from '@/components/services/ServicesGrid';
import TrustSection from '@/components/services/TrustSection';
import CTASection from '@/components/services/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

/* ── Per-locale page content ── */
const pageContent = {
  tr: {
    meta: {
      title: 'Hizmetler | ATR Analizi ve Yatırımcı Tarafı Teknik İnceleme | AFA Energy Romania',
      description: 'Romanya yenilenebilir enerji projelerinde ATR Matrix™ metodolojisi ile grid feasibility ve bankability assessment hizmetleri.',
    },
    hero: {
      title: 'Hizmetler',
      subtitle: 'ATR Matrix™ metodolojisi ile yatırım öncesi teknik değerlendirme, şebeke fizibilite analizi ve banka finansmanına uygunluk raporlaması.',
    },
    navItems: [
      { label: 'Aşama 1 — Ön Değerlendirme', anchor: 'asama-1' },
      { label: 'Aşama 2 — Teknik Analiz', anchor: 'asama-2' },
      { label: 'Aşama 3 — Raporlama', anchor: 'asama-3' },
    ],
    methodology: {
      title: 'AFA ATR Matrix™ — Yatırım Öncesi Teknik Karar Filtresi',
      description: 'Amaç, projenin yatırım açısından ilerlenebilir olup olmadığını erken aşamada netleştirmektir. Her değerlendirme üç temel sütun üzerine kuruludur.',
      pillars: [
        { id: 'TEKNİK DOĞRULAMA', title: 'Şebeke Kapasitesi ve Tahliye Analizi', description: 'Bağlantı noktasının mevcut yükü ile yeni projenin şebekeye tahliye edilebilirliğinin teknik açıdan değerlendirilmesi.' },
        { id: 'MEVZUAT UYUMU', title: 'Regülasyon ve İzin Kontrolü', description: 'Teknik Bağlantı Onayı (ATR) ve ilgili izinlerin geçerlilik süreleri ile ANRE mevzuatına uyumunun doğrulanması.' },
        { id: 'FİNANSAL MODELLEME', title: 'Maliyet ve Risk Modelleme', description: 'Bağlantı maliyetinin teknik kapsamının doğrulanması; şebeke güçlendirme, kısıntı ve zaman gecikmesi risklerinin yatırım bütçesinde görünür hâle getirilmesi.' },
      ],
    },
    phases: [
      {
        id: 'phase-1',
        anchor: 'asama-1',
        tag: 'AŞAMA 1',
        title: 'Ön Teknik Değerlendirme (Pre-Screening)',
        description: 'Projenin yatırım açısından ilerlenebilir olup olmadığını erken aşamada netleştiren hızlı teknik filtre. ATR durumu, şebeke kapasitesi ve temel regülasyon uyumu kontrol edilir.',
        deliverables: [
          'ATR belge durumu ve geçerlilik kontrolü',
          'Bağlantı noktası ön kapasite değerlendirmesi',
          'ANRE regülasyon uyumluluk taraması',
          'İlerleme / Durdurma kararı için özet rapor',
        ],
        decisionInputs: [
          { label: 'ATR Durumu', value: 'Geçerli / Süresi dolmuş / Başvuru aşamasında' },
          { label: 'Kapasite Uyumu', value: 'Bağlantı noktası yeterli / Güçlendirme gerekli' },
        ],
      },
      {
        id: 'phase-2',
        anchor: 'asama-2',
        tag: 'AŞAMA 2',
        title: 'Detaylı Teknik Analiz (Grid Feasibility)',
        description: 'Şebeke bağlantı fizibilitesinin derinlemesine analizi. Curtailment riski, bağlantı maliyeti ve şebeke güçlendirme ihtiyacı modellenir.',
        deliverables: [
          'Şebeke tahliye kapasitesi detaylı analizi',
          'Curtailment risk modelleme ve senaryolar',
          'Bağlantı maliyeti kırılımı (hat, trafo, güçlendirme)',
          'Şebeke güçlendirme zaman çizelgesi',
          'Teknik risk matrisi',
        ],
        decisionInputs: [
          { label: 'Curtailment Riski', value: 'Düşük / Orta / Yüksek — yıllık üretim kaybı projeksiyonu' },
          { label: 'Bağlantı Maliyeti', value: 'Detaylı maliyet kırılımı ve bütçe etkisi' },
        ],
      },
      {
        id: 'phase-3',
        anchor: 'asama-3',
        tag: 'AŞAMA 3',
        title: 'Banka Finansmanına Uygunluk Raporlaması',
        description: 'Teknik bulguların banka finansmanına uygunluk kriterlerine göre yapılandırılmış raporlaması. IFC Performance Standards ve Equator Principles uyumlu format.',
        deliverables: [
          'Banka finansmanına uygunluk değerlendirme raporu',
          'DSCR projeksiyonlarına teknik girdi',
          'Risk matrisi ve azaltma önerileri',
          'Arazi ve izin belgelerinin teknik tutarlılık kontrolü',
          'Yatırım komitesi sunum paketi',
        ],
        decisionInputs: [
          { label: 'Finansman Uygunluk Skoru', value: 'Uygun / Koşullu uygun / Uygun değil' },
          { label: 'DSCR Etkisi', value: 'Teknik risklerin DSCR projeksiyonuna etkisi' },
        ],
      },
    ],
    ctaLabel: 'Teknik Ön Değerlendirme Talebi',
    trust: {
      title: 'Bağımsızlık ve Satıcı Tarafsızlığı',
      statements: [
        'AFA Energy, proje geliştirici, EPC yüklenicisi veya ekipman tedarikçisi değildir.',
        'Herhangi bir satıcı tarafıyla ticari ilişkisi yoktur; komisyon veya yönlendirme ücreti almaz.',
        'Tüm değerlendirmeler yatırımcı tarafı perspektifinden, bağımsız olarak yürütülür.',
        'Teknik bulgular, çıkar çatışmasından arındırılmış şekilde raporlanır.',
      ],
      closing: 'Bu yapısal bağımsızlık, teknik değerlendirmelerin tarafsızlığını garanti eder ve yatırımcının karar sürecini korur.',
    },
    cta: {
      title: 'Teknik Ön Değerlendirme Talebi',
      subtitle: 'Projenizin teknik fizibilitesini bağımsız olarak değerlendirmek için formu doldurun. İlk geri dönüş 48 saat içinde yapılır.',
    },
  },
  en: {
    meta: {
      title: 'Services | ATR Analysis & Investor-Side Technical Review | AFA Energy Romania',
      description: 'Grid feasibility and bankability assessment services for renewable energy projects in Romania using the ATR Matrix™ methodology.',
    },
    hero: {
      title: 'Services',
      subtitle: 'Pre-investment technical assessment, grid feasibility analysis, and bank-financeable reporting using the ATR Matrix™ methodology.',
    },
    navItems: [
      { label: 'Phase 1 — Pre-Screening', anchor: 'asama-1' },
      { label: 'Phase 2 — Technical Analysis', anchor: 'asama-2' },
      { label: 'Phase 3 — Reporting', anchor: 'asama-3' },
    ],
    methodology: {
      title: 'AFA ATR Matrix™ — Pre-Investment Technical Decision Filter',
      description: 'The goal is to clarify early whether a project is viable from an investment perspective. Each assessment is built on three core pillars.',
      pillars: [
        { id: 'PILLAR 1', title: 'Grid Capacity & Evacuation Analysis', description: 'Technical assessment of the connection point\'s existing load and the new project\'s grid evacuation feasibility.' },
        { id: 'PILLAR 2', title: 'Regulation & Permit Verification', description: 'Verification of Technical Connection Approval (ATR) and related permits\' validity periods and ANRE regulatory compliance.' },
        { id: 'PILLAR 3', title: 'Cost & Risk Modeling', description: 'Verification of connection cost technical scope; making grid reinforcement, curtailment, and delay risks visible in the investment budget.' },
      ],
    },
    phases: [
      {
        id: 'phase-1',
        anchor: 'asama-1',
        tag: 'PHASE 1',
        title: 'Pre-Technical Screening',
        description: 'A rapid technical filter to clarify early whether a project is viable from an investment perspective. ATR status, grid capacity, and basic regulatory compliance are checked.',
        deliverables: [
          'ATR document status and validity check',
          'Connection point preliminary capacity assessment',
          'ANRE regulatory compliance scan',
          'Go / No-Go summary report',
        ],
        decisionInputs: [
          { label: 'ATR Status', value: 'Valid / Expired / Application stage' },
          { label: 'Capacity Fit', value: 'Connection point sufficient / Reinforcement needed' },
        ],
      },
      {
        id: 'phase-2',
        anchor: 'asama-2',
        tag: 'PHASE 2',
        title: 'Detailed Technical Analysis (Grid Feasibility)',
        description: 'In-depth analysis of grid connection feasibility. Curtailment risk, connection cost, and grid reinforcement needs are modeled.',
        deliverables: [
          'Grid evacuation capacity detailed analysis',
          'Curtailment risk modeling and scenarios',
          'Connection cost breakdown (line, transformer, reinforcement)',
          'Grid reinforcement timeline',
          'Technical risk matrix',
        ],
        decisionInputs: [
          { label: 'Curtailment Risk', value: 'Low / Medium / High — annual production loss projection' },
          { label: 'Connection Cost', value: 'Detailed cost breakdown and budget impact' },
        ],
      },
      {
        id: 'phase-3',
        anchor: 'asama-3',
        tag: 'PHASE 3',
        title: 'Bankability Reporting',
        description: 'Structured reporting of technical findings per bank financing eligibility criteria. IFC Performance Standards and Equator Principles compliant format.',
        deliverables: [
          'Bank financing eligibility assessment report',
          'Technical input for DSCR projections',
          'Risk matrix and mitigation recommendations',
          'Land and permit documentation technical consistency check',
          'Investment committee presentation package',
        ],
        decisionInputs: [
          { label: 'Bankability Score', value: 'Eligible / Conditionally eligible / Not eligible' },
          { label: 'DSCR Impact', value: 'Impact of technical risks on DSCR projections' },
        ],
      },
    ],
    ctaLabel: 'Request Technical Pre-Assessment',
    trust: {
      title: 'Independence & Vendor Neutrality',
      statements: [
        'AFA Energy is not a project developer, EPC contractor, or equipment supplier.',
        'It has no commercial relationship with any vendor party; it does not receive commissions or referral fees.',
        'All assessments are conducted independently from an investor-side perspective.',
        'Technical findings are reported free from conflicts of interest.',
      ],
      closing: 'This structural independence guarantees the impartiality of technical assessments and protects the investor\'s decision-making process.',
    },
    cta: {
      title: 'Request Technical Pre-Assessment',
      subtitle: 'Fill out the form to have your project\'s technical feasibility independently assessed. Initial response within 48 hours.',
    },
  },
  ro: {
    meta: {
      title: 'Servicii | Analiză ATR și Revizuire Tehnică din Partea Investitorului | AFA Energy Romania',
      description: 'Servicii de fezabilitate a rețelei și evaluare a bancabilității pentru proiecte de energie regenerabilă în România folosind metodologia ATR Matrix™.',
    },
    hero: {
      title: 'Servicii',
      subtitle: 'Evaluare tehnică pre-investiție, analiză de fezabilitate a rețelei și raportare conformă cu finanțarea bancară folosind metodologia ATR Matrix™.',
    },
    navItems: [
      { label: 'Faza 1 — Pre-Screening', anchor: 'asama-1' },
      { label: 'Faza 2 — Analiză Tehnică', anchor: 'asama-2' },
      { label: 'Faza 3 — Raportare', anchor: 'asama-3' },
    ],
    methodology: {
      title: 'AFA ATR Matrix™ — Filtru de Decizie Tehnică Pre-Investiție',
      description: 'Scopul este de a clarifica din timp dacă un proiect este viabil din perspectiva investiției. Fiecare evaluare este construită pe trei piloni fundamentali.',
      pillars: [
        { id: 'PILON 1', title: 'Analiza Capacității Rețelei și Evacuării', description: 'Evaluarea tehnică a sarcinii existente a punctului de conectare și a fezabilității evacuării în rețea a noului proiect.' },
        { id: 'PILON 2', title: 'Verificarea Reglementărilor și Autorizațiilor', description: 'Verificarea Avizului Tehnic de Racordare (ATR) și a perioadelor de valabilitate ale autorizațiilor conexe și conformitatea cu reglementările ANRE.' },
        { id: 'PILON 3', title: 'Modelarea Costurilor și Riscurilor', description: 'Verificarea domeniului tehnic al costurilor de conectare; vizibilizarea riscurilor de întărire a rețelei, curtailment și întârziere în bugetul de investiții.' },
      ],
    },
    phases: [
      {
        id: 'phase-1',
        anchor: 'asama-1',
        tag: 'FAZA 1',
        title: 'Pre-Screening Tehnic',
        description: 'Un filtru tehnic rapid pentru a clarifica din timp dacă un proiect este viabil din perspectiva investiției. Se verifică statutul ATR, capacitatea rețelei și conformitatea reglementară de bază.',
        deliverables: [
          'Verificarea statutului și valabilității documentului ATR',
          'Evaluarea preliminară a capacității punctului de conectare',
          'Scanarea conformității cu reglementările ANRE',
          'Raport sumar Go / No-Go',
        ],
        decisionInputs: [
          { label: 'Statut ATR', value: 'Valid / Expirat / În faza de aplicare' },
          { label: 'Potrivire Capacitate', value: 'Punct de conectare suficient / Întărire necesară' },
        ],
      },
      {
        id: 'phase-2',
        anchor: 'asama-2',
        tag: 'FAZA 2',
        title: 'Analiză Tehnică Detaliată (Fezabilitate Rețea)',
        description: 'Analiză aprofundată a fezabilității conectării la rețea. Se modelează riscul de curtailment, costul de conectare și necesitățile de întărire a rețelei.',
        deliverables: [
          'Analiză detaliată a capacității de evacuare în rețea',
          'Modelarea riscului de curtailment și scenarii',
          'Defalcarea costurilor de conectare (linie, transformator, întărire)',
          'Cronologia întăririi rețelei',
          'Matricea de risc tehnic',
        ],
        decisionInputs: [
          { label: 'Risc Curtailment', value: 'Scăzut / Mediu / Ridicat — proiecția pierderii anuale de producție' },
          { label: 'Cost Conectare', value: 'Defalcare detaliată a costurilor și impactul bugetar' },
        ],
      },
      {
        id: 'phase-3',
        anchor: 'asama-3',
        tag: 'FAZA 3',
        title: 'Raportare Bancabilitate',
        description: 'Raportare structurată a constatărilor tehnice conform criteriilor de eligibilitate pentru finanțare bancară. Format conform IFC Performance Standards și Equator Principles.',
        deliverables: [
          'Raport de evaluare a eligibilității pentru finanțare bancară',
          'Input tehnic pentru proiecțiile DSCR',
          'Matrice de risc și recomandări de atenuare',
          'Verificarea consistenței tehnice a documentației de teren și autorizații',
          'Pachet de prezentare pentru comitetul de investiții',
        ],
        decisionInputs: [
          { label: 'Scor Bancabilitate', value: 'Eligibil / Eligibil condiționat / Neeligibil' },
          { label: 'Impact DSCR', value: 'Impactul riscurilor tehnice asupra proiecțiilor DSCR' },
        ],
      },
    ],
    ctaLabel: 'Solicitați Evaluare Tehnică Preliminară',
    trust: {
      title: 'Independență și Neutralitate față de Furnizori',
      statements: [
        'AFA Energy nu este dezvoltator de proiecte, contractor EPC sau furnizor de echipamente.',
        'Nu are nicio relație comercială cu nicio parte vânzătoare; nu primește comisioane sau taxe de recomandare.',
        'Toate evaluările sunt efectuate independent din perspectiva investitorului.',
        'Constatările tehnice sunt raportate fără conflicte de interese.',
      ],
      closing: 'Această independență structurală garantează imparțialitatea evaluărilor tehnice și protejează procesul decizional al investitorului.',
    },
    cta: {
      title: 'Solicitați Evaluare Tehnică Preliminară',
      subtitle: 'Completați formularul pentru a avea fezabilitatea tehnică a proiectului dumneavoastră evaluată independent. Răspuns inițial în 48 de ore.',
    },
  },
} as const;

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const { meta } = pageContent[validLocale];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}/${validLocale}/hizmetler`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/hizmetler`]),
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${validLocale}/hizmetler`,
      siteName: 'AFA Energy Romania',
      type: 'website',
    },
  };
}

/* ── Static Params ── */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ── Page ── */
interface HizmetlerPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HizmetlerPage({ params }: HizmetlerPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const content = pageContent[locale];

  return (
    <>
      <ServicesHero
        locale={locale}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        navItems={content.navItems}
      />

      <MethodologyBlock
        title={content.methodology.title}
        description={content.methodology.description}
        pillars={content.methodology.pillars}
      />

      <ServicesGrid
        locale={locale}
        phases={content.phases}
        ctaLabel={content.ctaLabel}
      />

      <TrustSection
        title={content.trust.title}
        statements={content.trust.statements}
        closing={content.trust.closing}
      />

      <CTASection
        locale={locale}
        title={content.cta.title}
        subtitle={content.cta.subtitle}
        ctaLabel={content.ctaLabel}
      />
    </>
  );
}
