import { initAppUI } from "@modules/core/app/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { checkAppUpdates } from "../../entities/checkAppUpdates";

function* worker() {
	yield put(checkAppUpdates());
}

export function* checkInitialAppUpdatesSaga() {
	yield takeEvery(initAppUI.match, worker);
}
