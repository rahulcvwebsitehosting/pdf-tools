import type { GuideContent } from "../schema";
import {
  defaultGenerationMeta,
  defaultScores,
  defaultAnalytics,
  defaultLocalization,
  defaultAuthor,
  defaultRelationships,
  defaultRecommendations,
  defaultAIBlocks,
  defaultMeta,
} from "../schema";

export const calculateEmiGuide: GuideContent = {
  // ─── Identity ───────────────────────────────────────────────────────
  id: "guide.calculate-emi",
  type: "guide",
  slug: "how-to-calculate-emi",
  title: "How to Calculate EMI",
  description:
    "Learn how monthly loan installments are calculated. Complete formula guide for Home, Car, and Personal loans.",
  seoTitle:
    "How to Calculate Loan EMI Online | Amortization Guide | ToolsAtZero",
  metaDescription:
    "Learn the formula and math behind Equated Monthly Installments (EMIs). Step-by-step guide to calculating loans privately.",
  keywords: [
    "how to calculate emi",
    "loan emi formula",
    "monthly payment math",
    "calculate emi locally",
    "personal loan payment",
    "home loan emi",
    "car loan calculator",
    "amortization schedule",
    "reducing balance method",
  ],
  entityIds: [
    "entity.emi",
    "entity.amortization",
    "entity.compound-interest",
    "entity.reducing-balance",
  ],
  status: "published",

  // ─── Meta ───────────────────────────────────────────────────────────
  meta: defaultMeta({
    topicId: "calculator.emi",
    difficulty: "intermediate",
    readingTimeMinutes: 7,
    targetAudience: [
      "first-time borrowers",
      "homebuyers",
      "car buyers",
      "financial planners",
      "students studying finance",
    ],
    searchIntents: ["informational", "how-to", "calculation"],
    aliases: [
      "emi formula",
      "loan installment calculator",
      "monthly payment formula",
      "equated monthly installment",
    ],
  }),
  generation: defaultGenerationMeta(),
  scores: defaultScores(),
  analytics: defaultAnalytics({ priority: 7, expectedTraffic: "high" }),
  localization: defaultLocalization(),
  author: defaultAuthor(),

  // ─── Relationships ──────────────────────────────────────────────────
  relationships: defaultRelationships({
    parents: ["category.calculator-tools"],
    siblings: ["guide.what-is-bmi"],
    relatedGuides: ["guide.what-is-bmi", "guide.merge-pdf"],
    relatedComparisons: ["comparison.flat-vs-reducing-rate"],
    relatedCategories: ["category.calculator-tools", "category.finance-tools"],
  }),
  recommendations: defaultRecommendations({
    beginner: ["guide.what-is-bmi"],
    next: ["guide.merge-pdf", "guide.compress-images"],
    advanced: ["guide.json-formatter"],
  }),

  // ─── AI Blocks ──────────────────────────────────────────────────────
  aiBlocks: defaultAIBlocks({
    aiSummary:
      "EMI (Equated Monthly Installment) is the fixed amount a borrower pays each month to repay a loan. The formula EMI = [P × R × (1+R)^N] / [(1+R)^N − 1] uses principal (P), monthly interest rate (R), and tenure in months (N). Early payments are interest-heavy; later payments are principal-heavy. Client-side calculators let users explore scenarios without sharing financial data.",
    keyTakeaways: [
      "EMI = [P × R × (1+R)^N] / [(1+R)^N − 1] where P = principal, R = monthly rate, N = months",
      "Banks use the reducing balance method — interest is charged only on the outstanding principal",
      "Longer tenure means lower EMI but significantly higher total interest paid",
      "Prepayments reduce outstanding principal, saving interest over the remaining tenure",
      "Never input real financial data into server-based calculators — use client-side tools",
    ],
    quickFacts: [
      "On a 20-year home loan, you may pay more in total interest than the original principal amount",
      "The reducing balance method charges less total interest than the flat rate method for the same stated rate",
      "A 1% reduction in interest rate on a ₹50 lakh / $60K loan can save ₹4-7 lakh / $15-25K over 20 years",
      "EMI remains constant throughout the loan term, but the interest-to-principal ratio shifts each month",
      "Processing fees typically add 0.5-2% to the effective cost of a loan",
    ],
    expertTips: [
      "Compare loans using the effective annual rate (EAR), not the nominal rate, to account for compounding frequency",
      "Use an amortization table to see exactly how much of each payment goes to interest vs. principal",
      "Making one extra EMI payment per year can shorten a 20-year loan by 2-3 years",
    ],
  }),

  // ─── Quick Answer ──────────────────────────────────────────────────
  quickAnswer:
    "EMI is calculated using the formula EMI = [P × R × (1+R)^N] / [(1+R)^N − 1], where P is the loan principal, R is the monthly interest rate (annual rate ÷ 12 ÷ 100), and N is the tenure in months. For example, a ₹10 lakh loan at 8% annual interest for 5 years yields an EMI of approximately ₹20,276.",

  // ─── Introduction ──────────────────────────────────────────────────
  introduction:
    "Whether buying a home or a car, calculating your Equated Monthly Installment (EMI) helps you budget. Learn the exact amortization mathematics used by banks, understand how interest and principal split over time, and how to run calculations privately without sharing your financial details.",

  // ─── Why It Matters ────────────────────────────────────────────────
  whyItMatters:
    "Understanding EMI math prevents borrowers from overcommitting financially. A difference of just 0.5% in interest rate or 2 years in tenure can change total repayment by lakhs or thousands of dollars. Running your own calculations empowers informed negotiation with lenders.",

  // ─── Table of Contents ─────────────────────────────────────────────
  toc: [
    "Understanding the EMI Formula",
    "Steps to Calculate Loan Installments",
    "Amortization and Interest Splitting",
    "Tips to Lower Your Monthly Payments",
    "Flat Rate vs Reducing Balance",
    "Troubleshooting Common Errors",
    "Frequently Asked Questions",
  ],

  // ─── Steps ─────────────────────────────────────────────────────────
  steps: [
    "Open the EMI Calculator on ToolsAtZero.",
    "Set your regional currency code using the searchable currency picker.",
    "Input the total Loan Principal amount you wish to borrow.",
    "Enter the Annual Interest Rate (%) offered by the lender.",
    "Specify the Loan Tenure in years or months.",
    "Observe the instant installment calculation and monthly breakdown.",
  ],

  // ─── How It Works ──────────────────────────────────────────────────
  howItWorks:
    "The EMI formula uses compound interest mathematics. The annual interest rate is divided by 12 to get the monthly rate (R). The formula EMI = [P × R × (1+R)^N] / [(1+R)^N − 1] calculates the fixed monthly payment that, over N months, exactly repays the principal P plus all accumulated interest. Each month, interest is charged on the remaining balance, and the rest of the EMI reduces the principal. This is the reducing balance method — early payments are interest-heavy, later payments are principal-heavy.",

  // ─── Examples ──────────────────────────────────────────────────────
  examples: [
    "Home loan: ₹50,00,000 at 8.5% for 20 years → EMI ≈ ₹43,391 | Total interest ≈ ₹54,13,840",
    "Car loan: ₹8,00,000 at 9% for 5 years → EMI ≈ ₹16,607 | Total interest ≈ ₹1,96,404",
    "Personal loan: ₹3,00,000 at 12% for 3 years → EMI ≈ ₹9,963 | Total interest ≈ ₹58,668",
    "Education loan: $40,000 at 5% for 10 years → EMI ≈ $424 | Total interest ≈ $10,910",
    "Business loan: ₹20,00,000 at 11% for 7 years → EMI ≈ ₹33,698 | Total interest ≈ ₹8,30,620",
  ],

  // ─── Best Practices ───────────────────────────────────────────────
  bestPractices: [
    "Verify if the interest rate is flat or reducing; bank EMIs are based on the reducing balance method.",
    "Add down payments to lower the principal value and save on interest.",
    "Compare various tenure lengths to balance monthly affordability with overall interest costs.",
    "Factor in processing fees, insurance premiums, and prepayment penalties when comparing loan offers.",
    "Keep your total EMI burden below 40% of monthly income to maintain financial flexibility.",
  ],

  // ─── Common Mistakes ──────────────────────────────────────────────
  commonMistakes: [
    "Confusing reducing balance calculations with flat interest rates.",
    "Forgetting to factor in processing fees or administrative charges.",
    "Inputting sensitive financial balance numbers on sites that log data.",
    "Comparing loans solely on EMI amount without checking total interest payable.",
    "Not accounting for potential interest rate hikes on floating-rate loans.",
  ],

  // ─── Pro Tips ──────────────────────────────────────────────────────
  proTips: [
    "Make one extra EMI payment per year to shorten your loan tenure by 2-3 years on a 20-year mortgage.",
    "Request the amortization schedule from your lender — it reveals exactly when you cross the 50% principal-repaid mark.",
    "For floating-rate loans, stress-test your budget at 2% above the current rate to ensure affordability if rates rise.",
    "If you receive a bonus or windfall, apply it as a lump-sum prepayment to reduce the outstanding principal immediately.",
    "Use the Rule of 72 for quick mental math: divide 72 by the annual interest rate to estimate how many years it takes for interest to double.",
  ],

  // ─── Troubleshooting ──────────────────────────────────────────────
  troubleshooting: [
    {
      question: "My calculated EMI doesn't match the bank's figure.",
      answer:
        "Banks may use a slightly different compounding method or include insurance and processing fees in the EMI. Ask for the effective annual rate (EAR) and the complete amortization schedule.",
    },
    {
      question: "The calculator shows NaN or infinity.",
      answer:
        "This happens when the interest rate is entered as 0 or the tenure is 0. The EMI formula requires both to be positive numbers.",
    },
    {
      question: "Interest rate seems too high compared to advertised rate.",
      answer:
        "You may be comparing a flat rate advertisement with a reducing balance calculation. A 7% flat rate is roughly equivalent to a 12-13% reducing balance rate.",
    },
    {
      question: "Amortization schedule doesn't add up to the total loan amount.",
      answer:
        "Small rounding differences accumulate over hundreds of months. Banks adjust the final EMI to settle the remaining balance exactly.",
    },
    {
      question: "Prepayment option isn't reducing my EMI.",
      answer:
        "Most banks offer two prepayment options: reduce EMI (same tenure) or reduce tenure (same EMI). Confirm which option your lender applied.",
    },
    {
      question: "I entered monthly rate instead of annual rate.",
      answer:
        "The calculator expects the annual rate. If you entered 1% meaning 1% per month, multiply by 12 and enter 12% as the annual rate.",
    },
  ],

  // ─── Benefits ──────────────────────────────────────────────────────
  benefits: [
    "Accurate budgeting — know your exact monthly obligation before signing the loan agreement",
    "Comparison power — evaluate multiple loan offers side-by-side using the same formula",
    "Prepayment planning — calculate how lump-sum payments shorten tenure or reduce EMI",
    "Financial literacy — understand how interest compounds and why tenure length matters exponentially",
    "Privacy — calculate without sharing your income or loan details with any third party",
  ],

  // ─── Limitations ──────────────────────────────────────────────────
  limitations: [
    "The standard formula assumes fixed interest rates — floating-rate loans change EMI periodically",
    "Processing fees, insurance, and GST on interest are not captured by the basic EMI formula",
    "Moratorium periods (grace periods with no payments) require modified amortization calculations",
    "The formula does not account for prepayment penalties that some lenders charge",
  ],

  // ─── Security Notes ───────────────────────────────────────────────
  securityNotes: [
    "Client-side calculators run the EMI formula in JavaScript — your principal amount and income figures are never transmitted",
    "Avoid entering real loan details on server-based calculators that may log inputs for marketing purposes",
    "The tool does not store, cookie, or fingerprint any financial data you enter",
  ],

  // ─── Performance Tips ─────────────────────────────────────────────
  performanceTips: [
    "For amortization tables with 360+ rows (30-year loans), paginate the display to avoid rendering lag",
    "Use BigDecimal-style precision for financial calculations — JavaScript floating-point can introduce rounding errors at high precision",
    "Cache the (1+R)^N computation since it's used twice in the formula",
  ],

  // ─── Use Cases ─────────────────────────────────────────────────────
  useCases: [
    "Home buying: Estimate monthly mortgage payments before house-hunting to set a realistic budget",
    "Car purchase: Compare dealer financing offers by calculating EMIs at different rates and tenures",
    "Education planning: Calculate student loan repayment schedules for post-graduation budgeting",
    "Business expansion: Model loan costs for equipment financing or working capital loans",
    "Debt consolidation: Calculate if consolidating multiple loans into one reduces the total monthly burden",
    "Financial advising: Show clients the long-term impact of tenure and rate changes on total interest",
  ],

  // ─── FAQs ──────────────────────────────────────────────────────────
  faqs: [
    // Existing
    {
      question: "What is the algebraic EMI formula?",
      answer:
        "EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is Principal, R is monthly interest rate, and N is tenure in months.",
    },
    {
      question: "How does prepayment affect EMI?",
      answer:
        "Prepayments reduce the outstanding principal balance, letting you either lower future EMIs or shorten the loan tenure.",
    },
    // What
    {
      question: "What is the reducing balance method?",
      answer:
        "A method where interest is calculated only on the remaining principal after each payment, so interest decreases as you pay down the loan.",
    },
    {
      question: "What is amortization?",
      answer:
        "The process of gradually repaying a loan through scheduled periodic payments that cover both interest and principal portions.",
    },
    {
      question: "What is the difference between EMI and SIP?",
      answer:
        "EMI is a loan repayment installment (you owe money). SIP (Systematic Investment Plan) is an investment installment (you invest money). The math is related but the cash flow direction is opposite.",
    },
    {
      question: "What is a flat interest rate?",
      answer:
        "A flat rate calculates interest on the original principal for the entire tenure, regardless of how much you've repaid. It results in higher total interest than the reducing balance method at the same stated rate.",
    },
    // Who
    {
      question: "Who should use an EMI calculator?",
      answer:
        "Anyone considering a loan — homebuyers, car buyers, students, small business owners, and financial planners comparing offers.",
    },
    // When
    {
      question: "When should I choose a shorter tenure?",
      answer:
        "When you can afford a higher monthly payment. Shorter tenures dramatically reduce total interest — a 15-year mortgage vs. 30-year can save 40-50% in total interest.",
    },
    {
      question: "When does it make sense to prepay a loan?",
      answer:
        "When the interest saved exceeds any prepayment penalty, and when you don't have higher-return investment opportunities for that capital.",
    },
    // Where
    {
      question: "Where can I find my loan's interest rate type?",
      answer:
        "Check your loan agreement or sanction letter. It will specify 'fixed' or 'floating' and the benchmark rate (e.g., MCLR, repo rate, SOFR).",
    },
    // Why
    {
      question: "Why is my first EMI higher than subsequent ones?",
      answer:
        "The first EMI often includes pre-EMI interest — interest accrued between the loan disbursement date and the first EMI date.",
    },
    {
      question: "Why does a small rate change make such a big difference?",
      answer:
        "Compound interest amplifies small rate differences over long tenures. On a 20-year loan, 0.5% higher interest can add several lakhs or thousands of dollars to total repayment.",
    },
    {
      question: "Why do banks prefer the reducing balance method?",
      answer:
        "It's mathematically fairer — borrowers pay interest only on money they still owe. Regulatory bodies in most countries mandate it for transparency.",
    },
    // How
    {
      question: "How do I convert annual rate to monthly rate?",
      answer:
        "Divide the annual rate by 12. For example, 9% annual = 9/12 = 0.75% per month. In the formula, use R = 0.75/100 = 0.0075.",
    },
    {
      question: "How do I calculate total interest payable?",
      answer:
        "Total interest = (EMI × N) − P. Multiply your monthly EMI by the total number of months, then subtract the original principal.",
    },
    {
      question: "How does a floating interest rate affect EMI?",
      answer:
        "When the benchmark rate changes, the lender recalculates the EMI or adjusts the remaining tenure. Your monthly payment may increase or decrease.",
    },
    {
      question: "How do I compare two loan offers?",
      answer:
        "Calculate the total cost of each loan: (EMI × tenure in months) + processing fees + insurance. The lower total cost is the better offer, regardless of which has the lower EMI.",
    },
    // Can
    {
      question: "Can EMI be zero?",
      answer:
        "Only if the principal is zero or the tenure is infinite, neither of which is a real loan scenario. EMI is always a positive value for any valid loan.",
    },
    {
      question: "Can I negotiate my EMI with the bank?",
      answer:
        "You can negotiate the interest rate, which changes the EMI. You can also adjust the tenure. The EMI formula itself is non-negotiable — it's pure mathematics.",
    },
    {
      question: "Can I pay more than my EMI amount?",
      answer:
        "Yes, excess payments are treated as prepayments that reduce the outstanding principal. Check if your loan has a prepayment penalty first.",
    },
    // Should
    {
      question: "Should I choose fixed or floating interest rate?",
      answer:
        "Fixed rates offer payment certainty. Floating rates are typically 0.5-1% lower initially but carry the risk of rate hikes. Choose based on your risk tolerance and rate outlook.",
    },
    {
      question: "Should I maximize my down payment?",
      answer:
        "Generally yes — a larger down payment means a smaller principal, lower EMI, and less total interest. But keep an emergency fund intact.",
    },
    // Is
    {
      question: "Is the EMI formula the same worldwide?",
      answer:
        "Yes, the reducing balance EMI formula is a universal mathematical concept. Currency, tax implications, and regulatory rules differ by country, but the core formula is identical.",
    },
    {
      question: "Is it better to invest surplus money or prepay a loan?",
      answer:
        "Compare the after-tax return on investment with your loan's effective interest rate. If the loan rate is higher, prepaying saves more. If investment returns exceed the loan rate, investing is better.",
    },
    // Does
    {
      question: "Does EMI include insurance and taxes?",
      answer:
        "The basic EMI formula covers only principal and interest. Some lenders bundle insurance premiums or property tax into the payment, increasing the effective monthly amount.",
    },
    {
      question: "Does tenure affect total interest more than rate?",
      answer:
        "Both matter, but tenure has an exponential effect. Doubling the tenure roughly doubles total interest, while a 1% rate change has a proportional (not exponential) impact.",
    },
    {
      question: "Does paying EMI build credit score?",
      answer:
        "Yes. Consistent on-time EMI payments are reported to credit bureaus and improve your credit score over time.",
    },
    {
      question: "Does the calculator work for all currencies?",
      answer:
        "Yes. The EMI formula is currency-agnostic. Enter your principal and rate in any currency — the math is the same.",
    },
  ],

  // ─── Related Questions ─────────────────────────────────────────────
  relatedQuestions: [
    {
      question: "What is an amortization schedule?",
      answer:
        "A table showing each monthly payment's breakdown into interest and principal portions, along with the remaining loan balance after each payment.",
    },
    {
      question: "How do I calculate SIP returns?",
      answer:
        "SIP returns use the future value of annuity formula: FV = P × [((1+R)^N − 1) / R] × (1+R), where P is the monthly investment, R is expected monthly return, and N is months.",
    },
    {
      question: "What is the Rule of 72?",
      answer:
        "A quick estimation: divide 72 by the annual interest rate to get the approximate number of years for an amount to double. At 8% interest, money doubles in about 9 years.",
    },
    {
      question: "How do credit card EMIs work?",
      answer:
        "Credit card EMI converts a purchase into fixed monthly payments at a stated interest rate. The rate is usually higher than personal loans (12-24% annually).",
    },
    {
      question: "What is pre-EMI interest?",
      answer:
        "Interest charged between loan disbursement and the start of the regular EMI cycle. Common in home loans where disbursement happens in stages during construction.",
    },
    {
      question: "How do I calculate EMI for a top-up loan?",
      answer:
        "Treat the top-up as a separate loan with its own principal, rate, and tenure. Calculate its EMI independently and add it to your existing EMI.",
    },
    {
      question: "What is loan-to-value ratio (LTV)?",
      answer:
        "LTV = (Loan Amount / Property Value) × 100. Banks typically lend 75-90% LTV, requiring a 10-25% down payment from the borrower.",
    },
    {
      question: "How does GST affect loan costs?",
      answer:
        "In India, 18% GST is charged on processing fees and insurance premiums, not on interest. This adds to the upfront loan cost.",
    },
    {
      question: "What happens if I miss an EMI payment?",
      answer:
        "You incur a late payment fee, the missed amount accrues interest, and your credit score is negatively impacted. Multiple misses can trigger loan default proceedings.",
    },
    {
      question: "Can I switch from fixed to floating rate mid-loan?",
      answer:
        "Many lenders allow rate conversion for a fee. Compare the conversion fee against potential interest savings before switching.",
    },
  ],

  // ─── Glossary ──────────────────────────────────────────────────────
  glossary: [
    {
      term: "EMI (Equated Monthly Installment)",
      definition:
        "A fixed monthly payment amount that covers both interest and principal repayment, ensuring a loan is fully repaid over the agreed tenure.",
    },
    {
      term: "Principal",
      definition:
        "The original amount of money borrowed, excluding interest and fees.",
    },
    {
      term: "Amortization",
      definition:
        "The process of spreading a loan repayment over time through scheduled periodic payments of principal and interest.",
    },
    {
      term: "Reducing balance method",
      definition:
        "An interest calculation method where interest is charged only on the outstanding principal balance, decreasing as the loan is repaid.",
    },
    {
      term: "Flat rate method",
      definition:
        "An interest calculation method where interest is computed on the full original principal for the entire tenure, resulting in higher total interest than the reducing balance method.",
    },
    {
      term: "Tenure",
      definition:
        "The total duration of the loan, typically expressed in months or years, over which the borrower repays the principal and interest.",
    },
    {
      term: "Compound interest",
      definition:
        "Interest calculated on both the initial principal and the accumulated interest from previous periods — the basis of the EMI formula.",
    },
    {
      term: "Prepayment",
      definition:
        "An additional payment made toward the loan principal beyond the regular EMI, reducing the outstanding balance and future interest charges.",
    },
    {
      term: "Effective Annual Rate (EAR)",
      definition:
        "The actual annual interest rate accounting for compounding frequency, allowing apples-to-apples comparison between loans with different compounding periods.",
    },
    {
      term: "Moratorium period",
      definition:
        "A grace period during which the borrower is not required to make EMI payments, though interest may continue to accrue on the outstanding principal.",
    },
    {
      term: "MCLR (Marginal Cost of Funds-based Lending Rate)",
      definition:
        "The benchmark interest rate in India below which banks cannot lend. Floating-rate loans are priced as MCLR + a spread.",
    },
    {
      term: "Processing fee",
      definition:
        "A one-time charge by the lender for processing the loan application, typically 0.5-2% of the loan amount.",
    },
  ],

  // ─── Conclusion ────────────────────────────────────────────────────
  conclusion:
    "Understanding the EMI formula empowers you to evaluate loan offers objectively, plan prepayments strategically, and avoid overcommitting financially. Use a client-side calculator to explore scenarios privately, and always compare total cost (EMI × months + fees) rather than EMI amount alone.",

  // ─── Convenience fields ────────────────────────────────────────────
  relatedTools: ["emi-calculator", "loan-calculator", "sip-calculator"],
  relatedGuides: ["what-is-bmi", "how-to-merge-pdf"],
};
