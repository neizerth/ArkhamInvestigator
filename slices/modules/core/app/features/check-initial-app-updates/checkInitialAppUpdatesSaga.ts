import { appStarted } from "@modules/core/app/shared/lib";
import { filterInternetIsReachable } from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { checkAppUpdates } from "../../entities/checkAppUpdates";

function* worker() {
	yield put(checkAppUpdates());
}

export function* checkInitialAppUpdatesSaga() {
	yield takeEvery(appStarted.match, worker);
	yield takeEvery(filterInternetIsReachable(true), worker);
}
