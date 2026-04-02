// ===============================
// reality-check.js
// ===============================
import {
    JOB_SALARIES,
    CITY_MULTIPLIERS,
    HOUSING_COSTS,
    TRANSPORT_COSTS,
    VACATION_COSTS,
    ENTERTAINMENT_COSTS,
    AFTER_TAX_RATE,
    DEFAULTS,
    SCORE_TIERS,
    NEXT_STEPS,
  } from "./data.js";

console.log("reality-check.js loaded");

/**
 * Get salary and tax from server
 */
const getSalaryAndTax = async (career, city, housing) => {
  const res = await fetch('/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ career, city, housing })
  });
  const data = await res.json();
  return { salary: data.salary, taxRate: data.taxRate, afterTaxSalary: data.afterTaxSalary, multiplier: data.multiplier, houseCost: data.houseCost };
};

// ===============================
// Utility
// ===============================
function formatSalary(num) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(num);
}

// ===============================
// Reality Score Calculation
// ===============================
function calculateRealityScore(
  baseSalary,
  taxRate,
  afterTaxSalary,
  multiplier,
  houseCost,
  desiredJob,
  jobCity,
  housing,
  transportation,
  vacation,
  entertainment
) {
  let housingCost;
  if (housing === "house" || housing === "luxury") {
    housingCost = houseCost ?? DEFAULTS.housingCost;
  } else {
    housingCost = (HOUSING_COSTS[housing] ?? DEFAULTS.housingCost) * multiplier;
  }
  const transportCost = TRANSPORT_COSTS[transportation] ?? DEFAULTS.transportCost;
  const vacationCost = VACATION_COSTS[vacation] ?? DEFAULTS.vacationCost;
  const entertainmentCost = ENTERTAINMENT_COSTS[entertainment] ?? DEFAULTS.entertainmentCost;

  const totalMonthlyExpenses = housingCost + transportCost + vacationCost + entertainmentCost;
  const totalAnnualExpenses = totalMonthlyExpenses * 12;

  const ratio = afterTaxSalary / totalAnnualExpenses;

  let score;
  if (ratio < 0.8) score = 1;
  else if (ratio < 1.0) score = 1.5;
  else if (ratio < 1.2) score = 2.5;
  else if (ratio < 1.5) score = 3.5;
  else if (ratio < 2.0) score = 4.5;
  else score = 5;

  // Reasoning messages
  const reasoning = [
    `${desiredJob} in ${jobCity === "anywhere" ? "most places" : jobCity} pays ~$${formatSalary(baseSalary)}/year`,
    `after taxes (~${Math.round(taxRate * 100)}%), you're left with ~$${formatSalary(afterTaxSalary)}/year`,
    `your lifestyle costs about $${Math.round(totalMonthlyExpenses)}/month ($${Math.round(totalAnnualExpenses)}/year)`,
  ];

  if (ratio < 1.0) reasoning.push("lowkey... this job doesn't pay enough for this lifestyle. time to pick something");
  else if (ratio < 1.5) reasoning.push("it's doable but you'll be counting pennies sometimes. no cap");
  else if (ratio < 2.0) reasoning.push("this is actually solid. you got breathing room and can build savings");
  else reasoning.push("yesss you'll be comfortable AND saving. that's the goal fr");

  return {
    score: Math.round(score * 2) / 2,
    ratio: Math.round(ratio * 100) / 100,
    baseSalary,
    taxRate,
    afterTaxSalary,
    totalMonthlyExpenses,
    housingCost,
    transportCost,
    vacationCost,
    entertainmentCost,
    reasoning,
    inputs: { desiredJob, jobCity, housing, transportation, vacation, entertainment },
  };
}

