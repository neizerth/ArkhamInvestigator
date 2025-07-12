import { spawn } from "redux-saga/effects";
import { openTimingWizardModalSaga } from "../features/modal/openTimingWizardModal";
import { openTimingWizardStepModalSaga } from "../features/modal/openTimingWizardStepModal";
import { processTimingWizardStepSaga } from "../features/processTimingWizardStep";
// TODO
export function* rulesSaga() {
	yield spawn(openTimingWizardModalSaga);
	yield spawn(openTimingWizardStepModalSaga);
	yield spawn(processTimingWizardStepSaga);
}
