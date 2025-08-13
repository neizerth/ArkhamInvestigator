import { spawn } from "redux-saga/effects";
import { deviceEntitiesSaga } from "./entities/sagas";
import { deviceFeaturesSaga } from "./features/sagas";

export function* deviceSaga() {
	yield spawn(deviceEntitiesSaga);
	yield spawn(deviceFeaturesSaga);
}
