import { fork } from "redux-saga/effects";
import { openConfirmSaga } from "./openConfirm/openConfirmSaga";

export function* confirmSaga() {
	yield fork(openConfirmSaga);
}
