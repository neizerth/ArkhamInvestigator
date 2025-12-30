import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, takeEvery } from "redux-saga/effects";
import { clearRevealHistory } from "../../shared/lib";

function* worker() {
	yield put(clearRevealHistory());
}

export function* clearRevealHistoryOnNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
