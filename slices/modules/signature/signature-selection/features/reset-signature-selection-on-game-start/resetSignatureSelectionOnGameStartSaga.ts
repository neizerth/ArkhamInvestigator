import { startGame } from "@modules/game/entities/startGame";
import { put, takeEvery } from "redux-saga/effects";
import { resetSignatureSelection } from "../../shared/lib";

function* worker() {
	yield put(resetSignatureSelection());
}

export function* resetSignatureSelectionOnGameStartSaga() {
	yield takeEvery(startGame.match, worker);
}
