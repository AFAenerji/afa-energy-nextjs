'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Linkedin } from 'lucide-react';

// Local clsx helper — temporary fix for externally modified file
function clsx(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(' ');
}

const AFA = {
  primary: '#18625F',
  accent: '#28AFB0',
  gold: '#FFCB00',
  warning: '#F25F5C',
  deep: '#0F2E2C',
  light: '#F5F5F5',
};

const SHADOW = '0 1px 2px 0 rgba(0,0,0,0.05)';

const FAQ_ITEMS = [
  {
    q: 'İlk görüşme veya ön değerlendirme ücretli midir?',
    a: 'Hayır. İlk görüşme ve kapsam belirleme aşaması ücretsizdir. Projenin veya yatırım talebinin kapsamı netleştikten sonra, hizmet önerisi ve ücret yapısı yazılı olarak sunulur.',
  },
  {
    q: 'Hangi ölçekte projeler değerlendirilmektedir?',
    a: 'AFA, 5 MW ve üzeri güneş (GES), rüzgâr (RES) ve enerji depolama (BESS) projelerini teknik disiplinle değerlendirir. Değerlendirmeden geçen projeler, risk profilleriyle birlikte yatırımcı tarafında görünür hale gelir. Portföy seviyesinde çoklu varlık analizleri de hizmet kapsamındadır.',
  },
  {
    q: 'Gizlilik sözleşmesi (NDA) süreci nasıl işler?',
    a: 'Proje spesifik bilgi paylaşımı öncesinde karşılıklı gizlilik sözleşmesi (NDA) imzalanır. Standart NDA taslaklarımız hazırdır; süreç genellikle 1–2 iş günü içinde tamamlanır.',
  },
  {
    q: 'AFA, EPC yükleniciliği veya proje geliştirme hizmeti sunuyor mu?',
    a: 'Hayır. AFA proje geliştirme, ekipman satışı veya yüklenicilik (EPC) faaliyeti yürütmez. AFA\u2019nın rolü, teknik doğrulama disiplini üzerinden doğru projeyi doğru yatırımcıyla buluşturmaktır. Bu yapı, değerlendirmelerin yalnızca teknik gerçeklik ve yatırımcı çıkarı doğrultusunda yapılmasını sağlar.',
  },
  {
    q: 'Değerlendirme süreci ne kadar zaman alır?',
    a: 'Kapsam ve veri hazırlığına bağlı olarak değişir. ATR ön incelemesi 5–10 iş günü, kapsamlı teknik değerlendirme 3–6 hafta, TDD koordinasyonu proje karmaşıklığına göre belirlenir. Her aşamanın takvimi yazılı olarak paylaşılır.',
  },
  {
    q: 'Romanya dışındaki projeleri de değerlendiriyor musunuz?',
    a: 'Türkiye ve Romanya ana pazarlarımızdır. Güneydoğu Avrupa genelindeki yenilenebilir enerji projelerini de değerlendirmekteyiz. Coğrafi kapsam, projenin teknik ve regülatif yapısına göre belirlenir.',
  },
  {
    q: 'AFA\u2019nın teknik değerlendirmesinden geçen bir proje nasıl ilerler?',
    a: 'AFA\u2019ya sunulan her proje, ATR Matrix™ metodolojisi ile dört temel alanda incelenir: bağlantı gerçekliği, şebeke dinamikleri, izin zinciri ve finansal dayanıklılık. Değerlendirme sonucunda \u2018İlerlenebilir\u2019 statüsü alan projeler, risk profili ve teknik bulgularla birlikte yatırımcı tarafında görünür hale gelir. Profil eşleştirmesi teknik değerlendirme süreci içinde gerçekleşir; geliştirici ve yatırımcı arasındaki ilk temas karşılıklı NDA sonrası koordine edilir.',
  },
];

const TOPIC_GROUPS = [
  {
    label: 'Yatırımcı',
    options: [
      { value: 'investment', label: 'Yatırım Fırsatı Değerlendirmesi' },
      { value: 'portfolio', label: 'Mevcut Portföy Teknik İncelemesi' },
    ],
  },
  {
    label: 'Geliştirici',
    options: [
      { value: 'tdd', label: 'Projem İçin Bağımsız Teknik Değerlendirme' },
      { value: 'atr', label: 'Teknik Ön İnceleme / ATR Analiz Talebi (Pre-TDD)' },
    ],
  },
  {
    label: 'Finansman',
    options: [
      { value: 'finance', label: 'Finansman Süreci Teknik Destek' },
      { value: 'lender', label: 'Borç Veren Teknik Doğrulama' },
    ],
  },
  {
    label: 'Genel',
    options: [
      { value: 'partnership', label: 'İş Birliği / Ortaklık Önerisi' },
      { value: 'other', label: 'Diğer' },
    ],
  },
];

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  _hp: string;
}

