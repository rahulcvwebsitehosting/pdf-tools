import { tools } from "@/lib/tools";
import Link from "next/link";

interface RelatedToolsProps {
  currentSlug: string;
  category: string;
}

export function RelatedTools({ currentSlug, category }: RelatedToolsProps) {
  // Get other tools in same category, shuffle or slice to get 3
  const related = tools
    .filter((t) => t.category === category && t.slug !== currentSlug)
    .slice(0, 3);

  // If there are less than 3 in the category, pull some from developer/office
  if (related.length < 3) {
    const extra = tools
      .filter((t) => t.slug !== currentSlug && t.slug !== "time-calculator" && !related.some(r => r.slug === t.slug))
      .slice(0, 3 - related.length);
    related.push(...extra);
  }

  return (
    <div className="space-y-4 pt-12 border-t border-black mt-16">
      <h3 className="font-editorial text-xl sm:text-2xl font-bold uppercase tracking-tight">
        Related Privacy-First Tools
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Permanent Required Link */}
        <Link
          href="/tools/time-calculator"
          className="editorial-card flex flex-col justify-between p-4 border border-black hover:bg-accent hover:text-black transition-all duration-200"
        >
          <div className="space-y-2">
            <span className="font-bold text-sm block group-hover:underline">
              Free Add/Subtract Time Calculator
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Perform duration arithmetic on dates locally
            </p>
          </div>
        </Link>

        {/* Dynamic Related Links */}
        {related.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="editorial-card flex flex-col justify-between p-4 border border-black hover:bg-accent hover:text-black transition-all duration-200"
          >
            <div className="space-y-2">
              <span className="font-bold text-sm block group-hover:underline">
                Free {t.name}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
