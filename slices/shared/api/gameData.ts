import type { GameCoreData, GameTranslationData } from "@shared/model";
import { API_URL } from "../config";
import { BUILD_VERSION } from "../config/app";
import { loadJSON } from "./loadJSON";

export const loadGameCoreData = () =>
	loadJSON<GameCoreData>(`${API_URL}/core.json?v=${BUILD_VERSION}`);

export const loadGameTranslationData = (language: string) =>
	loadJSON<GameTranslationData>(
		`${API_URL}/${language}.json?v=${BUILD_VERSION}`,
	);
