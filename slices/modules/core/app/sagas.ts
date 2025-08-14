import { spawn } from "redux-saga/effects";
import { appEntitiesSaga } from "./entities/sagas";
import { appFeaturesSaga } from "./features/sagas";

export function* appSaga() {
	yield spawn(appFeaturesSaga);
	yield spawn(appEntitiesSaga);
}
