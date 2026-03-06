import type { Metadata } from "next";
import Link from "next/link";
import { Locale, locales, defaultLocale } from "@/lib/i18n";
import { LOCALE_PATHS } from "@/lib/routes";
import styles from "./vakalar.module.css";
import { SITE_URL } from "@/lib/env";
import CasesFilterGrid, { type CaseItem } from "./CasesFilterGrid";
import LegalScopeDisclaimer from "@/components/legal/LegalScopeDisclaimer";

/* ── Canonical helpers ── */
const canonicalFromFullPath = (path: string): string => `${SITE_URL}${path}`;
const alternatesFromLocalePaths = (paths: Record<Locale, string>) => {
  const languages: Record<string, string> = {};
  Object.entries(paths).forEach(([locale, path]) => {
    languages[locale] = `${SITE_URL}${path}`;
  });
  return languages;
};

/* ── Case data (8 cases, ordered per spec) ── */
const CASES: CaseItem[] = [
  {
    ref: "AFA-RO-2024-C02",
    category: "grid-risk",
    title: "Şebeke Kapasite Yanılsaması",
    specs: "65 MWp | GES | Güneybatı Romanya",
    diagnosis:
      "İnşaata Hazır olarak pazarlanan projenin, trafo merkezindeki %87 doluluk oranı nedeniyle €1,2M ek şebeke güçlendirme maliyeti taşıdığı saptandı.",
  },
  {
    ref: "AFA-RO-2024-R03",
    category: "grid-risk",
    title: "Düğüm Noktası Tıkanıklığı",
    specs: "120 MW | RES | Dobruca, Romanya",
    diagnosis:
      "Yatırımcıya sunulan finansal modelin %2 şebeke kısıntısı varsayımıyla hazırlandığı; gerçek bölgesel verilerin %8-12 kısıntı gösterdiği belirlendi.",
  },
  {
    ref: "AFA-RO-2024-E06",
    category: "grid-risk",
    title: "Şebeke Kodu Sertifikasyon Krizi",
    specs: "55 MWp | GES | Batı Romanya",
    diagnosis:
      "EPC yüklenicisinin seçtiği Seviye-2 evirici modelinin Romanya Şebeke Kodu gerekliliklerini karşılamadığı tespit edildi.",
  },
  {
    ref: "AFA-RO-2024-T01",
    category: "grid-risk",
    title: "ATR Gecikmesi ve Takvim Yanılsaması",
    specs: "48 MWp | GES | Güney Romanya",
    diagnosis:
      "İnşaata hazır olarak sunulan projenin, dağıtım şirketi onay sürecindeki kritik yol analizinde 6-8 aylık gecikme riski taşıdığı tespit edildi.",
  },
  {
    ref: "AFA-RO-2024-B07",
    category: "bankability",
    title: "Alım Anlaşması-Kısıntı Eşzamanlama Açığı",
    specs: "38 MWp | GES | Orta Romanya",
    diagnosis:
      "10 yıllık kurumsal alım anlaşması imzalanmış projenin, şebeke kısıntısı senaryosunda borç servisi karşılama oranının 1,15x'e düştüğü (banka eşiği: 1,20x) tespit edildi.",
  },
  {
    ref: "AFA-RO-2024-H04",
    category: "optimization",
    title: "Hibrit Dönüşümle Değer Koruması",
    specs: "75 MWp + 20 MWh | Hibrit (GES + Batarya) | Güney Romanya",
    diagnosis:
      "Mevcut ATR kapasitesinin şebeke tıkanıklığı nedeniyle %8-12 şebeke kısıntısı riski taşıdığı; Karar 20/2025 fırsatı belirlendi.",
  },
  {
    ref: "AFA-RO-2024-D05",
    category: "bankability",
    title: "İnşaata Hazır Dosyasındaki Gizli Kusurlar",
    specs: "42 MWp | GES | Doğu Romanya",
    diagnosis:
      "İnşaata Hazır dosyasında saha eğiminin %3 olarak gösterildiği; gerçek ölçümlerin %7-9 eğim ortaya koyduğu ve drenaj çakışması riski belirlendi.",
  },
  {
    ref: "AFA-RO-2024-O08",
    category: "optimization",
    title: "SCADA Verisi ve Sessiz Performans Sapması",
    specs: "28 MWp | GES – İşletmede | Güney Romanya",
    diagnosis:
      "Hedef üstü üretim raporlarına rağmen, dizi bazlı analizde performans oranının %78'e düştüğü; 4 evirici grubunda sistematik düşük verim tespit edildi.",
  },
];

