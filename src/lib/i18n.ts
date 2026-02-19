export type Locale = 'tr' | 'en' | 'ro';

export const defaultLocale: Locale = 'tr';

export const locales = ['tr', 'en', 'ro'] as const;

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  ro: 'Română',
};

export interface Translations {
  // Navigation
  investor: string;
  developer: string;
  services: string;
  cases: string;
  about: string;
  info: string;
  contact: string;
  investorGate: string;
  developerArea: string;
  home: string;
  faq: string;
  reachUs: string;
  
  // Slogans (from AFA Energy Guide v1.2)
  motto: string; // Main Motto — Section 2.1
  valueSlogan: string; // Value Slogan — Section 2.2
  financeSlogan: string; // Finance Slogan (Short) — Section 2.3
  footerBlurb: string;
  
  // Footer specific
  technicalServices: string;
  contactForm: string;
  investorIntake: string;
  formsOnlyPolicy: string;
  privacyPolicy: string;
  terms: string;
  
  // Company info
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  
  // Homepage content
  whyChoose: string;
  renewableEnergy: string;
  renewableEnergyDesc: string;
  energyEfficiency: string;
  energyEfficiencyDesc: string;
  expertConsulting: string;
  expertConsultingDesc: string;
  ctaTitle: string;
  ctaSubtitle: string;
}

