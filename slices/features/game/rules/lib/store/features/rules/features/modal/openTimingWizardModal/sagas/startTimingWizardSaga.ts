import { put, takeEvery } from "redux-saga/effects";
import { startTimingWizard } from "../../../../rules";
import { openTimingWizardModal } from "../openTimingWizardModal";

function* worker({ payload }: ReturnType<typeof startTimingWizard>) {
	const { phaseId, stepIndex = 0 } = payload;

	yield put(
		openTimingWizardModal({
			phaseId,
			stepIndex,
		}),
	);
}

export function* startTimingWizardSaga() {
	yield takeEvery(startTimingWizard.match, worker);
}
