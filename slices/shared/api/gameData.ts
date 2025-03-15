import { API_URL } from "../config";
import { APP_VERSION } from "../config/app";
import type { GameCoreData, GameTranslationData } from "@shared/model";
import { loadJSON } from "./loadJSON";

export const loadGameCoreData = () => loadJSON<GameCoreData>(`${API_URL}/core.json?v=${APP_VERSION}`)
export const loadGameTranslationData = (language: string) => loadJSON<GameTranslationData>(`${API_URL}/${language}.json`)