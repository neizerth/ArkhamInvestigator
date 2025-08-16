import { appStarted } from "@modules/core/app/shared/lib";
import { color } from "@shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { setBackgroundColor } from "../../entities/background-color";

function* worker() {
	yield put(setBackgroundColor(color.black));
}

export function* initBackgroundColorSaga() {
	yield takeEvery(appStarted.match, worker);
}
