import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Locale, locales, defaultLocale } from "@/lib/i18n";
import { LOCALE_PATHS } from "@/lib/routes";
import styles from "./ServicesPage.module.css";
import { SITE_URL } from "@/lib/env";
import ServicesFormInline from "./ServicesFormInline";

/* ── v11.2 Institutional accent color sequence ── */
const ACCENT_CLASSES = [
  styles.accentDeepGreen,  // 01: #18625F
  styles.accentJonquil,    // 02: #FFCB00
  styles.accentDeepGreen,  // 03: #18625F
  styles.accentVerdigris,  // 04: #28AFB0
  styles.accentRisk,       // 05: #F25F5C
] as const;

/* ── Title color per accent ── */
const TITLE_COLORS = [
  "#18625F",  // 01
  "#FFCB00",  // 02
  "#18625F",  // 03
  "#28AFB0",  // 04
  "#F25F5C",  // 05
] as const;

/* ── Number color per accent ── */
const NUMBER_COLORS = TITLE_COLORS;

/* ── Service photos (180×180 descriptive) ── */
const SERVICE_PHOTOS = [
  "/images/service-tdd.svg",
  "/images/service-atr.svg",
  "/images/service-permit.svg",
] as const;

/* ── Canonical yardımcı fonksiyonlar ── */
const canonicalFromFullPath = (path: string): string => `${SITE_URL}${path}`;
const alternatesFromLocalePaths = (paths: Record<Locale, string>) => {
  const languages: Record<string, string> = {};
  Object.entries(paths).forEach(([locale, path]) => {
    languages[locale] = `${SITE_URL}${path}`;
  });
  return languages;
};

