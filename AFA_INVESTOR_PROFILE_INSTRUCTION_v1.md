# AFA Energy — Yatırımcı Profili Sayfası
# Implementation Instruction File v1.0
# Claude Code Prompt — Copy-Paste Ready

---

## GENEL TALİMAT

Bu dosya, AFA Energy Yatırımcı Profili sayfasının Next.js implementasyonu için
Claude Code'a verilecek tam spesifikasyondur. Her karar onaylanmış ve kilitlenmiştir.
Hiçbir tasarım kararı bu dosya dışından alınamaz.

```
REFERANS: yatirimci_page_v4.html (kontrollü referans — kompozisyon mantığı için)
UYGULAMA: Onaylı bölüm kararları esas alınarak sıfırdan kurulacak
KURAL: v4'ten doğrudan kopya yapılmayacak. Onaysız hiçbir karar taşınmayacak.
```

---

## 1. PROJE BAĞLAMI

```
Framework : Next.js 14 (App Router)
Language  : TypeScript (strict mode)
CSS       : Tailwind CSS v4
Hosting   : Vercel
```

**Dosya Yolu:**
```
app/investor-profile/page.tsx   ← sayfa dosyası
```

**URL Yönlendirmesi** (i18n middleware — ayrı konfigürasyon):
```
/tr/yatirimci-profili  →  app/investor-profile/page.tsx
/en/investor-profile   →  app/investor-profile/page.tsx
/ro/profil-investitor  →  app/investor-profile/page.tsx
```

---

## 2. TASARIM SİSTEMİ — RENK PALETİ

Aşağıdaki token'lar dışında HİÇBİR hex değeri kullanılmayacak.
Tailwind config'den alınan değerler:

```
afa-deep          #0F2E2C   (en koyu, dark section zemini)
afa-primary       #18625F   (ana teal/yeşil)
afa-accent        #28AFB0   (açık teal, vurgu)
afa-gold          #FFCB00   (altın sarısı)
afa-warning       #F25F5C   (coral kırmızı — SADECE negatif/risk bağlamı)
afa-light         #F5F5F5   (açık gri zemin)
afa-ice           #F8FAFB   (çok açık gri/beyaz arası)
afa-card          #EEF7F7   (kart zemini)
afa-white         #FFFFFF
```

