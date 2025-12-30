import {
	setBoardChaosTokenOptions,
	setChaosTokenOptions,
} from "@modules/chaos-bag/effect/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(setBoardChaosTokenOptions(null));
	yield put(setChaosTokenOptions(null));
}

export function* resetChaosTokenOptionsOnNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
