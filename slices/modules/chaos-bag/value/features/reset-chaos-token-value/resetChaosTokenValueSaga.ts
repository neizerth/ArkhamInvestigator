import {
	setReferenceCardCode,
	setStoryCode,
	setStoryDifficultyId,
} from "@modules/stories/shared/lib";
import { newGameStarted } from "@shared/lib/store/features/game/actions/startNewGame";
import { put, takeEvery } from "redux-saga/effects";
import { setBoardChaosTokenValue, setChaosTokenValue } from "../../shared/lib";

function* worker() {
	console.log("resetChaosTokenValueSaga");
	yield put(setBoardChaosTokenValue(null));
	yield put(setChaosTokenValue(null));
}

export function* resetChaosTokenValueSaga() {
	yield takeEvery(newGameStarted.match, worker);
	yield takeEvery(setReferenceCardCode.match, worker);
	yield takeEvery(setStoryCode.match, worker);
	yield takeEvery(setStoryDifficultyId.match, worker);
}
