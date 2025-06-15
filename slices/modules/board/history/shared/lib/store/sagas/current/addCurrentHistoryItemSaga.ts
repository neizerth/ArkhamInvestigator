import { put, take } from "redux-saga/effects";
import {
	type AddCurrentHistoryItemPayload,
	addBoardHistoryItem,
	addCurrentHistoryItem,
} from "../../actions";

export function* watchAddCurrentHistoryItemSaga() {
	const payload: AddCurrentHistoryItemPayload = yield take(
		addCurrentHistoryItem.match,
	);

	yield put(
		addBoardHistoryItem({
			...payload,
			boardId: "current",
		}),
	);
}
