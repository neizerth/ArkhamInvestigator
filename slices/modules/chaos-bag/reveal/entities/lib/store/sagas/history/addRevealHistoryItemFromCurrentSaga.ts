import {
	addRevealHistoryItem,
	selectCurrentRevealHistoryItem,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { addRevealHistoryItemFromCurrent } from "../../actions";
import { selectCanAddRevealHistoryItem } from "../../selectors/logic";

// TODO
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
}

export function* addRevealHistoryItemFromCurrentSaga() {
	yield takeEvery(addRevealHistoryItemFromCurrent.match, worker);
}
