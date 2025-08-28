import { spawn } from "redux-saga/effects";
import { triggerPickerSoundSaga } from "./trigger-picker-sound/triggerPickerSound";

export function* soundFeaturesSaga() {
	yield spawn(triggerPickerSoundSaga);
}
