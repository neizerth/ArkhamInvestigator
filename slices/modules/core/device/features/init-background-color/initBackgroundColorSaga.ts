import { appStarted } from "@modules/core/app/shared/lib";
import { color } from "@shared/config";
import { takeOnce } from "@shared/lib";
import { put } from "redux-saga/effects";
import { setBackgroundColor } from "../../entities/background-color";

function* worker() {
	yield put(setBackgroundColor(color.black));
}

export function* initBackgroundColorSaga() {
	yield takeOnce(appStarted.match, worker);
}
