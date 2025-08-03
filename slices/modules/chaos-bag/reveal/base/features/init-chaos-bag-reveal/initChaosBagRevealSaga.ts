import { initApp } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { endChaosBagReveal } from "../../shared/lib";

function* worker() {
	yield put(endChaosBagReveal());
}

export function* initChaosBagRevealSaga() {
	yield takeEvery(initApp.match, worker);
}
