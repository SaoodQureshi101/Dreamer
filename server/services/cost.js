import { config } from "../config.js";
import { getCostOfLivingFromTeleport, getHousingFromTeleport } from "./teleport.js";

export const getCostOfLivingScore = async (city) => {
  return await getCostOfLivingFromTeleport(city);
};

export const getMedianHomeValue = async (city) => {
  return await getHousingFromTeleport(city);
};