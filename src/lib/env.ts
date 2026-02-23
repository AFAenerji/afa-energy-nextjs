/**
 * Centralized environment variable access.
 *
 * SITE_URL is mandatory in production builds. If missing,
 * the build will fail with a descriptive error message.
 * In development, a fallback is provided for convenience.
 */

function resolveSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;

  if (url) return url.replace(/\/+$/, '');

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      '[AFA ENV] NEXT_PUBLIC_SITE_URL is not set. ' +
      'This variable is mandatory in production to ensure canonical URL consistency. ' +
      'Set it in your .env.production or hosting environment variables.',
    );
  }

  // Development-only fallback
  return 'https://afaenergy.eu';
}

export const SITE_URL = resolveSiteUrl();