/* ── Dil bazlı sayfa içeriği ── */
const pageContent = {
  tr: {
    meta: {
      title: "Hizmetlerimiz | AFA Energy Romania - Teknik Doğrulama Standartları",
      description:
        "Yenilenebilir enerji projelerinde Teknik İnceleme, mevzuat uyumu ve ATR Matrix™ bazlı risk analizi.",
    },
    breadcrumbHome: "Ana Sayfa",
    breadcrumbSelf: "Hizmetler",
    hero: {
      motto: "Yatırımdan Önce Netlik.",
      title: "Teknik Doğrulama Hizmetleri.",
      subtitle:
        "AFA, Romanya'da ATR Matrix™ metodolojisi ile incelediği yatırıma uygun projeleri yatırımcılara sunar. Her proje, banka finansmanına uygunluk standardında doğrulanmıştır.",
      cta: "Yatırıma Uygun Projeleri Keşfet",
      axes: [
        { label: "Eksen 1", title: "Şebeke Entegrasyonu" },
        { label: "Eksen 2", title: "Finansal Dayanıklılık" },
        { label: "Eksen 3", title: "Yasal Uyum" },
      ],
    },
    legalDisclaimer: {
      title: "Hukuki Kapsam ve Kullanım Notu",
      items: [
        "Bu sayfadaki içerikler, yatırım kararını destekleyen bağımsız teknik değerlendirme çerçevesini açıklar; hukuki görüş veya bağlayıcı taahhüt niteliği taşımaz.",
        "Her çalışma, veri olgunluğu ve kapsamına göre yapılandırılır; nihai teslimat formatı ve kapsam, yazılı teklif ve hizmet sözleşmesi ile netleştirilir.",
        "Takvim ve maliyet kabulleri, yalnızca sağlanan veri seti üzerinden yapılan teknik değerlendirmeye dayanır; kesin sonuç veya garanti anlamına gelmez.",
        "Gizlilik sözleşmesi öncesinde; bağlantı noktası, koordinat ve satıcı kimliği gibi kritik proje verileri paylaşılmadan çalışılır.",
        "Talep iletiminde kullanılacak tek kanal, sayfa altındaki formdur; form bilgileri ön filtreleme amacıyla değerlendirilir.",
      ],
      note:
        "Not: Yanıt süresi hedefi, talep yoğunluğu ve veri bütünlüğüne bağlı olarak yazılı teklif aşamasında belirlenir.",
    },
    services: [
      {
        number: "01",
        title: "Teknik İnceleme (Teknik Durum Tespiti)",
        desc: "Satın alma öncesi tasarım, ekipman seçimi ve maliyet varsayımlarını banka standartlarıyla uyum açısından stres testine tabi tutarız.",
        atrInput: "Banka finansmanına uygunluk ve teknik gerçeklik.",
        inputs: [
          "Tek hat şeması ve yerleşim planları (varsa)",
          "Ekipman listesi ve teknik föyler",
          "Üretim simülasyonu ve performans varsayımları",
          "Maliyet varsayımları (yatırım harcaması ve işletme gideri)",
          "Saha/topografya ve zemin verisi (varsa)",
        ],
        deliverables: [
          "Teknik bulgu ve kırmızı bayrak özeti",
          "Maliyet ve tasarım varsayımlarına ilişkin teknik gerekçeli not",
          "Sözleşme metinleri için teknik koruma önerileri (müzakere girdisi)",
        ],
        whenToUse:
          "Satın alma kararı gündemdeyken; tasarım ve maliyet varsayımlarının yatırım komitesi seviyesinde doğrulanması gerektiğinde.",
      },
      {
        number: "02",
        title: "ATR ve Şebeke Analizi",
        desc: "Şebeke bağlantı şartlarının (ATR) teknik analizi, kapasite kısıtları ve bağlantı takviminin yatırım planıyla uyumunun doğrulanması.",
        atrInput: "Şebeke aktarım kapasitesi ve bağlantı takvimi gerçekliği.",
        inputs: [
          "ATR belgesi veya ATR başvuru dosyası (varsa)",
          "Dağıtım şebekesi işletmecisi ve iletim şebekesi işletmecisi yazışmaları (varsa)",
          "Bağlantı seviyesi ve bağlantı varsayımları",
          "Proje lokasyonu (il/bölge bazında)",
          "Trafo merkezi ve hat kapasitesi hakkında mevcut kamuya açık bilgiler (varsa)",
        ],
        deliverables: [
          "ATR teknik okuma ve uygulanabilirlik değerlendirmesi",
          "Üretim kısıtı (curtailment) olasılığına ilişkin teknik senaryo notu",
          "Kritik takip noktaları ve yol haritası (teknik odaklı)",
        ],
        whenToUse:
          "ATR alınmış veya başvurusu yapılmış projelerde; bağlantı maliyeti ve bağlantı takvimi belirsizliği yatırım değerini etkileyebilecekse.",
      },
      {
        number: "03",
        title: "Mevzuat ve İzin Denetimi",
        desc: "Romanya düzenleyici çerçevesine (ANRE) uyum ve izin akışının yatırım güvenliği açısından hiyerarşik kontrolü.",
        atrInput: "Mevzuat uyumu ve izin akışı tutarlılığı.",
        inputs: [
          "İzin listesi ve mevcut durum özeti (varsa)",
          "Arazi kullanım statüsü ve mülkiyet bilgisi (gizlilik sınırında)",
          "Çevresel ve yerel izin süreçlerine dair mevcut dokümanlar (varsa)",
          "Başvuru/yanıt yazışmaları (varsa)",
          "Takvim varsayımları ve kritik bağımlılıklar",
        ],
        deliverables: [
          "İzin akışı tutarlılık kontrol notu",
          "Belge eksikliği ve risk yoğunlaşma noktaları listesi",
          "Yatırımcı kararına uygun, takip edilebilir izin yol haritası",
        ],
        whenToUse:
          "İzin olgunluğu belirsiz projelerde; satın alma veya ortaklık kararından önce izin akışının yatırım disipliniyle doğrulanması gerektiğinde.",
      },
    ],
    trust: {
      title: "Bağımsızlık ve Etik Çerçeve",
      paragraphs: [
        "AFA Energy Romania; proje geliştirme, mühendislik-taahhüt yükleniciliği, işletme ve bakım (O&M) hizmeti veya ekipman satışı kapsamında hizmet vermez.",
        "Gelir modeli komisyona değil, danışmanlık ücretine dayanır. Bu yapı, teknik değerlendirmelerin yatırımcı perspektifinde ve tarafsız denetim diliyle yürütülmesini sağlar.",
      ],
    },
    form: {
      title: "Teknik Ön Değerlendirme Formu",
      subtitle: "Proje parametrelerinizi paylaşın. Veri olgunluğuna göre en doğru teknik doğrulama kurgusunu önerelim.",
      namePlaceholder: "Adınız ve soyadınız",
      emailPlaceholder: "ornek@sirket.com",
      companyPlaceholder: "Kurum veya şirket adı",
      atrLabel: "ATR Durumu",
      atrOptions: [
        { value: "approved", label: "Onaylandı" },
        { value: "in-process", label: "Süreçte" },
        { value: "none", label: "Yok" },
      ],
      capacityPlaceholder: "ör. 50",
      phasesLabel: "Proje Aşaması",
      phaseOptions: [
        { value: "land-development", label: "Arazi geliştirme" },
        { value: "rtb", label: "İnşaata hazır (RTB)" },
        { value: "operational", label: "İşletmede" },
      ],
      dataLabel: "Teknik veri seti hazır mı?",
      dataOptions: [
        { value: "yes", label: "Evet" },
        { value: "no", label: "Hayır" },
      ],
      notesPlaceholder: "Proje hakkında eklemek istediğiniz notlar…",
      submitLabel: "Talep Gönder",
      footnote: "Not: Talep değerlendirmesi yalnızca ön filtreleme amaçlıdır; kesin kapsam ve bedel yazılı teklif ile netleştirilir.",
      successTitle: "Talebiniz Alındı",
      successText: "Teknik ekibimiz talebinizi inceleyerek 3 iş günü içinde geri dönüş sağlayacaktır.",
    },
    cta: {
      title: "Hangi hizmetin uygun olduğunu birlikte netleştirelim",
      subtitle:
        "Proje parametrelerinizi paylaşın. Veri olgunluğunuza göre en doğru teknik doğrulama kurgusunu önerelim.",
      primaryLabel: "Teknik Ön Değerlendirme Talebi",
      primaryHref: LOCALE_PATHS.assessment.tr,
      secondaryLabel: "Hizmet Farklarını İncele",
      secondaryHref: "#hizmet-farklari",
      footnote:
        "Not: Talep değerlendirmesi, yalnızca ön filtreleme amaçlıdır; kesin kapsam ve bedel yazılı teklif ile netleştirilir.",
    },
  },
  en: {
    meta: {
      title: "Our Services | AFA Energy Romania - Technical Validation Standards",
      description:
        "Technical Due Diligence, regulatory compliance, and ATR Matrix™-based risk analysis for renewable energy projects.",
    },
    breadcrumbHome: "Home",
    breadcrumbSelf: "Services",
    hero: {
      motto: "Clarity Before Investment.",
      title: "Technical Validation Services.",
      subtitle:
        "AFA presents investor-suitable projects evaluated through the ATR Matrix™ methodology in Romania. Each project is validated at bank-financing eligibility standards.",
      cta: "Explore Investment-Ready Projects",
      axes: [
        { label: "Axis 1", title: "Grid Integration" },
        { label: "Axis 2", title: "Financial Resilience" },
        { label: "Axis 3", title: "Regulatory Compliance" },
      ],
    },
    legalDisclaimer: {
      title: "Scope and Use Note",
      items: [
        "This page describes an independent technical assessment framework to support investment decisions; it does not constitute legal advice or a binding commitment.",
        "Each engagement is structured based on scope and data maturity; final deliverable format and scope are defined in the written proposal and service agreement.",
        "Schedule and cost assumptions rely on the provided dataset and technical review; they do not imply guaranteed outcomes.",
        "Before an NDA, critical project data (exact connection point, coordinates, seller identity) is not requested or processed.",
        "The only intake channel is the form below; submitted information is used for pre-screening purposes.",
      ],
      note:
        "Note: Response time targets are defined at the written proposal stage, depending on demand and data completeness.",
    },
    services: [
      {
        number: "01",
        title: "Technical Due Diligence (TDD)",
        desc: "We stress-test design choices, equipment selection, and cost assumptions against bank-grade technical standards ahead of acquisition decisions.",
        atrInput: "Bankability alignment and technical reality check.",
        inputs: [
          "Single-line diagram and layout drawings (if available)",
          "Equipment list and datasheets",
          "Energy yield simulation and performance assumptions",
          "Cost assumptions (CAPEX and OPEX)",
          "Site/topography and geotechnical data (if available)",
        ],
        deliverables: [
          "Technical findings and red-flag summary",
          "Reasoned technical note on design and cost assumptions",
          "Technical protections for contract negotiations (inputs to negotiation)",
        ],
        whenToUse:
          "When an acquisition decision is in scope and bank-grade validation is required at investment committee level.",
      },
      {
        number: "02",
        title: "ATR & Grid Analysis",
        desc: "We review ATR conditions, capacity constraints, and validate whether the connection timeline is consistent with the investment plan.",
        atrInput: "Export capability and connection timeline realism.",
        inputs: [
          "ATR document or ATR application pack (if available)",
          "Correspondence with DSO/TSO (if available)",
          "Connection level and connection assumptions",
          "Project location (county/region level)",
          "Publicly available information on substation/line capacity (if available)",
        ],
        deliverables: [
          "ATR technical reading and feasibility assessment",
          "Curtailment likelihood technical scenario note",
          "Critical checkpoints and technical roadmap",
        ],
        whenToUse:
          "For ATR-issued or ATR-applied projects where connection cost and timeline uncertainty can affect project value.",
      },
      {
        number: "03",
        title: "Regulatory & Permit Audit",
        desc: "We validate compliance alignment (including ANRE requirements) and review the permit flow with a hierarchy-based control approach.",
        atrInput: "Regulatory consistency and permit-flow integrity.",
        inputs: [
          "Permit list and current status summary (if available)",
          "Land-use and ownership summary (within NDA boundary)",
          "Environmental and local permitting documents (if available)",
          "Application/response correspondence (if available)",
          "Schedule assumptions and critical dependencies",
        ],
        deliverables: [
          "Permit-flow consistency control note",
          "Missing document map and risk concentration points",
          "Investor-ready permit roadmap with checkpoints",
        ],
        whenToUse:
          "When permit maturity is uncertain and must be validated before acquisition or partnership decisions.",
      },
    ],
    trust: {
      title: "Independence and Ethics",
      paragraphs: [
        "AFA Energy Romania does not act as a project developer, EPC contractor, O&M provider, or equipment vendor.",
        "Our revenue model is advisory-fee based (not commission-based). This structure supports investor-side, impartial technical assessments.",
      ],
    },
    form: {
      title: "Technical Pre-Assessment Form",
      subtitle: "Share your project parameters. We will propose the appropriate validation approach based on data maturity.",
      namePlaceholder: "Your full name",
      emailPlaceholder: "example@company.com",
      companyPlaceholder: "Company or organization name",
      atrLabel: "ATR Status",
      atrOptions: [
        { value: "approved", label: "Approved" },
        { value: "in-process", label: "In Process" },
        { value: "none", label: "None" },
      ],
      capacityPlaceholder: "e.g. 50",
      phasesLabel: "Project Phase",
      phaseOptions: [
        { value: "land-development", label: "Land Development" },
        { value: "rtb", label: "Ready-to-Build (RTB)" },
        { value: "operational", label: "Operational" },
      ],
      dataLabel: "Is the technical dataset ready?",
      dataOptions: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      notesPlaceholder: "Any additional notes about the project…",
      submitLabel: "Submit Request",
      footnote: "Note: Pre-assessment is for screening only; final scope and fees are defined in a written proposal.",
      successTitle: "Request Received",
      successText: "Our technical team will review your request and respond within 3 business days.",
    },
    cta: {
      title: "Let's clarify the right service for your case",
      subtitle:
        "Share your project parameters. Based on data maturity, we will propose the appropriate validation approach.",
      primaryLabel: "Request a Technical Pre-Assessment",
      primaryHref: LOCALE_PATHS.assessment.en,
      secondaryLabel: "Explore Service Differences",
      secondaryHref: "#hizmet-farklari",
      footnote:
        "Note: Pre-assessment is for screening only; final scope and fees are defined in a written proposal.",
    },
  },
  ro: {
    meta: {
      title: "Serviciile Noastre | AFA Energy Romania - Standarde de Validare Tehnică",
      description:
        "Due diligence tehnic, conformitate reglementară și analiză de risc bazată pe ATR Matrix™ pentru proiecte de energie regenerabilă.",
    },
    breadcrumbHome: "Acasă",
    breadcrumbSelf: "Servicii",
    hero: {
      motto: "Claritate Înainte de Investiție.",
      title: "Servicii de Validare Tehnică.",
      subtitle:
        "AFA prezintă investitorilor proiecte potrivite evaluate prin metodologia ATR Matrix™ în România. Fiecare proiect este validat la standardele de eligibilitate pentru finanțare bancară.",
      cta: "Explorați Proiectele Eligibile",
      axes: [
        { label: "Axa 1", title: "Integrare Rețea" },
        { label: "Axa 2", title: "Reziliență Financiară" },
        { label: "Axa 3", title: "Conformitate Reglementară" },
      ],
    },
    legalDisclaimer: {
      title: "Notă de Utilizare și Limitare",
      items: [
        "Această pagină descrie un cadru de evaluare tehnică independentă pentru suport decizional; nu reprezintă consultanță juridică sau angajament obligatoriu.",
        "Fiecare proiect este structurat în funcție de domeniu și maturitatea datelor; livrabilele finale sunt definite în oferta scrisă și în contract.",
        "Ipotezele de calendar și cost se bazează pe setul de date furnizat și pe analiza tehnică; nu implică rezultate garantate.",
        "Înainte de NDA, nu se solicită și nu se procesează date critice (punct exact de racordare, coordonate, identitatea vânzătorului).",
        "Canalul unic de solicitare este formularul de mai jos; informațiile sunt utilizate pentru pre-filtrare.",
      ],
      note:
        "Notă: Timpul de răspuns este stabilit în etapa de ofertă scrisă, în funcție de volum și completitudinea datelor.",
    },
    services: [
      {
        number: "01",
        title: "Due Diligence Tehnic (TDD)",
        desc: "Validăm proiectarea, selecția echipamentelor și ipotezele de cost față de standarde tehnice compatibile cu finanțarea bancară.",
        atrInput: "Aliniere la bancabilitate și verificarea realității tehnice.",
        inputs: [
          "Schema unifilară și planuri de amplasament (dacă sunt disponibile)",
          "Listă de echipamente și fișe tehnice",
          "Simulare de producție și ipoteze de performanță",
          "Ipoteze de cost (CAPEX și OPEX)",
          "Date de sit/topografie și geotehnice (dacă sunt disponibile)",
        ],
        deliverables: [
          "Rezumat tehnic și semnale de avertizare",
          "Notă tehnică argumentată privind proiectarea și ipotezele de cost",
          "Recomandări tehnice pentru negocierea contractelor",
        ],
        whenToUse:
          "Când decizia de achiziție este în discuție și este necesară validare la nivel de comitet de investiții.",
      },
      {
        number: "02",
        title: "Analiză ATR și Rețea",
        desc: "Analizăm condițiile ATR, constrângerile de capacitate și verificăm realismul calendarului de racordare față de planul de investiții.",
        atrInput: "Capacitate de evacuare și realismul calendarului de racordare.",
        inputs: [
          "Document ATR sau dosar de solicitare ATR (dacă este disponibil)",
          "Corespondență cu operatorii de rețea (dacă este disponibilă)",
          "Nivel de tensiune și ipoteze de racordare",
          "Localizare (județ/regiune)",
          "Informații publice despre capacitatea stației/liniilor (dacă există)",
        ],
        deliverables: [
          "Interpretare tehnică ATR și evaluare de fezabilitate",
          "Notă de scenariu privind probabilitatea de curtailment",
          "Puncte critice și foaie de parcurs tehnică",
        ],
        whenToUse:
          "Pentru proiecte cu ATR emis sau în curs, atunci când incertitudinea privind costul și calendarul de racordare poate afecta valoarea proiectului.",
      },
      {
        number: "03",
        title: "Audit Reglementări și Autorizații",
        desc: "Verificăm alinierea la cerințele ANRE și controlăm fluxul de autorizare printr-o abordare ierarhică.",
        atrInput: "Coerență reglementară și integritate a fluxului de autorizații.",
        inputs: [
          "Listă de autorizații și status (dacă este disponibil)",
          "Rezumat utilizare teren și proprietate (în limitele NDA)",
          "Documente de mediu și autorizații locale (dacă există)",
          "Corespondență cereri/răspunsuri (dacă există)",
          "Ipoteze de calendar și dependențe critice",
        ],
        deliverables: [
          "Notă de coerență a fluxului de autorizații",
          "Hartă a lipsurilor de documente și puncte de concentrare a riscului",
          "Foaie de parcurs a autorizațiilor, cu repere verificabile",
        ],
        whenToUse:
          "Când maturitatea autorizațiilor este incertă și trebuie validată înainte de decizii de achiziție sau parteneriat.",
      },
    ],
    trust: {
      title: "Independență și Etică",
      paragraphs: [
        "AFA Energy Romania nu este dezvoltator de proiecte, contractor EPC, furnizor de O&M sau vânzător de echipamente.",
        "Modelul nostru este bazat pe onorarii de consultanță, nu pe comision. Această structură susține evaluări imparțiale, pe partea investitorului.",
      ],
    },
    form: {
      title: "Formular de Evaluare Tehnică Preliminară",
      subtitle: "Trimiteți parametrii proiectului. Propunem abordarea corectă de validare în funcție de maturitatea datelor.",
      namePlaceholder: "Numele complet",
      emailPlaceholder: "exemplu@companie.com",
      companyPlaceholder: "Numele companiei sau organizației",
      atrLabel: "Statut ATR",
      atrOptions: [
        { value: "approved", label: "Aprobat" },
        { value: "in-process", label: "În proces" },
        { value: "none", label: "Nu există" },
      ],
      capacityPlaceholder: "ex. 50",
      phasesLabel: "Faza proiectului",
      phaseOptions: [
        { value: "land-development", label: "Dezvoltare teren" },
        { value: "rtb", label: "Gata de construcție (RTB)" },
        { value: "operational", label: "Operațional" },
      ],
      dataLabel: "Setul de date tehnice este pregătit?",
      dataOptions: [
        { value: "yes", label: "Da" },
        { value: "no", label: "Nu" },
      ],
      notesPlaceholder: "Note suplimentare despre proiect…",
      submitLabel: "Trimite Solicitarea",
      footnote: "Notă: Evaluarea preliminară este pentru pre-filtrare; domeniul și tarifele finale sunt definite în oferta scrisă.",
      successTitle: "Solicitare Primită",
      successText: "Echipa noastră tehnică va analiza solicitarea și va răspunde în termen de 3 zile lucrătoare.",
    },
    cta: {
      title: "Clarificăm împreună serviciul potrivit",
      subtitle:
        "Trimiteți parametrii proiectului. În funcție de maturitatea datelor, propunem abordarea corectă de validare.",
      primaryLabel: "Solicitare Evaluare Tehnică Preliminară",
      primaryHref: LOCALE_PATHS.assessment.ro,
      secondaryLabel: "Explorați Diferențele de Servicii",
      secondaryHref: "#hizmet-farklari",
      footnote:
        "Notă: Evaluarea preliminară este pentru pre-filtrare; domeniul și tarifele finale sunt definite în oferta scrisă.",
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
  const servicesPaths = LOCALE_PATHS.services;
  const canonicalUrl = canonicalFromFullPath(servicesPaths[validLocale]);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesFromLocalePaths(servicesPaths),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: "AFA Energy Romania",
      type: "website",
    },
  };
}

