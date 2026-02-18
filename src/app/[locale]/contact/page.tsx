import type { Locale } from '@/lib/i18n';
import LegalScopeDisclaimer from '@/components/legal/LegalScopeDisclaimer';
import ContactForm from '@/components/contact/ContactForm';

const roleContent = {
  investor: {
    badge: 'Yatırımcı / Fon',
    heading: 'Yatırım Öncesi Teknik Filtreyi Başlatın',
    description:
      'Yatırım kararı öncesinde şebeke kapasitesi, bağlantı maliyeti ve teknik riskleri bağımsız olarak netleştirin.',
    placeholder: 'Yatırım büyüklüğü, hedef bölge, zaman planı...',
  },
  developer: {
    badge: 'Geliştirici / Proje',
    heading: 'Yatırımcı Sunumu Öncesi Teknik Kontrol',
    description:
      'Projenizi yatırımcıya sunmadan önce bağımsız teknik kontrolden geçirerek güvenilirliğini artırın.',
    placeholder: 'Proje kapasitesi, lokasyon, mevcut izinler...',
  },
  default: {
    badge: 'Teknik Değerlendirme',
    heading: 'Teknik Değerlendirme Talep Edin',
    description:
      'Romanya yenilenebilir enerji yatırımlarınız için bağımsız teknik danışmanlık ve değerlendirme hizmeti.',
    placeholder: 'Projeniz hakkında kısa bilgi...',
  },
} as const;

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ role?: string }>;
}

export default async function ContactPage({ params, searchParams }: ContactPageProps) {
  const { locale } = await params;
  const { role } = await searchParams;

  const roleKey = role === 'investor' || role === 'developer' ? role : 'default';
  const content = roleContent[roleKey];

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">

        {/* Signature Bar */}
        <div className="h-[3px] w-16 bg-[#FFCB00] mx-auto mb-8 rounded-sm" />

        <div className="max-w-2xl mx-auto text-center mb-12">
          {/* Role Badge */}
          {roleKey !== 'default' && (
            <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6 ${
              roleKey === 'investor'
                ? 'bg-[#18625F]/10 text-[#18625F]'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {content.badge}
            </span>
          )}

          <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0B1F1E] tracking-tight leading-tight mb-4">
            {content.heading}
          </h1>
          <p className="text-lg text-[#374151] leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <ContactForm
            role={roleKey}
            placeholder={content.placeholder}
            locale={locale}
          />
        </div>

        {/* Legal */}
        <div className="max-w-xl mx-auto mt-12">
          <LegalScopeDisclaimer className="rounded-lg" />
        </div>

      </div>
    </section>
  );
}
