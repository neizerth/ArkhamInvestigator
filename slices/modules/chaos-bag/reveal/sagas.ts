import { spawn } from "redux-saga/effects";
import { chaosBagRevealBaseSaga } from "./base/sagas";
import { chaosBagRevealHistorySaga } from "./history/sagas";
import { chaosBagRevealModalSaga } from "./modal/sagas";

export function* chaosBagRevealSaga() {
	yield spawn(chaosBagRevealBaseSaga);
	yield spawn(chaosBagRevealModalSaga);
	yield spawn(chaosBagRevealHistorySaga);
}
