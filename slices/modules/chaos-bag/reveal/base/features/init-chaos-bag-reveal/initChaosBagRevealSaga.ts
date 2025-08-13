import { initAppUI } from "@modules/core/app/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { endChaosBagReveal } from "../../entities/lib";

function* worker() {
	yield put(endChaosBagReveal({}));
}

export function* initChaosBagRevealSaga() {
	yield takeEvery(initAppUI.match, worker);
}
