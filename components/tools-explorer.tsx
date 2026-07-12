"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { tools } from "@/lib/tools";

export default function ToolsExplorer() {
  const displayTools = tools.filter((t) => t.isReady);

  return (
    <section id="tools" className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {displayTools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className="editorial-card group relative p-5 flex flex-col items-center text-center min-h-[140px] justify-center"
            >
              <Star
                size={14}
                className="absolute top-2.5 right-2.5 text-muted-foreground/50 group-hover:text-[#ff8a3d] transition-colors"
              />
              <div className="card-icon mb-3 text-foreground/90 group-hover:text-white transition-colors">
                <IconComponent size={42} strokeWidth={1.3} />
              </div>
              <span className="card-title text-sm font-medium text-foreground/90 group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <Link href="/pdf-tools" className="editorial-btn-primary">
          <span className="grid grid-cols-3 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-1 h-1 bg-white rounded-sm" />
            ))}
          </span>
          All tools
        </Link>
      </div>
    </section>
  );
}
