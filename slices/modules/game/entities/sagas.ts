import { spawn } from "redux-saga/effects";
import { openNewGameWarningSaga } from "./openNewGameWarning";
import { resumeGameSaga } from "./resumeGame/resumeGameSaga";
import { startGameSaga } from "./startGame/startGameSaga";
import { startNewGameSaga } from "./startNewGame/startNewGameSaga";

export function* gameEntitiesSaga() {
	yield spawn(startNewGameSaga);
	yield spawn(startGameSaga);
	yield spawn(openNewGameWarningSaga);
	yield spawn(resumeGameSaga);
}
