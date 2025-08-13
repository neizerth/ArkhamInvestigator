import { initAppUI } from "@modules/core/app/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { setKeepAwake } from "../../entities/keep-awake";

function* worker() {
	yield put(setKeepAwake(true));
}

export function* initKeepAwakeSaga() {
	yield takeEvery(initAppUI.match, worker);
}
