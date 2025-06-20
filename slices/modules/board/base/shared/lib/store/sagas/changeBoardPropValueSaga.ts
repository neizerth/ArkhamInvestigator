import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { boardPropValueChanged, changeBoardPropValue } from "../actions";
import { setBoardPropValueInternal } from "../board";
import { selectBoardById } from "../selectors";

export function* changeBoardPropValueSaga() {
	const payload: ActionCreatorPayload<typeof changeBoardPropValue> = yield take(
		changeBoardPropValue.match,
	);
	const { boardId, prop } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}
	const prevValue = board.value[prop];

	yield put(setBoardPropValueInternal(payload));

	// generating changed value event

	yield put(
		boardPropValueChanged({
			...payload,
			prevValue,
		}),
	);
}
