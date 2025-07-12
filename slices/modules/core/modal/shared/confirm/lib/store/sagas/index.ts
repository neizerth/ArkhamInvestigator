import { spawn } from "redux-saga/effects";
import { openConfirmSaga } from "../features";

export function* confirmSaga() {
	yield spawn(openConfirmSaga);
}
