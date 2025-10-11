import {
	isBoardExists,
	selectBoardById,
	setBoardPart,
} from "@modules/board/base/shared/lib";
import { propEq } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { replaceBoardHistoryItem } from "./replaceBoardHistoryItem";

function* worker({ payload }: ReturnType<typeof replaceBoardHistoryItem>) {
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

	const { usedAbilities } = board;

	const item = {
		id: v4(),
		usedAbilities,
		...data,
	};

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

export function* replaceBoardHistoryItemSaga() {
	yield takeEvery(replaceBoardHistoryItem.match, worker);
}
