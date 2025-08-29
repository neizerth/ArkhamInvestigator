import { fork } from "redux-saga/effects";
import { loadBoardLibSaga } from "./lib/sagas";

export function* loadBoardSaga() {
	yield fork(loadBoardLibSaga);
}
