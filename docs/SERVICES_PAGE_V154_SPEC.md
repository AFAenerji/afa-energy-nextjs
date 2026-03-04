# AFA ENERGY — HİZMETLER SAYFASI v15.4 — FULL DESIGN SPECIFICATION

NOTE: Implementation instructions are in CLAUDE_CODE_SERVICES_V154.md.
This file contains ALL text content and design rules.

---

## 0. MÜHÜRLÜ KURALLAR

1. Palet kilidi: Yalnızca 8 renk. Palet dışı yasak.
2. Gold Zone: #FFCB00 bg üzerinde yalnızca #0F2E2C metin.
3. Overlay: Sol hizalı hero → gradient. Merkez hizalı break → solid.
4. CTA: transition-all yasak. 120ms linear.
5. Motion: Max 120ms linear. Transform, easing, parallax, backdrop-filter blur yasak.
6. Timeline görseller: Yalnızca ≥768px. Mobilde gizli.
7. WarningBox: bg yalnızca #F5F5F5, vurgu yalnızca gold border-left.
8. Görsel kaynağı: AI görseller yasak.
9. Placeholder: #F5F5F5, gray-100 değil.
10. Alt text: Zorunlu. "Ne var + bağlam" formatı.

## RENK PALETİ (8 RENK)

| Token | Hex |
|-------|-----|
| afa-primary-dark | #18625F |
| afa-primary | #28AFB0 |
| afa-gold | #FFCB00 |
| afa-deep | #0F2E2C |
| afa-light | #F5F5F5 |
| white | #FFFFFF |
| gray-600 | #4B5563 |
| gray-200 | #E5E7EB |

## SAYFA AKIŞI

