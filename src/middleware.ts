import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './lib/i18n';
import type { Locale } from './lib/i18n';
import { getInternalSlug } from './lib/slugs';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already starts with a supported locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Redirect to default locale if no locale prefix found
  if (!hasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  // Slug rewrite: resolve localized slug to canonical internal path
  const segments = pathname.split('/');
  // segments: ['', locale, slug, ...rest]
  const locale = segments[1] as Locale;
  const slug = segments[2];

  if (slug) {
    const canonical = getInternalSlug(slug, locale);

    if (canonical && canonical !== slug) {
      const rewrittenSegments = ['', locale, canonical, ...segments.slice(3)];
      const url = request.nextUrl.clone();
      url.pathname = rewrittenSegments.join('/');
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip api, _next, static assets, and favicon.ico
    '/((?!api|_next|_vercel|favicon\\.ico|.*\\..*).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
