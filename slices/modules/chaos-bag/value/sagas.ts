import { spawn } from "redux-saga/effects";
import { chaosBagValueEntitiesSaga } from "./entities/lib/store/sagas";
import { chaosBagValueFeaturesSaga } from "./features/sagas";

export function* chaosBagValueSaga() {
	yield spawn(chaosBagValueEntitiesSaga);
	yield spawn(chaosBagValueFeaturesSaga);
}
