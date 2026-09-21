import { appStarted } from "@modules/core/app/shared/lib";
import { takeOnce } from "@shared/lib";
import { put } from "redux-saga/effects";
import { unloadAllBoards } from "../../shared/lib";

function* worker() {
	yield put(unloadAllBoards());
}

export function* unloadBoardsOnInitSaga() {
	yield takeOnce(appStarted.match, worker);
}
