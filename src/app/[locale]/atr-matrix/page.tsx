import type { Metadata } from "next";
import { Locale, locales, defaultLocale } from "@/lib/i18n";
import { LOCALE_PATHS } from "@/lib/routes";
import { SITE_URL } from "@/lib/env";
import { ATRMatrixPage } from "@/components/sections/ATRMatrixPage";
import LegalScopeDisclaimer from "@/components/legal/LegalScopeDisclaimer";

/* ── Canonical helpers ── */
const canonicalFromFullPath = (path: string): string => `${SITE_URL}${path}`;
const alternatesFromLocalePaths = (paths: Record<Locale, string>) => {
  const languages: Record<string, string> = {};
  Object.entries(paths).forEach(([locale, path]) => {
    languages[locale] = `${SITE_URL}${path}`;
  });
  return languages;
};

/* ── Per-locale metadata ── */
const metaContent = {
  tr: {
    title: "AFA ATR Matrix™ | AFA Energy Romania",
    description:
      "AFA ATR Matrix™ — Yenilenebilir enerji projelerini bağlantı gerçekliği, şebeke dinamikleri, izin zinciri ve finansal dayanıklılık açısından değerlendiren bağımsız teknik karar standardı.",
    ogDescription:
      "Yatırımcıya sunulmadan önce projeleri teknik doğrulama disiplininden geçiren sistem.",
  },
  en: {
    title: "AFA ATR Matrix™ | AFA Energy Romania",
    description:
      "AFA ATR Matrix™ — Independent technical decision standard evaluating renewable energy projects through connection reality, grid dynamics, permit chain, and financial resilience.",
    ogDescription:
      "The system that puts every project through technical validation before investor presentation.",
  },
  ro: {
    title: "AFA ATR Matrix™ | AFA Energy Romania",
    description:
      "AFA ATR Matrix™ — Standard tehnic independent de decizie care evaluează proiectele de energie regenerabilă prin realitatea conexiunii, dinamica rețelei, lanțul de autorizații și reziliența financiară.",
    ogDescription:
      "Sistemul care supune fiecare proiect unei discipline de validare tehnică înainte de prezentarea către investitori.",
  },
} as const;

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const meta = metaContent[validLocale];
  const matrixPaths = LOCALE_PATHS.atrMatrix;
  const canonicalUrl = canonicalFromFullPath(matrixPaths[validLocale]);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesFromLocalePaths(matrixPaths),
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: canonicalUrl,
      siteName: "AFA Energy Romania",
      type: "website",
      images: [{ url: "/images/og/og-atr-matrix.jpg", width: 1200, height: 630 }],
    },
  };
}

/* ── Static Params ── */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ── Page ── */
export default async function ATRMatrixRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  return (
    <>
      <ATRMatrixPage
        locale={locale}
        developerHref={LOCALE_PATHS.developer[locale]}
        investorHref={LOCALE_PATHS.investor[locale]}
      />
      <LegalScopeDisclaimer locale={locale} />
    </>
  );
}
