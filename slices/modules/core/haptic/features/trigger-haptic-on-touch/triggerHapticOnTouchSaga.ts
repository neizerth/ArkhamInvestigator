import { createTouchFilter } from "@modules/core/touch/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { triggerHapticFeedback } from "../../shared/lib/store/features/triggerHapticFeedback/triggerHapticFeedback";

const filterAction = createTouchFilter({
	cancelled: false,
});

// TODO touch category definition
// function* worker({ payload }: ReturnType<typeof touch>) {
function* worker() {
	yield put(triggerHapticFeedback({}));
}

export function* triggerHapticOnTouchSaga() {
	yield takeEvery(filterAction, worker);
}
