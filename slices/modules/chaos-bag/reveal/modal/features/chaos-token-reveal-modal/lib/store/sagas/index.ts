import { fork } from "redux-saga/effects";
import { closeModalEndChaosTokenRevealSaga } from "./closeModalEndChaosTokenRevealSaga";
import { returnBackToModalSaga } from "./returnBackToModalSaga";

// TODO
export function* chaosTokenRevealModalSaga() {
	yield fork(returnBackToModalSaga);
	yield fork(closeModalEndChaosTokenRevealSaga);
}
