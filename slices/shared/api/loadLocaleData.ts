import type { LocaleBuild } from "arkham-investigator-data";
import { INVESTIGATORS_API_URL } from "../config";
import { loadJSON } from "../lib/util/promise";

export const loadLocaleData = async (language = "en") => {
	try {
		return await loadJSON<LocaleBuild>(
			`${INVESTIGATORS_API_URL}/${language}.json?v=${Date()}`,
		);
	} catch (e) {
		return {
			stories: [],
			groups: [],
			taboo: [],
		};
	}
};
