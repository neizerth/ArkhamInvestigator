import { appStarted } from "@modules/core/app/shared/lib";
import { takeOnce } from "@shared/lib";
import { put } from "redux-saga/effects";
import { closeModalInternal } from "../../shared/base/lib";

function* worker() {
	yield put(closeModalInternal());
}

export function* initModalSaga() {
	yield takeOnce(appStarted.match, worker);
}
