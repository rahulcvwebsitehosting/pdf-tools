export function saveToolInputCache(slug: string, values: Record<string, any>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`taz_cache_${slug}`, JSON.stringify(values));
  } catch (e) {
    console.error("Failed to cache tool inputs", e);
  }
}

export function loadToolInputCache(slug: string): Record<string, any> | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(`taz_cache_${slug}`);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error("Failed to load tool input cache", e);
    return null;
  }
}

export function savePreferences(key: string, value: any): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`taz_pref_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save preference", e);
  }
}

export function loadPreferences(key: string, defaultValue: any = null): any {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(`taz_pref_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error("Failed to load preference", e);
    return defaultValue;
  }
}
