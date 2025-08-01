import { createUIEventFilter } from "@modules/core/ui/lib/store/util";
import { put, takeEvery } from "redux-saga/effects";
import { triggerHapticFeedback } from "../../shared/lib";

const filterAction = createUIEventFilter({
	types: ["changing", "focus"],
	canceled: false,
});

function* worker() {
	yield put(triggerHapticFeedback({}));
}

export function* triggerHapticOnUIEventSaga() {
	yield takeEvery(filterAction, worker);
}
