import "dotenv/config";

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,

  datausa: {
    baseUrl: process.env.DATAUSA_BASE_URL || "https://datausa.io/api/data",
    year: process.env.DATAUSA_YEAR || "2022",
  },

  states: {
    CITY_TO_STATE: {
      NYC: 'NY',
      LA: 'CA',
      CHI: 'IL',
      AUS: 'TX',
      SEA: 'WA',
      SF: 'CA',
      MIA: 'FL',
      DEN: 'CO',
      BOS: 'MA',
      anywhere: 'US', // national
    },
    STATE_FIPS: {
      NY: '36',
      CA: '06',
      IL: '17',
      TX: '48',
      WA: '53',
      FL: '12',
      CO: '08',
      MA: '25',
      US: '', // for national, Geography=01000US
    },
    taxRates: {
      NY: 0.30, // approx effective tax rate
      CA: 0.35,
      IL: 0.25,
      TX: 0.20,
      WA: 0.25,
      FL: 0.20,
      CO: 0.25,
      MA: 0.30,
      US: 0.25,
    },
    propertyTaxRates: {
      NY: 0.008, // 0.8%
      CA: 0.0075, // 0.75%
      IL: 0.022, // 2.2%
      TX: 0.018, // 1.8%
      WA: 0.009, // 0.9%
      FL: 0.009, // 0.9%
      CO: 0.005, // 0.5%
      MA: 0.012, // 1.2%
      US: 0.01, // 1%
    },
    METRO_IDS: {
      NYC: '35620', // New York-Newark-Jersey City, NY-NJ-PA
      LA: '31080',  // Los Angeles-Long Beach-Anaheim, CA
      CHI: '16980', // Chicago-Naperville-Elgin, IL-IN-WI
      AUS: '12420', // Austin-Round Rock, TX
      SEA: '42660', // Seattle-Tacoma-Bellevue, WA
      SF: '41860',  // San Francisco-Oakland-Hayward, CA
      MIA: '33100', // Miami-Fort Lauderdale-West Palm Beach, FL
      DEN: '19740', // Denver-Aurora-Lakewood, CO
      BOS: '14460', // Boston-Cambridge-Newton, MA-NH
      anywhere: '00000', // national average
    },
  },

  costs: {
    rentBase: parseFloat(process.env.DEFAULT_RENT_BASE) || 1000,
    rentMultiplier: parseFloat(process.env.DEFAULT_RENT_MULTIPLIER) || 200,
    rentFallback: parseFloat(process.env.DEFAULT_RENT_FALLBACK) || 1500,
    otherExpenses: parseFloat(process.env.DEFAULT_OTHER_EXPENSES) || 800,
    costOfLivingCategory:
      process.env.COST_OF_LIVING_CATEGORY || "Cost of Living",
  },

  teleport: {
    urbanAreas: {
      NYC: 'new-york',
      LA: 'los-angeles',
      CHI: 'chicago',
      AUS: 'austin',
      SEA: 'seattle',
      SF: 'san-francisco-bay-area',
      MIA: 'miami',
      DEN: 'denver',
      BOS: 'boston',
      anywhere: null, // no urban area for anywhere
    },
  },
};
