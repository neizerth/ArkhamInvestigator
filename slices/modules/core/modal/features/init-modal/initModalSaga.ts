import { initAppUI } from "@modules/core/app/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { closeModalInternal } from "../../shared/base/lib";

function* worker() {
	yield put(closeModalInternal());
}

export function* initModalSaga() {
	yield takeEvery(initAppUI.match, worker);
}
