import { spawn } from "redux-saga/effects";
import { themeEntitiesSaga } from "./entities/sagas";

export function* themeSaga() {
	yield spawn(themeEntitiesSaga);
	// yield spawn(themeFeaturesSaga);
}
