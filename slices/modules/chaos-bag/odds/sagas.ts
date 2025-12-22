import { spawn } from "redux-saga/effects";
import { chaosBagOddsEntitiesSaga } from "./entities/lib/store/sagas";
import { chaosBagOddsFeaturesSaga } from "./features/sagas";

export function* chaosBagOddsSaga() {
	yield spawn(chaosBagOddsEntitiesSaga);
	yield spawn(chaosBagOddsFeaturesSaga);
}
