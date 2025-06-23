import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import {
	addBoardHistoryItem,
	changeBoardHistory,
	replaceBoardHistoryItem,
	updateBoardHistoryItem,
} from "../actions";

export function* changeBoardHistorySaga() {
	const payload: ActionCreatorPayload<typeof changeBoardHistory> =
		yield take(changeBoardHistory);

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
