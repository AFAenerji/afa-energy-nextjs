# SERVICES PAGE v15.4 — IMPLEMENTATION INSTRUCTIONS FOR CLAUDE CODE

Read the full design specification in `SERVICES_PAGE_V154_SPEC.md` before starting. This file contains step-by-step implementation instructions.

## PREREQUISITE

1. Read SERVICES_PAGE_V154_SPEC.md completely
2. Check current services page: `ls -la src/app/\[locale\]/services/` or `src/app/\[locale\]/hizmetler/`
3. Check existing components: `ls -la src/app/components/`
4. Check globals.css for existing design tokens: `cat src/app/globals.css`
5. Check existing images: `ls -la public/images/services/` (create dir if missing)
6. Report findings before proceeding

---

## PHASE 1 — TYPES & DATA STRUCTURE (5 min)

Create `src/app/[locale]/services/types.ts`:

```typescript
export interface StageWarning {
  title: string;
  body: string;
  variant: "important";
}

export interface StageCTA {
  text: string;
  href: string;
}

export interface StageImage {
  src: string;
  alt: string;
}

export interface TimelineStageData {
  number: string;          // "01"–"06"
  title: string;
  badge?: string;
  lead?: string;
  body: string;
  extraBody?: string;
  foot: string;
  result?: string;
  cta?: StageCTA;
  warning?: StageWarning;
  image: StageImage;
}

export interface WhyAfaCard {
  icon: string;            // Lucide icon name
  title: string;
  body: string;
}
```

Create `src/app/[locale]/services/data.ts` with all 6 stages' content from the spec (Section 3.5). Include:

- Stage 01: badge="Başlangıç: 3 iş günü", lead paragraph, result row, CTA
- Stage 02: extraBody for scope note, no badge/lead/CTA
- Stage 03: title with em dash "Satın Alma Süreci — Teknik Uyumlaştırma"
- Stage 04: warning={ title: "ÖNEMLİ", body: "AFA, EPC yüklenicisi değildir...", variant: "important" }
- Stage 05: standard body + foot
- Stage 06: standard body + foot (last stage — no vertical line)

Also include the 4 WhyAFA cards from Section 3.7. Card 4 title = "Doğru Eşleştirme" (NOT "Yatırımcı Odaklılık").

All text content is in Turkish. Copy EXACT text from SERVICES_PAGE_V154_SPEC.md.

---

## PHASE 2 — SHARED COMPONENTS (10 min)

### 2A. BackgroundImageSection

Create `src/app/components/BackgroundImageSection.tsx`

Two modes: "hero" and "break". Single component, different overlay behavior.

```
Props:
  mode: "hero" | "break"
  imageSrc: string
  imageAlt: string
  children: React.ReactNode
  className?: string
```

| Property | mode="hero" | mode="break" |
|----------|-------------|--------------|
| Overlay | Gradient left→right: rgba(15,46,44,0.85) → rgba(15,46,44,0.55) → rgba(15,46,44,0.25) | Solid rgba(15,46,44,0.60) |
| Text align | text-left | text-center |
| Height | min-h-[600px] lg:min-h-screen | h-[260px] md:h-[340px] lg:h-[380px] |
| Text container | max-w-[720px] | max-w-[640px] |
| Image priority | fetchpriority="high" | standard lazy |

CRITICAL OVERLAY RULE:
- Hero (left-aligned text) → gradient overlay (functional, for WCAG text contrast)
- Break (center-aligned text) → solid overlay (uniform contrast needed)
- This is component-type based, NOT page based

Use next/image with fill, object-cover. Hero image gets priority loading.

### 2B. WarningBox

Create `src/app/components/WarningBox.tsx`

```
Props:
  title: string     // "ÖNEMLİ"
  body: string
  variant: "important"
```

Style (SEALED — no alternatives):
- bg: #F5F5F5 (afa-light) — NOT rgba(255,203,0,0.08)
- border-left: 3px #FFCB00 (afa-gold)
- border-radius: 6px
- padding: 16px
- title: font-bold, #0F2E2C (afa-deep), text-sm
- body: #4B5563 (gray-600), text-sm

