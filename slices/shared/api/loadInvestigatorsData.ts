import { API_URL } from "@shared/config";
import type { Investigator } from "arkham-investigator-data"

export const loadInvestigatorsData = async () => {
  if (!API_URL) {
    throw new Error('Please specify API URL');
  }
  const response = await fetch(API_URL);

  const json: Investigator[] = await response.json();
  return json;
}