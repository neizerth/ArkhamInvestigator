import { spawn } from "redux-saga/effects";
import { openTimingWizardFromPhaseSaga } from "./open-timing-wizard-from-phase/openTimingWizardFromPhaseSaga";
import { openTimingWizardFromStepSaga } from "./open-timing-wizard-from-step/openTimingWizardFromStepSaga";

export function* roundTimingFeaturesSaga() {
	yield spawn(openTimingWizardFromStepSaga);
	yield spawn(openTimingWizardFromPhaseSaga);
}
