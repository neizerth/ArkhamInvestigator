import { spawn } from "redux-saga/effects";
import { endChaosBagRevealSaga } from "./endChaosBagReveal/endChaosBagRevealSaga";
import { chaosBagRevealReturnSaga } from "./return/sagas";
import { revealChaosTokensSaga } from "./revealChaosTokens/revealChaosTokensSaga";
import { startRevealSaga } from "./startReveal/sagas";
import { updateRevealedTokenSaga } from "./updateRevealedToken/updateRevealedTokenSaga";

export function* chaosBagRevealEntitiesSaga() {
	yield spawn(chaosBagRevealReturnSaga);

	yield spawn(revealChaosTokensSaga);
	yield spawn(startRevealSaga);
	yield spawn(endChaosBagRevealSaga);
	yield spawn(updateRevealedTokenSaga);
}
