import type { Metadata } from 'next';
import Image from 'next/image';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { LOCALE_PATHS } from '@/lib/routes';
import { canonicalFromFullPath, alternatesFromLocalePaths } from '@/lib/seo/canonical';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import styles from './AboutPage.module.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

/* ── Per-locale content ── */
const pageContent = {
  tr: {
    meta: {
      title: 'AFA Energy Romania - Hakkımızda | Yatırımcı Tarafı Teknik Doğrulama',
      description:
        'Romanya yenilenebilir enerji yatırımlarında yatırımcı tarafı teknik doğrulama ve karar disiplini standardı.',
    },
    breadcrumbHome: 'Ana Sayfa',
    breadcrumbSelf: 'Hakkımızda',
    hero: {
      motto: 'Yatırımdan Önce Netlik.',
      title: 'Yatırımcı Tarafı Teknik Doğrulama',
      subtitle:
        'Romanya yenilenebilir enerji yatırımlarında karar disiplini ve banka finansmanına uygunluk perspektifi.',
      keys: [
        'Yatırımcı tarafında bağımsız konumlanma',
        'Banka finansmanına uygunluk perspektifiyle değerlendirme',
        'Sektörel deneyim ve ATR Matrix\u2122 metodolojisi',
      ],
    },
    valueSlogan: 'Teknik Doğruluk. Yatırımcı Disiplini.',
    model: {
      label: 'Yatırımcı Tarafı Bağımsızlığı',
      title: 'Yatırımcı Tarafı Danışmanlık Modeli',
      manifesto: {
        title: 'Bağımsızlık İlkesi',
        text: 'Değerlendirmelerimiz proje geliştirme, EPC veya ekipman satış süreçlerinden bağımsız olarak yalnızca yatırımcı çıkarı ekseninde yürütülür.',
      },
      atrMatrix: {
        title: 'ATR Matrix\u2122 \u2013 AFA\u2019nın Karar Standardı',
        outcomeTitle: 'Karar Çıktısı',
        outcomes: [
          { tag: 'İlerlenebilir', color: 'green' as const, text: 'Tüm kriterler sağlanıyor' },
          { tag: 'Koşullu', color: 'yellow' as const, text: 'Belirli aksiyonlar tamamlanmalı' },
          { tag: 'İlerlenemez', color: 'gray' as const, text: 'Kritik eşikler karşılanmıyor' },
        ],
      },
    },
    team: {
      label: 'Ekibimiz',
      title: 'Çok Disiplinli Bir Bakış Açısı',
      members: [
        {
          name: 'Bülent Çebin',
          role: 'Kurucu ve Pazar Stratejisti',
          bio: 'Türkiye ve Romanya pazarlarında sektörel deneyim. ATR Matrix\u2122 metodoloji geliştirme.',
          alt: 'Bülent Çebin - Kurucu ve Pazar Stratejisti',
          image: '/images/about/team-bulent.jpg',
          linkedin: '#',
        },
      ],
    },
  },
  en: {
    meta: {
      title: 'AFA Energy Romania - About Us | Investor-Side Technical Validation',
      description:
        'Investor-side technical validation and decision discipline standard in Romanian renewable energy investments.',
    },
    breadcrumbHome: 'Home',
    breadcrumbSelf: 'About Us',
    hero: {
      motto: 'Clarity Before Investment.',
      title: 'Investor-Side Technical Validation',
      subtitle:
        'Decision discipline and bankability perspective in Romanian renewable energy investments.',
      keys: [
        'Independent positioning on the investor side',
        'Assessment from a bankability perspective',
        'Sectoral experience and ATR Matrix\u2122 methodology',
      ],
    },
    valueSlogan: 'Technical Accuracy. Investor Discipline.',
    model: {
      label: 'Investor-Side Independence',
      title: 'Investor-Side Advisory Model',
      manifesto: {
        title: 'Independence Principle',
        text: 'Our assessments are conducted solely in the interest of the investor, independent of project development, EPC, or equipment sales processes.',
      },
      atrMatrix: {
        title: 'ATR Matrix\u2122 \u2013 AFA\u2019s Decision Standard',
        outcomeTitle: 'Decision Output',
        outcomes: [
          { tag: 'Proceed', color: 'green' as const, text: 'All criteria are met' },
          { tag: 'Conditional', color: 'yellow' as const, text: 'Specific actions must be completed' },
          { tag: 'Do Not Proceed', color: 'gray' as const, text: 'Critical thresholds are not met' },
        ],
      },
    },
    team: {
      label: 'Our Team',
      title: 'A Multidisciplinary Perspective',
      members: [
        {
          name: 'Bülent Çebin',
          role: 'Founder and Market Strategist',
          bio: 'Sectoral experience in Turkey and Romania markets. ATR Matrix\u2122 methodology development.',
          alt: 'Bülent Çebin - Founder and Market Strategist',
          image: '/images/about/team-bulent.jpg',
          linkedin: '#',
        },
      ],
    },
  },
  ro: {
    meta: {
      title: 'AFA Energy Romania - Despre Noi | Validare Tehnică pe Partea Investitorului',
      description:
        'Standard de validare tehnică pe partea investitorului și disciplină decizională în investițiile în energie regenerabilă din România.',
    },
    breadcrumbHome: 'Acasă',
    breadcrumbSelf: 'Despre Noi',
    hero: {
      motto: 'Claritate Înainte de Investiție.',
      title: 'Validare Tehnică pe Partea Investitorului',
      subtitle:
        'Disciplină decizională și perspectivă de bancabilitate în investițiile în energie regenerabilă din România.',
      keys: [
        'Poziționare independentă pe partea investitorului',
        'Evaluare din perspectiva bancabilității',
        'Experiență sectorială și metodologia ATR Matrix\u2122',
      ],
    },
    valueSlogan: 'Acuratețe Tehnică. Disciplină de Investitor.',
    model: {
      label: 'Independența pe Partea Investitorului',
      title: 'Modelul de Consultanță pe Partea Investitorului',
      manifesto: {
        title: 'Principiul Independenței',
        text: 'Evaluările noastre sunt realizate exclusiv în interesul investitorului, independent de procesele de dezvoltare a proiectelor, EPC sau vânzare de echipamente.',
      },
      atrMatrix: {
        title: 'ATR Matrix\u2122 \u2013 Standardul Decizional AFA',
        outcomeTitle: 'Rezultatul Deciziei',
        outcomes: [
          { tag: 'Se poate continua', color: 'green' as const, text: 'Toate criteriile sunt îndeplinite' },
          { tag: 'Condiționat', color: 'yellow' as const, text: 'Acțiuni specifice trebuie finalizate' },
          { tag: 'Nu se poate continua', color: 'gray' as const, text: 'Pragurile critice nu sunt îndeplinite' },
        ],
      },
    },
    team: {
      label: 'Echipa Noastră',
      title: 'O Perspectivă Multidisciplinară',
      members: [
        {
          name: 'Bülent Çebin',
          role: 'Fondator și Strateg de Piață',
          bio: 'Experiență sectorială pe piețele din Turcia și România. Dezvoltarea metodologiei ATR Matrix\u2122.',
          alt: 'Bülent Çebin - Fondator și Strateg de Piață',
          image: '/images/about/team-bulent.jpg',
          linkedin: '#',
        },
      ],
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
  const content = pageContent[validLocale];
  const aboutPaths = LOCALE_PATHS.about;
  const canonicalUrl = canonicalFromFullPath(aboutPaths[validLocale]);

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesFromLocalePaths(aboutPaths),
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      locale: validLocale,
      type: 'website',
      url: canonicalUrl,
      siteName: 'AFA Energy Romania',
    },
  };
}

