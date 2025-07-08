import {
	isBoardExists,
	selectBoardById,
	setBoardPart,
} from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { addBoardHistoryItem, boardHistoryItemAdded } from "../../actions";

function* worker({ payload }: ReturnType<typeof addBoardHistoryItem>) {
	const { boardId, data, id = v4() } = payload;
	const selector = selectBoardById(boardId);
	const board: ReturnType<typeof selector> = yield select(selector);

	if (!isBoardExists(board)) {
		return;
	}

	const item = {
		...data,
		id,
	};

	const { history, historyIndex, investigator } = board;

	const historyData = [...history, item];

	yield put(
		setBoardPart({
			boardId,
			data: {
				history: historyData,
				historyIndex: historyIndex + 1,
			},
			history: false,
		}),
	);

	const { code } = investigator;

	yield put(
		boardHistoryItemAdded({
			boardId,
			code,
			item,
			board,
		}),
	);
}

export function* addBoardHistoryItemSaga() {
	yield takeEvery(addBoardHistoryItem.match, worker);
}
