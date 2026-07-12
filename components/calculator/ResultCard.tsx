import { ToolOutput } from "@/lib/tools-engine/registry/types";
import { formatPercentValue, formatDecimalValue, formatMonetaryValue } from "@/lib/tools-engine/financial/formatting";
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/tools-engine/sharing";
import { trackEvent } from "@/lib/tools-engine/analytics";
import { useState } from "react";

interface ResultCardProps {
  outputsSchema: ToolOutput[];
  values: Record<string, any>;
  slug: string;
  currencyCode?: string;
}

export default function ResultCard({ outputsSchema, values, slug, currencyCode = "USD" }: ResultCardProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (label: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedKey(label);
      trackEvent("copy", slug);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const getDisplayValue = (val: any, type: string) => {
    if (type === "boolean") {
      return val ? "Yes" : "No";
    }
    if (val === undefined || val === null || (typeof val !== "boolean" && isNaN(Number(val)))) {
      if (typeof val === "string") return val;
      return "0";
    }
    switch (type) {
      case "currency":
        return formatMonetaryValue(Number(val), currencyCode);
      case "percentage":
        return formatPercentValue(Number(val));
      case "number":
        return formatDecimalValue(Number(val));
      default:
        return String(val);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs uppercase font-bold text-muted-foreground">
        Calculated Outputs
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {outputsSchema.map((out) => {
          const rawVal = values[out.name];
          const displayVal = getDisplayValue(rawVal, out.type);

          return (
            <div
              key={out.name}
              className="editorial-panel p-4 flex flex-col justify-between group relative hover:border-border/70 transition-colors"
            >
              <div>
                <span className="block font-mono text-[10px] uppercase font-bold text-muted-foreground">
                  {out.label}
                </span>
                <span className="block font-mono text-xl sm:text-2xl font-black mt-2 select-all word-break break-all">
                  {displayVal}
                </span>
                {out.description && (
                  <span className="block text-[11px] text-muted-foreground mt-1">
                    {out.description}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-2 border-t border-dashed border-border flex justify-end">
                <button
                  onClick={() => handleCopy(out.label, displayVal)}
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  title="Copy to clipboard"
                >
                  <Copy size={12} />
                  <span>{copiedKey === out.label ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