/* ── Page Component ── */
export default async function AboutPage({
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
    <main className={styles.aboutPage}>
      {/* JSON-LD: Breadcrumbs */}
      <BreadcrumbSchema
        items={[
          { name: content.breadcrumbHome, url: `${SITE_URL}/${locale}` },
          {
            name: content.breadcrumbSelf,
            url: canonicalFromFullPath(LOCALE_PATHS.about[locale]),
          },
        ]}
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="afa-container">
          <p className={styles.motto}>{content.hero.motto}</p>
          <h1 className={styles.heroTitle}>{content.hero.title}</h1>
          <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
          <ul className={styles.heroKeys}>
            {content.hero.keys.map((key, i) => (
              <li key={i} className={styles.heroKey}>{key}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Value Statement ── */}
      <section className={styles.valueStatement}>
        <div className="afa-container">
          <p className={styles.valueSlogan}>{content.valueSlogan}</p>
        </div>
      </section>

      {/* ── Investor-Side Advisory Model ── */}
      <section className={styles.modelSection}>
        <div className="afa-container">
          <p className={styles.sectionLabel}>{content.model.label}</p>
          <h2>{content.model.title}</h2>

          {/* Manifesto Box */}
          <div className={styles.manifestoBox}>
            <h3>{content.model.manifesto.title}</h3>
            <p>{content.model.manifesto.text}</p>
          </div>

          {/* ATR Matrix Outcome Classification */}
          <div className={styles.atrMatrixBox}>
            <h3>{content.model.atrMatrix.title}</h3>
            <div className={styles.atrOutcome}>
              <h4>{content.model.atrMatrix.outcomeTitle}</h4>
              <ul className={styles.outcomeList}>
                {content.model.atrMatrix.outcomes.map((outcome) => (
                  <li key={outcome.tag}>
                    <span className={`${styles.outcomeTag} ${styles[outcome.color]}`}>
                      {outcome.tag}
                    </span>
                    {' '}{outcome.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className={styles.teamSection}>
        <div className="afa-container">
          <p className={styles.sectionLabel}>{content.team.label}</p>
          <h2>{content.team.title}</h2>
          <div className={styles.teamGrid}>
            {content.team.members.map((member) => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.teamPhoto}>
                  <Image
                    src={member.image}
                    alt={member.alt}
                    width={400}
                    height={500}
                    className={styles.teamImage}
                  />
                </div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamMemberName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.teamLinkedin}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
