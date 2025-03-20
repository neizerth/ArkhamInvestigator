import { INVESTIGATORS_API_URL } from "@shared/config";
import type { Build } from "arkham-investigator-data";
import { v4 } from "uuid";
import { loadJSON } from "./loadJSON";

export const loadInvestigatorsMediaData = () =>
	loadJSON<Build>(`${INVESTIGATORS_API_URL}/build.json?v=${v4()}`);
