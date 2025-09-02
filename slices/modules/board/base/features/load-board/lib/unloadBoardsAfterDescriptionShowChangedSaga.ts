import {
	setAlwaysShowGameText,
	unloadAllBoards,
} from "@modules/board/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(unloadAllBoards());
}

export function* unloadBoardsAfterDescriptionShowChangedSaga() {
	yield takeEvery(setAlwaysShowGameText.match, worker);
}
