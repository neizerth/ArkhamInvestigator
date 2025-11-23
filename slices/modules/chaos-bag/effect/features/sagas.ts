import { spawn } from "redux-saga/effects";
import { resetChaosTokenOptionsOnNewGameSaga } from "./reset-chaos-token-options-on-new-game/resetChaosTokenOptionsOnNewGameSaga";
import { syncChaosTokenWithValueSaga } from "./sync-chaos-token-option-with-value/syncChaosTokenWithValueSaga";

export function* chaosBagEffectFeaturesSaga() {
	yield spawn(resetChaosTokenOptionsOnNewGameSaga);
	yield spawn(syncChaosTokenWithValueSaga);
}
