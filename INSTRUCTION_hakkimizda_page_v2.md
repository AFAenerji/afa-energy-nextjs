# Claude Code Instruction: Hakkımızda (About) Page Implementation
# AFA Energy Romania — Next.js + Tailwind v4 + TypeScript
# Version: 2.0 | Date: March 2026
# Prepared by: Senior Web Content & Strategic Communications Manager
# Changelog v2.0: Full redesign — all 7 sections (B1–B7) rebuilt from approved
#                 HTML prototypes produced in Claude Chat session (March 2026).
#                 v1.1 is superseded. Do not reference v1.1.

---

## OVERVIEW

Implement the `Hakkımızda` (About) page for the AFA Energy Romania institutional
website. Target route: `/[locale]/about` (existing route — replace current content).

**Target file:** `src/app/[locale]/about/page.tsx`
**Components:** `src/components/hakkimizda/`
**Content JSON:** `messages/tr/hakkimizda.json`, `messages/en/hakkimizda.json`, `messages/ro/hakkimizda.json`

---

## MANDATORY RULES (READ BEFORE ANY CODE)

### ANCHOR-1 — TOKEN LOCK
All color values use approved AFA token classes only.
No hardcoded hex values in className or style props.
Exception: inline style rgba() values for dark-background text (see ANCHOR-3).

Token reference:
- `bg-afa-primary-dark` / `text-afa-primary-dark`  → #18625F
- `bg-afa-primary` / `text-afa-primary`             → #28AFB0
- `text-afa-primary-light`                          → #4CC9F0
- `bg-afa-gold` / `text-afa-gold` / `border-afa-gold` → #FFCB00
- `text-afa-coral` / `border-afa-coral`             → #F25F5C
- `bg-afa-deep` / `text-afa-deep`                   → #0F2E2C
- `bg-afa-ice`                                      → #F8FAFB

### ANCHOR-2 — TRANSITION LOCK
All transitions: `transition-[property] duration-[120ms] ease-linear` only.
Forbidden: duration-150, duration-200, ease-in, ease-out, ease-in-out.
Allowed properties: background-color, border-color, color, opacity, box-shadow.

