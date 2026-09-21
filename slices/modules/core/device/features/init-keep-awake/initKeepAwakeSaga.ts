import { appLoaded } from "@modules/core/app/shared/lib";
import { takeOnce } from "@shared/lib";
import { put } from "redux-saga/effects";
import { setKeepAwake } from "../../entities/keep-awake";

function* worker() {
	yield put(setKeepAwake(true));
}

export function* initKeepAwakeSaga() {
	yield takeOnce(appLoaded.match, worker);
}
