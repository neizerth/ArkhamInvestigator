import { selectBoardById, setBoardPart } from "@modules/board/base/shared/lib";
import { put, select, take } from "redux-saga/effects";
import { v4 } from "uuid";
import {
	type AddBoardHistoryItemPayload,
	addBoardHistoryItem,
} from "../actions";

export function* watchAddBoardHistoryItemSaga() {
	const payload: AddBoardHistoryItemPayload = yield take(
		addBoardHistoryItem.match,
	);
	const { boardId, data } = payload;
	const selector = selectBoardById(boardId);
	const board: ReturnType<typeof selector> = yield select(selector);

	if (!board) {
		return;
	}

	const item = {
		id: v4(),
		...data,
	};
	const { history, historyIndex } = board;

	yield put(
		setBoardPart({
			boardId,
			data: {
				history: [...history, item],
				historyIndex: historyIndex + 1,
			},
		}),
	);
}
