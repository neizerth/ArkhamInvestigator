import { selectSaveTrauma } from "@modules/board/base/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, select, takeEvery } from "redux-saga/effects";
import { clearTraumaSettings } from "../../shared/lib";

function* worker() {
	const saveTrauma: ReturnType<typeof selectSaveTrauma> =
		yield select(selectSaveTrauma);

	if (saveTrauma) {
		return;
	}

	yield put(clearTraumaSettings());
}

export function* resetTraumaOnNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
