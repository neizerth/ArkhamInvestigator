import { fork } from "redux-saga/effects";
import { closeModalEndChaosTokenRevealSaga } from "./closeModalEndChaosTokenRevealSaga";
import { handleBackButtonSaga } from "./handleBackButtonSaga";
import { openModalSaga } from "./openModalSaga";
import { returnBackSaga } from "./returnBack";

// TODO
export function* chaosTokenRevealModalSaga() {
	yield fork(returnBackSaga);
	yield fork(closeModalEndChaosTokenRevealSaga);
	yield fork(handleBackButtonSaga);
	yield fork(openModalSaga);
}
