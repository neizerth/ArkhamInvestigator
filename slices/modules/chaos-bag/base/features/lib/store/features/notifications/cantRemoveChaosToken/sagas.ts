import { spawn } from "redux-saga/effects";
import { cantRemoveMultipleChaosTokensByTypeSaga } from "./cantRemoveMultipleChaosTokensByTypeSaga";
import { cantRemoveSingleChaosTokenByTypeSaga } from "./cantRemoveSingleChaosTokenByTypeSaga";

export function* cantRemoveChaosTokenSaga() {
	yield spawn(cantRemoveSingleChaosTokenByTypeSaga);
	yield spawn(cantRemoveMultipleChaosTokensByTypeSaga);
}
