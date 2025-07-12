import { spawn } from "redux-saga/effects";
import { changeInvestigatorDetailsModalActionSaga } from "./changeInvestigatorDetailsModalActionSaga";

export function* modalCustomActionsSaga() {
	yield spawn(changeInvestigatorDetailsModalActionSaga);
}
