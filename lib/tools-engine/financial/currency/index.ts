export interface CurrencyInfo {
  code: string;       // ISO 4217
  symbol: string;
  name: string;
  locale: string;     // formatting locale
  precision: number;  // decimals
  country: string;
  flag?: string;      // emoji flag
}

export const currenciesList: CurrencyInfo[] = [
  { code: "INR", symbol: "\u20b9", name: "Indian Rupee", locale: "en-IN", precision: 2, country: "India", flag: "\ud83c\uddee\ud83c\uddf3" },
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US", precision: 2, country: "United States", flag: "\ud83c\uddfa\ud83c\uddf8" },
  { code: "EUR", symbol: "\u20ac", name: "Euro", locale: "de-DE", precision: 2, country: "Eurozone", flag: "\ud83c\uddea\ud83c\uddfa" },
  { code: "GBP", symbol: "\u00a3", name: "British Pound", locale: "en-GB", precision: 2, country: "United Kingdom", flag: "\ud83c\uddec\ud83c\udde7" },
  { code: "AUD", symbol: "$", name: "Australian Dollar", locale: "en-AU", precision: 2, country: "Australia", flag: "\ud83c\udde6\ud83c\uddfa" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar", locale: "en-CA", precision: 2, country: "Canada", flag: "\ud83c\udde8\ud83c\udde6" },
  { code: "NZD", symbol: "$", name: "New Zealand Dollar", locale: "en-NZ", precision: 2, country: "New Zealand", flag: "\ud83c\uddf3\ud83c\uddff" },
  { code: "SGD", symbol: "$", name: "Singapore Dollar", locale: "en-SG", precision: 2, country: "Singapore", flag: "\ud83c\uddf8\ud83c\uddec" },
  { code: "AED", symbol: "\u062f.\u0625", name: "UAE Dirham", locale: "ar-AE", precision: 2, country: "United Arab Emirates", flag: "\ud83c\udde6\ud83c\uddea" },
  { code: "SAR", symbol: "\ufdfc", name: "Saudi Riyal", locale: "ar-SA", precision: 2, country: "Saudi Arabia", flag: "\ud83c\uddf8\ud83c\udde6" },
  { code: "QAR", symbol: "\ufdfc", name: "Qatari Riyal", locale: "ar-QA", precision: 2, country: "Qatar", flag: "\ud83c\uddf6\ud83c\udde6" },
  { code: "KWD", symbol: "\u062f.\u0643", name: "Kuwaiti Dinar", locale: "ar-KW", precision: 3, country: "Kuwait", flag: "\ud83c\uddf0\ud83c\uddfc" },
  { code: "BHD", symbol: "\u062f.\u0628", name: "Bahraini Dinar", locale: "ar-BH", precision: 3, country: "Bahrain", flag: "\ud83c\udde7\ud83c\udded" },
  { code: "OMR", symbol: "\ufdfc", name: "Omani Rial", locale: "ar-OM", precision: 3, country: "Oman", flag: "\ud83c\uddf4\ud83c\uddf2" },
  { code: "JPY", symbol: "\u00a5", name: "Japanese Yen", locale: "ja-JP", precision: 0, country: "Japan", flag: "\ud83c\uddef\ud83c\uddf5" },
  { code: "CNY", symbol: "\u00a5", name: "Chinese Yuan", locale: "zh-CN", precision: 2, country: "China", flag: "\ud83c\udde8\ud83c\uddf3" },
  { code: "HKD", symbol: "$", name: "Hong Kong Dollar", locale: "zh-HK", precision: 2, country: "Hong Kong", flag: "\ud83c\udded\ud83c\uddf0" },
  { code: "KRW", symbol: "\u20a9", name: "South Korean Won", locale: "ko-KR", precision: 0, country: "South Korea", flag: "\ud83c\uddf0\ud83c\uddf7" },
  { code: "THB", symbol: "\u0e3f", name: "Thai Baht", locale: "th-TH", precision: 2, country: "Thailand", flag: "\ud83c\uddf9\ud83c\udded" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", locale: "ms-MY", precision: 2, country: "Malaysia", flag: "\ud83c\uddf2\ud83c\uddfe" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", locale: "id-ID", precision: 0, country: "Indonesia", flag: "\ud83c\uddee\ud83c\udde9" },
  { code: "PHP", symbol: "\u20b1", name: "Philippine Peso", locale: "en-PH", precision: 2, country: "Philippines", flag: "\ud83c\uddf5\ud83c\udded" },
  { code: "VND", symbol: "\u20ab", name: "Vietnamese Dong", locale: "vi-VN", precision: 0, country: "Vietnam", flag: "\ud83c\uddfb\ud83c\uddf3" },
  { code: "PKR", symbol: "\u20a8", name: "Pakistani Rupee", locale: "en-PK", precision: 2, country: "Pakistan", flag: "\ud83c\uddf5\ud83c\uddf0" },
  { code: "BDT", symbol: "\u09f3", name: "Bangladeshi Taka", locale: "bn-BD", precision: 2, country: "Bangladesh", flag: "\ud83c\udde7\ud83c\udde9" },
  { code: "LKR", symbol: "\u20a8", name: "Sri Lankan Rupee", locale: "si-LK", precision: 2, country: "Sri Lanka", flag: "\ud83c\uddf1\ud83c\uddf0" },
  { code: "NPR", symbol: "\u20a8", name: "Nepalese Rupee", locale: "ne-NP", precision: 2, country: "Nepal", flag: "\ud83c\uddf3\ud83c\uddf5" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", locale: "de-CH", precision: 2, country: "Switzerland", flag: "\ud83c\udde8\ud83c\udded" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona", locale: "sv-SE", precision: 2, country: "Sweden", flag: "\ud83c\uddf8\ud83c\uddea" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", locale: "no-NO", precision: 2, country: "Norway", flag: "\ud83c\uddf3\ud83c\uddf4" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", locale: "da-DK", precision: 2, country: "Denmark", flag: "\ud83c\udde9\ud83c\uddf0" },
  { code: "PLN", symbol: "z\u0142", name: "Polish Z\u0142oty", locale: "pl-PL", precision: 2, country: "Poland", flag: "\ud83c\uddf5\ud83c\uddf1" },
  { code: "CZK", symbol: "K\u010d", name: "Czech Koruna", locale: "cs-CZ", precision: 2, country: "Czechia", flag: "\ud83c\udde8\ud83c\uddff" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint", locale: "hu-HU", precision: 0, country: "Hungary", flag: "\ud83c\udded\ud83c\uddfa" },
  { code: "TRY", symbol: "\u20ba", name: "Turkish Lira", locale: "tr-TR", precision: 2, country: "Turkey", flag: "\ud83c\uddf9\ud83c\uddf7" },
  { code: "RUB", symbol: "\u20bd", name: "Russian Ruble", locale: "ru-RU", precision: 2, country: "Russia", flag: "\ud83c\uddf7\ud83c\uddfa" },
  { code: "MXN", symbol: "$", name: "Mexican Peso", locale: "es-MX", precision: 2, country: "Mexico", flag: "\ud83c\uddf2\ud83c\uddfd" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", locale: "pt-BR", precision: 2, country: "Brazil", flag: "\ud83c\udde7\ud83c\uddf7" },
  { code: "ZAR", symbol: "R", name: "South African Rand", locale: "en-ZA", precision: 2, country: "South Africa", flag: "\ud83c\uddff\ud83c\udde6" }
];

export const currenciesMap = new Map<string, CurrencyInfo>(
  currenciesList.map(c => [c.code, c])
);

export function detectUserDefaultCurrency(): string {
  if (typeof navigator === "undefined" || !navigator.language) return "USD";
  const lang = navigator.language.toLowerCase();
  if (lang.includes("-in") || lang.includes("in-")) return "INR";
  if (lang.includes("-gb") || lang.includes("en-gb")) return "GBP";
  if (lang.includes("-de") || lang.includes("de-")) return "EUR";
  if (lang.includes("-fr") || lang.includes("fr-")) return "EUR";
  if (lang.includes("-jp") || lang.includes("ja-")) return "JPY";
  if (lang.includes("-ca") || lang.includes("en-ca")) return "CAD";
  if (lang.includes("-au") || lang.includes("en-au")) return "AUD";
  if (lang.includes("-nz") || lang.includes("en-nz")) return "NZD";
  if (lang.includes("-sg") || lang.includes("en-sg")) return "SGD";
  if (lang.includes("-ae") || lang.includes("ar-ae")) return "AED";
  if (lang.includes("-sa") || lang.includes("ar-sa")) return "SAR";
  return "USD";
}
