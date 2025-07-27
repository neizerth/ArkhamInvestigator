import { spawn } from "redux-saga/effects";
import { triggerHapticFeedbackSaga } from "./triggerHapticFeedback/triggerHapticFeedbackSaga";

export function* hapticSharedSaga() {
	yield spawn(triggerHapticFeedbackSaga);
}
