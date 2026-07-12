import { formatMonetaryValue } from "@/lib/tools-engine/financial/formatting";
import CurrencyBadge from "./CurrencyBadge";

interface FinancialSummaryCardProps {
  title: string;
  amount: number;
  currencyCode: string;
  subtitle?: string;
}

export default function FinancialSummaryCard({
  title,
  amount,
  currencyCode,
  subtitle,
}: FinancialSummaryCardProps) {
  const formatted = formatMonetaryValue(amount, currencyCode);

  return (
    <div className="editorial-panel p-6 bg-accent/5 border-2 border-border space-y-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h4 className="font-mono text-xs uppercase font-bold text-muted-foreground">
          {title}
        </h4>
        <CurrencyBadge code={currencyCode} />
      </div>

      <div className="space-y-1">
        <span className="block font-mono text-3xl sm:text-4xl md:text-5xl font-black tracking-tight select-all word-break break-all">
          {formatted}
        </span>
        {subtitle && (
          <span className="block text-xs text-muted-foreground leading-normal italic">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
