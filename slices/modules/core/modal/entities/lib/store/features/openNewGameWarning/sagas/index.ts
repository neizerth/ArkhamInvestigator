import { spawn } from "redux-saga/effects";

import { openNewGameWarningSaga as openWarningSaga } from "./openNewGameWarningSaga";
import { startNewGameModalActionSaga } from "./startNewGameModalActionSaga";

export function* openNewGameWarningSaga() {
	yield spawn(openWarningSaga);
	yield spawn(startNewGameModalActionSaga);
}
