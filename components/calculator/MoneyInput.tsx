"use client";

import React, { useState, useEffect } from "react";
import { currenciesMap } from "@/lib/tools-engine/financial/currency";

interface MoneyInputProps {
  id: string;
  label: string;
  value: number;
  currencyCode: string;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  helpText?: string;
}

export default function MoneyInput({
  id,
  label,
  value,
  currencyCode,
  onChange,
  min = 0,
  max,
  helpText,
}: MoneyInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const currencyInfo = currenciesMap.get(currencyCode.toUpperCase()) || currenciesMap.get("USD")!;

  // Format value to locale-aware number string (no currency symbol)
  const formatNumberForInput = (num: number, locale: string): string => {
    if (isNaN(num)) return "";
    try {
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
      }).format(num);
    } catch (e) {
      return String(num);
    }
  };

  useEffect(() => {
    // If the input value changes externally, update our display value
    const formatted = formatNumberForInput(value, currencyInfo.locale);
    setDisplayValue(formatted);
  }, [value, currencyInfo.locale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;

    // Standardize decimals and strip non-digit elements
    // E.g. in German/European locales, '.' is grouping and ',' is decimal
    const isEuropean = currencyInfo.locale.startsWith("de") || currencyInfo.locale.startsWith("fr") || currencyInfo.locale.startsWith("it") || currencyInfo.locale.startsWith("es") || currencyInfo.locale.startsWith("pt");
    
    let sanitized = rawInput;
    if (isEuropean) {
      // European: replace '.' with nothing, replace ',' with '.'
      sanitized = sanitized.replace(/\./g, "").replace(/,/g, ".");
    } else {
      // US/Indian: replace ',' with nothing
      sanitized = sanitized.replace(/,/g, "");
    }
    
    // Allow only digits and a single decimal point
    sanitized = sanitized.replace(/[^\d.]/g, "");
    const parts = sanitized.split(".");
    if (parts.length > 2) {
      sanitized = parts[0] + "." + parts.slice(1).join("");
    }

    // Set temporary text representation while typing
    setDisplayValue(rawInput);

    const parsedNum = parseFloat(sanitized);
    if (!isNaN(parsedNum)) {
      let finalNum = parsedNum;
      if (max !== undefined && finalNum > max) finalNum = max;
      if (finalNum < min) finalNum = min;
      onChange(finalNum);
    } else {
      onChange(0);
    }
  };

  const handleBlur = () => {
    // Tidy up formatting on blur
    const formatted = formatNumberForInput(value, currencyInfo.locale);
    setDisplayValue(formatted);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <label htmlFor={id} className="font-mono text-[11px] uppercase font-bold text-foreground">
        {label}
      </label>
      
      <div className="flex border border-border bg-background focus-within:ring-1 focus-within:ring-black">
        {/* Currency Prefix Badge */}
        <span className="flex items-center px-3 border-r border-border bg-secondary font-mono text-xs font-bold text-muted-foreground select-none">
          {currencyInfo.symbol}
        </span>
        
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full p-2.5 bg-transparent font-mono text-xs focus:outline-none border-none outline-none"
        />

        {/* Currency Code Suffix Badge */}
        <span className="flex items-center px-3 border-l border-border bg-secondary font-mono text-[10px] font-bold text-muted-foreground select-none">
          {currencyInfo.code}
        </span>
      </div>

      {helpText && (
        <span className="text-[10px] text-muted-foreground leading-normal italic">
          {helpText}
        </span>
      )}
    </div>
  );
}