HERO → KONUMLANDIRMA (white) → BÖLÜM 1 (#F5F5F5) → PHOTO BREAK 1 → BÖLÜM 2 (white) → PHOTO BREAK 2 → NEDEN AFA (#F5F5F5) → KAPANIŞ (#0F2E2C) → DISCLAIMER (#F5F5F5)

## KONTEYNER GENİŞLİKLERİ

Hero metin: 720px | Konumlandırma: 680px | Bölüm 1: 1100px | Photo Break metin: 640px | Timeline: 960px | Neden AFA: 1100px | Kapanış: 660px | Disclaimer: 660px

## SECTION PADDING

Base: py-16 px-4 | md: md:py-20 md:px-6 | lg: lg:py-24 lg:px-8
Hero: pt-24 pb-16

---

## HERO

Badge: "YATIRIMDAN ÖNCE NETLİK." — bg #FFCB00, text #0F2E2C, uppercase, 12px, bold, rounded-[6px], px-4 py-1.5

H1: "Yatırıma Uygun Projeler ve Teknik Doğrulama." — white, clamp(28px,5vw,48px), bold, leading-tight, max-w-[720px]

Desc: "AFA, Romanya'da ön teknik durum tespiti yapılmış ve yatırıma uygunluk açısından ön filtreleme sürecinden geçirilmiş projeleri yatırımcılara sunar. Teknik doğrulama hizmetleriyle yatırım sürecinin her aşamasında bağımsız mühendislik desteği sağlar." — white/88, clamp(15px,2vw,18px), leading-[1.7], max-w-[640px]

CTA: "Yatırıma Uygun Projeleri Keşfet" — bg #FFCB00, text #0F2E2C, bold, rounded-[6px], px-8 py-4

Overlay gradient:
```css
linear-gradient(to right, rgba(15,46,44,0.85) 0%, rgba(15,46,44,0.55) 50%, rgba(15,46,44,0.25) 100%)
```

Pillar bar: rgba(15,46,44,0.65) band, py-4, min-h-[72px], 3 columns:
| Şebeke Entegrasyonu | Finansal Dayanıklılık | Yasal Uyum |
| ATR doğrulama | Üretim/gelir | İzin zinciri tutarlılık |
Separator: gold dot 6px round. Headings: white, 14px, uppercase, semibold. Desc: white/80, 13px.

---

## KONUMLANDIRMA (bg: white, max-w: 680px, center)

Accessibility: role="group" + sr-only h2 "Yatırımcı ve Geliştirici Perspektifi"

Q1: "Projeniz doğru yatırımcıya ulaşabiliyor mu?" — #0F2E2C, clamp(22px,3.5vw,30px), bold
Q2: "Yatırımınız için doğru proje masanıza geliyor mu?" — #18625F, same size, bold
Gap: 8-12px between questions

P1: "Yenilenebilir enerji yatırımcısı santral satın almaz; projenin gelecekte üreteceği nakit akışlarını, teknik dayanıklılığını ve regülatif uyumluluğunu satın alır. Yatırım kararı, projenin bugünkü görüntüsüne değil, teknik temeline ve öngörülebilir performansına dayanmalıdır."

P2: "Proje geliştiricisi ise erken aşamadan itibaren emek, sermaye ve zaman yatırarak projeyi olgunlaştırır. Ancak bu sürecin sonunda projenin gerçek teknik değerini bağımsız biçimde doğrulatmak, doğru yatırımcıyla buluşmak ve sürecin şeffaf yönetilmesini sağlamak geliştiricinin en büyük ihtiyacıdır."

P3: "Ancak bu iki taraf her zaman birbirini bulamaz. Bilgi asimetrisi, eksik teknik dokümantasyon ve standart dışı değerlendirme süreçleri, potansiyel olarak uygun eşleşmelerin gerçekleşmesini engeller."

P4: "AFA, bu eşleşmeyi teknik doğrulama disipliniyle sağlar. Projenin şebeke bağlantı gerçekliğinden finansal varsayımlarına, izin süreçlerinden yapım kalitesine kadar her katmanı bağımsız olarak inceleyerek hem yatırımcıya hem geliştiriciye güvenilir bir zemin oluşturur."

Closing italic: "Amacımız yalnızca rapor üretmek değil, yatırım kararını netleştirmektir." — #18625F, italic

Paragraphs: #4B5563, 17px, leading-[1.8], gap 16px

---

## BÖLÜM 1 — PROJE BULMA (bg: #F5F5F5, max-w: 1100px)

H2: "Yatırıma Uygun Proje Bulma" — #0F2E2C, bold

Intro: "AFA, ön teknik durum tespiti yapılmış ve yatırıma uygunluk açısından ön filtreleme sürecinden geçirilmiş projeleri yatırımcılara sunar."

Checklist (4 items, check icon #28AFB0):
- Şebekeye bağlanma gerçekliği ön kontrolü yapılmış
- İzin ve prosedür akışı incelenmiş
- Teknik riskleri ön sınıflandırılmış
- Finansal varsayımları teknik açıdan gözden geçirilmiş

Purpose: "Bu aşamanın amacı, yatırımcının masasına gelen her projenin belirli bir teknik olgunluk seviyesini karşılamasını sağlamaktır."

### İkili Kart Grid (md:grid-cols-2, gap-6)

**Sol kart — Yatırımcı:**
- bg white, rounded-lg, shadow-sm, border-top 3px #18625F
- H3: "Yatırımcılar İçin Sunduğumuz" — bold, #0F2E2C, text-lg
- Body: "Teknik riskleri önceden tanımlanmış, risk tolerans seviyenize uygun projelere erişim. AFA'nın bağımsız ön değerlendirmesinden geçmiş projeler arasından seçim yapabilirsiniz."
- CTA PRIMARY: "Yatırımcı Kriterleri Sayfasına Git"
- Padding: 28px

**Sağ kart — Geliştirici:**
- bg white, rounded-lg, shadow-sm, border-top 3px #28AFB0
- H3: "Geliştirici İçin Sunduğumuz" — bold, #0F2E2C, text-lg
- Body: "Projenizin teknik değerini bağımsız biçimde doğrulayarak doğru yatırımcıyla buluşma imkânı. AFA'nın bağımsız değerlendirmesi, projenizin güvenilirliğini artırır."
- CTA SECONDARY: "Proje Geliştiricisi Sayfasına Git" — border 2px #18625F, text #18625F
- Padding: 28px

Routing: "Proje arıyorsanız yatırımcı kriterleri sayfası üzerinden tercihlerinizi iletebilirsiniz. Projenizi yatırımcılarla buluşturmak istiyorsanız geliştirici sayfasını ziyaret edin."

**Geçiş Paragrafı:**
- border-left: 2px #FFCB00, padding-left: 24px
- italic, #0F2E2C, 16px, leading-[1.75], max-w-[780px]
- "Yatırım sürecinin her aşamasında teknik doğrulama ortaklığı sağlıyoruz. Aşağıda, ön değerlendirmeden satın alma sonrasına kadar uzanan teknik doğrulama hizmetlerimizin kapsamını bulabilirsiniz."

---

## PHOTO BREAK 1 (between Bölüm 1 and Timeline)

ID: #photo-break-transition
Image: /images/services/photo-break-transition.jpg
Overlay: rgba(15,46,44,0.60) SOLID
Height: h-[260px] md:h-[340px] lg:h-[380px]

Main: "Teknik doğrulama, yatırım kararının temelidir." — white, bold, clamp(20px,3vw,26px), center
Sub: "Her aşamada bağımsız teknik ortaklık." — white/75, 15px, italic, center

---

## BÖLÜM 2 — TIMELINE (bg: white, max-w: 960px)

Label badge: "TEKNİK DOĞRULAMA HİZMETLERİ" — bg #F5F5F5, text #18625F, uppercase, 12px, bold
H2: "Yatırım Sürecinin Her Aşamasında Teknik Doğrulama" — #0F2E2C, center
Intro: "Yatırım kararı, satın alma, inşaat ve işletme — her aşamada bağımsız teknik doğrulama ile riskleri azaltıyoruz." — #4B5563, center, max-w-[640px]

### Stage 01 — Teknik Ön Değerlendirme
Badge: "Başlangıç: 3 iş günü" — bg #28AFB0, text white, 12px, bold, rounded
Lead: "Bir projeyi detaylı incelemeden önce, yatırım sürecine alıp almayacağınıza hızla karar vermeniz gerekir." — #18625F, semibold
Body: "Teknik Ön Değerlendirme çalışması; projenin şebeke bağlantı koşullarını, temel izin durumunu ve ilk finansal varsayımları kısa sürede tarayarak karar vericinize net bir başlangıç noktası sunar."
Foot: "Bu aşama, erken değerlendirme yapacak yatırımcılar ve proje portföyünü hızla filtrelemek isteyen fonlar için tasarlanmıştır." — #18625F, italic
Result: "ilerlenebilir, koşullu ilerlenebilir veya ek doğrulama gerekli" — bg #F5F5F5, text #0F2E2C
CTA: "Ön TDD Başvurusu Yap" — PRIMARY

### Stage 02 — Detaylı Teknik İnceleme
Body: "Detaylı Teknik İnceleme (Technical Due Diligence), yatırım kararının teknik temelini oluşturan kapsamlı analiz sürecidir. Şebeke bağlantısı, enerji üretim projeksiyonları, ekipman değerlendirmesi, izin ve uyum kontrolü bu aşamada derinlemesine incelenir."
ExtraBody: "İnceleme kapsamı; projenin büyüklüğüne, belge yoğunluğuna ve teknik karmaşıklığına göre belirlenir."
Foot: "Bu aşamada üretilen raporlar, yatırım komitesi (IC) standartlarında hazırlanır ve karar sürecine doğrudan girdi sağlar."

### Stage 03 — Satın Alma Süreci — Teknik Uyumlaştırma
Body: "Satın alma sürecinde teknik bulguların ticari müzakereye entegrasyonunu sağlarız. Tespit edilen risklerin SPA'ya yansıtılması, garanti mekanizmalarının yapılandırılması ve teknik koşulların müzakere pozisyonuna dönüştürülmesinde danışmanlık veririz."
Foot: "Bu aşama, teknik bulguların satın alma belgelerine doğru ve eksiksiz yansımasını garanti eder."

### Stage 04 — EPC Aşaması — İşveren Mühendisliği
Body: "İnşaat aşamasında EPC yüklenicisinin teknik performansını bağımsız olarak izleriz. Tasarım uygunluğu, malzeme kalitesi, montaj standartları ve devreye alma süreçlerinin sözleşme şartlarına uyumunu denetleriz."
Foot: "Yatırımcının sahada gözü ve kulağı olarak, inşaat risklerini minimize ederiz."
Warning: title="ÖNEMLİ", body="AFA, EPC (Mühendislik, Tedarik, İnşaat) yüklenicisi değildir. Yatırımcı adına bağımsız teknik gözetim sağlar.", variant="important"

### Stage 05 — İşletme Dönemi — Varlık Yönetimi
Body: "İşletme döneminde santralin teknik performansını izler, bakım stratejisini değerlendirir ve performans sapmalarını analiz ederiz. Uzun vadeli değer koruması için teknik öneri ve raporlama sağlarız."
Foot: "Varlık yönetimi teknik danışmanlığı, yatırımın uzun vadeli getiri performansını koruma altına alır."

### Stage 06 — Santral Satışı / Refinansman
Body: "Çıkış aşamasında veya refinansman sürecinde, varlığın güncel teknik durumunu bağımsız olarak değerlendiririz. Vendor Due Diligence (VDD) raporları hazırlar, teknik riskleri ve kalan ömür projeksiyonlarını potansiyel alıcılara veya borç verenlere sunarız."
Foot: "Bu aşama, çıkış değerini maksimize etmek ve alıcı tarafın güvenini sağlamak için kritiktir."

Timeline number box: 48×48px, rounded-lg (8px), border 2px #28AFB0, bg white, number 20px bold #28AFB0
Vertical line: 2px #28AFB0, opacity 0.3, flex-grow. NO line on stage 06.
Images: desktop only (≥768px), 200px width, 16:10 ratio, Phase 1 placeholders.

---

## PHOTO BREAK 2 (between Timeline and Why AFA)

ID: #photo-break-breathe
Image: /images/services/photo-break-breathe.jpg
Overlay: rgba(15,46,44,0.60) SOLID
Height: same as Break 1

Main: "Sahada doğrulanan her bulgu, yatırım kararını güçlendirir." — white, bold, clamp(20px,3vw,26px), center
NO sub text.

---

## NEDEN AFA (bg: #F5F5F5, max-w: 1100px)

H2: "Neden AFA?" — center

4-card grid: repeat(auto-fit, minmax(240px, 1fr)), gap 20px
Cards: bg white, rounded-lg, shadow-sm, border-top 3px #28AFB0, padding 28px 24px
Icon: 32×32, stroke-only, #28AFB0
H3: 17px, bold, #0F2E2C | Body: 14px, #4B5563, leading-[1.7]
Hover: border-top-color → #18625F (120ms linear). Shadow stays.

1. Bağımsızlık (Shield): "Proje geliştirmiyoruz, EPC yapmıyoruz, ekipman satmıyoruz. Yalnızca yatırımcı ve borç veren tarafında konumlanarak çıkar çatışmasını ortadan kaldırıyoruz."
2. Şebeke Gerçekliği (Zap): "Bağlantı kararını belgeye değil, şebekenin fiziksel kapasitesine dayandırıyoruz. ATR Matrix™ metodolojimiz, bağlantı riskini projenin en erken aşamasında ölçer."
3. Karar Disiplini (ClipboardCheck): "Teknik bulguları yatırım komitesine sunulabilir formatta hazırlıyoruz. Belirsizlikleri tanımlı senaryolara, riskleri ölçülebilir parametrelere dönüştürüyoruz."
4. Doğru Eşleştirme (GitMerge): "Projenin aşamasını ve risk profilini yatırımcının risk tolerans seviyesiyle eşleştiririz. Bu teknik eşleştirme, her iki taraf için de sürecin verimliliğini artırır."

Methodology link: "Metodoloji sayfasını ziyaret edebilirsiniz →" — #28AFB0, 14px, semibold

---

## KAPANIŞ CTA (bg: #0F2E2C, max-w: 660px, center)

H2: "Şimdi Başlayalım" — white, bold
Body: "Proje arıyorsanız yatırımcı kriterleri sayfasına gidin. Projenizi yatırımcılarla buluşturmak istiyorsanız geliştirici sayfasını ziyaret edin." — white/80

Primary: "Yatırımcı Kriterleri Sayfasına Git" — bg #FFCB00, text #0F2E2C
  Micro: "AFA'nın seçili proje havuzuna erişin" — 12px, white/60
Secondary: "Proje Geliştiricisi Sayfasına Git" — border white/40, text white
  Micro: "Projenizi yatırımcılarla buluşturun" — 12px, white/60
Tertiary: "Ön TDD Başvurusu Yap →" — #FFCB00, 14px, semibold

Buttons: flex, gap-4, justify-center, flex-wrap

---

## DISCLAIMER (bg: #F5F5F5, max-w: 660px, center)

border-top: 1px #E5E7EB | text: 12px, #4B5563, leading-[1.6] | padding: 20px 16px

"Bu sayfadaki bilgiler genel tanıtım amaçlıdır ve hukuki, mali veya yatırım tavsiyesi niteliği taşımaz. Proje-spesifik yasal ve teknik doğrulama tavsiye edilir. AFA Energy, sunulan bilgilerin doğruluğu konusunda azami özeni göstermekle birlikte, değişen piyasa koşulları ve düzenlemeler nedeniyle bilgilerin güncelliğini garanti etmez."

---

## CTA BİLEŞEN STANDARDI

| Tür | BG | Text | Hover | Transition |
|-----|-----|------|-------|------------|
| Primary | #FFCB00 | #0F2E2C | filter: brightness(1.05) | filter 120ms linear |
| Secondary | transparent | #18625F or white | border-color change | border-color 120ms linear |
| Tertiary | transparent | #FFCB00 or #28AFB0 | underline + offset 4px | text-decoration-color 120ms linear |

All: border-radius 6px, font-bold. Standard: px-6 py-2.5 | Hero: px-8 py-4
FORBIDDEN: transition-all, transform, box-shadow transition, opacity transition
