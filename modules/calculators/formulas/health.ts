export function bmiCalculator(inputs: Record<string, any>) {
  const weight = Number(inputs.weight || 0); // kg
  const height = Number(inputs.height || 0) / 100; // cm to meters

  if (height === 0) return { bmi: 0, category: "Invalid input" };

  const bmi = weight / (height * height);

  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  const minNormalWeight = 18.5 * (height * height);
  const maxNormalWeight = 24.9 * (height * height);

  return {
    bmi,
    category,
    healthyRange: `${minNormalWeight.toFixed(1)} kg - ${maxNormalWeight.toFixed(1)} kg`,
  };
}

export function bmrCalculator(inputs: Record<string, any>) {
  const gender = inputs.gender || "male";
  const weight = Number(inputs.weight || 0); // kg
  const height = Number(inputs.height || 0); // cm
  const age = Number(inputs.age || 0); // years

  let bmr = 0;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return { bmr };
}

export function bodyFatCalculator(inputs: Record<string, any>) {
  const gender = inputs.gender || "male";
  const height = Number(inputs.height || 0); // cm
  const neck = Number(inputs.neck || 0); // cm
  const waist = Number(inputs.waist || 0); // cm
  const hip = Number(inputs.hip || 0); // cm (required for female)

  // US Navy circumference method requires inches
  const heightIn = height / 2.54;
  const neckIn = neck / 2.54;
  const waistIn = waist / 2.54;
  const hipIn = hip / 2.54;

  let bodyFat = 0;

  if (gender === "male") {
    if (waistIn > neckIn) {
      bodyFat = 86.010 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
    }
  } else {
    if (waistIn + hipIn > neckIn) {
      bodyFat = 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
    }
  }

  bodyFat = Math.max(2, Math.min(60, bodyFat));
  if (isNaN(bodyFat)) bodyFat = 0;

  return {
    bodyFat,
    category: getBodyFatCategory(bodyFat, gender),
  };
}

function getBodyFatCategory(bf: number, gender: string): string {
  if (gender === "male") {
    if (bf < 6) return "Essential fat";
    if (bf < 14) return "Athletes";
    if (bf < 18) return "Fitness";
    if (bf < 25) return "Acceptable";
    return "Obese";
  } else {
    if (bf < 14) return "Essential fat";
    if (bf < 21) return "Athletes";
    if (bf < 25) return "Fitness";
    if (bf < 32) return "Acceptable";
    return "Obese";
  }
}

export function calorieCalculator(inputs: Record<string, any>) {
  const bmrResult = bmrCalculator(inputs);
  const bmr = bmrResult.bmr;
  const activity = Number(inputs.activity || 1.2); // activity multiplier

  const maintenance = bmr * activity;
  const loseWeight = maintenance - 500;
  const gainWeight = maintenance + 500;

  return {
    bmr,
    maintenanceCalories: maintenance,
    loseWeightCalories: Math.max(1200, loseWeight),
    gainWeightCalories: gainWeight,
  };
}

export function waterIntakeCalculator(inputs: Record<string, any>) {
  const weight = Number(inputs.weight || 0); // kg
  const exercise = Number(inputs.exercise || 0); // minutes/day

  // Baseline: 35 ml per kg of body weight
  // Plus: 350 ml for every 30 minutes of physical activity
  const baseline = weight * 35;
  const activeExtra = (exercise / 30) * 350;
  const totalMl = baseline + activeExtra;

  const liters = totalMl / 1000;
  const cups = totalMl / 240; // 240 ml per cup

  return {
    liters,
    cups,
  };
}

export function pregnancyDueDateCalculator(inputs: Record<string, any>) {
  const lmpStr = inputs.lmp;
  const cycleDays = Number(inputs.cycleLength || 28);

  if (!lmpStr) return { dueDate: "", gestationalAge: "" };

  const lmp = new Date(lmpStr);
  if (isNaN(lmp.getTime())) return { dueDate: "", gestationalAge: "" };

  // Naegele's rule is LMP + 280 days + (cycleDays - 28)
  const daysToAdd = 280 + (cycleDays - 28);
  const dueDate = new Date(lmp.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

  const now = new Date();
  const diffMs = now.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;

  return {
    dueDate: dueDate.toISOString().split("T")[0],
    gestationalAge: `${weeks} weeks, ${days} days`,
    progressPercent: Math.max(0, Math.min(100, (diffDays / 280) * 100)),
  };
}

export function ovulationCalculator(inputs: Record<string, any>) {
  const lmpStr = inputs.lmp;
  const cycleDays = Number(inputs.cycleLength || 28);

  if (!lmpStr) return { ovulationDay: "", fertileStart: "", fertileEnd: "" };

  const lmp = new Date(lmpStr);
  if (isNaN(lmp.getTime())) return { ovulationDay: "", fertileStart: "", fertileEnd: "" };

  // Ovulation usually occurs cycleDays - 14 days after LMP
  const ovulationDaysAfter = cycleDays - 14;
  const ovulationDay = new Date(lmp.getTime() + ovulationDaysAfter * 24 * 60 * 60 * 1000);

  // Fertile window is 5 days before ovulation and ovulation day itself
  const fertileStart = new Date(ovulationDay.getTime() - 5 * 24 * 60 * 60 * 1000);
  const fertileEnd = ovulationDay;

  const nextPeriod = new Date(lmp.getTime() + cycleDays * 24 * 60 * 60 * 1000);

  return {
    ovulationDay: ovulationDay.toISOString().split("T")[0],
    fertileStart: fertileStart.toISOString().split("T")[0],
    fertileEnd: fertileEnd.toISOString().split("T")[0],
    nextPeriod: nextPeriod.toISOString().split("T")[0],
  };
}
