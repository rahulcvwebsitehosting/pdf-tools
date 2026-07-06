import type { EntityRef } from "../schema";

export const bmi: EntityRef = {
  id: "bmi",
  slug: "bmi",
  name: "BMI",
  aliases: ["Body Mass Index", "BMI Score"],
  description:
    "A numerical index calculated from a person's weight and height (kg/m²) used as a screening tool for weight categories. BMI provides a quick population-level health indicator but does not measure body fat directly.",
  category: "health",
  relatedEntities: ["emi"],
  relatedTools: ["bmi-calculator"],
};
