import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import TechnicalAssessmentForm from '@/components/services/TechnicalAssessmentForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afaenergy.eu';

/* ── Per-locale page content ── */
const pageContent = {
  tr: {
    meta: {
      title: 'Teknik Ön Değerlendirme Talebi | AFA Energy Romania',
      description: 'Romanya yenilenebilir enerji projeniz için bağımsız teknik ön değerlendirme talep formu. ATR analizi, şebeke fizibilite ve bankability değerlendirmesi.',
    },
    hero: {
      title: 'Teknik Ön Değerlendirme Talebi',
      subtitle: 'Projenizin teknik fizibilitesini bağımsız olarak değerlendirmek için aşağıdaki formu doldurun. İlk geri dönüş 48 saat içinde yapılır.',
    },
    form: {
      stepLabels: ['Proje Kimliği', 'Teknik Filtre', 'Veri Durumu'],
      step1: {
        title: 'Proje Kimliği',
        nameLabel: 'Ad Soyad',
        namePlaceholder: 'Adınız ve soyadınız',
        companyLabel: 'Kurum / Şirket',
        companyPlaceholder: 'Şirket adı (opsiyonel)',
        emailLabel: 'E-posta',
        emailPlaceholder: 'ornek@sirket.com',
        emailHint: 'Kurumsal e-posta adresi tercih edilir.',
      },
      step2: {
        title: 'Teknik Filtre',
        atrLabel: 'ATR Durumu',
        atrOptions: [
          { value: 'approved', label: 'Onaylandı' },
          { value: 'in-process', label: 'Süreçte' },
          { value: 'none', label: 'Yok' },
        ],
        capacityLabel: 'Kurulu Güç (MW)',
        capacityPlaceholder: 'Örn: 50',
        phaseLabel: 'Proje Aşaması',
        phaseOptions: [
          { value: 'land-development', label: 'Arazi Geliştirme' },
          { value: 'rtb', label: 'RTB (Ready to Build)' },
          { value: 'operational', label: 'İşletme' },
        ],
      },
      step3: {
        title: 'Veri Durumu',
        dataLabel: 'Teknik veriler (Yield, Grid Study) hazır mı?',
        dataOptions: [
          { value: 'yes', label: 'Evet' },
          { value: 'no', label: 'Hayır' },
        ],
      },
      next: 'Devam',
      prev: 'Geri',
      submit: 'Talebi Gönder',
      submitting: 'Gönderiliyor…',
      thankYou: {
        title: 'Talebiniz Alındı',
        message: 'Teknik ön değerlendirme talebiniz başarıyla iletildi. Aşağıda sürecin sonraki adımlarını bulabilirsiniz.',
        steps: [
          'Talebiniz 48 saat içinde teknik ekibimiz tarafından incelenecektir.',
          'Ön değerlendirme kapsamı ve zaman çizelgesi e-posta ile paylaşılacaktır.',
          'ATR Matrix™ metodolojisi ile bağımsız teknik analiz başlatılacaktır.',
          'Nihai rapor ve yatırım kararı desteği sunulacaktır.',
        ],
        backLabel: '← Hizmetler Sayfasına Dön',
      },
      validation: {
        required: 'Bu alan zorunludur.',
        emailInvalid: 'Geçerli bir e-posta adresi giriniz.',
      },
    },
  },
  en: {
    meta: {
      title: 'Technical Pre-Assessment Request | AFA Energy Romania',
      description: 'Request an independent technical pre-assessment for your renewable energy project in Romania. ATR analysis, grid feasibility, and bankability assessment.',
    },
    hero: {
      title: 'Technical Pre-Assessment Request',
      subtitle: 'Fill out the form below to have your project\'s technical feasibility independently assessed. Initial response within 48 hours.',
    },
    form: {
      stepLabels: ['Project Identity', 'Technical Filter', 'Data Status'],
      step1: {
        title: 'Project Identity',
        nameLabel: 'Full Name',
        namePlaceholder: 'Your full name',
        companyLabel: 'Company / Organization',
        companyPlaceholder: 'Company name (optional)',
        emailLabel: 'Email',
        emailPlaceholder: 'example@company.com',
        emailHint: 'Corporate email address preferred.',
      },
      step2: {
        title: 'Technical Filter',
        atrLabel: 'ATR Status',
        atrOptions: [
          { value: 'approved', label: 'Approved' },
          { value: 'in-process', label: 'In Process' },
          { value: 'none', label: 'None' },
        ],
        capacityLabel: 'Installed Capacity (MW)',
        capacityPlaceholder: 'e.g. 50',
        phaseLabel: 'Project Phase',
        phaseOptions: [
          { value: 'land-development', label: 'Land Development' },
          { value: 'rtb', label: 'RTB (Ready to Build)' },
          { value: 'operational', label: 'Operational' },
        ],
      },
      step3: {
        title: 'Data Availability',
        dataLabel: 'Are technical data (Yield, Grid Study) available?',
        dataOptions: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      next: 'Continue',
      prev: 'Back',
      submit: 'Submit Request',
      submitting: 'Submitting…',
      thankYou: {
        title: 'Request Received',
        message: 'Your technical pre-assessment request has been successfully submitted. Below are the next steps in the process.',
        steps: [
          'Your request will be reviewed by our technical team within 48 hours.',
          'Pre-assessment scope and timeline will be shared via email.',
          'Independent technical analysis will be initiated using the ATR Matrix™ methodology.',
          'Final report and investment decision support will be delivered.',
        ],
        backLabel: '← Back to Services',
      },
      validation: {
        required: 'This field is required.',
        emailInvalid: 'Please enter a valid email address.',
      },
    },
  },
  ro: {
    meta: {
      title: 'Solicitare Evaluare Tehnică Preliminară | AFA Energy Romania',
      description: 'Solicitați o evaluare tehnică preliminară independentă pentru proiectul dumneavoastră de energie regenerabilă din România.',
    },
    hero: {
      title: 'Solicitare Evaluare Tehnică Preliminară',
      subtitle: 'Completați formularul de mai jos pentru a avea fezabilitatea tehnică a proiectului dumneavoastră evaluată independent. Răspuns inițial în 48 de ore.',
    },
    form: {
      stepLabels: ['Identitate Proiect', 'Filtru Tehnic', 'Disponibilitate Date'],
      step1: {
        title: 'Identitate Proiect',
        nameLabel: 'Nume Complet',
        namePlaceholder: 'Numele dumneavoastră complet',
        companyLabel: 'Companie / Organizație',
        companyPlaceholder: 'Numele companiei (opțional)',
        emailLabel: 'Email',
        emailPlaceholder: 'exemplu@companie.com',
        emailHint: 'Se preferă adresa de email corporativă.',
      },
      step2: {
        title: 'Filtru Tehnic',
        atrLabel: 'Statut ATR',
        atrOptions: [
          { value: 'approved', label: 'Aprobat' },
          { value: 'in-process', label: 'În Proces' },
          { value: 'none', label: 'Inexistent' },
        ],
        capacityLabel: 'Capacitate Instalată (MW)',
        capacityPlaceholder: 'ex. 50',
        phaseLabel: 'Faza Proiectului',
        phaseOptions: [
          { value: 'land-development', label: 'Dezvoltare Teren' },
          { value: 'rtb', label: 'RTB (Ready to Build)' },
          { value: 'operational', label: 'Operațional' },
        ],
      },
      step3: {
        title: 'Disponibilitate Date',
        dataLabel: 'Sunt disponibile datele tehnice (Yield, Grid Study)?',
        dataOptions: [
          { value: 'yes', label: 'Da' },
          { value: 'no', label: 'Nu' },
        ],
      },
      next: 'Continuă',
      prev: 'Înapoi',
      submit: 'Trimite Solicitarea',
      submitting: 'Se trimite…',
      thankYou: {
        title: 'Solicitare Primită',
        message: 'Solicitarea dumneavoastră de evaluare tehnică preliminară a fost trimisă cu succes. Mai jos sunt pașii următori.',
        steps: [
          'Solicitarea dumneavoastră va fi analizată de echipa noastră tehnică în 48 de ore.',
          'Domeniul și calendarul evaluării preliminare vor fi comunicate prin email.',
          'Analiza tehnică independentă va fi inițiată folosind metodologia ATR Matrix™.',
          'Raportul final și suportul pentru decizia de investiție vor fi livrate.',
        ],
        backLabel: '← Înapoi la Servicii',
      },
      validation: {
        required: 'Acest câmp este obligatoriu.',
        emailInvalid: 'Vă rugăm introduceți o adresă de email validă.',
      },
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
      canonical: `${SITE_URL}/${validLocale}/teknik-on-degerlendirme`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/teknik-on-degerlendirme`]),
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${validLocale}/teknik-on-degerlendirme`,
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
interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function TeknikOnDegerlendirmePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const content = pageContent[locale];

  return (
    <>
      {/* Hero */}
      <section className="w-full dark-section pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="afa-container">
          <div className="mb-8" aria-hidden="true">
            <div className="h-px w-full bg-white/10" />
            <div className="mt-4 h-[3px] w-16 rounded-sm afa-bridge-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {content.hero.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/70 max-w-3xl">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="w-full dark-section py-12 lg:py-16">
        <div className="afa-container">
          <TechnicalAssessmentForm locale={locale} content={content.form} />
        </div>
      </section>
    </>
  );
}
