import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { boardPropValueChanged, setBoardPropValue } from "../actions";
import { setBoardPropValueInternal } from "../board";
import { selectBoardById } from "../selectors";

export function* setBoardPropValueSaga() {
	const payload: ActionCreatorPayload<typeof setBoardPropValue> = yield take(
		setBoardPropValue.match,
	);
	const { boardId, prop } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	yield put(setBoardPropValueInternal(payload));

	yield put(
		boardPropValueChanged({
			...payload,
			board,
		}),
	);
}
