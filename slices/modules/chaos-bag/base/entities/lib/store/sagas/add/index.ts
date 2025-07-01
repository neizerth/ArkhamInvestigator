import { spawn } from "redux-saga/effects";
import { addMultipleChaosTokensSaga } from "./addMultipleChaosTokensSaga";
import { addSingleChaosTokenSaga } from "./addSingleChaosTokenSaga";

export function* addChaosTokenSaga() {
	yield spawn(addSingleChaosTokenSaga);
	yield spawn(addMultipleChaosTokensSaga);
}
