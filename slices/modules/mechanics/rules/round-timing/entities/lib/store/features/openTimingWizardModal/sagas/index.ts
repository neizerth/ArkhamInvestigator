import { spawn } from "redux-saga/effects";
import { openTimingWizardModalSaga as openModalSaga } from "./openTimingWizardModalSaga";
import { timingWizardModalActionSaga } from "./timingWizardModalActionSaga";

export function* openTimingWizardModalSaga() {
	yield spawn(openModalSaga);
	yield spawn(timingWizardModalActionSaga);
}
