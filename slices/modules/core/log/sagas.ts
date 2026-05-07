import { spawn } from "redux-saga/effects";
import { logEntitiesSaga } from "./entities/sagas";
import { logFeaturesSaga } from "./features/sagas";

export function* logSaga() {
	yield spawn(logEntitiesSaga);
	yield spawn(logFeaturesSaga);
}
