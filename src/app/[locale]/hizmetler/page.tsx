import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import ServicesHero from '@/components/services/ServicesHero';
import MethodologyBlock from '@/components/services/MethodologyBlock';
import ServicesGrid from '@/components/services/ServicesGrid';
import RiskFramework from '@/components/services/RiskFramework';
import TrustSection from '@/components/services/TrustSection';
import CTASection from '@/components/services/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

/* ── Per-locale page content ── */
const pageContent = {
  tr: {
    meta: {
      title: 'Hizmetler | ATR Analizi ve Yatırımcı Tarafı Teknik İnceleme | AFA Energy Romania',
      description: 'Romanya yenilenebilir enerji projelerinde ATR Matrix metodolojisi ile şebeke fizibilite analizi ve banka finansmanına uygunluk değerlendirmesi hizmetleri.',
    },
    hero: {
      title: 'Hizmetler',
      subtitle: 'ATR Matrix metodolojisi ile yatırım öncesi teknik değerlendirme, şebeke fizibilite analizi ve banka finansmanına uygunluk raporlaması.',
    },
    navItems: [
      { label: 'ATR Analizi', sub: 'Şebeke Uyum Değerlendirmesi', anchor: 'asama-1' },
      { label: 'Teknik İnceleme', sub: 'Yatırımcı Tarafı Due Diligence', anchor: 'asama-2' },
      { label: 'Operasyonel Denetim', sub: 'Performans Analizi', anchor: 'asama-3' },
    ],
    methodology: {
      title: 'AFA ATR Matrix — Yatırım Öncesi Teknik Karar Filtresi',
      description: 'Amaç, projenin yatırım açısından ilerlenebilir olup olmadığını erken aşamada netleştirmektir. Her değerlendirme üç temel sütun üzerine kuruludur.',
      pillars: [
        { id: 'TEKNİK DOĞRULAMA', title: 'Şebeke Kapasitesi ve Tahliye Analizi', description: 'Bağlantı noktasının mevcut yükü ile yeni projenin şebekeye tahliye edilebilirliğinin teknik açıdan değerlendirilmesi.' },
        { id: 'MEVZUAT UYUMU', title: 'Regülasyon ve İzin Kontrolü', description: 'Teknik Bağlantı Onayı (ATR) ve ilgili izinlerin geçerlilik süreleri ile ANRE mevzuatına uyumunun doğrulanması.' },
        { id: 'FİNANSAL MODELLEME', title: 'Maliyet ve Risk Modelleme', description: 'Bağlantı maliyetinin teknik kapsamının doğrulanması; şebeke güçlendirme, kısıntı (curtailment) ve zaman gecikmesi risklerinin yatırım bütçesinde görünür hâle getirilmesi.' },
      ],
    },
    phases: [
      {
        id: 'phase-1',
        anchor: 'asama-1',
        tag: 'HİZMET 1',
        title: 'ATR Analizi ve Şebeke Uyum Değerlendirmesi',
        description: 'Teknik Bağlantı Onayı (ATR) belgesinin geçerlilik kontrolü, şebeke kapasitesi ön değerlendirmesi ve ANRE mevzuatına uyum taraması. Projenin yatırım açısından ilerlenebilir olup olmadığını erken aşamada netleştirir.',
        deliverables: [
          'ATR belge durumu ve geçerlilik kontrolü',
          'Bağlantı noktası ön kapasite değerlendirmesi',
          'ANRE regülasyon uyumluluk taraması',
          'İlerlenebilirlik kararı için özet rapor',
        ],
        decisionInputs: [
          { label: 'ATR Durumu', value: 'Geçerli / Süresi dolmuş / Başvuru aşamasında' },
          { label: 'Kapasite Uyumu', value: 'Bağlantı noktası yeterli / Güçlendirme gerekli' },
        ],
        riskNotes: [
          'ATR belgesinin süresi dolmuş olabilir; yenileme süreci 6-12 ay sürebilir.',
          'Bağlantı noktasındaki mevcut yük, yeni projeyi karşılayamayabilir.',
          'ANRE mevzuat değişiklikleri izin sürecini etkileyebilir.',
        ],
      },
      {
        id: 'phase-2',
        anchor: 'asama-2',
        tag: 'HİZMET 2',
        title: 'Yatırımcı Tarafı Teknik İnceleme',
        description: 'Şebeke bağlantı fizibilitesinin (grid feasibility) derinlemesine analizi. Kısıntı riski (curtailment), bağlantı maliyeti ve şebeke güçlendirme ihtiyacı modellenir. Yatırımcı perspektifinden bağımsız teknik inceleme.',
        deliverables: [
          'Şebeke tahliye kapasitesi detaylı analizi',
          'Kısıntı riski (curtailment) modelleme ve senaryolar',
          'Bağlantı maliyeti kırılımı (hat, trafo, güçlendirme)',
          'Şebeke güçlendirme zaman çizelgesi',
          'Teknik risk matrisi',
        ],
        decisionInputs: [
          { label: 'Kısıntı Riski', value: 'Düşük / Orta / Yüksek — yıllık üretim kaybı projeksiyonu' },
          { label: 'Bağlantı Maliyeti', value: 'Detaylı maliyet kırılımı ve bütçe etkisi' },
        ],
        riskNotes: [
          'Şebeke güçlendirme maliyeti başlangıç tahmininin 2-3 katına çıkabilir.',
          'Kısıntı oranı yıllık %5-15 arasında değişkenlik gösterebilir.',
          'Güçlendirme zaman çizelgesi 18-36 ay gecikme riski taşır.',
          'Komşu projelerin kümülatif etkisi kapasite hesabını değiştirebilir.',
        ],
      },
      {
        id: 'phase-3',
        anchor: 'asama-3',
        tag: 'HİZMET 3',
        title: 'Operasyonel Teknik Denetim ve Performans Analizi',
        description: 'Teknik bulguların banka finansmanına uygunluk kriterlerine göre yapılandırılmış raporlaması. IFC Performans Standartları ve Ekvator Prensipleri uyumlu format. Operasyonel performans denetimi ve optimizasyon önerileri.',
        deliverables: [
          'Banka finansmanına uygunluk değerlendirme raporu',
          'Borç Servis Karşılama Oranı (DSCR) projeksiyonlarına teknik girdi',
          'Risk matrisi ve azaltma önerileri',
          'Arazi ve izin belgelerinin teknik tutarlılık kontrolü',
          'Yatırım komitesi sunum paketi',
        ],
        decisionInputs: [
          { label: 'Finansman Uygunluk Skoru', value: 'İlerlenebilir / Koşullu İlerlenebilir / Bu Aşamada İlerlenemez' },
          { label: 'DSCR Etkisi', value: 'Teknik risklerin DSCR projeksiyonuna etkisi' },
        ],
        riskNotes: [
          'Arazi izinlerindeki tutarsızlıklar finansman sürecini durdurabilir.',
          'Teknik varsayımlar ile gerçek performans arasında sapma olabilir.',
          'Çevresel etki değerlendirmesi eksiklikleri ek maliyet yaratabilir.',
        ],
      },
    ],
    ctaLabel: 'Teknik Ön Değerlendirme Talebi',
    riskFramework: {
      title: 'Merkezi Risk ve Varsayım Çerçevesi',
      decisionTerms: {
        title: 'Karar Terminolojisi',
        terms: [
          { label: 'İlerlenebilir', description: 'Teknik açıdan yatırım kararına devam edilebilir. Kritik risk unsuru tespit edilmemiştir.' },
          { label: 'Koşullu İlerlenebilir', description: 'Belirli koşulların sağlanması kaydıyla ilerlenebilir. Koşullar raporda açıkça belirtilir.' },
          { label: 'Bu Aşamada İlerlenemez', description: 'Mevcut teknik veriler ışığında yatırım kararı için yeterli güvence oluşmamaktadır.' },
        ],
      },
      blocks: [
        {
          title: 'Çalışma Varsayımları',
          items: [
            'Değerlendirmeler, müşteri tarafından sağlanan verilere dayanır.',
            'Şebeke operatörü (Transelectrica / Distribuție) verileri referans alınır.',
            'Piyasa fiyat projeksiyonları bağımsız kaynaklardan doğrulanır.',
            'Regülasyon çerçevesi değerlendirme tarihi itibarıyla geçerli olan mevzuata dayanır.',
          ],
        },
        {
          title: 'Kapsam Sınırları',
          items: [
            'Çevresel etki değerlendirmesi (ÇED) bu kapsamda yer almaz.',
            'Hukuki due diligence ayrı bir iş kalemi olarak değerlendirilir.',
            'Ekipman tedarik ve EPC ihale süreçleri kapsam dışıdır.',
            'Arazi mülkiyet doğrulaması teknik tutarlılık kontrolü ile sınırlıdır.',
          ],
        },
        {
          title: 'Risk Yaklaşımı',
          items: [
            'Tüm riskler nicel ve nitel olarak sınıflandırılır.',
            'Her risk için olasılık ve etki değerlendirmesi yapılır.',
            'Azaltma önerileri somut ve uygulanabilir formatta sunulur.',
            'Risk matrisi yatırım komitesi formatına uygun olarak hazırlanır.',
          ],
        },
      ],
    },
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
      description: 'Grid feasibility and bankability assessment services for renewable energy projects in Romania using the ATR Matrix methodology.',
    },
    hero: {
      title: 'Services',
      subtitle: 'Pre-investment technical assessment, grid feasibility analysis, and bank-financeable reporting using the ATR Matrix methodology.',
    },
    navItems: [
      { label: 'ATR Analysis', sub: 'Grid Compliance Assessment', anchor: 'asama-1' },
      { label: 'Technical Review', sub: 'Investor-Side Due Diligence', anchor: 'asama-2' },
      { label: 'Operational Audit', sub: 'Performance Analysis', anchor: 'asama-3' },
    ],
    methodology: {
      title: 'AFA ATR Matrix — Pre-Investment Technical Decision Filter',
      description: 'The goal is to clarify early whether a project is viable from an investment perspective. Each assessment is built on three core pillars.',
      pillars: [
        { id: 'TECHNICAL VALIDATION', title: 'Grid Capacity & Evacuation Analysis', description: 'Technical assessment of the connection point\'s existing load and the new project\'s grid evacuation feasibility.' },
        { id: 'REGULATORY COMPLIANCE', title: 'Regulation & Permit Verification', description: 'Verification of Technical Connection Approval (ATR) and related permits\' validity periods and ANRE regulatory compliance.' },
        { id: 'FINANCIAL MODELING', title: 'Cost & Risk Modeling', description: 'Verification of connection cost technical scope; making grid reinforcement, curtailment, and delay risks visible in the investment budget.' },
      ],
    },
    phases: [
      {
        id: 'phase-1',
        anchor: 'asama-1',
        tag: 'SERVICE 1',
        title: 'ATR Analysis & Grid Compliance Assessment',
        description: 'Technical Connection Approval (ATR) document validity check, grid capacity pre-assessment, and ANRE regulatory compliance scan. Clarifies early whether a project is investable.',
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
        riskNotes: [
          'ATR document may have expired; renewal process can take 6-12 months.',
          'Existing load at connection point may not accommodate the new project.',
          'ANRE regulatory changes may affect the permitting process.',
        ],
      },
      {
        id: 'phase-2',
        anchor: 'asama-2',
        tag: 'SERVICE 2',
        title: 'Investor-Side Technical Review',
        description: 'In-depth grid connection feasibility analysis. Curtailment risk, connection cost, and grid reinforcement needs are modeled. Independent technical review from the investor perspective.',
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
        riskNotes: [
          'Grid reinforcement cost may escalate 2-3x beyond initial estimates.',
          'Curtailment rate may vary between 5-15% annually.',
          'Reinforcement timeline carries 18-36 month delay risk.',
          'Cumulative impact of neighboring projects may alter capacity calculations.',
        ],
      },
      {
        id: 'phase-3',
        anchor: 'asama-3',
        tag: 'SERVICE 3',
        title: 'Operational Technical Audit & Performance Analysis',
        description: 'Structured reporting of technical findings per bank financing eligibility criteria. IFC Performance Standards and Equator Principles compliant format. Operational performance audit and optimization recommendations.',
        deliverables: [
          'Bank financing eligibility assessment report',
          'Technical input for DSCR projections',
          'Risk matrix and mitigation recommendations',
          'Land and permit documentation technical consistency check',
          'Investment committee presentation package',
        ],
        decisionInputs: [
          { label: 'Financing Eligibility Score', value: 'Proceed / Conditionally Proceed / Cannot Proceed at This Stage' },
          { label: 'DSCR Impact', value: 'Impact of technical risks on DSCR projections' },
        ],
        riskNotes: [
          'Land permit inconsistencies may halt the financing process.',
          'Deviation between technical assumptions and actual performance is possible.',
          'Environmental impact assessment gaps may create additional costs.',
        ],
      },
    ],
    ctaLabel: 'Request Technical Pre-Assessment',
    riskFramework: {
      title: 'Central Risk & Assumption Framework',
      decisionTerms: {
        title: 'Decision Terminology',
        terms: [
          { label: 'Proceed', description: 'Technically viable for investment decision. No critical risk factors identified.' },
          { label: 'Conditionally Proceed', description: 'May proceed subject to specific conditions being met. Conditions are clearly stated in the report.' },
          { label: 'Cannot Proceed at This Stage', description: 'Current technical data does not provide sufficient assurance for an investment decision.' },
        ],
      },
      blocks: [
        {
          title: 'Working Assumptions',
          items: [
            'Assessments are based on data provided by the client.',
            'Grid operator (Transelectrica / Distribution) data is used as reference.',
            'Market price projections are verified from independent sources.',
            'Regulatory framework is based on legislation valid as of the assessment date.',
          ],
        },
        {
          title: 'Scope Boundaries',
          items: [
            'Environmental impact assessment (EIA) is not included in this scope.',
            'Legal due diligence is treated as a separate work item.',
            'Equipment procurement and EPC tender processes are out of scope.',
            'Land ownership verification is limited to technical consistency checks.',
          ],
        },
        {
          title: 'Risk Approach',
          items: [
            'All risks are classified quantitatively and qualitatively.',
            'Probability and impact assessment is performed for each risk.',
            'Mitigation recommendations are presented in actionable format.',
            'Risk matrix is prepared in investment committee-ready format.',
          ],
        },
      ],
    },
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
      description: 'Servicii de fezabilitate a rețelei și evaluare a bancabilității pentru proiecte de energie regenerabilă în România folosind metodologia ATR Matrix.',
    },
    hero: {
      title: 'Servicii',
      subtitle: 'Evaluare tehnică pre-investiție, analiză de fezabilitate a rețelei și raportare conformă cu finanțarea bancară folosind metodologia ATR Matrix.',
    },
    navItems: [
      { label: 'Analiză ATR', sub: 'Evaluare Conformitate Rețea', anchor: 'asama-1' },
      { label: 'Revizuire Tehnică', sub: 'Due Diligence Investitor', anchor: 'asama-2' },
      { label: 'Audit Operațional', sub: 'Analiză Performanță', anchor: 'asama-3' },
    ],
    methodology: {
      title: 'AFA ATR Matrix — Filtru de Decizie Tehnică Pre-Investiție',
      description: 'Scopul este de a clarifica din timp dacă un proiect este viabil din perspectiva investiției. Fiecare evaluare este construită pe trei piloni fundamentali.',
      pillars: [
        { id: 'VALIDARE TEHNICĂ', title: 'Analiza Capacității Rețelei și Evacuării', description: 'Evaluarea tehnică a sarcinii existente a punctului de conectare și a fezabilității evacuării în rețea a noului proiect.' },
        { id: 'CONFORMITATE REGLEMENTARĂ', title: 'Verificarea Reglementărilor și Autorizațiilor', description: 'Verificarea Avizului Tehnic de Racordare (ATR) și a perioadelor de valabilitate ale autorizațiilor conexe și conformitatea cu reglementările ANRE.' },
        { id: 'MODELARE FINANCIARĂ', title: 'Modelarea Costurilor și Riscurilor', description: 'Verificarea domeniului tehnic al costurilor de conectare; vizibilizarea riscurilor de întărire a rețelei, curtailment și întârziere în bugetul de investiții.' },
      ],
    },
    phases: [
      {
        id: 'phase-1',
        anchor: 'asama-1',
        tag: 'SERVICIU 1',
        title: 'Analiză ATR și Evaluare Conformitate Rețea',
        description: 'Verificarea valabilității documentului Aviz Tehnic de Racordare (ATR), pre-evaluarea capacității rețelei și scanarea conformității cu reglementările ANRE.',
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
        riskNotes: [
          'Documentul ATR poate fi expirat; procesul de reînnoire poate dura 6-12 luni.',
          'Sarcina existentă la punctul de conectare poate fi insuficientă.',
          'Modificările reglementărilor ANRE pot afecta procesul de autorizare.',
        ],
      },
      {
        id: 'phase-2',
        anchor: 'asama-2',
        tag: 'SERVICIU 2',
        title: 'Revizuire Tehnică din Partea Investitorului',
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
        riskNotes: [
          'Costul de întărire a rețelei poate crește de 2-3 ori față de estimarea inițială.',
          'Rata de curtailment poate varia între 5-15% anual.',
          'Cronologia întăririi prezintă risc de întârziere de 18-36 luni.',
          'Impactul cumulativ al proiectelor vecine poate modifica calculele de capacitate.',
        ],
      },
      {
        id: 'phase-3',
        anchor: 'asama-3',
        tag: 'SERVICIU 3',
        title: 'Audit Tehnic Operațional și Analiză de Performanță',
        description: 'Raportare structurată a constatărilor tehnice conform criteriilor de eligibilitate pentru finanțare bancară. Format conform IFC Performance Standards și Equator Principles.',
        deliverables: [
          'Raport de evaluare a eligibilității pentru finanțare bancară',
          'Input tehnic pentru proiecțiile DSCR',
          'Matrice de risc și recomandări de atenuare',
          'Verificarea consistenței tehnice a documentației de teren și autorizații',
          'Pachet de prezentare pentru comitetul de investiții',
        ],
        decisionInputs: [
          { label: 'Scor Eligibilitate', value: 'Se poate continua / Continuare condiționată / Nu se poate continua în această etapă' },
          { label: 'Impact DSCR', value: 'Impactul riscurilor tehnice asupra proiecțiilor DSCR' },
        ],
        riskNotes: [
          'Inconsistențele în autorizațiile de teren pot bloca procesul de finanțare.',
          'Poate exista o abatere între ipotezele tehnice și performanța reală.',
          'Lacunele în evaluarea impactului de mediu pot genera costuri suplimentare.',
        ],
      },
    ],
    ctaLabel: 'Solicitați Evaluare Tehnică Preliminară',
    riskFramework: {
      title: 'Cadrul Central de Risc și Ipoteze',
      decisionTerms: {
        title: 'Terminologie Decizională',
        terms: [
          { label: 'Se poate continua', description: 'Viabil din punct de vedere tehnic pentru decizia de investiție. Nu au fost identificați factori de risc critici.' },
          { label: 'Continuare condiționată', description: 'Se poate continua sub rezerva îndeplinirii condițiilor specifice. Condițiile sunt clar precizate în raport.' },
          { label: 'Nu se poate continua în această etapă', description: 'Datele tehnice actuale nu oferă suficientă asigurare pentru o decizie de investiție.' },
        ],
      },
      blocks: [
        {
          title: 'Ipoteze de Lucru',
          items: [
            'Evaluările se bazează pe datele furnizate de client.',
            'Datele operatorului de rețea (Transelectrica / Distribuție) sunt utilizate ca referință.',
            'Proiecțiile prețurilor de piață sunt verificate din surse independente.',
            'Cadrul de reglementare se bazează pe legislația valabilă la data evaluării.',
          ],
        },
        {
          title: 'Limite de Domeniu',
          items: [
            'Evaluarea impactului asupra mediului (EIM) nu este inclusă în acest domeniu.',
            'Due diligence juridic este tratat ca un element de lucru separat.',
            'Procesele de achiziție echipamente și licitații EPC sunt în afara domeniului.',
            'Verificarea proprietății terenului se limitează la verificări de consistență tehnică.',
          ],
        },
        {
          title: 'Abordarea Riscului',
          items: [
            'Toate riscurile sunt clasificate cantitativ și calitativ.',
            'Se efectuează evaluarea probabilității și impactului pentru fiecare risc.',
            'Recomandările de atenuare sunt prezentate în format acționabil.',
            'Matricea de risc este pregătită în format compatibil cu comitetul de investiții.',
          ],
        },
      ],
    },
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

      <RiskFramework
        title={content.riskFramework.title}
        decisionTerms={content.riskFramework.decisionTerms}
        blocks={content.riskFramework.blocks}
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
