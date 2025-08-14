import { dataAPI } from "@shared/api";
import type { LocaleBuild } from "arkham-investigator-data";
import { v4 } from "uuid";

const getPath = (language: string) => `${language}.json?v=${v4()}`;

export const getAppData = (language: string) => {
	const path = getPath(language);

	return dataAPI.get<LocaleBuild>(path);
};
