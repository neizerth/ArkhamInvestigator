import { spawn } from "redux-saga/effects";
import { roundTimingEntitiesSaga } from "./entities/sagas";
import { roundTimingFeaturesSaga } from "./features/sagas";

export function* roundTimingSaga() {
	yield spawn(roundTimingFeaturesSaga);
	yield spawn(roundTimingEntitiesSaga);
}
