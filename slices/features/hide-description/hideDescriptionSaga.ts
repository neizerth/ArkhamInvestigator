import { setShowDescription } from "@modules/board/base/shared/lib";
import { resetBoard } from "@modules/mechanics/board/base/entities/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(setShowDescription(false));
}

export function* hideDescriptionSaga() {
	yield takeEvery(resetBoard.match, worker);
}
