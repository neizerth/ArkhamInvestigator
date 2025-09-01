import { appStarted } from "@modules/core/app/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { unloadAllBoards } from "../../shared/lib";

function* worker() {
	yield put(unloadAllBoards());
}

export function* unloadBoardsOnInitSaga() {
	yield takeEvery(appStarted.match, worker);
}
