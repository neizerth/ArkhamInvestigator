import { spawn } from "redux-saga/effects";
import { playSoundSaga } from "./playSound/playSoundSaga";
import { soundPlayEndSaga } from "./soundPlayEnd/soundPlayEndSaga";
import { soundPlayStartedSaga } from "./soundPlayStarted/soundPlayStartedSaga";

export function* soundBaseEntitiesSaga() {
	yield spawn(playSoundSaga);
	yield spawn(soundPlayStartedSaga);
	yield spawn(soundPlayEndSaga);
}
