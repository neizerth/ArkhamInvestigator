import { spawn } from "redux-saga/effects";
import { networkEntitiesSaga } from "./entities/sagas";
import { networkFeaturesSaga } from "./features/sagas";

export function* networkSaga() {
	yield spawn(networkEntitiesSaga);
	yield spawn(networkFeaturesSaga);
}
