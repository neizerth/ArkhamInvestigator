import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, takeEvery } from "redux-saga/effects";
import { closeModal } from "../../shared/base/lib";

function* worker() {
	yield put(
		closeModal({
			source: "effect",
		}),
	);
}

export function* closeModalOnNewGameSaga() {
	yield takeEvery(startNewGame.match, worker);
}
