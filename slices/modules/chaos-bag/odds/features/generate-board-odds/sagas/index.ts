import { spawn } from "redux-saga/effects";
import { generateBoardOddsWorkerSaga } from "./generateBoardOddsWorkerSaga";
import { watchBoardOddsCalculationSaga } from "./watchBoardOddsCalculationSaga";

export function* generateBoardOddsSaga() {
	yield spawn(watchBoardOddsCalculationSaga);
	yield spawn(generateBoardOddsWorkerSaga);
}
