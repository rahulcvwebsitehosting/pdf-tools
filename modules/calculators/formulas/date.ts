export function ageCalculator(inputs: Record<string, any>) {
  const dobStr = inputs.dob;
  const targetStr = inputs.targetDate || new Date().toISOString().split("T")[0];

  if (!dobStr) return { years: 0, months: 0, days: 0, text: "Provide a valid birth date" };

  const dob = new Date(dobStr);
  const target = new Date(targetStr);

  if (target < dob) {
    return { years: 0, months: 0, days: 0, text: "Target date is before date of birth" };
  }

  let years = target.getFullYear() - dob.getFullYear();
  let months = target.getMonth() - dob.getMonth();
  let days = target.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    // Get last day of previous month
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = target.getTime() - dob.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    text: `${years} years, ${months} months, and ${days} days old`,
  };
}

export function birthdayCountdown(inputs: Record<string, any>) {
  const dobStr = inputs.dob;
  if (!dobStr) return { days: 0, hours: 0, text: "Provide birth date" };

  const dob = new Date(dobStr);
  const now = new Date();

  const nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBday < now) {
    nextBday.setFullYear(now.getFullYear() + 1);
  }

  const diffMs = nextBday.getTime() - now.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days,
    hours,
    minutes,
    text: `${days} days, ${hours} hours, and ${minutes} minutes until your next birthday!`,
  };
}

export function daysBetweenDates(inputs: Record<string, any>) {
  const dateAStr = inputs.dateA;
  const dateBStr = inputs.dateB;

  if (!dateAStr || !dateBStr) return { totalDays: 0, text: "Provide start and end dates" };

  const dA = new Date(dateAStr);
  const dB = new Date(dateBStr);

  const diffMs = Math.abs(dB.getTime() - dA.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    totalDays,
    text: `${totalDays} calendar days between dates`,
  };
}

export function businessDaysCalculator(inputs: Record<string, any>) {
  const startStr = inputs.startDate;
  const endStr = inputs.endDate;
  const excludeWeekends = inputs.excludeWeekends !== false; // default true
  const includeBoundary = inputs.includeBoundary === true;

  if (!startStr || !endStr) return { businessDays: 0, totalDays: 0 };

  const start = new Date(startStr);
  const end = new Date(endStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { businessDays: 0, totalDays: 0 };
  }

  // Ensure start is before end
  const s = new Date(Math.min(start.getTime(), end.getTime()));
  const e = new Date(Math.max(start.getTime(), end.getTime()));

  let totalDays = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
  if (includeBoundary) totalDays += 1;

  let businessDays = 0;
  let weekendDays = 0;

  const current = new Date(s);
  const targetTime = includeBoundary ? e.getTime() + 1000 : e.getTime();

  while (current.getTime() < targetTime) {
    const day = current.getDay();
    const isWeekend = day === 0 || day === 6; // Sunday or Saturday
    if (isWeekend) {
      weekendDays++;
      if (!excludeWeekends) {
        businessDays++;
      }
    } else {
      businessDays++;
    }
    current.setDate(current.getDate() + 1);
  }

  return {
    totalDays,
    businessDays,
    weekendDays,
  };
}

export function timeDurationCalculator(inputs: Record<string, any>) {
  const startTime = inputs.startTime; // HH:MM
  const endTime = inputs.endTime; // HH:MM

  if (!startTime || !endTime) return { hours: 0, minutes: 0 };

  const [sH, sM] = startTime.split(":").map(Number);
  const [eH, eM] = endTime.split(":").map(Number);

  let diffMins = (eH * 60 + eM) - (sH * 60 + sM);
  if (diffMins < 0) {
    diffMins += 24 * 60; // Assume crosses midnight
  }

  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;

  return {
    hours,
    minutes,
    totalMinutes: diffMins,
  };
}
