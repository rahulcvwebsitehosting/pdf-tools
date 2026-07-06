"use client";

import React, { useState, useEffect, useTransition } from "react";
import { CalculatorRegistryEntry, calculatorRegistry } from "@/modules/calculators/calculator.config";
import { TrustBadge } from "@/components/trust-badge";
import { saveToolInputCache, loadToolInputCache, savePreferences, loadPreferences } from "@/lib/tools-engine/storage";
import { shareToolUrl, triggerPrint, copyToClipboard } from "@/lib/tools-engine/sharing";
import { trackEvent } from "@/lib/tools-engine/analytics";
import { validateInput } from "@/lib/tools-engine/validators";
import { detectUserDefaultCurrency, currenciesList } from "@/lib/tools-engine/financial/currency";
import ResultCard from "./ResultCard";
import FormulaCard from "./FormulaCard";
import FAQSection from "./FAQSection";
import CurrencySelector from "./CurrencySelector";
import MoneyInput from "./MoneyInput";
import { Share2, Printer, RotateCcw, Copy, Calculator } from "lucide-react";

interface CalculatorShellProps {
  slug: string;
  relatedLinks: React.ReactNode;
}

export default function CalculatorShell({ slug, relatedLinks }: CalculatorShellProps) {
  const tool = calculatorRegistry[slug];
  
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [outputs, setOutputs] = useState<Record<string, any>>({});
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"calc" | "formula" | "faq">("calc");
  const [copiedAll, setCopiedAll] = useState(false);

  // Detect monetary tools
  const isMonetary = tool?.outputs.some(o => o.type === "currency") || tool?.inputs.some(i => 
    i.name.toLowerCase().includes("amount") || 
    i.name.toLowerCase().includes("price") || 
    i.name.toLowerCase().includes("salary") || 
    i.name.toLowerCase().includes("principal") || 
    i.name.toLowerCase().includes("returned") || 
    i.name.toLowerCase().includes("invested") || 
    i.name.toLowerCase().includes("cost") || 
    i.name.toLowerCase().includes("value") ||
    i.name.toLowerCase().includes("revenue") ||
    i.name.toLowerCase().includes("bill") ||
    i.name.toLowerCase().includes("insurance") ||
    i.name.toLowerCase().includes("downpayment") ||
    i.name.toLowerCase().includes("homevalue")
  );

  // If tool is not found, render fallback
  if (!tool) return null;

  // Initialize values
  useEffect(() => {
    trackEvent("open", tool.slug);
    
    // Load currency preference
    const cachedCurrency = loadPreferences("currency", detectUserDefaultCurrency());
    setCurrencyCode(cachedCurrency);

    // Load from cache or use defaults
    const cache = loadToolInputCache(tool.slug);
    const initialInputs: Record<string, any> = {};
    
    tool.inputs.forEach((input) => {
      if (cache && cache[input.name] !== undefined) {
        initialInputs[input.name] = validateInput(
          cache[input.name],
          input.type,
          input.min,
          input.max,
          input.defaultValue
        );
      } else {
        initialInputs[input.name] = input.defaultValue;
      }
    });

    setInputs(initialInputs);
    
    // Run initial calculation
    const initialOutputs = tool.calculate(initialInputs);
    setOutputs(initialOutputs);
  }, [tool]);

  // Handle changes and recalculate
  const handleChange = (name: string, value: any, type: any, min?: number, max?: number) => {
    const validated = validateInput(value, type, min, max, value);
    const updatedInputs = { ...inputs, [name]: validated };
    
    setInputs(updatedInputs);
    saveToolInputCache(tool.slug, updatedInputs);

    startTransition(() => {
      const updatedOutputs = tool.calculate(updatedInputs);
      setOutputs(updatedOutputs);
      trackEvent("calculate", tool.slug);
    });
  };

  const handleCurrencyChange = (code: string) => {
    setCurrencyCode(code);
    savePreferences("currency", code);
    // Recalculate if active inputs need to adapt
    startTransition(() => {
      const updatedOutputs = tool.calculate(inputs);
      setOutputs(updatedOutputs);
    });
  };

  const handleReset = () => {
    const defaultInputs: Record<string, any> = {};
    tool.inputs.forEach((input) => {
      defaultInputs[input.name] = input.defaultValue;
    });
    setInputs(defaultInputs);
    saveToolInputCache(tool.slug, defaultInputs);
    
    const updatedOutputs = tool.calculate(defaultInputs);
    setOutputs(updatedOutputs);
    trackEvent("reset", tool.slug);
  };

  const handleShare = () => {
    shareToolUrl(tool.slug, tool.title);
    trackEvent("share", tool.slug);
  };

  const handlePrint = () => {
    triggerPrint();
    trackEvent("print", tool.slug);
  };

  const handleCopySummary = async () => {
    // Generate text summary of inputs and outputs
    const lines = [`--- ${tool.title} Summary ---`];
    lines.push("\n[Inputs]");
    tool.inputs.forEach((inp) => {
      lines.push(`${inp.label}: ${inputs[inp.name]}`);
    });
    lines.push("\n[Outputs]");
    tool.outputs.forEach((out) => {
      lines.push(`${out.label}: ${outputs[out.name] || "0"}`);
    });
    lines.push(`\nProcessed privately at ToolsAtZero: https://toolsatzero.com/tools/${tool.slug}`);

    const success = await copyToClipboard(lines.join("\n"));
    if (success) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <div className="space-y-12">
      {/* Trust Notice */}
      <TrustBadge />

      {/* Tabs */}
      <div className="flex border-b border-black font-mono text-xs uppercase font-bold bg-background">
        <button
          onClick={() => setActiveTab("calc")}
          className={`px-4 py-3 border-r border-black hover:bg-accent transition-colors ${
            activeTab === "calc" ? "bg-accent text-black" : "text-muted-foreground"
          }`}
        >
          Calculator
        </button>
        <button
          onClick={() => setActiveTab("formula")}
          className={`px-4 py-3 border-r border-black hover:bg-accent transition-colors ${
            activeTab === "formula" ? "bg-accent text-black" : "text-muted-foreground"
          }`}
        >
          How It Works / Formula
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          className={`px-4 py-3 hover:bg-accent transition-colors ${
            activeTab === "faq" ? "bg-accent text-black" : "text-muted-foreground"
          }`}
        >
          FAQs
        </button>
      </div>

      {activeTab === "calc" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Inputs Section */}
          <div className="lg:col-span-1 border border-black bg-background p-6 space-y-6">
            <h3 className="font-mono text-xs uppercase font-bold text-muted-foreground border-b border-black pb-2 flex items-center gap-2">
              <Calculator size={14} />
              <span>Configure Inputs</span>
            </h3>

            {isMonetary && (
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase font-bold text-muted-foreground">
                  Regional Currency
                </label>
                <CurrencySelector
                  selectedCode={currencyCode}
                  onChange={handleCurrencyChange}
                />
              </div>
            )}

            <div className="space-y-4">
              {tool.inputs.map((inp) => {
                const isMoneyField = inp.type === "number" && (
                  inp.name.toLowerCase().includes("amount") || 
                  inp.name.toLowerCase().includes("price") || 
                  inp.name.toLowerCase().includes("salary") || 
                  inp.name.toLowerCase().includes("principal") || 
                  inp.name.toLowerCase().includes("returned") || 
                  inp.name.toLowerCase().includes("invested") || 
                  inp.name.toLowerCase().includes("cost") || 
                  inp.name.toLowerCase().includes("value") ||
                  inp.name.toLowerCase().includes("revenue") ||
                  inp.name.toLowerCase().includes("bill") ||
                  inp.name.toLowerCase().includes("insurance") ||
                  inp.name.toLowerCase().includes("downpayment") ||
                  inp.name.toLowerCase().includes("homevalue")
                );

                if (isMoneyField) {
                  return (
                    <MoneyInput
                      key={inp.name}
                      id={inp.name}
                      label={inp.label}
                      value={inputs[inp.name] || 0}
                      currencyCode={currencyCode}
                      onChange={(val) => handleChange(inp.name, val, inp.type, inp.min, inp.max)}
                      min={inp.min}
                      max={inp.max}
                      helpText={inp.helpText}
                    />
                  );
                }

                return (
                  <div key={inp.name} className="flex flex-col space-y-1.5">
                    <label
                      htmlFor={inp.name}
                      className="font-mono text-[11px] uppercase font-bold text-foreground"
                    >
                      {inp.label}
                      {inp.unit && <span className="text-muted-foreground ml-1">({inp.unit})</span>}
                    </label>
                    
                    {inp.type === "select" ? (
                      <select
                        id={inp.name}
                        value={inputs[inp.name] || ""}
                        onChange={(e) => handleChange(inp.name, e.target.value, inp.type)}
                        className="w-full p-2.5 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none appearance-none cursor-pointer"
                      >
                        {(tool.slug === "currency-converter" && (inp.name === "from" || inp.name === "to")
                          ? currenciesList.map(c => ({ label: `${c.code} - ${c.name}`, value: c.code }))
                          : inp.options || []
                        ).map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : inp.type === "boolean" ? (
                      <label className="inline-flex items-center gap-2.5 cursor-pointer pt-1">
                        <input
                          id={inp.name}
                          type="checkbox"
                          checked={!!inputs[inp.name]}
                          onChange={(e) => handleChange(inp.name, e.target.checked, inp.type)}
                          className="w-4 h-4 accent-black border border-black rounded-none"
                        />
                        <span className="font-mono text-xs text-muted-foreground">Enabled</span>
                      </label>
                    ) : inp.type === "date" ? (
                      <input
                        id={inp.name}
                        type="date"
                        value={inputs[inp.name] || ""}
                        onChange={(e) => handleChange(inp.name, e.target.value, inp.type)}
                        className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                      />
                    ) : (
                      <input
                        id={inp.name}
                        type={inp.type === "number" ? "number" : "text"}
                        inputMode={inp.type === "number" ? "decimal" : undefined}
                        value={inputs[inp.name] !== undefined ? inputs[inp.name] : ""}
                        placeholder={inp.placeholder}
                        min={inp.min}
                        max={inp.max}
                        step={inp.step}
                        onChange={(e) =>
                          handleChange(inp.name, e.target.value, inp.type, inp.min, inp.max)
                        }
                        className="w-full p-2 border border-black bg-background font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    )}

                    {inp.helpText && (
                      <span className="text-[10px] text-muted-foreground leading-normal italic">
                        {inp.helpText}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Core Action Panel */}
            <div className="grid grid-cols-2 gap-2 border-t border-black pt-6">
              <button
                onClick={handleReset}
                className="btn-secondary flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold"
                title="Reset calculator values"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
              <button
                onClick={handleCopySummary}
                className="btn-primary flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold"
                title="Copy all inputs and outputs"
              >
                <Copy size={12} />
                <span>{copiedAll ? "Copied!" : "Copy All"}</span>
              </button>
              <button
                onClick={handleShare}
                className="btn-secondary flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold col-span-1"
                title="Share this tool"
              >
                <Share2 size={12} />
                <span>Share</span>
              </button>
              <button
                onClick={handlePrint}
                className="btn-secondary flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold col-span-1"
                title="Print / Save PDF"
              >
                <Printer size={12} />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`${isPending ? "opacity-60" : "opacity-100"} transition-opacity`}>
              <ResultCard outputsSchema={tool.outputs} values={outputs} slug={tool.slug} currencyCode={currencyCode} />
            </div>

            {/* AEO GEO Highlights */}
            <div className="editorial-panel p-6 space-y-4">
              <h4 className="font-mono text-xs uppercase font-bold text-foreground border-b border-black/10 pb-2">
                Quick AI Answer & Insights
              </h4>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  <strong className="text-foreground">Summary:</strong> {tool.aeo.aiSummary}
                </p>
                <p>
                  <strong className="text-foreground">Quick Answer:</strong> {tool.aeo.quickAnswer}
                </p>
                {tool.geo.regionalVariations && (
                  <p className="bg-secondary p-3 border-l-4 border-black text-xs font-mono">
                    <strong>Regional Notes:</strong> {tool.geo.regionalVariations}
                  </p>
                )}
                <div>
                  <strong className="text-foreground block mb-1">Key Takeaways:</strong>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {tool.aeo.keyTakeaways.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground block mb-1">Common Mistakes:</strong>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-destructive">
                    {tool.aeo.commonMistakes.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Tools suggestions */}
            {relatedLinks}
          </div>
        </div>
      )}

      {activeTab === "formula" && <FormulaCard formula={tool.formula} />}

      {activeTab === "faq" && <FAQSection faq={tool.faq} />}
    </div>
  );
}
