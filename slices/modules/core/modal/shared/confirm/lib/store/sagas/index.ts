import { fork } from "redux-saga/effects";
import { openConfirmSaga } from "../features";

export function* confirmSaga() {
	yield fork(openConfirmSaga);
}
