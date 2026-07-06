import * as finance from "./formulas/finance";
import * as converters from "./formulas/converters";
import * as date from "./formulas/date";
import * as health from "./formulas/health";
import * as utilities from "./formulas/utilities";
import * as math from "./formulas/math";
import { ToolRegistryConfig } from "../../lib/tools-engine/registry/types";

export interface CalculatorRegistryEntry extends ToolRegistryConfig {
  calculate: (inputs: Record<string, any>) => any;
}

const formulasMap: Record<string, (inputs: Record<string, any>) => any> = {
  "gst-calculator": finance.gstCalculator,
  "emi-calculator": finance.emiCalculator,
  "loan-calculator": finance.loanCalculator,
  "mortgage-calculator": finance.mortgageCalculator,
  "sip-calculator": finance.sipCalculator,
  "lumpsum-calculator": finance.lumpsumCalculator,
  "compound-interest-calculator": finance.compoundInterestCalculator,
  "simple-interest-calculator": finance.simpleInterestCalculator,
  "percentage-calculator": finance.percentageCalculator,
  "percentage-difference-calculator": finance.percentageDifferenceCalculator,
  "discount-calculator": finance.discountCalculator,
  "profit-margin-calculator": finance.profitMarginCalculator,
  "roi-calculator": finance.roiCalculator,
  "break-even-calculator": finance.breakEvenCalculator,
  "cagr-calculator": finance.cagrCalculator,
  "inflation-calculator": finance.inflationCalculator,
  "currency-converter": converters.currencyConverter,
  "unit-converter": converters.unitConverter,
  "length-converter": converters.lengthConverter,
  "weight-converter": converters.weightConverter,
  "area-converter": converters.areaConverter,
  "volume-converter": converters.volumeConverter,
  "temperature-converter": converters.temperatureConverter,
  "speed-converter": converters.speedConverter,
  "data-storage-converter": converters.dataStorageConverter,
  "age-calculator": date.ageCalculator,
  "birthday-countdown": date.birthdayCountdown,
  "days-between-dates": date.daysBetweenDates,
  "business-days-calculator": date.businessDaysCalculator,
  "time-duration-calculator": date.timeDurationCalculator,
  "bmi-calculator": health.bmiCalculator,
  "bmr-calculator": health.bmrCalculator,
  "body-fat-calculator": health.bodyFatCalculator,
  "calorie-calculator": health.calorieCalculator,
  "water-intake-calculator": health.waterIntakeCalculator,
  "pregnancy-due-date-calculator": health.pregnancyDueDateCalculator,
  "ovulation-calculator": health.ovulationCalculator,
  "tip-calculator": utilities.tipCalculator,
  "fuel-cost-calculator": utilities.fuelCostCalculator,
  "electricity-bill-calculator": utilities.electricityBillCalculator,
  "salary-calculator": utilities.salaryCalculator,
  "income-tax-calculator-india": utilities.incomeTaxCalculatorIndia,
  "scientific-calculator": math.scientificCalculator,
  "binary-calculator": math.binaryCalculator,
  "hex-calculator": math.hexCalculator,
  "fraction-calculator": math.fractionCalculator,
  "matrix-calculator": math.matrixCalculator,
  "quadratic-equation-solver": math.quadraticEquationSolver,
  "prime-number-checker": math.primeNumberChecker,
  "gcd-lcm-calculator": math.gcdLcmCalculator,
};

