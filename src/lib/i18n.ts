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
  atrMatrix: string;
  about: string;
  info: string;
  contact: string;
  investorGate: string;
  developerArea: string;
  home: string;
  faq: string;
  knowledgeCenter: string;
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
  footerNavHeading: string;
  footerTechnicalHeading: string;
  footerCorporateHeading: string;
  footerCtaHeading: string;
  footerCtaInvestor: string;
  footerCtaDeveloper: string;
  footerCtaNote: string;
  footerTagline: string;
  footerDescription: string;
  legalCompanyId: string;
  legalDisclaimer: string;
  cookiePolicy: string;
  officeRomania: string;
  officeTurkey: string;
  
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
    atrMatrix: 'ATR Matrix',
    about: 'About',
    info: 'Info',
    contact: 'Contact',
    investorGate: 'Investor Gate',
    developerArea: 'Developer Area',
    home: 'Home',
    faq: 'FAQ',
    knowledgeCenter: 'Knowledge Center',
    reachUs: 'Reach Us',
    motto: 'Clarity Before Investment.',
    valueSlogan: 'Technical Accuracy. Investor Discipline.',
    financeSlogan: 'Bank-Financeable Investments. Independent Advisory.',
    footerBlurb: 'Independent technical advisory and investment decision support.',
    technicalServices: 'Technical Services',
    contactForm: 'Contact Form',
    investorIntake: 'Investor Profiling',
    formsOnlyPolicy: 'Requests are accepted only through forms.',
    footerNavHeading: 'Quick Access',
    footerTechnicalHeading: 'Technical Services',
    footerCorporateHeading: 'Corporate',
    footerCtaHeading: 'APPLICATION',
    footerCtaInvestor: 'Investor Form',
    footerCtaDeveloper: 'Developer Form',
    footerCtaNote: 'Requests are answered within one business day.',
    footerTagline: 'Which projects are truly investment-ready, clearly visible.',
    footerDescription: 'Independent technical advisory in the Romanian and Turkish renewable energy markets.',
    legalCompanyId: 'CUI 51196522 | J2025005686008 | EUID ROONRC.J2025005686008',
    legalDisclaimer: 'The information on this website is for general informational purposes only and does not constitute investment advice, financing guarantee, or legal advisory services.',
    cookiePolicy: 'Cookie Policy',
    officeRomania: 'ROMANIA OFFICE',
    officeTurkey: 'TURKEY OFFICE',
    privacyPolicy: 'Privacy Policy',
    terms: 'Terms',
    companyName: 'AFA Energy Romania S.R.L.',
    addressLine1: 'Strada NERVA TRAIAN, Nr. 27\u201333',
    addressLine2: 'Bucure\u0219ti, Sector 3',
    addressLine3: 'Romania',
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
    atrMatrix: 'Matrice ATR',
    about: 'Despre noi',
    info: 'Informații',
    contact: 'Contact',
    investorGate: 'Poarta Investitorului',
    developerArea: 'Zona Dezvoltatorului',
    home: 'Acasă',
    faq: 'Întrebări frecvente',
    knowledgeCenter: 'Centrul de Cunoștințe',
    reachUs: 'Contactați-ne',
    motto: 'Claritate Înainte de Investiție.',
    valueSlogan: 'Acuratețe Tehnică. Disciplină de Investitor.',
    financeSlogan: 'Investiții Finanțabile Bancar. Consultanță Independentă.',
    footerBlurb: 'Consultanță tehnică independentă și suport pentru decizii de investiții.',
    technicalServices: 'Servicii Tehnice',
    contactForm: 'Formular de Contact',
    investorIntake: 'Profilare Investitor',
    formsOnlyPolicy: 'Cererile sunt acceptate doar prin formulare.',
    footerNavHeading: 'Acces Rapid',
    footerTechnicalHeading: 'Servicii Tehnice',
    footerCorporateHeading: 'Corporativ',
    footerCtaHeading: 'APLICAȚIE',
    footerCtaInvestor: 'Formular Investitor',
    footerCtaDeveloper: 'Formular Dezvoltator',
    footerCtaNote: 'Solicitările primesc răspuns în termen de o zi lucrătoare.',
    footerTagline: 'Care proiecte sunt cu adevărat pregătite pentru investiție, vizibil.',
    footerDescription: 'Consultanță tehnică independentă pe piețele de energie regenerabilă din România și Turcia.',
    legalCompanyId: 'CUI 51196522 | J2025005686008 | EUID ROONRC.J2025005686008',
    legalDisclaimer: 'Informațiile de pe acest site sunt furnizate în scop general de informare și nu constituie consultanță de investiții, garanție de finanțare sau servicii de consiliere juridică.',
    cookiePolicy: 'Politica Cookie',
    officeRomania: 'BIROU ROMÂNIA',
    officeTurkey: 'BIROU TURCIA',
    privacyPolicy: 'Politica de Confidențialitate',
    terms: 'Termeni',
    companyName: 'AFA Energy Romania S.R.L.',
    addressLine1: 'Strada NERVA TRAIAN, Nr. 27\u201333',
    addressLine2: 'Bucure\u0219ti, Sector 3',
    addressLine3: 'România',
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
    atrMatrix: 'ATR Matrix',
    about: 'Hakkımızda',
    info: 'Bilgi',
    contact: 'İletişim',
    investorGate: 'Yatırımcı Kapısı',
    developerArea: 'Geliştirici Alanı',
    home: 'Ana Sayfa',
    faq: 'Sıkça Sorulan Sorular',
    knowledgeCenter: 'Bilgi Merkezi',
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
    footerNavHeading: 'Hızlı Erişim',
    footerTechnicalHeading: 'Teknik Hizmetler',
    footerCorporateHeading: 'Kurumsal',
    footerCtaHeading: 'BAŞVURU',
    footerCtaInvestor: 'Yatırımcı Formu',
    footerCtaDeveloper: 'Geliştirici Formu',
    footerCtaNote: 'Talepler bir iş günü içinde yanıtlanır.',
    footerTagline: 'Hangi projenin gerçekten yatırıma hazır olduğu net görünür.',
    footerDescription: 'Romanya ve Türkiye yenilenebilir enerji pazarlarında bağımsız teknik danışmanlık.',
    legalCompanyId: 'CUI 51196522 | J2025005686008 | EUID ROONRC.J2025005686008',
    legalDisclaimer: 'Bu web sitesindeki bilgiler genel bilgilendirme amaçlıdır; yatırım tavsiyesi, finansman garantisi veya hukuki danışmanlık niteliği taşımaz.',
    cookiePolicy: 'Çerez Politikası',
    officeRomania: 'ROMANYA OFİSİ',
    officeTurkey: 'TÜRKİYE OFİSİ',
    privacyPolicy: 'Gizlilik Politikası',
    terms: 'Şartlar',
    
    // Company info
    companyName: 'AFA Energy Romania S.R.L.',
    addressLine1: 'Strada NERVA TRAIAN, Nr. 27\u201333',
    addressLine2: 'Bucure\u0219ti, Sector 3',
    addressLine3: 'Romania',
    
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
