import { takeEvery } from "redux-saga/effects";
import { startTimingWizard } from "../../../../rules";

function* worker() {
	yield;
}

export function* startTimingWizardSaga() {
	yield takeEvery(startTimingWizard.match, worker);
}
