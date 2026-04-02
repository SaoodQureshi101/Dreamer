import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config.js";
import { CITY_MULTIPLIERS } from "../data.js";
import { getCostOfLivingScore, getMedianHomeValue } from "./services/cost.js";
import { getSalaryFromDataUSA } from "./services/salary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.resolve(__dirname, "..");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from parent directory
console.log("Serving static files from:", parentDir);
app.use(express.static(parentDir));

app.post("/plan", async (req, res) => {
  const { career, city, housing } = req.body;

  const costData = await getCostOfLivingScore(city);
  const multiplier = costData ? costData.score_out_of_10 / 10 : 1.0;
  const locationMultiplier = CITY_MULTIPLIERS[city] || 1.0;

  const salary = await getSalaryFromDataUSA(career, city, locationMultiplier);

  const state = config.states.CITY_TO_STATE[city] || 'US';
  const taxRate = config.states.taxRates[state];

  const { rentBase, rentMultiplier, rentFallback, otherExpenses, costOfLivingCategory } =
    config.costs;

  let rentCost = rentFallback;

  if (costData) {
    const score = costData.score_out_of_10;
    rentCost = rentBase + score * rentMultiplier;
  }

  const afterTaxSalary = salary * (1 - taxRate);
  const monthlyIncome = afterTaxSalary / 12;
  const expenses = rentCost + otherExpenses;
  const savings = monthlyIncome - expenses;

  let houseCost = null;
  if (housing === "house" || housing === "luxury") {
    const medianHomeValue = await getMedianHomeValue(city);
    const propertyTaxRate = config.states.propertyTaxRates[state];
    const annualPropertyTax = medianHomeValue * propertyTaxRate;
    const totalAnnualCost = medianHomeValue + annualPropertyTax;
    houseCost = Math.round(totalAnnualCost / 12);
  }

  res.json({
    salary,
    taxRate,
    afterTaxSalary: Math.round(afterTaxSalary),
    rent: Math.round(rentCost),
    monthlyIncome: Math.round(monthlyIncome),
    expenses: Math.round(expenses),
    savings: Math.round(savings),
    multiplier: costData.score_out_of_10 / 10,
    houseCost,
  });
});

app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);
