import { spawn } from "redux-saga/effects";
import { triggerHapticOnTouchSaga } from "./trigger-haptic-on-touch/triggerHapticOnTouchSaga";

export function* hapticFeaturesSaga() {
	yield spawn(triggerHapticOnTouchSaga);
}
