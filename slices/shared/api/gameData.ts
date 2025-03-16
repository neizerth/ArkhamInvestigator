import { API_URL } from "@shared/config";
import { loadJSON } from "./loadJSON";
import type { GameCoreData, GameTranslationData, } from "@shared/model";
import { APP_VERSION, BUILD_VERSION } from "@shared/config/app";

export const loadGameCoreData = () => 
  loadJSON<GameCoreData>(`${API_URL}/core.json?v=${BUILD_VERSION}`)

export const loadGameTranslationData = (language: string) => 
  loadJSON<GameTranslationData>(`${API_URL}/${language}.json?v=${BUILD_VERSION}`)