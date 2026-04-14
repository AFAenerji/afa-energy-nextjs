'use client';

import type { InvestorProfileMessages } from '@/i18n/loadInvestorProfileMessages';

// Section Components
import HeroSection from '@/components/investor-profile/HeroSection';
import ApproachSection from '@/components/investor-profile/ApproachSection';
import FramingSection from '@/components/investor-profile/FramingSection';
import ValidationSection from '@/components/investor-profile/ValidationSection';
import ICLensSection from '@/components/investor-profile/ICLensSection';
import ProfilesSection from '@/components/investor-profile/ProfilesSection';
import RiskSection from '@/components/investor-profile/RiskSection';
import MotivationsSection from '@/components/investor-profile/MotivationsSection';
import SampleOutputsSection from '@/components/investor-profile/SampleOutputsSection';
import PositioningSection from '@/components/investor-profile/PositioningSection';
import InvestorForm from '@/components/investor-profile/InvestorForm';
import ProcessSection from '@/components/investor-profile/ProcessSection';

interface InvestorProfileClientProps {
  initialLocale: 'tr' | 'en';
  initialMessages: InvestorProfileMessages;
}

export default function InvestorProfileClient({
  initialLocale,
  initialMessages,
}: InvestorProfileClientProps) {
  // Currently using static content, language switching can be added later if needed

  // Y1 - Hero Data
  const heroData = {
    kicker: 'YATIRIMDAN ÖNCE NETLİK.',
    h1: 'Belirsizliği Satın Almak Zorunda Değilsiniz.',
    subtitle:
      'Yenilenebilir enerji projelerinde yatırım kararı vermeden önce teknik riskleri netleştiriyoruz. Proje belgeleri güvenilir mi? Şebeke bağlantısı gerçekleşebilir mi? Gelir tahminleri doğru mu? AFA Energy, bu soruları cevaplıyor.',
    ctaText: 'Ön Değerlendirme Başlatın',
  };

  // Y1.5 - Approach Data
  const approachData = {
    kicker: 'AFA ENERGY YAKLAŞIMI',
    h2: 'Yatırım Kararı Öncesi Teknik Netlik Sağlarız.',
    cards: [
      {
        title: 'Şebeke Doğrulama',
        description:
          'Bağlantı onayının (ATR) yalnızca varlığı değil, sahada fiili uygulanabilirliği analiz edilir.',
      },
      {
        title: 'Üretim Kısıtı Analizi',
        description:
          'Üretim kısıtı (curtailment) riski, teknik ve gelir etkisiyle birlikte modellenir.',
      },
      {
        title: 'Bağlantı Maliyeti Analizi',
        description:
          'Şebeke bağlantı maliyetleri teknik kapsam üzerinden doğrulanır, eksik kalemler tespit edilir.',
      },
      {
        title: 'Pre-TDD Koordinasyonu',
        description:
          'Yatırım öncesi kritik riskler taranır; proje yatırım komitesi değerlendirmesine hazır seviyeye getirilir.',
      },
    ],
    posBoxText:
      "AFA'nın rolü projeyi yatırımcıya uydurmak değil; yatırımcıya uygun projeyi teknik olarak filtrelemektir.",
  };

  // Y2 - Framing Data
  const framingData = {
    kicker: 'YATIRIMCI PERSPEKTİFİ',
    h2: 'Yatırımcı Aslında Ne Satın Alır?',
    pullQuote: 'Bu proje uzun vadede öngörülebilir ve güvenilir gelir üretebilir mi?',
    pullQuoteSubtext: 'Her yatırım kararının arkasındaki temel soru budur.',
    cards: [
      {
        title: 'Şebeke Bağlantısı',
        description:
          'Elektrik şebekesine bağlanma izni var mı? Bu izin sahada uygulanabilir mi? Ek altyapı gerekiyor mu?',
      },
      {
        title: 'Üretim Kısıtı Riski',
        description:
          'Santral ürettiği elektriğin tamamını satabilecek mi, yoksa şebeke operatörü üretimi kısıtlayacak mı?',
      },
      {
        title: 'İzin Süreci',
        description:
          'Gerekli izinler alınmış mı? İzin sıralaması doğru mu? Yasal açıdan eksik nokta var mı?',
      },
      {
        title: 'Takvim ve Gelir',
        description:
          'İnşaat ne zaman bitecek? Gelir başlangıcı ertelenir mi? Borç geri ödemesi zamanlaması uyumlu mu?',
      },
    ],
  };

  // Y3 - Validation Data
  const validationData = {
    kicker: 'BAĞIMSIZ DOĞRULAMA',
    h2: 'Yatırımcı Neden Teknik Doğrulamaya İhtiyaç Duyar?',
    validationCards: [
      {
        number: '01',
        title: 'Proje Belgesi Var, Ancak Fiilen Gerçekleşebilir Mi?',
        description:
          'Şebeke bağlantı onayı alınmış olabilir, ancak sahada uygulama fiziksel veya maliyet açısından gerçekçi değilse belge tek başına yeterli olmaz.',
        afaDifference:
          'AFA farkı: Belgenin varlığı değil, sahada uygulanabilirliği test edilir.',
      },
      {
        number: '02',
        title: 'Gelir Tahmini Doğru Mu, Yoksa İyimser Mi?',
        description:
          'Üretim kısıtı (curtailment) riski gelir modellerine tam yansıtılmamış olabilir. Eksik modelleme, nakit akışı tahminini boşa çıkarır.',
        afaDifference:
          'AFA farkı: Curtailment senaryoları modellenir, gelir tahminine yansıtılır.',
      },
      {
        number: '03',
        title: 'İzinler Tamamlanmış mı, Yoksa Sıralama Hatası Var mı?',
        description:
          'Bazı izinler alınmış olsa da süreç sıralaması yanlışsa inşaat başlayamaz veya hukuki risk oluşur.',
        afaDifference:
          'AFA farkı: İzin zinciri kronolojik tutarlılık açısından kontrol edilir.',
      },
      {
        number: '04',
        title: 'Takvim Gerçekçi mi, Yoksa Gecikme Riski Var mı?',
        description:
          'Geliştirici iyimser bir takvim sunabilir. Takvim kayması nakit akışını bozar ve borç geri ödeme planını etkiler.',
        afaDifference:
          'AFA farkı: Takvim, bağımlılıklar ve izin süreci akışıyla çapraz doğrulanır.',
      },
    ],
    withoutTitle: 'Teknik Doğrulama Olmadan',
    withoutItems: [
      'Yatırımcı riski fark etmeden satın alabilir',
      'Belirsizlik fiyatlandırılamaz',
      'Geliştirici sunum tek kaynak olur',
      'Sürpriz geç ortaya çıkar',
    ],
    withTitle: 'Teknik Doğrulama İle',
    withItems: [
      'Riskler erken tespit edilir',
      'Belirsizlik ölçülür ve fiyatlandırılır',
      'Yatırımcı bağımsız görüş alır',
      'Sürpriz azalır, kontrol artar',
    ],
    posBoxText:
      'Teknik doğrulama, yatırımcıya "bu projeye yatırım yapma" değil, "bu proje hakkında gerçeği öğren" der.',
  };

  // Y3.5 - IC Lens Data
  const icLensData = {
    kicker: 'YATIRIM KOMİTESİ PERSPEKTİFİ',
    h2: 'Yatırım Komitesi Hangi Soruları Sorar?',
    questions: [
      { text: 'Bu projenin şebeke bağlantısı gerçekten fiilen uygulanabilir mi?' },
      { text: 'Üretim kısıtı riski gelir modeline doğru yansıtılmış mı?' },
      { text: 'İzin süreci tamamlanmış mı, yoksa eksik adım var mı?' },
      { text: 'Takvim gerçekçi mi, gecikme riski ölçülmüş mü?' },
      { text: 'Bu belirsizlikler fiyatlandırılabilir mi, yoksa yönetilemez mi?' },
      { text: 'Bağımsız bir teknik görüş aldık mı?' },
    ],
  };

  // Y4 - Profiles Data
  const profilesData = {
    kicker: 'YATIRIMCI TİPLERİ',
    h2: 'Her Yatırımcı Riske Farklı Yaklaşır.',
    profiles: [
      {
        ghostNumber: '01',
        badge: 'KURUMSAL YATIRIMCI',
        title: 'Sigorta Şirketleri, Emeklilik Fonları',
        bodyLines: [
          'Uzun vadeli ve düşük oynaklık ister',
          'Sürprizden hoşlanmaz',
          'Gelirin mümkün olduğunca öngörülebilir olmasını bekler',
          'En az sürpriz, en yüksek öngörülebilirlik arar',
        ],
        topBg: '#18625F',
        isGold: false,
      },
      {
        ghostNumber: '02',
        badge: 'ALTYAPI FONU',
        title: 'Altyapı Fonları, Kalkınma Finansman Kurumları',
        bodyLines: [
          'Yapılandırılmış risk kabul edebilir',
          'Belirsizliği yönetme kapasitesi var',
          'Ölçülmüş risk/getiri dengesine odaklanır',
          'Koşullu ilerlenebilir projelerde eksiklerin kapatılabilir olmasını ister',
        ],
        topBg: '#0F2E2C',
        isGold: false,
      },
      {
        ghostNumber: '03',
        badge: 'ÖZEL SERMAYE',
        title: 'Private Equity, Girişim Sermayesi',
        bodyLines: [
          'Daha yüksek getiri hedefi vardır',
          'Riskin karşılığında primli getiri bekler',
          'Belirsizlik yönetilebilirse kabul edilebilir',
          'Hızlı karar alır, ancak riskin net tanımlanmasını ister',
        ],
        topBg: '#FFCB00',
        isGold: true,
      },
    ],
  };

  // Y5 - Risk Table Data
  const riskData = {
    kicker: 'RİSK TAŞINABİLİRLİĞİ',
    h2: 'Aynı Proje Neden Farklı Yatırımcıya Uygun Olmaz?',
    tableHeaders: ['Yatırımcı Tipi', 'Belirsizliğe Yaklaşımı', 'Karar Eşiği'] as [string, string, string],
    tableRows: [
      {
        investorType: 'Kurumsal Yatırımcı',
        approachToUncertainty: 'Belirsizlikten kaçınır. Gelir öngörülebilir olmalı.',
        decisionThreshold: 'Yalnızca tamamlanmış veya tamamlanmaya çok yakın projeler.',
      },
      {
        investorType: 'Altyapı Fonu',
        approachToUncertainty: 'Ölçülebilir ve yönetilebilir belirsizlik kabul edilebilir.',
        decisionThreshold: 'Eksikler kapatılabilir ve takvimi netlerse ilerleyebilir.',
      },
      {
        investorType: 'Özel Sermaye',
        approachToUncertainty: 'Belirsizlik primli getiri ile dengelenir.',
        decisionThreshold: 'Risk net tanımlanmışsa hızlı karar alınır.',
      },
    ],
  };

  // Y6 - Motivations Data
  const motivationsData = {
    kicker: 'ORTAK KESİŞİM',
    h2: 'Tüm Yatırımcı Tipleri Şu Noktada Birleşir.',
    cards: [
      {
        title: 'Teknik Netlik İster',
        description: 'Proje belgesi doğru mu? Şebeke bağlantısı gerçekten uygulanabilir mi?',
      },
      {
        title: 'Gelir Tahmininin Doğruluğunu Sorar',
        description: 'Üretim kısıtı riski modele yansıtılmış mı? Takvim gerçekçi mi?',
      },
      {
        title: 'Bağımsız Görüş Bekler',
        description: 'Geliştirici sunumu dışında bağımsız teknik doğrulama ister.',
      },
      {
        title: 'Sürprizi Sevmez',
        description: 'Risk erken tespit edilsin, ölçülsün ve yönetilsin ister.',
      },
    ],
  };

  // Y6.5 - Sample Outputs Data
  const sampleOutputsData = {
    kicker: 'DEĞERLENDİRME ÇIKTILARI',
    h2: 'Tipik Değerlendirme Çıktıları',
    samples: [
      {
        title: 'Örnek: Rüzgar Projesi (Romanya)',
        lines: [
          { label: 'Şebeke Bağlantısı', value: 'Yüksek Risk', riskLevel: 'high' as const },
          { label: 'Üretim Kısıtı', value: 'Orta Risk', riskLevel: 'medium' as const },
          { label: 'İzin Süreci', value: 'Düşük Risk', riskLevel: 'low' as const },
          { label: 'Takvim', value: 'Orta Risk', riskLevel: 'medium' as const },
        ],
        conclusion: 'Koşullu İlerlenebilir',
      },
      {
        title: 'Örnek: Güneş Projesi (Türkiye)',
        lines: [
          { label: 'Şebeke Bağlantısı', value: 'Düşük Risk', riskLevel: 'low' as const },
          { label: 'Üretim Kısıtı', value: 'Düşük Risk', riskLevel: 'low' as const },
          { label: 'İzin Süreci', value: 'Orta Risk', riskLevel: 'medium' as const },
          { label: 'Takvim', value: 'Düşük Risk', riskLevel: 'low' as const },
        ],
        conclusion: 'İlerlenebilir',
      },
    ],
    disclaimer:
      'Yukarıdaki veriler temsili amaçlıdır. Gerçek proje verileri gizlilik kapsamında korunur.',
  };

  // Y6.7 - Positioning Data
  const positioningData = {
    kicker: 'NET KONUMLANDIRMA',
    h2: "AFA Energy'nin Rolü",
    cards: [
      {
        title: 'Proje Geliştiricisi Değildir',
        description: 'AFA projeyi geliştirmez, saha sahibi değildir, projeyi satmaz.',
        icon: 'ban',
      },
      {
        title: 'EPC Yüklenicisi Değildir',
        description: 'AFA santral inşa etmez, ekipman tedarik etmez, kurulum yapmaz.',
        icon: 'wrench',
      },
      {
        title: 'Yatırım Tavsiyesi Vermez',
        description: 'AFA teknik netlik sağlar, ancak yatırım kararı yatırımcıya aittir.',
        icon: 'chart',
      },
      {
        title: 'Satış Tarafında Yer Almaz',
        description: 'AFA tarafsız teknik doğrulama sunar, satış komisyonu almaz.',
        icon: 'handshake',
      },
    ],
    posBoxText:
      "AFA Energy'nin rolü: Yatırımcıya teknik gerçeği göstermek. Proje satmak veya geliştirmek değil.",
  };

  // Y7 - Form Data
  const formData = {
    step1Fields: [
      { label: 'Ad Soyad', placeholder: 'Ad Soyad', name: 'fullName', type: 'text', required: true },
      { label: 'E-posta', placeholder: 'ornek@sirket.com', name: 'email', type: 'email', required: true },
      { label: 'Telefon', placeholder: '+90 XXX XXX XX XX', name: 'phone', type: 'tel', required: true },
      { label: 'Şirket', placeholder: 'Şirket Adı', name: 'company', type: 'text', required: true },
    ],
    step2Fields: [
      { label: 'Proje Türü', placeholder: 'Güneş / Rüzgar / Hibrit', name: 'projectType', type: 'text', required: true },
      { label: 'Kapasite (MW)', placeholder: 'Örn: 50 MW', name: 'capacity', type: 'text', required: true },
      { label: 'Konum', placeholder: 'Ülke / Bölge', name: 'location', type: 'text', required: true },
      {
        label: 'Proje Hakkında Kısa Bilgi',
        placeholder: 'Projenizin mevcut durumu hakkında kısa bilgi...',
        name: 'projectDescription',
        type: 'textarea',
        required: false,
      },
    ],
    consentText:
      'Kişisel verilerimin işlenmesine ve iletişim kurulmasına onay veriyorum. Verileriniz gizli tutulur.',
    legalDisclaimer:
      'Bu form yalnızca ön değerlendirme talebinizi iletmek içindir. Talebiniz değerlendirilecek ve size geri dönülecektir.',
    submitText: 'Gönder',
  };

  // Y8 - Process Data
  const processData = {
    kicker: 'SÜREÇ AKIŞI',
    h2: 'Sonrasında Ne Olur?',
    phaseCards: [
      {
        phase: 'Aşama 1',
        title: 'İlk Görüşme',
        description: 'Talebiniz alınır, proje hakkında kısa bilgi paylaşılır.',
      },
      {
        phase: 'Aşama 2',
        title: 'Belge İncelemesi',
        description: 'Proje belgeleri incelenir, teknik netlik değerlendirilir.',
      },
      {
        phase: 'Aşama 3',
        title: 'Teknik Rapor',
        description: 'Bulgular raporlanır, riskler ve öneriler sunulur.',
      },
      {
        phase: 'Aşama 4',
        title: 'Sunum ve Karar',
        description: 'Rapor sunulur, yatırım komitesi değerlendirmesi yapılır.',
      },
    ],
  };

  // Disclaimer text
  const disclaimerText =
    'Bu web sitesindeki bilgiler genel bilgilendirme amaçlıdır; yatırım tavsiyesi, finansman garantisi veya hukuki danışmanlık niteliği taşımaz. Proje-spesifik yasal ve teknik doğrulama tavsiye edilir.';

  return (
    <div>
      {/* Y1 - Hero */}
      <HeroSection {...heroData} />

      {/* Y1.5 - Approach */}
      <ApproachSection {...approachData} />

      {/* Y2 - Framing */}
      <FramingSection {...framingData} />

      {/* Y3 - Validation */}
      <ValidationSection {...validationData} />

      {/* Y3.5 - IC Lens */}
      <ICLensSection {...icLensData} />

      {/* Y4 - Profiles */}
      <ProfilesSection {...profilesData} />

      {/* Y5 - Risk Table */}
      <RiskSection {...riskData} />

      {/* Y6 - Motivations */}
      <MotivationsSection {...motivationsData} />

      {/* Y6.5 - Sample Outputs */}
      <SampleOutputsSection {...sampleOutputsData} />

      {/* Y6.7 - Positioning */}
      <PositioningSection {...positioningData} />

      {/* Y7 - Form */}
      <InvestorForm {...formData} />

      {/* Y8 - Process */}
      <ProcessSection {...processData} />

      {/* Disclaimer Band */}
      <section className="bg-afa-ice" style={{ padding: '24px 0' }}>
        <div className="max-w-[1180px] mx-auto px-[52px]">
          <p
            className="text-center text-xs leading-relaxed"
            style={{ color: '#718096' }}
          >
            {disclaimerText}
          </p>
        </div>
      </section>
    </div>
  );
}
