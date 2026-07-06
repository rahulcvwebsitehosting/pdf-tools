interface ComingSoonProps {
  toolName: string;
  description: string;
}

export function ComingSoon({ toolName, description }: ComingSoonProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <div className="editorial-panel p-8 sm:p-12 text-center space-y-6">
        {/* Tool name */}
        <h1 className="text-3xl sm:text-4xl font-editorial text-foreground">
          {toolName}
        </h1>

        {/* Coming Soon badge */}
        <div className="inline-block">
          <span className="neon-badge px-4 py-1.5 text-xs uppercase tracking-widest">
            Coming Soon
          </span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
          {description}
        </p>

        {/* Development message */}
        <p className="text-sm text-muted-foreground font-mono">
          This tool is currently under development. Check back soon!
        </p>

        {/* Trust reminder */}
        <div className="editorial-border-t pt-6 mt-6">
          <p className="neon-badge inline-block px-4 py-2 text-xs">
            🔒 100% LOCAL PROCESSING: Data never leaves your machine.
          </p>
        </div>
      </div>
    </div>
  );
}
