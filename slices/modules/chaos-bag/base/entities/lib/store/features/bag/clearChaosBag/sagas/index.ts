import { fork, spawn } from "redux-saga/effects";
import { clearChaosBagSaga as clearSaga } from "./clearChaosBagSaga";
import { processModalActionSaga } from "./processModalActionSaga";

export function* clearChaosBagSaga() {
	yield spawn(clearSaga);
	yield fork(processModalActionSaga);
}
