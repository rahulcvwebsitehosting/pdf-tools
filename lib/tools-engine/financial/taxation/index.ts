export interface TaxProfile {
  countryCode: string;
  countryName: string;
  taxName: string;
  defaultRate: number;
  defaultCurrency: string;
}

export const countryTaxProfiles: Record<string, TaxProfile> = {
  IN: { countryCode: "IN", countryName: "India", taxName: "GST", defaultRate: 18, defaultCurrency: "INR" },
  US: { countryCode: "US", countryName: "United States", taxName: "Sales Tax", defaultRate: 8.25, defaultCurrency: "USD" },
  GB: { countryCode: "GB", countryName: "United Kingdom", taxName: "VAT", defaultRate: 20, defaultCurrency: "GBP" },
  DE: { countryCode: "DE", countryName: "Germany", taxName: "VAT", defaultRate: 19, defaultCurrency: "EUR" },
  FR: { countryCode: "FR", countryName: "France", taxName: "VAT", defaultRate: 20, defaultCurrency: "EUR" },
  AU: { countryCode: "AU", countryName: "Australia", taxName: "GST", defaultRate: 10, defaultCurrency: "AUD" },
  CA: { countryCode: "CA", countryName: "Canada", taxName: "GST/HST", defaultRate: 13, defaultCurrency: "CAD" },
  NZ: { countryCode: "NZ", countryName: "New Zealand", taxName: "GST", defaultRate: 15, defaultCurrency: "NZD" },
  SG: { countryCode: "SG", countryName: "Singapore", taxName: "GST", defaultRate: 9, defaultCurrency: "SGD" },
  AE: { countryCode: "AE", countryName: "United Arab Emirates", taxName: "VAT", defaultRate: 5, defaultCurrency: "AED" },
  SA: { countryCode: "SA", countryName: "Saudi Arabia", taxName: "VAT", defaultRate: 15, defaultCurrency: "SAR" },
  JP: { countryCode: "JP", countryName: "Japan", taxName: "Consumption Tax", defaultRate: 10, defaultCurrency: "JPY" },
  CN: { countryCode: "CN", countryName: "China", taxName: "VAT", defaultRate: 13, defaultCurrency: "CNY" },
  ZA: { countryCode: "ZA", countryName: "South Africa", taxName: "VAT", defaultRate: 15, defaultCurrency: "ZAR" },
};

export function getTaxProfileByCountry(countryCode: string): TaxProfile {
  return countryTaxProfiles[countryCode.toUpperCase()] || countryTaxProfiles.US;
}

export function getTaxProfileByCurrency(currencyCode: string): TaxProfile {
  const match = Object.values(countryTaxProfiles).find(
    p => p.defaultCurrency.toUpperCase() === currencyCode.toUpperCase()
  );
  return match || countryTaxProfiles.US;
}
