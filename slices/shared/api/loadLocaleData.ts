import type { LocaleBuild } from "arkham-investigator-data";
import { v4 } from "uuid";
import { INVESTIGATORS_API_URL } from "../config";
import { loadJSON } from "../lib/util/promise";

export const loadLocaleData = async (language = "en") => {
	try {
		return await loadJSON<LocaleBuild>(
			`${INVESTIGATORS_API_URL}/${language}.json?v=${v4()}`,
		);
	} catch (e) {
		return {
			stories: [],
			groups: [],
			taboo: [],
			rules: [],
		};
	}
};
