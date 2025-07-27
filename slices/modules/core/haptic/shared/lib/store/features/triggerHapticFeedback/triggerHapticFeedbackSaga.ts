import { select, takeEvery } from "redux-saga/effects";
import { impactHapticFeedback } from "../../../impactHapticFeedback";
import { getHapticPattern } from "../../../patterns";
import { selectHapticMode } from "../../haptic";
import { triggerHapticFeedback } from "./triggerHapticFeedback";

function* worker({ payload }: ReturnType<typeof triggerHapticFeedback>) {
	const mode: ReturnType<typeof selectHapticMode> =
		yield select(selectHapticMode);

	if (mode === false) {
		return;
	}

	const pattern = getHapticPattern({
		mode,
		pattern: payload?.pattern,
	});

	impactHapticFeedback(pattern);
}

export function* triggerHapticFeedbackSaga() {
	yield takeEvery(triggerHapticFeedback.match, worker);
}
