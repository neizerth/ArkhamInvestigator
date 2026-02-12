import { startNewGame } from "@modules/game/entities/startNewGame";
import { startMultiplayerGame } from "@modules/multiplayer/entities/lib/store/features/startMultiplayerGame";
import { put, takeEvery } from "redux-saga/effects";
import { clearSelectedPlayerSignatures } from "../../entities/lib";

function* worker() {
	yield put(clearSelectedPlayerSignatures());
}

export function* resetSignatureSelectionOnGameStartSaga() {
	yield takeEvery(startNewGame.match, worker);
	yield takeEvery(startMultiplayerGame.match, worker);
}
