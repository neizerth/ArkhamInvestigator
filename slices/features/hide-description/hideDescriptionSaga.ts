import { resetBoard } from "@modules/mechanics/board/base/entities/lib";
import { setShowDescription } from "@shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(setShowDescription(false));
}

export function* hideDescriptionSaga() {
	yield takeEvery(resetBoard.match, worker);
}
