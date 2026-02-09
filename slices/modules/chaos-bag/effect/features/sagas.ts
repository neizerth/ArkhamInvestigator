import { spawn } from "redux-saga/effects";
import { resetChaosTokenOptionsSaga } from "./reset-chaos-token-options/resetChaosTokenOptionsSaga";
import { syncChaosTokenWithValueSaga } from "./sync-chaos-token-option-with-value/syncChaosTokenWithValueSaga";

export function* chaosBagEffectFeaturesSaga() {
	yield spawn(resetChaosTokenOptionsSaga);
	yield spawn(syncChaosTokenWithValueSaga);
}