/* ── Static Params ── */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ── Page ── */
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const content = pageContent[locale];

  return (
    <main className={styles.servicesPage}>
      {/* HERO — v13.5.2 Audit-Pure FINAL */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContrastOverlay} />
        <div className={styles.gridOverlay} />

        <div className={styles.heroContainer}>
          <div className={styles.heroInner}>
            <p className={styles.motto}>{content.hero.motto}</p>
            <h1 className={styles.heroTitle}>{content.hero.title}</h1>
            <p className={styles.heroSubtitle}>
              {(() => {
                const text = content.hero.subtitle;
                const atrIdx = text.indexOf("ATR Matrix™");
                if (atrIdx === -1) return text;
                return (
                  <>
                    {text.slice(0, atrIdx)}
                    <span className={styles.atrEmphasis}>ATR Matrix™</span>
                    {text.slice(atrIdx + "ATR Matrix™".length)}
                  </>
                );
              })()}
            </p>

            <Link href={LOCALE_PATHS.assessment[locale]} className={styles.heroCta}>
              {content.hero.cta}
            </Link>

            <div className={styles.axisBand}>
              {content.hero.axes.map((axis, i) => (
                <div key={i} className={styles.axisItem}>
                  <span className={styles.axisLabel}>{axis.label}</span>
                  <span className={styles.axisTitle}>{axis.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.heroFooter}>
          <a href="#hizmet-farklari" className={styles.heroFooterRight}>
            <span className={styles.heroFooterRightText}>
              {locale === "tr"
                ? "Hangi Karar Aşamasındasınız? ↓"
                : locale === "en"
                ? "Which Decision Stage Are You At? ↓"
                : "În ce etapă de decizie vă aflați? ↓"}
            </span>
          </a>
        </div>
      </section>

      {/* LEGAL DISCLAIMER */}
      <section className={styles.legalDisclaimerSection}>
        <div className="afa-container">
          <div className={styles.legalBox}>
            <div className={styles.legalContent}>
              <h2 className={styles.sectionTitle}>
                {content.legalDisclaimer.title}
                {!content.legalDisclaimer.title.endsWith(".") && "."}
              </h2>
              <ol className={styles.legalList}>
                {content.legalDisclaimer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <p className={styles.legalNote}>
                {(() => {
                  const match = content.legalDisclaimer.note.match(/^(Not[aeă]?:\s?)/);
                  if (match) {
                    return (
                      <>
                        <strong className={styles.legalNoteLabel}>{match[1]}</strong>
                        {content.legalDisclaimer.note.slice(match[1].length)}
                      </>
                    );
                  }
                  return content.legalDisclaimer.note;
                })()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — v11.2 HORIZONTAL PROTOCOL FLOW */}
      <section id="hizmet-farklari" className={styles.horizontalFlowSection}>
        <div className="afa-container">
          {content.services.map((service, index) => {
            const accentClass = ACCENT_CLASSES[index % ACCENT_CLASSES.length];
            const titleColor = TITLE_COLORS[index % TITLE_COLORS.length];
            const numberColor = NUMBER_COLORS[index % NUMBER_COLORS.length];
            const photo = SERVICE_PHOTOS[index % SERVICE_PHOTOS.length];

            return (
              <article key={service.number} id={`gate-${service.number}`} className={styles.serviceBand}>
                {/* 8px institutional accent border */}
                <div className={`${styles.bandAccent} ${accentClass}`} />

                {/* 180×180 descriptive photo */}
                <div className={styles.bandPhoto}>
                  <Image
                    src={photo}
                    alt={service.title}
                    width={180}
                    height={180}
                    style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  />
                </div>

                {/* Content */}
                <div className={styles.bandContent}>
                  <div className={styles.serviceNumber} style={{ color: numberColor }}>
                    {service.number}
                  </div>
                  <h3 className={styles.cardTitle} style={{ color: titleColor }}>
                    {service.title}
                  </h3>

                  <p className={styles.serviceDesc}>{service.desc}</p>

                  <div className={styles.decisionInput}>
                    <p>
                      <strong>{locale === "tr" ? "ATR Eksen Girdisi:" : locale === "en" ? "ATR Axis Input:" : "Input Axă ATR:"}</strong>{" "}
                      {service.atrInput}
                    </p>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardBlock}>
                      <h4 className={styles.cardSubTitle}>
                        {locale === "tr"
                          ? "Girdi Seti"
                          : locale === "en"
                          ? "Inputs"
                          : "Date de Intrare"}
                      </h4>
                      <ul className={styles.hyphenList}>
                        {service.inputs.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.cardBlock}>
                      <h4 className={styles.cardSubTitle}>
                        {locale === "tr"
                          ? "Teslimatlar"
                          : locale === "en"
                          ? "Deliverables"
                          : "Livrabile"}
                      </h4>
                      <ul className={styles.hyphenList}>
                        {service.deliverables.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.cardBlock}>
                      <h4 className={styles.cardSubTitle}>
                        {locale === "tr"
                          ? "Ne Zaman Kullanılır"
                          : locale === "en"
                          ? "When to Use"
                          : "Când se Folosește"}
                      </h4>
                      <p className={styles.whenToUse}>{service.whenToUse}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className={styles.trustSection}>
        <div className="afa-container">
          <div className={styles.trustBox}>
            <h2 className={styles.sectionTitle}>{content.trust.title}</h2>
            {content.trust.paragraphs.map((p) => (
              <p key={p} className={styles.trustText}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL PRE-EVALUATION FORM */}
      <section id="talep-formu" className={styles.formSection}>
        <div className="afa-container">
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>{content.form.title}</h2>
            <p className={styles.formSubtitle}>{content.form.subtitle}</p>
            <ServicesFormInline locale={locale} content={content.form} />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.cta}>
        <div className="afa-container">
          <h2 className={styles.ctaTitle}>{content.cta.title}</h2>
          <p className={styles.ctaSubtitle}>{content.cta.subtitle}</p>

          <div className={styles.ctaButtons}>
            <Link href={content.cta.primaryHref} className={styles.ctaButtonPrimary}>
              {content.cta.primaryLabel}
            </Link>
            <a href={content.cta.secondaryHref} className={styles.ctaButtonSecondary}>
              {content.cta.secondaryLabel}
            </a>
          </div>

          <p className={styles.ctaFootnote}>{content.cta.footnote}</p>
        </div>
      </section>
    </main>
  );
}