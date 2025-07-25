import { spawn } from "redux-saga/effects";
import { replaceBoardSaga } from "./replaceBoard/replaceBoardSaga";
import { resetBoardSaga } from "./resetBoard/resetBoardSaga";

export function* boardEntityMechanicsSaga() {
	yield spawn(replaceBoardSaga);
	yield spawn(resetBoardSaga);
}
