import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { addBoardHistoryItem, addCurrentHistoryItem } from "../../actions";

export function* watchAddCurrentHistoryItemSaga() {
	const payload: ActionCreatorPayload<typeof addCurrentHistoryItem> =
		yield take(addCurrentHistoryItem.match);

	yield put(
		addBoardHistoryItem({
			...payload,
			boardId: "current",
		}),
	);
}
