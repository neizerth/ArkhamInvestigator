import { takeEvery } from "redux-saga/effects";
import { chaosTokenSealed, sealChaosToken } from "../../../actions";
import { createSealChaosTokenWorker } from "../lib/createSealChaosTokenWorker";

const worker = createSealChaosTokenWorker({
	sealed: true,
	succesAction: chaosTokenSealed,
});

export function* sealChaosTokenSaga() {
	yield takeEvery(sealChaosToken.match, worker);
}
