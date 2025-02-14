import { INVESTIGATORS_API_URL } from "@shared/config";
import type { Investigator } from "arkham-investigator-data"
import { loadJSON } from "./loadJSON";

export const loadInvestigatorsMediaData = () => loadJSON<Investigator[]>(`${INVESTIGATORS_API_URL}/investigators.json`);