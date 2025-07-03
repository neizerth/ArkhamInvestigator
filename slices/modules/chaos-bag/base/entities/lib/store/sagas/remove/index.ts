import { spawn } from "redux-saga/effects";
import { removeSingleChaosTokenSaga } from "./removeSingleChaosTokenSaga";

export function* removeChaosTokenSaga() {
	yield spawn(removeSingleChaosTokenSaga);
}
