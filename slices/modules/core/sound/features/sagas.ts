import { spawn } from "redux-saga/effects";
import { initSoundSaga } from "./init-sound/initSoundSaga";
import { triggerPickerSoundSaga } from "./trigger-picker-sound/triggerPickerSound";

export function* soundFeaturesSaga() {
	yield spawn(triggerPickerSoundSaga);
	yield spawn(initSoundSaga);
}