export const calculatorRegistry: Record<string, CalculatorRegistryEntry> = {
  "gst-calculator": {
    ...{
    "slug": "gst-calculator",
    "title": "GST Calculator",
    "shortTitle": "GST",
    "description": "Calculate Goods and Services Tax (GST) for invoices client-side. Add or remove GST rates easily.",
    "keywords": [
        "gst calculator",
        "goods and services tax",
        "add gst",
        "remove gst"
    ],
    "category": "calculator",
    "icon": "Percent",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate GST tax on items",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Add GST: GST = (Net * Rate) / 100, Gross = Net + GST. Remove GST: Net = Gross / (1 + Rate/100), GST = Gross - Net.",
        "explanation": "Add GST increases net amount by tax rate. Remove GST finds the original base net value from the final gross amount.",
        "workedExample": {
            "expression": "Net = 100, Rate = 18%, Add GST",
            "steps": [
                "GST Amount = 100 * (18 / 100) = 18",
                "Gross Amount = 100 + 18 = 118"
            ],
            "result": "Gross = 118, GST = 18"
        }
    },
    "inputs": [
        {
            "name": "amount",
            "label": "Amount",
            "type": "number",
            "defaultValue": 1000,
            "min": 0
        },
        {
            "name": "rate",
            "label": "GST Rate (%)",
            "type": "number",
            "defaultValue": 18,
            "min": 0
        },
        {
            "name": "type",
            "label": "Calculation Type",
            "type": "select",
            "defaultValue": "add",
            "options": [
                {
                    "label": "Add GST (+)",
                    "value": "add"
                },
                {
                    "label": "Remove GST (-)",
                    "value": "remove"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "netAmount",
            "label": "Net Amount",
            "type": "currency"
        },
        {
            "name": "gstAmount",
            "label": "GST Amount",
            "type": "currency"
        },
        {
            "name": "grossAmount",
            "label": "Gross Amount",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is GST?",
            "answer": "GST stands for Goods and Services Tax, a multi-stage tax applied on consumption."
        },
        {
            "question": "How is GST calculated?",
            "answer": "To add GST, multiply base by rate and divide by 100. To remove it, divide gross by 1 + (rate/100)."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate GST on any amount by choosing Add GST (increases Net) or Remove GST (finds base Net).",
        "aiSummary": "A clean client-side utility to compute GST. Enter values, set the rate, and choose to add or subtract tax.",
        "commonMistakes": [
            "Applying Add GST formula instead of Remove GST formula when seeking base price."
        ],
        "keyTakeaways": [
            "Perfect for merchants and buyers.",
            "Runs offline in browser."
        ],
        "searchIntent": "Calculate GST tax on items",
        "entities": [
            "GST",
            "Tax",
            "Invoice"
        ],
        "semanticTopics": [
            "Taxation",
            "Accounting"
        ],
        "synonyms": [
            "VAT Calculator",
            "Sales Tax Calculator"
        ]
    },
    "geo": {
        "regionalVariations": "GST is standard in India, Canada, Australia, and New Zealand."
    },
    "examples": [
        {
            "title": "Standard 18% Add",
            "inputs": {
                "amount": 100,
                "rate": 18,
                "type": "add"
            },
            "outputs": {
                "grossAmount": 118
            }
        }
    ],
    "relatedTools": [
        "percentage-calculator",
        "discount-calculator"
    ]
},
    calculate: formulasMap["gst-calculator"]
  },
  "emi-calculator": {
    ...{
    "slug": "emi-calculator",
    "title": "EMI Calculator",
    "shortTitle": "EMI",
    "description": "Calculate Equated Monthly Installment (EMI) for home loans, car loans, or personal loans client-side.",
    "keywords": [
        "emi calculator",
        "loan emi",
        "home loan emi",
        "monthly installment"
    ],
    "category": "calculator",
    "icon": "Calculator",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate monthly loan payment",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)",
        "explanation": "P is principal loan amount, r is monthly interest rate (annual / 12 / 100), and n is tenure in months.",
        "workedExample": {
            "expression": "P = 100,000, Annual Rate = 12%, Tenure = 1 Year (12 Months)",
            "steps": [
                "Monthly interest rate r = 12 / 12 / 100 = 0.01",
                "EMI = 100000 * 0.01 * (1.01)^12 / ((1.01)^12 - 1) = 8,884.88"
            ],
            "result": "EMI = 8,884.88"
        }
    },
    "inputs": [
        {
            "name": "principal",
            "label": "Loan Amount",
            "type": "number",
            "defaultValue": 500000,
            "min": 0
        },
        {
            "name": "rate",
            "label": "Annual Interest Rate (%)",
            "type": "number",
            "defaultValue": 8.5,
            "min": 0
        },
        {
            "name": "tenure",
            "label": "Tenure (Years)",
            "type": "number",
            "defaultValue": 5,
            "min": 1
        }
    ],
    "outputs": [
        {
            "name": "emi",
            "label": "Monthly EMI",
            "type": "currency"
        },
        {
            "name": "totalInterest",
            "label": "Total Interest Payable",
            "type": "currency"
        },
        {
            "name": "totalPayment",
            "label": "Total Payment (Principal + Interest)",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is EMI?",
            "answer": "EMI stands for Equated Monthly Installment. It is a fixed payment made by a borrower to a lender at a specified date each calendar month."
        },
        {
            "question": "Can EMI change during the loan?",
            "answer": "Yes, in case of floating interest rate loans, the EMI can change when the underlying interest rate fluctuates."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate monthly Equated Monthly Installments (EMI) for any principal, annual interest rate, and tenure.",
        "aiSummary": "Allows borrowers to quickly estimate monthly cash outflow requirements for amortizing loans.",
        "commonMistakes": [
            "Confusing years and months for tenure input."
        ],
        "keyTakeaways": [
            "Helps plan budgets.",
            "Computes total interest costs."
        ],
        "searchIntent": "Calculate monthly loan payment",
        "entities": [
            "EMI",
            "Interest",
            "Tenure"
        ],
        "semanticTopics": [
            "Loans",
            "Amortization"
        ],
        "synonyms": [
            "Loan Payment Calculator"
        ]
    },
    "geo": {
        "regionalVariations": "Widely used in banking systems globally."
    },
    "examples": [
        {
            "title": "Standard Home Loan",
            "inputs": {
                "principal": 1000000,
                "rate": 8,
                "tenure": 10
            },
            "outputs": {
                "emi": 12132.76
            }
        }
    ],
    "relatedTools": [
        "loan-calculator",
        "mortgage-calculator"
    ]
},
    calculate: formulasMap["emi-calculator"]
  },
  "loan-calculator": {
    ...{
    "slug": "loan-calculator",
    "title": "Loan Calculator",
    "shortTitle": "Loan",
    "description": "Determine monthly payments, total interest, and total costs for fixed-rate loans client-side.",
    "keywords": [
        "loan calculator",
        "fixed rate loan",
        "personal loan",
        "loan payment"
    ],
    "category": "calculator",
    "icon": "DollarSign",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate personal loan payment",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Monthly Payment = P * r * (1 + r)^n / ((1 + r)^n - 1)",
        "explanation": "P is principal amount, r is monthly rate, and n is number of months.",
        "workedExample": {
            "expression": "P = 10,000, Annual Rate = 6%, Tenure = 24 Months",
            "steps": [
                "r = 0.06 / 12 = 0.005",
                "Payment = 10000 * 0.005 * (1.005)^24 / ((1.005)^24 - 1) = 443.21"
            ],
            "result": "Monthly Payment = 443.21"
        }
    },
    "inputs": [
        {
            "name": "principal",
            "label": "Loan Amount",
            "type": "number",
            "defaultValue": 10000,
            "min": 0
        },
        {
            "name": "rate",
            "label": "Annual Interest Rate (%)",
            "type": "number",
            "defaultValue": 6,
            "min": 0
        },
        {
            "name": "tenure",
            "label": "Tenure (Months)",
            "type": "number",
            "defaultValue": 24,
            "min": 1
        }
    ],
    "outputs": [
        {
            "name": "monthlyPayment",
            "label": "Monthly Payment",
            "type": "currency"
        },
        {
            "name": "totalInterest",
            "label": "Total Interest",
            "type": "currency"
        },
        {
            "name": "totalPayment",
            "label": "Total Payment",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "How does this differ from EMI?",
            "answer": "This is a general loan calculator where you specify months instead of years."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate loan costs by entering principal, interest rate, and total months.",
        "aiSummary": "Computes fixed monthly loan payments and interest totals in browser.",
        "commonMistakes": [
            "Mismatch between interest rate periodicity and tenure."
        ],
        "keyTakeaways": [
            "Perfect for short-term loans."
        ],
        "searchIntent": "Calculate personal loan payment",
        "entities": [
            "Loan",
            "Credit",
            "Interest"
        ],
        "semanticTopics": [
            "Finance",
            "Debt"
        ],
        "synonyms": [
            "Personal Loan Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "emi-calculator",
        "mortgage-calculator"
    ]
},
    calculate: formulasMap["loan-calculator"]
  },
  "mortgage-calculator": {
    ...{
    "slug": "mortgage-calculator",
    "title": "Mortgage Calculator",
    "shortTitle": "Mortgage",
    "description": "Estimate monthly home loan mortgage payments including property taxes and insurance client-side.",
    "keywords": [
        "mortgage calculator",
        "home mortgage",
        "piti calculator",
        "house payment"
    ],
    "category": "calculator",
    "icon": "Home",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate house mortgage payment",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "P&I = P * r * (1 + r)^n / ((1 + r)^n - 1) + Property Tax + Insurance",
        "explanation": "Includes principal, interest, annual property tax rates, and annual home insurance.",
        "workedExample": {
            "expression": "Home Value = 300k, Down Payment = 60k (Principal = 240k), Rate = 4.5%, Term = 30 Years, Tax = 1.2%, Insurance = 1200/year",
            "steps": [
                "r = 0.045 / 12 = 0.00375, n = 360",
                "P&I = 1,216.04",
                "Monthly Tax = 300",
                "Monthly Ins = 100"
            ],
            "result": "Total = 1,616.04"
        }
    },
    "inputs": [
        {
            "name": "homeValue",
            "label": "Home Value",
            "type": "number",
            "defaultValue": 300000,
            "min": 0
        },
        {
            "name": "downPayment",
            "label": "Down Payment",
            "type": "number",
            "defaultValue": 60000,
            "min": 0
        },
        {
            "name": "rate",
            "label": "Annual Interest Rate (%)",
            "type": "number",
            "defaultValue": 4.5,
            "min": 0
        },
        {
            "name": "term",
            "label": "Loan Term (Years)",
            "type": "number",
            "defaultValue": 30,
            "min": 1
        },
        {
            "name": "propertyTaxRate",
            "label": "Annual Property Tax Rate (%)",
            "type": "number",
            "defaultValue": 1.2,
            "min": 0
        },
        {
            "name": "insurance",
            "label": "Annual Home Insurance",
            "type": "number",
            "defaultValue": 1200,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "principalAndInterest",
            "label": "Principal & Interest",
            "type": "currency"
        },
        {
            "name": "propertyTax",
            "label": "Property Tax (Monthly)",
            "type": "currency"
        },
        {
            "name": "homeInsurance",
            "label": "Home Insurance (Monthly)",
            "type": "currency"
        },
        {
            "name": "totalMonthly",
            "label": "Total Monthly Payment",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is PITI?",
            "answer": "PITI stands for Principal, Interest, Taxes, and Insurance - the four components of a monthly mortgage payment."
        }
    ],
    "aeo": {
        "quickAnswer": "Estimate monthly mortgage payments including local tax rates and homeowner insurance values.",
        "aiSummary": "Computes home loan mortgage amortizations using customized down payment structures.",
        "commonMistakes": [
            "Forgetting that down payments reduce loan principal."
        ],
        "keyTakeaways": [
            "Includes tax & insurance estimations."
        ],
        "searchIntent": "Calculate house mortgage payment",
        "entities": [
            "Mortgage",
            "Home loan",
            "Real estate"
        ],
        "semanticTopics": [
            "Property",
            "Finance"
        ],
        "synonyms": [
            "Home Loan Calculator"
        ]
    },
    "geo": {
        "regionalVariations": "Property taxes and insurance parameters vary widely by state, region, and city."
    },
    "examples": [],
    "relatedTools": [
        "emi-calculator",
        "loan-calculator"
    ]
},
    calculate: formulasMap["mortgage-calculator"]
  },
  "sip-calculator": {
    ...{
    "slug": "sip-calculator",
    "title": "SIP Calculator",
    "shortTitle": "SIP",
    "description": "Calculate future returns of Systematic Investment Plans (SIP) client-side with compound returns.",
    "keywords": [
        "sip calculator",
        "systematic investment plan",
        "mutual fund sip",
        "investment returns"
    ],
    "category": "calculator",
    "icon": "TrendingUp",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate SIP mutual fund value",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "FV = P * ((1 + i)^n - 1) / i * (1 + i)",
        "explanation": "P is monthly investment, i is monthly rate (annual / 12 / 100), and n is number of months.",
        "workedExample": {
            "expression": "P = 1,000, Rate = 12%, Tenure = 1 Year (12 Months)",
            "steps": [
                "i = 0.01, n = 12",
                "FV = 1000 * ((1.01)^12 - 1) / 0.01 * 1.01 = 12,809.33"
            ],
            "result": "FV = 12,809.33"
        }
    },
    "inputs": [
        {
            "name": "monthlyInvestment",
            "label": "Monthly Investment",
            "type": "number",
            "defaultValue": 5000,
            "min": 0
        },
        {
            "name": "rate",
            "label": "Expected Annual Returns (%)",
            "type": "number",
            "defaultValue": 12,
            "min": 0
        },
        {
            "name": "tenure",
            "label": "Tenure (Years)",
            "type": "number",
            "defaultValue": 10,
            "min": 1
        }
    ],
    "outputs": [
        {
            "name": "investedAmount",
            "label": "Invested Amount",
            "type": "currency"
        },
        {
            "name": "estReturns",
            "label": "Estimated Returns",
            "type": "currency"
        },
        {
            "name": "futureValue",
            "label": "Future Value",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is a Systematic Investment Plan?",
            "answer": "A SIP allows you to invest a fixed amount regularly in mutual funds or securities, leveraging rupee cost averaging."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate SIP growth and compounding mutual fund returns over time.",
        "aiSummary": "Computes total investment vs capital gains for periodic monthly mutual fund SIP plans.",
        "commonMistakes": [
            "Expecting guaranteed returns based on historic averages."
        ],
        "keyTakeaways": [
            "Shows power of compounding."
        ],
        "searchIntent": "Calculate SIP mutual fund value",
        "entities": [
            "SIP",
            "Mutual Funds",
            "Compounding"
        ],
        "semanticTopics": [
            "Investments",
            "Personal Finance"
        ],
        "synonyms": [
            "Periodic Investment Calculator"
        ]
    },
    "geo": {
        "regionalVariations": "Popular for systematic investing in mutual funds in India."
    },
    "examples": [],
    "relatedTools": [
        "lumpsum-calculator",
        "cagr-calculator"
    ]
},
    calculate: formulasMap["sip-calculator"]
  },
  "lumpsum-calculator": {
    ...{
    "slug": "lumpsum-calculator",
    "title": "Lumpsum Calculator",
    "shortTitle": "Lumpsum",
    "description": "Calculate the future maturity value of standard one-time mutual fund or stock investments client-side.",
    "keywords": [
        "lumpsum calculator",
        "lump sum investment",
        "future value calculator"
    ],
    "category": "calculator",
    "icon": "Coins",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate lumpsum investment future value",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "FV = PV * (1 + r)^n",
        "explanation": "PV is principal investment, r is annual return rate (as a fraction), and n is tenure in years.",
        "workedExample": {
            "expression": "PV = 10,000, Rate = 10% (0.1), Tenure = 3 Years",
            "steps": [
                "FV = 10000 * (1.1)^3 = 13,310"
            ],
            "result": "FV = 13,310"
        }
    },
    "inputs": [
        {
            "name": "principal",
            "label": "One-time Investment",
            "type": "number",
            "defaultValue": 100000,
            "min": 0
        },
        {
            "name": "rate",
            "label": "Expected Annual Returns (%)",
            "type": "number",
            "defaultValue": 12,
            "min": 0
        },
        {
            "name": "tenure",
            "label": "Tenure (Years)",
            "type": "number",
            "defaultValue": 10,
            "min": 1
        }
    ],
    "outputs": [
        {
            "name": "investedAmount",
            "label": "Invested Amount",
            "type": "currency"
        },
        {
            "name": "estReturns",
            "label": "Estimated Returns",
            "type": "currency"
        },
        {
            "name": "futureValue",
            "label": "Future Value",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is a lumpsum investment?",
            "answer": "An investment of a large, single sum of money at one time instead of spreading it over time."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate growth of a one-time capital investment over any period.",
        "aiSummary": "Computes capital appreciation and compounding interest on lumpsum investments.",
        "commonMistakes": [
            "Not adjusting for inflation to see real future purchasing power."
        ],
        "keyTakeaways": [
            "Compares invested vs maturity values."
        ],
        "searchIntent": "Calculate lumpsum investment future value",
        "entities": [
            "Lumpsum",
            "Investment",
            "Capital"
        ],
        "semanticTopics": [
            "Investments",
            "Finance"
        ],
        "synonyms": [
            "Compound Interest Investment Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "sip-calculator",
        "compound-interest-calculator"
    ]
},
    calculate: formulasMap["lumpsum-calculator"]
  },
  "compound-interest-calculator": {
    ...{
    "slug": "compound-interest-calculator",
    "title": "Compound Interest Calculator",
    "shortTitle": "Compound Interest",
    "description": "Determine compound interest payouts and total balance values based on compounding frequencies client-side.",
    "keywords": [
        "compound interest",
        "compounding calculator",
        "compound interest frequency"
    ],
    "category": "calculator",
    "icon": "TrendingUp",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate interest compound rate",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "A = P * (1 + r/n)^(n*t)",
        "explanation": "P is principal, r is annual rate, n is compounding frequency per year, and t is time in years.",
        "workedExample": {
            "expression": "P = 1,000, Rate = 5%, Compounded Quarterly (n=4), Time = 2 Years",
            "steps": [
                "A = 1000 * (1 + 0.05/4)^(4*2) = 1000 * (1.0125)^8 = 1,104.49"
            ],
            "result": "Amount = 1,104.49"
        }
    },
    "inputs": [
        {
            "name": "principal",
            "label": "Principal Amount",
            "type": "number",
            "defaultValue": 10000,
            "min": 0
        },
        {
            "name": "rate",
            "label": "Annual Interest Rate (%)",
            "type": "number",
            "defaultValue": 6,
            "min": 0
        },
        {
            "name": "time",
            "label": "Time (Years)",
            "type": "number",
            "defaultValue": 5,
            "min": 1
        },
        {
            "name": "frequency",
            "label": "Compounding Frequency",
            "type": "select",
            "defaultValue": 12,
            "options": [
                {
                    "label": "Annually (1/yr)",
                    "value": 1
                },
                {
                    "label": "Semi-annually (2/yr)",
                    "value": 2
                },
                {
                    "label": "Quarterly (4/yr)",
                    "value": 4
                },
                {
                    "label": "Monthly (12/yr)",
                    "value": 12
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "totalAmount",
            "label": "Total Amount (Balance)",
            "type": "currency"
        },
        {
            "name": "totalInterest",
            "label": "Interest Earned",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is compounding interest?",
            "answer": "Interest calculated on the initial principal and also on the accumulated interest of previous periods."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate interest on interest by choosing compounding frequency intervals.",
        "aiSummary": "Computes compound interest growth for annually, monthly, or quarterly accounts.",
        "commonMistakes": [
            "Assuming simple interest rules when calculation frequency rises."
        ],
        "keyTakeaways": [
            "Frequency impacts returns."
        ],
        "searchIntent": "Calculate interest compound rate",
        "entities": [
            "Compounding",
            "Interest",
            "Principal"
        ],
        "semanticTopics": [
            "Savings",
            "Wealth Building"
        ],
        "synonyms": [
            "Compound Growth Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "simple-interest-calculator",
        "lumpsum-calculator"
    ]
},
    calculate: formulasMap["compound-interest-calculator"]
  },
  "simple-interest-calculator": {
    ...{
    "slug": "simple-interest-calculator",
    "title": "Simple Interest Calculator",
    "shortTitle": "Simple Interest",
    "description": "Calculate standard simple interest values using the principal, rate, and time equation client-side.",
    "keywords": [
        "simple interest",
        "flat interest",
        "loan interest calculator"
    ],
    "category": "calculator",
    "icon": "Percent",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate basic simple interest",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "I = P * R * T / 100",
        "explanation": "P is principal, R is annual interest rate (%), and T is time in years.",
        "workedExample": {
            "expression": "P = 5,000, Rate = 6%, Time = 3 Years",
            "steps": [
                "Interest I = (5000 * 6 * 3) / 100 = 900",
                "Total = 5000 + 900 = 5900"
            ],
            "result": "Interest = 900"
        }
    },
    "inputs": [
        {
            "name": "principal",
            "label": "Principal Amount",
            "type": "number",
            "defaultValue": 5000,
            "min": 0
        },
        {
            "name": "rate",
            "label": "Annual Interest Rate (%)",
            "type": "number",
            "defaultValue": 5,
            "min": 0
        },
        {
            "name": "time",
            "label": "Time (Years)",
            "type": "number",
            "defaultValue": 3,
            "min": 0.1
        }
    ],
    "outputs": [
        {
            "name": "interestAmount",
            "label": "Interest Amount",
            "type": "currency"
        },
        {
            "name": "totalAmount",
            "label": "Total Amount (Principal + Interest)",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is simple interest?",
            "answer": "Interest calculated solely on the original principal sum of a loan or deposit."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate interest earnings under basic fixed simple equations.",
        "aiSummary": "Utility to compute simple flat rate interest on personal loans.",
        "commonMistakes": [
            "Overlooking compounding when evaluating multi-year investments."
        ],
        "keyTakeaways": [
            "Linear growth only."
        ],
        "searchIntent": "Calculate basic simple interest",
        "entities": [
            "Interest",
            "Principal",
            "Loan"
        ],
        "semanticTopics": [
            "Basic Finance",
            "Loans"
        ],
        "synonyms": [
            "Flat Interest Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "compound-interest-calculator",
        "loan-calculator"
    ]
},
    calculate: formulasMap["simple-interest-calculator"]
  },
  "percentage-calculator": {
    ...{
    "slug": "percentage-calculator",
    "title": "Percentage Calculator",
    "shortTitle": "Percentage",
    "description": "Perform versatile percentage calculations: percentage of, finding fractions, and percentage change client-side.",
    "keywords": [
        "percentage calculator",
        "find percent",
        "percent change",
        "percentage increase"
    ],
    "category": "calculator",
    "icon": "Percent",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate percentage value",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Percent Of: (A * B)/100; What Percent: (A/B)*100; Change: ((B - A)/A)*100",
        "explanation": "Calculates proportional ratios, fractional percentages, or relative changes.",
        "workedExample": {
            "expression": "What is 20% of 150?",
            "steps": [
                "(20 * 150) / 100 = 30"
            ],
            "result": "Result = 30"
        }
    },
    "inputs": [
        {
            "name": "valA",
            "label": "Value A",
            "type": "number",
            "defaultValue": 20
        },
        {
            "name": "valB",
            "label": "Value B",
            "type": "number",
            "defaultValue": 150
        },
        {
            "name": "operation",
            "label": "Operation Type",
            "type": "select",
            "defaultValue": "percentageOf",
            "options": [
                {
                    "label": "What is A% of B?",
                    "value": "percentageOf"
                },
                {
                    "label": "A is what % of B?",
                    "value": "percentIs"
                },
                {
                    "label": "Percentage change from A to B?",
                    "value": "change"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Resulting Number / Percent",
            "type": "number"
        },
        {
            "name": "explanation",
            "label": "Calculation Explanation",
            "type": "text"
        }
    ],
    "faq": [
        {
            "question": "How to calculate percent?",
            "answer": "Divide target part by whole and multiply by 100."
        }
    ],
    "aeo": {
        "quickAnswer": "Solve standard percentage proportions, percentage values, or growth changes.",
        "aiSummary": "Computes percentages, fractional changes, and growth statistics instantly.",
        "commonMistakes": [
            "Entering fraction as a percent value directly."
        ],
        "keyTakeaways": [
            "Multi-functional modes."
        ],
        "searchIntent": "Calculate percentage value",
        "entities": [
            "Percentage",
            "Ratio",
            "Proportion"
        ],
        "semanticTopics": [
            "Arithmetic",
            "Math"
        ],
        "synonyms": [
            "Percent Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "percentage-difference-calculator",
        "discount-calculator"
    ]
},
    calculate: formulasMap["percentage-calculator"]
  },
  "percentage-difference-calculator": {
    ...{
    "slug": "percentage-difference-calculator",
    "title": "Percentage Difference Calculator",
    "shortTitle": "Percentage Diff",
    "description": "Calculate the percentage difference between two positive numbers client-side.",
    "keywords": [
        "percentage difference",
        "percent diff",
        "compare numbers"
    ],
    "category": "calculator",
    "icon": "Percent",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate difference percentage",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Diff = |A - B| / ((A + B) / 2) * 100",
        "explanation": "Calculates the difference relative to the average of the two numbers.",
        "workedExample": {
            "expression": "Compare 10 and 15",
            "steps": [
                "|10 - 15| = 5",
                "Average = (10+15)/2 = 12.5",
                "Diff = (5 / 12.5) * 100 = 40%"
            ],
            "result": "Difference = 40%"
        }
    },
    "inputs": [
        {
            "name": "valA",
            "label": "Value A",
            "type": "number",
            "defaultValue": 10,
            "min": 0
        },
        {
            "name": "valB",
            "label": "Value B",
            "type": "number",
            "defaultValue": 15,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "difference",
            "label": "Percentage Difference",
            "type": "percentage"
        }
    ],
    "faq": [
        {
            "question": "What is percentage difference?",
            "answer": "A measure of difference between two numbers calculated relative to their average value."
        }
    ],
    "aeo": {
        "quickAnswer": "Find the percentage difference relative to the mean of two values.",
        "aiSummary": "Calculates relative variation between two numbers compared to their central midpoint.",
        "commonMistakes": [
            "Confusing percentage difference with percentage increase."
        ],
        "keyTakeaways": [
            "Divides by the average value."
        ],
        "searchIntent": "Calculate difference percentage",
        "entities": [
            "Difference",
            "Percentage",
            "Arithmetic"
        ],
        "semanticTopics": [
            "Math",
            "Data Analysis"
        ],
        "synonyms": [
            "Relative Difference Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "percentage-calculator",
        "discount-calculator"
    ]
},
    calculate: formulasMap["percentage-difference-calculator"]
  },
  "discount-calculator": {
    ...{
    "slug": "discount-calculator",
    "title": "Discount Calculator",
    "shortTitle": "Discount",
    "description": "Calculate sale prices, final costs, and consumer tax offsets during sales client-side.",
    "keywords": [
        "discount calculator",
        "sale price",
        "save money",
        "coupon calculator"
    ],
    "category": "calculator",
    "icon": "Percent",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate store discount sale price",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Sale Price = Original - (Original * Discount/100); Final = Sale + (Sale * Tax/100)",
        "explanation": "Finds direct savings and calculates total post-tax retail totals.",
        "workedExample": {
            "expression": "Price = 120, Discount = 25%, Tax = 8%",
            "steps": [
                "Savings = 120 * 0.25 = 30",
                "Sale Price = 90",
                "Tax = 90 * 0.08 = 7.20",
                "Final Price = 97.20"
            ],
            "result": "Final Price = 97.20"
        }
    },
    "inputs": [
        {
            "name": "originalPrice",
            "label": "Original Price ($)",
            "type": "number",
            "defaultValue": 100,
            "min": 0
        },
        {
            "name": "discountPercent",
            "label": "Discount (%)",
            "type": "number",
            "defaultValue": 20,
            "min": 0,
            "max": 100
        },
        {
            "name": "taxPercent",
            "label": "Sales Tax (%)",
            "type": "number",
            "defaultValue": 0,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "savings",
            "label": "You Save",
            "type": "currency"
        },
        {
            "name": "salePrice",
            "label": "Sale Price (Before Tax)",
            "type": "currency"
        },
        {
            "name": "taxAmount",
            "label": "Sales Tax Amount",
            "type": "currency"
        },
        {
            "name": "finalPrice",
            "label": "Final Price (After Tax)",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "How to calculate sale price?",
            "answer": "Subtract savings from original price."
        }
    ],
    "aeo": {
        "quickAnswer": "Enter original tag prices and discounts to compute net savings and post-tax totals.",
        "aiSummary": "Computes sales discounts, coupon savings, and checkout tax calculations in-browser.",
        "commonMistakes": [
            "Double discounting sequentially incorrect math."
        ],
        "keyTakeaways": [
            "Helps plan shopping budgets."
        ],
        "searchIntent": "Calculate store discount sale price",
        "entities": [
            "Discount",
            "Savings",
            "Tax"
        ],
        "semanticTopics": [
            "Shopping",
            "Frugal Finance"
        ],
        "synonyms": [
            "Shopping Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "percentage-calculator",
        "profit-margin-calculator"
    ]
},
    calculate: formulasMap["discount-calculator"]
  },
  "profit-margin-calculator": {
    ...{
    "slug": "profit-margin-calculator",
    "title": "Profit Margin Calculator",
    "shortTitle": "Profit Margin",
    "description": "Determine sales profit margins, markup multipliers, and gross revenue metrics client-side.",
    "keywords": [
        "profit margin",
        "gross margin",
        "markup calculator",
        "revenue profit"
    ],
    "category": "calculator",
    "icon": "Percent",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate gross profit margin",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Profit = Revenue - Cost; Margin (%) = (Profit/Revenue)*100; Markup (%) = (Profit/Cost)*100",
        "explanation": "Compares net profits relative to cost bases and top-line sales revenues.",
        "workedExample": {
            "expression": "Cost = 80, Revenue = 100",
            "steps": [
                "Profit = 100 - 80 = 20",
                "Margin = (20/100)*100 = 20%",
                "Markup = (20/80)*100 = 25%"
            ],
            "result": "Margin = 20%, Markup = 25%"
        }
    },
    "inputs": [
        {
            "name": "cost",
            "label": "Cost of Goods ($)",
            "type": "number",
            "defaultValue": 80,
            "min": 0
        },
        {
            "name": "revenue",
            "label": "Selling Price / Revenue ($)",
            "type": "number",
            "defaultValue": 100,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "profit",
            "label": "Gross Profit",
            "type": "currency"
        },
        {
            "name": "margin",
            "label": "Profit Margin",
            "type": "percentage"
        },
        {
            "name": "markup",
            "label": "Markup",
            "type": "percentage"
        }
    ],
    "faq": [
        {
            "question": "What is the difference between Margin and Markup?",
            "answer": "Margin is profit divided by selling price. Markup is profit divided by cost price."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate business profit parameters, markups, and margin percentages based on asset costs.",
        "aiSummary": "Computes sales profit margins, retail markups, and business unit margins.",
        "commonMistakes": [
            "Assuming markup and margin percentage values are identical."
        ],
        "keyTakeaways": [
            "Crucial for pricing strategies."
        ],
        "searchIntent": "Calculate gross profit margin",
        "entities": [
            "Profit Margin",
            "Markup",
            "Cost"
        ],
        "semanticTopics": [
            "Business Accounting",
            "Sales Planning"
        ],
        "synonyms": [
            "Gross Margin Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "roi-calculator",
        "break-even-calculator"
    ]
},
    calculate: formulasMap["profit-margin-calculator"]
  },
  "roi-calculator": {
    ...{
    "slug": "roi-calculator",
    "title": "ROI Calculator",
    "shortTitle": "ROI",
    "description": "Calculate Return on Investment (ROI) percentages and efficiency ratios client-side.",
    "keywords": [
        "roi calculator",
        "return on investment",
        "investment efficiency",
        "gain loss"
    ],
    "category": "calculator",
    "icon": "TrendingUp",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate capital return on investment",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "ROI = (Gain - Invested) / Invested * 100",
        "explanation": "Returns the yield ratio of financial gains relative to initial cost investments.",
        "workedExample": {
            "expression": "Invested = 10,000, Returned = 15,000",
            "steps": [
                "Gain = 15000 - 10000 = 5000",
                "ROI = (5000 / 10000) * 100 = 50%"
            ],
            "result": "ROI = 50%"
        }
    },
    "inputs": [
        {
            "name": "invested",
            "label": "Amount Invested ($)",
            "type": "number",
            "defaultValue": 10000,
            "min": 0
        },
        {
            "name": "returned",
            "label": "Amount Returned / Value ($)",
            "type": "number",
            "defaultValue": 12500,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "gain",
            "label": "Net Investment Gain",
            "type": "currency"
        },
        {
            "name": "roi",
            "label": "Return on Investment (ROI)",
            "type": "percentage"
        }
    ],
    "faq": [
        {
            "question": "What is a good ROI?",
            "answer": "Depends on industry standards. Generally, a positive return above alternative market benchmarks is positive."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate investment yield ratios based on capital costs and final values.",
        "aiSummary": "Determines the ROI growth yield percentage on capital asset investments.",
        "commonMistakes": [
            "Ignoring time periods when comparing returns across investments."
        ],
        "keyTakeaways": [
            "Measures capital efficiency."
        ],
        "searchIntent": "Calculate capital return on investment",
        "entities": [
            "ROI",
            "Investment",
            "Capital Gain"
        ],
        "semanticTopics": [
            "Investments",
            "Finance Metrics"
        ],
        "synonyms": [
            "Investment Return Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "cagr-calculator",
        "profit-margin-calculator"
    ]
},
    calculate: formulasMap["roi-calculator"]
  },
  "break-even-calculator": {
    ...{
    "slug": "break-even-calculator",
    "title": "Break-even Calculator",
    "shortTitle": "Break-even",
    "description": "Determine production unit break-even points and revenue limits client-side.",
    "keywords": [
        "break even point",
        "break even units",
        "fixed costs",
        "variable costs"
    ],
    "category": "calculator",
    "icon": "Activity",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate break even business point",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Break-even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)",
        "explanation": "Finds the point where total revenue equals total expenses, leaving zero profit/loss.",
        "workedExample": {
            "expression": "Fixed = 5,000, Variable Cost = 10/unit, Selling Price = 20/unit",
            "steps": [
                "Unit Margin = 20 - 10 = 10",
                "Units = 5000 / 10 = 500 units"
            ],
            "result": "Units = 500, Revenue = $10,000"
        }
    },
    "inputs": [
        {
            "name": "fixedCosts",
            "label": "Fixed Costs ($)",
            "type": "number",
            "defaultValue": 5000,
            "min": 0
        },
        {
            "name": "variableCost",
            "label": "Variable Cost per Unit ($)",
            "type": "number",
            "defaultValue": 15,
            "min": 0
        },
        {
            "name": "sellingPrice",
            "label": "Selling Price per Unit ($)",
            "type": "number",
            "defaultValue": 25,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "breakEvenUnits",
            "label": "Break-even Units (Rounded Up)",
            "type": "number"
        },
        {
            "name": "breakEvenRevenue",
            "label": "Break-even Revenue",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is a break-even point?",
            "answer": "The production level where total revenues match total expenses exactly."
        }
    ],
    "aeo": {
        "quickAnswer": "Determine break-even quantities and sales goals based on fixed and unit expenses.",
        "aiSummary": "Computes sales thresholds required to cover overhead operational costs.",
        "commonMistakes": [
            "Pricing unit levels below unit variable cost parameters."
        ],
        "keyTakeaways": [
            "Shows operating leverage."
        ],
        "searchIntent": "Calculate break even business point",
        "entities": [
            "Break-even",
            "Overhead",
            "Fixed Cost"
        ],
        "semanticTopics": [
            "Management Accounting",
            "Business Planning"
        ],
        "synonyms": [
            "Break-even Point Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "profit-margin-calculator",
        "roi-calculator"
    ]
},
    calculate: formulasMap["break-even-calculator"]
  },
  "cagr-calculator": {
    ...{
    "slug": "cagr-calculator",
    "title": "CAGR Calculator",
    "shortTitle": "CAGR",
    "description": "Determine the Compound Annual Growth Rate (CAGR) of investments over time client-side.",
    "keywords": [
        "cagr calculator",
        "compound annual growth rate",
        "annualized return"
    ],
    "category": "calculator",
    "icon": "TrendingUp",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate compound annual growth rate",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "CAGR = (End Value / Start Value)^(1 / n) - 1",
        "explanation": "End Value is maturity, Start Value is principal, and n is duration in years.",
        "workedExample": {
            "expression": "Start = 1,000, End = 1,500, Tenure = 3 Years",
            "steps": [
                "CAGR = (1500/1000)^(1/3) - 1 = (1.5)^(0.3333) - 1 = 14.47%"
            ],
            "result": "CAGR = 14.47%"
        }
    },
    "inputs": [
        {
            "name": "startValue",
            "label": "Initial Investment Value ($)",
            "type": "number",
            "defaultValue": 10000,
            "min": 1
        },
        {
            "name": "endValue",
            "label": "Final Maturity Value ($)",
            "type": "number",
            "defaultValue": 15000,
            "min": 1
        },
        {
            "name": "tenure",
            "label": "Duration (Years)",
            "type": "number",
            "defaultValue": 3,
            "min": 0.1
        }
    ],
    "outputs": [
        {
            "name": "cagr",
            "label": "Compound Annual Growth Rate (CAGR)",
            "type": "percentage"
        }
    ],
    "faq": [
        {
            "question": "What is CAGR?",
            "answer": "The geometric growth rate that provides a constant annualized return over a duration."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate CAGR percentages over tenure ranges to analyze historical asset growth.",
        "aiSummary": "Computes compounding annualized yields for portfolios, real estate, or equity returns.",
        "commonMistakes": [
            "Assuming actual yearly returns match the smoothed CAGR average rate."
        ],
        "keyTakeaways": [
            "Smooths yearly volatility."
        ],
        "searchIntent": "Calculate compound annual growth rate",
        "entities": [
            "CAGR",
            "Growth Rate",
            "Yield"
        ],
        "semanticTopics": [
            "Portfolio Analysis",
            "Yield Comparison"
        ],
        "synonyms": [
            "Annualized Yield Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "roi-calculator",
        "sip-calculator"
    ]
},
    calculate: formulasMap["cagr-calculator"]
  },
  "inflation-calculator": {
    ...{
    "slug": "inflation-calculator",
    "title": "Inflation Calculator",
    "shortTitle": "Inflation",
    "description": "Determine inflation adjustments on future or past buying power values client-side.",
    "keywords": [
        "inflation calculator",
        "purchasing power",
        "cpi adjust",
        "value of dollar"
    ],
    "category": "calculator",
    "icon": "TrendingDown",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate historical dollar inflation value",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Future: Value * (1 + rate/100)^n; Past: Value / (1 + rate/100)^n",
        "explanation": "Applies estimated compounding inflation rates over standard year spans.",
        "workedExample": {
            "expression": "Amount = 100, Rate = 3%, Years = 10, Future Value",
            "steps": [
                "Future = 100 * (1.03)^10 = 134.39"
            ],
            "result": "Adjusted = 134.39"
        }
    },
    "inputs": [
        {
            "name": "amount",
            "label": "Amount ($)",
            "type": "number",
            "defaultValue": 1000,
            "min": 0
        },
        {
            "name": "rate",
            "label": "Annual Inflation Rate (%)",
            "type": "number",
            "defaultValue": 3.5
        },
        {
            "name": "tenure",
            "label": "Time Period (Years)",
            "type": "number",
            "defaultValue": 10,
            "min": 1
        },
        {
            "name": "type",
            "label": "Adjust into the",
            "type": "select",
            "defaultValue": "future",
            "options": [
                {
                    "label": "Future (Calculate purchasing equivalent)",
                    "value": "future"
                },
                {
                    "label": "Past (Discount historical value)",
                    "value": "past"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "adjustedValue",
            "label": "Inflation Adjusted Value",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is inflation?",
            "answer": "The rate at which the general level of prices for goods and services rises, causing purchasing power to fall."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate price changes and consumer purchasing power variations over time.",
        "aiSummary": "Computes capital degradation or target purchasing equivalent under stable inflation rates.",
        "commonMistakes": [
            "Assuming a constant inflation rate across long terms is realistic."
        ],
        "keyTakeaways": [
            "Highlights real vs nominal values."
        ],
        "searchIntent": "Calculate historical dollar inflation value",
        "entities": [
            "Inflation",
            "Purchasing Power",
            "Consumer Index"
        ],
        "semanticTopics": [
            "Macroeconomics",
            "Wealth Protection"
        ],
        "synonyms": [
            "Purchasing Power Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "cagr-calculator",
        "lumpsum-calculator"
    ]
},
    calculate: formulasMap["inflation-calculator"]
  },
  "currency-converter": {
    ...{
    "slug": "currency-converter",
    "title": "Currency Converter",
    "shortTitle": "Currency",
    "description": "Convert exchange rates between key international currencies offline client-side.",
    "keywords": [
        "currency converter",
        "exchange rates",
        "usd to eur",
        "currency exchange"
    ],
    "category": "calculator",
    "icon": "Coins",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert currency exchange rate offline",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Target = Amount / Rate_From * Rate_To",
        "explanation": "Uses stable baseline exchange rates to transform currency indices locally.",
        "workedExample": {
            "expression": "Convert 100 USD to EUR (EUR rate = 0.92)",
            "steps": [
                "USD is base (1.0). Result = 100 / 1.0 * 0.92 = 92 EUR"
            ],
            "result": "92 EUR"
        }
    },
    "inputs": [
        {
            "name": "amount",
            "label": "Amount",
            "type": "number",
            "defaultValue": 100,
            "min": 0
        },
        {
            "name": "from",
            "label": "From Currency",
            "type": "select",
            "defaultValue": "USD",
            "options": [
                {
                    "label": "USD - US Dollar",
                    "value": "USD"
                },
                {
                    "label": "EUR - Euro",
                    "value": "EUR"
                },
                {
                    "label": "GBP - British Pound",
                    "value": "GBP"
                },
                {
                    "label": "INR - Indian Rupee",
                    "value": "INR"
                },
                {
                    "label": "JPY - Japanese Yen",
                    "value": "JPY"
                },
                {
                    "label": "CAD - Canadian Dollar",
                    "value": "CAD"
                },
                {
                    "label": "AUD - Australian Dollar",
                    "value": "AUD"
                }
            ]
        },
        {
            "name": "to",
            "label": "To Currency",
            "type": "select",
            "defaultValue": "EUR",
            "options": [
                {
                    "label": "USD - US Dollar",
                    "value": "USD"
                },
                {
                    "label": "EUR - Euro",
                    "value": "EUR"
                },
                {
                    "label": "GBP - British Pound",
                    "value": "GBP"
                },
                {
                    "label": "INR - Indian Rupee",
                    "value": "INR"
                },
                {
                    "label": "JPY - Japanese Yen",
                    "value": "JPY"
                },
                {
                    "label": "CAD - Canadian Dollar",
                    "value": "CAD"
                },
                {
                    "label": "AUD - Australian Dollar",
                    "value": "AUD"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Converted Amount",
            "type": "number"
        },
        {
            "name": "rate",
            "label": "Exchange Rate (Static/Offline)",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "Are these rates live?",
            "answer": "These are fixed offline reference exchange rates. This ensures the converter is fast and works 100% offline."
        }
    ],
    "aeo": {
        "quickAnswer": "Exchange currencies offline using fixed reference baseline benchmarks.",
        "aiSummary": "A client-side utility converting USD, EUR, INR, JPY, and other major currencies offline.",
        "commonMistakes": [
            "Using static reference values for mission-critical trading transactions."
        ],
        "keyTakeaways": [
            "Works without internet.",
            "Privacy-friendly."
        ],
        "searchIntent": "Convert currency exchange rate offline",
        "entities": [
            "Currency",
            "Exchange Rate",
            "Forex"
        ],
        "semanticTopics": [
            "International Trade",
            "Travel Utility"
        ],
        "synonyms": [
            "Forex Converter"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "unit-converter"
    ]
},
    calculate: formulasMap["currency-converter"]
  },
  "unit-converter": {
    ...{
    "slug": "unit-converter",
    "title": "Unit Converter",
    "shortTitle": "Unit Converter",
    "description": "Convert basic physical length metrics between metric and imperial systems client-side.",
    "keywords": [
        "unit converter",
        "metric to imperial",
        "convert measurements"
    ],
    "category": "calculator",
    "icon": "Scale",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert units metric imperial",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Target = Value * (Base Factor / Target Factor)",
        "explanation": "Converts length metrics locally using standard physical conversion ratios.",
        "workedExample": {
            "expression": "Convert 5 feet to meters",
            "steps": [
                "5 * 0.3048 = 1.524 meters"
            ],
            "result": "1.524 m"
        }
    },
    "inputs": [
        {
            "name": "value",
            "label": "Value",
            "type": "number",
            "defaultValue": 1
        },
        {
            "name": "from",
            "label": "From Unit",
            "type": "select",
            "defaultValue": "ft",
            "options": [
                {
                    "label": "meters (m)",
                    "value": "m"
                },
                {
                    "label": "centimeters (cm)",
                    "value": "cm"
                },
                {
                    "label": "feet (ft)",
                    "value": "ft"
                },
                {
                    "label": "inches (in)",
                    "value": "in"
                }
            ]
        },
        {
            "name": "to",
            "label": "To Unit",
            "type": "select",
            "defaultValue": "m",
            "options": [
                {
                    "label": "meters (m)",
                    "value": "m"
                },
                {
                    "label": "centimeters (cm)",
                    "value": "cm"
                },
                {
                    "label": "feet (ft)",
                    "value": "ft"
                },
                {
                    "label": "inches (in)",
                    "value": "in"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Converted Value",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What dimensions are supported?",
            "answer": "This generic unit converter supports common length dimensions. See specific converters for others."
        }
    ],
    "aeo": {
        "quickAnswer": "Convert physical coordinates between metric and imperial formats.",
        "aiSummary": "Computes system dimensions locally. Enter value, select units, and review conversions.",
        "commonMistakes": [
            "Selecting identical units for converting."
        ],
        "keyTakeaways": [
            "Instant offline translation."
        ],
        "searchIntent": "Convert units metric imperial",
        "entities": [
            "Measurement",
            "Metric",
            "Imperial"
        ],
        "semanticTopics": [
            "Physics",
            "Construction Helper"
        ],
        "synonyms": [
            "Measurement Converter"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "length-converter",
        "weight-converter"
    ]
},
    calculate: formulasMap["unit-converter"]
  },
  "length-converter": {
    ...{
    "slug": "length-converter",
    "title": "Length Converter",
    "shortTitle": "Length",
    "description": "Convert distance and length metrics (mm, cm, m, km, inches, feet, yards, miles) client-side.",
    "keywords": [
        "length converter",
        "inches to cm",
        "miles to km",
        "convert length"
    ],
    "category": "calculator",
    "icon": "Ruler",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert length meters to feet",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Target = Value * factor_from / factor_to",
        "explanation": "Transforms units relative to meters baseline factor scales.",
        "workedExample": {
            "expression": "Convert 10 inches to centimeters",
            "steps": [
                "10 in = 0.254 meters",
                "0.254 / 0.01 = 25.4 cm"
            ],
            "result": "25.4 cm"
        }
    },
    "inputs": [
        {
            "name": "value",
            "label": "Length Value",
            "type": "number",
            "defaultValue": 12
        },
        {
            "name": "from",
            "label": "From Unit",
            "type": "select",
            "defaultValue": "in",
            "options": [
                {
                    "label": "Millimeters (mm)",
                    "value": "mm"
                },
                {
                    "label": "Centimeters (cm)",
                    "value": "cm"
                },
                {
                    "label": "Meters (m)",
                    "value": "m"
                },
                {
                    "label": "Kilometers (km)",
                    "value": "km"
                },
                {
                    "label": "Inches (in)",
                    "value": "in"
                },
                {
                    "label": "Feet (ft)",
                    "value": "ft"
                },
                {
                    "label": "Yards (yd)",
                    "value": "yd"
                },
                {
                    "label": "Miles (mi)",
                    "value": "mi"
                }
            ]
        },
        {
            "name": "to",
            "label": "To Unit",
            "type": "select",
            "defaultValue": "cm",
            "options": [
                {
                    "label": "Millimeters (mm)",
                    "value": "mm"
                },
                {
                    "label": "Centimeters (cm)",
                    "value": "cm"
                },
                {
                    "label": "Meters (m)",
                    "value": "m"
                },
                {
                    "label": "Kilometers (km)",
                    "value": "km"
                },
                {
                    "label": "Inches (in)",
                    "value": "in"
                },
                {
                    "label": "Feet (ft)",
                    "value": "ft"
                },
                {
                    "label": "Yards (yd)",
                    "value": "yd"
                },
                {
                    "label": "Miles (mi)",
                    "value": "mi"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Converted Length",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "How many inches in a foot?",
            "answer": "There are exactly 12 inches in a foot."
        }
    ],
    "aeo": {
        "quickAnswer": "Convert lengths between metric systems (m, cm) and imperial standards (in, ft, miles).",
        "aiSummary": "Translates distances across metric and imperial systems in-memory.",
        "commonMistakes": [
            "Confusing yards and meters when estimating dimensions."
        ],
        "keyTakeaways": [
            "Instant precision output."
        ],
        "searchIntent": "Convert length meters to feet",
        "entities": [
            "Length",
            "Distance",
            "Ruler"
        ],
        "semanticTopics": [
            "Physics Tools",
            "Drafting"
        ],
        "synonyms": [
            "Distance Converter"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "unit-converter",
        "area-converter"
    ]
},
    calculate: formulasMap["length-converter"]
  },
  "weight-converter": {
    ...{
    "slug": "weight-converter",
    "title": "Weight Converter",
    "shortTitle": "Weight",
    "description": "Convert weight and mass measurements (mg, g, kg, lbs, oz, stone) client-side.",
    "keywords": [
        "weight converter",
        "kg to lbs",
        "ounces to grams",
        "mass converter"
    ],
    "category": "calculator",
    "icon": "Scale",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert weight kg to lbs",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Target = Value * factor_from / factor_to",
        "explanation": "Uses kilograms as a base baseline reference factor.",
        "workedExample": {
            "expression": "Convert 5 pounds to kilograms",
            "steps": [
                "5 lb = 5 * 0.45359237 kg = 2.268 kg"
            ],
            "result": "2.268 kg"
        }
    },
    "inputs": [
        {
            "name": "value",
            "label": "Weight Value",
            "type": "number",
            "defaultValue": 150
        },
        {
            "name": "from",
            "label": "From Unit",
            "type": "select",
            "defaultValue": "lb",
            "options": [
                {
                    "label": "Milligrams (mg)",
                    "value": "mg"
                },
                {
                    "label": "Grams (g)",
                    "value": "g"
                },
                {
                    "label": "Kilograms (kg)",
                    "value": "kg"
                },
                {
                    "label": "Ounces (oz)",
                    "value": "oz"
                },
                {
                    "label": "Pounds (lb)",
                    "value": "lb"
                },
                {
                    "label": "Stone (st)",
                    "value": "stone"
                }
            ]
        },
        {
            "name": "to",
            "label": "To Unit",
            "type": "select",
            "defaultValue": "kg",
            "options": [
                {
                    "label": "Milligrams (mg)",
                    "value": "mg"
                },
                {
                    "label": "Grams (g)",
                    "value": "g"
                },
                {
                    "label": "Kilograms (kg)",
                    "value": "kg"
                },
                {
                    "label": "Ounces (oz)",
                    "value": "oz"
                },
                {
                    "label": "Pounds (lb)",
                    "value": "lb"
                },
                {
                    "label": "Stone (st)",
                    "value": "stone"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Converted Weight",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "How many pounds are in a kilogram?",
            "answer": "One kilogram is approximately equal to 2.20462 pounds."
        }
    ],
    "aeo": {
        "quickAnswer": "Convert weight measures like kilograms, pounds, ounces, and grams locally.",
        "aiSummary": "Computes conversions across international mass and weight standards.",
        "commonMistakes": [
            "Confusing net mass with gravitational force units."
        ],
        "keyTakeaways": [
            "Supports medical and shipping units."
        ],
        "searchIntent": "Convert weight kg to lbs",
        "entities": [
            "Weight",
            "Mass",
            "Scale"
        ],
        "semanticTopics": [
            "Shipping",
            "Diet Management"
        ],
        "synonyms": [
            "Mass Converter"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "unit-converter",
        "length-converter"
    ]
},
    calculate: formulasMap["weight-converter"]
  },
  "area-converter": {
    ...{
    "slug": "area-converter",
    "title": "Area Converter",
    "shortTitle": "Area",
    "description": "Convert dimensional area measurements (sq m, sq ft, acres, hectares, sq miles) client-side.",
    "keywords": [
        "area converter",
        "acres to hectares",
        "sq ft to sq m",
        "land converter"
    ],
    "category": "calculator",
    "icon": "Grid",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert area acres to sq ft",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Target = Value * factor_from / factor_to",
        "explanation": "Converts values relative to square meters baseline factors.",
        "workedExample": {
            "expression": "Convert 2 acres to hectares",
            "steps": [
                "2 acres = 2 * 4046.856 = 8,093.71 m2",
                "8,093.71 / 10000 = 0.809 hectare"
            ],
            "result": "0.809 hectares"
        }
    },
    "inputs": [
        {
            "name": "value",
            "label": "Area Value",
            "type": "number",
            "defaultValue": 1
        },
        {
            "name": "from",
            "label": "From Unit",
            "type": "select",
            "defaultValue": "acre",
            "options": [
                {
                    "label": "Square Millimeters (mm²)",
                    "value": "mm2"
                },
                {
                    "label": "Square Centimeters (cm²)",
                    "value": "cm2"
                },
                {
                    "label": "Square Meters (m²)",
                    "value": "m2"
                },
                {
                    "label": "Square Kilometers (km²)",
                    "value": "km2"
                },
                {
                    "label": "Square Inches (in²)",
                    "value": "in2"
                },
                {
                    "label": "Square Feet (ft²)",
                    "value": "ft2"
                },
                {
                    "label": "Square Yards (yd²)",
                    "value": "yd2"
                },
                {
                    "label": "Acres",
                    "value": "acre"
                },
                {
                    "label": "Hectares",
                    "value": "hectare"
                }
            ]
        },
        {
            "name": "to",
            "label": "To Unit",
            "type": "select",
            "defaultValue": "hectare",
            "options": [
                {
                    "label": "Square Millimeters (mm²)",
                    "value": "mm2"
                },
                {
                    "label": "Square Centimeters (cm²)",
                    "value": "cm2"
                },
                {
                    "label": "Square Meters (m²)",
                    "value": "m2"
                },
                {
                    "label": "Square Kilometers (km²)",
                    "value": "km2"
                },
                {
                    "label": "Square Inches (in²)",
                    "value": "in2"
                },
                {
                    "label": "Square Feet (ft²)",
                    "value": "ft2"
                },
                {
                    "label": "Square Yards (yd²)",
                    "value": "yd2"
                },
                {
                    "label": "Acres",
                    "value": "acre"
                },
                {
                    "label": "Hectares",
                    "value": "hectare"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Converted Area",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "How many square feet are in an acre?",
            "answer": "There are exactly 43,560 square feet in one acre."
        }
    ],
    "aeo": {
        "quickAnswer": "Convert real estate land dimensions between hectares, acres, and square layouts.",
        "aiSummary": "Utility to compare square footage, plot metrics, and agricultural land units.",
        "commonMistakes": [
            "Assuming linear ratios apply to square area dimensions."
        ],
        "keyTakeaways": [
            "Perfect for real estate scaling."
        ],
        "searchIntent": "Convert area acres to sq ft",
        "entities": [
            "Area",
            "Acres",
            "Land"
        ],
        "semanticTopics": [
            "Real Estate Tools",
            "Surveying"
        ],
        "synonyms": [
            "Land Area Converter"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "length-converter",
        "volume-converter"
    ]
},
    calculate: formulasMap["area-converter"]
  },
  "volume-converter": {
    ...{
    "slug": "volume-converter",
    "title": "Volume Converter",
    "shortTitle": "Volume",
    "description": "Convert fluid and three-dimensional volume measurements (ml, liters, gallons, cups, fluid ounces) client-side.",
    "keywords": [
        "volume converter",
        "gallons to liters",
        "cups to ml",
        "fluid ounces conversion"
    ],
    "category": "calculator",
    "icon": "Container",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert volume gallons to liters",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Target = Value * factor_from / factor_to",
        "explanation": "Converts volume relative to a liters baseline factor.",
        "workedExample": {
            "expression": "Convert 2 gallons to liters",
            "steps": [
                "2 gallons = 2 * 3.78541 liters = 7.57 liters"
            ],
            "result": "7.57 L"
        }
    },
    "inputs": [
        {
            "name": "value",
            "label": "Volume Value",
            "type": "number",
            "defaultValue": 1
        },
        {
            "name": "from",
            "label": "From Unit",
            "type": "select",
            "defaultValue": "gallon",
            "options": [
                {
                    "label": "Milliliters (ml)",
                    "value": "ml"
                },
                {
                    "label": "Liters (l)",
                    "value": "l"
                },
                {
                    "label": "Cubic Meters (m³)",
                    "value": "m3"
                },
                {
                    "label": "Teaspoons (tsp)",
                    "value": "tsp"
                },
                {
                    "label": "Tablespoons (tbsp)",
                    "value": "tbsp"
                },
                {
                    "label": "Fluid Ounces (fl oz)",
                    "value": "floz"
                },
                {
                    "label": "Cups",
                    "value": "cup"
                },
                {
                    "label": "Pints",
                    "value": "pint"
                },
                {
                    "label": "Quarts",
                    "value": "quart"
                },
                {
                    "label": "Gallons (US)",
                    "value": "gallon"
                }
            ]
        },
        {
            "name": "to",
            "label": "To Unit",
            "type": "select",
            "defaultValue": "l",
            "options": [
                {
                    "label": "Milliliters (ml)",
                    "value": "ml"
                },
                {
                    "label": "Liters (l)",
                    "value": "l"
                },
                {
                    "label": "Cubic Meters (m³)",
                    "value": "m3"
                },
                {
                    "label": "Teaspoons (tsp)",
                    "value": "tsp"
                },
                {
                    "label": "Tablespoons (tbsp)",
                    "value": "tbsp"
                },
                {
                    "label": "Fluid Ounces (fl oz)",
                    "value": "floz"
                },
                {
                    "label": "Cups",
                    "value": "cup"
                },
                {
                    "label": "Pints",
                    "value": "pint"
                },
                {
                    "label": "Quarts",
                    "value": "quart"
                },
                {
                    "label": "Gallons (US)",
                    "value": "gallon"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Converted Volume",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "How many cups in a gallon?",
            "answer": "There are exactly 16 cups in one US liquid gallon."
        }
    ],
    "aeo": {
        "quickAnswer": "Convert liquid and cooking volumes between cups, liters, and gallons.",
        "aiSummary": "Translates metrics across metric milliliters and US/UK kitchen volume metrics.",
        "commonMistakes": [
            "Confusing US fluid ounces with imperial liquid measurements."
        ],
        "keyTakeaways": [
            "Essential for recipe conversion."
        ],
        "searchIntent": "Convert volume gallons to liters",
        "entities": [
            "Volume",
            "Liters",
            "Liquid"
        ],
        "semanticTopics": [
            "Kitchen Utility",
            "Chemistry Units"
        ],
        "synonyms": [
            "Liquid Capacity Converter"
        ]
    },
    "geo": {
        "regionalVariations": "Supports standard US liquid volume measurements."
    },
    "examples": [],
    "relatedTools": [
        "area-converter",
        "weight-converter"
    ]
},
    calculate: formulasMap["volume-converter"]
  },
  "temperature-converter": {
    ...{
    "slug": "temperature-converter",
    "title": "Temperature Converter",
    "shortTitle": "Temperature",
    "description": "Convert temperature values between Celsius, Fahrenheit, and Kelvin scales client-side.",
    "keywords": [
        "temperature converter",
        "celsius to fahrenheit",
        "kelvin to celsius"
    ],
    "category": "calculator",
    "icon": "Thermometer",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert temperature celsius to fahrenheit",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "F = C * 9/5 + 32; K = C + 273.15",
        "explanation": "Converts temperature coordinates across metric, US, and absolute scientific scales.",
        "workedExample": {
            "expression": "Convert 100 Celsius to Fahrenheit",
            "steps": [
                "F = 100 * (9 / 5) + 32 = 180 + 32 = 212"
            ],
            "result": "212 F"
        }
    },
    "inputs": [
        {
            "name": "value",
            "label": "Temperature",
            "type": "number",
            "defaultValue": 0
        },
        {
            "name": "from",
            "label": "From Scale",
            "type": "select",
            "defaultValue": "C",
            "options": [
                {
                    "label": "Celsius (°C)",
                    "value": "C"
                },
                {
                    "label": "Fahrenheit (°F)",
                    "value": "F"
                },
                {
                    "label": "Kelvin (K)",
                    "value": "K"
                }
            ]
        },
        {
            "name": "to",
            "label": "To Scale",
            "type": "select",
            "defaultValue": "F",
            "options": [
                {
                    "label": "Celsius (°C)",
                    "value": "C"
                },
                {
                    "label": "Fahrenheit (°F)",
                    "value": "F"
                },
                {
                    "label": "Kelvin (K)",
                    "value": "K"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Converted Temperature",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What temperature is absolute zero?",
            "answer": "Absolute zero is 0 Kelvin, which is -273.15 degrees Celsius."
        }
    ],
    "aeo": {
        "quickAnswer": "Convert ambient or absolute temperatures between C, F, and Kelvin scales.",
        "aiSummary": "Computes thermodynamic temperatures dynamically inside browser memory.",
        "commonMistakes": [
            "Applying absolute offset values to relative temperature differences."
        ],
        "keyTakeaways": [
            "Supports scientific Kelvin conversion."
        ],
        "searchIntent": "Convert temperature celsius to fahrenheit",
        "entities": [
            "Temperature",
            "Celsius",
            "Fahrenheit"
        ],
        "semanticTopics": [
            "Thermodynamics",
            "Weather Scaling"
        ],
        "synonyms": [
            "Thermal Scale Converter"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "unit-converter",
        "speed-converter"
    ]
},
    calculate: formulasMap["temperature-converter"]
  },
  "speed-converter": {
    ...{
    "slug": "speed-converter",
    "title": "Speed Converter",
    "shortTitle": "Speed",
    "description": "Convert velocity metrics between meters per second, km/h, mph, and knots client-side.",
    "keywords": [
        "speed converter",
        "kmh to mph",
        "knots to mph",
        "velocity conversion"
    ],
    "category": "calculator",
    "icon": "Gauge",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert speed kmh to mph",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Target = Value * factor_from / factor_to",
        "explanation": "Converts metrics using m/s as a baseline standard.",
        "workedExample": {
            "expression": "Convert 60 mph to km/h",
            "steps": [
                "60 mph = 60 * 0.44704 m/s = 26.82 m/s",
                "26.82 / 0.277778 = 96.56 km/h"
            ],
            "result": "96.56 km/h"
        }
    },
    "inputs": [
        {
            "name": "value",
            "label": "Speed Value",
            "type": "number",
            "defaultValue": 60
        },
        {
            "name": "from",
            "label": "From Unit",
            "type": "select",
            "defaultValue": "mph",
            "options": [
                {
                    "label": "Meters per second (m/s)",
                    "value": "ms"
                },
                {
                    "label": "Kilometers per hour (km/h)",
                    "value": "kmh"
                },
                {
                    "label": "Miles per hour (mph)",
                    "value": "mph"
                },
                {
                    "label": "Knots",
                    "value": "knots"
                }
            ]
        },
        {
            "name": "to",
            "label": "To Unit",
            "type": "select",
            "defaultValue": "kmh",
            "options": [
                {
                    "label": "Meters per second (m/s)",
                    "value": "ms"
                },
                {
                    "label": "Kilometers per hour (km/h)",
                    "value": "kmh"
                },
                {
                    "label": "Miles per hour (mph)",
                    "value": "mph"
                },
                {
                    "label": "Knots",
                    "value": "knots"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Converted Speed",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What is a knot?",
            "answer": "A knot is a unit of speed equal to one nautical mile per hour, approximately 1.15078 mph."
        }
    ],
    "aeo": {
        "quickAnswer": "Convert vehicle velocities or wind speeds across metric, land, and nautical units.",
        "aiSummary": "Translates speeds between km/h, mph, knots, and meters per second locally.",
        "commonMistakes": [
            "Confusing land miles with marine nautical miles."
        ],
        "keyTakeaways": [
            "Supports knots for aviation/marine."
        ],
        "searchIntent": "Convert speed kmh to mph",
        "entities": [
            "Speed",
            "Velocity",
            "Aviation"
        ],
        "semanticTopics": [
            "Physics",
            "Travel Navigation"
        ],
        "synonyms": [
            "Velocity Converter"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "unit-converter",
        "temperature-converter"
    ]
},
    calculate: formulasMap["speed-converter"]
  },
  "data-storage-converter": {
    ...{
    "slug": "data-storage-converter",
    "title": "Data Storage Converter",
    "shortTitle": "Data Storage",
    "description": "Convert data storage units (bits, Bytes, KB, MB, GB, TB, PB) using decimal or binary scales client-side.",
    "keywords": [
        "data converter",
        "gb to tb",
        "mb to gb",
        "binary storage",
        "data size calculator"
    ],
    "category": "calculator",
    "icon": "HardDrive",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert digital size gigabytes to megabytes",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Target = Value * (Multiplier^idx_from) / (Multiplier^idx_to)",
        "explanation": "Converts bits and bytes using base-10 (1000) or base-2 (1024) limits.",
        "workedExample": {
            "expression": "Convert 2 GB to MB (Decimal)",
            "steps": [
                "2 * 1000 = 2000 MB"
            ],
            "result": "2000 MB"
        }
    },
    "inputs": [
        {
            "name": "value",
            "label": "Storage Size",
            "type": "number",
            "defaultValue": 1
        },
        {
            "name": "from",
            "label": "From Unit",
            "type": "select",
            "defaultValue": "GB",
            "options": [
                {
                    "label": "bits (b)",
                    "value": "b"
                },
                {
                    "label": "Bytes (B)",
                    "value": "B"
                },
                {
                    "label": "Kilobytes (KB)",
                    "value": "KB"
                },
                {
                    "label": "Megabytes (MB)",
                    "value": "MB"
                },
                {
                    "label": "Gigabytes (GB)",
                    "value": "GB"
                },
                {
                    "label": "Terabytes (TB)",
                    "value": "TB"
                },
                {
                    "label": "Petabytes (PB)",
                    "value": "PB"
                }
            ]
        },
        {
            "name": "to",
            "label": "To Unit",
            "type": "select",
            "defaultValue": "MB",
            "options": [
                {
                    "label": "bits (b)",
                    "value": "b"
                },
                {
                    "label": "Bytes (B)",
                    "value": "B"
                },
                {
                    "label": "Kilobytes (KB)",
                    "value": "KB"
                },
                {
                    "label": "Megabytes (MB)",
                    "value": "MB"
                },
                {
                    "label": "Gigabytes (GB)",
                    "value": "GB"
                },
                {
                    "label": "Terabytes (TB)",
                    "value": "TB"
                },
                {
                    "label": "Petabytes (PB)",
                    "value": "PB"
                }
            ]
        },
        {
            "name": "binary",
            "label": "Use Binary Scale (1024 base)",
            "type": "boolean",
            "defaultValue": false
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Converted Storage Size",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What is the difference between decimal and binary scales?",
            "answer": "Operating systems often use binary (1024 B = 1 KiB) while disk manufacturers use decimal (1000 B = 1 KB) to list capacities."
        }
    ],
    "aeo": {
        "quickAnswer": "Translate file sizes across megabytes, gigabytes, and terabytes using base-10 or base-2 rules.",
        "aiSummary": "Computes system storage capacities and file metrics locally in-browser.",
        "commonMistakes": [
            "Confusing bits (lowercase b) with bytes (uppercase B)."
        ],
        "keyTakeaways": [
            "Supports both decimal and binary indices."
        ],
        "searchIntent": "Convert digital size gigabytes to megabytes",
        "entities": [
            "Data storage",
            "Gigabyte",
            "Binary"
        ],
        "semanticTopics": [
            "Computer Science",
            "Systems Administration"
        ],
        "synonyms": [
            "Data Unit Converter"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "unit-converter"
    ]
},
    calculate: formulasMap["data-storage-converter"]
  },
  "age-calculator": {
    ...{
    "slug": "age-calculator",
    "title": "Age Calculator",
    "shortTitle": "Age",
    "description": "Determine exact age in years, months, weeks, and days based on birthday inputs client-side.",
    "keywords": [
        "age calculator",
        "how old am i",
        "chronological age",
        "birthday age"
    ],
    "category": "calculator",
    "icon": "Calendar",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate exact chronological age",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Age = Target Date - Date of Birth",
        "explanation": "Computes exact intervals, adjusting for leap years and calendar month differences.",
        "workedExample": {
            "expression": "DOB = 1995-05-15, Target = 2026-06-30",
            "steps": [
                "Calculate years: 2026 - 1995 = 31",
                "Calculate months: 6 - 5 = 1",
                "Calculate days: 30 - 15 = 15"
            ],
            "result": "31 years, 1 month, 15 days"
        }
    },
    "inputs": [
        {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "defaultValue": "1995-01-01"
        },
        {
            "name": "targetDate",
            "label": "Age at Date",
            "type": "date",
            "defaultValue": "2026-06-30"
        }
    ],
    "outputs": [
        {
            "name": "text",
            "label": "Detailed Age",
            "type": "text"
        },
        {
            "name": "totalDays",
            "label": "Total Days Lived",
            "type": "number"
        },
        {
            "name": "totalWeeks",
            "label": "Total Weeks Lived",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "How does the calendar deal with short months?",
            "answer": "If days subtraction yields a negative offset, the calculator borrows days from the preceding month."
        }
    ],
    "aeo": {
        "quickAnswer": "Enter your birthday to compute your exact age down to months, weeks, and days.",
        "aiSummary": "Computes age chronologically using browser client memory.",
        "commonMistakes": [
            "Entering target date earlier than DOB date."
        ],
        "keyTakeaways": [
            "Shows total days lived."
        ],
        "searchIntent": "Calculate exact chronological age",
        "entities": [
            "Age",
            "Birthday",
            "Timeline"
        ],
        "semanticTopics": [
            "Calendar Math",
            "Life Event tracking"
        ],
        "synonyms": [
            "Chronological Age Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "birthday-countdown",
        "days-between-dates"
    ]
},
    calculate: formulasMap["age-calculator"]
  },
  "birthday-countdown": {
    ...{
    "slug": "birthday-countdown",
    "title": "Birthday Countdown",
    "shortTitle": "Birthday Countdown",
    "description": "Calculate days, hours, and minutes remaining until your next birthday client-side.",
    "keywords": [
        "birthday countdown",
        "days till birthday",
        "next birthday",
        "birthday timer"
    ],
    "category": "calculator",
    "icon": "Clock",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate days left until my birthday",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Remaining = Next Birthday - Current Time",
        "explanation": "Finds temporal duration until next calendar month/day occurrence.",
        "workedExample": {
            "expression": "Birthday = Oct 15, Current = June 30",
            "steps": [
                "Calculate months difference and remaining days."
            ],
            "result": "107 days"
        }
    },
    "inputs": [
        {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "defaultValue": "1995-10-15"
        }
    ],
    "outputs": [
        {
            "name": "text",
            "label": "Remaining Duration",
            "type": "text"
        },
        {
            "name": "days",
            "label": "Days",
            "type": "number"
        },
        {
            "name": "hours",
            "label": "Hours",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What if today is my birthday?",
            "answer": "The countdown will show 0 days remaining, celebrating your day!"
        }
    ],
    "aeo": {
        "quickAnswer": "Count down the days and hours remaining until your next annual birthday anniversary.",
        "aiSummary": "A clean countdown clock for birthdays that computes remaining duration locally.",
        "commonMistakes": [
            "Setting incorrect date format coordinates."
        ],
        "keyTakeaways": [
            "Tracks days, hours, and minutes."
        ],
        "searchIntent": "Calculate days left until my birthday",
        "entities": [
            "Countdown",
            "Birthday",
            "Timer"
        ],
        "semanticTopics": [
            "Timeline",
            "Personal Planner"
        ],
        "synonyms": [
            "Birthday Clock"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "age-calculator",
        "days-between-dates"
    ]
},
    calculate: formulasMap["birthday-countdown"]
  },
  "days-between-dates": {
    ...{
    "slug": "days-between-dates",
    "title": "Days Between Dates",
    "shortTitle": "Days Between Dates",
    "description": "Calculate the exact number of days, weeks, and months between two selected calendar dates client-side.",
    "keywords": [
        "days between dates",
        "date span",
        "calendar duration",
        "days calculator"
    ],
    "category": "calculator",
    "icon": "CalendarRange",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate total days between dates",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Duration = Math.abs(Date_B - Date_A) / (1000 * 60 * 60 * 24)",
        "explanation": "Computes total elapsed days using millisecond timestamps.",
        "workedExample": {
            "expression": "Start = Jan 1, End = Jan 15",
            "steps": [
                "Time difference = 14 days"
            ],
            "result": "14 days"
        }
    },
    "inputs": [
        {
            "name": "dateA",
            "label": "Start Date",
            "type": "date",
            "defaultValue": "2026-06-01"
        },
        {
            "name": "dateB",
            "label": "End Date",
            "type": "date",
            "defaultValue": "2026-06-30"
        }
    ],
    "outputs": [
        {
            "name": "totalDays",
            "label": "Total Days",
            "type": "number"
        },
        {
            "name": "text",
            "label": "Summary Description",
            "type": "text"
        }
    ],
    "faq": [
        {
            "question": "Does this include the end date?",
            "answer": "By default, this calculates calendar distance (exclusive of the final date). To include it, add 1."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate the exact days between any two calendar start and end dates.",
        "aiSummary": "Computes chronological distance between selected dates without network data.",
        "commonMistakes": [
            "Forgetting boundary condition parameters (inclusive vs exclusive)."
        ],
        "keyTakeaways": [
            "Accounts for leap years."
        ],
        "searchIntent": "Calculate total days between dates",
        "entities": [
            "Duration",
            "Calendar",
            "Days"
        ],
        "semanticTopics": [
            "Date Math",
            "Timeline Utility"
        ],
        "synonyms": [
            "Date Duration Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "business-days-calculator",
        "time-duration-calculator"
    ]
},
    calculate: formulasMap["days-between-dates"]
  },
  "business-days-calculator": {
    ...{
    "slug": "business-days-calculator",
    "title": "Business Days Calculator",
    "shortTitle": "Business Days",
    "description": "Compute the number of working days between two dates, excluding weekends client-side.",
    "keywords": [
        "business days",
        "working days",
        "exclude weekends",
        "working days calculator"
    ],
    "category": "calculator",
    "icon": "CalendarRange",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate business days between dates",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Working Days = Total Days - Weekend Days",
        "explanation": "Iterates through dates and flags days matching Saturdays (6) and Sundays (0).",
        "workedExample": {
            "expression": "June 1 (Mon) to June 10 (Wed) (Inclusive)",
            "steps": [
                "Total days = 10",
                "Weekend days = 2 (June 6, 7)",
                "Working days = 8"
            ],
            "result": "8 business days"
        }
    },
    "inputs": [
        {
            "name": "startDate",
            "label": "Start Date",
            "type": "date",
            "defaultValue": "2026-06-01"
        },
        {
            "name": "endDate",
            "label": "End Date",
            "type": "date",
            "defaultValue": "2026-06-15"
        },
        {
            "name": "excludeWeekends",
            "label": "Exclude Weekends (Sat/Sun)",
            "type": "boolean",
            "defaultValue": true
        },
        {
            "name": "includeBoundary",
            "label": "Include End Date (Make Inclusive)",
            "type": "boolean",
            "defaultValue": true
        }
    ],
    "outputs": [
        {
            "name": "businessDays",
            "label": "Business (Working) Days",
            "type": "number"
        },
        {
            "name": "totalDays",
            "label": "Total Calendar Days",
            "type": "number"
        },
        {
            "name": "weekendDays",
            "label": "Weekend Days",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "Does this exclude local public holidays?",
            "answer": "This tool currently excludes Saturdays and Sundays. It does not auto-exclude regional bank holidays since they vary globally."
        }
    ],
    "aeo": {
        "quickAnswer": "Exclude weekends to find net business and working days between calendar dates.",
        "aiSummary": "Computes working timelines for contracts, projects, and work schedules.",
        "commonMistakes": [
            "Assuming national holidays are auto-excluded from calculations."
        ],
        "keyTakeaways": [
            "Allows boundary inclusive toggle."
        ],
        "searchIntent": "Calculate business days between dates",
        "entities": [
            "Working Days",
            "Business Timeline",
            "Calendar"
        ],
        "semanticTopics": [
            "Timeline Planning",
            "Work Schedules"
        ],
        "synonyms": [
            "Working Days Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "days-between-dates",
        "time-duration-calculator"
    ]
},
    calculate: formulasMap["business-days-calculator"]
  },
  "time-duration-calculator": {
    ...{
    "slug": "time-duration-calculator",
    "title": "Time Duration Calculator",
    "shortTitle": "Time Duration",
    "description": "Determine exact hours and minutes elapsed between two custom times client-side.",
    "keywords": [
        "time duration",
        "elapsed time",
        "hours calculator",
        "hours worked"
    ],
    "category": "calculator",
    "icon": "Clock",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate time duration hours",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Duration = (End Hour * 60 + End Min) - (Start Hour * 60 + Start Min)",
        "explanation": "Finds absolute difference in minutes, assuming cross-midnight if negative.",
        "workedExample": {
            "expression": "Start = 08:30, End = 17:15",
            "steps": [
                "Start = 510 mins, End = 1035 mins",
                "Diff = 525 mins = 8 hours, 45 minutes"
            ],
            "result": "8h 45m"
        }
    },
    "inputs": [
        {
            "name": "startTime",
            "label": "Start Time (HH:MM)",
            "type": "text",
            "defaultValue": "09:00"
        },
        {
            "name": "endTime",
            "label": "End Time (HH:MM)",
            "type": "text",
            "defaultValue": "17:00"
        }
    ],
    "outputs": [
        {
            "name": "hours",
            "label": "Hours",
            "type": "number"
        },
        {
            "name": "minutes",
            "label": "Minutes",
            "type": "number"
        },
        {
            "name": "totalMinutes",
            "label": "Total Minutes",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "Does this handle PM and AM?",
            "answer": "Please enter times in 24-hour format (e.g. 17:00 for 5 PM) to guarantee calculation accuracy."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate exact time intervals and elapsed hours between clock times.",
        "aiSummary": "Computes elapsed times for work sheets, schedules, and duration tracking.",
        "commonMistakes": [
            "Entering 12-hour values without converting to 24-hour equivalents."
        ],
        "keyTakeaways": [
            "Auto-wraps past midnight."
        ],
        "searchIntent": "Calculate time duration hours",
        "entities": [
            "Duration",
            "Clock Time",
            "Elapsed"
        ],
        "semanticTopics": [
            "Schedules",
            "Time Math"
        ],
        "synonyms": [
            "Hours Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "days-between-dates",
        "business-days-calculator"
    ]
},
    calculate: formulasMap["time-duration-calculator"]
  },
  "bmi-calculator": {
    ...{
    "slug": "bmi-calculator",
    "title": "BMI Calculator",
    "shortTitle": "BMI",
    "description": "Determine Body Mass Index (BMI) and health categories based on weight and height client-side.",
    "keywords": [
        "bmi calculator",
        "body mass index",
        "weight category",
        "healthy weight"
    ],
    "category": "calculator",
    "icon": "Heart",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate body mass index score",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "BMI = Weight (kg) / Height (m)^2",
        "explanation": "Correlates weight relative to height, mapping to standard health categories.",
        "workedExample": {
            "expression": "Weight = 70 kg, Height = 175 cm (1.75 m)",
            "steps": [
                "BMI = 70 / (1.75 * 1.75) = 70 / 3.0625 = 22.86"
            ],
            "result": "22.86 (Normal)"
        }
    },
    "inputs": [
        {
            "name": "weight",
            "label": "Weight (kg)",
            "type": "number",
            "defaultValue": 70,
            "min": 1
        },
        {
            "name": "height",
            "label": "Height (cm)",
            "type": "number",
            "defaultValue": 170,
            "min": 50
        }
    ],
    "outputs": [
        {
            "name": "bmi",
            "label": "BMI Score",
            "type": "number"
        },
        {
            "name": "category",
            "label": "Weight Category",
            "type": "text"
        },
        {
            "name": "healthyRange",
            "label": "Healthy Weight Range",
            "type": "text"
        }
    ],
    "faq": [
        {
            "question": "What are the standard BMI categories?",
            "answer": "Underweight: <18.5, Normal: 18.5 - 24.9, Overweight: 25 - 29.9, Obese: >=30."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate BMI ratio to find your weight status category.",
        "aiSummary": "Computes BMI indices using metric weight and height formulas.",
        "commonMistakes": [
            "Relying strictly on BMI without considering muscle mass details."
        ],
        "keyTakeaways": [
            "Provides normal weight boundaries."
        ],
        "searchIntent": "Calculate body mass index score",
        "entities": [
            "BMI",
            "Weight",
            "Fitness"
        ],
        "semanticTopics": [
            "Health Metrics",
            "Wellness Indicators"
        ],
        "synonyms": [
            "Body Mass Index Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "bmr-calculator",
        "calorie-calculator"
    ]
},
    calculate: formulasMap["bmi-calculator"]
  },
  "bmr-calculator": {
    ...{
    "slug": "bmr-calculator",
    "title": "BMR Calculator",
    "shortTitle": "BMR",
    "description": "Calculate Basal Metabolic Rate (BMR) to discover baseline daily calorie needs client-side.",
    "keywords": [
        "bmr calculator",
        "basal metabolic rate",
        "daily calories baseline",
        "mifflin st jeor"
    ],
    "category": "calculator",
    "icon": "Heart",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate basal metabolic rate calories",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Men: 10*W + 6.25*H - 5*A + 5; Women: 10*W + 6.25*H - 5*A - 161",
        "explanation": "Uses Mifflin-St Jeor equation to estimate energy expenditure at absolute rest.",
        "workedExample": {
            "expression": "Male, 70kg, 175cm, 30 years old",
            "steps": [
                "BMR = 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1,648.75 kcal"
            ],
            "result": "1,648.75 calories/day"
        }
    },
    "inputs": [
        {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "defaultValue": "male",
            "options": [
                {
                    "label": "Male",
                    "value": "male"
                },
                {
                    "label": "Female",
                    "value": "female"
                }
            ]
        },
        {
            "name": "weight",
            "label": "Weight (kg)",
            "type": "number",
            "defaultValue": 70,
            "min": 1
        },
        {
            "name": "height",
            "label": "Height (cm)",
            "type": "number",
            "defaultValue": 175,
            "min": 50
        },
        {
            "name": "age",
            "label": "Age (Years)",
            "type": "number",
            "defaultValue": 30,
            "min": 1
        }
    ],
    "outputs": [
        {
            "name": "bmr",
            "label": "Basal Metabolic Rate (BMR)",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What is BMR?",
            "answer": "Basal Metabolic Rate is the number of calories your body needs to maintain basic life functions at rest."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate calories burned at rest using the Mifflin-St Jeor equation.",
        "aiSummary": "A client-side utility to compute metabolic calorie baseline counts.",
        "commonMistakes": [
            "Confusing BMR with total daily calorie needs (TDEE)."
        ],
        "keyTakeaways": [
            "Inputs: Gender, Height, Weight, Age."
        ],
        "searchIntent": "Calculate basal metabolic rate calories",
        "entities": [
            "BMR",
            "Metabolism",
            "Calories"
        ],
        "semanticTopics": [
            "Diet Science",
            "Nutrition Math"
        ],
        "synonyms": [
            "Metabolism Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "bmi-calculator",
        "calorie-calculator"
    ]
},
    calculate: formulasMap["bmr-calculator"]
  },
  "body-fat-calculator": {
    ...{
    "slug": "body-fat-calculator",
    "title": "Body Fat Calculator",
    "shortTitle": "Body Fat",
    "description": "Estimate body fat percentage using the US Navy Circumference Method client-side.",
    "keywords": [
        "body fat calculator",
        "us navy body fat",
        "body fat percentage",
        "lean mass calculator"
    ],
    "category": "calculator",
    "icon": "Heart",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate body fat percentage navy method",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Men: 86.010*log10(waist-neck) - 70.041*log10(height) + 36.76 (in inches)",
        "explanation": "Applies statistical height-to-circumference ratios to estimate fat volume.",
        "workedExample": {
            "expression": "Male, 70 inches height, 32 inches waist, 15 inches neck",
            "steps": [
                "Log parameters calculated to estimate fat volume index."
            ],
            "result": "14.5%"
        }
    },
    "inputs": [
        {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "defaultValue": "male",
            "options": [
                {
                    "label": "Male",
                    "value": "male"
                },
                {
                    "label": "Female",
                    "value": "female"
                }
            ]
        },
        {
            "name": "height",
            "label": "Height (cm)",
            "type": "number",
            "defaultValue": 175,
            "min": 50
        },
        {
            "name": "neck",
            "label": "Neck Circumference (cm)",
            "type": "number",
            "defaultValue": 38,
            "min": 10
        },
        {
            "name": "waist",
            "label": "Waist Circumference (cm)",
            "type": "number",
            "defaultValue": 82,
            "min": 20
        },
        {
            "name": "hip",
            "label": "Hip Circumference (cm - Females Only)",
            "type": "number",
            "defaultValue": 90,
            "min": 20
        }
    ],
    "outputs": [
        {
            "name": "bodyFat",
            "label": "Estimated Body Fat (%)",
            "type": "number"
        },
        {
            "name": "category",
            "label": "Fitness Category",
            "type": "text"
        }
    ],
    "faq": [
        {
            "question": "How accurate is the US Navy Method?",
            "answer": "It is a reliable estimation within 3-4% of DEXA scans, provided measurements are taken accurately."
        }
    ],
    "aeo": {
        "quickAnswer": "Estimate body fat composition using neck and waist circumference indexes.",
        "aiSummary": "Determines physical fat parameters offline using US Navy calculations.",
        "commonMistakes": [
            "Measuring waist at the wrong vertical coordinate (not navel level)."
        ],
        "keyTakeaways": [
            "Different inputs for men/women."
        ],
        "searchIntent": "Calculate body fat percentage navy method",
        "entities": [
            "Body Fat",
            "Navy Method",
            "Fitness"
        ],
        "semanticTopics": [
            "Body Composition",
            "Fitness Assessment"
        ],
        "synonyms": [
            "Fat Percentage Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "bmi-calculator",
        "calorie-calculator"
    ]
},
    calculate: formulasMap["body-fat-calculator"]
  },
  "calorie-calculator": {
    ...{
    "slug": "calorie-calculator",
    "title": "Calorie Calculator",
    "shortTitle": "Calories",
    "description": "Determine daily calorie goals to maintain, lose, or gain weight based on activity levels client-side.",
    "keywords": [
        "calorie calculator",
        "maintenance calories",
        "tdee calculator",
        "lose weight calories"
    ],
    "category": "calculator",
    "icon": "Heart",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate daily calories lose weight",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "TDEE = BMR * Activity Multiplier",
        "explanation": "Applies multipliers: Sedentary (1.2), Light (1.375), Moderate (1.55), Active (1.725), Extra Active (1.9).",
        "workedExample": {
            "expression": "BMR = 1,600, Moderate Activity (1.55)",
            "steps": [
                "TDEE = 1600 * 1.55 = 2,480 kcal/day"
            ],
            "result": "Maintenance = 2,480 kcal"
        }
    },
    "inputs": [
        {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "defaultValue": "male",
            "options": [
                {
                    "label": "Male",
                    "value": "male"
                },
                {
                    "label": "Female",
                    "value": "female"
                }
            ]
        },
        {
            "name": "weight",
            "label": "Weight (kg)",
            "type": "number",
            "defaultValue": 70,
            "min": 1
        },
        {
            "name": "height",
            "label": "Height (cm)",
            "type": "number",
            "defaultValue": 175,
            "min": 50
        },
        {
            "name": "age",
            "label": "Age (Years)",
            "type": "number",
            "defaultValue": 30,
            "min": 1
        },
        {
            "name": "activity",
            "label": "Activity Level",
            "type": "select",
            "defaultValue": 1.375,
            "options": [
                {
                    "label": "Sedentary (Little or no exercise)",
                    "value": 1.2
                },
                {
                    "label": "Lightly Active (1-3 days/week)",
                    "value": 1.375
                },
                {
                    "label": "Moderately Active (3-5 days/week)",
                    "value": 1.55
                },
                {
                    "label": "Very Active (6-7 days/week)",
                    "value": 1.725
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "bmr",
            "label": "BMR (Basal Calories)",
            "type": "number"
        },
        {
            "name": "maintenanceCalories",
            "label": "Maintenance Calories",
            "type": "number"
        },
        {
            "name": "loseWeightCalories",
            "label": "To Lose Weight (-500 kcal)",
            "type": "number"
        },
        {
            "name": "gainWeightCalories",
            "label": "To Gain Weight (+500 kcal)",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "How to create a caloric deficit?",
            "answer": "Consume fewer calories than your daily maintenance level (typically 300-500 kcal less)."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate daily maintenance energy needs using BMR activity multipliers.",
        "aiSummary": "Utility determining target calorie thresholds for weight management.",
        "commonMistakes": [
            "Overestimating actual exercise intensity activity variables."
        ],
        "keyTakeaways": [
            "Provides goals for lose/gain."
        ],
        "searchIntent": "Calculate daily calories lose weight",
        "entities": [
            "Calories",
            "TDEE",
            "Nutrition"
        ],
        "semanticTopics": [
            "Diet Plans",
            "Energy Balance"
        ],
        "synonyms": [
            "TDEE Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "bmr-calculator",
        "water-intake-calculator"
    ]
},
    calculate: formulasMap["calorie-calculator"]
  },
  "water-intake-calculator": {
    ...{
    "slug": "water-intake-calculator",
    "title": "Water Intake Calculator",
    "shortTitle": "Water Intake",
    "description": "Determine recommended daily water intake amounts based on weight and daily exercise duration client-side.",
    "keywords": [
        "water intake calculator",
        "daily water target",
        "hydration calculator",
        "cups of water"
    ],
    "category": "calculator",
    "icon": "Heart",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate recommended daily water intake",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Water (ml) = Weight (kg) * 35 + (Exercise mins / 30) * 350",
        "explanation": "Factors baseline hydration needs plus sweat replacement from exercise.",
        "workedExample": {
            "expression": "Weight = 70 kg, Exercise = 60 minutes",
            "steps": [
                "Baseline = 70 * 35 = 2,450 ml",
                "Active extra = (60 / 30) * 350 = 700 ml",
                "Total = 3,150 ml = 3.15 Liters"
            ],
            "result": "3.15 Liters"
        }
    },
    "inputs": [
        {
            "name": "weight",
            "label": "Weight (kg)",
            "type": "number",
            "defaultValue": 70,
            "min": 1
        },
        {
            "name": "exercise",
            "label": "Daily Exercise (Minutes)",
            "type": "number",
            "defaultValue": 30,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "liters",
            "label": "Water Target (Liters)",
            "type": "number"
        },
        {
            "name": "cups",
            "label": "Water Target (Glasses/Cups)",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "How much water is in a cup?",
            "answer": "This calculator assumes a standard cup size of 240 milliliters (8 fluid ounces)."
        }
    ],
    "aeo": {
        "quickAnswer": "Determine daily water volume targets based on weight and daily exertion levels.",
        "aiSummary": "Computes healthy water requirements locally inside browser sandboxes.",
        "commonMistakes": [
            "Failing to increase hydration in hot weather conditions."
        ],
        "keyTakeaways": [
            "Shows liters and glasses."
        ],
        "searchIntent": "Calculate recommended daily water intake",
        "entities": [
            "Hydration",
            "Water",
            "Wellness"
        ],
        "semanticTopics": [
            "Nutrition",
            "Healthy Hydration"
        ],
        "synonyms": [
            "Hydration Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "calorie-calculator"
    ]
},
    calculate: formulasMap["water-intake-calculator"]
  },
  "pregnancy-due-date-calculator": {
    ...{
    "slug": "pregnancy-due-date-calculator",
    "title": "Pregnancy Due Date Calculator",
    "shortTitle": "Pregnancy Due Date",
    "description": "Calculate expected pregnancy due dates and gestational progress based on your last menstrual period client-side.",
    "keywords": [
        "pregnancy due date",
        "due date calculator",
        "gestational age",
        "baby birth date"
    ],
    "category": "calculator",
    "icon": "Calendar",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate baby birth due date",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Due Date = LMP + 280 Days + (Cycle - 28)",
        "explanation": "Applies Naegele's rule adjusted for the user's average menstrual cycle length.",
        "workedExample": {
            "expression": "LMP = Oct 1, Cycle = 28 days",
            "steps": [
                "Add 280 days to Oct 1."
            ],
            "result": "Due Date = July 8 next year"
        }
    },
    "inputs": [
        {
            "name": "lmp",
            "label": "Last Menstrual Period (LMP) Date",
            "type": "date",
            "defaultValue": "2026-01-01"
        },
        {
            "name": "cycleLength",
            "label": "Menstrual Cycle Length (Days)",
            "type": "number",
            "defaultValue": 28,
            "min": 20,
            "max": 45
        }
    ],
    "outputs": [
        {
            "name": "dueDate",
            "label": "Estimated Due Date",
            "type": "text"
        },
        {
            "name": "gestationalAge",
            "label": "Current Gestational Age",
            "type": "text"
        },
        {
            "name": "progressPercent",
            "label": "Pregnancy Progress (%)",
            "type": "percentage"
        }
    ],
    "faq": [
        {
            "question": "What is gestational age?",
            "answer": "The time elapsed since the first day of the last menstrual period, typically lasting 40 weeks."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate estimated pregnancy birth dates using LMP date stamps.",
        "aiSummary": "Estimates delivery milestones and current gestational weeks locally.",
        "commonMistakes": [
            "Using conception dates instead of LMP reference points."
        ],
        "keyTakeaways": [
            "Adjusts for cycle lengths."
        ],
        "searchIntent": "Calculate baby birth due date",
        "entities": [
            "Pregnancy",
            "Due Date",
            "Gestational"
        ],
        "semanticTopics": [
            "Family Planning",
            "Gestational Tracking"
        ],
        "synonyms": [
            "Baby Due Date Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "ovulation-calculator"
    ]
},
    calculate: formulasMap["pregnancy-due-date-calculator"]
  },
  "ovulation-calculator": {
    ...{
    "slug": "ovulation-calculator",
    "title": "Ovulation Calculator",
    "shortTitle": "Ovulation",
    "description": "Determine fertile windows, ovulation schedules, and cycle calendars client-side.",
    "keywords": [
        "ovulation calculator",
        "fertile window",
        "conceive calendar",
        "menstrual cycle ovulation"
    ],
    "category": "calculator",
    "icon": "Calendar",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate peak ovulation fertile days",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Ovulation = LMP + (Cycle Length - 14) Days",
        "explanation": "Estimates the release of eggs, setting the fertile window 5 days prior.",
        "workedExample": {
            "expression": "LMP = June 1, Cycle = 28 days",
            "steps": [
                "Ovulation = June 1 + (28 - 14) = June 15",
                "Fertile Window = June 10 - June 15"
            ],
            "result": "Ovulation = June 15"
        }
    },
    "inputs": [
        {
            "name": "lmp",
            "label": "Last Period Start Date",
            "type": "date",
            "defaultValue": "2026-06-01"
        },
        {
            "name": "cycleLength",
            "label": "Menstrual Cycle Length (Days)",
            "type": "number",
            "defaultValue": 28,
            "min": 20,
            "max": 45
        }
    ],
    "outputs": [
        {
            "name": "ovulationDay",
            "label": "Ovulation Day",
            "type": "text"
        },
        {
            "name": "fertileStart",
            "label": "Fertile Window Starts",
            "type": "text"
        },
        {
            "name": "fertileEnd",
            "label": "Fertile Window Ends",
            "type": "text"
        },
        {
            "name": "nextPeriod",
            "label": "Next Period Date",
            "type": "text"
        }
    ],
    "faq": [
        {
            "question": "What is the fertile window?",
            "answer": "The 6-day span where intercourse can lead to pregnancy, ending on ovulation day."
        }
    ],
    "aeo": {
        "quickAnswer": "Identify peak fertile days and ovulation dates based on cycles.",
        "aiSummary": "Predicts fertile window cycles locally for family planning.",
        "commonMistakes": [
            "Assuming a constant 28-day cycle for all women."
        ],
        "keyTakeaways": [
            "Helps track ovulation cycles."
        ],
        "searchIntent": "Calculate peak ovulation fertile days",
        "entities": [
            "Ovulation",
            "Fertile Window",
            "LMP"
        ],
        "semanticTopics": [
            "Family Planning",
            "Reproductive Wellness"
        ],
        "synonyms": [
            "Fertility Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "pregnancy-due-date-calculator"
    ]
},
    calculate: formulasMap["ovulation-calculator"]
  },
  "tip-calculator": {
    ...{
    "slug": "tip-calculator",
    "title": "Tip Calculator",
    "shortTitle": "Tip",
    "description": "Determine restaurant tip percentages, bill splits, and payments per person client-side.",
    "keywords": [
        "tip calculator",
        "split bill",
        "tip percentage",
        "dining calculator"
    ],
    "category": "calculator",
    "icon": "Coins",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate restaurant bill tip split",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Tip = Bill * Tip% / 100; Total = Bill + Tip; Per Person = Total / People",
        "explanation": "Applies simple tipping percentages and divides final receipts among diners.",
        "workedExample": {
            "expression": "Bill = 100, Tip = 15%, Split = 2 People",
            "steps": [
                "Tip = 15",
                "Total = 115",
                "Per Person = 115 / 2 = 57.50"
            ],
            "result": "Per Person = $57.50"
        }
    },
    "inputs": [
        {
            "name": "billAmount",
            "label": "Bill Amount ($)",
            "type": "number",
            "defaultValue": 50,
            "min": 0
        },
        {
            "name": "tipPercent",
            "label": "Tip Percentage (%)",
            "type": "number",
            "defaultValue": 15,
            "min": 0
        },
        {
            "name": "people",
            "label": "Split Between (People)",
            "type": "number",
            "defaultValue": 1,
            "min": 1
        }
    ],
    "outputs": [
        {
            "name": "tipAmount",
            "label": "Tip Amount",
            "type": "currency"
        },
        {
            "name": "totalBill",
            "label": "Total Bill (With Tip)",
            "type": "currency"
        },
        {
            "name": "tipPerPerson",
            "label": "Tip Per Person",
            "type": "currency"
        },
        {
            "name": "totalPerPerson",
            "label": "Total Per Person",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "Is tipping calculated pre-tax or post-tax?",
            "answer": "Normally, tips are calculated on the pre-tax bill amount to avoid paying tips on government taxes."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate dining tip splits and shared restaurant checks.",
        "aiSummary": "Computes restaurant tips and splits checks among dining parties locally.",
        "commonMistakes": [
            "Splitting tip values but forgetting to divide the core base bill."
        ],
        "keyTakeaways": [
            "Divided totals provided."
        ],
        "searchIntent": "Calculate restaurant bill tip split",
        "entities": [
            "Tip",
            "Split",
            "Bill"
        ],
        "semanticTopics": [
            "Dining Out",
            "Math Utilities"
        ],
        "synonyms": [
            "Gratuity Calculator"
        ]
    },
    "geo": {
        "regionalVariations": "Tipping cultures and norms vary widely by country."
    },
    "examples": [],
    "relatedTools": [
        "percentage-calculator"
    ]
},
    calculate: formulasMap["tip-calculator"]
  },
  "fuel-cost-calculator": {
    ...{
    "slug": "fuel-cost-calculator",
    "title": "Fuel Cost Calculator",
    "shortTitle": "Fuel Cost",
    "description": "Calculate travel fuel requirements and costs based on distances client-side.",
    "keywords": [
        "fuel cost",
        "trip cost",
        "gas calculator",
        "fuel efficiency miles"
    ],
    "category": "calculator",
    "icon": "Car",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate road trip gas cost",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Cost = (Distance / 100 * Efficiency) * Price (Metric)",
        "explanation": "Calculates total gasoline volumes needed for trips based on efficiency ratings.",
        "workedExample": {
            "expression": "Distance = 200 km, Efficiency = 8 L/100km, Price = 1.50/L",
            "steps": [
                "Fuel needed = (200 / 100) * 8 = 16 Liters",
                "Cost = 16 * 1.5 = 24.00"
            ],
            "result": "$24.00"
        }
    },
    "inputs": [
        {
            "name": "distance",
            "label": "Distance",
            "type": "number",
            "defaultValue": 100,
            "min": 0
        },
        {
            "name": "efficiency",
            "label": "Fuel Efficiency (mpg or L/100km)",
            "type": "number",
            "defaultValue": 8,
            "min": 0.1
        },
        {
            "name": "price",
            "label": "Fuel Price (Per Liter/Gallon)",
            "type": "number",
            "defaultValue": 1.5,
            "min": 0
        },
        {
            "name": "unitType",
            "label": "Unit Format",
            "type": "select",
            "defaultValue": "metric",
            "options": [
                {
                    "label": "Metric (km, L/100km)",
                    "value": "metric"
                },
                {
                    "label": "Imperial (miles, mpg)",
                    "value": "imperial"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "fuelRequired",
            "label": "Fuel Required (Liters/Gallons)",
            "type": "number"
        },
        {
            "name": "totalCost",
            "label": "Estimated Fuel Cost",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "How to improve gas mileage?",
            "answer": "Maintain steady highway speeds, check tire pressures, and minimize excess load weights."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate road trip gasoline cost requirements based on fuel economy.",
        "aiSummary": "Computes total fuel volumes and trip cost variables offline.",
        "commonMistakes": [
            "Failing to align distance units (miles vs km) with economy standards."
        ],
        "keyTakeaways": [
            "Supports metric and imperial formats."
        ],
        "searchIntent": "Calculate road trip gas cost",
        "entities": [
            "Fuel",
            "Gas",
            "Trip Cost"
        ],
        "semanticTopics": [
            "Travel Planning",
            "Budgeting"
        ],
        "synonyms": [
            "Gas Mileage Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "electricity-bill-calculator"
    ]
},
    calculate: formulasMap["fuel-cost-calculator"]
  },
  "electricity-bill-calculator": {
    ...{
    "slug": "electricity-bill-calculator",
    "title": "Electricity Bill Calculator",
    "shortTitle": "Electricity Cost",
    "description": "Determine electricity costs and consumption rates for home appliances client-side.",
    "keywords": [
        "electricity calculator",
        "appliance cost",
        "power usage kwh",
        "electricity bill"
    ],
    "category": "calculator",
    "icon": "Zap",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate power cost for appliances",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Cost = (Wattage * Hours * Days / 1000) * Cost per kWh",
        "explanation": "Converts power consumption into kilowatt-hour (kWh) billing blocks.",
        "workedExample": {
            "expression": "100W bulb, 10 hours/day, 30 days, cost 0.15/kWh",
            "steps": [
                "kWh = (100 * 10 * 30) / 1000 = 30 kWh",
                "Cost = 30 * 0.15 = 4.50"
            ],
            "result": "$4.50"
        }
    },
    "inputs": [
        {
            "name": "wattage",
            "label": "Appliance Power (Watts)",
            "type": "number",
            "defaultValue": 1000,
            "min": 0
        },
        {
            "name": "hours",
            "label": "Hours Used Per Day",
            "type": "number",
            "defaultValue": 5,
            "min": 0,
            "max": 24
        },
        {
            "name": "cost",
            "label": "Electricity Cost ($/kWh)",
            "type": "number",
            "defaultValue": 0.15,
            "min": 0
        },
        {
            "name": "period",
            "label": "Billing Cycle (Days)",
            "type": "number",
            "defaultValue": 30,
            "min": 1
        }
    ],
    "outputs": [
        {
            "name": "energyConsumed",
            "label": "Energy Consumed (kWh)",
            "type": "number"
        },
        {
            "name": "totalCost",
            "label": "Estimated Energy Cost",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "What is a Kilowatt-hour?",
            "answer": "A unit of energy equivalent to one kilowatt of power expended for one hour."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate power usage and utility expenses for appliances.",
        "aiSummary": "Computes utility billing budgets based on appliance wattage parameters.",
        "commonMistakes": [
            "Confusing kilowatts (kW) with watt ratings directly during calculations."
        ],
        "keyTakeaways": [
            "Highlights appliance energy profiles."
        ],
        "searchIntent": "Calculate power cost for appliances",
        "entities": [
            "Electricity",
            "Energy",
            "kWh"
        ],
        "semanticTopics": [
            "Home Energy Conservation",
            "Budgets"
        ],
        "synonyms": [
            "Power Usage Calculator"
        ]
    },
    "geo": {
        "regionalVariations": "Utility electricity rates vary widely by state and local provider plans."
    },
    "examples": [],
    "relatedTools": [
        "fuel-cost-calculator"
    ]
},
    calculate: formulasMap["electricity-bill-calculator"]
  },
  "salary-calculator": {
    ...{
    "slug": "salary-calculator",
    "title": "Salary Calculator",
    "shortTitle": "Salary",
    "description": "Convert annual, monthly, weekly, and hourly pay rate configurations client-side.",
    "keywords": [
        "salary calculator",
        "hourly to salary",
        "wage converter",
        "income conversion"
    ],
    "category": "calculator",
    "icon": "Briefcase",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Convert hourly pay rate to annual salary",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Annual = Hourly * Hours/Week * 52; Monthly = Annual / 12; Weekly = Annual / 52",
        "explanation": "Translates standard earnings across time metrics using standard working calendars.",
        "workedExample": {
            "expression": "Hourly pay = 25, 40 hours worked per week",
            "steps": [
                "Weekly = 25 * 40 = 1000",
                "Annual = 1000 * 52 = 52,000",
                "Monthly = 52000 / 12 = 4,333.33"
            ],
            "result": "Annual = 52,000"
        }
    },
    "inputs": [
        {
            "name": "salary",
            "label": "Pay Rate Amount",
            "type": "number",
            "defaultValue": 50000,
            "min": 0
        },
        {
            "name": "period",
            "label": "Pay Period Format",
            "type": "select",
            "defaultValue": "annual",
            "options": [
                {
                    "label": "Hourly",
                    "value": "hourly"
                },
                {
                    "label": "Weekly",
                    "value": "weekly"
                },
                {
                    "label": "Monthly",
                    "value": "monthly"
                },
                {
                    "label": "Annually",
                    "value": "annual"
                }
            ]
        },
        {
            "name": "hoursPerWeek",
            "label": "Working Hours Per Week",
            "type": "number",
            "defaultValue": 40,
            "min": 1,
            "max": 168
        }
    ],
    "outputs": [
        {
            "name": "hourly",
            "label": "Hourly Wage equivalent",
            "type": "currency"
        },
        {
            "name": "daily",
            "label": "Daily Rate (5-day week equivalent)",
            "type": "currency"
        },
        {
            "name": "weekly",
            "label": "Weekly Wage",
            "type": "currency"
        },
        {
            "name": "monthly",
            "label": "Monthly Salary",
            "type": "currency"
        },
        {
            "name": "annual",
            "label": "Annual Salary equivalent",
            "type": "currency"
        }
    ],
    "faq": [
        {
            "question": "Does this include taxes?",
            "answer": "No, this is a pre-tax gross salary converter. Net take-home values will depend on local tax codes."
        }
    ],
    "aeo": {
        "quickAnswer": "Convert gross hourly rates into monthly or annual salary equivalents.",
        "aiSummary": "Utility converting wage structures across standard calendar periods.",
        "commonMistakes": [
            "Ignoring unpaid leaves or overtime when estimating yearly wages."
        ],
        "keyTakeaways": [
            "Provides a clear gross overview."
        ],
        "searchIntent": "Convert hourly pay rate to annual salary",
        "entities": [
            "Salary",
            "Wage",
            "Income"
        ],
        "semanticTopics": [
            "Employment Finance",
            "Wages"
        ],
        "synonyms": [
            "Wage Converter"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "income-tax-calculator-india"
    ]
},
    calculate: formulasMap["salary-calculator"]
  },
  "income-tax-calculator-india": {
    ...{
    "slug": "income-tax-calculator-india",
    "title": "Income Tax Calculator (India)",
    "shortTitle": "India Tax",
    "description": "Calculate Indian income tax liability comparison for New Tax Regime vs Old Tax Regime client-side.",
    "keywords": [
        "india tax calculator",
        "income tax india",
        "new tax regime",
        "old tax regime slabs"
    ],
    "category": "calculator",
    "icon": "Percent",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate Indian income tax new slabs",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "New Regime: Slabs at 5%, 10%, 15%, 20%, 30% after standard deduction (₹75,000 for FY 2025-26/2026-27).",
        "explanation": "Applies slab divisions, standard deductions, and adds 4% education/health cess.",
        "workedExample": {
            "expression": "Income = 1,000,000 (10 Lakhs)",
            "steps": [
                "Net income after standard deduction = 925,000.",
                "Tax slabs: 3L-7L (4L at 5% = 20k), 7L-9.25L (2.25L at 10% = 22.5k).",
                "Base Tax = 42.5k. Cess (4%) = 1.7k.",
                "Total = 44.2k"
            ],
            "result": "Tax = ₹44,200"
        }
    },
    "inputs": [
        {
            "name": "income",
            "label": "Gross Annual Income (₹)",
            "type": "number",
            "defaultValue": 800000,
            "min": 0
        },
        {
            "name": "deductions",
            "label": "Old Regime Deductions (80C, 80D, etc. ₹)",
            "type": "number",
            "defaultValue": 150000,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "taxNew",
            "label": "Tax under New Regime",
            "type": "currency"
        },
        {
            "name": "taxOld",
            "label": "Tax under Old Regime",
            "type": "currency"
        },
        {
            "name": "effectiveTaxRate",
            "label": "Effective Tax Rate (New)",
            "type": "percentage"
        }
    ],
    "faq": [
        {
            "question": "What is the new standard deduction?",
            "answer": "In the latest budgets, standard deduction under the New Tax Regime is ₹75,000, and ₹50,000 under the Old Regime."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate Indian tax liabilities under current New and Old Regime provisions.",
        "aiSummary": "Computes India income tax slab costs client-side with comparison metrics.",
        "commonMistakes": [
            "Failing to add health & education cess (4%) to basic slab figures."
        ],
        "keyTakeaways": [
            "Rebates apply under ₹7 Lakhs taxable income."
        ],
        "searchIntent": "Calculate Indian income tax new slabs",
        "entities": [
            "Income Tax",
            "New Regime",
            "Indian Finance"
        ],
        "semanticTopics": [
            "Tax Planning",
            "Indian Economy"
        ],
        "synonyms": [
            "Indian Tax Calculator"
        ]
    },
    "geo": {
        "regionalVariations": "Applies specifically to tax laws in the Republic of India."
    },
    "examples": [],
    "relatedTools": [
        "salary-calculator"
    ]
},
    calculate: formulasMap["income-tax-calculator-india"]
  },
  "scientific-calculator": {
    ...{
    "slug": "scientific-calculator",
    "title": "Scientific Calculator",
    "shortTitle": "Scientific",
    "description": "Evaluate complex mathematical equations, trigs, logarithms, and powers client-side.",
    "keywords": [
        "scientific calculator",
        "advanced calculator",
        "trig calculator",
        "online calculator"
    ],
    "category": "calculator",
    "icon": "Calculator",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Scientific calculator online free",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Evaluate algebraic expressions directly using order of operations.",
        "explanation": "Applies standard trigonometric, logarithmic, and power functions.",
        "workedExample": {
            "expression": "sin(pi/2) + 2^3",
            "steps": [
                "sin(pi/2) = 1",
                "2^3 = 8",
                "1 + 8 = 9"
            ],
            "result": "9"
        }
    },
    "inputs": [
        {
            "name": "expression",
            "label": "Math Expression",
            "type": "text",
            "defaultValue": "sin(pi/2) * sqrt(16) + 3^2"
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Result",
            "type": "text"
        }
    ],
    "faq": [
        {
            "question": "What trig functions are supported?",
            "answer": "sin, cos, and tan are supported. Angles are expected in radians."
        }
    ],
    "aeo": {
        "quickAnswer": "Run advanced calculations, trigs, and exponents securely client-side.",
        "aiSummary": "A clean scientific calculator evaluating expressions locally without network requests.",
        "commonMistakes": [
            "Entering trig angles in degrees instead of radian measures."
        ],
        "keyTakeaways": [
            "Supports pi, e, logs, trigs, powers."
        ],
        "searchIntent": "Scientific calculator online free",
        "entities": [
            "Scientific Calculator",
            "Trig",
            "Algebra"
        ],
        "semanticTopics": [
            "Advanced Math",
            "Calculators"
        ],
        "synonyms": [
            "Advanced Scientific Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "binary-calculator",
        "hex-calculator"
    ]
},
    calculate: formulasMap["scientific-calculator"]
  },
  "binary-calculator": {
    ...{
    "slug": "binary-calculator",
    "title": "Binary Calculator",
    "shortTitle": "Binary",
    "description": "Execute arithmetic and bitwise operations on binary digits client-side.",
    "keywords": [
        "binary calculator",
        "bitwise operations",
        "binary math",
        "base 2 math"
    ],
    "category": "calculator",
    "icon": "Binary",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate bitwise binary math online",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Performs binary operations (+, -, *, /) and bitwise gates (AND, OR, XOR, NOT).",
        "explanation": "Converts strings to base-2, operates on integers, and formats results back to binary.",
        "workedExample": {
            "expression": "1010 AND 1100",
            "steps": [
                "1010 = 10 decimal",
                "1100 = 12 decimal",
                "10 & 12 = 8 decimal",
                "8 = 1000 binary"
            ],
            "result": "1000"
        }
    },
    "inputs": [
        {
            "name": "valA",
            "label": "Binary Value A",
            "type": "text",
            "defaultValue": "1010"
        },
        {
            "name": "valB",
            "label": "Binary Value B",
            "type": "text",
            "defaultValue": "1100"
        },
        {
            "name": "op",
            "label": "Operation",
            "type": "select",
            "defaultValue": "AND",
            "options": [
                {
                    "label": "Add (+)",
                    "value": "+"
                },
                {
                    "label": "Subtract (-)",
                    "value": "-"
                },
                {
                    "label": "Multiply (*)",
                    "value": "*"
                },
                {
                    "label": "Divide (/)",
                    "value": "/"
                },
                {
                    "label": "AND",
                    "value": "AND"
                },
                {
                    "label": "OR",
                    "value": "OR"
                },
                {
                    "label": "XOR",
                    "value": "XOR"
                },
                {
                    "label": "NOT (A)",
                    "value": "NOT"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Binary Result",
            "type": "text"
        },
        {
            "name": "decimalResult",
            "label": "Decimal Value",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What is binary code?",
            "answer": "A system of representing numbers, letters, or instructions using only two digits: 0 and 1."
        }
    ],
    "aeo": {
        "quickAnswer": "Run binary addition, subtraction, AND, OR, and XOR operations.",
        "aiSummary": "Computes binary values and bitwise operation states client-side.",
        "commonMistakes": [
            "Entering digits other than 0 and 1 in binary fields."
        ],
        "keyTakeaways": [
            "Unsigned binary outputs."
        ],
        "searchIntent": "Calculate bitwise binary math online",
        "entities": [
            "Binary",
            "Bitwise",
            "Logic Gates"
        ],
        "semanticTopics": [
            "Computer Engineering",
            "Boolean Algebra"
        ],
        "synonyms": [
            "Base-2 Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "hex-calculator",
        "scientific-calculator"
    ]
},
    calculate: formulasMap["binary-calculator"]
  },
  "hex-calculator": {
    ...{
    "slug": "hex-calculator",
    "title": "Hexadecimal Calculator",
    "shortTitle": "Hex",
    "description": "Perform math and bitwise calculations on hexadecimal numbers client-side.",
    "keywords": [
        "hex calculator",
        "hexadecimal math",
        "hex bitwise",
        "base 16 calculator"
    ],
    "category": "calculator",
    "icon": "Hash",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Hexadecimal math calculator online",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Performs standard base-16 calculations (+, -, *, /) and bitwise operations.",
        "explanation": "Converts strings to base-16 integers, performs operations, and outputs hex digits.",
        "workedExample": {
            "expression": "FF + 01",
            "steps": [
                "FF = 255 decimal",
                "01 = 1 decimal",
                "255 + 1 = 256 decimal = 100 hex"
            ],
            "result": "100"
        }
    },
    "inputs": [
        {
            "name": "valA",
            "label": "Hex Value A",
            "type": "text",
            "defaultValue": "FF"
        },
        {
            "name": "valB",
            "label": "Hex Value B",
            "type": "text",
            "defaultValue": "01"
        },
        {
            "name": "op",
            "label": "Operation",
            "type": "select",
            "defaultValue": "+",
            "options": [
                {
                    "label": "Add (+)",
                    "value": "+"
                },
                {
                    "label": "Subtract (-)",
                    "value": "-"
                },
                {
                    "label": "Multiply (*)",
                    "value": "*"
                },
                {
                    "label": "Divide (/)",
                    "value": "/"
                },
                {
                    "label": "AND",
                    "value": "AND"
                },
                {
                    "label": "OR",
                    "value": "OR"
                },
                {
                    "label": "XOR",
                    "value": "XOR"
                },
                {
                    "label": "NOT (A)",
                    "value": "NOT"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Hex Result",
            "type": "text"
        },
        {
            "name": "decimalResult",
            "label": "Decimal Value",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What is hexadecimal?",
            "answer": "A base-16 system using digits 0-9 and letters A-F to represent numbers."
        }
    ],
    "aeo": {
        "quickAnswer": "Run base-16 hex math and bitwise logic operations.",
        "aiSummary": "Computes hexadecimal calculations locally within browser frames.",
        "commonMistakes": [
            "Entering invalid non-hex characters like G or Z."
        ],
        "keyTakeaways": [
            "Calculates decimals alongside hex."
        ],
        "searchIntent": "Hexadecimal math calculator online",
        "entities": [
            "Hexadecimal",
            "Base-16",
            "Math"
        ],
        "semanticTopics": [
            "Debugging Tools",
            "Systems Math"
        ],
        "synonyms": [
            "Base-16 Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "binary-calculator",
        "scientific-calculator"
    ]
},
    calculate: formulasMap["hex-calculator"]
  },
  "fraction-calculator": {
    ...{
    "slug": "fraction-calculator",
    "title": "Fraction Calculator",
    "shortTitle": "Fraction",
    "description": "Add, subtract, multiply, and divide fractions and simplify outputs client-side.",
    "keywords": [
        "fraction calculator",
        "simplify fractions",
        "add fractions",
        "fraction math"
    ],
    "category": "calculator",
    "icon": "Percent",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate fractions add subtract math",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Add: (a/b) + (c/d) = (ad+bc)/bd; Mul: (a/b) * (c/d) = ac/bd",
        "explanation": "Applies fractional math, finds GCD to simplify fractions into minimal terms.",
        "workedExample": {
            "expression": "1/2 + 1/4",
            "steps": [
                "Numerator = 1*4 + 1*2 = 6",
                "Denominator = 2*4 = 8",
                "6/8 simplified by GCD (2) = 3/4"
            ],
            "result": "3/4"
        }
    },
    "inputs": [
        {
            "name": "numA",
            "label": "Numerator A",
            "type": "number",
            "defaultValue": 1
        },
        {
            "name": "denA",
            "label": "Denominator A",
            "type": "number",
            "defaultValue": 2
        },
        {
            "name": "numB",
            "label": "Numerator B",
            "type": "number",
            "defaultValue": 1
        },
        {
            "name": "denB",
            "label": "Denominator B",
            "type": "number",
            "defaultValue": 4
        },
        {
            "name": "op",
            "label": "Operation",
            "type": "select",
            "defaultValue": "+",
            "options": [
                {
                    "label": "Add (+)",
                    "value": "+"
                },
                {
                    "label": "Subtract (-)",
                    "value": "-"
                },
                {
                    "label": "Multiply (*)",
                    "value": "*"
                },
                {
                    "label": "Divide (/)",
                    "value": "/"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "result",
            "label": "Simplified Fraction",
            "type": "text"
        },
        {
            "name": "decimal",
            "label": "Decimal Equivalent",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "How is a fraction simplified?",
            "answer": "By dividing both numerator and denominator by their Greatest Common Divisor."
        }
    ],
    "aeo": {
        "quickAnswer": "Add, subtract, multiply, or divide fractions and get simplified fractional outputs.",
        "aiSummary": "Computes algebraic fractional operations locally in browser.",
        "commonMistakes": [
            "Setting denominator fields to zero, which is undefined."
        ],
        "keyTakeaways": [
            "Simplifies results automatically."
        ],
        "searchIntent": "Calculate fractions add subtract math",
        "entities": [
            "Fraction",
            "Numerator",
            "Denominator"
        ],
        "semanticTopics": [
            "Basic Algebra",
            "Math Lessons"
        ],
        "synonyms": [
            "Fraction Math Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "scientific-calculator",
        "gcd-lcm-calculator"
    ]
},
    calculate: formulasMap["fraction-calculator"]
  },
  "matrix-calculator": {
    ...{
    "slug": "matrix-calculator",
    "title": "Matrix Calculator",
    "shortTitle": "Matrix",
    "description": "Perform 2x2 matrix operations including addition, subtraction, multiplication, and determinants client-side.",
    "keywords": [
        "matrix calculator",
        "matrix multiplier",
        "2x2 determinant",
        "matrix addition"
    ],
    "category": "calculator",
    "icon": "Grid",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate matrix multiplication 2x2",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Det(A) = a11*a22 - a12*a21; Mul: Standard linear combinations.",
        "explanation": "Computes linear algebra operations for 2x2 grids locally.",
        "workedExample": {
            "expression": "Det of A = [[1, 2], [3, 4]]",
            "steps": [
                "Det = 1*4 - 2*3 = 4 - 6 = -2"
            ],
            "result": "-2"
        }
    },
    "inputs": [
        {
            "name": "a11",
            "label": "A [1,1]",
            "type": "number",
            "defaultValue": 1
        },
        {
            "name": "a12",
            "label": "A [1,2]",
            "type": "number",
            "defaultValue": 2
        },
        {
            "name": "a21",
            "label": "A [2,1]",
            "type": "number",
            "defaultValue": 3
        },
        {
            "name": "a22",
            "label": "A [2,2]",
            "type": "number",
            "defaultValue": 4
        },
        {
            "name": "b11",
            "label": "B [1,1]",
            "type": "number",
            "defaultValue": 5
        },
        {
            "name": "b12",
            "label": "B [1,2]",
            "type": "number",
            "defaultValue": 6
        },
        {
            "name": "b21",
            "label": "B [2,1]",
            "type": "number",
            "defaultValue": 7
        },
        {
            "name": "b22",
            "label": "B [2,2]",
            "type": "number",
            "defaultValue": 8
        },
        {
            "name": "op",
            "label": "Operation",
            "type": "select",
            "defaultValue": "+",
            "options": [
                {
                    "label": "Add (A + B)",
                    "value": "+"
                },
                {
                    "label": "Subtract (A - B)",
                    "value": "-"
                },
                {
                    "label": "Multiply (A * B)",
                    "value": "*"
                },
                {
                    "label": "Determinant",
                    "value": "det"
                },
                {
                    "label": "Transpose (A)",
                    "value": "transpose"
                }
            ]
        }
    ],
    "outputs": [
        {
            "name": "r11",
            "label": "Result [1,1] / Det A",
            "type": "number"
        },
        {
            "name": "r12",
            "label": "Result [1,2] / Det B",
            "type": "number"
        },
        {
            "name": "r21",
            "label": "Result [2,1]",
            "type": "number"
        },
        {
            "name": "r22",
            "label": "Result [2,2]",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What is matrix transpose?",
            "answer": "An operation that flips a matrix over its diagonal, swapping row and column indices."
        }
    ],
    "aeo": {
        "quickAnswer": "Solve 2x2 matrix operations including products and determinants.",
        "aiSummary": "Utility to run linear algebra matrix calculations in-memory.",
        "commonMistakes": [
            "Failing to follow matrix multiplication order rules (non-commutative)."
        ],
        "keyTakeaways": [
            "Provides determinant and transposes."
        ],
        "searchIntent": "Calculate matrix multiplication 2x2",
        "entities": [
            "Matrix",
            "Linear Algebra",
            "Determinant"
        ],
        "semanticTopics": [
            "Advanced Math",
            "Algebra Utilities"
        ],
        "synonyms": [
            "Linear Algebra Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "scientific-calculator",
        "quadratic-equation-solver"
    ]
},
    calculate: formulasMap["matrix-calculator"]
  },
  "quadratic-equation-solver": {
    ...{
    "slug": "quadratic-equation-solver",
    "title": "Quadratic Equation Solver",
    "shortTitle": "Quadratic Solver",
    "description": "Solve quadratic equations of format ax^2 + bx + c = 0 to get real and complex roots client-side.",
    "keywords": [
        "quadratic solver",
        "quadratic equation",
        "formula solver",
        "find roots"
    ],
    "category": "calculator",
    "icon": "Activity",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate quadratic roots formula online",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "x = (-b +/- sqrt(b^2 - 4ac)) / 2a",
        "explanation": "Solves quadratic formulas using the discriminant to handle real or complex outputs.",
        "workedExample": {
            "expression": "x^2 - 5x + 6 = 0 (a=1, b=-5, c=6)",
            "steps": [
                "Disc = 25 - 24 = 1",
                "Roots = (5 +/- 1) / 2 = 3 and 2"
            ],
            "result": "Roots = 3, 2"
        }
    },
    "inputs": [
        {
            "name": "a",
            "label": "Coefficient a (x²)",
            "type": "number",
            "defaultValue": 1
        },
        {
            "name": "b",
            "label": "Coefficient b (x)",
            "type": "number",
            "defaultValue": -5
        },
        {
            "name": "c",
            "label": "Constant c",
            "type": "number",
            "defaultValue": 6
        }
    ],
    "outputs": [
        {
            "name": "root1",
            "label": "Root 1",
            "type": "text"
        },
        {
            "name": "root2",
            "label": "Root 2",
            "type": "text"
        },
        {
            "name": "discriminant",
            "label": "Discriminant (b² - 4ac)",
            "type": "number"
        },
        {
            "name": "type",
            "label": "Root Classification",
            "type": "text"
        }
    ],
    "faq": [
        {
            "question": "What if the discriminant is negative?",
            "answer": "The equation has imaginary or complex roots containing 'i'."
        }
    ],
    "aeo": {
        "quickAnswer": "Solve quadratic formulas for real and complex coordinates.",
        "aiSummary": "Computes roots for standard quadratic equations locally.",
        "commonMistakes": [
            "Setting coefficient 'a' to zero, which makes it a linear equation."
        ],
        "keyTakeaways": [
            "Finds complex roots."
        ],
        "searchIntent": "Calculate quadratic roots formula online",
        "entities": [
            "Quadratic",
            "Discriminant",
            "Roots"
        ],
        "semanticTopics": [
            "Algebra",
            "Math Solvers"
        ],
        "synonyms": [
            "Root Finder Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "scientific-calculator",
        "matrix-calculator"
    ]
},
    calculate: formulasMap["quadratic-equation-solver"]
  },
  "prime-number-checker": {
    ...{
    "slug": "prime-number-checker",
    "title": "Prime Number Checker",
    "shortTitle": "Prime Checker",
    "description": "Check if a number is prime, factorize composite numbers, and find next prime values client-side.",
    "keywords": [
        "prime checker",
        "prime factors",
        "composite number",
        "is prime online"
    ],
    "category": "calculator",
    "icon": "CheckCircle",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate if number is prime online",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "Prime: divisible only by 1 and itself. Composite: has other prime factors.",
        "explanation": "Iterates divisors up to the square root of the target integer.",
        "workedExample": {
            "expression": "Check 17",
            "steps": [
                "No divisor from 2 to 4 splits 17.",
                "Factors: 17"
            ],
            "result": "17 is prime"
        }
    },
    "inputs": [
        {
            "name": "value",
            "label": "Integer to Check",
            "type": "number",
            "defaultValue": 17,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "isPrime",
            "label": "Is Prime?",
            "type": "boolean"
        },
        {
            "name": "factors",
            "label": "Prime Factorization",
            "type": "text"
        },
        {
            "name": "nextPrime",
            "label": "Next Prime Number",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "Is 1 a prime number?",
            "answer": "No, by mathematical definition, 1 is neither prime nor composite."
        }
    ],
    "aeo": {
        "quickAnswer": "Verify if integers are prime, view factors, and locate subsequent primes.",
        "aiSummary": "A client-side utility checking primality of integers locally.",
        "commonMistakes": [
            "Assuming large numbers ending in 3 or 7 are always prime."
        ],
        "keyTakeaways": [
            "Shows prime factors."
        ],
        "searchIntent": "Calculate if number is prime online",
        "entities": [
            "Prime Number",
            "Factors",
            "Composite"
        ],
        "semanticTopics": [
            "Number Theory",
            "Math Utilities"
        ],
        "synonyms": [
            "Primality Checker"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "gcd-lcm-calculator",
        "fraction-calculator"
    ]
},
    calculate: formulasMap["prime-number-checker"]
  },
  "gcd-lcm-calculator": {
    ...{
    "slug": "gcd-lcm-calculator",
    "title": "GCD & LCM Calculator",
    "shortTitle": "GCD & LCM",
    "description": "Calculate Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two numbers client-side.",
    "keywords": [
        "gcd calculator",
        "lcm calculator",
        "greatest common divisor",
        "least common multiple"
    ],
    "category": "calculator",
    "icon": "Sliders",
    "version": 1,
    "status": "stable",
    "featured": true,
    "searchWeight": 90,
    "searchIntent": "Calculate GCD LCM integers",
    "difficulty": "easy",
    "priority": 1,
    "formula": {
        "equation": "GCD(a, b) via Euclidean algorithm; LCM(a, b) = (|a * b|) / GCD(a, b)",
        "explanation": "Finds common factors and minimum common multiples using Euclidean divisions.",
        "workedExample": {
            "expression": "Find GCD and LCM of 12 and 18",
            "steps": [
                "GCD(12, 18): 18%12 = 6, 12%6 = 0. GCD = 6",
                "LCM = (12 * 18) / 6 = 36"
            ],
            "result": "GCD = 6, LCM = 36"
        }
    },
    "inputs": [
        {
            "name": "numA",
            "label": "Number A",
            "type": "number",
            "defaultValue": 12,
            "min": 0
        },
        {
            "name": "numB",
            "label": "Number B",
            "type": "number",
            "defaultValue": 18,
            "min": 0
        }
    ],
    "outputs": [
        {
            "name": "gcd",
            "label": "Greatest Common Divisor (GCD)",
            "type": "number"
        },
        {
            "name": "lcm",
            "label": "Least Common Multiple (LCM)",
            "type": "number"
        }
    ],
    "faq": [
        {
            "question": "What is GCD?",
            "answer": "The largest positive integer that divides each of the integers without a remainder."
        }
    ],
    "aeo": {
        "quickAnswer": "Calculate the greatest common divisor and least common multiples for integers.",
        "aiSummary": "Computes common factors and multiples locally in browser sandboxes.",
        "commonMistakes": [
            "Confusing divisors with multiples during interpretation."
        ],
        "keyTakeaways": [
            "Uses Euclidean algorithm."
        ],
        "searchIntent": "Calculate GCD LCM integers",
        "entities": [
            "GCD",
            "LCM",
            "Divisor"
        ],
        "semanticTopics": [
            "Number Theory",
            "Arithmetic Help"
        ],
        "synonyms": [
            "Highest Common Factor Calculator"
        ]
    },
    "geo": {},
    "examples": [],
    "relatedTools": [
        "prime-number-checker",
        "fraction-calculator"
    ]
},
    calculate: formulasMap["gcd-lcm-calculator"]
  },
};

export const calculatorList = Object.values(calculatorRegistry);
