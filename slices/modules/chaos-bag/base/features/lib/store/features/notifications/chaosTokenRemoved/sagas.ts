import { spawn } from "redux-saga/effects";
import { multipleChaosTokensRemovedByTypeSaga } from "./multipleChaosTokensRemovedByTypeSaga";
import { singleChaosTokenRemovedByTypeSaga } from "./singleChaosTokenRemovedByTypeSaga";

export function* chaosTokenRemovedSaga() {
	yield spawn(singleChaosTokenRemovedByTypeSaga);
	yield spawn(multipleChaosTokensRemovedByTypeSaga);
}
