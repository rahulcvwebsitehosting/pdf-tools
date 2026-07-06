export interface ToolUsageMetrics {
  open: number;
  calculate: number;
  copy: number;
  share: number;
  print: number;
  reset: number;
}

export function trackEvent(
  event: "open" | "calculate" | "copy" | "share" | "print" | "reset",
  toolSlug: string
): void {
  if (typeof window === "undefined") return;
  try {
    const statsStr = localStorage.getItem("taz_analytics_stats");
    const stats: Record<string, ToolUsageMetrics> = statsStr ? JSON.parse(statsStr) : {};
    
    if (!stats[toolSlug]) {
      stats[toolSlug] = { open: 0, calculate: 0, copy: 0, share: 0, print: 0, reset: 0 };
    }
    
    stats[toolSlug][event] += 1;
    localStorage.setItem("taz_analytics_stats", JSON.stringify(stats));
  } catch (e) {
    console.error("Local analytics tracking failed", e);
  }
}

export function getMostUsedTools(limit = 5): Array<{ slug: string; score: number }> {
  if (typeof window === "undefined") return [];
  try {
    const statsStr = localStorage.getItem("taz_analytics_stats");
    if (!statsStr) return [];
    const stats: Record<string, ToolUsageMetrics> = JSON.parse(statsStr);
    
    return Object.entries(stats)
      .map(([slug, metrics]) => {
        // Calculate a score: calculate + open
        const score = (metrics.calculate || 0) * 2 + (metrics.open || 0);
        return { slug, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  } catch (e) {
    console.error("Failed to read analytics metrics", e);
    return [];
  }
}
