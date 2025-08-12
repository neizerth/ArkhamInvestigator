import { spawn } from "redux-saga/effects";
import { chaosTokenRevealModalSaga as modalSaga } from "./lib/store/sagas";

export function* chaosTokenRevealModalSaga() {
	yield spawn(modalSaga);
}
