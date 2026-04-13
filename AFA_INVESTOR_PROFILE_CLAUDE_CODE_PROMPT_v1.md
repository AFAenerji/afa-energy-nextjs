# AFA Energy — Yatırımcı Profili Sayfası
# Claude Code Terminal Prompt
# Windsurf terminalinde `claude` komutuyla başlatılan oturuma kopyala-yapıştır

---

## KULLANIM TALİMATI

1. Windsurf'te terminali aç
2. `claude` komutunu çalıştır — interaktif oturum başlar
3. Aşağıdaki prompt'u kopyalayıp yapıştır
4. Instruction file'ı da terminale sürükle veya yolunu belirt

---

## CLAUDE CODE PROMPT (KOPYALA — YAPISTIR)

```
Senden AFA Energy web sitesi için "Yatırımcı Profili" sayfasını 
Next.js (App Router) + TypeScript + Tailwind CSS v4 stack'inde 
sıfırdan implement etmeni istiyorum.

Tüm tasarım kararları AFA_INVESTOR_PROFILE_INSTRUCTION_v1.md 
dosyasında kilitlenmiş durumda. Bu dosyayı oku ve sadece orada 
belirtilen kararları uygula. Dosya dışından hiçbir tasarım kararı 
alma.

─────────────────────────────────────────────────────────────
BAŞLAMADAN ÖNCE — 3 ZORUNLU KONTROL
─────────────────────────────────────────────────────────────

1. tailwind.config.ts dosyasını oku.
   Şu token adlarının tanımlı olduğunu doğrula:
   afa-deep, afa-primary, afa-accent, afa-gold, afa-warning,
   afa-light, afa-ice, afa-card, afa-white
   
   Eğer token adları farklıysa (örneğin "primary" yerine 
   "afa-primary-dark" gibi), beni bilgilendir — devam etme.

2. globals.css, Header.tsx ve Footer.tsx dosyalarına DOKUNMA.
   Bu dosyalar protected.

3. app/investor-profile/ klasörü yoksa oluştur.
   Dosya adı kesinlikle İngilizce olacak — Türkçe karakter yasak.

─────────────────────────────────────────────────────────────
UYGULAMA SIRASI
─────────────────────────────────────────────────────────────

Aşağıdaki sırayla ilerle. Her adımı tamamladıktan sonra bir 
sonrakine geç — adım atma.

ADIM 1 — Ortak bileşenleri oluştur:
  components/ui/FramingCard.tsx
  components/ui/EmbossedCard.tsx

ADIM 2 — Section bileşenlerini oluştur (sırayla):
  components/investor-profile/HeroSection.tsx
  components/investor-profile/ApproachSection.tsx
  components/investor-profile/FramingSection.tsx
  components/investor-profile/ValidationSection.tsx
  components/investor-profile/ICLensSection.tsx
  components/investor-profile/ProfilesSection.tsx
  components/investor-profile/RiskSection.tsx
  components/investor-profile/MotivationsSection.tsx
  components/investor-profile/SampleOutputsSection.tsx
  components/investor-profile/PositioningSection.tsx
  components/investor-profile/InvestorForm.tsx
  components/investor-profile/ProcessSection.tsx

ADIM 3 — Ana sayfa dosyasını oluştur:
  app/investor-profile/page.tsx
  (Tüm section bileşenlerini sırayla import et ve render et)

─────────────────────────────────────────────────────────────
ZORUNLU KURALLAR — BUNLARI ASLA İHLAL ETME
─────────────────────────────────────────────────────────────

1. TAILWIND OPACITY MODIFIER YASAK
   text-white/90, text-white/72 gibi kullanım yasak.
   Dark zemin üzerindeki tüm metin renkleri inline style ile:
   style={{ color: 'rgba(255,255,255,0.72)' }}

2. CSS TRANSFORM YASAK
   transform: translate, scale, rotate — hiçbiri kullanılmayacak.

3. TRANSITION: ALL YASAK
   Sadece şu property'ler geçiş alabilir, max 120ms linear:
   background-color, border-color, color, opacity

4. TAILWIND CLASSNAME İÇİNDE HEX DEĞER YASAK
   className="bg-[#FFCB00]" → YASAK
   className="bg-afa-gold"  → DOĞRU

5. GOLD ZONE KURALI
   Gold (#FFCB00) veya Teal (#28AFB0) zemin üzerinde metin
   rengi mutlaka #0F2E2C (afa-deep) olacak.

6. DARK SECTION METİNLERİ
   HeroSection ve InvestorForm dark zemin kullanıyor.
   Bu iki bileşendeki tüm metin renkleri implement edildikten
   sonra ayrıca kontrol et — inline rgba() olduklarını doğrula.

7. Y6.7 BORDER-TOP
   PositioningSection'ın section tag'ine şu style uygulanacak:
   style={{ borderTop: '4px solid #FFCB00', paddingTop: '84px' }}
   Ayrı bir div veya section AÇILMAYACAK.

8. ARDIŞIK DARK SECTION YASAK
   HeroSection (Y1) ve InvestorForm (Y7) dark section.
   Aralarında 10 light section var — bu sıra bozulmayacak.

─────────────────────────────────────────────────────────────
KRİTİK BÖLÜM NOTLARI
─────────────────────────────────────────────────────────────

HeroSection (Y1):
  - CTA butonu statik — hover'da transform veya scale yok
  - Subtitle: style={{ color: 'rgba(255,255,255,0.72)' }}
  - Grid texture ::before pseudo-element ile

ApproachSection (Y1.5):
  - Card 3 başlığı: "Bağlantı Maliyeti Analizi" — "Analizi" dahil
  - Tablet breakpoint (768-1024px): repeat(2,1fr), gap: 20px
  - DOM sırası değişmeyecek

ICLensSection (Y3.5):
  - Liste container max-width: 640px — bu kısıtlama kaldırılmayacak
  - Numara circle: 32px, afa-accent zemin
  - Her soru arasında margin-bottom: 20px

ProfilesSection (Y4):
  - Üst panel min-height: 180px
  - H3 başlıkları max 2 satır: -webkit-line-clamp: 2
  - Card 3 (gold zemin): tüm metin #0F2E2C, opacity düşürülmez
  - Badge opacity Card 3: rgba(15,46,44,0.18)

RiskSection (Y5):
  - Zebra: tek satırlar #EEF7F7 (afa-card), çift satırlar beyaz
  - Header altı: border-bottom: 1px solid rgba(24,98,95,0.15)

PositioningSection (Y6.7):
  - 4 farklı ikon — aynı ikon tekrar kullanılmayacak
  - Tüm ikonlar aynı stil (outline, aynı weight)
  - Phosphor Icons kullanılıyor

InvestorForm (Y7):
  - Form container max-width: 740px
  - Placeholder: style={{ color: 'rgba(255,255,255,0.42)' }}
  - Step bağlantı çizgisi: rgba(255,255,255,0.35)
  - goStep2() JS fonksiyonu dahil edilecek
  - HTML <form> tag'i değil, onSubmit handler kullanılacak

ProcessSection (Y8):
  - Kart zemin: #F8FAFB + border: 1px solid rgba(0,0,0,0.05)
  - Phase etiketi font-size: 12px (11px değil)

─────────────────────────────────────────────────────────────
BİTİŞTE YAPILACAKLAR
─────────────────────────────────────────────────────────────

Tüm adımlar tamamlandıktan sonra şunları kontrol et ve rapor et:

1. Her section'ın aria-labelledby bağlantısı doğru mu?
2. HeroSection ve InvestorForm'da Tailwind opacity modifier
   kullanılmış mı? (olmaması gerekiyor)
3. Y6.7 PositioningSection'da ayrı div/section açılmış mı?
   (olmaması gerekiyor)
4. Tailwind className içinde hardcoded hex var mı?
   (olmaması gerekiyor)
5. Tüm dosya adları İngilizce kebab-case mi?

Kontrol sonuçlarını madde madde raporla.
```

