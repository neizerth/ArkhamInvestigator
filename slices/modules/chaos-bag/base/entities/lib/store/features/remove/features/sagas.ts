import { spawn } from "redux-saga/effects";
import { removeAllChaosTokensByTypeSaga } from "./removeAllChaosTokensByType/removeAllChaosTokensByTypeSaga";
import { removeChaosTokenByTypeSaga } from "./removeChaosTokenByType/removeChaosTokenByTypeSaga";
import { removeMultipleChaosTokensByTypeSaga } from "./removeMultipleChaosTokensByType/removeMultipleChaosTokensByTypeSaga";
import { removeSingleChaosTokenSaga as removeTokenSaga } from "./removeSingleChaosToken/removeSingleChaosTokenSaga";

export function* removeChaosTokenFeaturesSaga() {
	yield spawn(removeAllChaosTokensByTypeSaga);
	yield spawn(removeTokenSaga);
	yield spawn(removeChaosTokenByTypeSaga);
	yield spawn(removeMultipleChaosTokensByTypeSaga);
}
