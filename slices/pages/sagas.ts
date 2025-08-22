import { spawn } from "redux-saga/effects";
import { boardPageGroupSaga } from "./board/sagas";

export function* pagesSaga() {
	yield spawn(boardPageGroupSaga);
}
