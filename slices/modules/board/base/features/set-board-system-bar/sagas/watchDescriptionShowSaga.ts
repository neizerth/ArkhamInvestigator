import { setShowDescription } from "@modules/board/base/shared/lib";
import { setStatusBarStyle } from "@modules/core/device/entities/status-bar";
import { put, takeEvery } from "redux-saga/effects";
import { setBoardSystemBar } from "../setBoardSystemBar";

function* worker({ payload }: ReturnType<typeof setShowDescription>) {
	if (!payload) {
		yield put(setBoardSystemBar("current"));
		return;
	}

	yield put(setStatusBarStyle("light"));
}

export function* watchDescriptionShowSaga() {
	yield takeEvery(setShowDescription.match, worker);
}
