import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Immediate redirect for unsupported locales (301 permanent)
  if (pathname.startsWith('/en') || pathname.startsWith('/ro')) {
    // Remove the unsupported locale prefix and redirect to Turkish
    const newPathname = pathname.replace(/^\/(en|ro)/, '') || '/';
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${newPathname}`, request.url),
      301
    );
  }
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = !pathname.startsWith(`/${defaultLocale}/`) && pathname !== `/${defaultLocale}`;

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Always redirect to Turkish locale
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
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
