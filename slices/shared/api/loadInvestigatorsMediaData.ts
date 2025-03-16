import { INVESTIGATORS_API_URL } from "@shared/config";
import type { Build } from "arkham-investigator-data";
import { loadJSON } from "./loadJSON";
import { v4 } from "uuid";

export const loadInvestigatorsMediaData = () => 
  loadJSON<Build>(`${INVESTIGATORS_API_URL}/build.json?v=${v4()}`);