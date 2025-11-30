import { spawn } from "redux-saga/effects";
import { makeActionSaga } from "./makeAction/makeActionSaga";

export function* investigationPhaseSaga() {
	yield spawn(makeActionSaga);
}
