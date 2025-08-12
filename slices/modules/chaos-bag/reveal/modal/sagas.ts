import { spawn } from "redux-saga/effects";
import { chaosBagRevealModalEntitiesSaga } from "./entities/sagas";
import { chaosTokenRevelModalFeaturesSaga } from "./features/sagas";

export function* chaosBagRevealModalSaga() {
	yield spawn(chaosTokenRevelModalFeaturesSaga);
	yield spawn(chaosBagRevealModalEntitiesSaga);
}
