import { spawn } from "redux-saga/effects";
import { playSoundSaga } from "./playSound/playSoundSaga";

export function* soundBaseEntitiesSaga() {
	yield spawn(playSoundSaga);
}
