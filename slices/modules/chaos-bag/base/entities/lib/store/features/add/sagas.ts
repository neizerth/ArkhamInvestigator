import { spawn } from "redux-saga/effects";
import { addChaosTokensSaga } from "./addChaosTokens/addChaosTokensSaga";
import { addMultipleChaosTokensSaga } from "./addMultipleChaosTokens/addMultipleChaosTokensSaga";
import { addSingleChaosTokenSaga } from "./addSingleChaosToken/addSingleChaosTokenSaga";

export function* addChaosTokenSaga() {
	yield spawn(addSingleChaosTokenSaga);
	yield spawn(addMultipleChaosTokensSaga);
	yield spawn(addChaosTokensSaga);
}