### ANCHOR-3 — DARK BACKGROUND CONTRAST LOCK
On `bg-afa-primary-dark` (#18625F) or `bg-afa-deep` (#0F2E2C) backgrounds:
- Text colors MUST use inline styles with rgba() values
- NEVER use Tailwind opacity modifiers (text-white/85, text-white/90, etc.)
Correct:   `style={{ color: 'rgba(255,255,255,0.85)' }}`
Incorrect: `className="text-white/85"`

### ANCHOR-4 — GOLD ZONE LOCK
On `bg-afa-gold` or any gold-accented background: only `text-afa-deep`.
White, gray, or teal text on gold is forbidden.

### ANCHOR-5 — STATIC FILE LOCK
Never modify: `globals.css` @theme block, `Header.tsx`, `Footer.tsx`.

### MOTION RULE
Forbidden: transform (translate, scale, rotate), parallax, shadow growth on hover,
card elevation (translateY). Border-left-width change on hover is permitted.

### TEXT RULE
All user-visible text from JSON files only. No static strings in components.

### ROUTE TARGETS (confirmed existing routes)
- ATR Matrix:  `/tr/atr-matrix`
- Contact:     `/tr/contact`
- Services:    `/tr/services`

---

## FILE STRUCTURE

```
src/
  app/[locale]/about/
    page.tsx                         ← Replace existing content
  components/hakkimizda/
    B1Hero.tsx                       ← Hero section
    B2BizKimiz.tsx                   ← Who we are, two-col
    B3DegerlendirmeCercevesi.tsx     ← Evaluation framework, 4 cards
    B4AfarklıYapan.tsx               ← Differentiators, banner stack
    B5PiyasaDinamikleri.tsx          ← Market dynamics, two markets
    B6B7Kapanis.tsx                  ← Combined closing + CTA

messages/tr/hakkimizda.json
messages/en/hakkimizda.json
messages/ro/hakkimizda.json
```

---

## SECTION BACKGROUND RHYTHM

```
B1  Hero                    → bg-afa-primary-dark (#18625F)
B2  Biz Kimiz               → bg-white (#FFFFFF)
B3  Değerlendirme Çerçevesi → bg-afa-primary-dark (#18625F)
B4  AFA'yı Farklı Yapan     → #F5F7F6 (inline style)
B5  Piyasa Dinamikleri      → bg-afa-primary-dark (#18625F)
B6+B7 Kapanış               → #F8FAFB (inline style)
```

---

## B1 — HERO SECTION

**Component:** `B1Hero.tsx`
**Background:** `bg-afa-primary-dark` with grid pattern overlay

### Grid Pattern
```
CSS grid overlay:
  background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
  background-size: 56px 56px;
  opacity: 0.04;
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
```

### Layout
```
padding: 96px 64px 88px
max-width: 1120px mx-auto
Inner content: position relative z-index 1
```

### Content (from JSON)
```
Slogan label:
  — [gold line 24px × 2px] + "YATIRIMDAN ÖNCE NETLİK."
  → font: Montserrat 600 / 13px / letter-spacing 0.22em / uppercase
  → color: text-afa-gold
  → margin-bottom: 16px

H1: "Romanya'da Her Proje Yatırıma Hazır Görünür."
  → Montserrat 800 / clamp(34px, 4.8vw, 62px) / line-height 1.10
  → max-width: 640px
  → inline style: color: rgba(255,255,255,0.95)

Subheadline: "Teknik Doğrulama Başka Bir Tablo Gösterir."
  → Montserrat 600 / clamp(16px, 1.6vw, 22px) / line-height 1.35
  → max-width: 620px / margin-top: 14px
  → inline style: color: rgba(255,255,255,0.90)

Body:
  "Bir projenin yatırım değeri dosyasında değil — şebekeye bağlanabilirliğinde,
   üretim kısıntısı riskinde ve izin zincirinin gerçek sağlamlığında saklıdır.
   AFA Energy, ATR Matrix™ metodolojisiyle bu katmanları yatırım kararından
   önce görünür kılar."
  → Open Sans Regular / clamp(14px, 1.15vw, 16px) / line-height 1.75
  → max-width: 600px / margin-top: 18px
  → inline style: color: rgba(255,255,255,0.82)
```

### Metric Cards (3 cards, grid-cols-3)
```
Cards container: display grid / grid-template-columns repeat(3,1fr) / gap 24px / margin-top 32px

Card base styles (all 3):
  background: linear-gradient(160deg, #1f7d7a 0%, #165f5c 55%, #0f4846 100%)
  border-radius: 20px / padding: 36px 32px 32px
  border: 1px solid rgba(40,175,176,0.25)
  box-shadow: 0 1px 0 rgba(255,255,255,0.12) inset,
              0 -4px 0 rgba(0,0,0,0.30) inset,
              0 20px 48px rgba(0,0,0,0.40),
              0 6px 16px rgba(0,0,0,0.22)
  ::after radial highlight: top-right corner, rgba(255,255,255,0.09)

Card 1: border-bottom: 3px solid → border-afa-primary
Card 2: border-bottom: 3px solid → border-afa-primary-light (#4CC9F0 via inline style)
Card 3: border-bottom: 3px solid → border-afa-gold

Metric value: Montserrat 800 / clamp(40px, 3.8vw, 54px) / text-afa-gold / line-height 1
Metric label: Open Sans / 13px / line-height 1.45 / inline style: color rgba(255,255,255,0.70)

Card 1: value="1,3 GW"  label="Analiz edilen proje kapasitesi"
Card 2: value="500+"    label="Değerlendirilen ATR belgesi"
Card 3: value="10"      label="AB ülkesi menşeili kurumsal yatırımcı"
```

### CTA Button
```
Text: "ATR Matrix™ Nasıl Çalışır →"
href: /tr/atr-matrix

Styles:
  display: inline-flex / align-items: center / gap: 8px
  padding: 13px 24px / border-radius: 6px
  background: bg-afa-gold / color: text-afa-deep
  font: Open Sans 700 / 13px
  box-shadow: 0 2px 8px rgba(0,0,0,0.25)
  transition: background-color 120ms ease-linear, box-shadow 120ms ease-linear
  margin-top: 22px

Hover: background #E6B800 (inline style) / box-shadow reduced
Arrow span: transition transform 120ms ease-linear / hover: translateX(4px)
NOTE: Arrow translateX is permitted — it is a UI feedback element, not layout animation.
```

### Responsive
```
Mobile (≤768px): padding 64px 24px 56px / cards grid-cols-1 gap-16px
Tablet (769–1024px): padding 80px 40px 72px
```

---

## B2 — BİZ KİMİZ

**Component:** `B2BizKimiz.tsx`
**Background:** `bg-white`

### Layout
```
Two-column grid: grid-template-columns 6fr 6fr / gap 40px
max-width: 1180px mx-auto / padding: 0 40px
padding-top/bottom: 80px
align-items: stretch
```

### Left Column Content (from JSON)
```
Kicker: [gold line 20px×1px] + "AFA ENERGY HAKKINDA"
  → Open Sans 600 / 11px / letter-spacing 0.18em / uppercase / text-afa-primary

H2: "Teknik Filtre. Doğru Buluşma."
  → Montserrat 700 / clamp(24px, 2.5vw, 32px) / line-height 1.18 / color #0F2E2C inline style
  → margin-bottom: 20px

Body paragraph 1:
  "AFA Energy; İstanbul ve Bükreş merkezli, Romanya ve Türkiye yenilenebilir
   enerji piyasalarında teknik değerlendirme ve danışmanlık hizmeti veren
   uzman bir şirkettir."
  → Open Sans / 16px / line-height 1.7 / color #374151 (inline style)

Divider: height 2px / background #E5E7EB / margin 22px 0

Body paragraph 2:
  "ATR Matrix™ metodolojisiyle incelediğimiz projeler arasından yalnızca
   teknik gerçekliği sağlam olanları seçer, kurumsal yatırımcılarla
   buluştururuz. Geliştirici ile yatırımcı arasındaki bağ, seçim
   disiplinimizin ürünüdür."
  → Open Sans / 16px / line-height 1.7 / color #374151 (inline style)

Status label: "ATR Matrix™\nDeğerlendirme Sonuçları"
  → Open Sans 600 / 11px / letter-spacing 0.18em / uppercase / color #9CA3AF (inline style)
  → margin-top: 24px / margin-bottom: 14px
```

### Status Cards (3 cards)
```
Card base:
  background: #FFFFFF
  border-radius: 14px / overflow: hidden
  width: 100% / max-width: 480px          ← CRITICAL: constrains card within left col
  margin-bottom: 12px
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.08),
              0 8px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)
  transition: box-shadow 120ms linear

Mobile override: max-width: 100%

Card inner: display flex / align-items center / gap 14px / padding 18px 20px 14px 18px

Icon circle: 50px × 50px / border-radius 50% / flex-shrink 0
  Card 1 (İlerlenebilir): background rgba(40,175,176,0.12) / icon ph-check-circle / color text-afa-primary
  Card 2 (Koşullu):       background rgba(255,203,0,0.15) / icon ph-warning / color #B8880A inline
  Card 3 (Durdurucu):     background rgba(242,95,92,0.12) / icon ph-x-circle / color text-afa-coral

Icon library: @phosphor-icons/web@2.1.1 (already installed — do not reinstall)
  Import via CDN script tag or use existing package. Check package.json first.

Card name:
  Card 1: "İlerlenebilir" / color text-afa-primary
  Card 2: "Koşullu" / color #B8880A inline style
  Card 3: "Durdurucu Bulgular" / color text-afa-coral
  → Open Sans 700 / 14px / line-height 1.3 / margin-bottom 3px

Card desc:
  Card 1: "Yatırımcı tarafında görünür hale gelir"
  Card 2: "Tanımlanmış risk koşullarıyla değerlendirilebilir"
  Card 3: "Yatırımcı tarafında görünür hale gelmez"
  → Open Sans / 12px / color #6B7280 inline / line-height 1.4

Bottom band: height 4px / width 100%
  Card 1: bg-afa-primary
  Card 2: bg-afa-gold
  Card 3: bg-afa-coral

Footnote:
  "AFA ön teknik değerlendirmesi, ATR dokümanlarının analizi ve şebeke
   bağlantı koşullarının incelenmesini kapsar."
  → Open Sans / 11px / italic / color #6B7280 inline / line-height 1.65 / margin-top 18px
```

### Right Column — Photo
```
Wrapper: flex flex-col / height 100%

Photo card:
  flex: 1 / min-height: 320px
  position: relative / overflow: hidden / border-radius: 6px
  box-shadow: 0 2px 8px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.12)

Image:
  src: /images/hakkimizda-biz-kimiz.jpg    ← User will copy file to public/images/
  alt: "AFA Energy teknik değerlendirme"
  Use Next.js <Image> with fill prop
  objectFit: cover / objectPosition: center
  style={{ filter: 'brightness(0.9) saturate(0.85)' }}

Gold pull-quote overlay (absolute, bottom 0, left 0, right 0, height 38%):
  background: rgba(255,203,0,0.90)
  padding: 20px 24px 22px
  mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 18%, black 40%)
  display: flex / flex-direction: column / justify-content: center

  Pull quote main (3 lines):
    "Risk fiyatlanabilir."
    "Belirsizlik"
    "fiyatlandırılamaz."
    → Montserrat 900 / clamp(17px,1.9vw,24px) / line-height 1.12
    → color: #0F2E2C (ANCHOR-4: gold zone — only afa-deep)
    → letter-spacing: -0.01em / margin-bottom: 8px

  Pull separator: width 28px / height 2px / background rgba(15,46,44,0.28) / margin-bottom 8px

  Pull sub:
    "AFA, projedeki belirsizliği ölçülebilir zemine taşır."
    → Open Sans / 12px / italic / font-weight 600 / line-height 1.5
    → color: rgba(15,46,44,0.78) (ANCHOR-4 compliant)
    → max-width: 30ch
```

### Responsive
```
Mobile (≤768px):
  grid-template-columns: 1fr
  Left col: order 1 / Right col: order 2 / margin-top 32px
  Photo card: min-height 280px
  Status cards: max-width 100%
```

---

## B3 — DEĞERLENDİRME ÇERÇEVESİ

**Component:** `B3DegerlendirmeCercevesi.tsx`
**Background:** `bg-afa-primary-dark` (#18625F)

### Layout
```
Two-column: left col (header + intro) / right col (2×2 card grid)
grid-template-columns: 5fr 7fr / gap: 48px
max-width: 1180px mx-auto / padding: 0 40px / padding-top/bottom: 88px
align-items: start
```

### Left Column
```
Kicker: [gold line 20px] + "DEĞERLENDİRME ÇERÇEVEMİZ"
  → Open Sans 600 / 11px / uppercase / letter-spacing 0.18em / text-afa-gold
  → margin-bottom: 16px

H2: "Her Proje Dört Eksende İncelenir."
  → Montserrat 700 / clamp(26px, 3vw, 38px) / line-height 1.15
  → inline style: color rgba(255,255,255,0.95)
  → margin-bottom: 20px

Intro:
  "AFA, incelediği her projeyi yatırım kararından önce aynı metodolojik
   disipline tabi tutar. Proje aşaması değişse de çerçeve değişmez."
  → Open Sans / 16px / line-height 1.7
  → inline style: color rgba(255,255,255,0.82)
```

### Right Column — 2×2 Card Grid
```
grid-template-columns: 1fr 1fr / gap: 20px

Card base:
  background: rgba(15,46,44,0.55)    ← deep overlay card
  border-radius: 10px
  border: 1px solid rgba(40,175,176,0.20)
  border-bottom: 3px solid → border-afa-gold
  padding: 24px
  transition: background-color 120ms ease-linear

Card header row: display flex / align-items center / gap 12px / margin-bottom 12px

Number badge:
  font: Montserrat 700 / 11px / letter-spacing 0.12em / text-afa-gold / opacity 0.7

Icon circle: 40px × 40px / border-radius 50%
  background: rgba(40,175,176,0.15) / display flex / align-items center / justify-content center
  Icon: Phosphor icon / 20px / text-afa-primary

Card title: Open Sans 700 / 14px / line-height 1.3 / inline style color rgba(255,255,255,0.92)
Card body:  Open Sans / 13px / line-height 1.6  / inline style color rgba(255,255,255,0.72)
            margin-top: 8px

Cards data:
  01 — icon: ph-lightning / "Bağlantı Uygulanabilirliği"
       "ATR belgesi ve bağlantı koşullarının fiili uygulanabilirliği incelenir.
        Belge ile saha gerçekliği arasındaki boşluklar tespit edilir."

  02 — icon: ph-chart-bar / "Şebeke Kapasitesi ve Üretim Kısıntısı Riski"
       "Bölgesel şebeke yükü, mevcut kapasite ve üretim kısıntısı olasılığı
        değerlendirilir. Curtailment riski yatırım kararından önce görünür kılınır."

  03 — icon: ph-clock / "Bağlantı Maliyeti ve Şebeke Yatırımı"
       "Bağlantı bedeli, ilave şebeke işleri ve olası güçlendirme maliyetleri
        incelenir. ATR sonrası ortaya çıkabilecek gizli CAPEX riskleri erken
        aşamada görünür hale getirilir."

  04 — icon: ph-check-square / "İzin Zinciri ve Takvim Riski"
       "Projenin izin zinciri ve düzenleyici süreçleri kronolojik tutarlılık
        açısından değerlendirilir. Eksik izinler ve prosedürel boşlukların
        yatırım takvimine etkisi analiz edilir."
```

### CTA Button (bottom right aligned)
```
Text: "ATR Matrix™ metodolojisini inceleyin →"
href: /tr/atr-matrix
Position: margin-top 40px / text-align right (or flex justify-end)

Styles:
  display: inline-flex / align-items center / gap 8px
  padding: 12px 24px / border-radius 6px
  background: transparent
  border: 1.5px solid → border-afa-gold
  color: text-afa-gold
  font: Open Sans 700 / 13px
  transition: background-color 120ms ease-linear

Hover: background rgba(255,203,0,0.10) inline style
```

### Responsive
```
Mobile (≤768px): grid-template-columns 1fr / card grid grid-cols-1
Tablet (md): card grid grid-cols-2 maintained
```

---

## B4 — AFA'YI FARKLI YAPAN

**Component:** `B4AfarklıYapan.tsx`
**Background:** inline style `backgroundColor: '#F5F7F6'`

### Layout
```
padding: 80px 0
max-width: 1180px mx-auto / padding: 0 40px

Header: text-align center / margin-bottom 56px
  Kicker: [teal line] + "NEDEN AFA ENERGY" + [teal line]
    → Open Sans 600 / 11px / uppercase / letter-spacing 0.18em / text-afa-primary
    → lines: 20px × 1px / background #28AFB0

  H2: "AFA'yı Farklı Yapan"
    → Montserrat 700 / 32px / line-height 1.1 / color #1A2A2A inline style

Banner stack: display flex / flex-direction column / gap 16px
  max-width: 900px / margin: 0 auto
```

### Banner Cards (5 cards)
```
Card base:
  display: flex / align-items: flex-start / gap: 24px
  background: #FFFFFF (inline style)
  border-radius: 8px / padding: 24px 28px
  box-shadow: 0 1px 4px rgba(0,0,0,0.05)
  border-left: 4px solid → border-afa-primary
  transition: background-color 120ms linear, box-shadow 120ms linear,
              border-left-width 120ms linear

Card hover:
  background-color: #F8FAFB inline style
  box-shadow: 0 2px 8px rgba(0,0,0,0.08) inline style
  border-left-width: 6px

Banner number:
  Montserrat 700 / 36px / line-height 1
  color: text-afa-primary / opacity-25
  min-width: 56px / flex-shrink 0

Banner title: Open Sans 600 / 16px / color #18625F inline / line-height 1.3 / margin-bottom 6px
Banner desc:  Open Sans / 14px / line-height 1.6 / color #6B7B7A inline

Card 05 — gold accent override:
  background: #FDFBF0 inline / border-left-color: border-afa-gold
  Number: text-afa-gold / opacity-40
  Hover: background #F5ECD6 inline / border-left-color: #E6B800 inline

Cards data:
  01 "ATR Matrix™ — Şebeke Bağlantı Analizi"
     "Bağlantı koşullarının finansal etkisi erken aşamada görünür hale getirilir;
      belirsizlik, yatırım kararında kullanılabilir bir değerlendirme zeminine dönüşür."

  02 "Yatırım Komitesine Hazır Çıktılar"
     "Her bulgu tanımlanır, sınıflandırılır ve karar zeminini güçlendirecek biçimde
      yapılandırılır. Çıktılar yatırım komitesi değerlendirmesine uygun format ve
      izlenebilirlik mantığıyla hazırlanır."

  03 "Türkiye–Romanya Köprüsü"
     "Farklı şebeke yapıları ve düzenleyici çerçeveler karşılaştırılabilir bir analiz
      çerçevesi içinde birlikte ele alınarak iki piyasada tutarlı karşılaştırma ve
      öngörülebilir karar süreci sağlanır."

  04 "Finansmana Uygunluk (Bankability) Analizi"
     "Analiz ve raporlama yapısı, bankability perspektifini esas alan teknik durum
      tespiti beklentileriyle uyumlu olacak biçimde kurgulanır."

  05 "Seçicilik Bir Değer Disiplinidir"   ← GOLD ACCENT CARD
     "Değerlendirme sürecinde belirsizliği yüksek ve olgunluğu sınırlı projeler yatırımcı
      tarafında görünür hale gelmeden önce filtrelenir; sunulan proje havuzu tutarlı bir
      olgunluk seviyesinde tutulur."
```

### Responsive
```
Mobile (≤768px):
  padding: 64px 0 / container padding 0 20px
  H2: 26px
  banner-stack gap: 12px
  card padding: 20px / gap: 16px
  number font-size: 28px / min-width: 44px
  title: 15px / desc: 13px
```

---

## B5 — PİYASA DİNAMİKLERİ

**Component:** `B5PiyasaDinamikleri.tsx`
**Background:** `bg-afa-primary-dark` (#18625F)

### Layout
```
padding: 80px 0
max-width: 1180px mx-auto / padding: 0 40px
```

### Header (centered)
```
Kicker: [gold line 24px × 1px opacity-50] + "PİYASA DİNAMİKLERİ" + [gold line]
  → Open Sans 600 / 11px / uppercase / letter-spacing 0.18em / text-afa-gold
  → margin-bottom: 16px

H2: "İki Piyasa. Tek Karar Disiplini."
  → Montserrat 700 / clamp(28px,3.5vw,40px) / line-height 1.15
  → inline style: color rgba(255,255,255,0.95)    ← ANCHOR-3

margin-bottom: 48px
```

### Section Divider
```
height: 1px / background rgba(255,255,255,0.15) / margin-bottom 48px
```

### Market Blocks (2 blocks)
```
Block base: margin-bottom 48px / last-of-type margin-bottom 0

Market header: display flex / align-items baseline / gap 16px / margin-bottom 12px
  Number: Montserrat 800 / clamp(36px,4vw,56px) / line-height 1
          inline style: color rgba(255,255,255,0.20)
  Name:   Montserrat 700 / 24px / color #FFFFFF inline / letter-spacing -0.01em

Market line: height 1px / margin-bottom 24px
  Romania: inline style background rgba(255,203,0,0.50)
  Turkey:  inline style background rgba(40,175,176,0.50)

Market content: grid-template-columns 1fr 1fr / gap 40px / padding-left 8px

Column sub-label: Open Sans 600 / 10px / uppercase / letter-spacing 0.18em / margin-bottom 12px
  Romania columns: inline style color rgba(255,203,0,0.80)
  Turkey columns:  inline style color rgba(40,175,176,0.80)

Column body: Open Sans / 15px / line-height 1.7
  inline style: color rgba(255,255,255,0.85)

BLOCK 01 — Romanya:
  Left sub-label:  "KIRILMA NOKTASI"
  Left body:       "Şebeke bağlantı koşullarının belirsizliği, proje geliştirme sürecinin
                    en kritik risk faktörüdür. ATR Matrix™ bu belirsizliği erken aşamada
                    ölçülebilir verilere dönüştürür."
  Right sub-label: "YATIRIM KOMİTESİ ÇEVİRİSİ"
  Right body:      "Bağlantı riskinin finansal etkisi netleştirilir; yatırım komitesi hangi
                    koşullarda ilerleneceğini, hangi senaryolarda durulacağını önceden görür."

BLOCK 02 — Türkiye:
  Left sub-label:  "KIRILMA NOKTASI"
  Left body:       "Düzenleyici çerçevenin dinamik yapısı ve şebeke yatırımlarının zamanlaması,
                    proje ekonomisini doğrudan etkiler. Mevzuat takibi teknik analizle
                    birleşmelidir."
  Right sub-label: "YATIRIM KOMİTESİ ÇEVİRİSİ"
  Right body:      "İzin zinciri ve şebeke yatırım takvimi riskleri, finansal modelde
                    senaryolaştırılır; yatırımcı bilinçli taahhüt kararı alır."
```

### Gold Pull Statement (closing)
```
margin-top: 48px
padding: 32px 40px
inline style: background rgba(255,203,0,0.10)
border-left: 3px solid → border-afa-gold
border-radius: 0 8px 8px 0

Text: "Farklı regülasyon yapılarına rağmen, AFA'nın teknik değerlendirme disiplini
       her iki piyasada da tutarlı karar zemini sunar."
  → Montserrat 600 / 18px / line-height 1.5 / font-style normal
  → color: text-afa-gold
  → max-width: 700px
```

### Responsive
```
Mobile (≤768px):
  padding: 64px 0 / container 0 24px
  market-content: grid-cols-1 / gap 24px
  market-header: flex-col / gap 4px
  market-name: 20px
  closing padding: 24px / text 16px
```

---

## B6+B7 — KAPANIŞ (BİRLEŞİK)

**Component:** `B6B7Kapanis.tsx`
**Background:** inline style `backgroundColor: '#F8FAFB'`

### Layout
```
padding: 100px 0
max-width: 1180px mx-auto / padding: 0 40px
display: flex / flex-direction: column / align-items: center
```

### Pull Quote
```
"Başkalarının varsaydığını biz doğrularız."
  → NO quotation marks (" " YASAK)
  → Open Sans 700 / italic / 26px / line-height 1.4
  → inline style: color #18625F
  → inline style: border-left 4px solid #FFCB00
  → padding-left: 24px
  → max-width: 720px / width: 100% / margin: 0 auto 60px
```

### Divider
```
width: 100% / max-width: 720px / height: 1px
background: #E5E7EB inline / margin: 0 auto 56px
```

### H2
```
"Yatırımdan Önce Netlik."
  → Montserrat 800 / clamp(28px,3.5vw,40px) / text-align center
  → inline style: color #1A2A2A
  → margin-bottom: 16px
```

### Subtitle
```
"Doğru proje. Doğru yatırımcı.
 Teknik zemin sağlam."
  → Open Sans 600 / italic / 17px / line-height 1.5 / text-align center
  → inline style: color #18625F
  → margin-bottom: 24px
```

### Body
```
"Romanya'da teknik gerçekliği doğrulanmış projelere ulaşmak isteyen
 yatırımcılar için — ya da projesinin değerlendirme sürecini başlatmak
 isteyen geliştiriciler için — doğru yer burasıdır."
  → Open Sans / 16px / line-height 1.7 / text-align center
  → inline style: color #6B7280
  → max-width: 640px / margin: 0 auto 40px
```

### CTA Group
```
display: flex / flex-direction: row / gap: 16px
justify-content: center / align-items: center
margin-bottom: 20px

CTA 1 — Primary Gold:
  Text: "Değerlendirme Sürecini İnceleyin"
  href: /tr/atr-matrix
  inline style: backgroundColor #FFCB00 / color #0F2E2C    ← ANCHOR-4
  font: Open Sans 700 / 15px / padding: 14px 28px / border-radius: 6px
  box-shadow: 0 2px 8px rgba(0,0,0,0.15)
  transition: background-color 120ms linear, box-shadow 120ms linear
  Hover: backgroundColor #E6B800 inline / box-shadow 0 4px 16px rgba(255,203,0,0.35) inline
  NO arrow icon

CTA 2 — Secondary Teal Outline:
  Text: "Teknik Ön İnceleme Talep Edin"
  href: /tr/contact
  inline style: color #28AFB0 / background transparent / border 2px solid #28AFB0
  font: Open Sans 600 / 15px / padding: 14px 28px / border-radius: 6px
  transition: background-color 120ms linear, border-color 120ms linear
  Hover: background rgba(40,175,176,0.08) inline / border-color #1F9092 inline
  NO arrow icon
```

### Disclaimer
```
"Proje-spesifik yasal ve teknik doğrulama tavsiye edilir."
  → Open Sans / 12px / italic
  → inline style: color #6B7280
  → text-align: center / margin-top: 20px
```

### Responsive
```
Mobile (≤640px):
  section padding: 64px 0
  container: 0 24px
  quote font-size: 20px
  cta-group: flex-direction column / align-items center / width 100%
  each CTA: width 100% / text-align center
```

---

## INTERNAL LINKS SUMMARY

| Location | Text | href |
|----------|------|------|
| B1 Hero CTA | ATR Matrix™ Nasıl Çalışır | /tr/atr-matrix |
| B3 CTA | ATR Matrix™ metodolojisini inceleyin | /tr/atr-matrix |
| B6+B7 CTA 1 | Değerlendirme Sürecini İnceleyin | /tr/atr-matrix |
| B6+B7 CTA 2 | Teknik Ön İnceleme Talep Edin | /tr/contact |

---

## PHOTO FILE

B2 right column photo:
  Source file: to be copied by user to `public/images/hakkimizda-biz-kimiz.jpg`
  If file is not present at build time, use a dark placeholder div with:
    background: linear-gradient(155deg, #1c6360 0%, #0f3d3a 45%, #082826 100%)
  Do not fail the build if image is missing.

---

## PAGE.TSX STRUCTURE

```typescript
// src/app/[locale]/about/page.tsx
import { Metadata } from 'next'
import B1Hero from '@/components/hakkimizda/B1Hero'
import B2BizKimiz from '@/components/hakkimizda/B2BizKimiz'
import B3DegerlendirmeCercevesi from '@/components/hakkimizda/B3DegerlendirmeCercevesi'
import B4AfarklıYapan from '@/components/hakkimizda/B4AfarklıYapan'
import B5PiyasaDinamikleri from '@/components/hakkimizda/B5PiyasaDinamikleri'
import B6B7Kapanis from '@/components/hakkimizda/B6B7Kapanis'

export const metadata: Metadata = {
  title: 'Hakkımızda | AFA Energy Romania',
  description: 'AFA Energy Romania, yenilenebilir enerji projelerinde bağımsız teknik doğrulama ve yatırımcı danışmanlığı sunar. 10+ yıl saha tecrübesi.',
}

export default function AboutPage() {
  return (
    <main>
      <B1Hero />
      <B2BizKimiz />
      <B3DegerlendirmeCercevesi />
      <B4AfarklıYapan />
      <B5PiyasaDinamikleri />
      <B6B7Kapanis />
    </main>
  )
}
```

---

## PRE-BUILD CHECKLIST (Claude Code — verify before npm run build)

- [ ] No hardcoded hex values — all colors via tokens or rgba() inline styles
- [ ] All transitions: duration-[120ms] ease-linear only
- [ ] ANCHOR-3: dark backgrounds (B1, B3, B5) use inline style for all text colors
- [ ] ANCHOR-4: gold backgrounds/zones use text-afa-deep or #0F2E2C only
- [ ] ANCHOR-5: globals.css, Header.tsx, Footer.tsx untouched
- [ ] No transform animations except B1 arrow translateX (permitted)
- [ ] All text from JSON — no static strings in components
- [ ] B2 status cards: max-width 480px desktop / 100% mobile
- [ ] B2 photo: Next.js <Image> with fill prop, not <img>
- [ ] B6+B7 quote: no quotation mark characters
- [ ] B6+B7 CTAs: no arrow icons
- [ ] /tr/atr-matrix and /tr/contact routes confirmed existing — use as-is
- [ ] Phosphor icons: check package.json before installing
- [ ] Build passes with 0 TypeScript errors

---

## BUILD INSTRUCTIONS

1. Copy photo file: `public/images/hakkimizda-biz-kimiz.jpg`
2. Run: `npm run build`
3. Report:
   - Build success or failure
   - Total page count
   - Any TypeScript errors
4. If build fails: STOP. Report exact error. Make no further changes.

---

## HOW TO RUN IN CLAUDE CODE

Open terminal in project root:
```
claude
```
Inside the session paste:
```
Please implement the Hakkımızda page following all instructions in
INSTRUCTION_hakkimizda_page_v2.md. Read the entire file before writing
any code. Follow all ANCHOR rules without exception.
```
