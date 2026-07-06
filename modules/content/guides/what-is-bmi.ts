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

export const whatIsBmiGuide: GuideContent = {
  // ─── Identity ───────────────────────────────────────────────────────
  id: "guide.what-is-bmi",
  type: "guide",
  slug: "what-is-bmi",
  title: "What is BMI?",
  description:
    "Understand Body Mass Index. Learn how it is calculated, what the ranges represent, and its limitations.",
  seoTitle:
    "What is Body Mass Index (BMI) | BMI Calculation Guide | ToolsAtZero",
  metaDescription:
    "Comprehensive guide to Body Mass Index (BMI). Learn classification ranges, weight charts, and how to compute scores client-side.",
  keywords: [
    "what is bmi",
    "calculate body mass index",
    "bmi ranges",
    "weight class chart",
    "bmi score explanation",
    "bmi formula",
    "bmi categories",
    "healthy weight range",
  ],
  entityIds: [
    "entity.bmi",
    "entity.who-classification",
    "entity.body-composition",
  ],
  status: "published",

  // ─── Meta ───────────────────────────────────────────────────────────
  meta: defaultMeta({
    topicId: "calculator.bmi",
    difficulty: "beginner",
    readingTimeMinutes: 4,
    targetAudience: [
      "health-conscious individuals",
      "fitness beginners",
      "students",
      "healthcare workers",
    ],
    searchIntents: ["informational", "definitional"],
    aliases: [
      "body mass index",
      "bmi meaning",
      "bmi definition",
      "weight index",
    ],
  }),
  generation: defaultGenerationMeta(),
  scores: defaultScores(),
  analytics: defaultAnalytics({ priority: 6, expectedTraffic: "high" }),
  localization: defaultLocalization(),
  author: defaultAuthor(),

  // ─── Relationships ──────────────────────────────────────────────────
  relationships: defaultRelationships({
    parents: ["category.calculator-tools", "category.health-tools"],
    siblings: ["guide.calculate-emi"],
    relatedGuides: ["guide.calculate-emi", "guide.json-formatter"],
    relatedComparisons: ["comparison.bmi-vs-body-fat"],
    relatedCategories: ["category.health-tools"],
  }),
  recommendations: defaultRecommendations({
    beginner: ["guide.compress-images", "guide.convert-png-to-jpg"],
    next: ["guide.calculate-emi"],
    advanced: ["guide.json-formatter"],
  }),

  // ─── AI Blocks ──────────────────────────────────────────────────────
  aiBlocks: defaultAIBlocks({
    aiSummary:
      "BMI (Body Mass Index) is a screening metric calculated as weight in kilograms divided by height in meters squared. It classifies adults into Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), and Obese (30+) categories per WHO standards. BMI is a quick population-level indicator but does not distinguish between muscle and fat mass.",
    keyTakeaways: [
      "BMI = weight (kg) / height (m)². Imperial: BMI = 703 × weight (lbs) / height (in)²",
      "WHO categories: Underweight <18.5, Normal 18.5–24.9, Overweight 25–29.9, Obese ≥30",
      "BMI does not measure body fat directly — muscular individuals may have a high BMI despite low body fat",
      "Children's BMI uses age-and-sex-specific percentile charts, not adult cutoffs",
      "Use client-side calculators to avoid sharing personal health data with servers",
    ],
    quickFacts: [
      "BMI was invented by Belgian mathematician Adolphe Quetelet in 1832",
      "The term 'Body Mass Index' was coined by Ancel Keys in a 1972 research paper",
      "BMI is used in life insurance underwriting to estimate health risk categories",
      "Asian populations may face higher health risks at lower BMI cutoffs (≥23 for overweight)",
      "BMI does not account for bone density, muscle mass, age, sex, or fat distribution",
    ],
    expertTips: [
      "Complement BMI with waist-to-height ratio (WHtR) for a better indicator of visceral fat risk — WHtR < 0.5 is the healthy target",
      "For athletes and bodybuilders, DEXA scans or bioimpedance measurements are more meaningful than BMI",
      "Track BMI trends over time rather than fixating on a single measurement",
    ],
  }),

  // ─── Quick Answer ──────────────────────────────────────────────────
  quickAnswer:
    "BMI (Body Mass Index) is a simple ratio of weight to height squared, used to screen for weight categories. The formula is weight (kg) ÷ height (m)². A BMI of 18.5–24.9 is considered normal weight by WHO standards. It's a useful screening tool but does not directly measure body fat or account for muscle mass.",

  // ─── Introduction ──────────────────────────────────────────────────
  introduction:
    "Body Mass Index (BMI) is a simple screening index that estimates body fat classifications using height and weight parameters. Learn what the metrics represent, how to compute them privately, and the important limitations of relying on BMI alone.",

  // ─── Why It Matters ────────────────────────────────────────────────
  whyItMatters:
    "BMI is the most widely used population-level screening tool for weight-related health risks. Doctors, insurers, and public health agencies reference BMI categories to identify individuals at higher risk for conditions like type 2 diabetes, cardiovascular disease, and hypertension.",

  // ─── Table of Contents ─────────────────────────────────────────────
  toc: [
    "How BMI is Calculated",
    "Standard Weight Classification Ranges",
    "Limitations of Body Mass Index",
    "Calculating BMI Locally",
    "Frequently Asked Questions",
  ],

  // ─── Steps ─────────────────────────────────────────────────────────
  steps: [
    "Open the BMI Calculator page.",
    "Toggle between Metric (cm/kg) or Imperial (feet/inches/pounds) inputs.",
    "Enter your accurate weight and height details.",
    "Click calculate to get your BMI score.",
    "Compare your score with the standard WHO classification chart.",
  ],

  // ─── How It Works ──────────────────────────────────────────────────
  howItWorks:
    "BMI divides body weight by the square of height to produce a dimensionless number. In metric units: BMI = kg / m². In imperial units: BMI = 703 × lbs / in². The squaring of height normalizes the index across different body heights so that taller and shorter people can be compared on the same scale. The resulting number is then mapped to WHO classification ranges to indicate weight category.",

  // ─── Examples ──────────────────────────────────────────────────────
  examples: [
    "A person weighing 70 kg at 1.75 m → BMI = 70 / 1.75² = 22.9 (Normal weight)",
    "A person weighing 90 kg at 1.70 m → BMI = 90 / 1.70² = 31.1 (Obese Class I)",
    "A person weighing 150 lbs at 5'6\" → BMI = 703 × 150 / 66² = 24.2 (Normal weight)",
    "A child aged 10 with BMI 18 → plotted on CDC growth chart at 75th percentile (healthy range)",
  ],

  // ─── Best Practices ───────────────────────────────────────────────
  bestPractices: [
    "Combine BMI checks with other fitness metrics like waist-to-height ratio for a fuller picture.",
    "Measure your height without shoes for accurate input parameters.",
    "Input your weight in the morning before meals for consistent tracking.",
    "Track BMI over months rather than reacting to a single data point.",
  ],

  // ─── Common Mistakes ──────────────────────────────────────────────
  commonMistakes: [
    "Using BMI as a definitive indicator of fat percentage; it does not distinguish muscle mass from fat.",
    "Comparing children's BMI values with adult standards; children require percentile charts.",
    "Saving weight logs on public databases instead of using local calculators.",
    "Confusing metric and imperial inputs — entering kg in the pounds field yields wildly incorrect results.",
  ],

  // ─── Pro Tips ──────────────────────────────────────────────────────
  proTips: [
    "Use waist-to-height ratio (WHtR) alongside BMI — a WHtR under 0.5 correlates more strongly with low cardiovascular risk.",
    "For athletes, track body fat percentage via calipers or bioimpedance instead of relying on BMI.",
    "Log your BMI monthly in a local spreadsheet to identify trends without sharing data with fitness apps.",
  ],

  // ─── Troubleshooting ──────────────────────────────────────────────
  troubleshooting: [
    {
      question: "My BMI seems too high but I exercise regularly.",
      answer:
        "BMI does not distinguish muscle from fat. Muscular individuals often score in the 'overweight' range despite having low body fat. Use body fat percentage or DEXA scan instead.",
    },
    {
      question: "The calculator gives different results than my doctor's.",
      answer:
        "Check unit consistency. Ensure you're using the same measurement system (metric vs imperial) and that height is entered in the correct unit (meters, not centimeters in the meter field).",
    },
    {
      question: "Should I use my height with or without shoes?",
      answer:
        "Without shoes. Even 1–2 cm can shift your BMI by 0.2–0.4 points.",
    },
    {
      question: "How do I calculate BMI for children?",
      answer:
        "Use the same formula, but interpret the result using age-and-sex-specific CDC or WHO percentile charts. A BMI percentile between 5th and 85th is considered healthy for children.",
    },
    {
      question: "Why is my BMI different in the morning vs evening?",
      answer:
        "Body weight fluctuates 1–2 kg throughout the day due to food, water intake, and hydration. Measure at the same time each day for consistency.",
    },
  ],

  // ─── Benefits ──────────────────────────────────────────────────────
  benefits: [
    "Quick screening — requires only height and weight, no equipment beyond a scale and tape measure",
    "Universally understood — doctors, insurers, and researchers worldwide use the same BMI scale",
    "Free and private — calculate locally without sharing personal health data",
    "Trend tracking — simple to compute repeatedly for monitoring weight changes over time",
  ],

  // ─── Limitations ──────────────────────────────────────────────────
  limitations: [
    "Does not distinguish between muscle, bone, and fat mass — athletes may be misclassified",
    "Does not account for fat distribution — abdominal fat is a stronger disease risk predictor than total weight",
    "Standard cutoffs may not apply equally across all ethnic groups — Asian and South Asian populations face higher risks at lower BMI",
    "Not applicable to pregnant women, growing children (without percentile charts), or the elderly with bone density changes",
  ],

  // ─── Security Notes ───────────────────────────────────────────────
  securityNotes: [
    "Client-side BMI calculators process your weight and height in JavaScript — no health data is transmitted to servers",
    "Avoid entering personal measurements on sites that require account creation — they may store your data for profiling",
  ],

  // ─── Performance Tips ─────────────────────────────────────────────
  performanceTips: [
    "BMI calculation is a single arithmetic operation — performance is never a concern",
    "For batch calculations (e.g., classroom datasets), use a spreadsheet formula: =weight/(height^2)",
    "Render the WHO classification chart as static SVG for instant display without JavaScript computation",
  ],

  // ─── Use Cases ─────────────────────────────────────────────────────
  useCases: [
    "Personal health: Quick self-assessment of weight category relative to WHO guidelines",
    "Clinical screening: Doctors use BMI as a first-pass filter before ordering detailed body composition tests",
    "Insurance underwriting: Life and health insurance companies categorize applicants by BMI for risk assessment",
    "Public health research: Epidemiologists use population BMI distributions to track obesity trends",
    "Fitness tracking: Individuals monitor BMI alongside other metrics to gauge progress over time",
  ],

  // ─── FAQs ──────────────────────────────────────────────────────────
  faqs: [
    // Existing
    {
      question: "What is the standard BMI formula?",
      answer:
        "BMI = weight (kg) / [height (m)]^2. In imperial: BMI = 703 x weight (lbs) / [height (in)]^2.",
    },
    {
      question: "What are the standard weight classifications?",
      answer:
        "Underweight: <18.5, Normal: 18.5-24.9, Overweight: 25-29.9, Obese: 30+.",
    },
    // What
    {
      question: "What does BMI stand for?",
      answer:
        "Body Mass Index — a numerical value derived from dividing weight by height squared.",
    },
    {
      question: "What is a healthy BMI range?",
      answer:
        "The WHO defines 18.5–24.9 as normal/healthy weight for adults.",
    },
    {
      question: "What are the obesity sub-classes?",
      answer:
        "Obesity Class I: BMI 30–34.9, Class II: 35–39.9, Class III (morbid obesity): 40+.",
    },
    // Who
    {
      question: "Who invented BMI?",
      answer:
        "Belgian mathematician Adolphe Quetelet developed the index in 1832. Ancel Keys popularized the term 'Body Mass Index' in 1972.",
    },
    {
      question: "Who should not rely on BMI alone?",
      answer:
        "Athletes, bodybuilders, pregnant women, elderly individuals, and people from ethnic groups where standard cutoffs may not apply (e.g., Asian populations).",
    },
    // When
    {
      question: "When should I check my BMI?",
      answer:
        "Monthly or quarterly is sufficient for trend tracking. More frequent checks add noise due to daily weight fluctuations.",
    },
    {
      question: "When is BMI medically significant?",
      answer:
        "When it falls outside the 18.5–24.9 range and is combined with other risk factors like high blood pressure, elevated blood sugar, or family history of metabolic disease.",
    },
    // Where
    {
      question: "Where do BMI cutoffs come from?",
      answer:
        "The WHO established the standard adult cutoffs based on epidemiological data linking BMI ranges to morbidity and mortality rates across large population studies.",
    },
    // Why
    {
      question: "Why is BMI still used despite its limitations?",
      answer:
        "It's simple, free, non-invasive, and correlates well with health outcomes at the population level. It serves as a useful first-pass screening tool before more detailed assessments.",
    },
    {
      question: "Why do Asian BMI cutoffs differ?",
      answer:
        "Research shows Asian populations develop weight-related metabolic conditions at lower BMI values. The WHO suggests overweight cutoff of 23 (not 25) for Asian populations.",
    },
    {
      question: "Why doesn't BMI account for muscle?",
      answer:
        "BMI uses only total body weight — it cannot differentiate between muscle tissue, fat tissue, bone, and water. It was designed as a statistical tool for populations, not individual diagnosis.",
    },
    // How
    {
      question: "How accurate is BMI as a health indicator?",
      answer:
        "At the population level, BMI correlates well with body fat and health outcomes. At the individual level, it can misclassify muscular or elderly people. It's a screening tool, not a diagnostic one.",
    },
    {
      question: "How do I calculate BMI in imperial units?",
      answer:
        "BMI = 703 × weight (lbs) / [height (inches)]². For a 160 lb person at 5'8\" (68 inches): 703 × 160 / 68² = 24.3.",
    },
    {
      question: "How is BMI different from body fat percentage?",
      answer:
        "BMI is a ratio of weight to height — it includes muscle, bone, and water weight. Body fat percentage measures only the proportion of body weight that is adipose tissue.",
    },
    // Can
    {
      question: "Can BMI be too low?",
      answer:
        "Yes. A BMI below 18.5 is classified as underweight and is associated with malnutrition, weakened immunity, and bone density loss.",
    },
    {
      question: "Can two people with the same BMI have different health risks?",
      answer:
        "Yes. A person with a BMI of 27 from excess abdominal fat has higher cardiovascular risk than a person with BMI 27 from muscular legs. Fat distribution matters.",
    },
    {
      question: "Can BMI change without weight change?",
      answer:
        "Only if height changes. In adults, height is stable, so BMI changes reflect weight changes. In children, height growth affects BMI independently of weight gain.",
    },
    // Should
    {
      question: "Should I aim for the lowest possible BMI?",
      answer:
        "No. Very low BMI (<18.5) carries its own health risks. The goal is the 18.5–24.9 range, combined with other health markers like blood pressure and activity level.",
    },
    {
      question: "Should athletes use a different metric?",
      answer:
        "Yes. Athletes should use body fat percentage (via calipers, bioimpedance, or DEXA) or waist-to-height ratio for a more accurate assessment of body composition.",
    },
    // Is
    {
      question: "Is BMI the same for men and women?",
      answer:
        "The formula and cutoffs are the same. However, women naturally carry more body fat than men at the same BMI, so the health implications can differ.",
    },
    {
      question: "Is BMI useful for elderly people?",
      answer:
        "With caution. Elderly individuals lose height and muscle mass with age, which can make BMI misleading. A slightly higher BMI (23–27) may actually be protective in older adults.",
    },
    // Does
    {
      question: "Does BMI predict specific diseases?",
      answer:
        "BMI correlates with risk for type 2 diabetes, hypertension, cardiovascular disease, and certain cancers at the population level, but it does not predict individual outcomes.",
    },
    {
      question: "Does BMI change with age?",
      answer:
        "Body composition changes with age (muscle loss, fat gain), but the formula doesn't account for age. The same BMI number may represent different health states at different ages.",
    },
    {
      question: "Does the calculator store my health data?",
      answer:
        "Not on ToolsAtZero — all calculations run client-side in JavaScript. Your weight and height values are never transmitted or stored.",
    },
    {
      question: "Does height measurement method matter?",
      answer:
        "Yes. Self-reported height tends to be 1–2 cm too high. Use a wall-mounted stadiometer or mark your height against a wall with a flat object on your head for accuracy.",
    },
  ],

  // ─── Related Questions ─────────────────────────────────────────────
  relatedQuestions: [
    {
      question: "What is BMR (Basal Metabolic Rate)?",
      answer:
        "BMR is the number of calories your body burns at rest to maintain basic functions like breathing and circulation. It's calculated using weight, height, age, and sex.",
    },
    {
      question: "How do I calculate my ideal weight?",
      answer:
        "One common method: for men, 50 kg + 2.3 kg per inch over 5 feet; for women, 45.5 kg + 2.3 kg per inch over 5 feet. BMI range 20–22 also gives a target weight window.",
    },
    {
      question: "What is waist-to-hip ratio?",
      answer:
        "WHR = waist circumference ÷ hip circumference. A WHR above 0.90 for men or 0.85 for women indicates higher cardiovascular risk.",
    },
    {
      question: "How many calories should I eat to lose weight?",
      answer:
        "A safe deficit is 500 kcal/day below your TDEE (Total Daily Energy Expenditure), resulting in approximately 0.5 kg (1 lb) of weight loss per week.",
    },
    {
      question: "What is body fat percentage?",
      answer:
        "The proportion of total body weight that is adipose (fat) tissue. Healthy ranges: men 10–20%, women 18–28%. Measured via calipers, bioimpedance, or DEXA scan.",
    },
    {
      question: "Is BMI or waist circumference a better health predictor?",
      answer:
        "Waist circumference is a better predictor of visceral fat and metabolic risk. A waist over 102 cm (40 in) for men or 88 cm (35 in) for women indicates elevated risk.",
    },
    {
      question: "How do I track BMI over time?",
      answer:
        "Record your weight and height monthly in a spreadsheet or local tracking app. Plot BMI on a line chart to visualize trends.",
    },
    {
      question: "What is DEXA scan?",
      answer:
        "Dual-Energy X-ray Absorptiometry — a medical imaging test that measures bone density, muscle mass, and fat mass with high precision. It's the gold standard for body composition analysis.",
    },
    {
      question: "Can I calculate BMI during pregnancy?",
      answer:
        "Pre-pregnancy BMI is used to guide weight gain recommendations during pregnancy. BMI calculated during pregnancy is not clinically meaningful due to the weight of the fetus, placenta, and fluid.",
    },
    {
      question: "What is the difference between BMI and BSA?",
      answer:
        "BSA (Body Surface Area) estimates the total surface area of the body, used in drug dosage calculations. BMI estimates body fat classification. Different formulas, different purposes.",
    },
  ],

  // ─── Glossary ──────────────────────────────────────────────────────
  glossary: [
    {
      term: "BMI (Body Mass Index)",
      definition:
        "A numerical index of weight relative to height (kg/m²), used to classify individuals into weight categories for health screening.",
    },
    {
      term: "WHO (World Health Organization)",
      definition:
        "The United Nations agency that established the standard BMI classification ranges used worldwide.",
    },
    {
      term: "Underweight",
      definition:
        "A BMI classification below 18.5, associated with malnutrition, weakened immunity, and increased susceptibility to illness.",
    },
    {
      term: "Overweight",
      definition:
        "A BMI classification of 25.0–29.9, indicating excess body weight that may increase health risk factors.",
    },
    {
      term: "Obese",
      definition:
        "A BMI classification of 30.0 or higher, strongly associated with increased risk of type 2 diabetes, cardiovascular disease, and certain cancers.",
    },
    {
      term: "Visceral fat",
      definition:
        "Fat stored around internal organs in the abdominal cavity. More metabolically active and dangerous than subcutaneous fat, but not measured by BMI.",
    },
    {
      term: "Waist-to-height ratio (WHtR)",
      definition:
        "A simple measurement (waist circumference ÷ height) that better predicts cardiovascular risk than BMI. Target: below 0.5.",
    },
    {
      term: "Percentile chart",
      definition:
        "A growth chart used for children that shows how a child's BMI compares to others of the same age and sex. The 5th–85th percentile is considered healthy.",
    },
  ],

  // ─── Conclusion ────────────────────────────────────────────────────
  conclusion:
    "BMI is a quick, free, and widely recognized screening tool for weight classification, but it has real limitations — it cannot distinguish muscle from fat or account for fat distribution. Use it as one data point alongside waist-to-height ratio, body fat percentage, and clinical markers for a complete health picture.",

  // ─── Convenience fields ────────────────────────────────────────────
  relatedTools: ["bmi-calculator", "bmr-calculator", "calorie-calculator"],
  relatedGuides: ["how-to-calculate-emi", "json-formatter-explained"],
};
