import { spawn } from "redux-saga/effects";
import { chaosBagEffectEntitiesSaga } from "./entities/sagas";
import { chaosBagEffectFeaturesSaga } from "./features/sagas";

export function* chaosBagEffectSaga() {
	yield spawn(chaosBagEffectEntitiesSaga);
	yield spawn(chaosBagEffectFeaturesSaga);
}
