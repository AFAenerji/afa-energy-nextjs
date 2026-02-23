/**
 * Centralized email validation regex.
 * Used across API routes and client-side form validation
 * to ensure consistent behavior.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
