import type { Investigator } from "arkham-investigator-data"
import { loadJSON } from "./loadJSON";
import { INVESTIGATORS_API_URL } from "../config";

export const loadInvestigatorsMediaData = () => loadJSON<Investigator[]>(`${INVESTIGATORS_API_URL}/investigators.json`);