import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import {
	boardValuePartChanged,
	setBoardValuePart,
} from "../actions/setBoardValuePart";
import { setBoardValuePartInternal } from "../board";
import { selectBoardById } from "../selectors";

export function* setBoardValuePartSaga() {
	const payload: ActionCreatorPayload<typeof setBoardValuePart> = yield take(
		setBoardValuePart.match,
	);

	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	yield put(setBoardValuePartInternal(payload));

	yield put(
		boardValuePartChanged({
			...payload,
			board,
		}),
	);
}
