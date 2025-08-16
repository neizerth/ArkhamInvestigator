import { appStarted } from "@modules/core/app/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { setNavigationBarStyle } from "../../entities/navigation-bar";

function* worker() {
	yield put(setNavigationBarStyle("dark"));
}

export function* initNavigationbarSaga() {
	yield takeEvery(appStarted.match, worker);
}
