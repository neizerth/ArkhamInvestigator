import { fork } from "redux-saga/effects";
import { returnBackToModalSaga } from "./returnBackToModalSaga";

// TODO
export function* chaosTokenRevealModalSaga() {
	yield fork(returnBackToModalSaga);
}
