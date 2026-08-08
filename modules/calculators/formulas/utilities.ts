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

const GRADE_PATTERN = /^(O|A\+?|A-|B\+?|B-|C\+?|C-|D\+?|D-|E|F|S|P|N|U|W)$/i;
const RESULT_PATTERN = /^(pass|fail|f|p|r|u|w|ab)$/i;
const CODE_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9-]{4,12}$/;
const CODE_PATTERN_NUM = /^\d{4,15}$/;
const ROLL_NO_PATTERN = /^\d{12,}$/;

const GRADE_POINT_MAP: Record<string, number> = {
  o: 10,
  "a+": 9,
  a: 8,
  "b+": 7,
  b: 6,
  "c+": 5,
  c: 4,
  d: 3,
  e: 2,
  f: 0,
  "a-": 3.7,
  "b-": 2.7,
  "c-": 1.7,
};

export interface ParsedGradeRow {
  code: string;
  subject: string;
  grade: string;
  gradePoint: number;
  credits: number;
  result: string;
}

export function gradePointFor(grade: string): number | null {
  const g = String(grade || "").trim().toLowerCase();
  return GRADE_POINT_MAP[g] !== undefined ? GRADE_POINT_MAP[g] : null;
}

function isHeaderLine(tokens: string[]): boolean {
  const first = tokens[0].toLowerCase();
  const headerStarts = [
    "semester",
    "s.no",
    "sr.no",
    "course",
    "credit",
    "subject",
    "grade",
    "result",
    "marks",
    "code",
    "title",
    "name",
    "serial",
  ];
  if (!headerStarts.some((h) => first.includes(h))) return false;
  const joined = tokens.join(" ").toLowerCase();
  const headerWords = [
    "semester",
    "course code",
    "course title",
    "course name",
    "credit",
    "grade point",
    "result",
    "subject",
    "marks",
  ];
  const matchCount = headerWords.filter((w) => joined.includes(w)).length;
  return matchCount >= 2;
}

function isPlausibleGradePoint(n: number): boolean {
  return n >= 0 && n <= 20;
}

