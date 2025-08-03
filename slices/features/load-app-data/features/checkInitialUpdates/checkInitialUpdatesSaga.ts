import { initApp } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { checkAppUpdates } from "../checkAppUpdates";

function* worker() {
	yield put(checkAppUpdates());
}

export function* checkInitialUpdatesSaga() {
	yield takeEvery(initApp.match, worker);
}
