import { spawn } from "redux-saga/effects";
import { handleContinueActionSaga } from "./handleContinueActionSaga";
import { handleStartNewActionSaga } from "./handleStartNewActionSaga";
import { openChaosBagRevealConfirmSaga as openConfirm } from "./openChaosBagRevealConfirmSaga";

export function* openChaosBagRevealConfirmSaga() {
	yield spawn(openConfirm);
	yield spawn(handleStartNewActionSaga);
	yield spawn(handleContinueActionSaga);
}
