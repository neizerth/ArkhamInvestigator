import { createTouchFilter } from "@modules/core/touch/shared/lib";
import { select, takeEvery } from "redux-saga/effects";
import {
	getHapticPattern,
	impactHapticFeedback,
	selectHapticMode,
} from "../../shared/lib";

const filterAction = createTouchFilter({
	cancelled: false,
});

// TODO touch category definition
// function* worker({ payload }: ReturnType<typeof touch>) {
function* worker() {
	const mode: ReturnType<typeof selectHapticMode> =
		yield select(selectHapticMode);

	if (mode === false) {
		return;
	}

	const pattern = getHapticPattern({
		mode,
	});

	impactHapticFeedback(pattern);
}

export function* triggerHapticOnTouchSaga() {
	yield takeEvery(filterAction, worker);
}
