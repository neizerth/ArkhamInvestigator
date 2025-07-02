import { spawn } from "redux-saga/effects";
import { removeSingleChaosTokenSaga } from "./removeSingleChaosTokenSaga";

// TODO
export function* removeChaosTokenSaga() {
	yield spawn(removeSingleChaosTokenSaga);
}