export function parseGradeSheet(bulkData: string): ParsedGradeRow[] {
  if (!bulkData) return [];
  const rows: ParsedGradeRow[] = [];
  const leadingNums: Array<{ row: ParsedGradeRow; num: number }> = [];

  const lines = bulkData.split(/\r?\n/);
  for (const rawLine of lines) {
    let tokens = rawLine.split(/\t+|\s{2,}/).map((t) => t.trim()).filter(Boolean);
    if (tokens.length < 3) {
      tokens = rawLine.split(/\s+/).map((t) => t.trim()).filter(Boolean);
    }
    if (tokens.length < 3) continue;

    // skip student name + roll-number lines (few tokens, one is a long numeric id)
    if (tokens.length <= 3 && tokens.some((t) => ROLL_NO_PATTERN.test(t))) continue;

    const numericIdx: number[] = [];
    tokens.forEach((t, i) => {
      if (/^\d+(\.\d+)?$/.test(t)) numericIdx.push(i);
    });
    if (numericIdx.length === 0) continue;

    // skip header rows (they carry header words and no grade letters)
    if (isHeaderLine(tokens) && !tokens.some((t) => GRADE_PATTERN.test(t))) continue;

    // right-anchored: the last plausible numeric is the grade point
    let gpIdx = -1;
    for (let i = numericIdx.length - 1; i >= 0; i--) {
      const v = parseFloat(tokens[numericIdx[i]]);
      if (isPlausibleGradePoint(v)) {
        gpIdx = numericIdx[i];
        break;
      }
    }
    if (gpIdx === -1) continue;

    const resultToken = tokens[gpIdx + 1] || "";
    const failed = RESULT_PATTERN.test(resultToken) && /^(fail|f|u|w)$/i.test(resultToken);

    // grade letter: nearest grade-like token to the left of the grade point
    let gradeIdx = -1;
    let grade = "";
    for (let i = gpIdx - 1; i >= 0 && i >= gpIdx - 3; i--) {
      if (GRADE_PATTERN.test(tokens[i])) {
        gradeIdx = i;
        grade = tokens[i];
        break;
      }
    }

    if (!grade) {
      // no grade-letter column — subject extends to just before the gp.
      // Do NOT fabricate a grade from the subject text.
      grade = "";
      gradeIdx = gpIdx;
    }

    // trust the pasted grade point from the official transcript; canonical
    // grade-point map is a separate safety net in the SubjectEditor / manual
    // entry path, not in the parser
    let gradePoint = failed ? 0 : parseFloat(tokens[gpIdx]);

    // leading numerics before the grade are serial/semester or credits —
    // ignored here, resolved to credits only when they vary across rows
    const leading = numericIdx.filter((i) => i < gradeIdx);
    const firstLeading = leading.length > 0 ? leading[0] : -1;
    let subjectStart = firstLeading >= 0 ? firstLeading + 1 : 0;

    // course code between the leading numerics and the subject
    let codeIdx = -1;
    for (let i = subjectStart; i < gradeIdx; i++) {
      if (CODE_PATTERN.test(tokens[i]) || CODE_PATTERN_NUM.test(tokens[i])) {
        codeIdx = i;
        break;
      }
    }
    if (codeIdx >= 0) subjectStart = codeIdx + 1;

    const subject = tokens.slice(subjectStart, gradeIdx).join(" ").trim() || "Subject";

    const row: ParsedGradeRow = {
      code: codeIdx >= 0 ? tokens[codeIdx] : "",
      subject,
      grade,
      gradePoint,
      credits: 1,
      result: failed ? "Fail" : "Pass",
    };
    rows.push(row);

    if (firstLeading >= 0) {
      leadingNums.push({ row, num: parseFloat(tokens[firstLeading]) });
    }
  }

  // If the leading numeric column varies across rows (and is not a plain
  // 1,2,3... serial), treat it as credit hours; otherwise it is a serial
  // or semester number and every subject counts with equal weight.
  const nums = leadingNums.map((x) => x.num);
  // require ≥3 rows for serial detection — 2-row [1,2] is too ambiguous
  const isSerial = nums.length >= 3 && nums[0] === 1 && nums.every((n, i) => n === i + 1);
  const useAsCredits = nums.length > 0 && !isSerial && new Set(nums).size > 1;
  if (useAsCredits) {
    // assign the modal credit value to every row so that mixed sheets
    // (some rows with a leading number, some without) are all consistent
    const freq: Record<number, number> = {};
    nums.forEach((n) => (freq[n] = (freq[n] || 0) + 1));
    const modal = +Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
    rows.forEach((r) => {
      const ln = leadingNums.find((x) => x.row === r);
      r.credits = ln ? ln.num : modal;
    });
  }

  return rows;
}

export function cgpaCalculator(inputs: Record<string, any>) {
  const bulkData = String(inputs.bulkData || "").trim();
  const scale = String(inputs.scale || "10") === "4" ? "4" : "10";
  const manual = Array.isArray(inputs.manualSubjects) ? inputs.manualSubjects : [];

  let rows: ParsedGradeRow[] = bulkData ? parseGradeSheet(bulkData) : [];

  // Subjects entered one-by-one (manual mode) are combined with any pasted sheet
  const manualRows: ParsedGradeRow[] = manual
    .filter((m) => m && String(m.subject || "").trim() !== "")
    .map((m) => {
      const grade = String(m.grade || "").toUpperCase();
      const failed = /fail/i.test(String(m.result || "")) || grade === "F";
      const parsedGp = parseFloat(String(m.gradePoint));
      const gradePoint = failed
        ? 0
        : !isNaN(parsedGp)
          ? parsedGp
          : gradePointFor(grade) ?? 0;
      const credits = parseFloat(String(m.credits));
      return {
        code: String(m.code || ""),
        subject: String(m.subject || "").trim(),
        grade,
        gradePoint,
        credits: isNaN(credits) || credits <= 0 ? 1 : credits,
        result: failed ? "Fail" : "Pass",
      };
    });
  rows = [...rows, ...manualRows];

  let totalGradePoints = 0;
  let totalCredits = 0;
  if (rows.length > 0) {
    totalGradePoints = rows.reduce((sum, r) => sum + r.gradePoint * r.credits, 0);
    totalCredits = rows.reduce((sum, r) => sum + r.credits, 0);
  } else {
    totalGradePoints = Number(inputs.totalGradePoints || 0);
    totalCredits = Number(inputs.totalCredits || 0);
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
    result: r.result,
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
