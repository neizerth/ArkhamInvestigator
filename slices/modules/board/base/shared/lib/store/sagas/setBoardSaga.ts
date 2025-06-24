import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { boardChanged, setBoard } from "../actions";
import { setBoardInternal } from "../board";
import { selectBoardById } from "../selectors";

export function* setBoardSaga() {
	const payload: ActionCreatorPayload<typeof setBoard> = yield take(
		setBoard.match,
	);
	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	yield put(setBoardInternal(payload));

	yield put(
		boardChanged({
			...payload,
			board,
		}),
	);
}
