import { fork } from "redux-saga/effects";
import { updateRevealedTokenSealSaga } from "./updateRevealedTokenSealSaga";
import { updateRevealedTokenValueSaga } from "./updateRevealedTokenValueSaga";

export function* updateRevealedTokenSaga() {
	yield fork(updateRevealedTokenValueSaga);
	yield fork(updateRevealedTokenSealSaga);
}
