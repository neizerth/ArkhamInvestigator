import { spawn } from "redux-saga/effects";
import { openChaosTokenRevealModalSaga } from "./openChaosTokenRevealModal/openChaosTokenRevealModalSaga";

export function* chaosBagRevealModalEntitiesSaga() {
	yield spawn(openChaosTokenRevealModalSaga);
}
