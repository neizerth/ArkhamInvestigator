import { spawn } from "redux-saga/effects";
import { copyTextSaga } from "./copyText/copyTextSaga";

export function* clipboardEntitiesSaga() {
	yield spawn(copyTextSaga);
}
