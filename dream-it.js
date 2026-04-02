// Dream It - Lifestyle to Job Recommendations
import {
  DREAM_JOB_MATCHES,
  DREAM_FALLBACK_MATCHES,
  LIFESTYLE_SCORES,
  VACATION_SCORES,
} from "./data.js";

document.getElementById("dreamForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const housing = document.getElementById("housing").value;
  const transportation = document.getElementById("transportation").value;
  const vacation = document.getElementById("vacation").value;
  const entertainment = document.getElementById("entertainment").value;
  const city = document.getElementById("city").value;

  const results = calculateJobMatch(housing, transportation, vacation, entertainment, city);
  displayDreamResults(results);
});

function calculateJobMatch(housing, transportation, vacation, entertainment, city) {
  const inputKey = `${housing}|${transportation}|${vacation}|${entertainment}|${city === "flexible" ? "flexible" : "specific"}`;

  // Direct match
  if (DREAM_JOB_MATCHES[inputKey]) {
    return { jobs: DREAM_JOB_MATCHES[inputKey], housing, transportation, vacation, entertainment, city };
  }

  // Proximity fallback — score the inputs and pick the nearest tier
  const housingScore =
    housing === "luxury" ? 1 : housing === "2br" ? 0.6 : housing === "1br" ? 0.4 : 0.2;
  const transportScore =
    transportation === "car-nice" ? 1 : transportation === "car" ? 0.6 : 0.3;

  const score =
    (LIFESTYLE_SCORES[entertainment] +
      VACATION_SCORES[vacation] +
      housingScore +
      transportScore) / 4;

  let bestMatch;
  if (score >= 0.8) {
    bestMatch = DREAM_FALLBACK_MATCHES.high;
  } else if (score >= 0.6) {
    bestMatch = DREAM_FALLBACK_MATCHES.mid_high;
  } else if (score >= 0.4) {
    bestMatch = DREAM_FALLBACK_MATCHES.mid;
  } else {
    bestMatch = DREAM_FALLBACK_MATCHES.low;
  }

  return { jobs: bestMatch, housing, transportation, vacation, entertainment, city };
}

function displayDreamResults(results) {
  document.querySelector(".form-section").classList.add("hidden");
  document.getElementById("resultsSection").classList.remove("hidden");

  let html = `
    <div class="result-intro">
      <p class="intro-text">based on your life goals, these jobs would let you live like that...</p>
    </div>
    <div class="results-list">
  `;

  results.jobs.forEach((job) => {
    html += `
      <div class="result-card dream-card">
        <div class="result-header">
          <span class="job-icon">${job.emoji}</span>
          <div>
            <h3>${job.job}</h3>
          </div>
        </div>
        <p class="vibe-text">${job.vibe}</p>
      </div>
    `;
  });

  html += `
    </div>
    <div class="result-footer">
      <p>pick one and let's make it real. 🚀</p>
    </div>
  `;

  document.getElementById("lifeResults").innerHTML = html;
}
