import { fork } from "redux-saga/effects";
import { closeModalEndChaosTokenRevealSaga } from "./closeModalEndChaosTokenRevealSaga";
import { handleBackButtonSaga } from "./handleBackButtonSaga";
import { returnBackToModalSaga } from "./returnBackToModalSaga";

// TODO
export function* chaosTokenRevealModalSaga() {
	yield fork(returnBackToModalSaga);
	yield fork(closeModalEndChaosTokenRevealSaga);
	yield fork(handleBackButtonSaga);
}
