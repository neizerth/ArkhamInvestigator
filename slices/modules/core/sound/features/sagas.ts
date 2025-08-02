import { spawn } from "redux-saga/effects";
import { triggerUISoundSaga } from "./trigger-ui-sound/triggerUISoundSaga";

export function* soundFeaturesSaga() {
	yield spawn(triggerUISoundSaga);
}
