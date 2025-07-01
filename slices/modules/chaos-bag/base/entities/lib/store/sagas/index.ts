import { spawn } from "redux-saga/effects";
import { addChaosTokenSaga } from "./add";

export function* chaosBagEntitiesSaga() {
	yield spawn(addChaosTokenSaga);
}
