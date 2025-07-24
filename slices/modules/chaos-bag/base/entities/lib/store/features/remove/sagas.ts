import { spawn } from "redux-saga/effects";
import { removeAllChaosTokensByTypeSaga } from "./removeAllChaosTokensByType/removeAllChaosTokensByTypeSaga";
import { removeChaosTokenSaga as removeTokenSaga } from "./removeChaosToken/removeChaosTokenSaga";
import { removeChaosTokenByTypeSaga } from "./removeChaosTokenByType/removeChaosTokenByTypeSaga";
import { removeMultipleChaosTokensByTypeSaga } from "./removeMultipleChaosTokensByType/removeMultipleChaosTokensByTypeSaga";

export function* removeChaosTokenSaga() {
	yield spawn(removeAllChaosTokensByTypeSaga);
	yield spawn(removeTokenSaga);
	yield spawn(removeChaosTokenByTypeSaga);
	yield spawn(removeMultipleChaosTokensByTypeSaga);
}
