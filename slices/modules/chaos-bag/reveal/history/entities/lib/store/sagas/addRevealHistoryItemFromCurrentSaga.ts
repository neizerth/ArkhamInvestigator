import {
	addRevealHistoryItem,
	selectCurrentRevealHistoryItem,
	setCurrentRevealHistoryItem,
} from "@modules/chaos-bag/reveal/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { addRevealHistoryItemFromCurrent } from "../actions";
import { selectCanAddRevealHistoryItem } from "../selectors";

function* worker() {
	const item: ReturnType<typeof selectCurrentRevealHistoryItem> = yield select(
		selectCurrentRevealHistoryItem,
	);

	const canAdd: ReturnType<typeof selectCanAddRevealHistoryItem> = yield select(
		selectCanAddRevealHistoryItem,
	);

	if (!item || !canAdd) {
		return;
	}

	yield put(addRevealHistoryItem(item));
	yield put(setCurrentRevealHistoryItem(null));
}

export function* addRevealHistoryItemFromCurrentSaga() {
	yield takeEvery(addRevealHistoryItemFromCurrent.match, worker);
}
