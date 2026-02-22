import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { LOCALE_PATHS } from '@/lib/routes';
import { canonicalFromFullPath, alternatesFromLocalePaths } from '@/lib/seo/canonical';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ServicesFAQSchema from '@/components/seo/ServicesFAQSchema';
import styles from './ServicesPage.module.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

/* ── Per-locale page content ── */
const pageContent = {
  tr: {
    meta: {
      title: 'Hizmetlerimiz | AFA Energy Romania - Teknik Doğrulama Standartları',
      description:
        'Yenilenebilir enerji projelerinde Teknik İnceleme, Mevzuat Uyumu ve ATR Matrix\u2122 bazlı risk analizi.',
    },
    breadcrumbHome: 'Ana Sayfa',
    breadcrumbSelf: 'Hizmetler',
    hero: {
      motto: 'Yatırımdan Önce Netlik.',
      title: 'Teknik Doğrulama Hizmetleri',
      subtitle:
        'Romanya pazarında yatırımcı tarafında konumlanarak, projelerin teknik ve finansal gerçekliğini ATR Matrix\u2122 metodolojisi ile mühürlüyoruz.',
    },
    services: [
      {
        number: '01',
        title: 'Teknik İnceleme (TDD)',
        desc: 'Projenin saha verileri, tasarım standartları ve teknik bileşenlerinin banka finansmanına uygunluk açısından detaylı denetimi.',
        atrInput: 'Finansman Uygunluğu & Bağlantı Gerçekliği',
      },
      {
        number: '02',
        title: 'ATR & Şebeke Analizi',
        desc: 'Şebeke bağlantı şartlarının (ATR) teknik analizi, kapasite kısıtları ve bağlantı takviminin yatırım planıyla uyumunun doğrulanması.',
        atrInput: 'Şebeke Kapasitesi',
      },
      {
        number: '03',
        title: 'Mevzuat ve İzin Denetimi',
        desc: 'Romanya regülasyonlarına (ANRE) tam uyum ve izin süreçlerinin yatırım güvenliği açısından hiyerarşik kontrolü.',
        atrInput: 'Mevzuat Uyumu',
      },
    ],
    methodology: {
      title: 'ATR Matrix\u2122 Nasıl Çalışır?',
      desc: 'Hizmetlerimiz tekil bir raporlama değil, projenin \u201cİlerlenebilir\u201d olup olmadığını belirleyen üç boyutlu bir doğrulama sürecidir.',
      axes: ['Bağlantı', 'Şebeke', 'Finansman'],
    },
    cta: {
      title: 'Teknik bir ön değerlendirme mi istiyorsunuz?',
      button: 'Analiz Başlatın',
    },
    atrLabel: 'ATR Eksen Girdisi:',
    faq: [
      { question: 'ATR (Aviz Tehnic de Racordare) nedir?', answer: 'ATR, Romanya\'da şebekeye bağlantı için zorunlu teknik onaydır. Projenin şebeke kapasitesine uygunluğunu ve bağlantı koşullarını belirler.' },
      { question: 'Bağımsız teknik değerlendirme yatırım kararını nasıl etkiler?', answer: 'Şebeke kapasitesi, bağlantı maliyeti, kısıntı riski ve regülasyon uyumluluğu gibi kritik parametreleri yatırım kararı öncesinde bağımsız olarak doğrular.' },
      { question: 'Kısıntı riski nasıl değerlendirilir?', answer: 'Bağlantı noktasındaki mevcut yük, planlanan kapasite artışları ve şebeke altyapısının tahliye kapasitesi analiz edilerek kısıntı riski modellenir.' },
      { question: 'Banka finansmanına uygunluk değerlendirmesi neleri kapsar?', answer: 'IFC Performans Standartları ve Ekvator Prensipleri uyumlu formatta teknik bulguların raporlanması, DSCR projeksiyonlarına teknik girdi ve risk matrisi hazırlanmasını kapsar.' },
      { question: 'AFA Energy neden bağımsız danışmanlık vurgular?', answer: 'AFA, proje geliştirici, EPC yüklenicisi veya ekipman tedarikçisi değildir. Herhangi bir satıcı tarafıyla ticari ilişkisi yoktur. Bu yapısal bağımsızlık, teknik değerlendirmelerin tarafsızlığını garanti eder.' },
    ],
  },
  en: {
    meta: {
      title: 'Our Services | AFA Energy Romania - Technical Validation Standards',
      description:
        'Technical Due Diligence, Regulatory Compliance, and ATR Matrix\u2122-based risk analysis for renewable energy projects.',
    },
    breadcrumbHome: 'Home',
    breadcrumbSelf: 'Services',
    hero: {
      motto: 'Decision Support Mechanism',
      title: 'Technical Validation Services',
      subtitle:
        'Positioned on the investor side in the Romanian market, we seal the technical and financial reality of projects with the ATR Matrix\u2122 methodology.',
    },
    services: [
      {
        number: '01',
        title: 'Technical Due Diligence (TDD)',
        desc: 'Detailed audit of project site data, design standards, and technical components for bankability compliance.',
        atrInput: 'Bankability & Connection Reality',
      },
      {
        number: '02',
        title: 'ATR & Grid Analysis',
        desc: 'Technical analysis of grid connection conditions (ATR), capacity constraints, and verification of connection timeline alignment with the investment plan.',
        atrInput: 'Grid Capacity',
      },
      {
        number: '03',
        title: 'Regulatory & Permit Audit',
        desc: 'Full compliance with Romanian regulations (ANRE) and hierarchical control of permit processes for investment security.',
        atrInput: 'Regulatory Compliance',
      },
    ],
    methodology: {
      title: 'How Does ATR Matrix\u2122 Work?',
      desc: 'Our services are not a singular reporting exercise, but a three-dimensional validation process that determines whether a project is \u201cProceedable.\u201d',
      axes: ['Connection', 'Grid', 'Financing'],
    },
    cta: {
      title: 'Looking for a technical pre-assessment?',
      button: 'Start Analysis',
    },
    atrLabel: 'ATR Axis Input:',
    faq: [
      { question: 'What is ATR (Aviz Tehnic de Racordare)?', answer: 'ATR is the mandatory technical approval for grid connection in Romania. It determines the project\'s grid capacity compatibility and connection conditions.' },
      { question: 'How does independent technical assessment affect investment decisions?', answer: 'It independently verifies critical parameters such as grid capacity, connection cost, curtailment risk, and regulatory compliance before the investment decision.' },
      { question: 'How is curtailment risk assessed?', answer: 'Curtailment risk is modeled by analyzing the existing load at the connection point, planned capacity increases, and the grid infrastructure\'s evacuation capacity.' },
      { question: 'What does bankability assessment cover?', answer: 'It covers structured reporting of technical findings per IFC Performance Standards and Equator Principles, technical input for DSCR projections, and risk matrix preparation.' },
      { question: 'Why does AFA Energy emphasize independence?', answer: 'AFA is not a project developer, EPC contractor, or equipment supplier. It has no commercial relationship with any vendor party. This structural independence guarantees the impartiality of technical assessments.' },
    ],
  },
  ro: {
    meta: {
      title: 'Serviciile Noastre | AFA Energy Romania - Standarde de Validare Tehnică',
      description:
        'Due Diligence Tehnic, Conformitate Reglementară și analiză de risc bazată pe ATR Matrix\u2122 pentru proiecte de energie regenerabilă.',
    },
    breadcrumbHome: 'Acasă',
    breadcrumbSelf: 'Servicii',
    hero: {
      motto: 'Mecanism de Suport Decizional',
      title: 'Servicii de Validare Tehnică',
      subtitle:
        'Poziționați pe partea investitorului pe piața românească, sigilăm realitatea tehnică și financiară a proiectelor cu metodologia ATR Matrix\u2122.',
    },
    services: [
      {
        number: '01',
        title: 'Due Diligence Tehnic (TDD)',
        desc: 'Audit detaliat al datelor de teren, standardelor de proiectare și componentelor tehnice ale proiectului pentru conformitatea cu bancabilitatea.',
        atrInput: 'Bancabilitate & Realitatea Conectării',
      },
      {
        number: '02',
        title: 'Analiză ATR & Rețea',
        desc: 'Analiza tehnică a condițiilor de conectare la rețea (ATR), constrângerile de capacitate și verificarea alinierii calendarului de conectare cu planul de investiții.',
        atrInput: 'Capacitatea Rețelei',
      },
      {
        number: '03',
        title: 'Audit Reglementări & Autorizații',
        desc: 'Conformitate deplină cu reglementările românești (ANRE) și controlul ierarhic al proceselor de autorizare pentru securitatea investiției.',
        atrInput: 'Conformitate Reglementară',
      },
    ],
    methodology: {
      title: 'Cum Funcționează ATR Matrix\u2122?',
      desc: 'Serviciile noastre nu sunt un exercițiu singular de raportare, ci un proces de validare tridimensional care determină dacă un proiect este \u201cViabil.\u201d',
      axes: ['Conectare', 'Rețea', 'Finanțare'],
    },
    cta: {
      title: 'Căutați o evaluare tehnică preliminară?',
      button: 'Începeți Analiza',
    },
    atrLabel: 'Input Axă ATR:',
    faq: [
      { question: 'Ce este ATR (Aviz Tehnic de Racordare)?', answer: 'ATR este aprobarea tehnică obligatorie pentru conectarea la rețea în România. Determină compatibilitatea capacității rețelei proiectului și condițiile de conectare.' },
      { question: 'Cum afectează evaluarea tehnică independentă deciziile de investiție?', answer: 'Verifică independent parametrii critici precum capacitatea rețelei, costul de conectare, riscul de curtailment și conformitatea reglementară înainte de decizia de investiție.' },
      { question: 'Cum se evaluează riscul de curtailment?', answer: 'Riscul de curtailment este modelat prin analiza sarcinii existente la punctul de conectare, creșterile de capacitate planificate și capacitatea de evacuare a infrastructurii rețelei.' },
      { question: 'Ce acoperă evaluarea bancabilității?', answer: 'Acoperă raportarea structurată a constatărilor tehnice conform IFC Performance Standards și Equator Principles, input tehnic pentru proiecțiile DSCR și pregătirea matricei de risc.' },
      { question: 'De ce pune AFA Energy accent pe independență?', answer: 'AFA nu este dezvoltator de proiecte, contractor EPC sau furnizor de echipamente. Nu are nicio relație comercială cu nicio parte vânzătoare. Această independență structurală garantează imparțialitatea evaluărilor tehnice.' },
    ],
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
      {/* JSON-LD Schemas */}
      <BreadcrumbSchema
        items={[
          { name: content.breadcrumbHome, url: `${SITE_URL}/${locale}` },
          {
            name: content.breadcrumbSelf,
            url: canonicalFromFullPath(LOCALE_PATHS.services[locale]),
          },
        ]}
      />
      <ServicesFAQSchema items={content.faq} />

      {/* HERO — Grid Background */}
      <section className={styles.hero}>
        <div className="afa-container">
          <p className={styles.motto}>{content.hero.motto}</p>
          <h1 className={styles.heroTitle}>{content.hero.title}</h1>
          <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
        </div>
        <div className={styles.gridOverlay} />
      </section>

      {/* SERVICES GRID */}
      <section className={styles.servicesGridSection}>
        <div className="afa-container">
          <div className={styles.grid}>
            {content.services.map((service) => (
              <div key={service.number} className={styles.serviceCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.serviceNumber}>{service.number}</span>
                  <h3>{service.title}</h3>
                </div>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <div className={styles.decisionInput}>
                  <p>
                    <strong>{content.atrLabel}</strong> {service.atrInput}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className={styles.methodology}>
        <div className="afa-container">
          <div className={styles.methodologyBox}>
            <h2>{content.methodology.title}</h2>
            <p>{content.methodology.desc}</p>
            <div className={styles.matrixVisual}>
              {content.methodology.axes.map((axis, i) => (
                <span key={axis}>
                  {i > 0 && <span className={styles.matrixPlus}>+</span>}
                  <span className={styles.matrixItem}>{axis}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="afa-container">
          <h2>{content.cta.title}</h2>
          <Link
            href={LOCALE_PATHS.contact[locale]}
            className={styles.ctaButton}
          >
            {content.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
