import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, takeEvery } from "redux-saga/effects";
import { setRevealedTokens } from "../../shared/lib";

function* worker() {
	yield put(setRevealedTokens([]));
}

export function* clearRevealedTokensOnNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
