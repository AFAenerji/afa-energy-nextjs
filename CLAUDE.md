# CLAUDE.md — AFA Energy Romania

## Project Overview

AFA Energy Romania corporate website — independent technical advisory and investment decision support for the Romanian renewable energy market.

- **Domain:** https://afaenergy.eu
- **Framework:** Next.js 16 (App Router) + TypeScript 5 (strict) + React 19
- **Styling:** Tailwind CSS v4 + CSS custom properties + CSS Modules
- **Deployment:** Vercel (standalone output), Docker-ready
- **No database** — all content is file-based (JSON dictionaries + inline TS constants)

## Commands

```bash
npm run dev              # Local development server
npm run build            # Production build
npm run lint             # ESLint check
npm run governance:check # Validate locale dictionaries & registry integrity
```

## Architecture

### Routing

App Router with `[locale]` dynamic segment. Three locales: `tr` (default), `en`, `ro`.

**All URL segments use Turkish naming across all locales** (e.g., `/en/hizmetler` not `/en/services`). Route definitions live in `src/lib/routes.ts` (`LOCALE_PATHS`).

Every page under `[locale]` must export `generateStaticParams()` returning all 3 locales.

### Key Directories

```
src/app/[locale]/          → Pages (locale-routed)
src/app/api/               → Route handlers (contact, assessment forms)
src/components/sections/   → Homepage section components + registry.ts
src/components/site/       → Header, Footer, LanguageSwitcher, MobileMenu
src/components/seo/        → JSON-LD schema components
src/content/{locale}/      → JSON dictionaries (homepage.json, assessment.json)
src/lib/                   → Core utilities (i18n, routes, security, SEO)
src/lib/security/          → escapeHtml, validateEmail, rateLimit, safeJsonLd
src/config/seo.config.ts   → Site config + SEO translations
docs/                      → Design governance, section mappings
scripts/                   → Governance health check tooling
```

### Homepage Section Registry

Homepage sections are driven by a registry pattern:
1. `SECTION_REGISTRY` in `src/components/sections/registry.ts` maps component names → React components
2. JSON dictionaries (`src/content/{locale}/homepage.json`) define `sections[]` array with `id`, `order`, `component`, `dataKey`, `enabled`
3. `HomepageRenderer` reads sections, filters/sorts, looks up in registry, passes `{ data, locale }` props

**Adding a new homepage section requires updating ALL THREE locale JSON files AND the registry simultaneously.**

### i18n System

Two-layer approach:
- **`src/lib/i18n.ts`** — inline translations for nav/UI labels (accessed via `getTranslation(locale, key)`)
- **`src/content/{locale}/*.json`** — page content dictionaries (loaded via `getHomepageDictionary()` / `getAssessmentDictionary()`)
- Turkish (`tr`) is the authoritative reference locale; `en`/`ro` must match its structure

### Content Patterns

- **Homepage & Assessment:** JSON dictionaries in `src/content/{locale}/`
- **Other pages:** Inline `pageContent` objects keyed by locale in the page file, or dedicated content files (e.g., `src/content/services.ts`)
- Never mix content sources for the same page

## Code Conventions

### Language Policy

- **Code, comments, commits, internal docs:** English only
- **Turkish user-facing copy:** Strict Turkish discipline — no English keywords unless technical/industry standard
- **Slogans and mottos must end with a period** (e.g., "Yatırımdan Önce Netlik.")

### Naming

- Section `id`: kebab-case (e.g., `atr-matrix-overview`)
- Section `dataKey`: camelCase (e.g., `atrMatrixOverview`)
- Section `component`: PascalCase matching the exported component name exactly
- CSS custom properties: `--kebab-case` (e.g., `--green-authority`)

### Styling Rules

- Use CSS custom properties (`var(--green-authority)`) — never hardcode hex values
- Use existing utility classes (`afa-container`, `dark-section`, `afa-btn-primary`, `afa-card`) before creating new ones
- Container standard: `mx-auto max-w-7xl px-6 lg:px-8 w-full`
- Brand colors defined in `src/app/globals.css` `:root` and `@theme` blocks

### Brand Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--green-authority` | `#18625F` | Primary brand, CTAs |
| `--green-deep` | `#0F2E2C` | Dark backgrounds |
| `--yellow-accent` | `#FFCB00` | Accent bars, badges |
| `--text-primary` | `#0B1F1E` | Headlines |
| `--text-body` | `#333333` | Body text |

### Security Requirements

- All user input in email templates → `escapeHtml()` from `src/lib/security/escapeHtml.ts`
- All API routes → `checkRateLimit()` + honeypot field (`_hp`) check
- Email validation → `validateEmail()` from `src/lib/security/validateEmail.ts`
- JSON-LD → `safeJsonLd()` for script tag escaping
- Path handling → `safePath()` / `safeSegment()` / `validateLocale()` from `src/utils/safePath.ts`

### Component Patterns

- Pages are Server Components by default (async functions)
- Client components explicitly marked with `'use client'`
- No external state management — React `useState` for UI, `useSyncExternalStore` for theme
- No client-side data fetching libraries — all content is static/file-based

## Environment Variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | — | Canonical URL base |
| `RESEND_API_KEY` | Optional | logs to console | Email delivery |
| `ASSESSMENT_INBOX` | Optional | `hq@afaenergy.ro` | Assessment notification recipient |

## Governance

- **`GOVERNANCE.md`** — Engineering standards (SSOT)
- **`docs/design-governance.md`** — UI/UX design rulebook (colors, typography, cards, spacing)
- **`AFA_ENERGY_TERMINOLOGY_v2.1_FINAL.md`** — TR/EN/RO terminology reference with forbidden/approved terms
- **`npm run governance:check`** — Automated validation of locale dictionaries, registry compliance, and i18n consistency

Always run `npm run governance:check` after modifying homepage dictionaries or the section registry.
