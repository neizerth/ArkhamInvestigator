import type { ActionCreatorPayload } from "@shared/model";
import { put, select, take } from "redux-saga/effects";
import { boardPropChanged, setBoardProp } from "../actions";
import { setBoardPropInternal } from "../board";
import { selectBoardById } from "../selectors";

export function* setBoardPropSaga() {
	const payload: ActionCreatorPayload<typeof setBoardProp> = yield take(
		setBoardProp.match,
	);

	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!board) {
		return;
	}

	yield put(setBoardPropInternal(payload));

	const changePayload = {
		...payload,
		board,
	} as ActionCreatorPayload<typeof boardPropChanged>;

	yield put(boardPropChanged(changePayload));
}
