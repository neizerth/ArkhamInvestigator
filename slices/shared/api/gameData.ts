import { API_URL } from "@shared/config";
import { BUILD_VERSION } from "@shared/config/app";
import type { GameCoreData, GameTranslationData } from "@shared/model";
import { loadJSON } from "./loadJSON";

export const loadGameCoreData = () =>
	loadJSON<GameCoreData>(`${API_URL}/core.json?v=${BUILD_VERSION}`);

export const loadGameTranslationData = (language: string) =>
	loadJSON<GameTranslationData>(
		`${API_URL}/${language}.json?v=${BUILD_VERSION}`,
	);
