import {
	setBoardChaosTokenOptions,
	setChaosTokenOptions,
} from "@modules/chaos-bag/effect/shared/lib";
import {
	setReferenceCardCode,
	setStoryCode,
	setStoryDifficultyId,
} from "@modules/stories/shared/lib";
import { newGameStarted } from "@shared/lib/store/features/game/actions/startNewGame";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(setBoardChaosTokenOptions(null));
	yield put(setChaosTokenOptions(null));
}

export function* resetChaosTokenOptionsSaga() {
	yield takeEvery(newGameStarted.match, worker);
	yield takeEvery(setReferenceCardCode.match, worker);
	yield takeEvery(setStoryCode.match, worker);
	yield takeEvery(setStoryDifficultyId.match, worker);
}
