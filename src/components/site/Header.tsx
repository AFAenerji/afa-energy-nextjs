'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Locale, locales, getTranslation } from '@/lib/i18n';
import type { Translations } from '@/lib/i18n';
import { getLocalizedSlug } from '@/lib/slugs';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import '@/styles/Header.css';

/* ── Helpers ── */

/** Build a localized path: localePath('tr', 'services') → '/tr/hizmetler' */
function localePath(locale: Locale, canonical: string): string {
  const slug = getLocalizedSlug(canonical, locale) ?? canonical;
  return `/${locale}/${slug}`;
}

/** Check if the current pathname matches a nav item's canonical key */
function isActivePath(pathname: string, locale: Locale, canonical: string): boolean {
  const full = localePath(locale, canonical);
  return pathname === full || pathname.startsWith(`${full}/`);
}

/* ── Dynamic nav items per locale ── */
type NavItem = {
  key: keyof Translations;
  slug: string;
  tab?: 'investor' | 'developer';
  disabled?: boolean;
};

const NAV_ITEMS: readonly NavItem[] = [
  { key: 'investor', slug: 'investor', tab: 'investor' },
  { key: 'developer', slug: 'developer', tab: 'developer' },
  { key: 'services', slug: 'services' },
  { key: 'cases', slug: 'cases' },
  { key: 'atrMatrix', slug: 'atr-matrix' },
  { key: 'about', slug: 'about' },
  { key: 'info', slug: 'knowledge-center' },
] as const;

/* ── Component ── */
interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = (key: keyof Translations) => getTranslation(locale, key);

  function navigate(canonical: string) {
    router.push(localePath(locale, canonical));
  }

  function switchLocale(targetLocale: string) {
    // Strip current locale prefix and prepend new one
    const stripped = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
    router.push(`/${targetLocale}${stripped === '/' ? '' : stripped}`);
  }

  function navLinkClass(item: NavItem): string {
    const classes = ['afa-nav__link'];
    if (item.tab) {
      classes.push('afa-nav__link--tab');
      classes.push(`afa-nav__link--tab-${item.tab}`);
    }
    if (item.disabled) {
      classes.push('afa-nav__link--disabled');
    }
    if (!item.disabled && isActivePath(pathname, locale, item.slug)) {
      classes.push('afa-nav__link--active');
    }
    return classes.join(' ');
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-afa-border shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="afa-header__inner">

            {/* ── Left: Brand ── */}
            <a
              href={`/${locale}`}
              className="afa-header__brand"
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                <Image
                  src="/images/afa_1.png"
                  alt="AFA Energy Romania"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight whitespace-nowrap">
                AFA Energy Romania
              </span>
            </a>

            {/* ── Center: Nav ── */}
            <nav className="afa-nav">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => navigate(item.slug)}
                  className={navLinkClass(item)}
                  aria-current={
                    !item.disabled && isActivePath(pathname, locale, item.slug)
                      ? 'page'
                      : undefined
                  }
                >
                  {t(item.key)}
                </button>
              ))}
            </nav>

            {/* ── Right: Actions ── */}
            <div className="afa-header__actions">
              {/* Language Switcher — Segmented Control */}
              <div className="afa-lang-switcher">
                {locales.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => switchLocale(lang)}
                    className={`afa-lang-switcher__btn ${
                      locale === lang ? 'afa-lang-switcher__btn--active' : ''
                    }`}
                    aria-current={locale === lang ? 'true' : undefined}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Contact CTA */}
              <button
                onClick={() => navigate('contact')}
                className="afa-header__cta"
              >
                {t('contact')}
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="afa-header__mobile-toggle"
                aria-expanded={mobileMenuOpen}
                aria-controls={mobileMenuOpen ? "mobile-menu" : undefined}
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              >
                <div className="w-6 h-5 relative flex flex-col justify-center">
                  <span className={`block h-0.5 w-full bg-afa-dark transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-afa-dark transition-opacity duration-300 my-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-afa-dark transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        locale={locale}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