### 2C. TimelineStage

Create `src/app/components/TimelineStage.tsx`

Props: TimelineStageData + isLast: boolean

Layout: flex row — left column (number + vertical line) + right column (content + optional image)

Number box: 48×48px, rounded-lg (8px), border 2px #28AFB0 (afa-primary), bg white, number text 20px bold #28AFB0
Vertical line: 2px #28AFB0, opacity 0.3, flex-grow. NO line on last stage (isLast=true).

Right column content order:
1. H3 title + optional badge (flex row, gap-4)
2. Optional lead paragraph (afa-primary-dark, semibold)
3. Body paragraph (gray-600)
4. Optional extraBody (gray-600)
5. Foot paragraph (afa-primary-dark, italic)
6. Optional warning (WarningBox component)
7. Optional result row (bg afa-light, text afa-deep, rounded, px-4 py-2)
8. Optional CTA button (primary style: bg gold, text deep)

Image: flex 0 0 200px, DESKTOP ONLY (hidden below 768px). In Phase 1 use placeholder:
- bg: #F5F5F5 (afa-light)
- border: 1px #E5E7EB (gray-200)
- aspect-ratio: 16/10
- rounded-lg (8px)
- Center an icon from lucide-react (ImageIcon or Camera) in #28AFB0, 32px

Badge (Stage 01 only): bg #28AFB0, text white, 12px, font-bold, rounded, px-3 py-1

Layout invariants (MUST be consistent across all 6 stages):
- H3-badge gap: 16px (gap-4)
- H3/badge to body gap: 16px (mb-4)
- Internal padding: identical across stages
- Only content length varies

---

## PHASE 3 — SECTION COMPONENTS (20 min)

### 3A. HeroSection

Section ID: #hero
Background: BackgroundImageSection mode="hero"
Image: /images/services/hero-services.jpg (use placeholder if missing)

Content hierarchy (top to bottom):
1. Badge: "YATIRIMDAN ÖNCE NETLİK." — bg #FFCB00, text #0F2E2C, uppercase, 12px, font-bold, rounded-[6px], px-4 py-1.5
2. H1: "Yatırıma Uygun Projeler ve Teknik Doğrulama." — white, clamp(28px, 5vw, 48px), font-bold, leading-tight, max-w-[720px]
3. Description: "AFA, Romanya'da ön teknik durum tespiti yapılmış..." — white/88 opacity, clamp(15px, 2vw, 18px), leading-[1.7], max-w-[640px]
4. Primary CTA: "Yatırıma Uygun Projeleri Keşfet" — bg #FFCB00, text #0F2E2C, font-bold, rounded-[6px], px-8 py-4
5. Pillar bar (3 columns) — marginTop 48px

