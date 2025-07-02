import { chaosBagEntitiesSaga } from "@modules/chaos-bag/base/entities/lib/store/sagas";
import { chaosBagFeaturesSaga } from "@modules/chaos-bag/base/features/lib/store/sagas";
import { spawn } from "redux-saga/effects";

export function* chaosBagSaga() {
	yield spawn(chaosBagEntitiesSaga);

	yield spawn(chaosBagFeaturesSaga);
}
