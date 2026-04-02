// ─── Shared data config for Life Planner ─────────────────────────────────────
// All hardcoded values live here. Update once, everything picks it up.

// Job base annual salaries (USD)
export const JOB_SALARIES = {
  "graphic-designer": 55000,
  "content-creator": 45000,
  photographer: 50000,
  animator: 52000,
  "web-dev": 85000,
  "software-engineer": 140000,
  "data-scientist": 135000,
  "ux-designer": 95000,
  nurse: 75000,
  pharmacist: 140000,
  "physical-therapist": 85000,
  doctor: 215000,
  accountant: 70000,
  "financial-advisor": 80000,
  "marketing-manager": 95000,
  consultant: 110000,
  teacher: 60000,
  pilot: 180000,
  lawyer: 160000,
  "real-estate": 65000,
};

// Human-readable job display names
export const JOB_NAMES = {
  "graphic-designer": "Graphic Designer",
  "content-creator": "Content Creator",
  photographer: "Photographer",
  animator: "Animator",
  "web-dev": "Web Developers",
  "software-engineer": "Software Engineer",
  "data-scientist": "Data Scientist",
  "ux-designer": "UX Designer",
  nurse: "Nurse",
  pharmacist: "Pharmacist",
  "physical-therapist": "Physical Therapist",
  doctor: "Doctor",
  accountant: "Accountant",
  "financial-advisor": "Financial Advisor",
  "marketing-manager": "Marketing Manager",
  consultant: "Management Consultant",
  teacher: "Teacher",
  pilot: "Pilot",
  lawyer: "Lawyer",
  "real-estate": "Real Estate Agent",
};

// City cost-of-living multipliers (1.0 = baseline / national average)
export const CITY_MULTIPLIERS = {
  NYC: 1.4,
  LA: 1.35,
  CHI: 1.0,
  SF: 1.5,
  SEA: 1.2,
  AUS: 0.95,
  anywhere: 1.0,
};

// Full city names keyed by the short code used in dropdowns
export const CITY_NAMES = {
  NYC: "New York City",
  LA: "Los Angeles",
  CHI: "Chicago",
  AUS: "Austin",
  SEA: "Seattle",
  MIA: "Miami",
  SF: "San Francisco",
  DEN: "Denver",
  BOS: "Boston",
};

// Monthly cost estimates by lifestyle choice
export const HOUSING_COSTS = {
  studio: 1200,
  "1br": 1600,
  "2br": 2100,
  house: 2500,
  luxury: 3500,
};

export const TRANSPORT_COSTS = {
  transit: 100,
  bike: 80,
  car: 300,
  "car-nice": 600,
};

export const VACATION_COSTS = {
  "2weeks": 200,
  "3weeks": 300,
  "4weeks": 400,
  flexible: 500,
};

export const ENTERTAINMENT_COSTS = {
  minimal: 150,
  moderate: 250,
  generous: 400,
  luxury: 600,
};

// Salary bracket → lifestyle description (used by job-check)
export const SALARY_TO_LIFESTYLE = {
  "40-60": {
    housing: "studio or 1br apartment",
    transportation: "public transit or bike",
    vacation: "1-2 weeks a year",
    entertainment: "$150-250/month",
  },
  "60-80": {
    housing: "1 bedroom apartment",
    transportation: "car or good transit",
    vacation: "2 weeks a year",
    entertainment: "$250-350/month",
  },
  "80-120": {
    housing: "1-2 bedroom apartment",
    transportation: "reliable car",
    vacation: "2-3 weeks a year",
    entertainment: "$400-500/month",
  },
  "120-180": {
    housing: "2+ bedroom apartment or condo",
    transportation: "nice car or leasing",
    vacation: "3-4 weeks a year",
    entertainment: "$500-700/month",
  },
  "180+": {
    housing: "luxury house",
    transportation: "whatever car you want",
    vacation: "4+ weeks, international travel",
    entertainment: "$800+/month",
  },
};

// After-tax income estimate (rough flat rate)
export const AFTER_TAX_RATE = 0.75;

// Fallback values when a lookup key is missing
export const DEFAULTS = {
  salary: 70000,
  cityMultiplier: 1.0,
  housingCost: 1500,
  transportCost: 200,
  vacationCost: 250,
  entertainmentCost: 300,
  maxSalaryForHighBracket: 300000,
};

// Reality-check score thresholds and their UI copy
export const SCORE_TIERS = [
  {
    maxScore: 1.5,
    colorClass: "score-display--terrible",
    title: "yoof... not quite it yet 😅",
    message:
      "this job doesn't pay enough for this lifestyle in this city. no shade, just the numbers being real with you. either pick a higher-paying job, a cheaper city, or scale back the lifestyle. all valid moves.",
  },
  {
    maxScore: 2.5,
    colorClass: "score-display--rough",
    title: "it's giving... maybe not today 🤔",
    message:
      "technically doable but you'd be tight every month. no emergencies allowed energy. if you're willing to live frugal for a few years, sure, but it won't feel comfortable.",
  },
  {
    maxScore: 3.5,
    colorClass: "score-display--mid",
    title: "not bad, could be better tho 👀",
    message:
      "this combo is DOABLE. you'll have money for the lifestyle but not much left over. you can make it work if you're disciplined and don't have surprises.",
  },
  {
    maxScore: 4.5,
    colorClass: "score-display--good",
    title: "yesss now we're talking 🔥",
    message:
      "this is actually solid. you got real money left after your lifestyle costs. you can save, invest, or handle emergencies without stress. this is the move.",
  },
  {
    maxScore: Infinity,
    colorClass: "score-display--excellent",
    title: "this is that alignment energy 🚀✨",
    message:
      "okay so your income is significantly higher than your lifestyle costs. you're COMFORTABLE. you can save hard, invest, travel more, or help family. this is the goal. execute it.",
  },
];

