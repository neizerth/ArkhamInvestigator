import type { GameTranslationData } from "@shared/model";
import { API_URL } from "../config";
import { BUILD_VERSION } from "../config/app";
import { loadJSON } from "../lib/util/promise";

export const loadGameTranslationData = (language: string) =>
	loadJSON<GameTranslationData>(
		`${API_URL}/${language}.json?v=${BUILD_VERSION}`,
	);
