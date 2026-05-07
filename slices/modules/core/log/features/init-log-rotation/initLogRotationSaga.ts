import { appStarted } from "@modules/core/app/shared/lib";
import { callEvery, minutes } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { clearLogs } from "../../entities/lib/store/features/clearLogs";

function* worker() {
	yield put(clearLogs({ period: "yesterday" }));
}

export function* initLogRotationSaga() {
	yield takeEvery(appStarted.match, worker);
	yield callEvery(minutes(10), worker);
}
