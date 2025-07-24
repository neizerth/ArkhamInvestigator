import type { BuildInfo } from "arkham-investigator-data";
import { v4 } from "uuid";
import { INVESTIGATORS_API_URL } from "../config";
import { loadJSON } from "../lib/util/promise";

export const loadAPIStatus = () =>
	loadJSON<BuildInfo>(`${INVESTIGATORS_API_URL}/status.json?v=${v4()}`);
