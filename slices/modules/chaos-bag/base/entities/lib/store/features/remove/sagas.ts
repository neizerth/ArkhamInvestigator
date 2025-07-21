import { spawn } from "redux-saga/effects";
import { removeAllChaosTokensByTypeSaga } from "./removeAllChaosTokensByType/removeAllChaosTokensByTypeSaga";
import { removeChaosTokenSaga as removeTokenSaga } from "./removeChaosToken/removeChaosTokenSaga";

export function* removeChaosTokenSaga() {
	yield spawn(removeAllChaosTokensByTypeSaga);
	yield spawn(removeTokenSaga);
	yield spawn(removeAllChaosTokensByTypeSaga);
}
