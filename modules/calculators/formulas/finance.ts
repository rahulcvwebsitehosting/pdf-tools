export function gstCalculator(inputs: Record<string, any>) {
  const amount = Number(inputs.amount || 0);
  const rate = Number(inputs.rate || 0);
  const type = inputs.type || "add"; // "add" or "remove"

  let gstAmount = 0;
  let netAmount = 0;
  let grossAmount = 0;

  if (type === "add") {
    netAmount = amount;
    gstAmount = (amount * rate) / 100;
    grossAmount = amount + gstAmount;
  } else {
    grossAmount = amount;
    netAmount = amount / (1 + rate / 100);
    gstAmount = grossAmount - netAmount;
  }

  return {
    netAmount,
    gstAmount,
    grossAmount,
  };
}

export function emiCalculator(inputs: Record<string, any>) {
  const principal = Number(inputs.principal || 0);
  const rate = Number(inputs.rate || 0) / 12 / 100; // monthly rate
  const tenureYears = Number(inputs.tenure || 0);
  const tenureMonths = tenureYears * 12;

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (rate === 0) {
    emi = principal / tenureMonths;
  } else {
    emi = (principal * rate * Math.pow(1 + rate, tenureMonths)) / (Math.pow(1 + rate, tenureMonths) - 1);
  }

  totalPayment = emi * tenureMonths;
  totalInterest = totalPayment - principal;

  return {
    emi: isNaN(emi) ? 0 : emi,
    totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
    totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
  };
}

export function loanCalculator(inputs: Record<string, any>) {
  // Similar to EMI but can output additional metrics
  const principal = Number(inputs.principal || 0);
  const rate = Number(inputs.rate || 0) / 12 / 100;
  const tenureMonths = Number(inputs.tenure || 0);

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (rate === 0) {
    emi = principal / tenureMonths;
  } else {
    emi = (principal * rate * Math.pow(1 + rate, tenureMonths)) / (Math.pow(1 + rate, tenureMonths) - 1);
  }

  totalPayment = emi * tenureMonths;
  totalInterest = totalPayment - principal;

  return {
    monthlyPayment: isNaN(emi) ? 0 : emi,
    totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
  };
}

