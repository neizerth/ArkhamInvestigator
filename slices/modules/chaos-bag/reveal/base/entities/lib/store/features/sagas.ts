import { spawn } from "redux-saga/effects";
import { chaosBagRevealReturnSaga } from "./return/sagas";
import { revealChaosTokensSaga } from "./revealChaosTokens/revealChaosTokensSaga";
import { startChaosBagRevealSaga } from "./startChaosBagReveal/startChaosBagRevealSaga";

export function* chaosBagRevealEntitiesSaga() {
	yield spawn(chaosBagRevealReturnSaga);

	yield spawn(revealChaosTokensSaga);
	yield spawn(startChaosBagRevealSaga);
}