/* ── Per-locale page content ── */
const pageContent = {
  tr: {
    meta: {
      title: "Vakalar | AFA Energy Romania - Sahadan Teknik Doğrulama Vakaları",
      description:
        "Romanya yenilenebilir enerji projelerinde AFA'nın tespit ettiği şebeke riski, finansman uygunluğu ve optimizasyon vakaları.",
    },
    hero: {
      tag: "Teknik Doğruluk. Yatırımcı Disiplini.",
      title: "Sahadan Vakalar.",
    },
    methodology: {
      title: "Vaka Sınıflandırması",
      subtitle:
        "Her vaka, ATR Matrix™ metodolojisi çerçevesinde üç temel eksene göre sınıflandırılmıştır.",
      categories: [
        {
          label: "Şebeke Riski",
          count: "4 vaka",
          color: "#F25F5C",
          textColor: "#ffffff",
          desc: "Şebeke kapasitesi, bağlantı takvimi ve teknik uyumluluk değerlendirmeleri.",
        },
        {
          label: "Finansman Uygunluğu",
          count: "2 vaka",
          color: "#28AFB0",
          textColor: "#0F2E2C",
          desc: "Finansal model bütünlüğü ve banka finansmanı uygunluk analizleri.",
        },
        {
          label: "Optimizasyon",
          count: "2 vaka",
          color: "#FFCB00",
          textColor: "#0B1F1E",
          desc: "Değer koruma stratejileri ve performans optimizasyonu çalışmaları.",
        },
      ],
    },
    filters: [
      { key: "all" as const, label: "Tümü (8)" },
      { key: "grid-risk" as const, label: "Şebeke Riski (4)" },
      { key: "bankability" as const, label: "Finansman Uygunluğu (2)" },
      { key: "optimization" as const, label: "Optimizasyon (2)" },
    ],
    categoryLabels: {
      "grid-risk": "Şebeke Riski",
      bankability: "Finansman Uygunluğu",
      optimization: "Optimizasyon",
    } as Record<"grid-risk" | "bankability" | "optimization", string>,
    cta: {
      title: "Her Proje Farklıdır.",
      text: "AFA, yatırım kararınızı netleştirmek için bağımsız ve teknik bir bakış açısı sunar. Projenizin teknik tablosunu netleştirmek isterseniz, süreci birlikte değerlendirebiliriz.",
      button: "BİZE ULAŞIN",
    },
  },
  en: {
    meta: {
      title: "Cases | AFA Energy Romania - Field Technical Validation Cases",
      description:
        "Grid risk, bankability, and optimization cases identified by AFA in Romanian renewable energy projects.",
    },
    hero: {
      tag: "Technical Accuracy. Investor Discipline.",
      title: "Cases from the Field.",
    },
    methodology: {
      title: "Case Classification",
      subtitle:
        "Each case is classified across three core axes within the ATR Matrix™ methodology framework.",
      categories: [
        {
          label: "Grid Risk",
          count: "4 cases",
          color: "#F25F5C",
          textColor: "#ffffff",
          desc: "Grid capacity, connection timeline, and technical compliance assessments.",
        },
        {
          label: "Bankability",
          count: "2 cases",
          color: "#28AFB0",
          textColor: "#0F2E2C",
          desc: "Financial model integrity and bank financing eligibility analyses.",
        },
        {
          label: "Optimization",
          count: "2 cases",
          color: "#FFCB00",
          textColor: "#0B1F1E",
          desc: "Value protection strategies and performance optimization studies.",
        },
      ],
    },
    filters: [
      { key: "all" as const, label: "All (8)" },
      { key: "grid-risk" as const, label: "Grid Risk (4)" },
      { key: "bankability" as const, label: "Bankability (2)" },
      { key: "optimization" as const, label: "Optimization (2)" },
    ],
    categoryLabels: {
      "grid-risk": "Grid Risk",
      bankability: "Bankability",
      optimization: "Optimization",
    } as Record<"grid-risk" | "bankability" | "optimization", string>,
    cta: {
      title: "Every Project Is Different.",
      text: "AFA provides an independent, technical perspective to clarify your investment decision. If you want to clarify the technical picture of your project, we can evaluate the process together.",
      button: "CONTACT US",
    },
  },
  ro: {
    meta: {
      title: "Cazuri | AFA Energy Romania - Cazuri de Validare Tehnică din Teren",
      description:
        "Cazuri de risc rețea, bancabilitate și optimizare identificate de AFA în proiecte de energie regenerabilă din România.",
    },
    hero: {
      tag: "Acuratețe Tehnică. Disciplină de Investitor.",
      title: "Cazuri din Teren.",
    },
    methodology: {
      title: "Clasificarea Cazurilor",
      subtitle:
        "Fiecare caz este clasificat pe trei axe principale în cadrul metodologiei ATR Matrix™.",
      categories: [
        {
          label: "Risc Rețea",
          count: "4 cazuri",
          color: "#F25F5C",
          textColor: "#ffffff",
          desc: "Evaluări ale capacității rețelei, calendarului de racordare și conformității tehnice.",
        },
        {
          label: "Bancabilitate",
          count: "2 cazuri",
          color: "#28AFB0",
          textColor: "#0F2E2C",
          desc: "Analize ale integrității modelului financiar și eligibilității pentru finanțare bancară.",
        },
        {
          label: "Optimizare",
          count: "2 cazuri",
          color: "#FFCB00",
          textColor: "#0B1F1E",
          desc: "Strategii de protecție a valorii și studii de optimizare a performanței.",
        },
      ],
    },
    filters: [
      { key: "all" as const, label: "Toate (8)" },
      { key: "grid-risk" as const, label: "Risc Rețea (4)" },
      { key: "bankability" as const, label: "Bancabilitate (2)" },
      { key: "optimization" as const, label: "Optimizare (2)" },
    ],
    categoryLabels: {
      "grid-risk": "Risc Rețea",
      bankability: "Bancabilitate",
      optimization: "Optimizare",
    } as Record<"grid-risk" | "bankability" | "optimization", string>,
    cta: {
      title: "Fiecare Proiect Este Diferit.",
      text: "AFA oferă o perspectivă independentă și tehnică pentru a clarifica decizia dumneavoastră de investiție. Dacă doriți să clarificați tabloul tehnic al proiectului, putem evalua procesul împreună.",
      button: "CONTACTAȚI-NE",
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
  const casesPaths = LOCALE_PATHS.cases;
  const canonicalUrl = canonicalFromFullPath(casesPaths[validLocale]);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesFromLocalePaths(casesPaths),
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
export default async function CasesPage({
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
    <main className={styles.casesPage}>
      {/* HERO — 55/45 Split */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.heroTag}>{content.hero.tag}</span>
            <h1 className={styles.heroTitle}>{content.hero.title}</h1>
          </div>
          <div className={styles.heroImageWrap}>
            <img
              src="/images/cases/hero-cases.jpg"
              alt=""
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* METHODOLOGY INTRO */}
      <section className={styles.methodologySection}>
        <div className={styles.methodologyInner}>
          <h2 className={styles.methodologyTitle}>
            {content.methodology.title}
          </h2>
          <p className={styles.methodologySubtitle}>
            {content.methodology.subtitle}
          </p>
          <div className={styles.categoryCards}>
            {content.methodology.categories.map((cat) => (
              <div key={cat.label} className={styles.categoryCard}>
                <div
                  className={styles.categoryAccent}
                  style={{ background: cat.color }}
                />
                <div className={styles.categoryBody}>
                  <p
                    className={styles.categoryLabel}
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </p>
                  <p className={styles.categoryCount}>{cat.count}</p>
                  <p className={styles.categoryDesc}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER + CASE CARDS (client component) */}
      <CasesFilterGrid
        cases={CASES}
        filters={[...content.filters]}
        categoryLabels={content.categoryLabels}
      />

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>{content.cta.title}</h2>
        <p className={styles.ctaText}>{content.cta.text}</p>
        <Link href={LOCALE_PATHS.contact[locale]} className={styles.ctaButton}>
          {content.cta.button}
        </Link>
      </section>

      <LegalScopeDisclaimer locale={locale} />
    </main>
  );
}
