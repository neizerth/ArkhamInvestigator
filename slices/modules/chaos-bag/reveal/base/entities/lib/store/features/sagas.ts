import { spawn } from "redux-saga/effects";
import { chaosBagRevealReturnSaga } from "./return/sagas";
import { revealChaosTokensSaga } from "./revealChaosTokens/revealChaosTokensSaga";
import { startRevealSaga } from "./startReveal/sagas";

export function* chaosBagRevealEntitiesSaga() {
	yield spawn(chaosBagRevealReturnSaga);

	yield spawn(revealChaosTokensSaga);
	yield spawn(startRevealSaga);
}