**Gold Zone Kuralı (İHLAL EDİLEMEZ):**
Gold (#FFCB00) veya Teal (#28AFB0) zemin üzerinde metin rengi
mutlaka `#0F2E2C` (afa-deep) olacak. Başka renk YASAK.

---

## 3. TİPOGRAFİ

```
Başlıklar (H1, H2, H3, kicker, badge):  font-family: 'Montserrat'
Body metin:                              font-family: 'Open Sans'
```

Google Fonts import (zaten globals.css'te mevcut — tekrar ekleme):
```
Montserrat: 700, 800
Open Sans: 400, 600
```

---

## 4. LAYOUT SİSTEMİ

```css
.container {
  max-width: 1180px;
  margin-inline: auto;
  padding-inline: 52px;
}

@media (max-width: 768px) {
  .container { padding-inline: 20px; }
}
```

Section padding: `padding: 80px 0` (tüm section'lar için standart)

---

## 5. DSS YASAKLARI (İHLAL EDİLEMEZ)

```
❌ Tailwind opacity modifier YASAK
   text-white/90, text-white/72 vs. — KULLANILMAYACAK
   Dark zemin üzerindeki tüm metin renkleri inline rgba() ile yazılacak
   Örnek: style={{ color: 'rgba(255,255,255,0.72)' }}

❌ CSS transform YASAK
   transform: translateX(), translateY(), scale() vs. — KULLANILMAYACAK
   Carousel, slide, parallax — YASAK

❌ transition: all YASAK
   Sadece şu property'ler geçiş alabilir (max 120ms linear):
   background-color, border-color, color, opacity

❌ Ardışık dark section YASAK
   İki dark section arka arkaya gelemez

❌ Hardcoded hex Tailwind className içinde YASAK
   className="bg-[#18625F]" → YASAK
   className="bg-afa-primary" → DOĞRU

❌ clsx — dark background component'lerinde YASAK

❌ prefers-reduced-motion ihlali YASAK
   @media (prefers-reduced-motion: reduce) { transition: none }
```

---

## 6. BÖLÜM BAZLI SPEC

### Y1 — HERO

```
Section class : hero
Zemin         : #0F2E2C (afa-deep) — DARK
Padding       : 100px 0 80px
```

**Layout:**
```
Sol hizalı içerik (text-left)
Max-width container: 1180px
```

**Dekor:**
```css
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 39px,
      rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px),
    repeating-linear-gradient(90deg, transparent, transparent 39px,
      rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px);
  pointer-events: none;
}
```

**Kicker Pill:**
```
Background : #FFCB00 (afa-gold)
Metin      : #0F2E2C (afa-deep) — Gold Zone Kuralı
Font-size  : 13px
Font-weight: 800
Letter-spacing: 0.12em
Padding    : 6px 16px
Border-radius: 4px
Metin      : "YATIRIMDAN ÖNCE NETLİK."
```

**H1:**
```
Metin      : "Belirsizliği Satın Almak Zorunda Değilsiniz."
Color      : #FFFFFF (inline style)
Font-size  : 44px
Font-weight: 800
Line-height: 1.15
Letter-spacing: -0.02em
Max-width  : 700px
```

**Subtitle:**
```
Color      : rgba(255,255,255,0.72)   ← INLINE STYLE, Tailwind modifier değil
Font-size  : 18px
Max-width  : 620px
Line-height: 1.6
```

**CTA Butonu:**
```
Metin      : "Ön Değerlendirme Başlatın"
Background : #FFCB00 (afa-gold) — STATİK, hover animasyonu yok
Metin rengi: #0F2E2C (afa-deep) — Gold Zone Kuralı
Font-weight: 700
Font-size  : 15px
Padding    : 14px 32px
Border-radius: 8px
Box-shadow : 0 6px 28px rgba(255,203,0,0.60), 0 2px 8px rgba(0,0,0,0.30)
Href       : #investor-form
```

---

### Y1.5 — AFA YAKLAŞIMI

```
Section zemin : #F5F5F5 (afa-light / section-light-alt)
Padding       : 80px 0
Kicker        : "AFA ENERGY YAKLAŞIMI"
H2            : "Yatırım Kararı Öncesi Teknik Netlik Sağlarız."
```

**Grid:**
```
Desktop (1024px+) : grid-template-columns: repeat(4, 1fr); gap: 20px
Tablet (768-1024) : grid-template-columns: repeat(2, 1fr); gap: 20px
Mobile (<768px)   : grid-template-columns: 1fr
```

Tablet'te DOM sırası korunacak: Card 1+2 üst sıra, Card 3+4 alt sıra.

**Kart Bileşeni — .framing-card:**
```css
background    : #EEF7F7 (afa-card)
border-radius : 12px
padding       : 28px 24px
position      : relative
box-shadow    : inset 4px 4px 10px rgba(0,0,0,0.06),
                inset -3px -3px 8px rgba(255,255,255,0.85)

/* Sol altın şerit */
::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #FFCB00, #E6B800);
  border-radius: 4px 0 0 4px;
}
```

**İkon Frame — .icon-circle:**
```css
width         : 28px
height        : 28px
background    : #18625F (afa-primary)
border-radius : 50%
display       : flex
align-items   : center
justify-content: center
margin-bottom : 12px
box-shadow    : inset 2px 2px 4px rgba(0,0,0,0.15),
                inset -1px -1px 3px rgba(255,255,255,0.3)
```

**4 Kart İçeriği:**
```
Kart 1:
  Başlık : "Şebeke Doğrulama"
  Açıklama: "Bağlantı onayının (ATR) yalnızca varlığı değil, sahada fiili
             uygulanabilirliği analiz edilir."

Kart 2:
  Başlık : "Üretim Kısıtı Analizi"
  Açıklama: "Üretim kısıtı (curtailment) riski, teknik ve gelir etkisiyle
             birlikte modellenir."

Kart 3:
  Başlık : "Bağlantı Maliyeti Analizi"   ← "Analizi" kelimesi dahil — kilitli
  Açıklama: "Şebeke bağlantı maliyetleri teknik kapsam üzerinden doğrulanır,
             eksik kalemler tespit edilir."

Kart 4:
  Başlık : "Pre-TDD Koordinasyonu"
  Açıklama: "Yatırım öncesi kritik riskler taranır; proje yatırım komitesi
             değerlendirmesine hazır seviyeye getirilir."
```

**pos-box (kartların altında):**
```
Metin: "AFA'nın rolü projeyi yatırımcıya uydurmak değil; yatırımcıya uygun
        projeyi teknik olarak filtrelemektir."
Style: border-left: 4px solid #FFCB00; padding: 16px 20px; background: #EEF7F7
```

---

### Y2 — ÇERÇEVELEME

```
Section zemin : #FFFFFF (section-light)
Kicker        : "YATIRIMCI PERSPEKTİFİ"
H2            : "Yatırımcı Aslında Ne Satın Alır?"
```

**Pull-Quote Kutusu — kartlardan ÖNCE gelecek:**
```
Background    : #EEF7F7 (afa-card)
Border-left   : 4px solid #FFCB00
Padding       : 24px 28px
Border-radius : 12px
Metin (italic): "Bu proje uzun vadede öngörülebilir ve güvenilir
                 gelir üretebilir mi?"
Font-size     : 16px
Font-weight   : 600
Color         : #0F2E2C (afa-deep)
Alt metin     : "Her yatırım kararının arkasındaki temel soru budur."
                Font-size: 13px, color: #4A5568
```

İtalik YALNIZCA bu kutuda kullanılacak. Sayfanın başka yerinde italik vurgu yok.

**Grid:**
```
Desktop (1024px+) : repeat(2, 1fr); gap: 24px
Tablet (768-1024) : repeat(2, 1fr); gap: 24px
Mobile (<768px)   : 1fr
```

Kart bileşeni: aynı `.framing-card` — Y1.5 ile özdeş.

**4 Kart İçeriği:**
```
Kart 1: "Şebeke Bağlantısı"
Kart 2: "Üretim Kısıtı Riski"
Kart 3: "İzin Süreci"
Kart 4: "Takvim ve Gelir"
İçerikler v4 ile aynı — değiştirilmeyecek.
```

---

### Y3 — TEKNİK DOĞRULAMA

```
Section zemin : #F8FAFB (section-ice)
Kicker        : "BAĞIMSIZ DOĞRULAMA"
H2            : "Yatırımcı Neden Teknik Doğrulamaya İhtiyaç Duyar?"
```

**val-grid — 4 kart, TEK SÜTUN:**
```
grid-template-columns: 1fr
gap: 20px
```

Her kart yapısı:
```
.val-card:
  display  : flex
  gap      : 20px
  align-items: flex-start
```

**.val-num (numara circle):**
```css
width         : 48px
height        : 48px
background    : #18625F (afa-primary)
border-radius : 12px
display       : flex
align-items   : center
justify-content: center
color         : #FFFFFF
font-size     : 18px
font-weight   : 800
box-shadow    : inset 2px 2px 5px rgba(0,0,0,0.2),
                inset -2px -2px 4px rgba(255,255,255,0.1)
flex-shrink   : 0
```

**"AFA farkı" satırları:**
```
color      : #28AFB0 (afa-accent)
font-weight: 600
font-size  : 13px
font-style : italic
margin-top : 4px
```

4 kart içeriği v4 ile aynı — DEĞİŞTİRİLMEYECEK.

**val-comparison — 2'li karşılaştırma (kartların altında):**
```
Grid: repeat(2, 1fr); gap: 24px
Mobile: 1fr
```

Sol kart (olmadan):
```
background   : #F5F5F5 (afa-light)
border-left  : 4px solid #F25F5C (coral)
border-radius: 12px
padding      : 28px 24px
```

Sağ kart (ile):
```
background   : #EEF7F7 (afa-card)
border-left  : 4px solid #28AFB0 (afa-accent)
border-radius: 12px
padding      : 28px 24px
```

**pos-box:** v4 ile aynı metin — değiştirilmeyecek. Y2 pos-box ile stil tutarlı.

---

### Y3.5 — IC LENS

```
Section zemin : #FFFFFF (section-light)
Kicker        : "YATIRIM KOMİTESİ PERSPEKTİFİ"
H2            : "Yatırım Komitesi Hangi Soruları Sorar?"
Max-width     : 640px (liste container'ı — BU KILITLI, değiştirilmeyecek)
```

**Numara circle:**
```css
width         : 32px     ← Y3'teki 48px'den küçük — kasıtlı
height        : 32px
background    : #28AFB0  ← afa-accent — Y3'teki afa-primary'den farklı — kasıtlı
border-radius : 50%
flex-shrink   : 0
```

**Soru spacing:**
```
Her .ic-question için: margin-bottom: 20px
```

6 soru içeriği v4 ile aynı — DEĞİŞTİRİLMEYECEK.

---

### Y4 — ÜÇ YATIRIMCI PROFİLİ

```
Section zemin : #F8FAFB (section-ice)
Kicker        : "YATIRIMCI TİPLERİ"
H2            : "Her Yatırımcı Riske Farklı Yaklaşır."
```

**Grid:**
```
Desktop (1024px+) : repeat(3, 1fr); gap: 24px
Tablet (768-1024) : 1fr
Mobile (<768px)   : 1fr
```

**.embossed-card:**
```css
border-radius : 16px
overflow      : hidden
box-shadow    : 8px 8px 18px rgba(0,0,0,0.14),
                -5px -5px 12px rgba(255,255,255,0.85)
```

**Üst panel (renkli) — min-height: 180px:**
```
Card 1: background: #18625F (afa-primary)
Card 2: background: #0F2E2C (afa-deep)
Card 3: background: #FFCB00 (afa-gold)
```

Card 3'te TÜM metin rengi #0F2E2C (afa-deep) — Gold Zone Kuralı.
Card 3'te body metin opacity DÜŞÜRÜLMEYECEK — tam opacity korunuyor.

**Ghost number:**
```
Card 1+2: color: rgba(255,255,255,0.07)
Card 3  : color: rgba(15,46,44,0.08)
font-size: 120px; font-weight: 900
```

**Badge:**
```
Card 1+2: background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.90)
Card 3  : background: rgba(15,46,44,0.18)   ; color: #0F2E2C  ← 0.12'den 0.18'e
```

**Başlık max 2 satır sınırı:**
```css
.profile-card-top h3 {
  display            : -webkit-box;
  -webkit-line-clamp : 2;
  -webkit-box-orient : vertical;
  overflow           : hidden;
}
```

**Alt panel (beyaz):**
```
background: #FFFFFF
padding   : 24px
```

3 kart içeriği (Kurumsal / Altyapı Fonu / Özel Sermaye) v4 ile aynı —
DEĞİŞTİRİLMEYECEK.

---

### Y5 — RİSK TAŞINABİLİRLİĞİ

```
Section zemin : #FFFFFF (section-light)
Kicker        : "RİSK TAŞINABİLİRLİĞİ"
H2            : "Aynı Proje Neden Farklı Yatırımcıya Uygun Olmaz?"
```

**Tablo:**
```
Sütunlar: 3 (Yatırımcı Tipi / Belirsizliğe Yaklaşımı / Karar Eşiği)
Genişlik : 26% — 37% — 37%
```

Header row:
```
background: #18625F (afa-primary)
color     : #FFFFFF
font-weight: 700
```

Header altı separator:
```
border-bottom: 1px solid rgba(24,98,95,0.15)
```

Zebra striping:
```
Tek satırlar (1., 3.) : background: #EEF7F7 (afa-card)   ← #F8FAFB değil
Çift satırlar (2.)    : background: #FFFFFF
```

Tablo içeriği v4 ile aynı — DEĞİŞTİRİLMEYECEK.

---

### Y6 — ORTAK MOTİVASYONLAR

```
Section zemin : #F8FAFB (section-ice)
Kicker        : "ORTAK KESİŞİM"
H2            : "Tüm Yatırımcı Tipleri Şu Noktada Birleşir."
```

**Grid:**
```
Desktop (1024px+) : repeat(4, 1fr); gap: 20px
Tablet (768-1024) : repeat(2, 1fr); gap: 20px; padding: 32px   ← 28px'den artırıldı
Mobile (<768px)   : 1fr
```

4 kartın başlık uzunlukları ve satır sayıları dengeli olacak.
Bir kart diğerinden baskın görünmeyecek — eşit görsel ağırlık.

4 kart içeriği v4 ile aynı — DEĞİŞTİRİLMEYECEK.

---

### Y6.5 — ÖRNEK ÇIKTILAR

```
Section zemin : #FFFFFF (section-light)
Kicker        : "DEĞERLENDİRME ÇIKTILARI"
H2            : "Tipik Değerlendirme Çıktıları"
```

**Grid:**
```
Desktop : repeat(2, 1fr); gap: 24px
Mobile  : 1fr
```

Satırlar arası divider:
```
Her .sample-line altına: border-bottom: 1px solid rgba(0,0,0,0.06)
Son satır hariç.
```

**Risk seviye renkleri — font-weight: 600:**
```
Yüksek : #F25F5C (coral)  — weight: 600  ← 700'den düşürüldü, token değişmez
Orta   : #FFCB00 (gold)   — weight: 600
Düşük  : #18625F (primary)— weight: 600
```

"Koşullu İlerlenebilir" etiketi: color: #18625F; font-weight: 700.

Disclaimer: *"Yukarıdaki veriler temsili amaçlıdır. Gerçek proje verileri
gizlilik kapsamında korunur."* — korunuyor.

İçerik v4 ile aynı — DEĞİŞTİRİLMEYECEK.

---

### Y6.7 — AFA NE DEĞİLDİR

```
Section zemin : #F5F5F5 (section-light-alt)
Üst border    : border-top: 4px solid #FFCB00   ← Y6.5 ardışıklık çözümü
Padding-top   : 84px  (80px standart + 4px border kompansasyonu)
Kicker        : "NET KONUMLANDIRMA"
H2            : "AFA Energy'nin Rolü"
```

AYRI `<div>` veya `<section>` AÇILMAYACAK. Border section'ın kendisine uygulanacak.

**Grid:**
```
Desktop (1024px+) : repeat(4, 1fr); gap: 20px
Tablet (768-1024) : repeat(2, 1fr); gap: 20px
Mobile (<768px)   : 1fr
```

**4 "Değildir" kartı — her biri FARKLI ikon:**
```
Kart 1: "Proje Geliştiricisi Değildir"   — İkon: ban/circle-slash tipi
Kart 2: "EPC Yüklenicisi Değildir"       — İkon: wrench/tool tipi
Kart 3: "Yatırım Tavsiyesi Vermez"       — İkon: chart-line-down/prohibit tipi
Kart 4: "Satış Tarafında Yer Almaz"      — İkon: handshake-slash tipi
```

Tüm ikonlar: aynı stroke sistemi (outline, değil fill), aynı optical sizing (20-22px).
Phosphor Icons kullanılıyor — aynı weight (Regular veya hepsi Bold — karışık olmayacak).

**pos-box:** v4 ile aynı metin — korunuyor.

---

### Y7 — FORM (2 AŞAMALI)

```
Section id    : investor-form
Section zemin : #0F2E2C (afa-deep) — DARK
```

**ZORUNLU: Bu section'daki TÜM metin renkleri inline rgba() olacak.**
Tailwind opacity modifier (`text-white/90` vb.) KULLANILMAYACAK.

**Form container:**
```
max-width     : 740px   ← kilitli
margin        : 0 auto
background    : rgba(255,255,255,0.04)
border-radius : 16px
padding       : 40px
border        : 1px solid rgba(255,255,255,0.08)
```

**Step indicator:**
```
Aktif dot    : background: #FFCB00 (afa-gold)
Pasif dot    : background: rgba(255,255,255,0.25)
Bağlantı çizgisi: rgba(255,255,255,0.35)   ← 0.25'ten artırıldı
```

**Form input'lar:**
```
background : rgba(255,255,255,0.07)
border     : 1px solid rgba(255,255,255,0.15)
focus border: 1px solid #FFCB00 (afa-gold)
color      : rgba(255,255,255,0.90)   ← INLINE STYLE
placeholder: rgba(255,255,255,0.42)   ← 0.35'ten artırıldı — INLINE STYLE
```

**Label rengi:**
```
color: rgba(255,255,255,0.70)   ← INLINE STYLE
```

**Submit butonu:**
```
background  : #FFCB00 (afa-gold)
color       : #0F2E2C (afa-deep) — Gold Zone Kuralı
font-weight : 700
```

Aşama 1 içeriği, Aşama 2 içeriği, consent kutusu, form-legal disclaimer
v4 ile aynı — DEĞİŞTİRİLMEYECEK.

JS (goStep2 fonksiyonu) v4'ten taşınacak.

---

### Y8 — SÜREÇ AKIŞI

```
Section zemin : #FFFFFF (section-light)   ← Y7 dark ardından kasıtlı güçlü geçiş
Kicker        : "SÜREÇ AKIŞI"
H2            : "Sonrasında Ne Olur?"
```

**Grid:**
```
Desktop (1024px+) : repeat(4, 1fr); gap: 24px
Tablet (768-1024) : repeat(2, 1fr); gap: 24px
Mobile (<768px)   : 1fr
```

**Kart zemin:**
```
background    : #F8FAFB (afa-ice)   ← beyaz section içinde katman
border        : 1px solid rgba(0,0,0,0.05)   ← kartların "yüzmesini" engeller
border-radius : 12px
padding       : 28px 24px
```

**Phase etiketi:**
```
color         : #28AFB0 (afa-accent)
font-size     : 12px   ← 11px'den artırıldı
font-weight   : 700
letter-spacing: 0.08em
text-transform: uppercase
```

4 kart içeriği v4 ile aynı — DEĞİŞTİRİLMEYECEK.

---

### DİSCLAİMER BANDI

```
Section zemin : #F8FAFB (section-ice)
Padding       : 24px 0
Font-size     : 13px
Color         : #718096
Metin         : "Bu web sitesindeki bilgiler genel bilgilendirme amaçlıdır;
                 yatırım tavsiyesi, finansman garantisi veya hukuki danışmanlık
                 niteliği taşımaz. Proje-spesifik yasal ve teknik doğrulama
                 tavsiye edilir."
```

---

## 7. KESİT BAZLI ZEMİN RİTMİ (KONTROL LİSTESİ)

```
Y1   : #0F2E2C  DARK      ✓
Y1.5 : #F5F5F5  light-alt ✓  (dark'tan açığa geçiş)
Y2   : #FFFFFF  white     ✓
Y3   : #F8FAFB  ice       ✓
Y3.5 : #FFFFFF  white     ✓
Y4   : #F8FAFB  ice       ✓
Y5   : #FFFFFF  white     ✓
Y6   : #F8FAFB  ice       ✓
Y6.5 : #FFFFFF  white     ✓
Y6.7 : #F5F5F5  light-alt ✓  (border-top gold ile ayrışma)
Y7   : #0F2E2C  DARK      ✓  (ikinci ve son dark section)
Y8   : #FFFFFF  white     ✓  (dark'tan en güçlü kırılım)
Disc : #F8FAFB  ice       ✓
```

Ardışık dark section YOK — DSS kuralı karşılandı.

---

## 8. ERİŞİLEBİLİRLİK

Her section'a `aria-labelledby` eklenecek:
```html
<section aria-labelledby="y1-title">
  <h1 id="y1-title">...</h1>
</section>
```

Tüm ikonlar için `aria-hidden="true"` — dekoratif ikon.
Form input'ları için `<label>` ile `htmlFor` ilişkisi kurulacak.
WCAG AA kontrast: tüm metin/zemin kombinasyonları 4.5:1 oranını karşılamalı.

---

## 9. COMPONENT MİMARİSİ

Önerilen dosya yapısı:

```
components/investor-profile/
  HeroSection.tsx        (Y1)
  ApproachSection.tsx    (Y1.5)
  FramingSection.tsx     (Y2)
  ValidationSection.tsx  (Y3)
  ICLensSection.tsx      (Y3.5)
  ProfilesSection.tsx    (Y4)
  RiskSection.tsx        (Y5)
  MotivationsSection.tsx (Y6)
  SampleOutputsSection.tsx (Y6.5)
  PositioningSection.tsx (Y6.7)
  InvestorForm.tsx       (Y7)
  ProcessSection.tsx     (Y8)
```

Her component kendi section'ını kapsar.
Ortak kart bileşenleri:

```
components/ui/
  FramingCard.tsx    (Y1.5 + Y2'de kullanılan .framing-card)
  EmbossedCard.tsx   (Y4'te kullanılan .embossed-card)
```

---

## 10. UYGULAMA KONTROL LİSTESİ

Claude Code aşağıdaki adımları sırayla uygulayacak:

```
[ ] 1. Dosya yapısını oluştur (app/investor-profile/page.tsx)
[ ] 2. Tailwind config'de token'ların tanımlı olduğunu doğrula
[ ] 3. Y1 Hero → implement et
[ ] 4. Y1.5 → implement et, framing-card component oluştur
[ ] 5. Y2 → implement et, framing-card component'ini kullan
[ ] 6. Y3 → implement et
[ ] 7. Y3.5 → implement et
[ ] 8. Y4 → implement et, embossed-card component oluştur
[ ] 9. Y5 → implement et
[ ] 10. Y6 → implement et
[ ] 11. Y6.5 → implement et
[ ] 12. Y6.7 → implement et (border-top gold, ayrı section açma)
[ ] 13. Y7 → implement et, TÜM metin inline rgba() kontrolü yap
[ ] 14. Y8 → implement et
[ ] 15. Disclaimer → implement et
[ ] 16. Responsive breakpoint kontrolü (1024 / 768 / mobile)
[ ] 17. DSS yasak listesi son kontrol (transform, transition:all, opacity modifier)
[ ] 18. aria-labelledby kontrolü — tüm section'lar
[ ] 19. WCAG kontrast son kontrol — özellikle Y7 form alanları
```

---

## NOTLAR (Implementation Agent için)

1. `globals.css`, `Header.tsx`, `Footer.tsx` DOKUNULMAYACAK — protected files.
2. v4 HTML referans olarak okunabilir ama birebir kopyalanmayacak.
3. Tailwind className içinde hex değer (`bg-[#FFCB00]`) YASAK —
   token adı kullanılacak (`bg-afa-gold`).
4. Dark section (Y1, Y7) içindeki tüm metin renkleri
   implement edildikten sonra ayrıca kontrol edilecek.
5. Y6.7 section'ına `style={{ borderTop: '4px solid #FFCB00', paddingTop: '84px' }}`
   — ayrı div AÇILMAYACAK.

---

*AFA_INVESTOR_PROFILE_INSTRUCTION_v1.0 — Onaylı kararlar kilitlidir.*
*Herhangi bir değişiklik için Claude Chat'te onay alınmalıdır.*
