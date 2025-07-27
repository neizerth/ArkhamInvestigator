import { UIEvent } from "@modules/core/ui/lib";
import { put, takeEvery } from "redux-saga/effects";
import { triggerHapticFeedback } from "../../shared/lib";

function* worker() {
	yield put(triggerHapticFeedback({}));
}

export function* triggerHapticOnUIEventSaga() {
	yield takeEvery(UIEvent.match, worker);
}
