import { spawn } from "redux-saga/effects";
import { returnAllChaosTokensSaga } from "../features/return/returnAllChaosTokens/returnAllChaosTokensSaga";
import { returnChaosTokenSaga } from "../features/return/returnChaosToken/returnChaosTokenSaga";
import { returnSingleChaosTokenSaga } from "../features/return/returnSingleChaosToken/returnSingleChaosTokenSaga";
import { revealChaosTokensSaga } from "../features/revealChaosTokens/revealChaosTokensSaga";

export function* chaosBagRevealEntitiesSaga() {
	yield spawn(returnAllChaosTokensSaga);
	yield spawn(returnSingleChaosTokenSaga);
	yield spawn(returnChaosTokenSaga);

	yield spawn(revealChaosTokensSaga);
}
