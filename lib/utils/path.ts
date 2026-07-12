/**
 * Base-path helper (adapted from pdfcraft).
 * ToolsAtZero is deployed at the domain root, so this is effectively identity,
 * but we keep the helper for compatibility with asset loading code.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path: string): string {
  if (!basePath) return path;
  if (path.startsWith('http') || path.startsWith('//')) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return `${cleanBasePath}${normalizedPath}`;
}

export function getBasePath(): string {
  return basePath;
}
