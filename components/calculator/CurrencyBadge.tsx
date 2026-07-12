import { currenciesMap } from "@/lib/tools-engine/financial/currency";

interface CurrencyBadgeProps {
  code: string;
  className?: string;
}

export default function CurrencyBadge({ code, className = "" }: CurrencyBadgeProps) {
  const currencyInfo = currenciesMap.get(code.toUpperCase()) || { symbol: "$", code: "USD" };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 border border-border bg-accent font-mono text-[9px] font-bold uppercase select-none ${className}`}
      title={`${code} Currency`}
    >
      <span>{currencyInfo.symbol}</span>
      <span>{currencyInfo.code}</span>
    </span>
  );
}
