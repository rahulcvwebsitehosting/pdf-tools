import { FormulaDetails } from "@/lib/tools-engine/registry/types";

interface FormulaCardProps {
  formula: FormulaDetails;
}

export default function FormulaCard({ formula }: FormulaCardProps) {
  return (
    <section className="editorial-panel p-6 space-y-6">
      <div>
        <h3 className="font-mono text-xs uppercase font-bold text-muted-foreground mb-2">
          Mathematical Formula
        </h3>
        <div className="bg-secondary p-4 border border-black font-mono text-sm sm:text-base font-bold overflow-x-auto">
          {formula.equation}
        </div>
      </div>

      <div>
        <h4 className="font-mono text-xs uppercase font-bold text-muted-foreground mb-2">
          Formula Variables & Logic
        </h4>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {formula.explanation}
        </p>
      </div>

      {formula.workedExample && (
        <div className="border-t border-black pt-6 space-y-4">
          <h4 className="font-mono text-xs uppercase font-bold text-muted-foreground">
            Worked Step-by-Step Example
          </h4>
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold uppercase text-foreground bg-accent/10 w-fit px-2 py-1 border border-black">
              Given: {formula.workedExample.expression}
            </div>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground leading-relaxed">
              {formula.workedExample.steps.map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
            <div className="font-mono text-sm font-bold border-l-4 border-black pl-3 py-1">
              Result: {formula.workedExample.result}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
