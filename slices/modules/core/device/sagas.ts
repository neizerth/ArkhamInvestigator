import { spawn } from "redux-saga/effects";
import { deviceFeaturesSaga } from "./features/sagas";

export function* deviceSaga() {
	yield spawn(deviceFeaturesSaga);
}
