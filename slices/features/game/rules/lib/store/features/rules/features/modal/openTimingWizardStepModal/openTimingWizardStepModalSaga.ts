import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectTimingWizardPhaseId,
	setTimingWizardStepIndex,
} from "../../../../rules";
import { openTimingWizardModal } from "../openTimingWizardModal";

function* worker({
	payload: stepIndex,
}: ReturnType<typeof setTimingWizardStepIndex>) {
	const phaseId: ReturnType<typeof selectTimingWizardPhaseId> = yield select(
		selectTimingWizardPhaseId,
	);

	if (typeof stepIndex !== "number" || !phaseId) {
		return;
	}

	yield put(
		openTimingWizardModal({
			phaseId,
			stepIndex,
		}),
	);
}

export function* openTimingWizardStepModalSaga() {
	yield takeEvery(setTimingWizardStepIndex.match, worker);
}
