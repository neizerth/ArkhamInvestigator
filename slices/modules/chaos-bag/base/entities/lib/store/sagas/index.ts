import { spawn } from "redux-saga/effects";
import { addChaosTokenSaga } from "./add";
import { removeChaosTokenSaga } from "./remove";

export function* chaosBagEntitiesSaga() {
	yield spawn(addChaosTokenSaga);
	yield spawn(removeChaosTokenSaga);
}
