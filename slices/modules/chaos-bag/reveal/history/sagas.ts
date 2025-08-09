import { spawn } from "redux-saga/effects";
import { chaosBagRevealHistoryEntitiesSaga } from "./entities/lib/store/features/sagas";

export function* chaosBagRevealHistorySaga() {
	yield spawn(chaosBagRevealHistoryEntitiesSaga);
}