Pillar bar structure:
- Semi-transparent band behind: rgba(15,46,44,0.65), full width, py-4, min-h-[72px]
- 3 columns with gold dot separators (6px round, #FFCB00)
- Column heading: white, 14px, uppercase, font-semibold, tracking-wide
- Column desc: white/80, 13px

Pillars:
| Heading | Description |
|---------|-------------|
| Şebeke Entegrasyonu | ATR doğrulama |
| Finansal Dayanıklılık | Üretim/gelir |
| Yasal Uyum | İzin zinciri tutarlılık |

### 3B. PositioningSection

Section ID: #positioning
Background: white
Container: max-w-3xl (680px), mx-auto, text-center

ACCESSIBILITY STRUCTURE:
```html
<div role="group" aria-labelledby="positioning-heading">
  <h2 id="positioning-heading" class="sr-only">Yatırımcı ve Geliştirici Perspektifi</h2>
  <p>Projeniz doğru yatırımcıya ulaşabiliyor mu?</p>
  <p>Yatırımınız için doğru proje masanıza geliyor mu?</p>
</div>
```

Question 1 (developer): #0F2E2C (afa-deep), clamp(22px, 3.5vw, 30px), font-bold
Question 2 (investor): #18625F (afa-primary-dark), same size, font-bold
Gap between questions: 8-12px

Then 4 paragraphs: gray-600, 17px, leading-[1.8], gap between paragraphs 16px
Then closing italic: afa-primary-dark, italic

### 3C. ProjectSourcingSection (Bölüm 1)

Section ID: #project-sourcing
Background: #F5F5F5 (afa-light)
Container: max-w-7xl (1100px)

Structure:
1. H2: "Yatırıma Uygun Proje Bulma" — afa-deep, font-bold
2. Intro paragraph
3. Checklist (4 items with check icons, afa-primary stroke)
4. Purpose sentence
5. TWO-CARD GRID (grid-cols-1 md:grid-cols-2 gap-6)
6. Routing paragraph
7. Transition paragraph (gold left border)

Left card (Investor):
- bg white, rounded-lg, shadow-sm, border-top 3px #18625F (afa-primary-dark)
- H3: "Yatırımcılar İçin Sunduğumuz" — font-bold, afa-deep
- Primary CTA: "Yatırımcı Kriterleri Sayfasına Git"
- padding: 28px

Right card (Developer):
- bg white, rounded-lg, shadow-sm, border-top 3px #28AFB0 (afa-primary)
- H3: "Geliştirici İçin Sunduğumuz" — font-bold, afa-deep
- Secondary CTA: "Proje Geliştiricisi Sayfasına Git" — border 2px #18625F, text #18625F
- padding: 28px

Transition paragraph:
- border-left: 2px #FFCB00
- padding-left: 24px
- italic, #0F2E2C, 16px, leading-[1.75], max-w-[780px]

### 3D. PhotoBreak (×2 instances)

Use BackgroundImageSection mode="break"

Instance 1 (between Section 1 and Timeline):
- ID: #photo-break-transition
- Image: /images/services/photo-break-transition.jpg
- Main text: "Teknik doğrulama, yatırım kararının temelidir." — white, bold, clamp(20px, 3vw, 26px)
- Sub text: "Her aşamada bağımsız teknik ortaklık." — white/75, 15px, italic

Instance 2 (between Timeline and Why AFA):
- ID: #photo-break-breathe
- Image: /images/services/photo-break-breathe.jpg
- Main text: "Sahada doğrulanan her bulgu, yatırım kararını güçlendirir." — white, bold, clamp(20px, 3vw, 26px)
- NO sub text (single line, breathing section)

If images don't exist, use solid #0F2E2C background fallback.
Add TODO comment: "Replace solid fallback with [filename] when image is available"

### 3E. TimelineSection (Bölüm 2)

Section ID: #technical-validation
Background: white
Container: max-w-4xl (960px)

Header:
1. Section label badge: "TEKNİK DOĞRULAMA HİZMETLERİ" — bg #F5F5F5, text #18625F, uppercase, 12px, font-bold, inline-block, rounded, px-3 py-1
2. H2: "Yatırım Sürecinin Her Aşamasında Teknik Doğrulama" — afa-deep, center
3. Intro paragraph: gray-600, center, max-w-[640px]

Then render 6 TimelineStage components from data.ts, passing isLast={index === 5}

### 3F. WhyAfaSection

Section ID: #why-afa
Background: #F5F5F5 (afa-light)
Container: max-w-7xl (1100px)

H2: "Neden AFA?" — center

4-card grid: grid-template-columns repeat(auto-fit, minmax(240px, 1fr)), gap 20px

Each card:
- bg white, rounded-lg, shadow-sm
- border-top: 3px #28AFB0 (afa-primary)
- Icon: 32×32, stroke-only, #28AFB0
- H3: 17px, font-bold, #0F2E2C
- Body: 14px, gray-600, leading-[1.7]
- padding: 28px 24px
- Hover: border-top-color transitions to #18625F (120ms linear). Shadow stays shadow-sm.

Cards:
1. Bağımsızlık (icon: Shield)
2. Şebeke Gerçekliği (icon: Zap or Network)
3. Karar Disiplini (icon: ClipboardCheck)
4. Doğru Eşleştirme (icon: GitMerge or Link2)

Methodology link below grid: "#methodology" or services methodology page, afa-primary, 14px, font-semibold

### 3G. CtaSection (Kapanış)

Section ID: #get-started
Background: #0F2E2C (afa-deep)
Container: max-w-2xl (660px), text-center

H2: "Şimdi Başlayalım" — white, font-bold
Paragraph: white/80

Two buttons (flex, gap-4, justify-center, flex-wrap):
- Primary: "Yatırımcı Kriterleri Sayfasına Git" — bg #FFCB00, text #0F2E2C
  Micro-copy below: "AFA'nın seçili proje havuzuna erişin" — 12px, white/60
- Secondary: "Proje Geliştiricisi Sayfasına Git" — border white/40, text white
  Micro-copy below: "Projenizi yatırımcılarla buluşturun" — 12px, white/60

Tertiary link: "Ön TDD Başvurusu Yap →" — #FFCB00, 14px, font-semibold

### 3H. DisclaimerSection

Section ID: #disclaimer
Background: #F5F5F5 (afa-light)
Container: max-w-2xl (660px), text-center

border-top: 1px #E5E7EB
text: 12px, gray-600, leading-[1.6]
padding: 20px 16px
Content: "Proje-spesifik yasal ve teknik doğrulama tavsiye edilir..."

---

## PHASE 4 — PAGE ASSEMBLY (5 min)

Assemble all sections in `src/app/[locale]/services/page.tsx`:

```
ServicesPage
├── HeroSection
├── PositioningSection
├── ProjectSourcingSection
├── PhotoBreak (instance 1 — transition)
├── TimelineSection
├── PhotoBreak (instance 2 — breathe)
├── WhyAfaSection
├── CtaSection
└── DisclaimerSection
```

Section padding standard:
- Base: py-16 px-4
- md: md:py-20 md:px-6
- lg: lg:py-24 lg:px-8
- Hero exception: pt-24 pb-16 (top 96px, bottom 64px)

Background rhythm: photo → white → light → photo → white → photo → light → deep → light

Ensure page has EXACTLY ONE h1 (in hero). All other headings are h2/h3.

---

## PHASE 5 — VERIFICATION (5 min)

Run: `npm run build`
Expected: 0 errors

Visual checklist:
1. Only 8 colors used (afa-deep, afa-primary-dark, afa-primary, afa-gold, afa-light, white, gray-600, gray-200)
2. Gold Zone: gold bg ONLY has afa-deep text everywhere
3. NO transition-all anywhere
4. NO gradient on photo breaks (solid overlay only)
5. Hero has gradient overlay (functional, left-to-right)
6. Timeline images hidden on mobile (<768px)
7. WarningBox: afa-light bg + gold border-left ONLY (no gold bg variants)
8. All images have descriptive alt text ("what + context", not marketing)
9. Single h1, all others h2/h3
10. CTA hover: single property only (filter/border-color/text-decoration), 120ms linear
11. Placeholder images use afa-light bg + gray-200 border (NOT gray-100)
12. NO animations, transforms, parallax, backdrop-filter blur

Show summary of all components created. Do NOT commit — wait for approval.

---

## SEALED RULES — ABSOLUTE (from spec Section 0)

1. PALETTE LOCK: Only 8 defined colors. No off-palette colors. rgba() only for defined token opacity variants.
2. GOLD ZONE: On afa-gold (#FFCB00) background, ONLY afa-deep (#0F2E2C) text. No exceptions.
3. OVERLAY TYPES: Left-aligned hero → gradient overlay. Center-aligned photo break → solid overlay.
4. CTA HOVER: Single property transition only. transition-all FORBIDDEN. Timing: 120ms linear. No easing functions.
5. MOTION: Max 120ms linear. No transform, easing, parallax, or backdrop-filter blur.
6. TIMELINE IMAGES: Desktop only (≥768px). Hidden on mobile.
7. WARNING BOX: bg afa-light ONLY. Gold bg variants (including rgba) FORBIDDEN.
8. IMAGE SOURCE: No AI-generated images. Real photos or licensed stock only.
9. PHASE 1 PLACEHOLDERS: Use afa-light (#F5F5F5), NOT gray-100.
10. ALT TEXT: Required on all images. Format: "what + context" (not marketing copy).
