import { takeEvery } from "redux-saga/effects";
import { createSealChaosTokenWorker } from "../lib";
import { chaosTokenSealed, sealChaosToken } from "./sealChaosToken";

const worker = createSealChaosTokenWorker({
	sealed: true,
	succesAction: chaosTokenSealed,
});

export function* sealChaosTokenSaga() {
	yield takeEvery(sealChaosToken.match, worker);
}
