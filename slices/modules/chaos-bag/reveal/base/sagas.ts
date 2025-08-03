import { spawn } from "redux-saga/effects";
import { chaosBagRevealEntitiesSaga } from "./entities/sagas";
import { chaosBagRevealFeaturesSaga } from "./features/sagas";

export function* chaosBagRevealBaseSaga() {
	yield spawn(chaosBagRevealFeaturesSaga);
	yield spawn(chaosBagRevealEntitiesSaga);
}
