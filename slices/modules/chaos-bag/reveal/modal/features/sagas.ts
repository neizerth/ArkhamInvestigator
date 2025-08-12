import { spawn } from "redux-saga/effects";
import { chaosTokenRevealModalSaga } from "./chaos-token-reveal-modal/sagas";

export function* chaosTokenRevelModalFeaturesSaga() {
	yield spawn(chaosTokenRevealModalSaga);
}
