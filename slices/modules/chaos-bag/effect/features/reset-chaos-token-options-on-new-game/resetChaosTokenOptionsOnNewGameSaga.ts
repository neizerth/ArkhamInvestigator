import {
	setBoardChaosTokenOptions,
	setChaosTokenOptions,
} from "@modules/chaos-bag/effect/shared/lib";
import { newGameStarted } from "@shared/lib/store/features/game/actions/startNewGame";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(setBoardChaosTokenOptions(null));
	yield put(setChaosTokenOptions(null));
}

export function* resetChaosTokenOptionsOnNewGameSaga() {
	yield takeEvery(newGameStarted.match, worker);
}
