import { setBoardPart } from "@modules/board/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { isHistoryItemEmpty } from "../../../../features";
import {
	addBoardHistoryItem,
	boardHistoryItemAdded,
} from "./addBoardHistoryItem";

function* worker({ payload }: ReturnType<typeof addBoardHistoryItem>) {
	const { boardId, data, id = v4(), board } = payload;

	const { historyIndex, investigator } = board;

	const history = board.history.slice(0, historyIndex + 1);

	const isEmpty = isHistoryItemEmpty({
		board,
		data,
	});

	if (isEmpty) {
		return;
	}

	const item = {
		...data,
		id,
	};

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
