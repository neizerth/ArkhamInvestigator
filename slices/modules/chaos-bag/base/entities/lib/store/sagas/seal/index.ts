import { spawn } from "redux-saga/effects";
import { sealChaosTokenSaga as sealSaga } from "./sealChaosTokenSaga";
import { toggleChaosTokenSealSaga as toggleSealSaga } from "./toggleChaosTokenSealSaga";
import { unsealChaosTokenSaga as unsealSaga } from "./unsealChaosTokenSaga";

export function* sealChaosTokenSaga() {
	yield spawn(sealSaga);
	yield spawn(unsealSaga);
	yield spawn(toggleSealSaga);
}
