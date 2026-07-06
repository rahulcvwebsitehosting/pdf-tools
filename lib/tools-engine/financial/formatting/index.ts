import { currenciesMap } from "../currency";

export function formatMonetaryValue(amount: number, currencyCode = "USD", options?: Intl.NumberFormatOptions): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    amount = 0;
  }
  const currencyInfo = currenciesMap.get(currencyCode.toUpperCase());
  const locale = currencyInfo?.locale || "en-US";
  const precision = currencyInfo?.precision !== undefined ? currencyInfo.precision : 2;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode.toUpperCase(),
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
      ...options,
    }).format(amount);
  } catch (err) {
    // Fallback if locale/currency combinations fail
    return `${currencyInfo?.symbol || "$"}${amount.toFixed(precision)}`;
  }
}

export function formatPercentValue(value: number, decimals = 2): string {
  if (value === undefined || value === null || isNaN(value)) return "0%";
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

export function formatDecimalValue(value: number, decimals = 2): string {
  if (value === undefined || value === null || isNaN(value)) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCompactValue(value: number, currencyCode?: string): string {
  if (value === undefined || value === null || isNaN(value)) return "0";
  
  let options: Intl.NumberFormatOptions = {
    notation: "compact",
    compactDisplay: "short",
  };
  
  if (currencyCode) {
    const currencyInfo = currenciesMap.get(currencyCode.toUpperCase());
    const locale = currencyInfo?.locale || "en-US";
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode.toUpperCase(),
        ...options,
      }).format(value);
    } catch (e) {}
  }
  
  return new Intl.NumberFormat("en-US", options).format(value);
}
