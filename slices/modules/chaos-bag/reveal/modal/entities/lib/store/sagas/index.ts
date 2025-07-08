import { spawn } from "redux-saga/effects";
import { cancelShowRevealChaosBagModalSaga } from "./cancelShowRevealChaosBagModalSaga";
import { endChaosBagRevealSaga } from "./endChaosBagRevealSaga";
import { startChaosBagRevealSaga } from "./startChaosBagRevealSaga";

export function* chaosBagRevealModalEntitiesSaga() {
	yield spawn(cancelShowRevealChaosBagModalSaga);
	yield spawn(endChaosBagRevealSaga);

	yield spawn(startChaosBagRevealSaga);
}
