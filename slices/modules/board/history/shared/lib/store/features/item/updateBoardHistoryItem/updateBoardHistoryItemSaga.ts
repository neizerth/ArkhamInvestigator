import {
	isBoardExists,
	selectBoardById,
	setBoardPart,
} from "@modules/board/base/shared/lib";
import { mergeDeepRight, propEq } from "ramda";
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
		return;
	}

	const item = mergeDeepRight(board.history[index], {
		...data,
	});

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

export function* updateBoardHistoryItemSaga() {
	yield takeEvery(updateBoardHistoryItem.match, worker);
}
