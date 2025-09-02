import {
	selectBoardsLoadProgress,
	setBoardProgress,
} from "@modules/board/base/shared/lib";
import { setStatusBarStyle } from "@modules/core/device/entities/status-bar";
import { put, select, takeEvery } from "redux-saga/effects";
import { setBoardSystemBar } from "../setBoardSystemBar";

function* worker({ payload }: ReturnType<typeof setBoardProgress>) {
	const loadProgress: ReturnType<typeof selectBoardsLoadProgress> =
		yield select(selectBoardsLoadProgress);

	if (loadProgress < 100) {
		yield put(setStatusBarStyle("light"));
		return;
	}

	yield put(setBoardSystemBar("current"));
}

export function* watchBoardsLoadedSaga() {
	yield takeEvery(setBoardProgress.match, worker);
}