export const translations: Record<Locale, Translations> = {
  en: {
    investor: 'Investor',
    developer: 'Developer',
    services: 'Services',
    cases: 'Cases',
    about: 'About',
    info: 'Info',
    contact: 'Contact',
    investorGate: 'Investor Gate',
    developerArea: 'Developer Area',
    home: 'Home',
    faq: 'FAQ',
    reachUs: 'Reach Us',
    motto: 'Clarity Before Investment.',
    valueSlogan: 'Technical Accuracy. Investor Discipline.',
    financeSlogan: 'Bank-Financeable Investments. Independent Advisory.',
    footerBlurb: 'Independent technical advisory and investment decision support.',
    technicalServices: 'Technical Services',
    contactForm: 'Contact Form',
    investorIntake: 'Investor Profiling',
    formsOnlyPolicy: 'Requests are accepted only through forms.',
    privacyPolicy: 'Privacy Policy',
    terms: 'Terms',
    companyName: 'AFA Energy Romania S.R.L.',
    addressLine1: 'Calea GRIVIȚEI Nr. 84–98',
    addressLine2: 'THE MARK OFFICE, Floor 7',
    addressLine3: 'Bucharest, Sector 1, Romania',
    whyChoose: 'Why AFA Energy?',
    renewableEnergy: 'Renewable Energy',
    renewableEnergyDesc: 'Solar and wind energy solutions tailored to your needs.',
    energyEfficiency: 'Energy Efficiency',
    energyEfficiencyDesc: 'Consumption optimization to reduce operational costs.',
    expertConsulting: 'Expert Consulting',
    expertConsultingDesc: 'Experienced expert team in the energy sector.',
    ctaTitle: 'Start Your Clean Energy Transition',
    ctaSubtitle: 'Request a free assessment for your energy needs',
  },
  ro: {
    investor: 'Investitor',
    developer: 'Dezvoltator',
    services: 'Servicii',
    cases: 'Cazuri',
    about: 'Despre noi',
    info: 'Informații',
    contact: 'Contact',
    investorGate: 'Poarta Investitorului',
    developerArea: 'Zona Dezvoltatorului',
    home: 'Acasă',
    faq: 'Întrebări frecvente',
    reachUs: 'Contactați-ne',
    motto: 'Claritate Înainte de Investiție.',
    valueSlogan: 'Acuratețe Tehnică. Disciplină de Investitor.',
    financeSlogan: 'Investiții Finanțabile Bancar. Consultanță Independentă.',
    footerBlurb: 'Consultanță tehnică independentă și suport pentru decizii de investiții.',
    technicalServices: 'Servicii Tehnice',
    contactForm: 'Formular de Contact',
    investorIntake: 'Profilare Investitor',
    formsOnlyPolicy: 'Cererile sunt acceptate doar prin formulare.',
    privacyPolicy: 'Politica de Confidențialitate',
    terms: 'Termeni',
    companyName: 'AFA Energy Romania S.R.L.',
    addressLine1: 'Calea GRIVIȚEI Nr. 84–98',
    addressLine2: 'THE MARK OFFICE, Etaj 7',
    addressLine3: 'București, Sector 1, România',
    whyChoose: 'De ce AFA Energy?',
    renewableEnergy: 'Energie Regenerabilă',
    renewableEnergyDesc: 'Soluții de energie solară și eoliană adaptate nevoilor dumneavoastră.',
    energyEfficiency: 'Eficiență Energetică',
    energyEfficiencyDesc: 'Optimizarea consumului pentru reducerea costurilor operaționale.',
    expertConsulting: 'Consultanță Expert',
    expertConsultingDesc: 'Echipă de experți cu experiență în sectorul energetic.',
    ctaTitle: 'Începeți Tranziția către Energie Curată',
    ctaSubtitle: 'Solicitați o evaluare gratuită pentru nevoile dumneavoastră energetice',
  },
  tr: {
    // Navigation
    investor: 'Yatırımcı',
    developer: 'Geliştirici',
    services: 'Hizmetler',
    cases: 'Vakalar',
    about: 'Hakkımızda',
    info: 'Bilgi',
    contact: 'İletişim',
    investorGate: 'Yatırımcı Kapısı',
    developerArea: 'Geliştirici Alanı',
    home: 'Ana Sayfa',
    faq: 'Sıkça Sorulan Sorular',
    reachUs: 'Bize Ulaşın',
    
    // Slogans (Official AFA Energy Guide v1.2)
    motto: 'Yatırımdan Önce Netlik.',
    valueSlogan: 'Teknik Doğruluk. Yatırımcı Disiplini.',
    financeSlogan: 'Banka Finansmanına Uygun Yatırımlar. Bağımsız Danışmanlık.',
    footerBlurb: 'Bağımsız teknik danışmanlık ve yatırım kararı destek yaklaşımı.',
    
    // Footer specific
    technicalServices: 'Teknik Hizmetler',
    contactForm: 'İletişim Formu',
    investorIntake: 'Yatırımcı Profilleme',
    formsOnlyPolicy: 'Talepler yalnızca formlar üzerinden alınır.',
    privacyPolicy: 'Gizlilik Politikası',
    terms: 'Şartlar',
    
    // Company info
    companyName: 'AFA Energy Romania S.R.L.',
    addressLine1: 'Calea GRIVIȚEI Nr. 84–98',
    addressLine2: 'THE MARK OFFICE, Etaj 7',
    addressLine3: 'Bucharest, Sector 1, Romania',
    
    // Homepage content
    whyChoose: 'Neden AFA Energy?',
    renewableEnergy: 'Yenilenebilir Enerji',
    renewableEnergyDesc: 'İhtiyaçlarınıza uygun güneş ve rüzgar enerjisi çözümleri.',
    energyEfficiency: 'Enerji Verimliliği',
    energyEfficiencyDesc: 'Operasyonel maliyetleri düşürmek için tüketim optimizasyonu.',
    expertConsulting: 'Uzman Danışmanlık',
    expertConsultingDesc: 'Enerji sektöründe deneyimli uzman ekibi.',
    ctaTitle: 'Temiz Enerjiye Geçişe Başlayın',
    ctaSubtitle: 'Enerji ihtiyaçlarınız için ücretsiz değerlendirme talebinde bulunun',
  },
};

export function getTranslation(locale: Locale, key: keyof Translations): string {
  return translations[locale]?.[key] || translations[defaultLocale][key];
}

export function getLocaleFromPathname(pathname: string): Locale {
  const locale = pathname.split('/')[1] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}
