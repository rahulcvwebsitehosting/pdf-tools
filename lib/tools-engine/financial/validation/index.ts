export function cleanFormattedNumber(val: any): number {
  if (val === undefined || val === null || val === "") return 0;
  if (typeof val === "number") return val;
  // Strip commas, spaces, currency symbols
  const clean = String(val).replace(/[^\d.-]/g, "");
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
}

export function validateFinancialInput(
  value: any,
  min = 0,
  max = 999999999999,
  allowNegative = false
): number {
  let num = cleanFormattedNumber(value);
  if (!allowNegative && num < 0) {
    num = 0;
  }
  if (num < min) num = min;
  if (num > max) num = max;
  return num;
}