type ValidatedField = 'name' | 'company' | 'email' | 'message';
type FormErrors = Partial<Record<ValidatedField, string>>;
type Touched = Record<ValidatedField, boolean>;

const INITIAL_FORM: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
  _hp: '',
};

const INITIAL_TOUCHED: Touched = {
  name: false,
  company: false,
  email: false,
  message: false,
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = 'Ad Soyad gerekli (en az 2 karakter)';
  if (!data.company.trim() || data.company.trim().length < 2)
    errors.company = 'Şirket adı gerekli (en az 2 karakter)';
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Geçerli bir e-posta adresi giriniz';
  if (!data.message.trim() || data.message.trim().length < 10)
    errors.message = 'Mesaj gerekli (en az 10 karakter)';
  return errors;
}

const baseInputStyle: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#1F2937',
  padding: '8px 12px',
  width: '100%',
  transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out, background-color 200ms ease-out',
  outline: 'none',
};

export default function ContactPageClient({ locale }: { locale: string }) {
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set([0]));
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [touched, setTouched] = useState<Touched>(INITIAL_TOUCHED);
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  const currentErrors = validate(formData);

  const set = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field: string) => setFocused(field);
  const handleBlur = (field: ValidatedField) => {
    setFocused(null);
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const fieldBorder = (field: ValidatedField) => {
    if (focused === field) return AFA.accent;
    if (touched[field] && currentErrors[field]) return AFA.warning;
    return '#E5E7EB';
  };

  const fieldShadow = (field: string) => {
    if (focused === field) return '0 0 0 4px rgba(40,175,176,0.1)';
    return 'none';
  };

  const filledBg = (field: keyof FormData) =>
    formData[field].trim() ? '#F0FDFA' : '#FFFFFF';

  const inputStyle = (field: ValidatedField): React.CSSProperties => ({
    ...baseInputStyle,
    backgroundColor: filledBg(field),
    border: `1px solid ${fieldBorder(field)}`,
    boxShadow: fieldShadow(field),
  });

  const optionalInputStyle = (field: keyof FormData): React.CSSProperties => ({
    ...baseInputStyle,
    backgroundColor: filledBg(field),
    border: `1px solid ${focused === field ? AFA.accent : '#E5E7EB'}`,
    boxShadow: focused === field ? '0 0 0 4px rgba(40,175,176,0.1)' : 'none',
  });

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setTouched({ name: true, company: true, email: true, message: true });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          role: formData.topic || 'default',
          locale,
          _hp: formData._hp,
        }),
      });
      if (!res.ok) throw new Error('Server error');

      setShowSuccess(true);
      setFormData(INITIAL_FORM);
      setTouched(INITIAL_TOUCHED);
      successTimer.current = setTimeout(() => setShowSuccess(false), 5000);
    } catch {
      setSubmitError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const linkHover = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = AFA.primary;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = AFA.accent;
    },
  };

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <Image
          src="/images/contact_Page_Hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 46, 44, 0.75)',
          }}
          aria-hidden="true"
        />
        <div className={clsx('relative', 'z-10', 'max-w-6xl', 'mx-auto', 'px-4', 'md:px-6', 'lg:px-8', 'py-20', 'md:py-24', 'lg:py-28')}>
          <div className={clsx('flex', 'flex-col', 'md:flex-row', 'md:items-center', 'md:justify-between')}>
            <div className={clsx('flex-shrink-0', 'mb-8', 'md:mb-0', 'md:ml-8', 'lg:ml-16', 'md:order-last')}>
              <Image
                src="/images/dikey_afa_beyaz.png"
                alt="AFA Energy Romania logosu"
                width={192}
                height={231}
                className={clsx('w-24', 'mx-auto', 'md:w-40', 'lg:w-48', 'h-auto', 'md:mx-0')}
                style={{ opacity: 0.9 }}
              />
            </div>
            <div className={clsx('flex-1', 'max-w-2xl')}>
              <h1
                className={clsx('text-5xl', 'md:text-6xl', 'font-normal', 'leading-tight', 'mb-2')}
                style={{ color: '#FFFFFF' }}
              >
                İletişim
              </h1>
              <p
                className={clsx('text-lg', 'md:text-xl', 'font-semibold', 'tracking-wide', 'mb-6')}
                style={{ color: AFA.accent }}
              >
                Yatırımdan Önce Netlik.
              </p>
              <p
                className={clsx('text-base', 'md:text-lg', 'leading-relaxed', 'mb-4')}
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                AFA, teknik gerçekliği netleştirerek doğru projeyi doğru yatırımcıyla buluşturur.
              </p>
              <p
                className={clsx('text-sm', 'md:text-base', 'leading-relaxed')}
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Yatırım kararınızı netleştirmek veya projenizin teknik güvenilirliğini değerlendirmek için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={clsx('max-w-6xl', 'mx-auto', 'px-4', 'md:px-6', 'lg:px-8', 'py-12', 'md:py-16')}>
          <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-6')}>
            <div
              className={clsx('flex', 'flex-col', 'h-full', 'bg-white', 'rounded-lg', 'p-6', 'border', 'border-gray-200')}
              style={{ borderLeft: `4px solid ${AFA.accent}`, boxShadow: SHADOW }}
            >
              <p
                className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider', 'mb-3')}
                style={{ color: AFA.primary }}
              >
                FİLTRELENMİŞ PROJE AKIŞI
              </p>
              <p className={clsx('text-sm', 'leading-relaxed', 'text-gray-600', 'mb-4')}>
                Romanya&apos;da yenilenebilir enerji yatırımı arıyorsanız, ham proje listelerine zaman harcamanıza gerek yok. AFA&apos;nın ATR Matrix™ metodolojisinden geçmiş, teknik riski sınıflandırılmış ve yatırım komitesine sunulabilir projelere doğrudan erişin.
              </p>
              <a
                href="/tr/yatirimci"
                className={clsx('mt-auto', 'pt-4', 'text-sm', 'font-semibold', 'underline')}
                style={{ color: AFA.accent, transition: 'color 150ms ease-out' }}
                {...linkHover}
              >
                Yatırımcı Profilleme Sayfasına Git →
              </a>
            </div>

            <div
              className={clsx('flex', 'flex-col', 'h-full', 'bg-white', 'rounded-lg', 'p-6', 'border', 'border-gray-200')}
              style={{ borderLeft: `4px solid ${AFA.accent}`, boxShadow: SHADOW }}
            >
              <p
                className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider', 'mb-3')}
                style={{ color: AFA.primary }}
              >
                PROJENİZİN TEKNİK GÜVENİLİRLİĞİNİ ARTIRIN
              </p>
              <p className={clsx('text-sm', 'leading-relaxed', 'text-gray-600', 'mb-4')}>
                Projenizin teknik dosyası yatırımcı karşısında savunulabilir mi? AFA&apos;nın bağımsız değerlendirmesi, projenize yatırımcı nezdinde güvenilirlik kazandırır ve yatırımcı tarafında görünür hale getirir.
              </p>
              <a
                href="/tr/gelistirici"
                className={clsx('mt-auto', 'pt-4', 'text-sm', 'font-semibold', 'underline')}
                style={{ color: AFA.accent, transition: 'color 150ms ease-out' }}
                {...linkHover}
              >
                Proje Geliştiricisi Sayfasına Git →
              </a>
            </div>

            <div
              className={clsx('flex', 'flex-col', 'h-full', 'bg-white', 'rounded-lg', 'p-6', 'border', 'border-gray-200')}
              style={{ borderLeft: `4px solid ${AFA.accent}`, boxShadow: SHADOW }}
            >
              <p
                className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider', 'mb-3')}
                style={{ color: AFA.primary }}
              >
                FİNANSMAN SÜRECİ TEKNİK DESTEĞİ
              </p>
              <p className={clsx('text-sm', 'leading-relaxed', 'text-gray-600', 'mb-4')}>
                Banka, altyapı fonu veya kurumsal ortaklık kapsamında teknik doğrulama veya portföy seviyesinde değerlendirme talepleriniz için doğrudan iletişim formunu kullanabilirsiniz.
              </p>
              <a
                href="#contact-form"
                className={clsx('mt-auto', 'pt-4', 'text-sm', 'font-semibold', 'underline')}
                style={{ color: AFA.accent, transition: 'color 150ms ease-out' }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                {...linkHover}
              >
                İletişim Formuna Git ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#F8FAFB' }}>
        <div className={clsx('max-w-6xl', 'mx-auto', 'px-4', 'md:px-6', 'lg:px-8', 'py-16', 'md:py-20')}>
          <div className={clsx('grid', 'grid-cols-1', 'lg:grid-cols-12', 'gap-8', 'lg:gap-10')}>
            <div className={clsx('lg:col-span-5', 'lg:sticky', 'lg:top-24', 'lg:self-start')}>
              <p className={clsx('text-base', 'leading-relaxed', 'text-gray-600', 'mb-8')}>
                Talebinize uygun kanalı seçerek değerlendirme sürecinin hızlı ve öngörülebilir ilerlemesini sağlayabilirsiniz. Aşağıdaki formu doğrudan kullanabilir veya yatırımcı ve geliştirici sayfalarımızı ziyaret edebilirsiniz.
              </p>

              <div
                className={clsx('bg-white', 'rounded-lg', 'p-6', 'border', 'border-gray-200')}
                style={{ boxShadow: SHADOW }}
              >
                <p
                  className={clsx('text-sm', 'font-bold', 'pb-2', 'mb-4')}
                  style={{ color: AFA.primary, borderBottom: `2px solid ${AFA.accent}` }}
                >
                  OFİS BİLGİLERİ
                </p>
                <dl className="space-y-4">
                  <div>
                    <dt className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider')} style={{ color: AFA.primary }}>
                      BÜKREŞ OFİSİ
                    </dt>
                    <dd className="mt-1">
                      <p className={clsx('text-sm', 'font-semibold')}>AFA Energy Romania S.R.L.</p>
                      <p className={clsx('text-sm', 'text-gray-600')}>
                        Sediu social: Bucureşti, Sectorul 3<br />
                        Strada Nerva Traian, Nr. 27–33<br />
                        Birou 6, Scara B, Etaj 1
                      </p>
                    </dd>
                  </div>
                  <div>
                    <dt className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider')} style={{ color: AFA.primary }}>
                      İSTANBUL OFİSİ
                    </dt>
                    <dd className="mt-1">
                      <p className={clsx('text-sm', 'font-semibold')}>AFA Enerji Danışmanlık</p>
                      <p className={clsx('text-sm', 'text-gray-600')}>
                        Fetih Mahallesi, Kavakyeli Sitesi<br />
                        Tahralı Sk. A Blok No:7 Kat:1 D:4<br />
                        34704 Ataşehir / İstanbul
                      </p>
                    </dd>
                  </div>
                  <div>
                    <dt className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider')} style={{ color: AFA.primary }}>
                      İLETİŞİM YÖNTEMİ
                    </dt>
                    <dd className={clsx('text-sm', 'text-gray-600')}>
                      İlk iletişim formu üzerinden alınmaktadır. Kapsam belirleme sonrası iletişim süreciniz kişiselleştirilir.
                    </dd>
                  </div>
                  <div>
                    <dt className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider')} style={{ color: AFA.primary }}>
                      LINKEDIN
                    </dt>
                    <dd className={clsx('mt-1', 'flex', 'items-center', 'gap-2')}>
                      <Linkedin className={clsx('w-4', 'h-4')} style={{ color: AFA.accent }} />
                      <a
                        href="https://linkedin.com/company/afa-energy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx('text-sm', 'font-semibold', 'underline')}
                        style={{ color: AFA.accent, transition: 'color 150ms ease-out' }}
                        {...linkHover}
                      >
                        AFA Energy
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className={clsx('text-xs', 'font-bold', 'uppercase', 'tracking-wider')} style={{ color: AFA.primary }}>
                      ÇALIŞMA SAATLERİ
                    </dt>
                    <dd className="mt-1">
                      <p className={clsx('text-sm', 'text-gray-600')}>Pazartesi – Cuma, 09:00 – 18:00</p>
                      <p className={clsx('text-sm', 'text-gray-500')}>(İstanbul ve Bükreş saat dilimleri)</p>
                    </dd>
                  </div>
                </dl>
              </div>

              <p className={clsx('text-sm', 'leading-relaxed', 'text-gray-600', 'mt-6')}>
                Teknik değerlendirme ekibimiz talebinizi inceler; yatırımcı veya geliştirici profilinize uygun kapsamla size dönüş sağlar.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div
                id="contact-form"
                className={clsx('bg-white', 'p-8')}
                style={{ border: `2px solid ${AFA.accent}`, boxShadow: SHADOW }}
                aria-labelledby="contact-form-title"
              >
                <div className={clsx('flex', 'items-center', 'gap-3', 'mb-6')}>
                  <div
                    style={{ width: 4, height: 32, backgroundColor: AFA.accent, borderRadius: 9999 }}
                    aria-hidden="true"
                  />
                  <h2 id="contact-form-title" className={clsx('text-2xl', 'font-bold')} style={{ color: AFA.primary }}>
                    İletişim Formu
                  </h2>
                </div>

                <p
                  className={clsx('text-sm', 'leading-relaxed', 'text-gray-600', 'pb-6', 'mb-6')}
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  Yatırım fırsatı değerlendirmesi, teknik inceleme talebi, proje değerlendirme başvurusu veya iş birliği önerisi için bu formu kullanabilirsiniz. Talebiniz, kapsamına göre ilgili ekibe yönlendirilecektir.
                </p>

                {showSuccess && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={clsx('p-4', 'mb-6')}
                    style={{ backgroundColor: AFA.light, borderLeft: `4px solid ${AFA.accent}` }}
                  >
                    <p className={clsx('font-semibold', 'mb-1')} style={{ color: AFA.primary }}>Mesaj Alındı</p>
                    <p className={clsx('text-sm', 'text-gray-600')}>
                      Talebiniz alınmıştır. Kapsamına göre ilgili ekibe yönlendirilecek ve 2 iş günü içinde değerlendirilmeye alınacaktır.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className={clsx('block', 'text-sm', 'font-semibold', 'mb-1', 'text-gray-700')}>
                        Ad Soyad <span style={{ color: AFA.warning }} aria-label="gerekli">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => set('name', e.target.value)}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => handleBlur('name')}
                        placeholder="Örn: Ahmet Yılmaz"
                        style={inputStyle('name')}
                      />
                      {touched.name && currentErrors.name && (
                        <p className={clsx('text-xs', 'mt-1')} style={{ color: AFA.warning }} role="alert">
                          {currentErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-company" className={clsx('block', 'text-sm', 'font-semibold', 'mb-1', 'text-gray-700')}>
                        Şirket / Kuruluş <span style={{ color: AFA.warning }} aria-label="gerekli">*</span>
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => set('company', e.target.value)}
                        onFocus={() => handleFocus('company')}
                        onBlur={() => handleBlur('company')}
                        placeholder="Örn: ABC Enerji Ltd."
                        style={inputStyle('company')}
                      />
                      {touched.company && currentErrors.company && (
                        <p className={clsx('text-xs', 'mt-1')} style={{ color: AFA.warning }} role="alert">
                          {currentErrors.company}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className={clsx('block', 'text-sm', 'font-semibold', 'mb-1', 'text-gray-700')}>
                        E-posta Adresi <span style={{ color: AFA.warning }} aria-label="gerekli">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => set('email', e.target.value)}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        placeholder="Örn: ahmet@sirket.com"
                        style={inputStyle('email')}
                      />
                      {touched.email && currentErrors.email && (
                        <p className={clsx('text-xs', 'mt-1')} style={{ color: AFA.warning }} role="alert">
                          {currentErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className={clsx('block', 'text-sm', 'font-semibold', 'mb-1', 'text-gray-700')}>
                        Telefon (İsteğe bağlı)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                        placeholder="Örn: +90 5XX XXX XX XX"
                        style={optionalInputStyle('phone')}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-topic" className={clsx('block', 'text-sm', 'font-semibold', 'mb-1', 'text-gray-700')}>
                        Konu (İsteğe bağlı)
                      </label>
                      <select
                        id="contact-topic"
                        value={formData.topic}
                        onChange={(e) => set('topic', e.target.value)}
                        onFocus={() => setFocused('topic')}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...optionalInputStyle('topic'),
                          color: formData.topic ? '#1F2937' : '#9CA3AF',
                          paddingRight: '32px',
                          appearance: 'none' as const,
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'10\' height=\'6\' viewBox=\'0 0 10 6\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%23666\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                        }}
                      >
                        <option value="">— Konu Seçiniz —</option>
                        {TOPIC_GROUPS.map((group) => (
                          <optgroup key={group.label} label={group.label}>
                            {group.options.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className={clsx('block', 'text-sm', 'font-semibold', 'mb-1', 'text-gray-700')}>
                        Mesaj <span style={{ color: AFA.warning }} aria-label="gerekli">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => set('message', e.target.value)}
                        onFocus={() => handleFocus('message')}
                        onBlur={() => handleBlur('message')}
                        rows={6}
                        placeholder="Lütfen talebinizi ayrıntılı olarak açıklayın..."
                        style={{ ...inputStyle('message'), resize: 'vertical' as const }}
                      />
                      {touched.message && currentErrors.message && (
                        <p className={clsx('text-xs', 'mt-1')} style={{ color: AFA.warning }} role="alert">
                          {currentErrors.message}
                        </p>
                      )}
                    </div>

                    <div
                      style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }}
                      aria-hidden="true"
                    >
                      <label htmlFor="contact-hp">Do not fill</label>
                      <input
                        id="contact-hp"
                        type="text"
                        value={formData._hp}
                        onChange={(e) => set('_hp', e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <p
                    className={clsx('text-xs', 'leading-relaxed', 'text-gray-500', 'pt-6', 'mt-6')}
                    style={{ borderTop: '1px solid #E5E7EB' }}
                  >
                    Bilgileriniz yalnızca değerlendirme amacıyla kullanılır ve gizlilik ilkelerimiz çerçevesinde korunur. Proje spesifik bilgi paylaşımı öncesinde karşılıklı NDA imzalanır. Talebiniz 2 iş günü içinde değerlendirilmeye alınır.
                  </p>

                  {submitError && (
                    <p className={clsx('text-sm', 'mt-4')} style={{ color: AFA.warning }} role="alert">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={clsx('w-full', 'py-3', 'px-6', 'rounded-lg', 'font-bold', 'text-sm', 'tracking-wide', 'mt-6')}
                    style={{
                      backgroundColor: isSubmitting ? '#E5E7EB' : AFA.gold,
                      color: isSubmitting ? '#9CA3AF' : AFA.deep,
                      boxShadow: SHADOW,
                      transition: 'background-color 150ms ease-out, color 150ms ease-out',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = AFA.primary;
                        e.currentTarget.style.color = '#FFFFFF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = AFA.gold;
                        e.currentTarget.style.color = AFA.deep;
                      }
                    }}
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'TALEBİNİZİ GÖNDERİN'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={clsx('max-w-6xl', 'mx-auto', 'px-4', 'md:px-6', 'lg:px-8', 'py-16', 'md:py-20')}>
          <h2 id="faq-title" className={clsx('text-3xl', 'font-bold', 'mb-2')} style={{ color: AFA.primary }}>
            Sıkça Sorulan Sorular
          </h2>
          <div className="mb-8" style={{ borderBottom: `2px solid ${AFA.accent}`, paddingBottom: '1rem' }} aria-hidden="true" />
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaq.has(i);
              return (
                <div
                  key={i}
                  className={clsx('border', 'border-gray-200', 'rounded-lg', 'overflow-hidden')}
                  style={isOpen ? { borderLeft: `4px solid ${AFA.accent}` } : undefined}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    className={clsx('w-full', 'flex', 'items-start', 'justify-between', 'gap-4', 'p-4', 'text-left')}
                    style={{ backgroundColor: isOpen ? '#F0FDFA' : 'transparent', transition: 'background-color 150ms ease-out' }}
                    onMouseEnter={(e) => {
                      if (!isOpen) e.currentTarget.style.backgroundColor = '#F0FDFA';
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    aria-expanded={isOpen}
                  >
                    <span className={clsx('text-sm', 'md:text-base', 'font-semibold', 'leading-snug', 'text-gray-800')}>{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className={clsx('w-5', 'h-5', 'flex-shrink-0')} style={{ color: AFA.gold }} />
                    ) : (
                      <ChevronDown className={clsx('w-5', 'h-5', 'flex-shrink-0')} style={{ color: '#9CA3AF' }} />
                    )}
                  </button>
                  {isOpen && (
                    <div className={clsx('px-4', 'pb-4')} style={{ borderTop: '1px solid rgba(40,175,176,0.2)', backgroundColor: 'rgba(240,253,250,0.5)' }}>
                      <p className={clsx('text-sm', 'md:text-base', 'leading-relaxed', 'text-gray-700', 'pt-4')}>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden' }} aria-label="Kurumsal güven mesajı">
        <Image
          src="/images/contact_Photo_Break.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 46, 44, 0.50)' }}
          aria-hidden="true"
        />
        <div className={clsx('relative', 'z-10', 'flex', 'items-center', 'justify-center', 'px-4')} style={{ minHeight: 'clamp(144px, 20vw, 256px)' }}>
          <p
            className={clsx('text-xl', 'md:text-2xl', 'lg:text-3xl', 'font-semibold', 'tracking-wide', 'text-center', 'max-w-3xl', 'mx-auto')}
            style={{ color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
          >
            Teknik doğruluk, yatırım kararının temelidir.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: AFA.light, borderTop: `4px solid ${AFA.accent}` }}>
        <div className={clsx('max-w-6xl', 'mx-auto', 'px-4', 'md:px-6', 'lg:px-8', 'py-16', 'md:py-20')}>
          <h2 id="standards-title" className={clsx('text-3xl', 'font-bold', 'mb-6')} style={{ color: AFA.primary }}>
            Yanıt ve Değerlendirme Standartları
          </h2>
          <div className={clsx('p-5', 'mb-8')} style={{ backgroundColor: AFA.deep, borderRadius: '8px' }}>
            <p className={clsx('text-sm', 'md:text-base', 'leading-relaxed')} style={{ color: '#FFFFFF' }}>
              Geliştirici ve yatırımcı taleplerini proje özelinde, karar verilebilir teknik içeriklerle yanıtlıyoruz.
            </p>
          </div>
          <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6')}>
            {[
              {
                title: 'Talep Türüne Göre Yanıt Süresi',
                text: 'Nitelikli yatırım talepleri 2 iş günü içinde alındı teyidi alır. Projeye özel teknik ön değerlendirme, veri kapsamına bağlı olarak 5–7 iş günü sürer.',
              },
              {
                title: 'İlk Görüşme',
                text: 'Kapsam belirleme görüşmesi ücretsizdir. Projenin veya yatırım talebinin kapsamı netleştikten sonra hizmet önerisi yazılı olarak sunulur.',
              },
              {
                title: 'Değerlendirme Kapsamı',
                text: 'Her değerlendirme proje özelinde tasarlanır. Standart paket yaklaşımı uygulanmaz; kapsam, yatırımcı veya geliştirici ihtiyacına göre belirlenir.',
              },
              {
                title: 'Gizlilik',
                text: 'Proje spesifik bilgiler NDA sonrası paylaşılır. Tüm değerlendirme süreçleri gizlilik ilkeleri çerçevesinde yürütülür.',
              },
              {
                title: 'Çıktı Formatı',
                text: 'Bulgular, yatırım komitesi standartlarına uygun formatta sunulur. Risk matrisi, teknik özet ve aksiyon planı her değerlendirmenin standart çıktılarıdır.',
              },
              {
                title: 'Coğrafi Kapsam',
                text: 'Türkiye ve Romanya ana pazarlarımızdır. Güneydoğu Avrupa genelinde yenilenebilir enerji projeleri değerlendirilmektedir.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className={clsx('bg-white', 'rounded-lg', 'p-5')}
                style={{ borderLeft: `4px solid ${AFA.accent}`, boxShadow: SHADOW }}
              >
                <p className={clsx('text-sm', 'font-bold', 'mb-2')} style={{ color: AFA.primary }}>{card.title}</p>
                <p className={clsx('text-sm', 'leading-relaxed', 'text-gray-600')}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: AFA.deep }} className={clsx('py-8', 'px-4', 'md:px-6', 'lg:px-8')}>
        <div className={clsx('max-w-6xl', 'mx-auto')}>
          <p className={clsx('text-xs', 'text-center')} style={{ color: 'rgba(255,255,255,0.6)' }}>
            Proje-spesifik yasal ve teknik doğrulama tavsiye edilir. Bu sayfa üzerinden gönderilen bilgiler yatırım taahhüdü veya danışmanlık sözleşmesi oluşturmaz. AFA Energy Romania S.R.L. — Bağımsız Enerji Danışmanlığı.
          </p>
        </div>
      </section>
    </>
  );
}
