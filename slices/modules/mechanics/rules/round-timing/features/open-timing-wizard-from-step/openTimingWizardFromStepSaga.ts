import { put, select, takeEvery } from "redux-saga/effects";
import { openTimingWizardModal } from "../../entities/lib";
import {
	selectTimingWizardPhaseId,
	setTimingWizardStepIndex,
} from "../../shared/lib";

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

export function* openTimingWizardFromStepSaga() {
	yield takeEvery(setTimingWizardStepIndex.match, worker);
}
