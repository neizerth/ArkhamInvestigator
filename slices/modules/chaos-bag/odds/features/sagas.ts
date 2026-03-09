import { spawn } from "redux-saga/effects";
import { generateBoardOddsSaga } from "./generate-board-odds/sagas";
import { syncChaosOddsEnabledAndModifyTokensSaga } from "./sync-chaos-odds-enabled-and-modify-tokens/syncChaosOddsEnabledAndModifyTokensSaga";
import { syncCustomSkillValueSaga } from "./sync-custom-skill-value/sagas";

export function* chaosBagOddsFeaturesSaga() {
	yield spawn(syncCustomSkillValueSaga);
	yield spawn(generateBoardOddsSaga);
	yield spawn(syncChaosOddsEnabledAndModifyTokensSaga);
}
