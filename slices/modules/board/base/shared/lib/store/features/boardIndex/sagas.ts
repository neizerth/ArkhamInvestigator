import { spawn } from "redux-saga/effects";
import { setNextBoardIndexSaga } from "./setNextBoardIndex/setNextBoardIndexSaga";
import { setPrevBoardIndexSaga } from "./setPrevBoardIndex/setPrevBoardIndexSaga";

export function* boardIndexSaga() {
	yield spawn(setNextBoardIndexSaga);
	yield spawn(setPrevBoardIndexSaga);
}
