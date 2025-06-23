import { selectBoardById, setBoardPart } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { mergeDeepRight, propEq } from "ramda";
import { put, select, take } from "redux-saga/effects";
import { updateBoardHistoryItem } from "../../actions";

export function* updateBoardHistoryItemSaga() {
	const payload: ActionCreatorPayload<typeof updateBoardHistoryItem> =
		yield take(updateBoardHistoryItem.match);
	const { boardId, data, id } = payload;
	const selector = selectBoardById(boardId);
	const board: ReturnType<typeof selector> = yield select(selector);

	if (!board) {
		return;
	}

	const index = board.history.findIndex(propEq(id, "id"));

	if (index === -1) {
		return;
	}

	const item = mergeDeepRight(board.history[index], data);

	const history = board.history.with(index, item);

	yield put(
		setBoardPart({
			boardId,
			data: {
				history,
			},
			history: false,
		}),
	);
}
