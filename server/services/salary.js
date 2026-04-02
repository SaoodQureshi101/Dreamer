import { config } from "../config.js";
import { JOB_NAMES, JOB_SALARIES } from "../../data.js";

export const getSalaryFromDataUSA = async (career, city, multiplier = 1.0) => {
  // API disabled due to 404 errors
  return Math.round((JOB_SALARIES[career] || 70000) * multiplier);
};
