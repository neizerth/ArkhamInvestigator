import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { boardPropValueChanged } from "../actions";
import { changeBoardValuePart } from "../actions/changeBoardValuePart";
import { setBoardValuePartInternal } from "../board";
import { getChangedBoardValueProps } from "../getters";
import { selectBoardById } from "../selectors";

export function* changeBoardValuePartSaga() {
	const payload: ActionCreatorPayload<typeof changeBoardValuePart> = yield take(
		changeBoardValuePart.match,
	);

	const { boardId, type } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	yield put(setBoardValuePartInternal(payload));

	// generating changed value events

	const changes = getChangedBoardValueProps({
		current: board[type],
		changed: payload.value,
	});

	for (const change of changes) {
		yield put(
			boardPropValueChanged({
				...payload,
				...change,
				type,
			}),
		);
	}
}
