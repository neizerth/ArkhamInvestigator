import { setAssetsLoaded } from "@modules/core/assets/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { initAppUI } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof setAssetsLoaded>) {
	if (!payload) {
		return;
	}
	yield put(initAppUI());
}

export function* initAppUISaga() {
	yield takeEvery(setAssetsLoaded.match, worker);
}
