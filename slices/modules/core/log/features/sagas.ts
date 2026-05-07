import { spawn } from "redux-saga/effects";
import { initLogRotationSaga } from "./init-log-rotation/initLogRotationSaga";

export function* logFeaturesSaga() {
	yield spawn(initLogRotationSaga);
}
