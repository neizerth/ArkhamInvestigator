import { selectCurrentRevealHistoryItem } from "@modules/chaos-bag/reveal/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	createCurrentRevealHistoryItem,
	saveCurrentRevealHistoryItem,
	updateCurrentRevealHistoryItem,
} from "../../actions";

function* worker({ payload }: ReturnType<typeof saveCurrentRevealHistoryItem>) {
	const item: ReturnType<typeof selectCurrentRevealHistoryItem> = yield select(
		selectCurrentRevealHistoryItem,
	);

	if (!item) {
		yield put(createCurrentRevealHistoryItem(payload));
	} else {
		yield put(updateCurrentRevealHistoryItem(payload));
	}
}
export function* saveCurrentRevealHistoryItemSaga() {
	yield takeEvery(saveCurrentRevealHistoryItem.match, worker);
}
