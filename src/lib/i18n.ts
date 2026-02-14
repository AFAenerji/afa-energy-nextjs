export type Locale = 'en' | 'tr' | 'ro';

export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en', 'tr', 'ro'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
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
    // Navigation
    investor: 'Investor',
    developer: 'Developer',
    services: 'Services',
    cases: 'Case Studies',
    about: 'About',
    info: 'Info',
    contact: 'Contact',
    investorGate: 'Investor Gate',
    developerArea: 'Developer Area',
    home: 'Home',
    faq: 'FAQ',
    reachUs: 'Contact Us',
    
    // Slogans (Official AFA Energy Guide v1.2)
    motto: 'Clarity Before Investment.',
    valueSlogan: 'Technical Accuracy. Investor Discipline.',
    financeSlogan: 'Independent Advisory. Bankable Investments.',
    footerBlurb: 'Independent technical advisory and investment decision support.',
    
    // Footer specific
    technicalServices: 'Technical Services',
    contactForm: 'Contact Form',
    investorIntake: 'Investor Intake',
    formsOnlyPolicy: 'Requests are accepted only via forms.',
    privacyPolicy: 'Privacy Policy',
    terms: 'Terms',
    
    // Company info
    companyName: 'AFA Energy Romania S.R.L.',
    addressLine1: 'Calea GRIVIȚEI Nr. 84–98',
    addressLine2: 'THE MARK OFFICE, Etaj 7',
    addressLine3: 'Bucharest, Sector 1, Romania',
    
    // Homepage content
    whyChoose: 'Why Choose AFA Energy?',
    renewableEnergy: 'Renewable Energy',
    renewableEnergyDesc: 'Solar and wind energy solutions tailored to your needs.',
    energyEfficiency: 'Energy Efficiency',
    energyEfficiencyDesc: 'Consumption optimization and operational cost reduction.',
    expertConsulting: 'Expert Consulting',
    expertConsultingDesc: 'Experienced team of specialists in the energy sector.',
    ctaTitle: 'Start Your Clean Energy Transition',
    ctaSubtitle: 'Contact us today for a free assessment of your energy needs',
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
  ro: {
    // Navigation
    investor: 'Investitor',
    developer: 'Dezvoltator',
    services: 'Servicii',
    cases: 'Studii de caz',
    about: 'Despre',
    info: 'Info',
    contact: 'Contact',
    investorGate: 'Portal Investitori',
    developerArea: 'Zona Dezvoltatori',
    home: 'Acasă',
    faq: 'Întrebări frecvente',
    reachUs: 'Contactați-ne',
    
    // Slogans (Official AFA Energy Guide v1.2)
    motto: 'Claritate înainte de Investiție.',
    valueSlogan: 'Rigoare Tehnică. Disciplină de Investiții.',
    financeSlogan: 'Investiții Finanțabile. Consultanță Independentă.',
    footerBlurb: 'Consultanță tehnică independentă și suport pentru decizia investițională.',
    
    // Footer specific
    technicalServices: 'Servicii Tehnice',
    contactForm: 'Formular de contact',
    investorIntake: 'Profil Investitor',
    formsOnlyPolicy: 'Solicitările sunt preluate exclusiv prin formulare.',
    privacyPolicy: 'Politica de confidențialitate',
    terms: 'Termeni',
    
    // Company info
    companyName: 'AFA Energy Romania S.R.L.',
    addressLine1: 'Calea GRIVIȚEI Nr. 84–98',
    addressLine2: 'THE MARK OFFICE, Etaj 7',
    addressLine3: 'Bucharest, Sector 1, Romania',
    
    // Homepage content
    whyChoose: 'De Ce AFA Energy?',
    renewableEnergy: 'Energie Regenerabilă',
    renewableEnergyDesc: 'Soluții solare și eoliene adaptate nevoilor dumneavoastră.',
    energyEfficiency: 'Eficiență Energetică',
    energyEfficiencyDesc: 'Optimizarea consumului și reducerea costurilor operaționale.',
    expertConsulting: 'Consultanță Expertă',
    expertConsultingDesc: 'Echipă de specialiști cu experiență în sectorul energetic.',
    ctaTitle: 'Începeți Tranziția la Energie Curată',
    ctaSubtitle: 'Contactați-ne astăzi pentru o evaluare gratuită a nevoilor dumneavoastră energetice',
  },
};

export function getTranslation(locale: Locale, key: keyof Translations): string {
  return translations[locale]?.[key] || translations[defaultLocale][key];
}

export function getLocaleFromPathname(pathname: string): Locale {
  const locale = pathname.split('/')[1] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}
