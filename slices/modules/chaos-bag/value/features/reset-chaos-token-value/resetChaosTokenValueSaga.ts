import { startNewGame } from "@modules/game/entities/startNewGame";
import { setStoryCode } from "@modules/stories/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { setBoardChaosTokenValue, setChaosTokenValue } from "../../shared/lib";

function* worker() {
	yield put(setBoardChaosTokenValue(null));
	yield put(setChaosTokenValue(null));
}

export function* resetChaosTokenValueSaga() {
	yield takeEvery(startNewGame.match, worker);
	yield takeEvery(setStoryCode.match, worker);
}
