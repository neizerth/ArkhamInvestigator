import { spawn } from "redux-saga/effects";
import { triggerHapticOnTouchSaga } from "./trigger-haptic-on-touch/triggerHapticOnTouchSaga";
import { triggerHapticOnUIEventSaga } from "./trigger-haptic-on-ui-event/triggerHapticOnUIEventSaga";

export function* hapticFeaturesSaga() {
	yield spawn(triggerHapticOnTouchSaga);
	yield spawn(triggerHapticOnUIEventSaga);
}
