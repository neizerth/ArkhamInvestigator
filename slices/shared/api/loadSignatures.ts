import type { SignatureBuild } from "arkham-investigator-data";
import { INVESTIGATORS_API_URL } from "../config";
import { loadJSON } from "../lib/util/promise";

export const loadSignatures = async (language = "en") => {
	try {
		return await loadJSON<SignatureBuild>(
			`${INVESTIGATORS_API_URL}/${language}.json?v=${Date()}`,
		);
	} catch (e) {
		return {
			groups: [],
			taboo: [],
		};
	}
};
