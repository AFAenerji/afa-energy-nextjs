import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Get the preferred locale from the Accept-Language header or use default
    const acceptLanguage = request.headers.get('accept-language');
    let locale = defaultLocale;
    
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage
        .split(',')[0]
        .split('-')[0]
        .toLowerCase();
      
      // Map common language codes to our supported locales
      const localeMap: Record<string, string> = {
        'en': 'en',
        'tr': 'tr',
        'ro': 'ro',
        'en-us': 'en',
        'tr-tr': 'tr',
        'ro-ro': 'ro',
      };
      
      locale = (localeMap[preferredLocale] || defaultLocale) as typeof defaultLocale;
    }
    
    // Redirect to the locale-prefixed URL
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|_vercel|.*\\..*).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
