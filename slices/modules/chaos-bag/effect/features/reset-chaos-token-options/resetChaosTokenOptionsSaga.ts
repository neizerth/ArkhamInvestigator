import {
	setBoardChaosTokenOptions,
	setChaosTokenOptions,
} from "@modules/chaos-bag/effect/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { setStoryCode } from "@modules/stories/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(setBoardChaosTokenOptions(null));
	yield put(setChaosTokenOptions(null));
}

export function* resetChaosTokenOptionsSaga() {
	yield takeEvery(startNewGame.match, worker);
	yield takeEvery(setStoryCode.match, worker);
}
