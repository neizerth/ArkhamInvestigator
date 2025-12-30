import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, takeEvery } from "redux-saga/effects";
import { clearBoards } from "../../shared/lib";

function* worker() {
	yield put(clearBoards());
}

export function* clearBoardOnNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
