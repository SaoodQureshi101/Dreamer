// Job Check - Salary + City to Lifestyle & Job Matching
import { JOB_SALARIES, JOB_NAMES, SALARY_TO_LIFESTYLE, CITY_NAMES, DEFAULTS } from "./data.js";

document.getElementById("jobForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const salary = document.getElementById("salary").value;
  const city = document.getElementById("city").value;

  const results = calculateJobMatch(salary, city);
  displayJobResults(results);
});

function calculateJobMatch(salaryRange, city) {
  const lifestyle = SALARY_TO_LIFESTYLE[salaryRange];

  let minSalary, maxSalary;
  if (salaryRange === "180+") {
    minSalary = 180000;
    maxSalary = DEFAULTS.maxSalaryForHighBracket;
  } else {
    const [min, max] = salaryRange.split("-").map(Number);
    minSalary = min * 1000;
    maxSalary = max * 1000;
  }

  const suitableJobs = Object.entries(JOB_SALARIES)
    .filter(([, salary]) => salary >= minSalary && salary <= maxSalary)
    .map(([job, salary]) => ({ job, name: JOB_NAMES[job], salary }))
    .sort((a, b) => b.salary - a.salary);

  return { ...lifestyle, salaryRange, city, jobs: suitableJobs, minSalary, maxSalary };
}

function displayJobResults(results) {
  document.querySelector(".form-section").classList.add("hidden");
  document.getElementById("resultsSection").classList.remove("hidden");

  const cityName = CITY_NAMES[results.city] ?? results.city;

  const salaryLabel =
    results.salaryRange === "180+"
      ? "$180k+"
      : "$" + results.salaryRange.replace("-", "k - $") + "k";

  let html = `
    <div class="result-intro">
      <p class="intro-text">with a ${salaryLabel} salary in ${cityName}, here's what that life could look like...</p>
    </div>

    <div class="result-card dream-card-large">
      <div class="life-grid">
        <div class="life-item">
          <h3>🏠 housing</h3>
          <p>${results.housing}</p>
        </div>
        <div class="life-item">
          <h3>🚗 transportation</h3>
          <p>${results.transportation}</p>
        </div>
        <div class="life-item">
          <h3>🌴 vacation time</h3>
          <p>${results.vacation}</p>
        </div>
        <div class="life-item">
          <h3>🎉 entertainment</h3>
          <p>${results.entertainment}</p>
        </div>
      </div>
    </div>

    <div class="jobs-section">
      <h3>jobs that hit this salary range:</h3>
      <div class="jobs-list">
  `;

  if (results.jobs.length > 0) {
    results.jobs.forEach((job) => {
      html += `
        <div class="job-card">
          <div class="job-title">${job.name}</div>
          <div class="job-salary">$${(job.salary / 1000).toFixed(0)}k/year</div>
        </div>
      `;
    });
  } else {
    html += `<p class="no-jobs">hmm, no common jobs fit this exact range. but keep leveling up! 💪</p>`;
  }

  html += `
      </div>
    </div>

    <div class="result-footer">
      <p>this could actually be you. go get it. 🚀</p>
    </div>
  `;

  document.getElementById("jobResults").innerHTML = html;
}
