import {
	selectCurrentBoardId,
	setNextBoardIndex,
	setPrevBoardIndex,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { setBoardSystemBar } from "../setBoardSystemBar";

function* worker() {
	const boardId: ReturnType<typeof selectCurrentBoardId> =
		yield select(selectCurrentBoardId);

	yield put(setBoardSystemBar(boardId));
}

export function* watchIndexChangeSaga() {
	yield takeEvery(setNextBoardIndex, worker);
	yield takeEvery(setPrevBoardIndex, worker);
}
