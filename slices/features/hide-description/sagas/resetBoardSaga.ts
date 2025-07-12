import { resetBoard } from "@modules/mechanics/board/base/entities/lib";
import { takeEvery } from "redux-saga/effects";
import { hideDescriptionWorker } from "../hideDescriptionWorker";

export function* resetBoardSaga() {
	yield takeEvery(resetBoard.match, hideDescriptionWorker);
}
