import type { Build } from "arkham-investigator-data";
import { v4 } from "uuid";
import { INVESTIGATORS_API_URL } from "../config";
import { loadJSON } from "../lib/util/promise";

export const loadInvestigatorsMediaData = () =>
	loadJSON<Build>(`${INVESTIGATORS_API_URL}/build.json?v=${v4()}`);
