import { spawn } from "redux-saga/effects";
import { chaosBagRevealHistoryEntitiesSaga } from "./entities/lib/store/sagas";
import { chaosBagRevealHistoryFeaturesSaga } from "./features/lib/store/sagas";

export function* chaosBagRevealHistorySaga() {
	yield spawn(chaosBagRevealHistoryEntitiesSaga);
	yield spawn(chaosBagRevealHistoryFeaturesSaga);
}