export function mortgageCalculator(inputs: Record<string, any>) {
  const homeValue = Number(inputs.homeValue || 0);
  const downPayment = Number(inputs.downPayment || 0);
  const rate = Number(inputs.rate || 0) / 12 / 100;
  const termYears = Number(inputs.term || 0);
  const propertyTaxRate = Number(inputs.propertyTaxRate || 0); // annual %
  const insurance = Number(inputs.insurance || 0); // annual fixed amount

  const principal = Math.max(0, homeValue - downPayment);
  const termMonths = termYears * 12;

  let pAndI = 0;
  if (rate === 0) {
    pAndI = principal / termMonths;
  } else {
    pAndI = (principal * rate * Math.pow(1 + rate, termMonths)) / (Math.pow(1 + rate, termMonths) - 1);
  }

  const monthlyTax = (homeValue * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = insurance / 12;
  const totalMonthly = pAndI + monthlyTax + monthlyInsurance;

  return {
    principalAndInterest: isNaN(pAndI) ? 0 : pAndI,
    propertyTax: isNaN(monthlyTax) ? 0 : monthlyTax,
    homeInsurance: isNaN(monthlyInsurance) ? 0 : monthlyInsurance,
    totalMonthly: isNaN(totalMonthly) ? 0 : totalMonthly,
  };
}

export function sipCalculator(inputs: Record<string, any>) {
  const monthlyInvestment = Number(inputs.monthlyInvestment || 0);
  const annualRate = Number(inputs.rate || 0);
  const tenureYears = Number(inputs.tenure || 0);

  const i = annualRate / 12 / 100;
  const n = tenureYears * 12;

  let futureValue = 0;
  if (i === 0) {
    futureValue = monthlyInvestment * n;
  } else {
    futureValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }

  const investedAmount = monthlyInvestment * n;
  const estReturns = futureValue - investedAmount;

  return {
    investedAmount,
    estReturns: Math.max(0, estReturns),
    futureValue,
  };
}

export function lumpsumCalculator(inputs: Record<string, any>) {
  const principal = Number(inputs.principal || 0);
  const rate = Number(inputs.rate || 0);
  const tenureYears = Number(inputs.tenure || 0);

  const futureValue = principal * Math.pow(1 + rate / 100, tenureYears);
  const estReturns = futureValue - principal;

  return {
    investedAmount: principal,
    estReturns: Math.max(0, estReturns),
    futureValue,
  };
}

export function compoundInterestCalculator(inputs: Record<string, any>) {
  const principal = Number(inputs.principal || 0);
  const rate = Number(inputs.rate || 0) / 100;
  const time = Number(inputs.time || 0);
  const frequencyVal = Number(inputs.frequency || 1); // compounded times per year

  const totalAmount = principal * Math.pow(1 + rate / frequencyVal, frequencyVal * time);
  const totalInterest = totalAmount - principal;

  return {
    totalAmount,
    totalInterest: Math.max(0, totalInterest),
  };
}

export function simpleInterestCalculator(inputs: Record<string, any>) {
  const principal = Number(inputs.principal || 0);
  const rate = Number(inputs.rate || 0);
  const time = Number(inputs.time || 0);

  const interestAmount = (principal * rate * time) / 100;
  const totalAmount = principal + interestAmount;

  return {
    interestAmount,
    totalAmount,
  };
}

export function percentageCalculator(inputs: Record<string, any>) {
  const valA = Number(inputs.valA || 0);
  const valB = Number(inputs.valB || 0);
  const operation = inputs.operation || "percentageOf"; // percentageOf, percentIs, change

  let result = 0;
  let explanation = "";

  if (operation === "percentageOf") {
    // What is A% of B?
    result = (valA * valB) / 100;
    explanation = `${valA}% of ${valB} is ${result}`;
  } else if (operation === "percentIs") {
    // A is what % of B?
    result = valB !== 0 ? (valA / valB) * 100 : 0;
    explanation = `${valA} is ${result.toFixed(2)}% of ${valB}`;
  } else {
    // Percentage increase/decrease from A to B
    if (valA !== 0) {
      result = ((valB - valA) / valA) * 100;
      explanation = `The percentage change from ${valA} to ${valB} is ${result.toFixed(2)}%`;
    } else {
      result = 0;
      explanation = "Cannot calculate change from zero";
    }
  }

  return {
    result,
    explanation,
  };
}

export function percentageDifferenceCalculator(inputs: Record<string, any>) {
  const valA = Number(inputs.valA || 0);
  const valB = Number(inputs.valB || 0);

  let difference = 0;
  if (valA + valB !== 0) {
    difference = (Math.abs(valA - valB) / ((valA + valB) / 2)) * 100;
  }

  return {
    difference,
  };
}

export function discountCalculator(inputs: Record<string, any>) {
  const originalPrice = Number(inputs.originalPrice || 0);
  const discountPercent = Number(inputs.discountPercent || 0);
  const taxPercent = Number(inputs.taxPercent || 0);

  const savings = (originalPrice * discountPercent) / 100;
  const salePrice = originalPrice - savings;
  const taxAmount = (salePrice * taxPercent) / 100;
  const finalPrice = salePrice + taxAmount;

  return {
    savings,
    salePrice,
    taxAmount,
    finalPrice,
  };
}

export function profitMarginCalculator(inputs: Record<string, any>) {
  const cost = Number(inputs.cost || 0);
  const revenue = Number(inputs.revenue || 0);

  const profit = revenue - cost;
  const margin = revenue !== 0 ? (profit / revenue) * 100 : 0;
  const markup = cost !== 0 ? (profit / cost) * 100 : 0;

  return {
    profit,
    margin,
    markup,
  };
}

export function roiCalculator(inputs: Record<string, any>) {
  const invested = Number(inputs.invested || 0);
  const returned = Number(inputs.returned || 0);

  const gain = returned - invested;
  const roi = invested !== 0 ? (gain / invested) * 100 : 0;

  return {
    gain,
    roi,
  };
}

export function breakEvenCalculator(inputs: Record<string, any>) {
  const fixedCosts = Number(inputs.fixedCosts || 0);
  const variableCost = Number(inputs.variableCost || 0);
  const sellingPrice = Number(inputs.sellingPrice || 0);

  const marginPerUnit = sellingPrice - variableCost;
  const breakEvenUnits = marginPerUnit > 0 ? fixedCosts / marginPerUnit : 0;
  const breakEvenRevenue = breakEvenUnits * sellingPrice;

  return {
    breakEvenUnits: Math.ceil(breakEvenUnits),
    breakEvenRevenue,
  };
}

export function cagrCalculator(inputs: Record<string, any>) {
  const startValue = Number(inputs.startValue || 0);
  const endValue = Number(inputs.endValue || 0);
  const tenure = Number(inputs.tenure || 1);

  let cagr = 0;
  if (startValue > 0 && endValue > 0 && tenure > 0) {
    cagr = (Math.pow(endValue / startValue, 1 / tenure) - 1) * 100;
  }

  return {
    cagr,
  };
}

export function inflationCalculator(inputs: Record<string, any>) {
  const amount = Number(inputs.amount || 0);
  const rate = Number(inputs.rate || 0);
  const tenure = Number(inputs.tenure || 0);
  const type = inputs.type || "future"; // future or past

  let adjustedValue = 0;
  if (type === "future") {
    adjustedValue = amount * Math.pow(1 + rate / 100, tenure);
  } else {
    adjustedValue = amount / Math.pow(1 + rate / 100, tenure);
  }

  return {
    adjustedValue,
  };
}