// Next-steps copy keyed by score threshold
export const NEXT_STEPS = {
  low: [
    "Be real about priorities. Do you want this city, this job, or this lifestyle more? Pick one to change.",
    "Research higher-paying jobs in your field or look at different cities with lower costs.",
    "Come back and check this after you level up. Most people don't hit their dream job straight up.",
  ],
  mid: [
    "Lock in this path. You got a realistic goal that's definitely achievable.",
    "Build the skills/network to actually land this job. What's stopping you from getting it?",
    "Make a budget for when you get it. You're gonna need discipline but you got this.",
  ],
  high: [
    "This is legit. Go all in on landing this opportunity.",
    "Bonus: plan what you'll do with the extra money. Save? Invest? Give back?",
    "Execute. You're ready. Let's go.",
  ],
};

// Dream-it lifestyle → job-match lookup table
export const DREAM_JOB_MATCHES = {
  "studio|transit|2weeks|minimal|flexible": [
    { job: "Content Creator", emoji: "📱", vibe: "flexible and creative energy" },
    { job: "Freelance Designer", emoji: "🎨", vibe: "work from anywhere" },
  ],
  "studio|transit|3weeks|moderate|flexible": [
    { job: "Social Media Manager", emoji: "📸", vibe: "memes = career" },
    { job: "Teaching Assistant", emoji: "🍎", vibe: "summers off energy" },
  ],
  "1br|transit|3weeks|moderate|flexible": [
    { job: "Graphic Designer", emoji: "🎨", vibe: "creative + doable income" },
    { job: "Web Developers", emoji: "💻", vibe: "solid tech life" },
  ],
  "1br|car|3weeks|generous|flexible": [
    { job: "UX Designer", emoji: "🎨", vibe: "creatively solving problems" },
    { job: "Marketing Manager", emoji: "📊", vibe: "watch the campaigns grow" },
  ],
  "2br|car|3weeks|generous|flexible": [
    { job: "Software Engineer", emoji: "🔥", vibe: "real tech money" },
    { job: "Data Scientist", emoji: "📈", vibe: "data is the move" },
  ],
  "2br|car|4weeks|generous|flexible": [
    { job: "Management Consultant", emoji: "🎯", vibe: "get paid to think" },
    { job: "Financial Advisor", emoji: "💰", vibe: "help people + get paid" },
  ],
  "2br|car-nice|4weeks|luxury|flexible": [
    { job: "Pharmacist", emoji: "💊", vibe: "blue money fr" },
    { job: "Physical Therapist", emoji: "💪", vibe: "heal people + get paid" },
  ],
  "luxury|car-nice|4weeks|luxury|flexible": [
    { job: "Doctor (MD)", emoji: "👨‍⚕️", vibe: "ultimate respect + wealth" },
    { job: "Lawyer", emoji: "⚖️", vibe: "law is lucrative" },
  ],
  "house|car|4weeks|generous|flexible": [
    { job: "Software Engineer", emoji: "🔥", vibe: "team game, real money" },
    { job: "Senior Software Engineer", emoji: "💎", vibe: "bags secured" },
  ],
  "house|car-nice|4weeks|luxury|flexible": [
    { job: "Consulting Partner", emoji: "🎯", vibe: "lead the team" },
    { job: "Director of Engineering", emoji: "💎", vibe: "leadership pays" },
  ],
};

// Proximity-match scoring weights for dream-it fallback
export const LIFESTYLE_SCORES = {
  minimal: 0.2,
  moderate: 0.4,
  generous: 0.7,
  luxury: 1,
};

export const VACATION_SCORES = {
  "2weeks": 0.2,
  "3weeks": 0.4,
  "4weeks": 0.7,
  flexible: 1,
  "flexible-schedule": 1,
};

// Fallback job matches returned when no exact dream-it key is found
export const DREAM_FALLBACK_MATCHES = {
  high: [
    { job: "Senior Software Engineer", emoji: "💎", vibe: "serious salary, serious life" },
    { job: "Doctor / Lawyer", emoji: "👑", vibe: "top tier income" },
  ],
  mid_high: [
    { job: "Software Engineer", emoji: "🔥", vibe: "great money, solid life" },
    { job: "Physical Therapist", emoji: "💪", vibe: "comfortable living" },
  ],
  mid: [
    { job: "Web Developers", emoji: "💻", vibe: "good balance" },
    { job: "Graphic Designer", emoji: "🎨", vibe: "creative cash" },
  ],
  low: [
    { job: "Content Creator", emoji: "📱", vibe: "flexible and fun" },
    { job: "Freelancer", emoji: "✨", vibe: "work your own way" },
  ],
};
