import type { EntityRef } from "../schema";

export const emi: EntityRef = {
  id: "emi",
  slug: "emi",
  name: "EMI",
  aliases: ["Equated Monthly Installment", "Monthly Loan Payment"],
  description:
    "A fixed monthly payment made by a borrower to a lender to repay a loan over a set period. EMI combines both principal and interest components, calculated using the reducing-balance method.",
  category: "finance",
  relatedEntities: ["bmi"],
  relatedTools: ["emi-calculator", "loan-calculator"],
};
