import { config } from "../config.js";

export const getTaxRate = async (state) => {
  try {
    const { baseUrl, year } = config.datausa;
    const fips = config.states.STATE_FIPS[state];
    const geography = state === 'US' ? '01000US' : `04000US${fips}`;
    const url = `${baseUrl}?cube=acs_ygov_fin&measures=Personal Income Tax Collections,Personal Income&drilldowns=State,Year&include=Year:${year};State=${geography}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.error(`DataUSA tax API error: ${res.status} ${res.statusText}`);
      return 0.25; // fallback tax rate
    }
    const data = await res.json();

    if (data.data && data.data.length > 0) {
      const taxCollections = data.data[0]["Personal Income Tax Collections"];
      const personalIncome = data.data[0]["Personal Income"];
      if (personalIncome > 0) {
        return taxCollections / personalIncome;
      }
    }

    return 0.25; // fallback
  } catch (err) {
    console.error("DataUSA tax error:", err);
    return 0.25;
  }
};