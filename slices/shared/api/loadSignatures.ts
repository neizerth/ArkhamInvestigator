import type { SignatureBuild } from "arkham-investigator-data";
import { v4 } from "uuid";
import { INVESTIGATORS_API_URL } from "../config";
import { loadJSON } from "../lib";

export const loadSignatures = async (language = "en") => {
	try {
		return await loadJSON<SignatureBuild>(
			`${INVESTIGATORS_API_URL}/${language}.json?v=${v4()}`,
		);
	} catch (e) {
		return {
			cards: [],
			taboo: [],
		};
	}
};
