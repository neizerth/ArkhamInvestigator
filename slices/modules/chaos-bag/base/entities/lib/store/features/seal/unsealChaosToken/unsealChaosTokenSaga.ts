import { takeEvery } from "redux-saga/effects";
import { createSealChaosTokenWorker } from "../lib";
import { chaosTokenUnsealed, unsealChaosToken } from "./unsealChaosToken";

const worker = createSealChaosTokenWorker({
	sealed: false,
	succesAction: chaosTokenUnsealed,
});

export function* unsealChaosTokenSaga() {
	yield takeEvery(unsealChaosToken.match, worker);
}
