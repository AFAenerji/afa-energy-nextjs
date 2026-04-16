'use client';
// Client Component: dropdown open/close state (useState)
// + click-outside and ESC key handlers (useEffect + DOM events)

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Locale, locales, getTranslation } from '@/lib/i18n';
import type { Translations } from '@/lib/i18n';
import { getLocalizedSlug } from '@/lib/slugs';
import MobileMenu from './MobileMenu';
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

/* ── Nav item types ── */
type NavItem = {
  key: keyof Translations;
  slug: string;
  tab?: 'investor' | 'developer';
  disabled?: boolean;
  children?: { key: keyof Translations; slug: string }[];
};

/* ── Nav items: 6 top-level, Hizmetler has dropdown ── */
const NAV_ITEMS: readonly NavItem[] = [
  { key: 'investor', slug: 'investor', tab: 'investor' },
  { key: 'developer', slug: 'developer', tab: 'developer' },
  {
    key: 'services',
    slug: 'services',
    children: [
      { key: 'services', slug: 'services' },
      { key: 'cases', slug: 'cases' },
    ],
  },
  { key: 'atrMatrix', slug: 'atr-matrix' },
  { key: 'about', slug: 'about' },
  { key: 'knowledgeCenter', slug: 'knowledge-center' },
] as const;

/* ── Chevron SVGs (no CSS transform — Hard Stop Section 8.6) ── */
function ChevronDown() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );
}

/* ── Component ── */
interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const t = (key: keyof Translations) => getTranslation(locale, key);

  function navigate(canonical: string) {
    router.push(localePath(locale, canonical));
  }

  function switchLocale(targetLocale: string) {
    const stripped = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
    router.push(`/${targetLocale}${stripped === '/' ? '' : stripped}`);
  }

  // Close dropdown on ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setDropdownOpen(false);
      triggerRef.current?.focus();
    }
  }, []);

  // Close dropdown on click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, handleKeyDown, handleClickOutside]);

  function navLinkClass(item: NavItem, isDropdownTrigger = false): string {
    const classes = ['afa-nav__link'];
    if (item.tab) {
      classes.push('afa-nav__link--tab');
      classes.push(`afa-nav__link--tab-${item.tab}`);
    }
    if (item.disabled) {
      classes.push('afa-nav__link--disabled');
    }
    if (!item.disabled && !isDropdownTrigger && isActivePath(pathname, locale, item.slug)) {
      classes.push('afa-nav__link--active');
    }
    // Dropdown trigger active when open or when a child route matches
    if (isDropdownTrigger) {
      const childActive = item.children?.some((c) => isActivePath(pathname, locale, c.slug));
      if (dropdownOpen || childActive) {
        classes.push('afa-nav__link--active');
      }
    }
    return classes.join(' ');
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-afa-accent shadow-sm">
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
            </a>

            {/* ── Center: Nav ── */}
            <nav className="afa-nav">
              {NAV_ITEMS.map((item) => {
                // Dropdown item (Hizmetler)
                if (item.children) {
                  return (
                    <div key={item.key} ref={dropdownRef} className="relative">
                      <button
                        ref={triggerRef}
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className={navLinkClass(item, true)}
                        aria-expanded={dropdownOpen}
                        aria-controls="hizmetler-dropdown"
                        aria-haspopup="true"
                      >
                        {t(item.key)}
                        {dropdownOpen ? <ChevronUp /> : <ChevronDown />}
                      </button>

                      {dropdownOpen && (
                        <div
                          id="hizmetler-dropdown"
                          className="absolute top-full left-0 bg-white border border-afa-accent rounded-lg shadow-sm py-2 px-1 z-50 w-40"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              href={localePath(locale, child.slug)}
                              onClick={() => setDropdownOpen(false)}
                              className="block px-4 py-2 text-sm font-medium hover:bg-afa-light hover:text-afa-primary transition-colors duration-150 rounded-md"
                            >
                              {t(child.key)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Standard nav link
                return (
                  <button
                    key={item.key}
                    onClick={() => navigate(item.slug)}
                    className={navLinkClass(item)}
                    style={item.key === 'atrMatrix' ? { transition: 'color 120ms linear' } : undefined}
                    aria-current={
                      !item.disabled && isActivePath(pathname, locale, item.slug)
                        ? 'page'
                        : undefined
                    }
                    {...(item.key === 'atrMatrix' ? {
                      onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.color = '#28AFB0';
                        e.currentTarget.style.textDecoration = 'underline';
                        e.currentTarget.style.textDecorationColor = '#FFCB00';
                        e.currentTarget.style.textUnderlineOffset = '4px';
                      },
                      onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.textDecoration = '';
                        e.currentTarget.style.textDecorationColor = '';
                      },
                    } : {})}
                  >
                    {t(item.key)}
                  </button>
                );
              })}
            </nav>

            {/* ── Right: Actions ── */}
            <div className="afa-header__actions">
              {/* Contact CTA */}
              <button
                onClick={() => navigate('contact')}
                className="afa-header__cta"
              >
                {t('contact')}
              </button>

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
