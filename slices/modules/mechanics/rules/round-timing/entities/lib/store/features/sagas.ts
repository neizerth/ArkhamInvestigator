import { spawn } from "redux-saga/effects";
import { openTimingWizardModalSaga } from "./openTimingWizardModal/sagas";
import { processTimingWizardStepSaga } from "./processTimingWizardStep/processTimingWizardStepSaga";

export function* roundTimingEntitiesSaga() {
	yield spawn(openTimingWizardModalSaga);
	yield spawn(processTimingWizardStepSaga);
}
