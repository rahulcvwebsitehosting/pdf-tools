export function validateNumber(
  value: any,
  min?: number,
  max?: number,
  defaultValue = 0
): number {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }
  let num = Number(value);
  if (isNaN(num)) {
    return defaultValue;
  }
  if (min !== undefined && num < min) {
    num = min;
  }
  if (max !== undefined && num > max) {
    num = max;
  }
  return num;
}

export function validateInput(
  value: any,
  type: "number" | "select" | "text" | "date" | "boolean",
  min?: number,
  max?: number,
  defaultValue?: any
): any {
  switch (type) {
    case "number":
      return validateNumber(value, min, max, defaultValue !== undefined ? defaultValue : 0);
    case "boolean":
      return value === true || value === "true" || value === 1 || value === "1";
    case "date":
      if (!value) return defaultValue || "";
      const date = new Date(value);
      return isNaN(date.getTime()) ? defaultValue || "" : value;
    default:
      return value === undefined || value === null ? defaultValue || "" : String(value);
  }
}
