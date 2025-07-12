import { spawn } from "redux-saga/effects";
import { openResetBoardWarningSaga as openWarningSaga } from "./openResetBoardWarningSaga";
import { resetBoardModalActionSaga } from "./resetBoardModalActionSaga";

export function* openResetBoardWarningSaga() {
	yield spawn(openWarningSaga);
	yield spawn(resetBoardModalActionSaga);
}
