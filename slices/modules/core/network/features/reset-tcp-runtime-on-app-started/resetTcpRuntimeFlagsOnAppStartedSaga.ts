import { appStarted } from "@modules/core/app/shared/lib";
import {
	setClientRunning,
	setHostRunning,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

/** After cold boot, persisted flags may say TCP is up while native sockets are gone. */
function* worker() {
	yield put(setHostRunning(false));
	yield put(setClientRunning(false));
}

export function* resetTcpRuntimeFlagsOnAppStartedSaga() {
	yield takeEvery(appStarted.match, worker);
}
