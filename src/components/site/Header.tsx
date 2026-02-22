'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Locale, locales, getTranslation } from '@/lib/i18n';
import type { Translations } from '@/lib/i18n';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import '@/styles/Header.css';

/* ── Helpers ── */

/** Prepend locale to a path: withLocale('tr', '/hizmetler') → '/tr/hizmetler' */
function withLocale(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}

/** Check if the current pathname matches a nav item's path */
function isActivePath(pathname: string, locale: Locale, path: string): boolean {
  const full = withLocale(locale, path);
  // Exact match or starts-with for nested routes
  return pathname === full || pathname.startsWith(`${full}/`);
}

/* ── Dynamic nav items per locale ── */
type NavItem = {
  key: keyof Translations;
  path: string;
  tab?: 'investor' | 'developer';
  disabled?: boolean;
};

const NAV_ITEMS: readonly NavItem[] = [
  { key: 'investor', path: '/investor', tab: 'investor' },
  { key: 'developer', path: '/developer', tab: 'developer' },
  { key: 'services', path: '/hizmetler' },
  { key: 'cases', path: '/cases', disabled: true },
  { key: 'about', path: '/hakkimizda' },
  { key: 'info', path: '/info', disabled: true },
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

  function navigate(path: string) {
    router.push(withLocale(locale, path));
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
    if (!item.disabled && isActivePath(pathname, locale, item.path)) {
      classes.push('afa-nav__link--active');
    }
    return classes.join(' ');
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[#E0E0E0] shadow-[0_10px_30px_rgba(0,0,0,0.12)] relative">
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#28AFB0]"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="afa-header__inner">

            {/* ── Left: Brand ── */}
            <a
              href={withLocale(locale, '')}
              className="afa-header__brand"
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
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
                  onClick={() => navigate(item.path)}
                  className={navLinkClass(item)}
                  aria-current={
                    !item.disabled && isActivePath(pathname, locale, item.path)
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
                onClick={() => navigate('/contact')}
                className="afa-header__cta"
              >
                {t('contact')}
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="afa-header__mobile-toggle"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-center">
                  <span className={`block h-0.5 w-full bg-[#0B1F1E] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-[#0B1F1E] transition-all duration-300 my-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-[#0B1F1E] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
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
