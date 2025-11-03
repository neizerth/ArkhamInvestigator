import { spawn } from "redux-saga/effects";
import { resetUpkeepAllInvestigatorActionsSaga } from "./resetUpkeepAllInvestigatorActions/resetUpkeepAllInvestigatorActionsSaga";
import { resetUpkeepInvestigatorActionsSaga } from "./resetUpkeepInvestigatorActions/resetUpkeepInvestigatorActionsSaga";

export function* upkeepActionsSaga() {
	yield spawn(resetUpkeepAllInvestigatorActionsSaga);
	yield spawn(resetUpkeepInvestigatorActionsSaga);
}
