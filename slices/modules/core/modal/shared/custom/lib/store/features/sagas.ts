import { spawn } from "redux-saga/effects";
import { openCustomModalSaga } from "./openCustomModal/openCustomModalSaga";

export function* customModalSaga() {
	yield spawn(openCustomModalSaga);
}
