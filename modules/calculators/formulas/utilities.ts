export function tipCalculator(inputs: Record<string, any>) {
  const billAmount = Number(inputs.billAmount || 0);
  const tipPercent = Number(inputs.tipPercent || 15);
  const people = Math.max(1, Number(inputs.people || 1));

  const tipAmount = (billAmount * tipPercent) / 100;
  const totalBill = billAmount + tipAmount;

  return {
    tipAmount,
    totalBill,
    tipPerPerson: tipAmount / people,
    totalPerPerson: totalBill / people,
  };
}

export function fuelCostCalculator(inputs: Record<string, any>) {
  const distance = Number(inputs.distance || 0);
  const efficiency = Number(inputs.efficiency || 1); // mpg or L/100km
  const price = Number(inputs.price || 0);
  const unitType = inputs.unitType || "metric"; // metric (L/100km) or imperial (mpg)

  let fuelRequired = 0;
  if (unitType === "metric") {
    fuelRequired = (distance / 100) * efficiency;
  } else {
    // mpg
    fuelRequired = efficiency > 0 ? distance / efficiency : 0;
  }

  const totalCost = fuelRequired * price;

  return {
    fuelRequired,
    totalCost,
  };
}

export function electricityBillCalculator(inputs: Record<string, any>) {
  const wattage = Number(inputs.wattage || 0); // Watts
  const hours = Number(inputs.hours || 0); // hours per day
  const cost = Number(inputs.cost || 0); // cost per kWh
  const period = Number(inputs.period || 30); // days

  // Wh = W * h * days
  // kWh = Wh / 1000
  const energyConsumed = (wattage * hours * period) / 1000;
  const totalCost = energyConsumed * cost;

  return {
    energyConsumed,
    totalCost,
  };
}

export function salaryCalculator(inputs: Record<string, any>) {
  const salary = Number(inputs.salary || 0);
  const period = inputs.period || "annual"; // hourly, weekly, monthly, annual
  const hoursPerWeek = Number(inputs.hoursPerWeek || 40);

  let annualSalary = 0;

  switch (period) {
    case "hourly":
      annualSalary = salary * hoursPerWeek * 52;
      break;
    case "weekly":
      annualSalary = salary * 52;
      break;
    case "monthly":
      annualSalary = salary * 12;
      break;
    case "annual":
    default:
      annualSalary = salary;
      break;
  }

  const monthly = annualSalary / 12;
  const weekly = annualSalary / 52;
  const daily = annualSalary / (52 * 5); // Assumes 5 working days/week
  const hourly = annualSalary / (52 * hoursPerWeek);

  return {
    hourly,
    daily,
    weekly,
    monthly,
    annual: annualSalary,
  };
}

const GRADE_PATTERN = /^(O|A\+?|B\+?|C\+?|D\+?|E\+?|F|S|P|N|U|W)$/i;
const CODE_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9-]{4,12}$/;

export interface ParsedGradeRow {
  code: string;
  subject: string;
  grade: string;
  gradePoint: number;
  credits: number;
}

export function parseGradeSheet(bulkData: string): ParsedGradeRow[] {
  if (!bulkData) return [];
  const rows: ParsedGradeRow[] = [];

  const lines = bulkData.split(/\r?\n/);
  for (const rawLine of lines) {
    let tokens = rawLine.split(/\t+|\s{2,}/).map((t) => t.trim()).filter(Boolean);
    if (tokens.length < 3) {
      tokens = rawLine.split(/\s+/).map((t) => t.trim()).filter(Boolean);
    }
    if (tokens.length < 3) continue;

    const numericIdx: number[] = [];
    tokens.forEach((t, i) => {
      if (/^\d+(\.\d+)?$/.test(t)) numericIdx.push(i);
    });
    if (numericIdx.length === 0) continue;

    const gradePointIdx = numericIdx[numericIdx.length - 1];
    const creditsIdx = numericIdx[0];
    const gradePoint = parseFloat(tokens[gradePointIdx]);
    const credits = creditsIdx === gradePointIdx ? 1 : parseFloat(tokens[creditsIdx]);

    let gradeIdx = gradePointIdx - 1;
    while (gradeIdx > creditsIdx && !GRADE_PATTERN.test(tokens[gradeIdx])) {
      gradeIdx--;
    }
    if (gradeIdx <= creditsIdx) gradeIdx = gradePointIdx - 1;
    const grade = tokens[gradeIdx];

    let codeIdx = -1;
    for (let i = creditsIdx + 1; i < gradeIdx; i++) {
      if (CODE_PATTERN.test(tokens[i])) {
        codeIdx = i;
        break;
      }
    }

    const start = codeIdx !== -1 ? codeIdx + 1 : creditsIdx + 1;
    const subject = tokens.slice(start, gradeIdx).join(" ").trim() || "Subject";

    rows.push({
      code: codeIdx !== -1 ? tokens[codeIdx] : "",
      subject,
      grade,
      gradePoint,
      credits,
    });
  }

  return rows;
}

