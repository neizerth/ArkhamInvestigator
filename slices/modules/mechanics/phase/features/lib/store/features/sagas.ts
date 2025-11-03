import { spawn } from "redux-saga/effects";
import { startNewTurnSaga } from "./common/startNewTurn/startNewTurnSaga";

export function* phaseSaga() {
	yield spawn(startNewTurnSaga);
}