---

## OTURUM YÖNETİMİ NOTLARI

**Oturum başında:** Instruction file'ı terminalin çalıştığı dizine 
kopyaladığından emin ol. Claude Code'un dosyaya erişebilmesi için 
proje kök dizininde olması gerekiyor.

**Uzun oturum riski:** Bu prompt 12 section + 2 shared component 
= 14 dosya üretiyor. Oturum ortasında bağlantı kesilirse kaldığı 
yerden devam etmesini iste:
  "ADIM X tamamlandı, ADIM X+1'den devam et"

**Regression kontrolü:** Her section tamamlandığında bir önceki 
section'ın içeriğinin değişmediğini kontrol et. Özellikle 
InvestorForm (Y7) yazılırken HeroSection (Y1) içeriğinin 
korunduğunu doğrula.

**Git:** Instruction file'ı çalıştırmadan önce mevcut çalışma 
durumunu commit et. Kurtarma noktası oluştur:
  git add -A && git commit -m "checkpoint: before investor profile implementation"
```

---

*AFA_INVESTOR_PROFILE_CLAUDE_CODE_PROMPT_v1.0*
*Bu dosya yalnızca Claude Code terminal oturumu için hazırlanmıştır.*
*Tasarım kararları için AFA_INVESTOR_PROFILE_INSTRUCTION_v1.md geçerlidir.*
