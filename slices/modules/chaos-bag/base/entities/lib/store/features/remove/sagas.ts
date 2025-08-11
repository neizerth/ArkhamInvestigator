import { spawn } from "redux-saga/effects";
import { removeChaosTokenFeaturesSaga } from "./features/sagas";
import { removeChaosTokensSaga } from "./removeChaosTokens/sagas";

export function* removeChaosTokenSaga() {
	yield spawn(removeChaosTokenFeaturesSaga);
	yield spawn(removeChaosTokensSaga);
}
