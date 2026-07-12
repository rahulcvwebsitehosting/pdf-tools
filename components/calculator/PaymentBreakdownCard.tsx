import { formatMonetaryValue } from "@/lib/tools-engine/financial/formatting";

interface BreakdownItem {
  label: string;
  amount: number;
  percentage?: number;
}

interface PaymentBreakdownCardProps {
  title: string;
  items: BreakdownItem[];
  currencyCode: string;
}

export default function PaymentBreakdownCard({
  title,
  items,
  currencyCode,
}: PaymentBreakdownCardProps) {
  return (
    <div className="editorial-panel p-6 space-y-4">
      <h4 className="font-mono text-xs uppercase font-bold text-muted-foreground border-b border-border pb-2">
        {title}
      </h4>

      <div className="space-y-3 font-mono text-xs">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-1 border-b border-dashed border-border last:border-b-0">
            <span className="text-muted-foreground uppercase">{item.label}</span>
            <div className="flex items-center gap-3">
              {item.percentage !== undefined && (
                <span className="text-[10px] bg-secondary px-1.5 py-0.5 border border-border">
                  {item.percentage.toFixed(1)}%
                </span>
              )}
              <span className="font-bold text-sm">
                {formatMonetaryValue(item.amount, currencyCode)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
