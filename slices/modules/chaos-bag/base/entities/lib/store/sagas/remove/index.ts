import { spawn } from "redux-saga/effects";
import { removeAllChaosTokensByTypeSaga } from "./removeAllChaosTokensByType";
import { removeSingleChaosTokenSaga } from "./removeSingleChaosTokenSaga";

export function* removeChaosTokenSaga() {
	yield spawn(removeSingleChaosTokenSaga);
	yield spawn(removeAllChaosTokensByTypeSaga);
}
