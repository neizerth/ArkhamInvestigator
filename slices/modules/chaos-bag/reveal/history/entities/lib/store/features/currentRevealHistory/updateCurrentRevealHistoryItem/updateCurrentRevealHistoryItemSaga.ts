import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import {
	selectCurrentRevealHistoryItem,
	selectRevealHistoryItemData,
	setCurrentRevealHistoryItem,
} from "@modules/chaos-bag/reveal/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateCurrentRevealHistoryItem } from "./updateCurrentRevealHistoryItem";

function* worker({
	payload,
}: ReturnType<typeof updateCurrentRevealHistoryItem>) {
	const { boardId, tokens = [] } = payload;

	const item: ReturnType<typeof selectCurrentRevealHistoryItem> = yield select(
		selectCurrentRevealHistoryItem,
	);

	const dataSelector = selectRevealHistoryItemData(boardId);
	const data: ReturnType<typeof dataSelector> = yield select(dataSelector);

	if (!data || !item) {
		return;
	}

	const update: ChaosBagHistoryItem = {
		...item,
		...data,
		tokens: [...item.tokens, ...tokens],
	};

	yield put(setCurrentRevealHistoryItem(update));
}
export function* updateCurrentRevealHistoryItemSaga() {
	yield takeEvery(updateCurrentRevealHistoryItem.match, worker);
}
