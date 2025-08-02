import { spawn } from "redux-saga/effects";
import { soundEntitiesSaga } from "./entities/sagas";
import { soundFeaturesSaga } from "./features/sagas";

export function* soundSaga() {
	yield spawn(soundEntitiesSaga);
	yield spawn(soundFeaturesSaga);
}
