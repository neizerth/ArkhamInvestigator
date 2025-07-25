import { spawn } from "redux-saga/effects";
import { addScenarioCluesSaga } from "./add-scenario-clues/addScenarioCluesSaga";
import { spendCluesSaga } from "./spend-clues/spendCluesSaga";

export function* cluesFeaturesSaga() {
	yield spawn(spendCluesSaga);
	yield spawn(addScenarioCluesSaga);
}