// ===============================
// Display Results
// ===============================
function displayRealityScore(results) {
  try {
    console.log("Displaying reality score", results);
    
    const formSection = document.querySelector(".form-section");
    const resultsSection = document.getElementById("resultsSection");
    const scoreResults = document.getElementById("scoreResults");
    
    console.log("DOM Elements found:", { formSection, resultsSection, scoreResults });
    
    if (!formSection || !resultsSection || !scoreResults) {
      console.error("Missing required DOM elements");
      return;
    }

    formSection.classList.add("hidden");
    resultsSection.classList.remove("hidden");

    const tier = SCORE_TIERS.find((t) => results.score <= t.maxScore);
    console.log("Score tier:", tier);

    const nextStepsKey = results.score <= 2 ? "low" : results.score <= 3.5 ? "mid" : "high";
    const steps = NEXT_STEPS[nextStepsKey];
    console.log("Next steps:", steps);

    let html = `
      <div class="score-display ${tier.colorClass}">
        <div class="score-progress">
          <div class="score-circle-bg">
            <div class="score-circle-progress" style="--score-percentage: ${(results.score / 5) * 100}%; --score-rotation: ${(results.score / 5) * 360}deg;"></div>
            <div class="score-circle-inner">
              <div class="score-number">${results.score}</div>
              <div class="score-max">out of 5</div>
            </div>
          </div>
        </div>
        <div>
          <h2 class="score-title">${tier.title}</h2>
          <p class="score-message">${tier.message}</p>
        </div>
      </div>

      <div class="breakdown">
        <h3>the numbers:</h3>
        <div class="number-grid">
          <div class="number-item">
            <div class="label">annual salary</div>
            <div class="value">$${formatSalary(results.baseSalary)}</div>
          </div>
          <div class="number-item">
            <div class="label">after taxes (~${Math.round(results.taxRate * 100)}%)</div>
            <div class="value">$${formatSalary(results.afterTaxSalary)}</div>
          </div>
          <div class="number-item">
            <div class="label">monthly expenses</div>
            <div class="value ${results.totalMonthlyExpenses > results.monthlyIncome ? 'red' : ''}">$${Math.round(results.totalMonthlyExpenses)}</div>
          </div>
          <div class="number-item">
            <div class="label">annual expenses</div>
            <div class="value ${results.totalMonthlyExpenses * 12 > results.afterTaxSalary ? 'red' : ''}">$${Math.round(results.totalMonthlyExpenses * 12)}</div>
          </div>
          <div class="number-item">
            <div class="label">housing</div>
            <div class="value">$${Math.round(results.housingCost)}/mo</div>
          </div>
          <div class="number-item">
            <div class="label">transportation</div>
            <div class="value">$${Math.round(results.transportCost)}/mo</div>
          </div>
          <div class="number-item">
            <div class="label">entertainment</div>
            <div class="value">$${Math.round(results.entertainmentCost)}/mo</div>
          </div>
          <div class="number-item">
            <div class="label">vacation avg</div>
            <div class="value">$${Math.round(results.vacationCost)}/mo</div>
          </div>
        </div>
      </div>

      <div class="reasoning">
        <h3>here's the real talk:</h3>
        <ul>
    `;

    results.reasoning.forEach((reason) => {
      html += `<li>${reason}</li>`;
    });

    html += `</ul></div><div class="next-steps"><h3>what to do next:</h3><div class="steps-list">`;

    steps.forEach((step, i) => {
      const nums = ["1️⃣", "2️⃣", "3️⃣"];
      html += `<div class="step"><span class="step-num">${nums[i]}</span><p>${step}</p></div>`;
    });

    html += `</div></div>
      <p class="final-note">remember: these numbers can change. salary negotiations, city changes, lifestyle upgrades... come back and recheck. the future is flexible. you got this 💪</p>
    `;

    scoreResults.innerHTML = html;
    console.log("HTML rendered successfully");
  } catch (error) {
    console.error("Error displaying results:", error);
    alert("Error displaying results. Check console for details.");
  }
}

// ===============================
// Form submission
// ===============================
const realityForm = document.getElementById("realityForm");
console.log("Form element:", realityForm);

if (realityForm) {
  realityForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Form submission prevented");

    const desiredJob = document.getElementById("desiredJob").value;
    const jobCity = document.getElementById("jobCity").value;
    const housing = document.getElementById("housing").value;
    const transportation = document.getElementById("transportation").value;
    const vacation = document.getElementById("vacation").value;
    const entertainment = document.getElementById("entertainment").value;

    // LOGGING - Debug
    console.log("Form values:", { desiredJob, jobCity, housing, transportation, vacation, entertainment });

    // Validate all fields are filled
    if (!desiredJob || !jobCity || !housing || !transportation || !vacation || !entertainment) {
      console.error("Missing required fields");
      alert("Please fill out all fields before submitting");
      return;
    }

    try {
      // Get salary and tax from server
      const { salary, taxRate, afterTaxSalary, multiplier, houseCost } = await getSalaryAndTax(desiredJob, jobCity, housing);
      console.log("Fetched data:", { salary, taxRate, afterTaxSalary, multiplier, houseCost });

      const results = calculateRealityScore(
        salary,
        taxRate,
        afterTaxSalary,
        multiplier,
        houseCost,
        desiredJob,
        jobCity,
        housing,
        transportation,
        vacation,
        entertainment
      );

      console.log("Results calculated:", results);
      displayRealityScore(results);
    } catch (error) {
      console.error("Error during score calculation:", error);
      alert("An error occurred. Check console for details.");
    }
  });
} else {
  console.error("realityForm not found!");
}