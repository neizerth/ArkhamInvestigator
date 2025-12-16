import { spawn } from "redux-saga/effects";
import { generateBoardOddsSaga } from "./generate-board-odds/sagas";
import { syncCustomSkillValueSaga } from "./sync-custom-skill-value/sagas";

export function* chaosBagOddsFeaturesSaga() {
	yield spawn(syncCustomSkillValueSaga);
	yield spawn(generateBoardOddsSaga);
}
