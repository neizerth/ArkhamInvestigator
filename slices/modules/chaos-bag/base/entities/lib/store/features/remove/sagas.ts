import { spawn } from "redux-saga/effects";
import { removeAllChaosTokensByTypeSaga } from "./removeAllChaosTokensByType/removeAllChaosTokensByTypeSaga";
import { removeChaosTokenSaga as removeTokenSaga } from "./removeChaosToken/removeChaosTokenSaga";
import { removeSingleChaosTokenByTypeSaga } from "./removeChaosTokenByType/removeSingleChaosTokenByTypeSaga";
import { removeMultipleChaosTokensByTypeSaga } from "./removeMultipleChaosTokensByType/removeMultipleChaosTokensByTypeSaga";

export function* removeChaosTokenSaga() {
	yield spawn(removeAllChaosTokensByTypeSaga);
	yield spawn(removeTokenSaga);
	yield spawn(removeSingleChaosTokenByTypeSaga);
	yield spawn(removeMultipleChaosTokensByTypeSaga);
}
