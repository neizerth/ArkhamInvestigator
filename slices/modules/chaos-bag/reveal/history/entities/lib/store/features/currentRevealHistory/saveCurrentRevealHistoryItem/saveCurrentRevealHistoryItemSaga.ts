import { selectCurrentRevealHistoryItem } from "@modules/chaos-bag/reveal/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { createCurrentRevealHistoryItem } from "../createCurrentRevealHistoryItem";
import { updateCurrentRevealHistoryItem } from "../updateCurrentRevealHistoryItem";
import { saveCurrentRevealHistoryItem } from "./saveCurrentRevealHistoryItem";

function* worker({ payload }: ReturnType<typeof saveCurrentRevealHistoryItem>) {
	const item: ReturnType<typeof selectCurrentRevealHistoryItem> = yield select(
		selectCurrentRevealHistoryItem,
	);

	const actionCreator = item
		? updateCurrentRevealHistoryItem
		: createCurrentRevealHistoryItem;

	yield put(actionCreator(payload));
}
export function* saveCurrentRevealHistoryItemSaga() {
	yield takeEvery(saveCurrentRevealHistoryItem.match, worker);
}
