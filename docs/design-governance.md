# AFA Energy Romania — Design Governance Rulebook v1.0

> **Source of Truth** for all UI audits, component reviews, and visual consistency checks.

---

## 1. Color System

| Token | Hex | Usage |
|---|---|---|
| `--green-authority` | `#18625F` | Primary brand, CTA fills, borders |
| `--green-deep` | `#0F2E2C` | Dark backgrounds (Hero overlay, Metrics, Closing) |
| `--yellow-accent` | `#FFCB00` | Signature bars, badges, hover accents |
| `--yellow-hover` | `#E6B800` | CTA hover state |
| `--white` | `#FFFFFF` | Card backgrounds, body |
| `--muted` | `#F5F5F5` | Section backgrounds (ATR Matrix, RoleClarity) |
| `--border` | `#E0E0E0` | Card borders, dividers |
| `--text-primary` | `#0B1F1E` | Headlines, bold text |
| `--text-body` | `#333333` | Body paragraphs |
| `--text-muted` | `#5A5A5A` | Descriptions, secondary text |

---

## 2. Container Standard

All homepage sections **must** use the following inner container:

```
mx-auto max-w-7xl px-6 lg:px-8 w-full
```

- Sections maintain **full-width backgrounds** (e.g., `bg-[#0F2E2C]`).
- Content stays within the **1280px (7xl)** or **1152px (6xl)** limit.
- Exception: `DecisionInterface`, `RoleClarity`, `ClosingStatement` use `max-w-6xl`.

---

## 3. Signature Elements

### 3.1 Gold Bar (Transition Bridge)
```
h-[3px] w-16 bg-[#FFCB00] rounded-sm
```
- Placed at the top of each section, above the heading.
- Preceded by a full-width separator: `h-px w-full bg-white/10` (dark sections) or `bg-[#E0E0E0]` (light sections).

### 3.2 Principle Bars
```
h-[2px] w-10 bg-[#FFCB00] rounded-sm
```
- Used above individual items (e.g., ClosingStatement principles).
- Interactive: `group-hover:scale-x-125` with `origin-center`.

### 3.3 Eyebrow Text
```
text-xs font-bold tracking-[0.18em] uppercase text-[#28AFB0]
```

---

## 4. Typography Hierarchy

| Element | Classes |
|---|---|
| **Hero H1** | `text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0B1F1E]` |
| **Section H2** | `text-3xl lg:text-5xl font-extrabold tracking-tight text-[#0B1F1E]` |
| **Card H3** | `text-xl font-bold text-[#0B1F1E]` |
| **Highlight H3** | `text-2xl font-extrabold text-white` (dark cards) |
| **Body** | `text-base text-[#667085] leading-relaxed` |
| **Subhead** | `text-lg text-[#374151] leading-relaxed` |
| **Legal** | `text-sm text-white/50 italic` (dark) or `text-sm text-[#666666]` (light) |

---

## 5. Card Patterns

### 5.1 Standard Card (Light)
```
bg-white rounded-2xl border border-gray-100 p-8
transition-all duration-500
hover:shadow-2xl hover:border-[#18625F]/30 hover:-translate-y-2
```

### 5.2 Highlight Card (Dark)
```
bg-[#0F2E2C] rounded-2xl p-8 shadow-2xl
border border-[#FFCB00]/20
md:-mt-6 md:mb-6
```
- Gold accent tab: `h-1.5 w-12 bg-[#FFCB00] rounded-b-md` (top-right).

### 5.3 Decision Card (Investor — Primary)
```
border-2 border-[#18625F] bg-white shadow-md
```
- Badge: `bg-[#18625F]/10 text-[#18625F]` — "Oncelikli"
- Selection ring: `ring-2 ring-[#FFCB00] ring-offset-2`

### 5.4 Decision Card (Developer — Secondary)
```
border border-gray-300 bg-white shadow-sm
```
- Badge: `bg-gray-100 text-gray-500` — "Ikincil"

---

## 6. Interactive States

### 6.1 ATR Matrix (PositioningChain)
- `hoveredIndex` state highlights steps 1→N with `border-2 border-[#FFCB00] shadow-md`.
- Step numbers: active `bg-[#FFCB00] text-[#0B1F1E]`, inactive `bg-[#18625F]/10 text-[#18625F]`.
- Dashed connectors turn gold when highlighted.

### 6.2 IntroductoryStatement (Focus Mode)
- Left sticky nav with expanding gold bars: `w-10` → `w-16` on hover/active.
- Active content: `opacity-100 scale-100 shadow-lg`.
- Inactive content: `opacity-50 scale-[0.98]`.

### 6.3 ClosingStatement (Principles)
- Gold bars: `group-hover:scale-x-125`.
- Number badges: `group-hover:border-[#FFCB00] group-hover:bg-[#FFCB00]/10`.
- Text: `group-hover:text-[#FFCB00]`.

---

## 7. Accessibility Requirements

- All decorative SVGs: `aria-hidden="true"`.
- All interactive buttons: descriptive `aria-label`.
- Focus states: `focus-visible:ring-2 focus-visible:ring-[#18625F]`.
- Smooth scroll: `scroll-behavior: smooth` on `<html>`.
- `suppressHydrationWarning` on `<html>` and `<body>` for dark mode.

---

## 8. SEO & Performance

- **Sitemap**: Dynamic at `/sitemap.xml` with hreflang alternates for `tr`, `en`, `ro`.
- **Robots**: Allow all, disallow `/api/`, `/admin/`, `/_next/`.
- **Images**: `priority` + `sizes="100vw"` on hero images.
- **OpenGraph**: Locale mapping `{ tr: 'tr_TR', en: 'en_US', ro: 'ro_RO' }`.

---

## 9. Dark Mode

- Provider: `ThemeProvider` wrapping root layout.
- Toggle: `ThemeToggle` in header (cycles light → dark → system).
- Classes: `dark:` prefix variants on components as needed.

---

## 10. File Structure Convention

```
src/
  app/
    [locale]/          # Locale-based routing
    api/contact/       # API endpoints
    sitemap.ts         # Dynamic sitemap
    robots.ts          # Crawler rules
  components/
    sections/          # Homepage sections
    forms/             # Form components
    providers/         # Context providers (ThemeProvider)
    ui/                # UI primitives (ThemeToggle)
    site/              # Layout components (Header, Footer, MobileMenu)
    legal/             # Legal disclaimers
  config/
    seo.config.ts      # SEO metadata & translations
  content/
    tr/                # Turkish content JSON
    en/                # English content JSON
    ro/                # Romanian content JSON
  lib/
    i18n.ts            # Internationalization utilities
  types/
    homepage.ts        # TypeScript interfaces
```

---

*Last updated: February 2026*
*Maintained by: AFA Energy Romania Engineering*
