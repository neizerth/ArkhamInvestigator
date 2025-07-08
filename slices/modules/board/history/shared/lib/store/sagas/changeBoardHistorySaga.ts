import { put, select, takeEvery } from "redux-saga/effects";
import {
	addBoardHistoryItem,
	changeBoardHistory,
	replaceBoardHistoryItem,
	updateBoardHistoryItem,
} from "../actions";
import { selectBoardHistoryItem } from "../selectors";

const actionMap = {
	group: addBoardHistoryItem,
	update: updateBoardHistoryItem,
	replace: replaceBoardHistoryItem,
};

function* worker({ payload }: ReturnType<typeof changeBoardHistory>) {
	if (!payload.history) {
		yield put(addBoardHistoryItem(payload));
		return;
	}

	const { boardId } = payload;
	const { id, type } = payload.history;

	const itemSelector = selectBoardHistoryItem({
		boardId,
		id,
	});

	const historyItem: ReturnType<typeof itemSelector> =
		yield select(itemSelector);

	if (historyItem && type === "group") {
		yield put(
			updateBoardHistoryItem({
				...payload,
				id,
			}),
		);
		return;
	}

	const actionCreator = actionMap[type];

	yield put(
		actionCreator({
			...payload,
			id,
		}),
	);
}

export function* changeBoardHistorySaga() {
	yield takeEvery(changeBoardHistory.match, worker);
}
