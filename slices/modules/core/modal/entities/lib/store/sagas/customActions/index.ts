import { spawn } from "redux-saga/effects";
import { changeInvestigatorDetailsModalActionSaga } from "./changeInvestigatorDetailsModalActionSaga";
import { startNewGameModalActionSaga } from "./startNewGameModalActionSaga";

export function* modalCustomActionsSaga() {
	yield spawn(changeInvestigatorDetailsModalActionSaga);
	yield spawn(startNewGameModalActionSaga);
}
