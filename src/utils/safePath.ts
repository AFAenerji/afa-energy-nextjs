import path from "path";

/**
 * Sanitizes a file path to prevent directory traversal attacks.
 * Resolves the path and validates it stays within the specified base directory.
 */
export function safePath(baseDir: string, userInput: string): string {
  // Remove null bytes
  const cleaned = userInput.replace(/\0/g, "");

  // Reject bare traversal segments before resolution
  const segments = cleaned.split(/[/\\]/);
  for (const seg of segments) {
    const trimmed = seg.trim();
    if (trimmed === ".." || trimmed === ".") {
      throw new Error(
        `[SECURITY] Path traversal segment detected: "${trimmed}" in "${userInput}".`
      );
    }
  }

  // safe: resolve is the sanitization boundary — containment check follows immediately
  const resolved = path.resolve(baseDir, cleaned);

  // Ensure the resolved path is still within the base directory
  const normalizedBase = path.resolve(baseDir) + path.sep;

  if (!resolved.startsWith(normalizedBase) && resolved !== path.resolve(baseDir)) {
    throw new Error(
      `[SECURITY] Path traversal attempt detected: "${userInput}" resolves outside base directory.`
    );
  }

  return resolved;
}

/**
 * Sanitizes a path segment (filename or single directory name).
 * Strips any directory separators and traversal patterns.
 */
export function safeSegment(segment: string): string {
  return segment
    .replace(/\0/g, "")     // null bytes
    .replace(/\.\./g, "")   // traversal
    .replace(/[/\\]/g, "")  // directory separators
    .trim();
}

/**
 * Validates that a locale string matches an allowlist.
 * Prevents directory traversal via locale parameters like "../../etc".
 */
export function validateLocale<T extends string>(
  locale: string,
  allowlist: readonly T[]
): asserts locale is T {
  if (!(allowlist as readonly string[]).includes(locale)) {
    throw new Error(
      `[SECURITY] Invalid locale "${locale}". Allowed: ${allowlist.join(", ")}`
    );
  }
}
