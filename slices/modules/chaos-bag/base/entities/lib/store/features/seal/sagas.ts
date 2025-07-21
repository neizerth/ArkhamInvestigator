import { spawn } from "redux-saga/effects";
import { sealChaosTokenSaga as sealTokenSaga } from "./sealChaosToken/sealChaosTokenSaga";
import { toggleChaosTokenSealSaga } from "./toggleChaosTokenSeal/toggleChaosTokenSealSaga";
import { unsealChaosTokenSaga } from "./unsealChaosToken/unsealChaosTokenSaga";

export function* sealChaosTokenSaga() {
	yield spawn(sealTokenSaga);
	yield spawn(unsealChaosTokenSaga);
	yield spawn(toggleChaosTokenSealSaga);
}
