import { put, takeEvery } from "redux-saga/effects";
import { openTimingWizardModal } from "../../entities/lib";
import { startTimingWizard } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof startTimingWizard>) {
	const { phaseId, stepIndex = 0 } = payload;

	yield put(
		openTimingWizardModal({
			phaseId,
			stepIndex,
		}),
	);
}

export function* openTimingWizardFromPhaseSaga() {
	yield takeEvery(startTimingWizard.match, worker);
}
