import { spawn } from "redux-saga/effects";
import { returnAllChaosTokensSaga } from "./returnAllChaosTokensSaga";
import { returnChaosTokenSaga } from "./returnChaosTokenSaga";
import { revealChaosTokensSaga } from "./revealChaosTokensSaga";

export function* chaosBagRevealEntitiesSaga() {
	yield spawn(returnAllChaosTokensSaga);
	yield spawn(returnChaosTokenSaga);

	yield spawn(revealChaosTokensSaga);
}
