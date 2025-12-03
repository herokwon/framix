/**
 * Determine whether a URL should be treated as "local" (same-origin).
 *
 * Rules:
 * - Relative URLs (including hash-only and query-only) are treated as local (true).
 * - Absolute URLs (scheme://...) are local only if they match the current origin (or the provided baseOrigin).
 *
 * Notes:
 * - This helper is framework-agnostic and SSR/CSR safe:
 *   it does not read window/process at module scope.
 * - For SSR, pass options.baseOrigin (e.g., 'https://example.com') to enable same-origin checks.
 * - Safe non-http(s) schemes (mailto:, tel:, data:, blob:) are treated as "local"
 *   so the browser handles them. Dangerous schemes (javascript:, vbscript:) are rejected.
 */

// Treat protocol-relative URLs (//host) as absolute as well.
const ABSOLUTE_URL_REGEX = /^(\/\/|[a-zA-Z][a-zA-Z\d+\-.]*?:\/\/)/;
const DANGEROUS_SCHEME_REGEX = /^\s*(javascript:|vbscript:)/i;

export interface IsLocalOptions {
  baseOrigin?: string;
}

export default function isLocalURL({
  url,
  options,
}: {
  url: string;
  options?: IsLocalOptions;
}): boolean {
  // Block dangerous schemes outright.
  if (DANGEROUS_SCHEME_REGEX.test(url)) return false;

  // Relative/hash/query-only URLs are considered local to avoid breaking default anchor behavior.
  if (!ABSOLUTE_URL_REGEX.test(url)) return true;

  // Resolve the reference origin:
  // - Prefer explicitly provided baseOrigin (SSR-friendly)
  // - Fallback to window.location (CSR-only)
  const origin =
    options?.baseOrigin ??
    (typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}`
      : undefined);

  // In SSR without baseOrigin, we cannot compare origins reliably.
  if (!origin) return false;

  try {
    // URL(...) with a base handles absolute and protocol-relative URLs safely.
    const dest = new URL(url, origin);
    return dest.origin === origin;
  } catch {
    // If parsing fails, be conservative and treat it as external.
    return false;
  }
}
