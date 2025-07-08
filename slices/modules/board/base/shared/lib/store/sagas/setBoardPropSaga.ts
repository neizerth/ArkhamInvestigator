import type { ActionCreatorPayload } from "@shared/model";
import { put, select, takeEvery } from "redux-saga/effects";
import { isBoardExists } from "../../fallback";
import { boardPropChanged, setBoardProp } from "../actions";
import { setBoardPropInternal } from "../board";
import { selectBoardById } from "../selectors";

function* worker({ payload }: ReturnType<typeof setBoardProp>) {
	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!isBoardExists(board)) {
		return;
	}

	yield put(setBoardPropInternal(payload));

	const changePayload = {
		...payload,
		board,
	} as ActionCreatorPayload<typeof boardPropChanged>;

	yield put(boardPropChanged(changePayload));
}

export function* setBoardPropSaga() {
	yield takeEvery(setBoardProp.match, worker);
}
