import { spawn } from "redux-saga/effects";
import { resetChaosTokenOptionsOnNewGameSaga } from "./reset-chaos-token-options-on-new-game/resetChaosTokenOptionsOnNewGameSaga";

export function* chaosBagEffectFeaturesSaga() {
	yield spawn(resetChaosTokenOptionsOnNewGameSaga);
}
