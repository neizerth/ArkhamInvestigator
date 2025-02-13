import { API_URL } from "@shared/config";
import { loadJSON } from "./loadJSON";
import type { GameCoreData, GameTranslationData, } from "@shared/model";

export const loadGameCoreData = () => loadJSON<GameCoreData>(`${API_URL}/core.json`)
export const loadGameTranslationData = (language: string) => loadJSON<GameTranslationData>(`${API_URL}/${language}.json`)