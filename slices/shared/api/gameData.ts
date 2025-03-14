import { API_URL } from "@shared/config";
import { loadJSON } from "./loadJSON";
import type { GameCoreData, GameTranslationData, } from "@shared/model";
import { APP_VERSION } from "@shared/config/app";

export const loadGameCoreData = () => loadJSON<GameCoreData>(`${API_URL}/core.json?v=${APP_VERSION}`)
export const loadGameTranslationData = (language: string) => loadJSON<GameTranslationData>(`${API_URL}/${language}.json`)