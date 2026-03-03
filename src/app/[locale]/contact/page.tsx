import type { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { LOCALE_PATHS } from '@/lib/routes';
import { canonicalFromFullPath, alternatesFromLocalePaths } from '@/lib/seo/canonical';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { SITE_URL } from '@/lib/env';
import styles from './ContactPage.module.css';
import ContactFormInline from './ContactFormInline';

/* ── Per-locale content ── */
const pageContent = {
  tr: {
    meta: {
      title: 'İletişim | AFA Energy Romania',
      description:
        'AFA Energy Romania ile iletişime geçin. Yenilenebilir enerji yatırımlarında bağımsız teknik danışmanlık.',
    },
    breadcrumbHome: 'Ana Sayfa',
    breadcrumbSelf: 'İletişim',
    hero: {
      motto: 'DOĞRU KANALI SEÇİN.',
      title: 'İletişim',
      subtitle:
        'AFA Energy Romania, Romanya yenilenebilir enerji pazarında bağımsız teknik danışmanlık hizmeti sunmaktadır. Talebinize en uygun iletişim kanalını kullanmanız, değerlendirme sürecinin daha öngörülebilir ilerlemesini destekler.',
    },
    pageIntro:
      'AFA Energy Romania, Romanya yenilenebilir enerji pazarında bağımsız teknik danışmanlık hizmeti sunmaktadır. Talebinize en uygun iletişim kanalını kullanmanız, değerlendirme sürecinin daha öngörülebilir ilerlemesini destekler.',
    routing: {
      investor: {
        title: 'Yatırımcı Talebi İçin Doğru Kanal',
        text: "Romanya'da RtB veya işletmedeki projelerle ilgileniyorsanız, ilk temas için Yatırımcı Erişim sayfasını kullanmanızı öneririz. Bu sayede talebiniz hızlı şekilde doğru ekibe yönlendirilir ve uygun kapsamda değerlendirilir.",
        link: 'Yatırımcı Erişim Sayfasına Git',
        href: '/tr/investor',
      },
      developer: {
        title: 'Proje Geliştirici / Satıcı İçin',
        text: 'Projenizin bağımsız teknik değerlendirmesini veya yatırımcı sunumu desteği gerekiyorsa, Geliştirici & Satıcı Destek kanalını kullanınız. Teknik raporlar ve yatırım komitesi hazırlığında size destek sağlarız.',
        link: 'Geliştirici Destek Sayfasına Git',
        href: '/tr/developer',
      },
    },
    info: {
      title: 'İletişim Bilgileri',
      addressLabel: 'Ofis Adresi',
      emailLabel: 'E-posta',
      phoneLabel: 'Telefon',
      hoursLabel: 'Çalışma Saatleri',
      hoursText: 'Pazartesi – Cuma, 09:00 – 18:00 (İstanbul ve Bükreş saat dilimleri)',
    },
    form: {
      title: 'İletişim Formu',
      intro:
        'Tüm taleplere açıktır. Genel sorular, iş birliği, proje değerlendirmesi ya da diğer konular için bu formu kullanabilirsiniz. Talebiniz ilgili ekibe otomatik olarak yönlendirilecektir.',
      nameLabel: 'Ad Soyad',
      namePlaceholder: 'Örn: John Doe',
      nameHint: 'Tam adınızı giriniz.',
      companyLabel: 'Şirket/Kurum',
      companyPlaceholder: 'Örn: ABC Energy Ltd.',
      companyHint: 'Çalıştığınız veya temsilci olduğunuz kuruluş.',
      emailLabel: 'E-posta',
      emailPlaceholder: 'Örn: john@company.com',
      emailHint: 'Geçerli bir e-posta adresi giriniz.',
      topicLabel: 'Konu (Opsiyonel)',
      topicDefault: '-- Seçiniz --',
      topicOptions: [
        { value: 'service', label: 'Hizmet kapsamı hakkında bilgi' },
        { value: 'project', label: 'Proje değerlendirmesi / TDD talebim var' },
        { value: 'presentation', label: 'Yatırımcı sunumu / IC hazırlığında destek' },
        { value: 'partnership', label: 'İş birliği / ortaklık' },
        { value: 'media', label: 'Medya / etkinlik' },
        { value: 'career', label: 'Kariyer fırsatları' },
        { value: 'other', label: 'Diğer' },
      ],
      messageLabel: 'Mesaj',
      messagePlaceholder: 'Lütfen talebinizi detaylı şekilde yazınız...',
      messageHint:
        'Mesajınızı mümkün olduğunca net ve proje bazında yazmanız değerlendirmeyi hızlandırır.',
      disclaimer:
        'Bu form bilgilendirme ve ön değerlendirme amaçlıdır; finansman garantisi veya yatırım tavsiyesi niteliği taşımaz. Mesajınız değerlendirmeye alınır ve e-posta ile dönüş sağlanır.',
      submitLabel: 'Mesaj Gönder',
      successTitle: 'Mesajınız alındı',
      successText:
        'Talebiniz değerlendirmeye alınmıştır. En kısa sürede sizinle e-posta üzerinden iletişime geçilecektir.',
    },
    standards: {
      title: 'İletişim ve Yanıt Standartlarımız',
      intro:
        'AFA Enerji Danışmanlık olarak, tarafımıza iletilen talepleri yalnızca hızlı yanıt vermek amacıyla değil; doğru, karar verilebilir ve proje özelinde değerlendirilmiş içerikler üretmek amacıyla ele alıyoruz.',
      blocks: [
        {
          title: 'Talep Türüne Göre Yanıt Süresi',
          texts: [
            '<strong>Nitelikli yatırım talepleri:</strong> Alındı teyidi ve ilgili ekibe yönlendirme genellikle 2 iş günü içinde.',
            '<strong>Projeye özel teknik ön değerlendirme:</strong> Veri kapsamına bağlı olarak genellikle 5–7 iş günü.',
            '<strong>Mevcut müşteriler - acil konular:</strong> Öncelikli değerlendirme sürecine eklenir.',
          ],
        },
        {
          title: 'Talebiniz Nasıl İşlenir',
          texts: [
            'İletişim formu üzerinden gönderilen her mesaj; içerik, kapsam ve veri yeterliliği açısından değerlendirilir. Talep, uygun teknik veya idari ekip tarafından işleme alınır. Gerekirse ek bilgi talep edilebilir.',
          ],
        },
        {
          title: 'Talebiniz Nereye Yönlendirilir',
          texts: [
            'Formda seçilen konu başlığına göre talepler ilgili ekipler tarafından değerlendirilir. Yatırım ve proje odaklı başvurular teknik danışmanlık ekipleri tarafından, kurumsal iletişim talepleri ise ilgili birimlere yönlendirilir.',
          ],
        },
        {
          title: 'Yanıt Dili ve Değerlendirme Yöntemi',
          texts: [
            'Yanıtlarımız yazılı olarak sunulur. Türkçe gelen talepler Türkçe, İngilizce talepler İngilizce olarak yanıtlanır. Teknik değerlendirmeler açıklayıcı metinler veya ek belgelerle desteklenebilir.',
          ],
        },
        {
          title: 'Çalışma Takvimi ve Gizlilik',
          texts: [
            'Çalışma saatlerimiz Pazartesi – Cuma, 09:00 – 18:00 (İstanbul ve Bükreş saat dilimleri). Mesai saatleri dışında gelen talepler bir sonraki iş günü değerlendirmeye alınır.',
            'Form üzerinden paylaşılan bilgiler, gizlilik ilkelerimiz çerçevesinde yalnızca ilgili ekiplerle paylaşılır ve yasal gerekliliklere uygun olarak korunur.',
          ],
          full: true,
        },
      ],
    },
  },
  en: {
    meta: {
      title: 'Contact | AFA Energy Romania',
      description:
        'Contact AFA Energy Romania. Independent technical advisory in Romanian renewable energy investments.',
    },
    breadcrumbHome: 'Home',
    breadcrumbSelf: 'Contact',
    hero: {
      motto: 'CHOOSE THE RIGHT CHANNEL.',
      title: 'Contact',
      subtitle:
        'AFA Energy Romania provides independent technical advisory in the Romanian renewable energy market. Using the most appropriate communication channel for your inquiry supports a more predictable evaluation process.',
    },
    pageIntro:
      'AFA Energy Romania provides independent technical advisory in the Romanian renewable energy market. Using the most appropriate communication channel for your inquiry supports a more predictable evaluation process.',
    routing: {
      investor: {
        title: 'Investor Request - Correct Channel',
        text: 'If you are interested in RtB or operational projects in Romania, we recommend using the Investor Access page first. This way, your request is quickly directed to the right team and evaluated at the appropriate scope.',
        link: 'Go to Investor Access',
        href: '/en/investor',
      },
      developer: {
        title: 'Project Developer / Seller - Correct Channel',
        text: 'If you need independent technical evaluation of your project or investor presentation support, use the Developer & Seller Support channel. We provide technical reports and investment committee preparation assistance.',
        link: 'Go to Developer Support',
        href: '/en/developer',
      },
    },
    info: {
      title: 'Contact Information',
      addressLabel: 'Office Address',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      hoursLabel: 'Working Hours',
      hoursText: 'Monday – Friday, 09:00 – 18:00 (Istanbul and Bucharest time zones)',
    },
    form: {
      title: 'Contact Form',
      intro:
        'This form is for all inquiries. General questions, partnerships, project evaluation, or other topics – your request will be automatically directed to the relevant team.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Ex: John Doe',
      nameHint: 'Please enter your full name.',
      companyLabel: 'Company/Organization',
      companyPlaceholder: 'Ex: ABC Energy Ltd.',
      companyHint: 'The organization you work for or represent.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Ex: john@company.com',
      emailHint: 'Enter a valid email address.',
      topicLabel: 'Topic (Optional)',
      topicDefault: '-- Select --',
      topicOptions: [
        { value: 'service', label: 'Service scope information' },
        { value: 'project', label: 'Project evaluation / TDD request' },
        { value: 'presentation', label: 'Investor presentation / IC preparation support' },
        { value: 'partnership', label: 'Partnership / Collaboration' },
        { value: 'media', label: 'Media / Event' },
        { value: 'career', label: 'Career opportunities' },
        { value: 'other', label: 'Other' },
      ],
      messageLabel: 'Message',
      messagePlaceholder: 'Please describe your request in detail...',
      messageHint:
        'Writing your message clearly and project-specific speeds up evaluation.',
      disclaimer:
        'This form is for information and preliminary evaluation purposes; it does not constitute financing guarantees or investment advice. Your message will be reviewed and we will respond via email.',
      submitLabel: 'Send Message',
      successTitle: 'Message Received',
      successText:
        'Your request has been received for review. We will contact you via email shortly.',
    },
    standards: {
      title: 'Communication & Response Standards',
      intro:
        'As AFA Energy Advisory, we approach requests received to us not only for quick responses, but to produce correct, decision-making, and project-specific evaluation content.',
      blocks: [
        {
          title: 'Response Time by Request Type',
          texts: [
            '<strong>Qualified investment requests:</strong> Receipt confirmation and direction to relevant team typically within 2 business days.',
            '<strong>Project-specific technical pre-evaluation:</strong> Depending on data scope, typically completed within 5–7 business days.',
            '<strong>Current customers - urgent matters:</strong> Added to priority evaluation process.',
          ],
        },
        {
          title: 'How Your Request Is Processed',
          texts: [
            'Each message submitted via contact form is evaluated in terms of content, scope, and data sufficiency. The request is handled by the appropriate technical or administrative team. Additional information may be requested if necessary.',
          ],
        },
        {
          title: 'Where Your Request Is Directed',
          texts: [
            'Based on the topic heading selected in the form, requests are evaluated by relevant teams. Investment and project-oriented applications are handled by technical advisory teams, while corporate communication requests are directed to appropriate departments.',
          ],
        },
        {
          title: 'Response Language & Evaluation Method',
          texts: [
            'Our responses are provided in writing. Requests submitted in Turkish are answered in Turkish; requests in English are answered in English. Technical evaluations may be supported with explanatory texts or additional documents.',
          ],
        },
        {
          title: 'Working Calendar & Confidentiality',
          texts: [
            'Our working hours are Monday – Friday, 09:00 – 18:00 (Istanbul and Bucharest time zones). Requests submitted outside business hours are taken for evaluation on the next business day.',
            'Information shared via the form is shared only with relevant teams in accordance with our confidentiality principles and is protected in accordance with legal requirements.',
          ],
          full: true,
        },
      ],
    },
  },
  ro: {
    meta: {
      title: 'Contact | AFA Energy Romania',
      description:
        'Contactați AFA Energy Romania. Consultanță tehnică independentă în investițiile în energie regenerabilă din România.',
    },
    breadcrumbHome: 'Acasă',
    breadcrumbSelf: 'Contact',
    hero: {
      motto: 'ALEGEȚI CANALUL CORECT.',
      title: 'Contact',
      subtitle:
        'AFA Energy Romania oferă consultanță tehnică independentă în piața energiei regenerabile din România. Utilizarea celui mai potrivit canal de comunicare pentru cererea dumneavoastră susține o progresie mai previzibilă a procesului de evaluare.',
    },
    pageIntro:
      'AFA Energy Romania oferă consultanță tehnică independentă în piața energiei regenerabile din România. Utilizarea celui mai potrivit canal de comunicare pentru cererea dumneavoastră susține o progresie mai previzibilă a procesului de evaluare.',
    routing: {
      investor: {
        title: 'Cerere Investitor - Canal Corect',
        text: 'Dacă sunteți interesat de proiecte RtB sau operaționale în România, vă recomandăm să utilizați mai întâi pagina Acces Investitori. În acest fel, cererea dumneavoastră este direcționată rapid către echipa corectă și evaluată la scopul adecvat.',
        link: 'Mergeți la Acces Investitori',
        href: '/ro/investor',
      },
      developer: {
        title: 'Dezvoltator Proiect / Vânzător - Canal Corect',
        text: 'Dacă aveți nevoie de evaluare tehnică independentă a proiectului sau suport pentru prezentarea investitorilor, utilizați canalul Suport Dezvoltator și Vânzător. Oferim rapoarte tehnice și asistență în pregătirea comitetului de investiții.',
        link: 'Mergeți la Suport Dezvoltator',
        href: '/ro/developer',
      },
    },
    info: {
      title: 'Informații de contact',
      addressLabel: 'Adresa Birou',
      emailLabel: 'E-mail',
      phoneLabel: 'Telefon',
      hoursLabel: 'Program de lucru',
      hoursText: 'Luni – Vineri, 09:00 – 18:00 (fusuri orare Istanbul și București)',
    },
    form: {
      title: 'Formular de contact',
      intro:
        'Deschis pentru toate cererile. Întrebări generale, parteneriate, evaluare de proiecte sau alte subiecte - cererea dumneavoastră va fi direcționată automat către echipa relevantă.',
      nameLabel: 'Nume Complet',
      namePlaceholder: 'Ex: John Doe',
      nameHint: 'Introduceți numele complet.',
      companyLabel: 'Companie/Organizație',
      companyPlaceholder: 'Ex: ABC Energy Ltd.',
      companyHint: 'Organizația pentru care lucrați sau pe care o reprezentați.',
      emailLabel: 'Adresă de e-mail',
      emailPlaceholder: 'Ex: john@company.com',
      emailHint: 'Introduceți o adresă de e-mail validă.',
      topicLabel: 'Subiect (Opțional)',
      topicDefault: '-- Selectați --',
      topicOptions: [
        { value: 'service', label: 'Informații despre domeniu servicii' },
        { value: 'project', label: 'Evaluare proiect / cerere TDD' },
        { value: 'presentation', label: 'Prezentare investitor / suport pregătire IC' },
        { value: 'partnership', label: 'Parteneriat / Colaborare' },
        { value: 'media', label: 'Media / Eveniment' },
        { value: 'career', label: 'Oportunități de carieră' },
        { value: 'other', label: 'Altele' },
      ],
      messageLabel: 'Mesaj',
      messagePlaceholder: 'Descrieți în detaliu solicitarea dumneavoastră...',
      messageHint: 'Descrierea clară și specifică a proiectului accelerează evaluarea.',
      disclaimer:
        'Acest formular este doar în scopuri informative și de evaluare preliminară; nu constituie garanții de finanțare sau sfaturi de investiții. Mesajul dumneavoastră va fi evaluat și vă vom răspunde prin e-mail.',
      submitLabel: 'Trimiteți Mesaj',
      successTitle: 'Mesaj primit',
      successText:
        'Cererea dumneavoastră a fost primită pentru evaluare. Vă vom contacta curând prin e-mail.',
    },
    standards: {
      title: 'Standarde de comunicare și răspuns',
      intro:
        'Ca advisor energetic AFA, abordăm cererile primite nu doar pentru răspunsuri rapide, ci pentru a produce conținut de evaluare corect, luabil în decizii și specific proiectelor.',
      blocks: [
        {
          title: 'Timp de răspuns pe tip de cerere',
          texts: [
            '<strong>Cereri de investiții calificate:</strong> Confirmare de primire și direcționare către echipa relevantă, de obicei în 2 zile lucrătoare.',
            '<strong>Evaluare tehnică preliminară specifică proiectului:</strong> În funcție de domeniul datelor, de obicei finalizată în 5–7 zile lucrătoare.',
            '<strong>Clienți actuali - probleme urgente:</strong> Adăugate la procesul de evaluare prioritară.',
          ],
        },
        {
          title: 'Cum este procesată cererea dumneavoastră',
          texts: [
            'Fiecare mesaj trimis prin formularul de contact este evaluat din punct de vedere al conținutului, domeniului și suficienței datelor. Cererea este gestionată de echipa tehnică sau administrativă corespunzătoare. Se pot solicita informații suplimentare dacă este necesar.',
          ],
        },
        {
          title: 'Unde este direcționată cererea dumneavoastră',
          texts: [
            'Pe baza subiectului selectat în formular, cererile sunt evaluate de echipele relevante. Aplicațiile orientate spre investiții și proiecte sunt gestionate de echipele de consultanță tehnică, în timp ce cererile de comunicare corporativă sunt direcționate către departamentele corespunzătoare.',
          ],
        },
        {
          title: 'Limba de răspuns și metoda de evaluare',
          texts: [
            'Răspunsurile noastre sunt furnizate în scris. Cererile trimise în turcă sunt răspunse în turcă; cererile în engleză sunt răspunse în engleză. Evaluările tehnice pot fi susținute cu texte explicative sau documente suplimentare.',
          ],
        },
        {
          title: 'Calendar de lucru și confidențialitate',
          texts: [
            'Programul nostru de lucru este Luni – Vineri, 09:00 – 18:00 (fusuri orare Istanbul și București). Cererile trimise în afara orelor de lucru sunt luate în evaluare în următoarea zi lucrătoare.',
            'Informațiile partajate prin formular sunt împărtășite doar cu echipele relevante în conformitate cu principiile noastre de confidențialitate și sunt protejate în conformitate cu cerințele legale.',
          ],
          full: true,
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
  const contactPaths = LOCALE_PATHS.contact;
  const canonicalUrl = canonicalFromFullPath(contactPaths[validLocale]);

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesFromLocalePaths(contactPaths),
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

/* ── Static Params ── */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ── Page Component ── */
export default async function ContactPage({
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
    <main className={styles.contactPage}>
      {/* JSON-LD: Breadcrumbs */}
      <BreadcrumbSchema
        items={[
          { name: content.breadcrumbHome, url: `${SITE_URL}/${locale}` },
          {
            name: content.breadcrumbSelf,
            url: canonicalFromFullPath(LOCALE_PATHS.contact[locale]),
          },
        ]}
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroInner}>
            <p className={styles.heroMotto}>{content.hero.motto}</p>
            <h1 className={styles.heroTitle}>{content.hero.title}</h1>
            <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* ── Main Content: Info + Form ── */}
      <section className={styles.mainSection}>
        <div className="afa-container">
          <div className={styles.mainGrid}>
            {/* LEFT COLUMN */}
            <div className={styles.leftColumn}>
              <div>
                <h2 className={styles.pageTitle}>{content.hero.title}</h2>
                <p className={styles.pageIntro}>{content.pageIntro}</p>
              </div>

              {/* Routing: Investor */}
              <div className={styles.routingCard}>
                <h3 className={styles.routingTitle}>{content.routing.investor.title}</h3>
                <p className={styles.routingText}>{content.routing.investor.text}</p>
                <a href={content.routing.investor.href} className={styles.routingLink}>
                  {content.routing.investor.link}
                </a>
              </div>

              {/* Routing: Developer */}
              <div className={styles.routingCard}>
                <h3 className={styles.routingTitle}>{content.routing.developer.title}</h3>
                <p className={styles.routingText}>{content.routing.developer.text}</p>
                <a href={content.routing.developer.href} className={styles.routingLink}>
                  {content.routing.developer.link}
                </a>
              </div>

              {/* Contact Info */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>{content.info.title}</h3>

                <div className={styles.infoGroup}>
                  <p className={styles.infoLabel}>{content.info.addressLabel}</p>
                  <p className={styles.infoValue}>
                    AFA ENERGY ROMANIA S.R.L.<br />
                    Sediu social: București, Sectorul 3<br />
                    Strada NERVA TRAIAN, Nr. 27–33<br />
                    Birou 6, Scara B, Etaj 1
                  </p>
                </div>

                <div className={styles.infoGroup}>
                  <p className={styles.infoLabel}>{content.info.emailLabel}</p>
                  <p className={styles.infoValue}>
                    <a href="mailto:info@afaenergy.ro" className={styles.infoLink}>
                      info@afaenergy.ro
                    </a>
                  </p>
                </div>

                <div className={styles.infoGroup}>
                  <p className={styles.infoLabel}>{content.info.phoneLabel}</p>
                  <p className={styles.infoValue}>
                    <a href="tel:+40850360" className={styles.infoLink}>
                      +40 850 360
                    </a>
                  </p>
                </div>

                <div className={styles.infoGroup}>
                  <p className={styles.infoLabel}>{content.info.hoursLabel}</p>
                  <p className={styles.infoValue}>{content.info.hoursText}</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Form */}
            <div>
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>{content.form.title}</h2>
                <p className={styles.formIntro}>{content.form.intro}</p>
                <ContactFormInline locale={locale} content={content.form} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className={styles.mapSection}>
        <div className="afa-container">
          <div className={styles.mapFrame}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8!2d26.103!3d44.406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201e5d7b5b5b5%3A0x1d1d1d1d1d1d1d1d!2sStrada%20NERVA%20TRAIAN%2027-33%2C%20Bucharest%203!5e0!3m2!1sen!2sro!4v1234567890"
              title="AFA Energy Romania Office Location"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── Communication Standards ── */}
      <section className={styles.standardsSection}>
        <div className="afa-container">
          <h3 className={styles.standardsTitle}>{content.standards.title}</h3>

          <div className={styles.standardsIntro}>
            <p className={styles.standardsIntroText}>{content.standards.intro}</p>
          </div>

          <div className={styles.standardsGrid}>
            {content.standards.blocks.map((block) => (
              <div
                key={block.title}
                className={
                  'full' in block && block.full
                    ? styles.standardBlockFull
                    : styles.standardBlock
                }
              >
                <h4 className={styles.standardBlockTitle}>{block.title}</h4>
                {block.texts.map((text, i) => (
                  <p
                    key={i}
                    className={styles.standardBlockText}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
