import { setCurrentRevealHistoryItem } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import { selectRevealHistoryItemData } from "@modules/chaos-bag/reveal/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { createCurrentRevealHistoryItem } from "../../actions";

function* worker({
	payload,
}: ReturnType<typeof createCurrentRevealHistoryItem>) {
	const { boardId, tokens: revealedTokens } = payload;

	const dataSelector = selectRevealHistoryItemData(boardId);
	const data: ReturnType<typeof dataSelector> = yield select(dataSelector);

	if (!data) {
		return;
	}

	const item: ChaosBagHistoryItem = {
		...data,
		id: v4(),
		tokens: revealedTokens,
	};

	yield put(setCurrentRevealHistoryItem(item));
}
export function* createCurrentRevealHistoryItemSaga() {
	yield takeEvery(createCurrentRevealHistoryItem.match, worker);
}
