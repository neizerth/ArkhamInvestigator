import { spawn } from "redux-saga/effects";
import { openChaosBagRevealConfirmSaga } from "./openChaosBagRevealConfirm/sagas";
import { startChaosBagRevealSaga } from "./startChaosBagReveal/startChaosBagRevealSaga";
import { startNewChaosBagRevealSaga } from "./startNewChaosBagReveal/startNewChaosBagRevealSaga";

export function* startRevealSaga() {
	yield spawn(startChaosBagRevealSaga);
	yield spawn(startNewChaosBagRevealSaga);
	yield spawn(openChaosBagRevealConfirmSaga);
}
