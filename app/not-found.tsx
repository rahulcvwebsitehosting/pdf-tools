import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center space-y-8 animate-fade-in-scale">
      {/* Animated Brand Emblem */}
      <div className="w-20 h-20 bg-accent border-2 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
        <Logo className="w-12 h-12 text-black transition-transform duration-1000 hover:rotate-180" />
      </div>

      {/* Error Message */}
      <div className="space-y-4 max-w-xl">
        <h1 className="font-editorial text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none text-foreground">
          404 — Page Misplaced.
        </h1>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-md mx-auto">
          The utility path you are searching for does not exist or has been restructured inside our workbench index.
        </p>
      </div>

      {/* Neo-brutalist Box with Interactive CTA Button */}
      <div className="p-6 bg-accent border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
        <Link
          href="/"
          className="btn-primary w-full text-center flex items-center justify-center gap-2 py-3"
        >
          Return to Core Workbench Home <MoveRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
