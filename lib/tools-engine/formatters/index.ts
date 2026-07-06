export function formatNumber(value: number, decimals = 2): string {
  if (value === null || value === undefined || isNaN(value)) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCurrency(value: number, currency = "USD", decimals = 2): string {
  if (value === null || value === undefined || isNaN(value)) return "$0.00";
  
  let locale = "en-US";
  if (currency === "INR") {
    locale = "en-IN";
  }
  
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercentage(value: number, decimals = 2): string {
  if (value === null || value === undefined || isNaN(value)) return "0%";
  return `${formatNumber(value, decimals)}%`;
}

export function formatDuration(days: number): string {
  if (days === null || days === undefined || isNaN(days)) return "0 days";
  const years = Math.floor(days / 365);
  const remainingDaysAfterYears = days % 365;
  const months = Math.floor(remainingDaysAfterYears / 30.436875);
  const remainingDays = Math.round(remainingDaysAfterYears % 30.436875);

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  if (remainingDays > 0 || parts.length === 0) {
    parts.push(`${remainingDays} ${remainingDays === 1 ? "day" : "days"}`);
  }
  return parts.join(", ");
}

export function formatDataStorage(bytes: number, binary = false): string {
  if (bytes === null || bytes === undefined || isNaN(bytes)) return "0 B";
  if (bytes === 0) return "0 B";
  const k = binary ? 1024 : 1000;
  const sizes = binary 
    ? ["B", "KiB", "MiB", "GiB", "TiB", "PiB"]
    : ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = bytes / Math.pow(k, i);
  return `${formatNumber(val, 2)} ${sizes[i]}`;
}
