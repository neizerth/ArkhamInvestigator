import { INVESTIGATORS_API_URL } from "@shared/config";
import type { Build } from "arkham-investigator-data";
import { loadJSON } from "./loadJSON";
import { BUILD_VERSION } from "@shared/config/app";

export const loadInvestigatorsMediaData = () => 
  loadJSON<Build>(`${INVESTIGATORS_API_URL}/build.json?v=${BUILD_VERSION}`);