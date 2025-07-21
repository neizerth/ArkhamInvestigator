import { spawn } from "redux-saga/effects";
import { returnAllChaosTokensSaga } from "./returnAllChaosTokens/returnAllChaosTokensSaga";
import { returnChaosTokenSaga } from "./returnChaosToken/returnChaosTokenSaga";
import { returnSingleChaosTokenSaga } from "./returnSingleChaosToken/returnSingleChaosTokenSaga";

export function* chaosBagRevealReturnSaga() {
	yield spawn(returnAllChaosTokensSaga);
	yield spawn(returnChaosTokenSaga);
	yield spawn(returnSingleChaosTokenSaga);
}
