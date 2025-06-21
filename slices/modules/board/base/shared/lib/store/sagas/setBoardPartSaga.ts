import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { boardPartChanged, setBoardPart } from "../actions";
import { setBoardPartInternal } from "../board";
import { selectBoardById } from "../selectors";

export function* setBoardPartSaga() {
	const payload: ActionCreatorPayload<typeof setBoardPart> = yield take(
		setBoardPart.match,
	);
	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	yield put(setBoardPartInternal(payload));

	yield put(
		boardPartChanged({
			...payload,
			board,
		}),
	);
}
