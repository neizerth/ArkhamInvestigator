import {
	selectCurrentRevealHistoryItem,
	setCurrentRevealHistoryItem,
} from "@modules/chaos-bag/base/shared/lib";
import {
	createRevealHistoryItem,
	selectRevealHistoryItemData,
	updateRevealHistoryItem,
} from "@modules/chaos-bag/reveal/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateCurrentRevealHistoryItem } from "../../actions";

function* worker({
	payload,
}: ReturnType<typeof updateCurrentRevealHistoryItem>) {
	const { boardId } = payload;

	const currentItem: ReturnType<typeof selectCurrentRevealHistoryItem> =
		yield select(selectCurrentRevealHistoryItem);

	const dataSelector = selectRevealHistoryItemData(boardId);
	const data: ReturnType<typeof dataSelector> = yield select(dataSelector);

	if (!data) {
		return;
	}

	const item = currentItem
		? updateRevealHistoryItem(currentItem, data)
		: createRevealHistoryItem(data);

	yield put(setCurrentRevealHistoryItem(item));
}
export function* updateCurrentRevealHistoryItemSaga() {
	yield takeEvery(updateCurrentRevealHistoryItem.match, worker);
}
