import { spawn } from "redux-saga/effects";
import { chaosBagEntitiesSaga } from "./entities/sagas";
import { chaosBagFeaturesSaga } from "./features/sagas";

export function* chaosBagBaseSaga() {
	yield spawn(chaosBagEntitiesSaga);
	yield spawn(chaosBagFeaturesSaga);
}
