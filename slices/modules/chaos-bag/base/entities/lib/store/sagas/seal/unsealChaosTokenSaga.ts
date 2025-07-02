import { takeEvery } from "redux-saga/effects";
import { chaosTokenUnsealed, unsealChaosToken } from "../../actions";
import { createSealChaosTokenWorker } from "./createSealChaosTokenWorker";

const worker = createSealChaosTokenWorker({
	sealed: false,
	succesAction: chaosTokenUnsealed,
});

export function* unsealChaosTokenSaga() {
	yield takeEvery(unsealChaosToken.match, worker);
}
