export interface ExchangeRateProvider {
  getRate(from: string, to: string): number;
}

// Static offline currency baseline rates (relative to USD = 1.0)
export const STATIC_EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  INR: 83.50,
  EUR: 0.92,
  GBP: 0.78,
  AUD: 1.51,
  CAD: 1.37,
  NZD: 1.63,
  SGD: 1.35,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  KWD: 0.31,
  BHD: 0.38,
  OMR: 0.39,
  JPY: 158.00,
  CNY: 7.25,
  HKD: 7.80,
  KRW: 1380.00,
  THB: 36.70,
  MYR: 4.72,
  IDR: 16400.00,
  PHP: 58.60,
  VND: 25400.00,
  PKR: 278.00,
  BDT: 117.50,
  LKR: 302.00,
  NPR: 133.50,
  CHF: 0.89,
  SEK: 10.50,
  NOK: 10.60,
  DKK: 6.95,
  PLN: 4.02,
  CZK: 23.20,
  HUF: 368.00,
  TRY: 32.80,
  RUB: 89.00,
  MXN: 18.20,
  BRL: 5.40,
  ZAR: 18.00,
};

export class StaticExchangeRateProvider implements ExchangeRateProvider {
  getRate(from: string, to: string): number {
    const rateFrom = STATIC_EXCHANGE_RATES[from.toUpperCase()] || 1.0;
    const rateTo = STATIC_EXCHANGE_RATES[to.toUpperCase()] || 1.0;
    // Base convert through USD
    return rateTo / rateFrom;
  }
}

let activeProvider: ExchangeRateProvider = new StaticExchangeRateProvider();

export function setExchangeRateProvider(provider: ExchangeRateProvider): void {
  activeProvider = provider;
}

export function convertCurrency(amount: number, from: string, to: string): number {
  if (from.toUpperCase() === to.toUpperCase()) return amount;
  const rate = activeProvider.getRate(from, to);
  return amount * rate;
}

export function getCurrencyExchangeRate(from: string, to: string): number {
  return activeProvider.getRate(from, to);
}
