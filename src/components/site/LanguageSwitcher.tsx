'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Locale, locales } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export default function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    
    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    
    // Add new locale to pathname
    const newPathname = `/${newLocale}${pathnameWithoutLocale}`;
    
    router.push(newPathname);
  };

  return (
    <div className={`lang-switcher flex gap-1 ${className}`}>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`lang-item ${
            locale === currentLocale ? 'active' : ''
          }`}
          aria-current={locale === currentLocale ? 'page' : undefined}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
