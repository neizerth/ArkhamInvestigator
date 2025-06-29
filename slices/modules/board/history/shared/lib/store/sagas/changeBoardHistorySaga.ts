import { put, takeEvery } from "redux-saga/effects";
import {
	addBoardHistoryItem,
	changeBoardHistory,
	replaceBoardHistoryItem,
	updateBoardHistoryItem,
} from "../actions";

function* worker({ payload }: ReturnType<typeof changeBoardHistory>) {
	if (!payload.history) {
		yield put(addBoardHistoryItem(payload));
	} else if (payload.history.type === "update") {
		yield put(
			updateBoardHistoryItem({
				...payload,
				id: payload.history.id,
			}),
		);
	} else if (payload.history.type === "replace") {
		yield put(
			replaceBoardHistoryItem({
				...payload,
				id: payload.history.id,
			}),
		);
	}
}

export function* changeBoardHistorySaga() {
	yield takeEvery(changeBoardHistory.match, worker);
}
