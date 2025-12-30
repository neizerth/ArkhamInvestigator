import { spawn } from "redux-saga/effects";
import { clearRevealHistoryOnNewGameSaga } from "./clear-reveal-history-on-new-game/clearRevealHistoryOnNewGameSaga";

export function* chaosBagRevealHistoryFeaturesSaga() {
	yield spawn(clearRevealHistoryOnNewGameSaga);
}
