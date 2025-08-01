import { spawn } from "redux-saga/effects";
import { soundEntitiesSaga } from "./entities/sagas";

export function* soundSaga() {
	yield spawn(soundEntitiesSaga);
}
