import { fork } from "redux-saga/effects";
import { closeModalAfterReturnTokenSaga } from "./closeModalAfterReturnTokenSaga";
import { returnBackToModalSaga } from "./returnBackToModalSaga";

// TODO
export function* chaosTokenRevealModalSaga() {
	yield fork(returnBackToModalSaga);
	yield fork(closeModalAfterReturnTokenSaga);
}
