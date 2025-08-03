import { initApp } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { clearSoundQueue } from "../../shared/lib";

function* worker() {
	yield put(clearSoundQueue());
}

export function* initSoundSaga() {
	yield takeEvery(initApp.match, worker);
}
