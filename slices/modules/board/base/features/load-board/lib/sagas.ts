import { fork } from "redux-saga/effects";
import { loadBoardOnBackgroundUpdateSaga } from "./loadBoardOnBackgroundUpdateSaga";

export function* loadBoardLibSaga() {
	yield fork(loadBoardOnBackgroundUpdateSaga);
}
