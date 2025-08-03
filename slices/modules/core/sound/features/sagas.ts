import { spawn } from "redux-saga/effects";
import { initSoundSaga } from "./init-sound/initSoundSaga";
import { triggerUISoundSaga } from "./trigger-ui-sound/triggerUISoundSaga";

export function* soundFeaturesSaga() {
	yield spawn(triggerUISoundSaga);
	yield spawn(initSoundSaga);
}
