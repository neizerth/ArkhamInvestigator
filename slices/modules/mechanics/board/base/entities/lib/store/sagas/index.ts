import { spawn } from "redux-saga/effects";
import { replaceBoardSaga, resetBoardSaga, spendCluesSaga } from "../features";

export function* boardEntityMechanicsSaga() {
	yield spawn(spendCluesSaga);
	yield spawn(replaceBoardSaga);
	yield spawn(resetBoardSaga);
}
