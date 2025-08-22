import { fork } from "redux-saga/effects";
import { boardPageSaga } from "./board/sagas";

export function* boardPageGroupSaga() {
	yield fork(boardPageSaga);
}
