import { spawn } from "redux-saga/effects";
import { endTurnToAllBoardsSaga } from "./endTurnToAllBoards/endTurnToAllBoardsSaga";
import { startNewTurnSaga } from "./startNewTurn/startNewTurnSaga";

export function* commonPhaseSaga() {
	yield spawn(startNewTurnSaga);
	yield spawn(endTurnToAllBoardsSaga);
}
