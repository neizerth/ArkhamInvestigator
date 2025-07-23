import { spawn } from "redux-saga/effects";
import { clearRevealHistoryModalActionSaga } from "./clearRevealHistoryModalActionSaga";
import { openClearRevealHistoryWarningSaga as openWarning } from "./openClearRevealHistoryWarningSaga";

export function* openClearRevealHistoryWarningSaga() {
	yield spawn(clearRevealHistoryModalActionSaga);
	yield spawn(openWarning);
}
