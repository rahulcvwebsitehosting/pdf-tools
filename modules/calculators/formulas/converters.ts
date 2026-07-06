import { convertCurrency, getCurrencyExchangeRate } from "../../../lib/tools-engine/financial/exchange";

export function currencyConverter(inputs: Record<string, any>) {
  const amount = Number(inputs.amount || 0);
  const from = inputs.from || "USD";
  const to = inputs.to || "EUR";

  const result = convertCurrency(amount, from, to);
  const rate = getCurrencyExchangeRate(from, to);

  return {
    result,
    rate,
  };
}

export function unitConverter(inputs: Record<string, any>) {
  // General fallback converter (e.g. Length conversion)
  return lengthConverter(inputs);
}

export function lengthConverter(inputs: Record<string, any>) {
  const value = Number(inputs.value || 0);
  const from = inputs.from || "m";
  const to = inputs.to || "m";

  // Base is meters (m)
  const factors: Record<string, number> = {
    mm: 0.001,
    cm: 0.01,
    m: 1.0,
    km: 1000.0,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  };

  const valInM = value * (factors[from] || 1.0);
  const result = valInM / (factors[to] || 1.0);

  return { result };
}

export function weightConverter(inputs: Record<string, any>) {
  const value = Number(inputs.value || 0);
  const from = inputs.from || "kg";
  const to = inputs.to || "kg";

  // Base is kilograms (kg)
  const factors: Record<string, number> = {
    mg: 1e-6,
    g: 0.001,
    kg: 1.0,
    oz: 0.0283495,
    lb: 0.45359237,
    stone: 6.35029,
  };

  const valInKg = value * (factors[from] || 1.0);
  const result = valInKg / (factors[to] || 1.0);

  return { result };
}

export function areaConverter(inputs: Record<string, any>) {
  const value = Number(inputs.value || 0);
  const from = inputs.from || "m2";
  const to = inputs.to || "m2";

  // Base is square meters (m2)
  const factors: Record<string, number> = {
    mm2: 1e-6,
    cm2: 1e-4,
    m2: 1.0,
    km2: 1e6,
    in2: 0.00064516,
    ft2: 0.092903,
    yd2: 0.836127,
    acre: 4046.856,
    hectare: 10000.0,
  };

  const valInM2 = value * (factors[from] || 1.0);
  const result = valInM2 / (factors[to] || 1.0);

  return { result };
}

export function volumeConverter(inputs: Record<string, any>) {
  const value = Number(inputs.value || 0);
  const from = inputs.from || "l";
  const to = inputs.to || "l";

  // Base is liters (l)
  const factors: Record<string, number> = {
    ml: 0.001,
    l: 1.0,
    m3: 1000.0,
    tsp: 0.00492892,
    tbsp: 0.0147868,
    floz: 0.0295735,
    cup: 0.24,
    pint: 0.473176,
    quart: 0.946353,
    gallon: 3.78541,
  };

  const valInL = value * (factors[from] || 1.0);
  const result = valInL / (factors[to] || 1.0);

  return { result };
}

export function temperatureConverter(inputs: Record<string, any>) {
  const value = Number(inputs.value || 0);
  const from = inputs.from || "C";
  const to = inputs.to || "C";

  if (from === to) return { result: value };

  // Convert to Celsius first
  let tempInC = value;
  if (from === "F") {
    tempInC = ((value - 32) * 5) / 9;
  } else if (from === "K") {
    tempInC = value - 273.15;
  }

  // Convert from Celsius to Target
  let result = tempInC;
  if (to === "F") {
    result = (tempInC * 9) / 5 + 32;
  } else if (to === "K") {
    result = tempInC + 273.15;
  }

  return { result };
}

export function speedConverter(inputs: Record<string, any>) {
  const value = Number(inputs.value || 0);
  const from = inputs.from || "kmh";
  const to = inputs.to || "kmh";

  // Base is meters per second (m/s)
  const factors: Record<string, number> = {
    ms: 1.0,
    kmh: 0.277778,
    mph: 0.44704,
    knots: 0.514444,
  };

  const valInMs = value * (factors[from] || 1.0);
  const result = valInMs / (factors[to] || 1.0);

  return { result };
}

export function dataStorageConverter(inputs: Record<string, any>) {
  const value = Number(inputs.value || 0);
  const from = inputs.from || "GB";
  const to = inputs.to || "GB";
  const isBinary = inputs.binary === true || inputs.binary === "true";

  const k = isBinary ? 1024 : 1000;
  const units = ["b", "B", "KB", "MB", "GB", "TB", "PB"];

  const idxFrom = units.indexOf(from);
  const idxTo = units.indexOf(to);

  if (idxFrom === -1 || idxTo === -1) return { result: value };

  // Convert to bits first
  let bits = value;
  if (idxFrom === 0) {
    // bits
    bits = value;
  } else {
    // bytes etc.
    const bytes = value * Math.pow(k, idxFrom - 1);
    bits = bytes * 8;
  }

  // Convert bits to target
  let result = bits;
  if (idxTo === 0) {
    result = bits;
  } else {
    const bytes = bits / 8;
    result = bytes / Math.pow(k, idxTo - 1);
  }

  return { result };
}
