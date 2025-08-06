import { fork } from "redux-saga/effects";
import { closeModalEndChaosTokenRevealSaga } from "./closeModalEndChaosTokenRevealSaga";
import { openModalSaga } from "./openModalSaga";

export function* chaosTokenRevealModalSaga() {
	yield fork(closeModalEndChaosTokenRevealSaga);
	yield fork(openModalSaga);
}
