import { startNewGame } from "@modules/game/entities/startNewGame";
import { put, takeEvery } from "redux-saga/effects";
import { resetSignatureSelection } from "../../shared/lib";

function* worker() {
	yield put(resetSignatureSelection());
}

export function* resetSignatureSelectionOnGameStartSaga() {
	yield takeEvery(startNewGame.match, worker);
}
