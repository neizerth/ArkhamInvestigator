import { spawn } from "redux-saga/effects";
import { startGameSaga } from "./startGame/startGameSaga";
import { startNewGameSaga } from "./startNewGame/startNewGameSaga";

export function* gameEntitiesSaga() {
	yield spawn(startNewGameSaga);
	yield spawn(startGameSaga);
}
