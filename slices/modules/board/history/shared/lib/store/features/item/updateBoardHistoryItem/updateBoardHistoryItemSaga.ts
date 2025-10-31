import {
	isBoardExists,
	selectBoardById,
	setBoardPart,
} from "@modules/board/base/shared/lib";
import { mergeDeepRight, omit, propEq } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateBoardHistoryItem } from "./updateBoardHistoryItem";

function* worker({ payload }: ReturnType<typeof updateBoardHistoryItem>) {
	const { boardId, data, id } = payload;
	const selector = selectBoardById(boardId);
	const board: ReturnType<typeof selector> = yield select(selector);

	if (!isBoardExists(board)) {
		return;
	}

	const index = board.history.findIndex(propEq(id, "id"));

	if (index === -1) {
		console.log("item not found", id);
		return;
	}

	const historyItem = board.history[index];

	const item = mergeDeepRight(historyItem, data);

	const history = board.history.with(index, item);
	const update = omit(["id"], item);

	yield put(
		setBoardPart({
			boardId,
			data: {
				...update,
				history,
			},
			history: false,
		}),
	);
}

export function* updateBoardHistoryItemSaga() {
	yield takeEvery(updateBoardHistoryItem.match, worker);
}
