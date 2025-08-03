import { spawn } from "redux-saga/effects";
import { chaosBagEntitiesSaga } from "./entities/lib/store/sagas";
import { chaosBagFeaturesSaga } from "./features/lib/store/sagas";

export function* chaosBagBaseSaga() {
	yield spawn(chaosBagEntitiesSaga);
	yield spawn(chaosBagFeaturesSaga);
}
