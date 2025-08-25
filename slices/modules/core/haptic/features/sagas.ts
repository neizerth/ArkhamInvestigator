import { spawn } from "redux-saga/effects";
import { initHapticSaga } from "./init-haptic/initHapticSaga";
import { triggerHapticOnTouchSaga } from "./trigger-haptic-on-touch/triggerHapticOnTouchSaga";
import { triggerHapticOnUIEventSaga } from "./trigger-haptic-on-ui-event/triggerHapticOnUIEventSaga";

export function* hapticFeaturesSaga() {
	yield spawn(initHapticSaga);
	yield spawn(triggerHapticOnTouchSaga);
	yield spawn(triggerHapticOnUIEventSaga);
}
