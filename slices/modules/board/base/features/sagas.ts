import { spawn } from "redux-saga/effects";
import { leaveBoardSaga } from "./leave-board/leaveBoardSaga";

export function* boardBaseFeaturesSaga() {
	yield spawn(leaveBoardSaga);
}