export function cgpaCalculator(inputs: Record<string, any>) {
  const bulkData = String(inputs.bulkData || "").trim();
  const scale = inputs.scale || "10"; // "10" or "4"

  let rows: ParsedGradeRow[] = [];
  let totalGradePoints = Number(inputs.totalGradePoints || 0);
  let totalCredits = Number(inputs.totalCredits || 0);

  if (bulkData) {
    rows = parseGradeSheet(bulkData);
    if (rows.length > 0) {
      totalGradePoints = rows.reduce((sum, r) => sum + r.gradePoint * r.credits, 0);
      totalCredits = rows.reduce((sum, r) => sum + r.credits, 0);
    }
  }

  const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  const percentage =
    scale === "4" ? (cgpa / 4) * 100 : cgpa * 9.5;

  let classification = "Below Average";
  if (scale === "4") {
    if (cgpa >= 3.7) classification = "Excellent";
    else if (cgpa >= 3.3) classification = "Very Good";
    else if (cgpa >= 3.0) classification = "Good";
    else if (cgpa >= 2.0) classification = "Satisfactory";
  } else {
    if (cgpa >= 9) classification = "Outstanding";
    else if (cgpa >= 8) classification = "Excellent";
    else if (cgpa >= 7) classification = "Very Good";
    else if (cgpa >= 6) classification = "Good";
    else if (cgpa >= 5) classification = "Average";
  }

  const parsedRows = rows.map((r) => ({
    code: r.code,
    subject: r.subject,
    grade: r.grade,
    gradePoint: r.gradePoint,
    credits: r.credits,
  }));

  return {
    cgpa: Math.round(cgpa * 100) / 100,
    percentage: Math.round(percentage * 100) / 100,
    classification,
    subjectsDetected: rows.length,
    totalGradePoints: Math.round(totalGradePoints * 100) / 100,
    totalCredits,
    rows: parsedRows,
  };
}

export function incomeTaxCalculatorIndia(inputs: Record<string, any>) {
  const income = Number(inputs.income || 0);
  const deductions = Number(inputs.deductions || 0); // only applies for old regime

  // Standard deduction in New Regime is ₹75,000 for FY 2025-26 / 2026-27 (previously ₹50,000)
  // Let's implement New Tax Regime (FY 2025-26 / 2026-27):
  // Up to ₹3,00,000: Nil
  // ₹3,00,001 - ₹7,00,000: 5%
  // ₹7,00,001 - ₹10,00,000: 10%
  // ₹10,00,001 - ₹12,00,000: 15%
  // ₹12,00,001 - ₹15,00,000: 20%
  // Above ₹15,00,000: 30%
  
  const stdDeductionNew = 75000;
  const taxableIncomeNew = Math.max(0, income - stdDeductionNew);
  
  let taxNew = 0;
  if (taxableIncomeNew > 700000) { // Under section 87A, rebate is available if taxable income <= 7L
    let tempIncome = taxableIncomeNew;
    
    if (tempIncome > 1500000) {
      taxNew += (tempIncome - 1500000) * 0.30;
      tempIncome = 1500000;
    }
    if (tempIncome > 1200000) {
      taxNew += (tempIncome - 1200000) * 0.20;
      tempIncome = 1200000;
    }
    if (tempIncome > 1000000) {
      taxNew += (tempIncome - 1000000) * 0.15;
      tempIncome = 1000000;
    }
    if (tempIncome > 700000) {
      taxNew += (tempIncome - 700000) * 0.10;
      tempIncome = 700000;
    }
    if (tempIncome > 300000) {
      taxNew += (tempIncome - 300000) * 0.05;
    }
  }

  // Health and Education Cess is 4% of the tax
  const cessNew = taxNew * 0.04;
  const totalTaxNew = taxNew + cessNew;

  // Let's also do a simple Old Regime calculation (for comparison)
  // Standard deduction old regime = ₹50,000
  const stdDeductionOld = 50000;
  const taxableIncomeOld = Math.max(0, income - stdDeductionOld - deductions);
  let taxOld = 0;
  
  if (taxableIncomeOld > 500000) {
    let tempIncome = taxableIncomeOld;
    if (tempIncome > 1000000) {
      taxOld += (tempIncome - 1000000) * 0.30;
      tempIncome = 1000000;
    }
    if (tempIncome > 500000) {
      taxOld += (tempIncome - 500000) * 0.20;
      tempIncome = 500000;
    }
    if (tempIncome > 250000) {
      taxOld += (tempIncome - 250000) * 0.05;
    }
  }
  const cessOld = taxOld * 0.04;
  const totalTaxOld = taxOld + cessOld;

  return {
    taxNew: totalTaxNew,
    taxOld: totalTaxOld,
    effectiveTaxRate: income > 0 ? (totalTaxNew / income) * 100 : 0,
  };
}
